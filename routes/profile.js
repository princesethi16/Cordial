const express = require('express');
const router = express.Router();
const passport = require('passport');

var profileController = require('../controllers/profileController');
router.get('/:user', profileController.profile);

router.post('/edit/:user',passport.checkAuthentication,profileController.editProfile);

module.exports = router;