const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('./models/userModel');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}


// authorization to protect some endpoints
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "Isabella"
}, (payload, done) => {
    console.log("inside passport jwtStrategy")
    User.findById({ _id: payload.sub }, (err, user) => {
        if (err)
            return done(err, false);
        if (user)
            return done(null, user);
        else
            return done(null, false);
    })
}));

// authenticated local strategy using username and password
passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password'
},
    (userName, password, done) => {
        console.log("inside passport local strategy")
        User.findOne({ userName }, (err, user) => {
            //if sth. went wrong with database
            if (err)
                return done(err);
            // if no user exists
            if (!user)
                return done(null, false);
            // check if password is correct
            user.comparePassword(password, done);
        
        })
    }));

    module.exports = passport;