import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

const createAuthToken = (userId) =>
  jwt.sign(
    {
      user: {
        id: userId,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

const redirectWithToken = (req, res) => {
  if (!req.user?.id) {
    return res.redirect('/?authError=missing-user');
  }

  const token = createAuthToken(req.user.id);
  const encodedToken = encodeURIComponent(token);

  return res.redirect(`/auth/callback?token=${encodedToken}`);
};

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/?authError=google-login-failed' }),
  redirectWithToken
);

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/?authError=github-login-failed' }),
  redirectWithToken
);

export default router;