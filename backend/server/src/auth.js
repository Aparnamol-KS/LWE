const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const { registerSchema, loginSchema } = require("./types")
const { User } = require("./models")

const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()


app.post('/register', async (req, res) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Input Validation failed",
                errors: result.error.errors,
            });
        }
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Input Validation failed",
                errors: result.error.errors,
            });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = password == user.password;
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );


        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, role: user.role }
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});