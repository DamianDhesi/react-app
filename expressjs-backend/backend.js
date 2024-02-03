import userServices from "./user-services.js";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import https from "https";
import fs from "fs";
import rateLimit from "express-rate-limit";

const app = express();
const port = 8000;

// set up rate limiter: maximum of five requests per minute
var limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.use(express.json());
app.use(cors("https://localhost:3000"));

function generateAccessToken(name) {
    return jwt.sign(name, process.env.TOKEN_SECRET, { expiresIn: '180s' });
}

app.get("/users", async (req, res) => {
    try {
        const users = await userServices.getUsers(undefined, undefined);
        res.send({ users_list: users});
    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server");
    }
});

app.post("/account/login", async (req, res) => {
    const userid = req.body.userid.trim();
    const password = req.body.password.trim();
    const result = await userServices.verifyUser(userid, password);

    if (result != null) {
        const token = generateAccessToken({name: result});
        res.send(token);
    } else {
        res.send(result);
    }
});

app.post("/account/register", async (req, res) => {
    const userid = req.body.userid.trim();
    const password = req.body.password;

    /*check for at least one capital letter, one number, one symbol, validate password was typed twice correctly, 
     * and user-password combo does not already exist*/
    const existingUser = await userServices.findUserByName(userid);
    if (existingUser[0] == null) {
        const savedUser = await userServices.addUser({ name: userid, 
                                                       password: password});
        res.send(savedUser);
    } else {
        res.send(null);
    }
})

https.createServer(
    {
        key: fs.readFileSync(process.env.SSL_KEY_FILE),
        cert: fs.readFileSync(process.env.SSL_CRT_FILE),
    },
    app
)
.listen(port, () => {
    console.log(`listening at https://localhost:${port}`);
});