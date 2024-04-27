module.exports = {
  production: {
    use_env_variable: "postgres://postgres:password@localhost:5432/yodigital",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
  },


  development: {
    username: "postgres",
    dialect: "postgres",
    password: "password",
    database: "yodigital",
    host: "localhost",
    logging: console.log,
  },
};
