
const jwt = require("jsonwebtoken");
function tokenGen(email,profile) {
    
    const payLoad = {
      email,profile
    };
    const authtoken = jwt.sign(payLoad, process.env.JWT_SECRET);
    return authtoken;
}

module.exports = tokenGen; 