import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), // Redirect to login page on failure
  (req, res) => {
    // Successful authentication, redirect to a success page or send a token
    // For now, we'll just redirect to the homepage and assume the frontend will handle token retrieval if needed
    // In a real application, you'd likely generate a JWT here and send it back to the client
    res.redirect('/');
  }
);

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), // Redirect to login page on failure
  (req, res) => {
    // Successful authentication, redirect to a success page or send a token
    // Similar to Google callback, you'd likely generate a JWT here
    res.redirect('/');
  }
);

export default router;