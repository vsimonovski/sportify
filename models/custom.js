const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomSchema = new Schema({
    name: {
        type: String,
        required: [true]
    }
})

const Custom = mongoose.model('custom', CustomSchema);
module.exports = Custom;
