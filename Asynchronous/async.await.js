//! ===================================== Async/Await in Node.js =====================================

// The `async/await` syntax in Node.js is a modern way to handle asynchronous operations, allowing for
// more readable and maintainable code. It is built on top of JavaScript Promises and enables writing
// asynchronous code in a synchronous style, avoiding the complexities of callbacks and `.then()` chains.

// Subtopics and Details:

//? What is Async/Await?
//? Async Functions
//? Await Keyword
//? Error Handling with Async/Await
//? Using Async/Await with Promises
//? Using Async/Await with Functions that Return Promises
//? Using Async/Await in Loops
//? Sequential vs Parallel Execution
//? Async/Await and Try/Catch
//? Performance Considerations

//? 1. What is Async/Await?
// `async` and `await` provide a way to work with asynchronous code more cleanly. They are syntactic
// sugar over Promises and allow writing asynchronous code that looks and behaves more like synchronous code.

//* `async`: Declares a function as asynchronous.
//* `await`: Pauses the execution of an async function until the Promise is resolved or rejected.
{
  async function fetchData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log(data);
  }

  fetchData();
}

//? 2. Async Functions
// An `async` function is a function that implicitly returns a Promise. If the function returns a value,
// the Promise is resolved with that value. If the function throws an exception, the Promise is rejected.
{
  async function greet() {
    return "Hello, World!";
  }

  greet().then(console.log); // Outputs: Hello, World!
}

//? 3. Await Keyword
// The `await` keyword can only be used inside an `async` function. It pauses the execution of the function
// until the Promise is resolved or rejected, then resumes with the resolved value or throws the error.
{
  async function getNumber() {
    const result = await Promise.resolve(42);
    console.log(result); // Outputs: 42
  }

  getNumber();
}

//? 4. Error Handling with Async/Await
// Errors in `async` functions can be caught using `try/catch` blocks. This simplifies error handling,
// making it similar to synchronous code.
{
  async function fetchData() {
    try {
      const response = await fetch("invalid-url");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error); // Outputs: Error: TypeError: Failed to fetch
    }
  }

  fetchData();
}

//? 5. Using Async/Await with Promises
// Since `await` works with Promises, you can use it to simplify existing Promise-based code.
{
  // Without Async/Await:
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

{
  // With Async/Await:
  async function fetchPosts() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  fetchPosts();
}

//? 6. Using Async/Await with Functions that Return Promises
// Any function that returns a Promise can be used with `await`, whether it’s a built-in function
// like `fetch()` or a custom function.
{
  function getData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data fetched");
      }, 1000);
    });
  }

  async function processData() {
    const result = await getData();
    console.log(result); // Outputs: Data fetched (after 1 second)
  }

  processData();
}

//? 7. Using Async/Await in Loops
// When using `async/await` inside loops, be mindful of the difference between sequential and parallel execution.
{
  // Example (Sequential Execution):
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function runTasksSequentially() {
    await delay(1000);
    console.log("Task 1 done");

    await delay(1000);
    console.log("Task 2 done");

    await delay(1000);
    console.log("Task 3 done");
  }

  runTasksSequentially();
  // Outputs each task after 1 second sequentially
}

{
  // Example (Parallel Execution using `Promise.all()`):
  async function runTasksInParallel() {
    const task1 = delay(1000).then(() => console.log("Task 1 done"));
    const task2 = delay(1000).then(() => console.log("Task 2 done"));
    const task3 = delay(1000).then(() => console.log("Task 3 done"));

    await Promise.all([task1, task2, task3]);
  }

  runTasksInParallel();
  // Outputs all tasks after 1 second, concurrently
}

//? 8. Sequential vs Parallel Execution
// While `async/await` can make asynchronous code look synchronous, it doesn't always result in better
// performance. Running asynchronous tasks sequentially may lead to slower execution compared to running
// them in parallel.

{
  // Example (Sequential Execution):
  async function fetchSequentially() {
    const user = await fetchUser();
    const posts = await fetchPosts();
    console.log(user, posts);
  }
}

{
  // Example (Parallel Execution):
  async function fetchInParallel() {
    const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
    console.log(user, posts);
  }
}

//? 9. Async/Await and Try/Catch
// Using `try/catch` with `async/await` helps handle errors in a more linear way, making the code
// easier to reason about.
{
  async function fetchData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/invalid"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error); // Outputs: Error fetching data: ...
    }
  }

  fetchData();
}

//? 10. Performance Considerations
// While `async/await` improves code readability, it can introduce performance issues if used improperly.
// For example, running multiple independent asynchronous tasks sequentially using `await` can slow down
// the overall execution. Use `Promise.all` to handle tasks in parallel where possible.
{
  // Suboptimal:
  async function processTasks() {
    const result1 = await task1(); // Waits for task1 to finish
    const result2 = await task2(); // Waits for task2 after task1
    const result3 = await task3(); // Waits for task3 after task2
    return [result1, result2, result3];
  }
}

{
  // Optimal:
  async function processTasks() {
    const results = await Promise.all([task1(), task2(), task3()]); // Executes all tasks concurrently
    return results;
  }
}
