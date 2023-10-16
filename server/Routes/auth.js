const router = require("express").Router();
const passport = require("passport");
const User = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { cloudinary } = require("../cloudinary");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});
const sharp = require("sharp");
const tokenGen = require("./tokenGen");



// google oauth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async function (req, res) {

    // Successful authentication, redirect to dashboard or profile page
    const { googleId, displayName, email, picture } = req.user;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      const authtoken = tokenGen(findUser.email, findUser.picture);
      res.redirect(
        `${process.env.FRONT_END_HOST}/oauth?state=${authtoken}&profile=${findUser.picture}`
      );
    } else {
      const user = new User({
        name: displayName,
        email,
        googleId,
        picture,
      });
      const authtoken = tokenGen(user.email, user.picture);
      await user.save(); // This saves the user to the database
      // Handle registration success
      res.redirect(
        `${process.env.FRONT_END_HOST}/oauth?state=${authtoken}&profile=${user.picture}`
      );
    }
  }
);


// signup process
router.post("/signup", upload.array("file"), async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      res.status(409).send({ message: "User is already registered" });
    } else {
      // buffer the image
      let resizedBuffer = req.files[0].buffer;

      // check for the over sized
      if (req.files[0].size >= 10485700)
        resizedBuffer = await sharp(resizedBuffer)
          .resize(1200) // resize to 1200px width (maintains aspect ratio)
          .jpeg({ quality: 50 }) // compress with 80% quality JPEG
          .toBuffer();

      // upload file to cloudinary
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            public_id: req.files[0].originalname.split(".")[0], // set public_id as filename without extension
          },
          async (error, result) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ message: "Error uploading file" });
            }

            // return the Cloudinary URL of the uploaded file
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
              picture: result.url,
            });

            const authtoken = tokenGen(user.email, user.picture);
            await user.save(); // This saves the user to the database
            res.status(200).send({
              message: "Successfully created your account",
              token: authtoken,
              profile: user.picture,
            });
          }
        )
        .end(resizedBuffer);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server error occured" });
  }
});


// login process
router.post("/login", async (req, res) => {
  try {
    const fuser = await User.findOne({ email: req.body.email });
    if (!fuser) {
      return res.status(404).send({ message: "Username not Found" });
    }
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      fuser.password
    );
    if (!passwordCheck) {
      return res.status(404).send({ message: "Wrong credentials" });
    }
    const authtoken = tokenGen(fuser.email, fuser.picture);

    return res.status(200).send({
      message: "Successfully Logged in",
      token: authtoken,
      profile: fuser.picture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Server error occured" });
  }
});


// update the profile
router.put("/profile", async (req, res) => {
  const { name, email, mobile, instagram, youtube, token } = req.body;

  const newProfile = {
    name,
    email,
    mobile,
    instagram,
    youtube,
  };

  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same secret used to sign the token

  // The email is stored in the `email` property of the payload
  const userEmail = decoded.email;

  const findUser = await User.findOne({ email: userEmail });

  if (!findUser) return res.status(404).send({ message: "User Not found" });

  // Update the user's profile with the newProfile data
  findUser.profile = newProfile;

  // Save the updated user document
  const updatedUser = await findUser.save();

  return res.status(200).send({ message: "Profile updated successfully" });

});

router.post("/profile", async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same secret used to sign the token

  // The email is stored in the `email` property of the payload
  const userEmail = decoded.email;

  const findUser = await User.findOne({ email: userEmail }).select("-password");
  if (typeof  findUser.profile.name === "undefined") 
  return res.status(404).send(null);

  return res.status(200).send(findUser.profile)
});

module.exports = router;
