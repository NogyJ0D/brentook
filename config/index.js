require('dotenv').config()

const config = {
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE
}

module.exports = config
