const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Connection URL
const url = 'mongodb://0.0.0.0:27017/events';

// Connect to MongoDB
const db = mongoose.connect(url)
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const eventschema = new Schema({
    Type : {type : String, default : 'event'},
    name : String,
    tagline :String,
    Schedule : {type: Date, default: Date.now},
    Description : String,
    Files : {
      name : String,
      data : Buffer,
      contentType : String
    },
    moderator : String,
    category : String,
    sub_category : String,
    rigor_rank : Number,
    attendees : [String],
    })

const eventmodel = mongoose.model('events', eventschema)
module.exports = eventmodel;