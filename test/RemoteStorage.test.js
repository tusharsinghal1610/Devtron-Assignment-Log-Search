// test/RemoteStorage.test.js
const axios = require('axios');
const RemoteStorage = require('../src/RemoteStorage');
const config = require('../src/config');

// Mock axios for testing
jest.mock('axios');

describe('RemoteStorage', () => {
    let remoteStorage;

    beforeEach(() => {
        remoteStorage = new RemoteStorage();
    });

    describe('getFile', () => {
        test('fetches file from local storage', async () => {
            // Mock the axios.get method to return a sample response
            axios.get.mockResolvedValue({ data: 'File content' });

            config.STORAGE_PROVIDER = 'LOCAL_REMOTE';
            const filePath = '2023-11-25/01.txt';
            const result = await remoteStorage.getFile(filePath);

            expect(result).toBe('File content');
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:4000/log/${filePath}`);
        });

        // We can add more tests for other storage providers if needed
    });
});
