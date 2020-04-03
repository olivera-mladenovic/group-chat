import express from "express";
import passport from "passport";

import Message from "../models/message";

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), async (req, res, next) => {
    try {
        const messages = await Message.find();
        res.render('chat', { user: req.user, messages: messages });

    } catch (err) {
        console.log(err);
    }
});


router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});


export default router;