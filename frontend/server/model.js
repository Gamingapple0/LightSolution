const mongoose = require('mongoose');

const lightNodeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    brightness: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    personDetected: {
        type: Boolean,
        required: true
    }
});

const LightNode = mongoose.model('LightNode', lightNodeSchema);

module.exports = LightNode;
