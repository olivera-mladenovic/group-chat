import passport from "passport";

import GoogleStrategy from "passport-google-oauth20";

import User from "../models/user";

require("dotenv").config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById({ _id: id });
        done(null, user);
    } catch (err) {
        return err.message;
    }
})



passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "/auth/google/redirect"

}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            done(null, existingUser);
        } else {
            const user = new User({
                username: profile.displayName,
                googleId: profile.id
            });
            await user.save();
            done(null, user);
        }


    } catch (err) {
        return err.message;
    }
})
);