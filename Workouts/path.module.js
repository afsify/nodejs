// Import the built-in 'path' module, which provides utilities for working with file and directory paths
const path = require("path");

// Define a file path as a string
const p = "/home/nodejs/sample.txt";

// Get the base name (file name with extension) from the path
console.log(path.basename(p));
// Output: "sample.txt"

// Get the directory name (path without the file) from the path
console.log(path.dirname(p));
// Output: "/home/nodejs"

// Get the file extension from the path
console.log(path.extname(p));
// Output: ".txt"

// Join multiple path segments into one normalized path
console.log(path.join("/home", "js", "index.js"));
// Output: "/home/js/index.js"

// Parse the path into an object with root, dir, base, ext, and name properties
console.log(path.parse(p));
// Output:
// {
//   root: "/",
//   dir: "/home/nodejs",
//   base: "sample.txt",
//   ext: ".txt",
//   name: "sample"
// }
