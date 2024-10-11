//! ===================================== Package.json in Node.js =====================================

// The `package.json` file is a crucial part of any Node.js project. It serves as a manifest file that
// contains essential metadata about the project, such as project name, version, dependencies, and more.
// It helps manage project dependencies and scripts, enabling easy sharing and collaboration.

// Subtopics:
//? What is `package.json`?
//? Core Fields in `package.json`
//? Commonly Used Fields in `package.json`
//? Scripts Section
//? Dependencies in `package.json`
//? DevDependencies
//? PeerDependencies
//? OptionalDependencies
//? Engines
//? Versioning and Semantic Versioning
//? Using `package.json` to Automate Tasks
//? Maintaining `package.json` Best Practices
//? Example `package.json`
//? Useful NPM Commands for Managing `package.json`

//? 1. What is `package.json`?
// The `package.json` file is a JSON (JavaScript Object Notation) file that defines the metadata of your Node.js
// project. It allows Node.js to understand the structure of your project and includes various properties such as:
//* - Project name
//* - Version
//* - Author information
//* - Dependencies (libraries the project requires)
//* - Scripts for automating tasks like building, testing, or starting your app.

// Every Node.js project typically has a `package.json` file created using the command:

//! npm init

// This command will prompt you with questions (like project name, version, description, etc.) and generate a `package.json` file.

//? 2. Core Fields in `package.json`
// The `package.json` file contains several **core fields** that define key aspects of your project. Some of these fields include:
//* - name: The name of your project or package.
//* - version: The current version of your project (follows semantic versioning).
//* - description: A brief description of your project.
//* - main: Entry point file for the project (e.g., `index.js`).
//* - scripts: Defines custom NPM commands for running tasks.
//* - author: The author(s) of the project.
//* - license: Specifies the licensing type.
//* - dependencies: Lists required libraries and their versions.
//* - devDependencies: Lists libraries needed for development but not production.

//? 3. Commonly Used Fields in `package.json`
// Here are some important fields commonly used in a `package.json` file:
//* - repository: Where the source code is hosted (e.g., GitHub).
//* - keywords: An array of keywords that help others discover your project.
//* - bugs: Where to report bugs (URL or email).
//* - homepage: The project's homepage URL.

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "A sample Node.js project",
  "main": "app.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/my-username/my-app.git"
  },
  "author": "John Doe",
  "license": "MIT"
}
```;

//? 4. Scripts Section
// The `scripts` section in `package.json` allows you to define NPM commands that automate tasks like building,
// testing, or running your app. Each key in this section represents a command that you can run via NPM.

```json
{
  "scripts": {
    "start": "node app.js",
    "test": "jest",
    "build": "webpack --config webpack.config.js"
  }
}
```;

// To run a script:
```bash
npm run start
npm run test
npm run build
```;

// You can also create custom scripts that chain commands or perform other tasks.

//? 5. Dependencies in `package.json`
// The `dependencies` field lists the libraries that your project needs to run in production.
// These are essential packages required for your app to work.

```json
{
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.12.3"
  }
}
```;

// This means the project depends on `express` and `mongoose`. The version numbers follow semantic versioning,
// and the `^` symbol means that any compatible updates to the package can be installed.

//? 6. DevDependencies
// The `devDependencies` field is similar to `dependencies`, but it lists packages that are only needed for development,
// not in production. These include testing libraries, build tools, or linters.

```json
{
  "devDependencies": {
    "jest": "^26.6.3",
    "eslint": "^7.10.0"
  }
}
```;

// You can install dev dependencies with:
//! npm install --save-dev jest eslint

//? 7. PeerDependencies
// `peerDependencies` define packages that your project requires in conjunction with another package.
// This is useful for plugins or libraries that expect certain versions of a framework or tool to be present
// in the parent project.

```json
{
  "peerDependencies": {
    "react": ">=16.8.0"
  }
}
```;

// In this case, a package may require `react` version 16.8.0 or higher in the parent project.

//? 8. OptionalDependencies
// The `optionalDependencies` field lists packages that are not critical for your project but can add
// additional functionality. If installation of an optional dependency fails, it will not cause the
// overall installation to fail.

```json
{
  "optionalDependencies": {
    "fsevents": "^2.3.2"
  }
}
```;

//? 9. Engines
// The `engines` field is used to specify the version of Node.js (or NPM) that your project requires.
// It ensures that users or environments use compatible versions of Node.js.

```json
{
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```;

//? 10. Versioning and Semantic Versioning
// The `version` field in `package.json` follows semantic versioning (SemVer). The format is `MAJOR.MINOR.PATCH`:
//* - MAJOR: Breaking changes that are incompatible with previous versions.
//* - MINOR: Backward-compatible new features.
//* - PATCH: Backward-compatible bug fixes.

```json
{
  "version": "1.2.3"
}
```;

// This means the current version is 1.2.3, with 1 as the major version, 2 as the minor version, and 3 as the patch version.

//? 11. Using `package.json` to Automate Tasks
// In addition to managing dependencies, you can use `package.json` to automate tasks like:
//* - Running tests using the `test` script.
//* - Starting the server using the `start` script.
//* - Building the project using the `build` script.

// These scripts save time and simplify common tasks.

//? 12. Maintaining `package.json` Best Practices
// Some best practices to keep in mind when working with `package.json`:
//* - Use semantic versioning for your project and dependencies.
//* - Keep your dependencies up to date by regularly updating the `package.json` file.
//* - Commit the `package-lock.json` file to ensure consistent dependency versions across environments.
//* - Use scripts to automate repetitive tasks like testing, linting, and building.
//* - Avoid unnecessary dependencies to keep your project lightweight.

//? 13. Example `package.json`
// Below is an example `package.json` file for a typical Node.js project:

```json
{
  "name": "my-node-project",
  "version": "1.0.0",
  "description": "A sample Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "build": "webpack --config webpack.config.js"
  },
  "author": "Jane Doe",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.12.3"
  },
  "devDependencies": {
    "jest": "^26.6.3",
    "eslint": "^7.10.0"
  }
}
```;

//? 14. Useful NPM Commands for Managing `package.json`
// Here are some common NPM commands for managing the `package.json` file:
//! - `npm init`: Creates a new `package.json` file for your project.
//! - `npm install <package>`: Installs a package and updates `package.json`.
//! - `npm install`: Installs all dependencies listed in `package.json`.
//! - `npm update`: Updates installed packages according to `package.json`.
//! - `npm audit`: Audits the project for security vulnerabilities.
//! - `npm version <newversion>`: Updates the version in `package.json`.

//? Summary of `package.json` in Node.js
// The package.json file is an essential component of every Node.js project. It provides metadata about the
// project and manages dependencies, scripts, and versioning. By using package.json, you can automate common tasks,
// maintain consistent project setups, and easily collaborate with other developers.
