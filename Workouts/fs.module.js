// Import the built-in 'fs' (File System) module for file operations
const fs = require("fs");

// Read the content of 'test.txt' with UTF-8 encoding
fs.readFile("test.txt", "utf-8", (err, data) =>
  err ? console.error(err) : console.log(data)
);

// Write data to 'new.txt'. If the file does not exist, it will be created
fs.writeFile("new.txt", "This is a new file created by Node.js", (err) =>
  err ? console.error(err) : console.log("File Created")
);

// Append a new line of text to 'new.txt'
fs.appendFile("new.txt", "\nAdded one more line", (err) =>
  err ? console.error(err) : console.log("File Updated")
);

// Rename 'test.txt' to 'sample.txt'
fs.rename("./test.txt", "./sample.txt", (err) =>
  err ? console.error(err) : console.log("File Renamed")
);

// Delete 'new.txt'
fs.unlink("./new.txt", (err) =>
  err ? console.error(err) : console.log("File Deleted")
);

// Create a new directory called 'newFolder'
fs.mkdir("newFolder", (err) =>
  err ? console.error(err) : console.log("Directory Created")
);

// Read the contents of a directory (e.g., 'newFolder')
// Returns an array of file names in the directory
fs.readdir("newFolder", (err, files) =>
  err ? console.error(err) : console.log("Directory Contents:", files)
);

// Remove an empty directory (e.g., 'newFolder')
// If the directory is not empty, it will throw an error
fs.rmdir("newFolder", (err) =>
  err ? console.error(err) : console.log("Directory Removed")
);

// Check the stats of a file (e.g., 'sample.txt')
// Provides information about the file, like size, creation time, etc.
fs.stat("sample.txt", (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log("File Stats:", stats);
    console.log("Is File:", stats.isFile()); // Checks if it's a file
    console.log("Is Directory:", stats.isDirectory()); // Checks if it's a directory
  }
});
