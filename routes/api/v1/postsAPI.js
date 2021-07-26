const express = require('express');
const passport = require('passport');
const router = express.Router();

const postsAPI_controller = require('../../../controllers/api/v1/postsAPI_controller');

router.get('/', postsAPI_controller.index);

router.delete('/delete/:postId',passport.authenticate('jwt',{session: false}) ,postsAPI_controller.deletePostAPI)

module.exports = router;