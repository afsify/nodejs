// 1. Set an interval that logs "Interval" to the console every 1 second (1000 milliseconds).
const si = setInterval(() => console.log("Interval"), 1000);

// 2. Set a timeout to clear the interval (stop it from running) after 4 seconds (4000 milliseconds).
setTimeout(() => clearInterval(si), 4000);

// 3. Set another timeout to clear the interval after 4 seconds, identical to the previous line.
// However, this timeout is cleared before it can execute, so it has no effect.
const st = setTimeout(() => clearInterval(si), 4000);
clearTimeout(st); // This clears the timeout set above before it has a chance to run.

// 4. Set a timeout to log "Timeout" to the console after 1 second (1000 milliseconds).
setTimeout(() => console.log("Timeout"), 1000);

// 1. Demonstrate setInterval and clearInterval
// This interval will print "Hello every 1 second!" every second.
const intervalId = setInterval(
  () => console.log("Hello every 1 second!"),
  1000
);

// This timeout will stop the interval after 5 seconds.
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Interval stopped after 5 seconds");
}, 5000);

// 2. Demonstrate setTimeout and clearTimeout
// This timeout will print "This will never run" after 3 seconds, but we cancel it right away.
const timeoutId = setTimeout(() => console.log("This will never run"), 3000);
clearTimeout(timeoutId); // Immediately cancel the timeout

// 3. A typical setTimeout example
// This timeout will run after 2 seconds and log a message to the console.
setTimeout(() => console.log("This runs after 2 seconds"), 2000);

// 4. Sequential setTimeout calls to demonstrate a countdown
// This function uses a series of timeouts to log a countdown from 3 to "Go!".
setTimeout(() => console.log("3..."), 1000);
setTimeout(() => console.log("2..."), 2000);
setTimeout(() => console.log("1..."), 3000);
setTimeout(() => console.log("Go!"), 4000);

// 5. Combining setInterval and clearTimeout for a controlled interval
// This example logs "Checking status..." every second and stops after 4 times (4 seconds).
let counter = 0;
const statusInterval = setInterval(() => {
  console.log("Checking status...");
  counter++;

  // Stop after 4 times
  if (counter === 4) {
    clearInterval(statusInterval);
    console.log("Stopped checking status after 4 intervals");
  }
}, 1000);
