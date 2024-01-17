// test/LogSearch.test.js
const LogSearch = require('../src/LogSearch');



// Mock storage object for testing
const mockStorage = {
    getFile: jest.fn(() => 'Log entry 1\nLog entry 2\nLog entry 3'),
};

describe('LogSearch', () => {
    let logSearch;

    beforeEach(() => {
        logSearch = new LogSearch(mockStorage);
    });

    describe('formatDateToString', () => {
        test('formats date to string in YYYY-MM-DD format', () => {
            const date = new Date('2023-11-25');
            expect(logSearch.formatDateToString(date)).toBe('2023-11-25');
        });
    });

    describe('generateLogFiles', () => {
        test('generates log file paths for the given date range', () => {
            const fromTimestamp = new Date('2023-11-25T08:00:00');
            const toTimestamp = new Date('2023-11-25T10:00:00');
            const result = logSearch.generateLogFiles(fromTimestamp, toTimestamp);

            // Expected output for the specified time range
            const expected = [
                '2023-11-25/08.txt',
                '2023-11-25/09.txt',
                '2023-11-25/10.txt',
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('searchFile', () => {
        test('searches for log entries in a specific file', async () => {
            const filePath = '2023-11-25/00.txt';
            const searchKeyword = 'Log entry';
            const result = await logSearch.searchFile(filePath, searchKeyword);
            expect(result).toEqual(['Log entry 1', 'Log entry 2', 'Log entry 3']);
        });
    });

    describe('LogSearch', () => {
        test('search should return matching log entries', async () => {
            const logSearch = new LogSearch(/* You might need to pass any dependencies if required */);

            // Mock the getFileContent function to return sample log data
            logSearch.getFileContent = jest.fn(() => 'Log entry 1\nLog entry 2\nLog entry 3');

            const result = await logSearch.search('Log', new Date(), new Date());
            expect(result).toEqual(['Log entry 1', 'Log entry 2', 'Log entry 3']);
        });

    });
});
