const express = require('express');
const app = express();
const port = 8000;
var hashMap = new Map();
var users = [];

hashMap.set("bj" + "pass424", "2342f2f1d131rf12");
users.push("bj");
app.use(express.json());
var cors = require("cors");
app.use(cors());

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/account/login", (req, res) => {
    var key = req.body.userid + req.body.password;
    res.send(hashMap.get(key));
});

app.post("/account/register", (req, res) => {
    var userid = req.body.userid;
    var password = req.body.password;
    var valpass = req.body.valpass;
    var specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    /*check for at least one capital letter, one number, one symbol, validate password was typed twice correctly, 
     * and user-password combo does not already exist*/
    if (valpass === password && password !== password.toLowerCase() && /\d/.test(password) 
        && specialChars.test(password) && hashMap.get(userid + password) == null) {
        hashMap.set(userid + password, require("crypto").randomBytes(16).toString('hex'));
        users.push(userid);
        res.send("pass");
    } else {
        res.send("fail");
    }
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});