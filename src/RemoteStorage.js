// src/RemoteStorage.js

const AWS = require('aws-sdk');
const config = require('./config');
const axios = require("axios");

class RemoteStorage {
    constructor() {
        this.connect();
    }

    connect() {
        if (config.STORAGE_PROVIDER === "s3") {
            // Implement connection logic to AWS S3
            // aws sdk can be used if required, currently remote storage service is locally hosted.
            this.s3 = new AWS.S3();
        }
    }

    getFile = async (filePath) => {
        if (config.STORAGE_PROVIDER === "LOCAL_REMOTE") {
            const url = `http://localhost:4000/log/${filePath}`;
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error(`Error fetching file: ${error.message}`);
                throw error;
            }
        } else if(config.STORAGE_PROVIDER === "s3") {
            // AWS s3 specific file fetching code
        }
    }
}

module.exports = RemoteStorage;
