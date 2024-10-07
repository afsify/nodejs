//! ======================================== Modules in Node.js ========================================

// Modules are a fundamental part of Node.js, allowing you to organize and reuse code.
// Node.js has a modular system where you can create your own modules and use built-in or third-party modules.

// Subtopics and Details:
//? Core Modules
//? Creating Custom Modules
//? Exporting and Importing Modules
//? Built-in Modules
//? Third-Party Modules
//? CommonJS vs ES Modules
//? Module Caching
//? Global vs Local Modules
//? Module Scope
//? Loading Modules

//? 1. Core Modules
// Node.js comes with several built-in modules that provide essential functionalities
// such as file system operations,networking, and more.
{
  const fs = require("fs");

  fs.readFile("example.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

// Common Core Modules:
// fs: File system operations
// http: HTTP server and client
// path: Utilities for working with file and directory paths
// events: Event-driven programming
// util: Utilities for various tasks

//? 2. Creating Custom Modules
// You can create your own modules to encapsulate and reuse code. A module in Node.js is simply a JavaScript file.
{
  math.js(CustomModule);

  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  module.exports = { add, subtract };
  main.js(UsingCustomModule);

  const math = require("./math");

  console.log(math.add(2, 3)); // Outputs: 5
  console.log(math.subtract(5, 2)); // Outputs: 3
}

//? 3. Exporting and Importing Modules
// Modules can export values using module.exports or exports, and import them using require.
{
  // utility.js:
  const greet = (name) => {
    return `Hello, ${name}!`;
  };

  module.exports = greet;

  // app.js:
  const greet = require("./utility");

  console.log(greet("World")); // Outputs: Hello, World!
}

//? 4. Built-in Modules
// Node.js includes several built-in modules that can be used without installation.
{
  const os = require("os");

  console.log("Operating System:", os.type());
  console.log("Total Memory:", os.totalmem());
  console.log("Free Memory:", os.freemem());
}

// Common Built-in Modules:
// os: Operating system information
// crypto: Cryptographic functionalities
// buffer: Binary data handling
// stream: Stream handling
// zlib: Compression and decompression

//? 5. Third-Party Modules
// You can install and use third-party modules from the npm (Node Package Manager) registry.
{
  const _ = require("lodash");

  const numbers = [10, 5, 100, 2, 1000];
  console.log(_.max(numbers)); // Outputs: 1000
}

// Installing Third-Party Modules:
//* npm install lodash

//? 6. CommonJS vs ES Modules
// Node.js supports both CommonJS (CJS) and ECMAScript (ES) modules.
// CommonJS uses require and module.exports, while ES modules use import and export.

// CommonJS:

// math.js
exports.add = (a, b) => a + b;

// app.js
const { add } = require("./math");
console.log(add(2, 3)); // Outputs: 5

// ES Modules:

// math.mjs
export const add = (a, b) => a + b;

// app.mjs
import { add } from "./math.mjs";
console.log(add(2, 3)); // Outputs: 5

// Enabling ES Modules in Node.js:
// To use ES modules, you need to set "type": "module" in your package.json or use the .mjs file extension.

//? 7. Module Caching
// Node.js caches modules after the first time they are loaded, improving performance by avoiding redundant loading.
{
  // cacheExample.js
  console.log("Module loaded");

  // main.js
  require("./cacheExample"); // Outputs: Module loaded
  require("./cacheExample"); // Does not output anything
}

//? 8. Global vs Local Modules
// Modules can be installed globally or locally using npm.
{
  // Local Installation:
  //* npm install lodash
  // Global Installation:
  //* npm install -g lodash
}

//? 9. Module Scope
// Modules in Node.js have their own scope. Variables and functions defined in one module
// are not accessible in another unless explicitly exported.
{
  // moduleA.js:
  const secret = "secret value";
  module.exports = { publicValue: "public value" };

  // app.js:
  const moduleA = require("./moduleA");
  console.log(moduleA.publicValue); // Outputs: public value
  console.log(moduleA.secret); // Outputs: undefined
}

//? 10. Loading Modules
// Modules are loaded using the require function in CommonJS or the import statement in ES modules.
// Node.js resolves the module location using a series of steps including checking core modules,
// relative paths, and node_modules directories.
{
  // Relative Path:
  const myModule = require("./myModule");

  // Node Modules:
  const express = require("express");
}
