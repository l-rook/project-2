const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    level: { type: Number, required: true },
    strength: { type: Number, required: true, default: 10 },
    dexterity: { type: Number, required: true, default: 10 },
    constitution: { type: Number, required: true, default: 10 },
    intelligence: { type: Number, required: true, default: 10 },
    wisdom: { type: Number, required: true, default: 10 },
    charisma: { type: Number, required: true, default: 10 },
    skills: { type: [String], default: [] },
    equipment: { type: [String], default: [] },
    spells: { type: [String], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Character', characterSchema);
