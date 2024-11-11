const helloModule = {
  name: "Afsify",
  place: "Calicut",
  greet() {
    console.log(`I'm ${this.name} from ${this.place}`);
  },
};

// Export the 'helloModule' object to make it accessible in other files or modules
module.exports = helloModule;
