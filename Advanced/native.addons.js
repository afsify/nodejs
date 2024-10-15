//! ===================================== Native Addons in Node.js =====================================

// Native Addons in Node.js allow you to write C or C++ code that can be called from JavaScript. These add-ons
// extend the functionality of Node.js by giving developers access to system-level resources, improving performance,
// or integrating with libraries that aren't available in pure JavaScript. Native Addons are primarily used
// when performance-critical operations are required or when interacting with C++ libraries and system-specific APIs.

// Subtopics:
//? What are Native Addons?
//? Why Use Native Addons?
//? Creating a Native Addon
//? Node.js Addon API (N-API)
//? Using `node-gyp` to Build Native Addons
//? Accessing Native Addons in JavaScript
//? Native Addon Example (Simple Addition)
//? Error Handling in Native Addons
//? Working with Asynchronous Addons
//? Memory Management in Native Addons
//? Best Practices for Native Addons
//? Real-World Use Cases

//? 1. What are Native Addons?
// Native Addons are dynamically linked shared objects written in C or C++ that can be loaded into Node.js
// applications. They enable access to lower-level system functionality or to C/C++ libraries that JavaScript
// alone cannot handle efficiently.

// These Addons are loaded just like any other Node.js module using `require()`, but they offer the advantage
// of native performance.

//? 2. Why Use Native Addons?
// There are a few specific reasons to use Native Addons in Node.js:

//* - Performance: Heavy computations like image processing, encryption, or mathematical operations
//* can be performed faster in C/C++.
//* - Access to C/C++ Libraries: Native Addons can wrap existing C/C++ libraries, enabling Node.js
//* applications to access these libraries' features.
//* - Interfacing with Hardware: If your application needs to communicate with hardware directly,
//* Native Addons provide an interface to do that.
//* - Extended System Access: System-specific functionalities not available in JavaScript can be
//* exposed via Native Addons.

//? 3. Creating a Native Addon
// Creating a Native Addon involves writing C/C++ code that interfaces with the Node.js engine.
// The general steps to create a Native Addon are:

//! 1. Write the C++ code.
//! 2. Use the **Node.js Addon API** (N-API) or **Nan** for compatibility.
//! 3. Build the Addon using **node-gyp**.

//? 4. Node.js Addon API (N-API)
// N-API is the official API for building Native Addons in Node.js. It provides a stable and ABI-compatible
// interface for Addon development, ensuring that Native Addons work across different versions of Node.js.

// - N-API simplifies Addon development and abstracts away many of the complexities of interacting with the Node.js runtime.
// - It helps make Addons compatible across Node.js versions.

// Example (basic structure using N-API):
```cpp
#include <node_api.h>

napi_value Add(napi_env env, napi_callback_info info) {
  // Code to add two numbers
}

napi_value Init(napi_env env, napi_value exports) {
  napi_value fn;
  napi_create_function(env, NULL, 0, Add, NULL, &fn);
  napi_set_named_property(env, exports, "add", fn);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
```;

//? 5. Using `node-gyp` to Build Native Addons
// node-gyp is a build tool used to compile Native Addons for Node.js. It automates the process of
// configuring and compiling C++ code to be used as a Node.js Addon.

// - Steps to build a Native Addon using `node-gyp`:
//! 1. Install `node-gyp` globally:
```bash
     npm install -g node-gyp
     ```;
//! 2. Create a `binding.gyp` file that describes how to build the project.
//! 3. Run the following commands:
```bash
     node-gyp configure
     node-gyp build
     ```;
//! 4. Load the resulting binary file into your Node.js app using `require()`.

// Example of `binding.gyp`:
```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": ["addon.cc"]
    }
  ]
}
```;

//? 6. Accessing Native Addons in JavaScript
// Once the Native Addon is compiled, you can load it in your JavaScript file using the `require()` function,
// just like any other Node.js module.
{
  const addon = require("./build/Release/addon");

  // Call the exported function
  console.log(addon.add(5, 10)); // Output: 15
}

//? 7. Native Addon Example (Simple Addition)
// Here’s a simple example that demonstrates how to create a Native Addon for adding two numbers:

// - addon.cc (C++ code):
```cpp
  #include <node_api.h>

  napi_value Add(napi_env env, napi_callback_info args) {
    size_t argc = 2;
    napi_value argv[2];
    napi_get_cb_info(env, args, &argc, argv, NULL, NULL);

    double value1, value2;
    napi_get_value_double(env, argv[0], &value1);
    napi_get_value_double(env, argv[1], &value2);

    napi_value sum;
    napi_create_double(env, value1 + value2, &sum);

    return sum;
  }

  napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;
    napi_create_function(env, NULL, 0, Add, NULL, &fn);
    napi_set_named_property(env, exports, "add", fn);
    return exports;
  }

  NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
  ```;

// - JavaScript file to use the Addon:
```javascript
  const addon = require('./build/Release/addon');
  console.log(addon.add(10, 20));  // Output: 30
  ```;

//? 8. Error Handling in Native Addons
// Error handling in Native Addons should be done using Node.js-style error handling conventions
// (throwing exceptions when necessary).

// - You can use `napi_throw_error()` or `napi_create_error()` to handle errors gracefully within Native Addons.

```cpp
if (argc < 2) {
  napi_throw_error(env, NULL, "Two arguments expected");
}
```;

//? 9. Working with Asynchronous Addons
// Asynchronous operations in Native Addons can be handled using **napi_async_work** or **worker threads**.
// This ensures that time-consuming tasks do not block the Node.js event loop.

// Example of Asynchronous Addon:
```cpp
// In C++, use napi_create_async_work to queue work asynchronously
```;

//? 10. Memory Management in Native Addons
// Memory management is critical in Native Addons because improper handling can lead to memory leaks and crashes.

//* - Use napi_create_reference() and napi_delete_reference() for managing object lifetimes.
//* - Use napi_wrap() and napi_unwrap() to store native object data in JavaScript objects.

//? 11. Best Practices for Native Addons
//* - Use N-API for compatibility across Node.js versions.
//* - Asynchronous Addons: Avoid blocking the event loop by using asynchronous operations when necessary.
//* - Error Handling: Always implement proper error handling in both C++ and JavaScript code.
//* - Memory Management: Manage resources carefully to avoid memory leaks.
//* - Testing: Test Native Addons thoroughly, including edge cases and multi-threaded scenarios.

//? 12. Real-World Use Cases
// Native Addons are used in a variety of performance-critical applications:
//* - bcrypt: A native library for hashing passwords.
//* - sharp: A high-performance image processing library that wraps libvips, written in C++.
//* - node-sass: A native binding for libsass, providing support for Sass stylesheets in Node.js.

//? Conclusion
// Native Addons in Node.js provide a powerful way to extend Node.js capabilities by integrating low-level system
// functionality, external libraries, or improving performance in compute-heavy tasks. Understanding how to create
// and maintain Native Addons using **N-API** and tools like **node-gyp** allows developers to harness the power
// of C/C++ in their Node.js applications while maintaining high performance.
