// route for sign in and sign up

const express = require('express');
const router = express.Router();

var signInUpController = require('../controllers/signInUp_controller');
router.get('/sign-in', signInUpController.signIn);
router.get('/sign-up', signInUpController.signUp);


module.exports = router;