//! ================================= ORM(Object Relational Mapping) in Node.js =================================

// An ORM allows developers to interact with relational databases (like MySQL, PostgreSQL, or SQLite) using JavaScript
// objects instead of writing SQL queries manually. It abstracts the database operations, making it easier to perform
// CRUD operations, manage database schemas, and implement data validation.

// In Node.js, popular ORMs include **Sequelize**, **TypeORM**, and **Bookshelf.js**. Below, we'll focus on **Sequelize**,
// one of the most widely-used ORMs in the Node.js ecosystem, to illustrate how to connect to a database and manage it.

// Subtopics and Details:
//? Installing Dependencies
//? Connecting to a Database
//? Understanding the Sequelize Configuration
//? Defining Models and Schemas
//? Performing CRUD Operations
//? Associations and Relations
//? Sequelize Queries
//? Handling Migrations
//? Best Practices for Using ORMs
//? Using Sequelize with Cloud Databases

//? 1. Installing Dependencies
// To set up an ORM like Sequelize, you need to install both **Sequelize** and the appropriate database
// driver (e.g., for MySQL, PostgreSQL, or SQLite).

// For **Sequelize** with **MySQL**, install the following packages:
//! npm install sequelize mysql2

// For **PostgreSQL**:
//! npm install sequelize pg pg-hstore

// For **SQLite**:
//! npm install sequelize sqlite3

//? 2. Connecting to a Database
// To connect to a relational database using Sequelize, you create a Sequelize instance with connection
// details such as the database name, username, password, host, and dialect (type of database).
{
  // Example (MySQL):
  // const { Sequelize } = require('sequelize');

  // Create a new Sequelize instance
  const sequelize = new Sequelize("database_name", "username", "password", {
    host: "localhost",
    dialect: "mysql",
  });

  // Test the connection
  sequelize
    .authenticate()
    .then(() => {
      console.log(
        "Connection to the database has been established successfully."
      );
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}
// In this example:
//* The `Sequelize` instance requires the database name, username, password, and host.
//* The **`authenticate()`** method checks if the connection is successfully established.

//? 3. Understanding the Sequelize Configuration
// Sequelize can be configured using a `sequelize.config.js` file or directly within the code.
// The basic connection options include:

//* `database`**: Name of the database.
//* `username`**: Username for database access.
//* `password`**: Password for database access.
//* `dialect`**: The database dialect (e.g., `mysql`, `postgres`, `sqlite`).
//* `host`**: The hostname of the database server.
{
  // Example (Configuration Object):
  const sequelize = new Sequelize({
    database: "database_name",
    username: "username",
    password: "password",
    host: "localhost",
    dialect: "mysql",
  });
}

//? 4. Defining Models and Schemas
// In Sequelize, a **model** represents a table in the database. Each model is defined as a class that
// extends Sequelize's `Model` class, and the schema defines the structure of the table (columns, data types, etc.).
{
  // Example (Defining a Model):
  // const { Sequelize, DataTypes } = require('sequelize');
  const sequelize = new Sequelize("database_name", "username", "password", {
    host: "localhost",
    dialect: "mysql",
  });

  // Define a User model
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
  );

  // Sync model with the database
  User.sync({ force: true }).then(() => {
    console.log("User model was synchronized with the database.");
  });
}

// In this example:
//* `sequelize.define()`** defines a new model (table) called `User`.
//* The model's schema includes fields like `username`, `age`, and `email`.
//* `sync()`** ensures the model is created in the database.

//? 5. Performing CRUD Operations
// You can perform CRUD (Create, Read, Update, Delete) operations using Sequelize models.

// Create (Insert):
User.create({
  username: "JohnDoe",
  age: 25,
  email: "john@example.com",
}).then((user) => {
  console.log("New user created:", user.toJSON());
});

// Read (Find):
User.findAll().then((users) => {
  console.log(users);
});

// Update:
User.update(
  { age: 26 },
  {
    where: { username: "JohnDoe" },
  }
).then(() => {
  console.log("User updated");
});

// Delete:
User.destroy({
  where: { username: "JohnDoe" },
}).then(() => {
  console.log("User deleted");
});

//? 6. Associations and Relations
// Sequelize supports **associations** like `hasOne`, `hasMany`, `belongsTo`, and `belongsToMany`,
// allowing you to define relationships between models (tables).
{
  // Example (One-to-Many Relationship):
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  });

  // Define relationships
  User.hasMany(Post);
  Post.belongsTo(User);

  // Sync models and relationships with the database
  sequelize.sync({ force: true });
}

// In this example:
// A `User` can have many `Post` instances, creating a one-to-many relationship.
// A `Post` belongs to a `User`.

//? 7. Sequelize Queries
// Sequelize provides various query helpers like `findAll()`, `findOne()`, `update()`, and `destroy()`.
// These methods support query conditions, pagination, and sorting.
{
  // Example (Query with Conditions):
  User.findAll({
    where: { age: { [Sequelize.Op.gt]: 18 } }, // Find users older than 18
    limit: 10, // Limit the results to 10
    order: [["age", "DESC"]], // Sort by age in descending order
  }).then((users) => {
    console.log(users);
  });
}

//? 8. Handling Migrations
// Sequelize supports **migrations** to manage schema changes. Migrations allow you to create, alter,
// and drop tables without manually writing SQL commands.

// Example (Generating a Migration):
//! npx sequelize-cli migration:generate --name create-users-table
// This generates a migration file where you define schema changes (e.g., adding or modifying tables).

// To run migrations:
//! npx sequelize-cli db:migrate

//? 9. Best Practices for Using ORMs

//* Use Migrations: Always use migrations to keep track of schema changes, especially in production environments.
//* Error Handling: Handle database connection errors and transaction failures to ensure your application remains stable.
//* Use Associations: Use Sequelize’s built-in association methods to define relationships between tables for complex data models.
//* Connection Pooling: Sequelize supports connection pooling, which helps optimize database performance under heavy loads.
//* Eager and Lazy Loading: Use Sequelize’s eager loading (`include`) and lazy loading features to optimize related data retrieval.

//? 10. Using Sequelize with Cloud Databases
// To connect Sequelize to cloud-hosted databases like Amazon RDS, Google Cloud SQL, or Azure, you’ll
// need the appropriate connection string, just like for local databases. Below is an example for connecting
// to a cloud MySQL database.
{
  // Example (Connecting to Amazon RDS MySQL):
  const sequelize = new Sequelize("database_name", "username", "password", {
    host: "your-rds-instance.amazonaws.com",
    dialect: "mysql",
    port: 3306,
    logging: false,
  });
}

// Replace the **`host`** and **`port`** with the actual values from your cloud database provider.

//? Summary of ORM in Node.js:

//* Sequelize** is one of the most popular ORMs in Node.js, allowing developers to interact with relational databases using JavaScript objects.
//* CRUD Operations**: Perform CRUD operations using model methods like `create()`, `findAll()`, `update()`, and `destroy()`.
//* Associations**: Define relationships between models (tables) using associations like `hasMany`, `belongsTo`, etc.
//* Migrations**: Use Sequelize migrations to manage database schema changes.
//* Cloud Databases**: Easily connect to cloud-hosted databases like Amazon RDS or Google Cloud SQL using Sequelize’s configuration.
