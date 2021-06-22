const express = require('express');
const passport = require('passport')
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/google', passport.authenticate('google', { scope: ['profile'] }))

route.get(
    '/google/callback', passport.authenticate('google', { failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('/admin')
    }
)

route.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


// API
route.post('/api/items', controller.create);
route.get('/api/items', controller.find);
route.put('/api/items/:id', controller.update);
route.delete('/api/items/:id', controller.delete);

module.exports = route