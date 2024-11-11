// Import the built-in 'os' module, which provides operating system-related utility methods.
const os = require("os");

// Get the operating system name (e.g., 'Linux', 'Darwin', 'Windows_NT').
console.log(os.type()); // Output: The type of OS (e.g., 'Linux')

// Get the CPU architecture of the operating system (e.g., 'x64', 'arm').
console.log(os.arch()); // Output: Architecture type (e.g., 'x64')

// Get the platform of the operating system (e.g., 'linux', 'win32', 'darwin').
console.log(os.platform()); // Output: Platform name (e.g., 'win32')

// Get the OS release version (e.g., '10.0.19041' for Windows 10).
console.log(os.release()); // Output: OS release version (e.g., '10.0.19041')

// Get the full OS version as a string (if available).
console.log(os.version()); // Output: OS version details (e.g., '10.0.19041')

// Get the system uptime in seconds, which is the time the system has been running since last boot.
console.log(os.uptime()); // Output: System uptime in seconds (e.g., '123456')

// Get information about the current user, including username, home directory, and shell.
console.log(os.userInfo()); // Output: User info object {username, homedir, etc.}

// Get the total system memory in bytes.
console.log(os.totalmem()); // Output: Total memory in bytes (e.g., '17179869184' for 16 GB)

// Get the free system memory in bytes.
console.log(os.freemem()); // Output: Free memory in bytes (e.g., '4294967296' for 4 GB)

// Get an array of CPU information, including model, speed, and cores.
console.log(os.cpus()); // Output: Array of CPU details {model, speed, times, etc.}

// Get the network interfaces available on the system, including IP addresses and MAC addresses.
console.log(os.networkInterfaces()); // Output: Network interface details {interface name, address, etc.}

