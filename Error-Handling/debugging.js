//! =================================== Debugging in Node.js ===================================

// Debugging is a critical skill for identifying and fixing issues in any application. In Node.js,
// the process of debugging involves inspecting the execution of code to find bugs, performance bottlenecks,
// and logic errors. Node.js provides several built-in tools and third-party solutions to assist in debugging.

// Subtopics and Details:
//? Debugging with `console.log`
//? Using Node.js Debugger
//? Using Chrome DevTools
//? Using VSCode Debugger
//? Using `node-inspect`
//? Using Third-Party Debugging Tools
//? Error Stack Traces
//? Debugging Asynchronous Code
//? Debugging Memory Leaks
//? Best Practices for Debugging

//? 1. Debugging with `console.log`
// The simplest and most common form of debugging in Node.js is by using `console.log()` statements to print
// variables and program flow.
{
  function add(a, b) {
    console.log("Adding:", a, b); // Debugging statement
    return a + b;
  }

  const result = add(5, 10);
  console.log("Result:", result);
}

// - Advantages: It's quick and easy to implement.
// - Disadvantages: Clutters code and can be inefficient for large-scale debugging, especially in production.

// Tip: You can use `console.error()` to log errors separately from normal messages.

//? 2. Using Node.js Debugger
// Node.js has a built-in debugger that allows you to inspect code execution and step through your code line by line.

// Starting the Debugger:
// Run the following command to start your application in debug mode:

//! node inspect app.js

// - Commands:
//! - `n`: Step to the next line of code.
//! - `c`: Continue execution until the next breakpoint.
//! - `s`: Step into the next function.
//! - `o`: Step out of the current function.
//! - `repl`: Enter REPL mode to inspect variables interactively.
{
  // app.js
  function add(a, b) {
    return a + b;
  }

  console.log("Result:", add(5, 10));
}

// Run in debug mode:

//! node inspect app.js

// This will pause at the first line of code. You can then step through the code or inspect variables.

//? 3. Using Chrome DevTools for Debugging
// You can use Chrome DevTools to debug Node.js applications, providing a visual interface for setting breakpoints,
// inspecting variables, and stepping through code.

// Steps:
//! 1. Run your Node.js application with the `--inspect` flag:

//! node --inspect app.js

//! 2. Open Chrome and go to `chrome://inspect`.
//! 3. Click on "Open dedicated DevTools for Node."
//! 4. This will open Chrome DevTools, allowing you to inspect, set breakpoints, and step through your Node.js code.

//! node --inspect-brk app.js

// This command will start the app in debugging mode and pause at the first line of execution until you attach DevTools.

//? 4. Using VSCode Debugger
// Visual Studio Code (VSCode) has built-in debugging support for Node.js, which allows you to debug your
// Node.js applications directly from the editor.

// Steps:
//! 1. Open your Node.js project in VSCode.
//! 2. Go to the "Run and Debug" panel on the left sidebar.
//! 3. Click "Create a launch.json" and select "Node.js."
//! 4. Set breakpoints in your code by clicking on the line numbers.
//! 5. Press F5 or click the "Start Debugging" button to start debugging.

// Example launch.json:
{
  // {
  //   "version": "0.2.0",
  //   "configurations": [
  //     {
  //       "type": "node",
  //       "request": "launch",
  //       "name": "Launch Program",
  //       "program": "${workspaceFolder}/app.js"
  //     }
  //   ]
  // }
}

// You can then run the app in debug mode and step through code in VSCode.

//? 5. Using `node-inspect`
// `node-inspect` is a simple command-line debugging tool that provides a REPL interface for inspecting Node.js code.

// Steps:
//! 1. Run the following command to start debugging:

//! node inspect app.js

//! 2. This will launch an interactive debugging session, similar to the built-in Node.js debugger but with a simpler interface.

//! 3. Use commands like `n`, `c`, `s`, and `o` to step through code and inspect variables.

//? 6. Using Third-Party Debugging Tools
// In addition to Node.js's built-in debugging tools, there are several third-party tools available:

// - **Debugger libraries**:
//   - `debug`: A lightweight debugging utility that helps organize debug logs.

//! npm install debug
{
  const debug = require("debug")("app");

  function add(a, b) {
    debug("Adding:", a, b);
    return a + b;
  }

  add(5, 10);
}

// Run the app with:

//! DEBUG=app node app.js

// - nsolid: Provides advanced monitoring and debugging for Node.js applications.

//? 7. Error Stack Traces
// Node.js automatically provides stack traces when an error occurs. The stack trace helps locate the
// source of an error by showing the call stack leading to it.
{
  function divide(a, b) {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  }

  try {
    divide(5, 0);
  } catch (error) {
    console.error(error.stack);
  }

  // Output:
  // Error: Cannot divide by zero
  //     at divide (/path/to/app.js:3:11)
  //     at Object.<anonymous> (/path/to/app.js:7:3)
}

// The stack trace shows the line number and file where the error occurred.

//? 8. Debugging Asynchronous Code
// Asynchronous code in Node.js can be harder to debug because of non-blocking behavior.
// You can handle errors using callbacks, promises, or `async/await` to properly capture and debug them.
{
  // Example with Promises:
  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error("Data fetch failed")), 1000);
    });
  }

  fetchData()
    .then((data) => console.log(data))
    .catch((err) => console.error("Error:", err));
}

{
  // Debugging async/await:
  async function fetchData() {
    try {
      await someAsyncOperation();
    } catch (err) {
      console.error("Error:", err);
    }
  }
}

// Errors will be caught and logged properly in both cases.

//? 9. Debugging Memory Leaks
// Node.js provides a `--inspect` flag for memory profiling and debugging memory leaks.
// You can use Chrome DevTools or tools like **heapdump** to analyze memory usage.

// Steps to Analyze Memory:
//! 1. Run your app with the inspect flag:

//! node --inspect app.js

//! 2. Open Chrome DevTools and use the memory tab to take heap snapshots.
//! 3. Analyze memory usage and look for objects that are not being garbage collected.

//? 10. Best Practices for Debugging
//* - Use structured logs: Tools like `winston` or `morgan` help manage logging with log levels, timestamps, and output formatting.
//* - Enable source maps: When using transpilers like Babel, enable source maps to map compiled code back to the original source code during debugging.
//* - Use breakpoints, not `console.log()`: For complex applications, use breakpoints in IDEs or DevTools instead of relying on `console.log()`.
//* - Debug asynchronously: Make sure your async functions properly handle errors and use tools like **`async_hooks`** to track asynchronous operations.
//* - Monitor performance: Use tools like **clinic.js** and **Node.js Profiler** for performance-related debugging.

//? Summary of Debugging in Node.js
// Node.js provides a range of built-in tools for debugging, from simple `console.log()` to powerful
// debuggers like Chrome DevTools and VSCode. In addition, third-party tools like `debug` and **profiler tools**
// can help diagnose issues in production applications.

//* - Console logging: Useful for quick debugging but not scalable.
//* - Node.js Debugger: Allows you to step through code and inspect variables.
//* - Chrome DevTools: Provides a visual interface for setting breakpoints and inspecting asynchronous code.
//* - VSCode Debugger: Fully integrated debugging experience inside the code editor.
//* - `node-inspect`: A lightweight, interactive REPL for debugging.
//* - Memory debugging: Use memory profiling tools to detect memory leaks and optimize performance.
