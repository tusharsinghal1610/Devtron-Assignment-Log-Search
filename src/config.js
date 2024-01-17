// src/config.js

const dotenv = require('dotenv');
dotenv.config();

const config = {
    STORAGE_PROVIDER: process.env.STORAGE_PROVIDER || 's3',  // Example: 's3', 'azure'
    // Add other configuration parameters as needed
};

module.exports = config;
