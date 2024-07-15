//! ========================================= Path Module =========================================

// The path module in Node.js provides utilities for working with file and directory paths.
// It is a core module, meaning it comes bundled with Node.js and does not need to be installed separately.

// Subtopics and Details:
//? Joining Paths
//? Resolving Paths
//? Path Normalization
//? Path Parsing
//? Path Formatting
//? Getting Path Segments
//? Absolute vs Relative Paths
//? Platform-Specific Path Delimiters
//? Path Base Name
//? Path Directory Name
//? Path Extension Name

//? 1. Joining Paths
// You can use the path.join method to join multiple path segments into a single path.
{
  const path = require("path");

  const joinedPath = path.join("/users", "joe", "documents");
  console.log(joinedPath); // Outputs: /users/joe/documents
}

//? 2. Resolving Paths
// The path.resolve method resolves a sequence of paths into an absolute path.
{
  const path = require("path");

  const absolutePath = path.resolve("users", "joe", "documents");
  console.log(absolutePath); // Outputs the absolute path, e.g., /current/directory/users/joe/documents
}

//? 3. Path Normalization
// The path.normalize method normalizes a given path, resolving .. and . segments.
{
  const path = require("path");

  const normalizedPath = path.normalize("/users//joe/../documents");
  console.log(normalizedPath); // Outputs: /users/documents
}

//? 4. Path Parsing
// The path.parse method returns an object with the root, dir, base, ext, and name properties of a path.
{
  const path = require("path");

  const parsedPath = path.parse("/users/joe/documents/file.txt");
  console.log(parsedPath);
  /*
Outputs:
{
  root: '/',
  dir: '/users/joe/documents',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/
}

//? 5. Path Formatting
// The path.format method formats an object into a path string. It's the opposite of path.parse.
{
  const path = require("path");

  const pathObject = {
    root: "/",
    dir: "/users/joe/documents",
    base: "file.txt",
  };

  const formattedPath = path.format(pathObject);
  console.log(formattedPath); // Outputs: /users/joe/documents/file.txt
}

//? 6. Getting Path Segments
// You can use methods like path.basename, path.dirname, and path.extname to get specific segments of a path.
{
  const path = require("path");

  const filePath = "/users/joe/documents/file.txt";

  console.log(path.basename(filePath)); // Outputs: file.txt
  console.log(path.dirname(filePath)); // Outputs: /users/joe/documents
  console.log(path.extname(filePath)); // Outputs: .txt
}

//? 7. Absolute vs Relative Paths
// The path.isAbsolute method checks if a given path is absolute.
{
  const path = require("path");

  console.log(path.isAbsolute("/users/joe")); // Outputs: true
  console.log(path.isAbsolute("users/joe")); // Outputs: false
}

//? 8. Platform-Specific Path Delimiters
// Node.js provides properties for platform-specific path delimiters and separators, path.delimiter and path.sep.
{
  const path = require("path");

  console.log(path.delimiter); // Outputs: ; (Windows) or : (POSIX)
  console.log(path.sep); // Outputs: \ (Windows) or / (POSIX)
}

//? 9. Path Base Name
// The path.basename method returns the last portion of a path, which is often the file name.
{
  const path = require("path");

  const filePath = "/users/joe/documents/file.txt";
  console.log(path.basename(filePath)); // Outputs: file.txt
}

//? 10. Path Directory Name
// The path.dirname method returns the directory portion of a path.
{
  const path = require("path");

  const filePath = "/users/joe/documents/file.txt";
  console.log(path.dirname(filePath)); // Outputs: /users/joe/documents
}

//? 11. Path Extension Name
// The path.extname method returns the extension of the path.
{
  const path = require("path");

  const filePath = "/users/joe/documents/file.txt";
  console.log(path.extname(filePath)); // Outputs: .txt
}
