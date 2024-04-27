module.exports = {
  production: {
    use_env_variable: "DATABASE_URL",
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
    password: "123456",
    database: "development",
    host: "localhost",
    logging: console.log,
  },
};
