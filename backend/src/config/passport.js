const passport = require('passport');
const UserModel = require('../models/users.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.CALLBACK_URL);
        console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

        const googleId = profile.id;
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const avatar = profile.photos?.[0]?.value;

        let user = await UserModel.findOne({ email });

        if (!user) {
          user = await UserModel.create({
            name,
            email,
            googleId,
            avatar,
          });
        }

        
        return cb(null, user);

      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
