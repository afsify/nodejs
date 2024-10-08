//! ========================================= File System =========================================

// The fs (file system) module in Node.js allows you to work with the file system on your computer.
// It provides a variety of functions to read, write, update, and delete files.

// Subtopics and Details:
//? Reading Files
//? Writing Files
//? Appending to Files
//? Deleting Files
//? Renaming Files
//? Creating Directories
//? Reading Directories
//? Removing Directories
//? Watching Files
//? File Properties

//? 1. Reading Files
// You can read files using fs.readFile for asynchronous reading and fs.readFileSync for synchronous reading.
{
  // Asynchronous Reading:
  const fs = require("fs");

  fs.readFile("example.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
}

{
  // Synchronous Reading:
  const fs = require("fs");

  try {
    const data = fs.readFileSync("example.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

//? 2. Writing Files
// You can write to files using fs.writeFile for asynchronous writing and fs.writeFileSync for synchronous writing.
{
  // Asynchronous Writing:
  const fs = require("fs");

  const content = "Hello, World!";

  fs.writeFile("example.txt", content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File written successfully");
  });
}

{
  // Synchronous Writing:
  const fs = require("fs");

  const content = "Hello, World!";

  try {
    fs.writeFileSync("example.txt", content);
    console.log("File written successfully");
  } catch (err) {
    console.error(err);
  }
}

//? 3. Appending to Files
// To append content to a file, use fs.appendFile or fs.appendFileSync.
{
  // Asynchronous Appending:
  const fs = require("fs");

  const content = "\nAppended Content";

  fs.appendFile("example.txt", content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Content appended successfully");
  });
}

{
  // Synchronous Appending:
  const fs = require("fs");

  const content = "\nAppended Content";

  try {
    fs.appendFileSync("example.txt", content);
    console.log("Content appended successfully");
  } catch (err) {
    console.error(err);
  }
}

//? 4. Deleting Files
// You can delete files using fs.unlink for asynchronous deletion and fs.unlinkSync for synchronous deletion.
{
  // Asynchronous Deletion:
  const fs = require("fs");

  fs.unlink("example.txt", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File deleted successfully");
  });
}

{
  // Synchronous Deletion:
  const fs = require("fs");

  try {
    fs.unlinkSync("example.txt");
    console.log("File deleted successfully");
  } catch (err) {
    console.error(err);
  }
}

//? 5. Renaming Files
// To rename files, use fs.rename for asynchronous renaming and fs.renameSync for synchronous renaming.
{
  // Asynchronous Renaming:
  const fs = require("fs");

  fs.rename("oldname.txt", "newname.txt", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File renamed successfully");
  });
}

{
  // Synchronous Renaming:
  const fs = require("fs");

  try {
    fs.renameSync("oldname.txt", "newname.txt");
    console.log("File renamed successfully");
  } catch (err) {
    console.error(err);
  }
}

//? 6. Creating Directories
// You can create directories using fs.mkdir for asynchronous creation and fs.mkdirSync for synchronous creation.
{
  // Asynchronous Directory Creation:
  const fs = require("fs");

  fs.mkdir("exampleDir", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Directory created successfully");
  });
}

{
  // Synchronous Directory Creation:
  const fs = require("fs");

  try {
    fs.mkdirSync("exampleDir");
    console.log("Directory created successfully");
  } catch (err) {
    console.error(err);
  }
}

//? 7. Reading Directories
// To read the contents of a directory, use fs.readdir for asynchronous reading and
// fs.readdirSync for synchronous reading.
{
  // Asynchronous Directory Reading:
  const fs = require("fs");

  fs.readdir("exampleDir", (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(files);
  });
}

{
  // Synchronous Directory Reading:
  const fs = require("fs");

  try {
    const files = fs.readdirSync("exampleDir");
    console.log(files);
  } catch (err) {
    console.error(err);
  }
}

//? 8. Removing Directories
// To remove directories, use fs.rmdir for asynchronous removal and fs.rmdirSync for synchronous removal.
{
  // Asynchronous Directory Removal:
  const fs = require("fs");

  fs.rmdir("exampleDir", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Directory removed successfully");
  });
}

{
  // Synchronous Directory Removal:
  const fs = require("fs");

  try {
    fs.rmdirSync("exampleDir");
    console.log("Directory removed successfully");
  } catch (err) {
    console.error(err);
  }
}

//? 9. Watching Files
// To watch for changes in a file, use fs.watch.
{
  const fs = require("fs");

  fs.watch("example.txt", (eventType, filename) => {
    console.log(`File ${filename} was modified: ${eventType}`);
  });
}

//? 10. File Properties
// To get information about a file, use fs.stat for asynchronous calls and fs.statSync for synchronous calls.
{
  // Asynchronous File Properties:
  const fs = require("fs");

  fs.stat("example.txt", (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stats);
  });
}

{
  // Synchronous File Properties:
  const fs = require("fs");

  try {
    const stats = fs.statSync("example.txt");
    console.log(stats);
  } catch (err) {
    console.error(err);
  }
}
