const { log } = console;
const mongoose = require('mongoose');
const path = require('node:path');
const dotenv = require('dotenv');
const app = require('./app');
const chalk = require('chalk');

// .ENV CONFIGURATION
dotenv.config({
  path: path.resolve(__dirname, 'config.env'),
});

// DATABASE
mongoose.connect(process.env.DATABASE, {}, async () => {
  try {
    log(chalk.bgBlue('DATABASE is running✅'));
  } catch (error) {
    log(chalk.bgRed(error));
  }
});

// SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, '127.0.0.1', async () => {
  try {
    log(chalk.bgGreen('Server is running✅'));
  } catch (error) {
    log(chalk.bgRed(error));
  }
});
