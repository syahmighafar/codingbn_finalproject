const express = require('express');
const route = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', ensureGuest, services.home);

route.get('/add-item', ensureAuth, services.add_item)

route.get('/update-item', ensureAuth, services.update_item)

route.get('/public', ensureGuest, services.public)

route.get('/admin', ensureAuth, services.admin)

route.get('/login', ensureGuest, services.login)

// API
route.post('/api/items', controller.create);
route.get('/api/items', controller.find);
route.put('/api/items/:id', controller.update);
route.delete('/api/items/:id', controller.delete);

module.exports = route