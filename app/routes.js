const express = require('express')

const evrout = express.Router()
const eventmodel = require('../database/dbconnect.js')
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

// events.post('/events', (req, res) => {

// })

// events.put('/events/:id', (req, res) => {
// })

// events.delete('/events/:id', (req, res) => {
// })



module.exports = {
    evrout
}