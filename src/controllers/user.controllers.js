const User = require('../models/user.model.js');

// Return all
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of users."
        });
    });
};

// Find a single 
exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "El usuario con ID:" + req.params.id + ", no existe."
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "El usuario con ID:" + req.params.id + ", no existe."
            });                
        }
        return res.status(500).send({
            message: "Error al obtener el usuario con ID: " + req.params.id
        });
    });
};

// Create 
exports.create = (req, res) => {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if(!req.body) {
        return res.status(400).send({
            message: "Por favor complete todos los campos obligatorios"
        });
    }

    if(req.body.dni.length != 8 || !(/^([0-9])*$/.test(req.body.dni))) {
        res.status(500).send({
            message: "DNI incorrecto."
        });
    }

    if(!(/^([0-9])*$/.test(req.body.phone))) {
        res.status(500).send({
            message: "Formato de celular incorrecto."
        });
    }

    var valid = emailRegex.test(req.body.email);
    if(!valid) {
        res.status(500).send({
            message: "Formato de email incorrecto."
        });
    }

    // Create a new User
    const user = new User({
        name: req.body.name, 
        dni: req.body.dni,
        phone: req.body.phone,
        email: req.body.email
    });

    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating new user."
        });
    });
};

// Update 
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Por favor complete todos los campos obligatorios."
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name, 
        dni: req.body.dni,
        phone: req.body.phone,
        email: req.body.email
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "El usuario con ID:" + req.params.id + ", no existe."
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "El usuario con ID:" + req.params.id + ", no existe."
            });                
        }
        return res.status(500).send({
            message: "Error al actualziar el usuario con ID: " + req.params.id
        });
    });
};

// Delete 
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "El usuario con ID:" + req.params.id + ", no existe."
            });
        }
        res.send({message: "El usuario fue eliminado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "El usuario con ID:" + req.params.id + ", no existe."
            });                
        }
        return res.status(500).send({
            message: "No se puede eliminar el usuario con ID: " + req.params.id
        });
    });
};