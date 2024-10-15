//! ===================================== Stream and Buffer in Node.js =====================================

// In Node.js, streams are objects that allow reading data from a source or writing data to a destination
// in a continuous fashion. Buffers, on the other hand, are temporary storage areas for binary data.
// Understanding how to effectively use streams and buffers is essential for efficient data handling,
// especially for large files or data streams.

// Subtopics:
//? Understanding Streams
//? Types of Streams
//? Buffer Basics
//? Using Buffer with Streams
//? Stream Buffering
//? Memory Management with Buffers
//? Real-World Use Cases
//? Best Practices

//? 1. Understanding Streams
// A **stream** is a sequence of data that is read or written in chunks. Streams are especially useful for
// handling large amounts of data because they do not require the entire data to be loaded into memory at once.

// Key Characteristics:
//* - Non-blocking: Streams allow you to process data without waiting for the entire data to be available.
//* - Event-driven: Streams emit events as data is read or written.

//? 2. Types of Streams
// Node.js provides four main types of streams:
//* - Readable Streams: Used for reading data (e.g., `fs.createReadStream`).
//* - Writable Streams: Used for writing data (e.g., `fs.createWriteStream`).
//* - Duplex Streams: Can read and write data (e.g., TCP sockets).
//* - Transform Streams: A type of Duplex stream that modifies the data as it is written and read (e.g., `zlib.createGzip`).

//? 3. Buffer Basics
// A Buffer is a global object in Node.js that provides a way to work with binary data. Buffers are used to
// handle raw binary data, such as reading from a file or a network socket.

// Creating Buffers:
```javascript
const buf1 = Buffer.alloc(10); // Allocates a buffer of 10 bytes
const buf2 = Buffer.from('Hello'); // Creates a buffer from a string
const buf3 = Buffer.from([1, 2, 3]); // Creates a buffer from an array
```;

// Buffer Methods:
//* - `Buffer.concat(list)`: Concatenates multiple buffers into one.
//* - `buf.toString(encoding)`: Converts the buffer to a string with a specified encoding.
//* - `buf.slice(start, end)`: Returns a section of the buffer as a new buffer.

//? 4. Using Buffer with Streams
// Buffers are commonly used with streams to read and write data efficiently. When dealing with streams,
// data is processed in chunks, which helps reduce memory usage.
{
  // Example of Reading a File with Streams:
  const fs = require("fs");

  const readStream = fs.createReadStream("example.txt");
  readStream.on("data", (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
  });
  readStream.on("end", () => {
    console.log("Finished reading the file.");
  });
}

// Example of Writing Data to a File:
```javascript
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello, World!\n');
writeStream.end();
writeStream.on('finish', () => {
  console.log('Finished writing to the file.');
});
```;

//? 5. Stream Buffering
// Stream Buffering refers to the temporary storage of data being read from or written to streams.
// Buffering helps manage the flow of data, ensuring that the system does not get overwhelmed with too much data at once.

// - High Water Mark: A threshold that defines when the internal buffer should stop reading from the source
// or writing to the destination.

```javascript
const readStream = fs.createReadStream('largeFile.txt', { highWaterMark: 16 * 1024 }); // 16KB chunks
```;

// - Flow Control: The stream automatically manages the flow of data based on the buffer levels. When the
// buffer is full, it stops reading until there’s space available.

//? 6. Memory Management with Buffers
// Proper memory management is essential when working with buffers to avoid memory leaks and ensure optimal performance:

//* - Limit Buffer Size: Use the `highWaterMark` option to control the size of the buffer.
//* - Release Buffers: Nullify buffers when they are no longer needed to free up memory.

```javascript
let buffer = Buffer.alloc(1024); // Allocate 1KB buffer
// Use buffer...
buffer = null; // Release buffer when done
```;

//? 7. Real-World Use Cases
// Streams and buffers are commonly used in various real-world applications:
//* - File Processing: Reading and writing large files without loading the entire content into memory (e.g., log files).
//* - Network Communication: Handling incoming data packets over TCP connections.
//* - Data Transformation: Streaming data through transformation processes (e.g., compression or encryption).

//? 8. Best Practices
//* - Use Streams for Large Data: Always prefer streams for processing large files or data sets.
//* - Handle Errors: Implement error handling on streams to avoid crashes.

```javascript
readStream.on('error', (err) => {
  console.error('An error occurred:', err);
});
```;

//* - Avoid Global Buffers: Limit the use of global buffers to reduce memory consumption and potential leaks.
//* - Profile Memory Usage: Regularly profile your application to identify and fix memory leaks related to buffers and streams.

//? Conclusion
// Understanding and effectively using Stream Buffers in Node.js is essential for building efficient
// applications that handle large amounts of data. By leveraging streams, you can optimize memory usage,
// enhance performance, and provide a better user experience. Implementing best practices and employing
// appropriate techniques will help ensure your Node.js applications are robust and scalable.
