//! ========================================= Streams in Node.js =========================================

// Streams are a fundamental concept in Node.js that allow you to work with large amounts of data in an efficient way. Streams are instances of EventEmitter and allow you to read data from a source or write data to a destination in a continuous manner.

// Subtopics and Details:
//? Types of Streams
//? Readable Streams
//? Writable Streams
//? Duplex Streams
//? Transform Streams
//? Piping
//? Events in Streams
//? Creating Custom Streams
//? Handling Errors in Streams

//? 1. Types of Streams
// There are four main types of streams in Node.js:

//* Readable: Used for reading data.
//* Writable: Used for writing data.
//* Duplex: Can be used for both reading and writing data.
//* Transform: A type of duplex stream where the output is computed based on the input.

//? 2. Readable Streams
// Readable streams are used to read data from a source.
// Examples include fs.createReadStream for file reading and HTTP responses.
{
  const fs = require("fs");

  const readableStream = fs.createReadStream("example.txt", "utf8");

  readableStream.on("data", (chunk) => {
    console.log("Received chunk:", chunk);
  });

  readableStream.on("end", () => {
    console.log("No more data");
  });
}
// Subtopics:
//* Creating Readable Streams: fs.createReadStream()
//* Reading Data: Using the data event
//* End of Data: Using the end event

//? 3. Writable Streams
// Writable streams are used to write data to a destination.
// Examples include fs.createWriteStream for file writing and HTTP requests.
{
  const fs = require("fs");

  const writableStream = fs.createWriteStream("example.txt");

  writableStream.write("Hello, world!\n");
  writableStream.write("Writing more data...\n");
  writableStream.end("Finished writing");
}
// Subtopics:
//* Creating Writable Streams: fs.createWriteStream()
//* Writing Data: Using the write method
//* Finishing Writing: Using the end method

//? 4. Duplex Streams
// Duplex streams are both readable and writable. Examples include TCP sockets.
{
  const { Duplex } = require("stream");

  const duplexStream = new Duplex({
    read(size) {
      this.push("Some data");
      this.push(null); // No more data
    },
    write(chunk, encoding, callback) {
      console.log("Received chunk:", chunk.toString());
      callback();
    },
  });

  duplexStream.on("data", (chunk) => {
    console.log("Reading data:", chunk.toString());
  });

  duplexStream.write("Hello, Duplex");
  duplexStream.end();
}
// Subtopics:
//* Creating Duplex Streams: Using the Duplex class
//* Reading and Writing Data: Implementing the read and write methods

//? 5. Transform Streams
// Transform streams are duplex streams that can modify or transform the data as it is read or written.
{
  const { Transform } = require("stream");

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().toUpperCase());
      callback();
    },
  });

  process.stdin.pipe(transformStream).pipe(process.stdout);
}
// Subtopics:
//* Creating Transform Streams: Using the Transform class
//* Transforming Data: Implementing the transform method

//? 6. Piping
// Piping is a mechanism for connecting the output of one stream to the input of another.
// This is commonly used for chaining operations.
{
  const fs = require("fs");

  const readableStream = fs.createReadStream("source.txt");
  const writableStream = fs.createWriteStream("destination.txt");

  readableStream.pipe(writableStream);
}
// Subtopics:
//* Using pipe Method: Connecting streams
//* Chaining Pipes: Creating pipelines of multiple streams

//? 7. Events in Streams
// Streams emit several events, including:
//* data: When a chunk of data is available
//* end: When no more data will be provided
//* error: When an error occurs
//* finish: When all data has been flushed to the underlying system (writable streams)
//* close: When the stream is closed
{
  const fs = require("fs");

  const readableStream = fs.createReadStream("example.txt");

  readableStream.on("data", (chunk) => {
    console.log("Data:", chunk);
  });

  readableStream.on("end", () => {
    console.log("End of stream");
  });

  readableStream.on("error", (err) => {
    console.error("Error:", err);
  });

  readableStream.on("close", () => {
    console.log("Stream closed");
  });
}

//? 8. Creating Custom Streams
// You can create custom streams by extending the built-in stream classes.
{
  const { Readable } = require("stream");

  class CustomReadableStream extends Readable {
    constructor(options) {
      super(options);
      this.currentCharCode = 65; // ASCII code for 'A'
    }

    _read(size) {
      this.push(String.fromCharCode(this.currentCharCode++));
      if (this.currentCharCode > 90) {
        this.push(null); // End of stream
      }
    }
  }

  const customStream = new CustomReadableStream();
  customStream.pipe(process.stdout);
}
// Subtopics:
//* Extending Stream Classes: Creating custom readable, writable, duplex, and transform streams
//* Implementing _read and _write Methods: Defining custom behavior for streams

//? 9. Handling Errors in Streams
// It's important to handle errors in streams to avoid crashes and data loss.
{
  const fs = require("fs");

  const readableStream = fs.createReadStream("nonexistent.txt");

  readableStream.on("error", (err) => {
    console.error("Stream error:", err);
  });
}
// Subtopics:
//* Listening for error Events: Proper error handling
//* Graceful Degradation: Ensuring application stability
