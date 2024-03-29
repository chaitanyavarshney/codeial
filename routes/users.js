const express = require('express');
const router = express.Router();


const usersController = require('../controllers/users_controller');
const passport = require('passport');
const forgot = require('../controllers/forgot_password');

router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.get('/forgot_pass', forgot.renderPage);
// router.post('/forgot_pass', forgot.pass)
router.post('/forget_pass', forgot.passnew);
// router.post('/forgot_pass', forgot.pass)
router.get('/reset-password/:id/:token', forgot.passcheck);

router.post('/reset_pass', forgot.passcheck2);



router.post('/create', usersController.create);
//sure passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local', 
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession)

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);

module.exports = router;