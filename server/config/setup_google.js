const passport = require('passport')
const GoogleSrategy = require('passport-google-oauth2').Strategy;


passport.use(
  new GoogleSrategy(
    {
      callbackURL:
        "https://weak-rose-cheetah-hat.cyclic.app/api/google/callback",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    (request, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})