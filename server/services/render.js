const axios = require('axios');

exports.public = (req, res) =>{
    axios.get('http://localhost:3000/api/items')
        .then(function(response){
            res.render('public', { items : response.data });
        })
        .catch(err =>{
            res.send(err);
        }) 
}

exports.admin = (req, res) => {
    // Make a get request to /api/items
    axios.get('http://localhost:3000/api/items')
        .then(function(response){
            res.render('admin', { items : response.data, name : req.user.displayName});
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_item = (req, res) =>{
    res.render('add_item');
}

exports.update_item = (req, res) =>{
    axios.get('http://localhost:3000/api/items', { params : { id : req.query.id }})
        .then(function(itemdata){
            res.render("update_item", { item : itemdata.data, name : req.user.displayName})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.login = (req, res) =>{
    res.render('login');
}

exports.home = (req, res) =>{
    res.render('index');
}