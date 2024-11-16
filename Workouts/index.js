const httpServer = require("./http");
const helloModule = require("./modules");
const cl = require("cli-color");

helloModule.greet();

console.log(cl.blue.bgGreen.underline("Server Running..."));
