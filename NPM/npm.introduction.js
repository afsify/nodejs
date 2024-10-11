//! ===================================== NPM Introduction in Node.js =====================================

// NPM (Node Package Manager) is the default package manager for the JavaScript runtime environment Node.js*.
// It helps developers install, share, and manage libraries, tools, and frameworks for Node.js applications.
// NPM simplifies project management by handling dependencies, automating installations, and providing
// access to a vast repository of open-source packages.

// Subtopics:
//? What is NPM?
//? NPM and Node.js: The Relationship
//? Core Features of NPM
//? What is a Package?
//? What is the NPM Registry?
//? Understanding `package.json`
//? Understanding `node_modules`
//? NPM Commands Overview
//? NPM Scripts
//? NPM Registry Authentication
//? Semantic Versioning
//? NPM Security Features
//? NPM Configuration
//? NPM Alternatives
//? Best Practices for Using NPM

//? 1. What is NPM?
// NPM is a package manager that allows developers to:
//* - Install open-source packages from the NPM registry.
//* - Share their own packages with the community.
//* - Manage project dependencies, making it easier to collaborate and ensure project consistency.

// It is included by default when you install Node.js, and it can be used via the terminal or command prompt.

//? 2. NPM and Node.js: The Relationship
// NPM is bundled with Node.js and provides essential tooling for working with Node.js projects.
// It helps manage libraries or tools that developers need for building Node.js applications. For example:
//* - Node.js: The runtime that executes JavaScript on the server.
//* - NPM: The package manager that installs libraries and manages dependencies for Node.js projects.

// When you install Node.js, NPM is automatically installed along with it.

//? 3. Core Features of NPM
// NPM offers the following primary features:
//* - Package Installation: Install reusable code libraries or tools (called packages).
//* - Version Management: Ensures consistency by managing the version of each package in your project.
//* - Dependency Management: Tracks dependencies and their dependencies, ensuring all required packages are installed correctly.
//* - Package Sharing: Allows developers to publish their own packages to the NPM registry for others to use.
//* - NPM Scripts: Automates common tasks in your project (e.g., running tests, building files).

//? 4. What is a Package?
// A package is a collection of files that contains code for a specific task or function,
// which you can install into your project. It typically consists of JavaScript files and a
// `package.json` file that describes the package.

// Examples of popular NPM packages:
//* - `express`: A web framework for Node.js.
//* - `lodash`: A utility library for JavaScript.
//* - `mongoose`: A MongoDB object modeling tool.

//? 5. What is the NPM Registry?
// The NPM Registry is a vast repository of JavaScript packages maintained by NPM,
// Inc. It is the source from which you download packages. Developers around the world can:
//* - Publish their own packages to the registry.
//* - Download existing packages to their projects.

// When you run `npm install`, NPM fetches the package from this registry.

//? 6. Understanding `package.json`
// The `package.json` file is a crucial file in any Node.js project. It acts as a manifest that contains metadata about the project, including:
//* - Project name and version.
//* - Dependencies required to run the project.
//* - Scripts for automating tasks (e.g., testing, building).
//* - Author information, licensing, etc.

// Example of a `package.json` file:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A simple project",
  "dependencies": {
    "express": "^4.17.1"
  },
  "scripts": {
    "start": "node app.js",
    "test": "mocha"
  }
}
```;

//? 7. Understanding `node_modules`
// The `node_modules` folder contains all the installed packages for your project.
// When you install a package using NPM, it is stored in this directory. Each package may also have its
// own dependencies, which are recursively installed inside the `node_modules` folder.

// You should not manually edit the contents of `node_modules` because NPM automatically manages this folder.
// Instead, use `npm install` to update or add new packages.

//? 8. NPM Commands Overview
// Some of the most commonly used NPM commands include:
//* - `npm init`: Initializes a new project, creating a `package.json` file.
//* - `npm install <package-name>`: Installs a package and adds it to `package.json`.
//* - `npm install`: Installs all the dependencies listed in `package.json`.
//* - `npm update <package-name>`: Updates an installed package.
//* - `npm uninstall <package-name>`: Uninstalls a package and removes it from `package.json`.
//* - `npm start`: Runs the default start script defined in `package.json`.
//* - `npm publish`: Publishes your package to the NPM registry.

//? 9. NPM Scripts
// NPM scripts are shortcuts for running custom commands and tasks. You define them inside the
// `scripts` section of `package.json`. Common uses include running tests, starting a development server,
// and building production-ready files.

```json
{
  "scripts": {
    "start": "node app.js",
    "build": "webpack --config webpack.config.js",
    "test": "jest"
  }
}
```;

// To run the `start` script:
//! npm start

// To run the `test` script:
//! npm test

//? 10. NPM Registry Authentication
// To publish private or public packages to the NPM registry, you need to authenticate with your
// NPM account. This can be done via the terminal using:

//! npm login

// This will prompt you to enter your credentials for the NPM registry. After logging in,
// you can publish your packages using:

//! npm publish

//? 11. Semantic Versioning
// NPM uses **Semantic Versioning** (SemVer) to specify version ranges for packages.
// Versions are represented in `MAJOR.MINOR.PATCH` format:
//* - MAJOR: Introduces breaking changes.
//* - MINOR: Adds new features in a backward-compatible manner.
//* - PATCH: Fixes bugs in a backward-compatible manner.

//! npm install lodash@4.17.21

//? 12. NPM Security Features
// NPM provides several tools to ensure security in your project:
//* - NPM Audit: Scans your project for known vulnerabilities and provides a report.
//* - NPM Audit Fix: Automatically fixes vulnerabilities if possible.
//* - NPM Security Best Practices: Encourages keeping dependencies updated and removing unused packages.

//? 13. NPM Configuration
// NPM provides a way to configure global and project-specific settings using the `.npmrc` file.
// You can specify different behaviors, such as proxy settings, custom registries, or access tokens.

// Example of creating a local `.npmrc` file to set up a custom registry:
//! registry=https://custom-registry.com/

//? 14. NPM Alternatives
// While NPM is the default package manager for Node.js, there are other package managers as well:
//* - Yarn: Developed by Facebook, Yarn is known for its speed and reliability.
//* - PNPM: A fast, disk space-efficient package manager that minimizes duplication.

//? 15. Best Practices for Using NPM
//* - Avoid global package installations unless absolutely necessary. Use local installations for project-specific tools.
//* - Use `.npmrc for project-specific configurations, such as custom registries or proxy settings.
//* - Audit dependencies regularly using `npm audit` to identify vulnerabilities.
//* - Use semantic versioning to control package updates and avoid breaking changes in your project.
//* - Commit `package-lock.json to version control to ensure consistency across environments.

//? Summary of NPM Introduction in Node.js
//* - NPM is a package manager bundled with Node.js, used to install, share, and manage packages.
//* - Packages are reusable code modules that can be easily installed into projects.
//* - The NPM Registry hosts a vast collection of packages for developers to use.
//* - Key files such as `package.json` and `node_modules` play important roles in managing dependencies.
//* - NPM also offers features for running scripts, version management via semantic versioning, and security auditing.

// NPM is integral to the Node.js ecosystem, enabling developers to manage dependencies and focus on writing better code.
