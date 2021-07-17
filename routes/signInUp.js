// route for sign in and sign up

const express = require('express');
const passport = require('passport');
const router = express.Router();


var signInUpController = require('../controllers/signInUp_controller');
router.get('/sign-in',signInUpController.signIn);
router.get('/sign-up',signInUpController.signUp);
router.post('/create', signInUpController.create);

// use passport as middleware to authenticate user at the router level
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/authentication/sign-in'}
),signInUpController.createSession);

module.exports = router;