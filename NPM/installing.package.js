//! ===================================== NPM: Installing Packages in Node.js =====================================

// NPM (Node Package Manager) is the default package manager for Node.js, allowing developers to install, manage,
// and share reusable code modules (packages) in their projects. NPM enables you to quickly install third-party
// libraries and tools from its vast ecosystem, making development faster and more efficient.

// Subtopics:
//? What is NPM?
//? Setting Up NPM in a Project
//? Installing Packages Globally vs Locally
//? Semantic Versioning in NPM
//? Installing a Package
//? Installing Specific Versions
//? Saving Dependencies in `package.json`
//? Package Lock File (`package-lock.json`)
//? Installing Development Dependencies
//? Updating Packages
//? Uninstalling Packages
//? Commonly Used NPM Commands
//? Best Practices for Managing Dependencies
//? Managing Global NPM Packages
//? Handling Dependency Conflicts

//? 1. What is NPM?
// NPM is a package manager for Node.js that allows you to:
//* - Install third-party packages or modules.
//* - Share your code as reusable packages.
//* - Manage project dependencies efficiently.

// NPM hosts a massive repository of open-source packages that are used across the Node.js ecosystem,
// allowing developers to use existing tools, libraries, and frameworks without needing to reinvent the wheel.

//? 2. Setting Up NPM in a Project
// Before you can install any packages, you need to set up NPM in your Node.js project.
// This can be done by creating a `package.json` file, which tracks your project's dependencies and other metadata.

// Steps:
// 1. Open the terminal in your project's root directory.
// 2. Run the following command to initialize the project:

//! npm init

// You will be prompted to fill in some information like the project name, version, and description.
// Alternatively, use the `--yes` flag to skip the prompts:

//! npm init --yes

// This will generate a basic `package.json` file.

//? 3. Installing Packages Globally vs Locally
//* - Local Installation: Installs the package in the project’s `node_modules` directory, making it accessible within the project only.
//* - Global Installation: Installs the package globally, making it accessible from anywhere on your system.

// Local Installation (default):
//! npm install <package-name>
// Example:
//! npm install express

// Global Installation:
//! npm install -g <package-name>
// Example:
//! npm install -g nodemon

// Global packages are often tools like `nodemon` or `eslint` that you need available across multiple projects.

//? 4. Semantic Versioning in NPM
// NPM uses Semantic Versioning (SemVer) to indicate the versioning scheme for packages. A version is represented as `MAJOR.MINOR.PATCH`:
//* - MAJOR: Introduces breaking changes.
//* - MINOR: Adds functionality in a backward-compatible manner.
//* - PATCH: Fixes bugs in a backward-compatible manner.

// Example: `1.2.3`
//* - 1: Major version.
//* - 2: Minor version.
//* - 3: Patch version.

// When you install packages, you may encounter version specifiers:
//* - `^1.2.3`: Accepts minor and patch updates, e.g., `1.2.4` or `1.3.0`.
//* - `~1.2.3`: Accepts only patch updates, e.g., `1.2.4`.
//* - `1.2.3`: Locks to this specific version.

//? 5. Installing a Package
// You can install any package from the NPM registry using the `npm install` command.

//! npm install lodash

// This command installs the **lodash** package and adds it to your project’s `node_modules` folder.

//? 6. Installing Specific Versions
// If you need a specific version of a package, you can specify it during installation.

//! npm install lodash@4.17.21

// This will install version `4.17.21` of lodash.

//? 7. Saving Dependencies in `package.json`
// By default, installed packages are listed under the `dependencies` section of `package.json`,
// ensuring that when others clone your project and run `npm install`, the same packages are installed.

// Example of a `package.json` file:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```;

// NPM automatically adds packages to this file when you install them. If you do not want a package to be listed,
// you can install without saving it:

//! npm install <package-name> --no-save

//? 8. Package Lock File (`package-lock.json`)
// When you install packages, NPM generates a `package-lock.json` file, which:
//? - Tracks the exact versions of installed dependencies.
//? - Ensures consistent installations across different environments.
//? - Optimizes package resolution speed by storing the exact dependency tree.

// You should commit `package-lock.json` to version control to ensure consistency.

//? 9. Installing Development Dependencies
// Some packages are required only for development purposes (e.g., testing, linting tools). These can be installed as devDependencies.

//! npm install mocha --save-dev

// In `package.json`, this will be saved under the `devDependencies` section:

```json
{
  "devDependencies": {
    "mocha": "^9.0.0"
  }
}
```;

// To install both `dependencies` and `devDependencies`, run:
//! npm install

// To install only production dependencies:
//! npm install --production

//? 10. Updating Packages
// To update a package to its latest version, use the `npm update` command.

//! npm update lodash

// This will update lodash to the latest version based on the version constraints in `package.json`.

//? 11. Uninstalling Packages
// You can remove a package from your project using the `npm uninstall` command:

//! npm uninstall lodash

// This will:
//* - Remove the package from the `node_modules` folder.
//* - Remove the entry from `package.json`.

//? 12. Commonly Used NPM Commands
//* - `npm init`: Initialize a new project and create a `package.json` file.
//* - `npm install <package>`: Install a package locally.
//* - `npm install -g <package>`: Install a package globally.
//* - `npm install`: Install all dependencies listed in `package.json`.
//* - `npm update`: Update packages to the latest version allowed by `package.json`.
//* - `npm uninstall <package>`: Uninstall a package and remove it from `package.json`.
//* - `npm outdated`: List outdated packages.
//* - `npm audit`: Scan your project for vulnerabilities.
//* - `npm audit fix`: Automatically fix vulnerabilities if possible.

//? 13. Best Practices for Managing Dependencies
//* - Save packages correctly: Use `--save` (or default) for dependencies and `--save-dev` for devDependencies.
//* - Lock versions: Avoid using `*` in version numbers as it may install incompatible versions in the future.
//* - Audit regularly: Use `npm audit` to ensure your dependencies are free from known vulnerabilities.
//* - Use `.npmrc`: Customize NPM behavior (e.g., set a registry, configure proxy settings) with `.npmrc`.

//? 14. Managing Global NPM Packages
// Global packages are installed outside of individual projects and can be accessed anywhere in the system.
// These packages are useful for tools and utilities (e.g., `nodemon`, `http-server`).

// To list globally installed packages:

//! npm list -g --depth=0

// To uninstall a globally installed package:

//! npm uninstall -g <package>

//? 15. Handling Dependency Conflicts
// When two or more packages require different versions of the same dependency, NPM handles this by
// creating multiple versions of the dependency in the `node_modules` folder. However, in some cases,
// this can lead to issues. Use tools like `npm dedupe` to resolve conflicts and reduce duplication of dependencies.

//? Summary of NPM: Installing Packages in Node.js
//* - NPM simplifies managing dependencies in Node.js projects.
//* - Install packages locally for project-specific use and globally for system-wide utilities.
//* - NPM uses semantic versioning to manage versioning and dependencies.
//* - Packages are tracked in `package.json`, and the `package-lock.json` ensures consistency.
//* - Regularly audit, update, and manage your packages to maintain security and avoid conflicts.
