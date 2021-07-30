
const express = require('express');
const passport = require('passport');
const router = express.Router();

const resetPassword = require('../controllers/reset_password');

router.get('/',resetPassword.forgotpassword);

router.get('/create_token',resetPassword.create_token);

router.get('/reset_password',resetPassword.setNewPasswordPage);

router.post('/reset_password/set',resetPassword.setNewPassword);

module.exports = router;