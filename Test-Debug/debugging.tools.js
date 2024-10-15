//! ===================================== Debugging Tools in Node.js =====================================

// Debugging in Node.js is crucial for identifying issues in your applications, such as syntax errors,
// logical errors, or performance bottlenecks. Node.js provides several tools and techniques for debugging,
// ranging from simple console logs to advanced debugging tools.

// Subtopics:
//? Node.js Built-in Debugger
//? Using `console.log()` for Debugging
//? `Node Inspector` with Chrome DevTools
//? Debugging with Visual Studio Code (VS Code)
//? Debugging with `nodemon`
//? Debugging with `node --inspect`
//? Post-mortem Debugging (Core Dumps)
//? Memory Leak Detection Tools
//? Profiling with Node.js Tools
//? Linting with ESLint for Debugging
//? Performance Monitoring Tools
//? Best Practices for Debugging

//? 1. Node.js Built-in Debugger
// Node.js has a built-in debugger that allows you to step through your code and inspect variables.
// You can invoke the debugger by adding the `debugger` keyword or running Node with the `inspect` flag.

// Example:
```javascript
const x = 10;
const y = 20;
debugger;  // Program will pause here
const result = x + y;
console.log(result);
```;

// To run the script in debug mode:
```bash
node inspect app.js
```;

//? 2. Using `console.log()` for Debugging
// The simplest and most commonly used debugging tool is `console.log()`, which outputs information about
// variables and execution flow to the console.

// Example:
```javascript
const user = { id: 1, name: 'Alice' };
console.log(user);  // Prints the user object
```;

// While useful, relying heavily on `console.log()` can clutter your code and slow down performance
// in production. It's often best to remove these logs after debugging or use more advanced tools.

//? 3. `Node Inspector` with Chrome DevTools
// You can debug Node.js applications using Chrome DevTools, a popular tool for front-end and Node.js debugging.

// Steps to use Node Inspector:
//! 1. Start your app with the `--inspect` flag:
```bash
   node --inspect app.js
   ```;

//! 2. Open Chrome and go to `chrome://inspect`.
//! 3. Click "Open dedicated DevTools for Node."

// Now, you can set breakpoints, step through code, and view the call stack, just like in a browser.

//? 4. Debugging with Visual Studio Code (VS Code)
// Visual Studio Code provides built-in support for debugging Node.js. It allows you to set breakpoints,
// inspect variables, and step through code.

// Steps to debug in VS Code:
//* 1. Open your project in VS Code.
//* 2. Add breakpoints by clicking on the left-hand margin of the code editor.
//* 3. Create a debug configuration by selecting "Run and Debug" from the sidebar, and choose "Node.js".
//* 4. Start debugging by hitting the green "Run" button.

// VS Code will launch your application and pause at breakpoints, allowing you to inspect variables and control execution.

//? 5. Debugging with `nodemon`
// `nodemon` is a tool that automatically restarts your application when file changes are detected.
// It can be useful in development when you are frequently changing code and need to restart the server often.

// Install nodemon:
```bash
npm install -g nodemon
```;

// Run your application with nodemon:
```bash
nodemon app.js
```;

// You can combine `nodemon` with the `--inspect` flag for better debugging:
```bash
nodemon --inspect app.js
```;

//? 6. Debugging with `node --inspect`
// The `--inspect` flag allows you to enable debugging over WebSockets. It provides an easy way to connect
// your Node.js app to Chrome DevTools or other debugging clients.

// Example:
```bash
node --inspect app.js
```;

// You can also add `--inspect-brk` to pause execution before the first line:
```bash
node --inspect-brk app.js
```;

// This is useful for inspecting the startup process of your application.

//? 7. Post-mortem Debugging (Core Dumps)
// Post-mortem debugging allows you to inspect the state of an application after it crashes by analyzing a
// core dump file. Core dumps contain memory snapshots of your app at the time of the crash.

// Steps to generate core dump:
//! 1. Enable core dumps in Node.js:
```bash
   ulimit -c unlimited
   ```;

//! 2. Run your application. If it crashes, a core dump will be created.
//! 3. Use tools like `gdb` or `lldb` to analyze the core dump:
```bash
   gdb node core
   ```;

//? 8. Memory Leak Detection Tools
// Memory leaks can cause your Node.js app to slow down or crash over time. Tools like heapdump, v8-profiler,
// and memwatch help detect memory leaks.

// heapdump generates a memory snapshot:
```bash
npm install heapdump
```;

// In your code:
```javascript
const heapdump = require('heapdump');
heapdump.writeSnapshot('snapshot.heapsnapshot');
```;

// You can then analyze the snapshot using Chrome DevTools.

//? 9. Profiling with Node.js Tools
// Profiling helps identify performance bottlenecks in your application. Node.js provides several
// profiling tools like the Node.js built-in profiler, clinic.js, and Chrome DevTools profiler.

// Enable the built-in profiler:
```bash
node --prof app.js
```;

// This generates a V8 log file, which you can process using `node --prof-process` to analyze performance.

//? 10. Linting with ESLint for Debugging
// ESLint is a static code analysis tool that identifies problematic patterns in your code. It enforces
// coding standards and can help catch common issues before they cause bugs.

// Install ESLint:
```bash
npm install eslint --save-dev
```;

// Initialize ESLint:
```bash
npx eslint --init
```;

// Run ESLint to check for potential errors:
```bash
npx eslint app.js
```;

//? 11. Performance Monitoring Tools
// Monitoring tools like New Relic, AppDynamics, and PM2 provide real-time insights into your application's
// performance. These tools help you identify bottlenecks, memory leaks, and other issues in production environments.

// PM2 is especially useful for monitoring and managing Node.js applications in production:
```bash
npm install pm2 -g
pm2 start app.js
pm2 monit
```;

//? 12. Best Practices for Debugging
//* - Use meaningful log messages: When using `console.log()`, make your messages clear to avoid confusion.
//* - Remove debug logs in production: Logs can expose sensitive information and slow down your app in production.
//* - Use breakpoints instead of console logs: Breakpoints provide more flexibility for inspecting variables and pausing code execution.
//* - Test and debug locally first: Make sure your app works locally before moving to more complex environments like staging or production.

//? Full Example: Using Chrome DevTools with Node.js

//! 1. Start your application in debug mode:
```bash
node --inspect-brk app.js
```;

//! 2. Open Chrome and go to `chrome://inspect`.

//! 3. Click "Open dedicated DevTools for Node."

//! 4. Set breakpoints and inspect variables as your code runs.

//? Summary
// Node.js provides a variety of debugging tools, ranging from the built-in debugger and `console.log()`
// to advanced options like **Chrome DevTools**, **VS Code debugger**, and memory profiling tools.
// Understanding how to use these tools effectively will help you identify and resolve issues faster,
// improving the stability and performance of your Node.js applications.
