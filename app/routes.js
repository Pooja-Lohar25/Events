const express = require('express')

const events = express.Router()

events.get('/events', (req, res) => {
    const {id} = req.query
    const {type,limit,page} = req.query
    


})

events.post('/events', (req, res) => {

})

events.put('/events/:id', (req, res) => {
})

events.delete('/events/:id', (req, res) => {
})



module.exports = {
    events
}