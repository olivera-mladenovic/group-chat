import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import authRoutes from "./routes/auth";
import path from "path"
import socket from "socket.io"

require("dotenv").config();

import Message from "./models/message"


import passportSetup from "./config/passportSetup";

const app = express();



mongoose.connect('mongodb+srv://olja:olja@cluster0-on4c5.mongodb.net/group-chatt?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to db');
    })
    .catch(() => {
        process.exit();
    });

app.use(cookieSession({
    maxAge: 12 * 60 * 60 * 1000,
    keys: ['keyforsession']
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

app.get("/login", (req, res, next) => {
    return res.render('login');
});
app.use("/auth", authRoutes);
const server = app.listen(process.env.PORT, () => {
    console.log('Listening on port 3000');
});
let io = socket(server);

io.on('connection', function (socket) {
    socket.on('chat', async (data) => {
        const message = new Message(data);
        await message.save();
        io.emit('chat', data);
    });
});

