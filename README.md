This project contains two parts. Please go through complete readme.

# Remote Storage Service

## API Usage
- Endpoint: GET `/log/:folder/:file`
- Example Request: `GET /log/2023-11-25/01.txt`
- Example Response: File content of `01.txt` in the `2023-11-25` folder

# Log Search API

## Setup Instructions
1. Install dependencies: `npm install`
2. Set environment variables in the `.env` file
3. Run the application: `npm start`

## API Usage

Endpoint for searching log entries based on specified criteria.

#### Request

- **URL:** `http://your-api-base-url/log/search`
- **Method:** `GET`

#### Query Parameters:

- `searchKeyword` (string): The keyword to search for in log entries.
- `from` (string, format: "YYYY-MM-DDTHH:mm:ss"): The start timestamp for the search range.
- `to` (string, format: "YYYY-MM-DDTHH:mm:ss"): The end timestamp for the search range.

#### Example:

```bash
curl "http://your-api-base-url/log/search?searchKeyword=Database&from=2023-11-25T00:00:00&to=2023-11-26T08:00:00"
