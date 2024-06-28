var express = require('express');
var router = express.Router();

// const fetch = require('node-fetch');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');

router.post("/signup", (req, res) => {
    // On check s'il n'y a pas de l'un des champs à null
    if(!checkBody(req.body, ["name", "password", "email"])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
        // Sinon on verifie si l'email existe dans la DB
    User.findOne({ email: req.body.email }).then(data => {
        if (data == null) {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            newUser.save().then(() => {
                res.json({ result: true });
            });
        }
        // Sinon on l'utilisateur exist déjà
        else {
            res.json({ result: false, error: 'User already exists' });
        }
    });
});

router.post("/signin", (req, res) => {
    // On check s'il n'y a pas de l'un des champs à null
    if(!checkBody(req.body, ["password", "email"])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    // Sinon on verifie si l'email et le mot de passe existe dans la DB
    User.findOne({ email: req.body.email, password: req.body.password }).then(data => {
        if (data) {
            // User is signed
            res.json({ result: true });
        }
        // Sinon si aucun utilisateur est trouvé avec cet email et mdp
        else {
            // User is not signed up
            res.json({ result: false, error: 'User not found' });
        }
    });
});

module.exports = router;