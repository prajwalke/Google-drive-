

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, "Path is required"]
    },
    originalname: {
        type: String,
        required: [true, "Originalname is required"]
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"]
    },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;