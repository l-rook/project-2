const express = require('express');
const router = express.Router();
const Character = require('../models/Character');

const checkAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

router.use(checkAuth);

router.get('/', async (req, res) => {
    const characters = await Character.find({ user: req.session.user._id });
    res.render('characters/index.ejs', { characters });
});

router.get('/new', (req, res) => {
    res.render('characters/new.ejs');
});

router.post('/', async (req, res) => {
    const newCharacter = new Character({
        name: req.body.name,
        class: req.body.class,
        level: req.body.level,
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma,
        skills: req.body.skills.split(',').map(skill => skill.trim()),
        equipment: req.body.equipment.split(',').map(item => item.trim()),
        spells: req.body.spells.split(',').map(spell => spell.trim()),
        user: req.session.user._id
    });
    await newCharacter.save();
    res.redirect('/characters');
});

router.get('/:id/edit', async (req, res) => {
    const character = await Character.findById(req.params.id);
    res.render('characters/edit.ejs', { character });
});

router.post('/:id', async (req, res) => {
    await Character.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        class: req.body.class,
        level: req.body.level,
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma,
        skills: req.body.skills.split(',').map(skill => skill.trim()),
        equipment: req.body.equipment.split(',').map(item => item.trim()),
        spells: req.body.spells.split(',').map(spell => spell.trim())
    });
    res.redirect('/characters');
});

router.post('/:id/delete', async (req, res) => {
    await Character.findByIdAndDelete(req.params.id);
    res.redirect('/characters');
});

module.exports = router;

