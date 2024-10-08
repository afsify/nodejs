//! ================================= SQL Database Connection in Node.js =================================

// Node.js can connect to SQL-based databases like **MySQL**, **PostgreSQL**, **SQLite**, and **SQL Server**.
// Each of these databases has specific libraries and drivers that facilitate communication between Node.js
// and the database. For example, `mysql2` for MySQL, `pg` for PostgreSQL, and `mssql` for SQL Server.

// Below, we'll focus on connecting Node.js to **MySQL** using the `mysql2` library, but similar steps apply
// for other SQL databases.

// Subtopics and Details:
//* Installing Dependencies
//* Connecting to MySQL Database
//* Understanding the Connection Configuration
//* Performing CRUD Operations
//* Using Prepared Statements
//* Connection Pooling
//* Handling Transactions
//* Error Handling
//* Using Promises or Async/Await with SQL Queries
//* Connecting to Cloud SQL Databases

//? 1. Installing Dependencies
// You need to install the MySQL driver package (`mysql2`) to connect your Node.js application to a MySQL database.
// This package provides both callback-based and promise-based APIs.

// Install MySQL Driver:
//! npm install mysql2

// For other SQL databases:
//* PostgreSQL: `npm install pg`
//* SQLite: `npm install sqlite3`
//* SQL Server: `npm install mssql`

//? 2. Connecting to MySQL Database
// You can connect to a MySQL database using the `mysql2` package by creating a connection object with
// connection details such as host, user, password, and database name.
{
  // Example (Basic MySQL Connection):
  const mysql = require("mysql2");

  // Create a connection to the database
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydatabase",
  });

  // Connect to the MySQL server
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to MySQL database.");
  });
}

// In this example:
//* `createConnection()`** establishes the connection to the MySQL server.
//* `connect()`** is used to check if the connection was successful.

//? 3. Understanding the Connection Configuration
// The connection configuration object requires:
//* `host`**: The hostname where the database is hosted (e.g., `localhost` or remote server).
//* `user`**: The database user.
//* `password`**: The password for the database user.
//* `database`**: The name of the specific database you are connecting to.

// Additional options like **port** (default is `3306` for MySQL) or **SSL** configuration can also be included if needed.
{
  // Example (Extended Configuration):
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "mydatabase",
    multipleStatements: true, // Allows executing multiple queries in one call
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync("path/to/ca-cert.pem"),
    },
  });
}

//? 4. Performing CRUD Operations
// Once connected to the database, you can perform **CRUD** (Create, Read, Update, Delete) operations using SQL queries.

// Create (Insert Data):
const insertQuery = "INSERT INTO users (name, age, email) VALUES (?, ?, ?)";
connection.query(
  insertQuery,
  ["John Doe", 30, "john@example.com"],
  (err, results) => {
    if (err) throw err;
    console.log("Data inserted:", results);
  }
);

// Read (Select Data):
const selectQuery = "SELECT * FROM users WHERE age > ?";
connection.query(selectQuery, [18], (err, results) => {
  if (err) throw err;
  console.log("Data retrieved:", results);
});

// Update Data:
const updateQuery = "UPDATE users SET age = ? WHERE name = ?";
connection.query(updateQuery, [31, "John Doe"], (err, results) => {
  if (err) throw err;
  console.log("Data updated:", results);
});

// Delete Data:
const deleteQuery = "DELETE FROM users WHERE name = ?";
connection.query(deleteQuery, ["John Doe"], (err, results) => {
  if (err) throw err;
  console.log("Data deleted:", results);
});

//? 5. Using Prepared Statements
// Prepared statements help prevent SQL injection attacks by separating SQL logic from user input.

// Example (Prepared Statement with Placeholders):
const query = "SELECT * FROM users WHERE age = ? AND name = ?";
connection.execute(query, [30, "John Doe"], (err, results) => {
  if (err) throw err;
  console.log(results);
});

// In this example:
// The `?` placeholders are replaced by the values in the array.
// The **`execute()`** method is used to run the prepared statement.

//? 6. Connection Pooling
// Connection pooling allows you to manage multiple database connections efficiently, especially
// in applications that handle multiple concurrent database queries.
{
  // Example (Creating a Connection Pool):
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydatabase",
    connectionLimit: 10, // Maximum number of connections
  });

  pool.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    console.log("Data retrieved:", results);
  });
}

// `createPool()` creates a pool of connections with a limit on the number of active connections.
// The pool manages connections efficiently by reusing connections.

//? 7. Handling Transactions
// Transactions allow you to execute multiple SQL queries in a sequence, and either commit the changes
// if all succeed or roll back the changes if any query fails.
{
  // Example (Transaction in MySQL):
  connection.beginTransaction((err) => {
    if (err) throw err;

    connection.query("INSERT INTO accounts (balance) VALUES (100)", (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }

      connection.query(
        "UPDATE accounts SET balance = balance - 50 WHERE id = 1",
        (err) => {
          if (err) {
            return connection.rollback(() => {
              throw err;
            });
          }

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                throw err;
              });
            }
            console.log("Transaction complete.");
          });
        }
      );
    });
  });
}

// In this example:
//* `beginTransaction()` starts a new transaction.
//* `commit()` commits the changes to the database.
//* `rollback()` reverts changes if an error occurs.

//? 8. Error Handling
// Proper error handling is crucial for ensuring your application doesn’t fail silently when interacting with the database.
{
  // Example (Handling Connection Errors):
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to MySQL database.");
  });

  // For SQL query errors, the callback provides an error object:
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    console.log("Query results:", results);
  });
}

//? 9. Using Promises or Async/Await with SQL Queries
// The `mysql2` package supports both **Promises** and **Async/Await** for handling SQL queries,
// making it easier to write non-blocking code.
{
  // Promises:
  const mysql = require("mysql2/promise");

  // Create a connection using promise-based API
  const connect = async () => {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "mydatabase",
    });

    const [rows] = await connection.execute("SELECT * FROM users");
    console.log(rows);
  };

  connect().catch((err) => {
    console.error("Error:", err);
  });

  // Async/Await:
  const fetchUsers = async () => {
    try {
      const [rows] = await connection.promise().query("SELECT * FROM users");
      console.log(rows);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  fetchUsers();
}

//? 10. Connecting to Cloud SQL Databases
// To connect Node.js to a cloud-hosted SQL database (like AWS RDS, Google Cloud SQL, or Azure SQL),
// you need to provide the connection string with the remote server’s host and credentials.
{
  // Example (Connecting to AWS RDS MySQL):
  const connection = mysql.createConnection({
    host: "your-rds-instance.amazonaws.com",
    user: "root",
    password: "password",
    database: "mydatabase",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to AWS RDS MySQL database.");
  });
}

// Replace **`your-rds-instance.amazonaws.com`** with your actual cloud database host address,
// and use the appropriate credentials.

//? SQL Database Connection Summary:

// **MySQL** is one of the most popular SQL databases used with Node.js, but similar

//  steps apply to other SQL databases like PostgreSQL and SQL Server.
// **CRUD Operations**: You can perform Create, Read, Update, and Delete operations by executing SQL queries.
// **Prepared Statements**: Use prepared statements to protect your application from SQL injection.
// **Connection Pooling**: Create a pool of database connections to handle multiple queries efficiently.
// **Transactions**: Handle multiple operations as a single transaction, rolling back changes if any operation fails.
// **Promise Support**: `mysql2` supports promises and async/await, making query handling more convenient in asynchronous code.
// **Cloud SQL Databases**: Easily connect Node.js to cloud-hosted SQL databases like AWS RDS and Google Cloud SQL by providing the remote connection details.
