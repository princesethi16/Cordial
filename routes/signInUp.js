// route for sign in and sign up

const express = require('express');
const passport = require('passport');
const router = express.Router();
const customMiddleware = require('../config/customMiddleware');

var signInUpController = require('../controllers/signInUp_controller');
router.get('/sign-in',signInUpController.signIn);
router.get('/sign-up',signInUpController.signUp);
router.post('/create', signInUpController.create);

// use passport as middleware to authenticate user at the router level
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/authentication/sign-in'}
),signInUpController.createSession);

// use the google auth strategy to sign in***
// to send the request to google to authenticate the user 
router.get('/google',passport.authenticate('google',{scope: ['profile','email']}));
// to recieve the info( or get the callback from google to contain the info )
router.get('/google/callback',passport.authenticate( // similar to the local-strategy
    'google',
    {failureRedirect: '/authentication/sign-in'}
    ),
    signInUpController.createSession
);

// for reseting the password
router.use('/forgot_password',require('./forgot_password'));

module.exports = router;