class LogSearch {

    constructor(storage) {
        this.storage = storage;
    }

    formatDateToString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    generateLogFiles(fromTimestamp, toTimestamp) {
        const files = [];

        for (let currentTimestamp = new Date(fromTimestamp); currentTimestamp <= toTimestamp; currentTimestamp.setUTCDate(currentTimestamp.getUTCDate() + 1)) {
            const currentDateString = this.formatDateToString(currentTimestamp);

            let fromHour = 0;
            let toHour = 23;

            // If the current date is the same as the fromTimestamp, adjust fromHour
            if (currentDateString === this.formatDateToString(fromTimestamp)) {
                fromHour = fromTimestamp.getHours() + Math.floor(fromTimestamp.getMinutes() / 30); // Adjusting for half-hour intervals
            }

            // If the current date is the same as the toTimestamp, adjust toHour
            if (currentDateString === this.formatDateToString(toTimestamp)) {
                toHour = toTimestamp.getHours() + Math.floor(toTimestamp.getMinutes() / 30); // Adjusting for half-hour intervals
            }

            for (let hour = fromHour; hour <= toHour; hour++) {
                const fileName = `${currentDateString}/${hour.toString().padStart(2, '0')}.txt`;
                files.push(fileName);
            }
        }

        return files;
    }


    async search(searchKeyword, fromTimestamp, toTimestamp, batchSize = 10) {
        const logEntries = [];
        const logFiles = this.generateLogFiles(fromTimestamp, toTimestamp);

        try {
            // Fetch log entries in batches asynchronously using Promise.all
            for (let i = 0; i < logFiles.length; i += batchSize) {
                const batchFiles = logFiles.slice(i, i + batchSize);
                const promises = batchFiles.map(filePath => this.searchFile(filePath, searchKeyword));
                const batchResults = await Promise.all(promises);

                // Flatten the results from the batch into a single array
                batchResults.forEach(entries => logEntries.push(...entries));
            }

            return logEntries;
        } catch (error) {
            console.error('Error during log search:', error);
            throw error;
        }
    }

    filterEntries(fileContent, searchKeyword) {
        const filteredEntries = [];
        const lines = fileContent.split('\n');

        lines.forEach(line => {
            if (line.includes(searchKeyword)) {
                filteredEntries.push(line);
            }
        });

        return filteredEntries;
    }

    async searchFile(filePath, searchKeyword) {
        const fileContent = await this.getFileContent(filePath);
        const filteredEntries = this.filterEntries(fileContent, searchKeyword);
        return filteredEntries;
    }

    async getFileContent(filePath) {
        return await this.storage.getFile(filePath);
    }
}

module.exports = LogSearch;
