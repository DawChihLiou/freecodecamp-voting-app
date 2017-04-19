const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const user = require('../user/user')

passport.use(new TwitterStrategy({
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    (token, tokenSecret, profile, done) => {
        user.findOrCreate({
            userId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            photo: profile.photos[0].value,
            polls: []
        }, (user, db) => {
            db.close()
            return done(null, user)    
        })
}))

// configurate passport authenticated session persistence
passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    user.findOrCreate({userId: id}, (user, db) => {
        db.close()
        done(null, user)    
    })
})

module.exports = passport