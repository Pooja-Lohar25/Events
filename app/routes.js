const express = require('express')
const eventmodel = require('../database/dbconnect.js')
const {doc1,doc2,doc3,doc4} = require('../database/dummydata.js')
const evrout = express.Router()



//routes
//fetch events
evrout.get('/events', async (req, res) => {
    const {id} = req.query
    const {type,limit,page} = req.query
    eventdata = []
    if(id){
        eventdata = await eventmodel.find({_id:id}).exec();
        console.log(eventdata)
        
    }
    else{
      const lowerlimit = (page-1)*limit
      const upperlimit = page*limit
      
      if(type=='latest')
        eventdata = await eventmodel.find({}).sort({Schedule:-1}).skip(lowerlimit).limit(upperlimit).exec();
      else if(type=='oldest')
        eventdata = await eventmodel.find({}).sort({Schedule:1}).skip(lowerlimit).limit(upperlimit).exec();
      console.log(eventdata)
    }
    res.end(JSON.stringify(eventdata))
})

//add new event
evrout.post('/events', (req, res) => {
  const newevent = new eventmodel(doc1)
  newevent.save()
  .then(savedevent => {
    console.log('event added successfully:', savedevent);
  })
  .catch(err => {
    console.error('Error saving record:', err);
  });
})

//update event
// evrout.put('/events/:id', (req, res) => {
// })

//delete an event
// evrout.delete('/events/:id', (req, res) => {
// })



module.exports = {
    evrout
}