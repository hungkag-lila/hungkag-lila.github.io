const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.use(async (req, res, next) => {
    req.userId = req.query.userId;
    next();
});

//Generate ID
router.get('/generate-id', async (req, res) => {
    const userId = Math.random().toString(36).substring(2, 15);
    const newUser = new User({ userId });
    await newUser.save();
    res.json({ userId });

    console.log("User Id: " + userId)
});

//Get Levels
router.get('/levels', async (req, res) => {
    const userData = await User.findOne({ userId: req.userId });
    if (userData) {
        res.json({  
            intelligence: userData.intelLevel, 
            strength: userData.strengthLevel,
            bossHealth: userData.currentBossHealth,
            bossesKilled: userData.bossesKilled
        });
        console.log("Levels: " + userData)
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

//Increase Intelligence
router.patch('/increase-intelligence', async (req, res) => {
    const userData = await User.findOne({ userId: req.userId });
    if (userData) {
        userData.intelLevel += 1;
        await userData.save();
        res.json({ intelligence: userData.intelLevel });
        console.log("Intel Increase: " + userData)
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

//Increase Strength
router.patch('/increase-strength', async (req, res) => {
    const userData = await User.findOne({ userId: req.userId });
    if (userData) {
        userData.strengthLevel += 1;
        await userData.save();
        res.json({ strength: userData.strengthLevel });
        console.log("Strength Increase: " + userData)
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

//Save Current Boss Health
router.patch('/update-health', async (req, res) => {
    const userData = await User.findOne({ userId: req.userId });
    console.log("Boss Health Before" + userData)
    if (userData) {
        userData.currentBossHealth = req.body.bossHealth;
        await userData.save();
        res.json({ bossHealth: userData.currentBossHealth });
        console.log("Boss Health After" + userData)
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

//Increase Bosses Killed
router.patch('/increase-kills', async (req, res) => {
    const userData = await User.findOne({ userId: req.userId });
    if (userData) {
        userData.bossesKilled += 1;
        await userData.save();
        res.json({ bossesKilled: userData.bossesKilled });
        console.log("Bosses Killed: " + userData)
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


module.exports = router;