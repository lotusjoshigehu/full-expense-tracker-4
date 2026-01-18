const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const userlist = []; 

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = userlist.find(u => u.email === email);
        if (userExists) {
            return res.status(409).json("User already exists");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        userlist.push({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json("Successfully created new user");
    } catch (err) {
        res.status(500).json("Server error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = userlist.find(u => u.email === email);
        if (!user) {
            return res.status(404).json("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json("User not authorized");
        }

        res.status(200).json("User login successful");
    } catch (err) {
        res.status(500).json("Server error");
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
