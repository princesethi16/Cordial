

const development = {
    name: 'development',
    static_path: "/" + process.env.CORDIAL_STATIC_PATH,
    session_cookie_key: 'blahblahsomething',
    db: 'cordial_development',
    node_mailer_smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.CORDIAL_AUTH_USER_EMAIL, // generated ethereal user
            pass: process.env.CORDIAL_AUTH_USER_PASSWORD, // generated ethereal password
        },

    },
    cordial_mailer_email_id: process.env.CORDIAL_AUTH_USER_EMAIL,
    google_clientID: '204069854855-12sn1ttrgn4ga783e3g8le3jkgjncp7t.apps.googleusercontent.com',
    google_clientSecret: 'XEMmDlX1C4_3P9_cv8GfBAxe',
    google_callbackURL: 'http://localhost:8000/authentication/google/callback',
    jwt_secretOrKey: 'cordial',

}
const production = {
    name: 'production',
    static_path: "/" + process.env.CORDIAL_STATIC_PATH,
    session_cookie_key: process.env.CORDIAL_SESSION_COOKIE_KEY,
    db: process.env.CORDIAL_DB,
    node_mailer_smtp: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.CORDIAL_AUTH_USER_EMAIL, // generated ethereal user
            pass: process.env.CORDIAL_AUTH_USER_PASSWORD, // generated ethereal password
        },

    },
    cordial_mailer_email_id: process.env.CORDIAL_AUTH_USER_EMAIL,
    google_clientID: process.env.CORDIAL_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.CORDIAL_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.CORDIAL_GOOGLE_CALL_BACK_URL,
    jwt_secretOrKey:   process.env.CORDIAL_JWT_SECRETORKEY,
}

module.exports = eval((process.env.CORDIAL_ENVIRONMENT) == 'production' ? production : development);