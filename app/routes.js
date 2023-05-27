
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
evrout.post('/events', async (req, res) => {
  reqbody = req.body
  console.log(reqbody)
  if(Object.keys(reqbody).length !== 0)
  { 
    const eventdata = new eventmodel(req.body)
    const newevent = await eventmodel.create(eventdata)
    console.log('Event added successfully:', newevent);
    res.end('Event added successfully');
  }
  else
    res.end("no record")
})

//update event
evrout.put('/events/:id', async (req, res) => {
  try
  {
    filter = {_id : req.params.id}
    newdata = req.body
    console.log("reqbody:",req.body)

    const updateddata = await eventmodel.findOneAndUpdate(filter,newdata,{new : true})
    console.log(updateddata)
   
    if(updateddata){
      res.end('data updated successfully')
    }
    else{
      res.end('record not found')
    }
    viewdata = await eventmodel.find(filter).exec()
    console.log(viewdata)
  }
  catch(err){
    console.log('something went wrong',err)
    res.end('something went wrong')
  }
 

})

//delete an event
evrout.delete('/events/:id', async (req, res) => {
  try
  {
    const filter = {_id : req.params.id}
    delevent = await eventmodel.findOneAndDelete(filter)
    console.log(delevent)
    if(delevent){
      res.end('record deleted successfully')
    }
    else{
      res.end("could not delete")
    }
  }catch(err){
    console.log(err)
    res.end("someting went wrong")
  }
})



module.exports = {
    evrout
}