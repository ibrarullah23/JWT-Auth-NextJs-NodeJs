import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createSecretToken } from '../utils/jwt.js';
import _ from 'lodash';
import 'dotenv/config';


// username:
// error

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: '⚠ User not found!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: '⚠ Wrong Password!' });
        }

        const token = createSecretToken(user.id, user.username)

        res
            .cookie("token", token, {
                // expires: new Date(Date.now() + 900000), // Optional: Cookie expires in 15 minutes
                secure: true,
                httpOnly: true
            })
            .status(200)
            .json({ username: user.username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const register = async (req, res) => {
    const { name, username, password, age } = req.body;
    try {
        const newUser = new User({ name, username, password, age });
        const user = await newUser.save();

        const token = createSecretToken(user.id, user.username)

        res.cookie("token", token, {
            // expires: new Date(Date.now() + 900000), // Optional: Cookie expires in 15 minutes
            secure: true,
            httpOnly: true
        }).status(201).json({ message: "Registration successful!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: `${Object.keys(error.keyPattern)} already exists` });
        }
        res.status(500).json({ error: error.message });
    }
};


export const getUserDetails = async (req, res) => {
    res.status(200).json({
        username: req.user.username,
    });
};

