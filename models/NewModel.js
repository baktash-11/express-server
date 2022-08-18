const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newModelSchema = new Schema({
    name: String, 
    image: String
});

const NewModel = mongoose.model('NewModel', newModelSchema);
module.exports= NewModel;