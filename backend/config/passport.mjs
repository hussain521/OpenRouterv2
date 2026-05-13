import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from '../models/index.mjs'; // Assuming User model is in models/index.mjs

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || 'GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  callbackURL: '/api/auth/social/google/callback', // This should match your callback URL
  scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      return done(null, user);
    } else {
      // Create a new user if not found
      user = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        // You might want to set a default password or handle this differently
        // password: 'hashed_social_password', // Not ideal, consider alternatives
      });
      await user.save();
      return done(null, user);
    }
  } catch (err) {
    return done(err, null);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID || 'your_github_client_id',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || 'your_github_client_secret',
  callbackURL: '/api/auth/social/github/callback', // This should match your callback URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });

    if (user) {
      return done(null, user);
    } else {
      // Create a new user if not found
      user = new User({
        githubId: profile.id,
        username: profile.username || profile.displayName, // Use username if available, else display name
        email: profile.emails ? profile.emails[0].value : `${profile.username}@github.com`, // GitHub might not always provide email directly
        // You might want to set a default password or handle this differently
      });
      await user.save();
      return done(null, user);
    }
  } catch (err) {
    return done(err, null);
  }
}));