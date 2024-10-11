//! ===================================== Publishing a Package in Node.js =====================================

// Publishing a package in Node.js involves sharing your code as a package that can be reused and installed by
// other developers through the NPM registry (Node Package Manager). This allows developers to install and
// use your package via the command `npm install`.

// Subtopics:
//? What is NPM Publishing?
//? Creating an NPM Account
//? Preparing a Package for Publishing
//? Core Fields for Publishing (`package.json`)
//? Versioning and Semantic Versioning
//? Testing Your Package Locally
//? Publishing a Package
//? Updating a Package
//? Unpublishing a Package
//? Private vs Public Packages
//? Best Practices for Publishing
//? Example Workflow for Publishing
//? Managing Package Permissions

//? 1. What is NPM Publishing?
// Publishing a package to **NPM** allows other developers to download, install, and use your package in their
// projects. Once published, your package is accessible through the NPM registry. To do this, you must have an
// NPM account, a properly configured `package.json` file, and adhere to NPM's publishing rules.

// The NPM registry hosts publicly available packages that can be installed with `npm install <package-name>`.
// These packages can range from libraries to entire frameworks, utilities, or services.

//? 2. Creating an NPM Account
// To publish a package, you must first have an NPM account. If you don't have one, you can sign up for free:
//! 1. Go to the [NPM website](https://www.npmjs.com/signup).
//! 2. Create an account by providing your username, email, and password.
//! 3. Once you have an account, log in to NPM from the command line using:

//! npm login

// This will prompt you for your username, password, and email address associated with your NPM account.

//? 3. Preparing a Package for Publishing
// Before publishing, ensure that your project is properly structured and has a valid `package.json` file.
// This file must contain essential fields like the package name, version, and description. You should also
// ensure that your code is clean and well-documented.

// Here’s how to prepare:
//* - Ensure you have a unique package name (you can check this on [NPM](https://www.npmjs.com)).
//* - Follow semantic versioning.
//* - Add a README.md file with usage instructions.
//* - Optionally, include a LICENSE file to specify the legal terms under which your package can be used.

//? 4. Core Fields for Publishing (`package.json`)
// To publish a package, the **`package.json`** file should include some important fields:
//* - name: The unique name of your package (must be lowercase, URL-safe, and not taken on NPM).
//* - version: Version of your package following **semantic versioning** (`MAJOR.MINOR.PATCH`).
//* - description: A brief description of what your package does.
//* - main: The entry point for your package (usually `index.js`).
//* - keywords: A list of keywords that help others find your package.
//* - repository: The URL where your code is hosted (e.g., GitHub).

```json
{
  "name": "my-cool-package",
  "version": "1.0.0",
  "description": "A cool package for doing something great",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/my-cool-package.git"
  },
  "keywords": [
    "cool",
    "utility",
    "nodejs"
  ],
  "author": "Your Name",
  "license": "MIT"
}
```;

//? 5. Versioning and Semantic Versioning
// When publishing a package, versioning is crucial. You should follow semantic versioning (SemVer),
// which uses a `MAJOR.MINOR.PATCH` format:

//* - MAJOR: For breaking changes.
//* - MINOR: For new features that are backward-compatible.
//* - PATCH: For backward-compatible bug fixes.

// For example, if your package is initially version `1.0.0`, then:
//* - If you add a new feature, you might release `1.1.0`.
//* - If you fix a bug, you would release `1.0.1`.
//* - For breaking changes, release `2.0.0`.

//? 6. Testing Your Package Locally
// Before publishing, it's important to test your package locally to ensure that it works as expected when
// installed by other developers.

// To test your package locally:
//* 1. Run the following command from your project root to link your package to the global `node_modules` folder:

//! npm link

//* 2. Create a new project and install your package globally:

//! npm link <package-name>

// This simulates installing your package from NPM without actually publishing it.

//? 7. Publishing a Package
// Once your package is ready, follow these steps to publish it to NPM:

//* 1. Login to NPM:

//! npm login

//* 2. Ensure Your Package is Ready: Make sure your code is clean, documentation is complete, and all necessary files are in place.

//* 3. Publish:
//! npm publish

// This command uploads your package to the NPM registry, making it publicly available.

// If you're publishing a **private package**, you can run:
//! npm publish --access=private

//? 8. Updating a Package
// To update your package, make the necessary changes to your code, update the version number in your
// `package.json` file following semantic versioning, and then run:

//! npm version <newversion>
//! npm publish

```bash
npm version patch  # For bug fixes
npm version minor  # For backward-compatible new features
npm version major  # For breaking changes
```;

//? 9. Unpublishing a Package
// If you need to remove your package from NPM, you can run:

```bash
npm unpublish <package-name> --force
```;

// Note that unpublishing is a sensitive action, and NPM has restrictions in place to prevent abuse,
// such as limiting unpublishing packages older than 24 hours.

//? 10. Private vs Public Packages
//* - Public Packages: These are visible to everyone and can be installed by anyone using `npm install`.
//* - Private Packages: These are only accessible to specific teams or users. You can publish a private package with:

```bash
npm publish --access=private
```;

// Private packages require an NPM paid plan.

//? 11. Best Practices for Publishing
//* - Clear Documentation: Always include a `README.md` file that explains how to use your package.
//* - Versioning: Follow semantic versioning to avoid confusion.
//* - Testing: Thoroughly test your package before publishing.
//* - Use `.npmignore`: Use a `.npmignore` file to prevent unnecessary files (like tests, docs, or config files) from being published to NPM.
//* - Security: Regularly audit your package for security vulnerabilities using `npm audit`.

//? 12. Example Workflow for Publishing
//* 1. Initialize `package.json`: Use `npm init` to create the `package.json`.
//* 2. Write the code: Develop your package functionality.
//* 3. Document: Add a `README.md` with usage instructions.
//* 4. Test Locally: Use `npm link` to test locally.
//* 5. Login to NPM: Run `npm login`.
//* 6. Publish: Run `npm publish`.

//? 13. Managing Package Permissions
// You can add collaborators to your package by using the `npm access` command. This allows others to
// contribute or manage the package:

```bash
npm access grant read-write <username> <package-name>
```;

//? Summary of Publishing a Package in Node.js
// Publishing a package in Node.js involves registering it with the NPM registry, making it available
// for others to install and use. It requires a valid NPM account, a properly configured `package.json`,
// and adherence to versioning rules. By following best practices like writing clear documentation,
// testing locally, and properly managing version numbers, you can ensure a smooth publishing process.
