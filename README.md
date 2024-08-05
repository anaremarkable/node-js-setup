# Node.js API Project

This is a Node.js API project that interacts with a MySQL database. The project includes error handling, validation, and unit tests.

## Prerequisites

- Node.js
- MySQL
- npm

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/anaremarkable/repository-name.git
    ```

2. Navigate to the project directory:

    ```bash
    cd repository-name
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file and add your database configuration:

    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=testdb
    ```

5. Run the server:

    ```bash
    node server.js
    ```

## API Endpoints

### Create User

- **URL:** `/users`
- **Method:** `POST`
- **Body:**

    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com"
    }
    ```

- **Success Response:**

    - **Code:** 201
    - **Content:**

        ```json
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com"
        }
        ```

- **Error Response:**

    - **Code:** 400 BAD REQUEST
    - **Content:**

        ```json
        {
            "error": "Invalid input"
        }
        ```

## License

This project is licensed under the MIT License.
