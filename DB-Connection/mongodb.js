//! ================================= MongoDB Database Connection in Node.js =================================

// Connecting a Node.js application to a MongoDB database allows you to interact with the database by performing
// CRUD (Create, Read, Update, Delete) operations. In Node.js, the most popular library for MongoDB interactions
// is the `mongoose` package, which provides a schema-based solution for MongoDB modeling.

// Subtopics and Details:
//? Installing Dependencies
//? Connecting to MongoDB
//? Understanding MongoDB Connection URI
//? Handling Connection Events
//? Schemas and Models
//? CRUD Operations
//? Using Mongoose Queries
//? Best Practices for MongoDB Connections
//? MongoDB Atlas (Cloud MongoDB) Connection

//? 1. Installing Dependencies
// Before connecting to MongoDB, you need to install two main packages: `mongoose` for object modeling and
// `mongodb` for the official MongoDB driver (if needed).

// To install `mongoose`:
//! npm install mongoose

// To install the official `mongodb` driver (if you prefer to use it directly):
//! npm install mongodb

//? 2. Connecting to MongoDB
// To connect your Node.js app to a MongoDB database, you can use either the MongoDB native driver
// or the Mongoose library. Below are examples of both methods.
{
  // Mongoose Example:
  const mongoose = require("mongoose");

  mongoose.connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
}

// In this code:
//* `mongoose.connect()`** connects to MongoDB using the provided URI.
//* `db.on()`** and **`db.once()`** are used to handle connection events such as errors or successful connection.

{
  // MongoDB Native Driver Example:
  const { MongoClient } = require("mongodb");

  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url, { useUnifiedTopology: true });

  async function connectToDB() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
      const db = client.db("mydatabase");
      // Perform database operations here
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  }

  connectToDB();
}

//? 3. Understanding MongoDB Connection URI
// The MongoDB URI is a string that specifies the protocol, server location, and database information
// for connecting to MongoDB.

// Example URI:
// mongodb://localhost:27017/mydatabase

//* `mongodb://`**: The protocol used to connect.
//* `localhost`**: The server where MongoDB is hosted. Use a server address or `localhost` for local development.
//* `27017`**: The default port for MongoDB.
//* `mydatabase`**: The specific database you're connecting to.

// For cloud services like MongoDB Atlas, the URI includes authentication details, such as username and password:
// mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase

//? 4. Handling Connection Events
// MongoDB connections can experience errors, disconnections, or successful connections. You should
// handle these events for robust database management.
{
  // Example (Handling Events):
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
  });
}

//? 5. Schemas and Models (Mongoose)
// In Mongoose, a Schema defines the structure of a MongoDB document. Once a schema is defined,
// a Model is created from the schema to interact with the database.
{
  // Example (Creating a Schema and Model):
  const mongoose = require("mongoose");

  // Define a schema
  const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
  });

  // Create a model from the schema
  const User = mongoose.model("User", userSchema);

  // Create and save a new user
  const newUser = new User({
    name: "John Doe",
    age: 30,
    email: "john@example.com",
  });

  newUser.save((err) => {
    if (err) console.error("Error saving user:", err);
    else console.log("User saved successfully");
  });
}

//? 6. CRUD Operations
// You can perform CRUD operations (Create, Read, Update, Delete) using the Mongoose model.
{
  // Create (Insert):
  const user = new User({ name: "Alice", age: 25 });
  user.save();

  // Read (Find):
  User.find({ age: { $gt: 20 } }, (err, users) => {
    if (err) console.error(err);
    console.log(users);
  });

  // Update:
  User.updateOne({ name: "Alice" }, { age: 26 }, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });

  // Delete:
  User.deleteOne({ name: "Alice" }, (err) => {
    if (err) console.error(err);
    console.log("User deleted");
  });
}

//? 7. Using Mongoose Queries
// Mongoose allows the use of various query helpers such as `find()`, `findOne()`, `update()`, `remove()`,
// and many more. You can chain these methods for more complex queries.
{
  User.find({ age: { $gte: 18 } })
    .sort({ name: -1 })
    .limit(5)
    .exec((err, users) => {
      if (err) console.error(err);
      console.log(users);
    });
}

// In this example:
//* `find()` is used to fetch users with age greater than or equal to 18.
//* `sort()` is used to sort the results in descending order based on the `name` field.
//* `limit()` restricts the number of results returned to 5.

//? 8. Best Practices for MongoDB Connections
//* Connection Pooling: MongoDB automatically manages connection pooling, but you can configure it to optimize performance, especially in production environments.
//* Handle Connection Errors: Always handle connection errors and implement retry logic if necessary.
//* Keep Connections Alive: Use the `useUnifiedTopology` and `useNewUrlParser` options to handle server discovery and reconnections in a modern way.
//* Close Connections Gracefully: Ensure your Node.js application closes MongoDB connections gracefully when shutting down.

//? 9. MongoDB Atlas (Cloud MongoDB) Connection
// MongoDB Atlas is a cloud-hosted MongoDB service. Connecting to Atlas involves a URI that contains
// your database credentials and cluster information.
{
  // Example (Connecting to MongoDB Atlas):
  mongoose.connect(
    "mongodb+srv://username:password@cluster0.mongodb.net/mydatabase",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB Atlas");
  });
}

// You'll need to replace **`username`**, **`password`**, and **`cluster0.mongodb.net`** with your actual
// credentials and cluster address.

//? MongoDB Database Connection Summary:

//* Mongoose provides an abstraction layer to MongoDB that allows you to define schemas and models for interacting with the database.
//* Native MongoDB driver can also be used, offering more direct access but less abstraction.
//* You perform CRUD operations (Create, Read, Update, Delete) with Mongoose models and handle events for connection success or failure.
//* Cloud MongoDB services like MongoDB Atlas make it easy to connect to MongoDB remotely, with secure authentication and easy scalability.
