const os = require('os');

var config = {
  bcrypt: {
    saltRounds: 12
  },
  admin_pass: "password",
  client_pass: "123456",
  admin_email: "admin@yodigital.com",
  providers: {
    LOCAL: 'local',
    GOOGLE: 'google',
    MICROSOFT: 'microsoft'
  },
  secret_key: 'HUEyqESqgQ1yTwzVlO6wprC9Kf1J1xuA',
  remote: 'http://srv481744.hstgr.cloud:3000',
  port: process.env.NODE_ENV === "development" ? "" : "8080",
  hostUI: process.env.NODE_ENV === "development" ? "http://srv481744.hstgr.cloud"  : "http://localhost",
  portUI: process.env.NODE_ENV === "development" ? "" : "3000",
  google: {
    clientId: '671001533244-kf1k1gmp6mnl0r030qmvdu6v36ghmim6.apps.googleusercontent.com',
    clientSecret: 'Yo4qbKZniqvojzUQ60iKlxqR'
  },
  microsoft: {
    clientId: '4696f457-31af-40de-897c-e00d7d4cff73',
    clientSecret: 'm8jzZ.5UpHF3=-dXzyxiZ4e[F8OF54@p'
  },
  uploadDir: os.tmpdir(),
  email: {
    from: 'jeevan@exigirtech.com',
     host: 'smtp.hostinger.com',
    port: 465,
    subject: "Reset Your Password",
    // text: `http://srv481744.hstgr.cloud:8080/reset-password/${users._id}/${token}`,
    auth: {
      user: "jeevan@exigirtech.com ",
      pass: "Pass@123",
    },
    tls: {
      rejectUnauthorized: false
    }
  },
};

config.host = process.env.NODE_ENV === "development " ? config.remote : "http://srv481744.hstgr.cloud";
config.apiUrl = `${config.host}${config.port ? `:${config.port}` : ``}/api`;
config.uiUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}`;

module.exports = config;
