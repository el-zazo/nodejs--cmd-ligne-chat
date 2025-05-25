/**
 * @fileoverview Simple example of using CmdLigneChat
 * @module examples/simple
 */

const CmdLigneChat = require("../core/CmdLigneChat");
const { isNotEmpty } = require("../utils/validators");

/**
 * Simple greeting example using CmdLigneChat
 */
class SimpleExample {
  constructor() {
    this.cmdLigneChat = new CmdLigneChat();
  }

  /**
   * Runs the simple greeting example
   */
  async run() {
    try {
      // Display welcome message
      this.cmdLigneChat.CM.normal("Welcome to the Simple Chat Example!");

      // Ask for name with validation
      const name = await this.cmdLigneChat.question("What is your name", isNotEmpty, "Name cannot be empty");

      // Greet the user
      this.cmdLigneChat.CM.succes(`Hello, ${name}! Nice to meet you.`);

      // Ask for age with custom validation
      const age = await this.cmdLigneChat.question("How old are you", (response) => {
        const isValid = /^\s*\d+\s*$/.test(response) && parseInt(response.trim()) > 0;
        return [isValid, "Please enter a valid age (positive number)"];
      });

      // Respond based on age
      const ageNum = parseInt(age.trim());
      if (ageNum < 18) {
        this.cmdLigneChat.CM.normal(`You're ${ageNum} years old. You're still young!`);
      } else if (ageNum < 60) {
        this.cmdLigneChat.CM.normal(`You're ${ageNum} years old. You're in your prime!`);
      } else {
        this.cmdLigneChat.CM.normal(`You're ${ageNum} years old. You have great wisdom!`);
      }

      // Ask if they want to continue
      await this.askToContinue();
    } catch (error) {
      this.cmdLigneChat.CM.error(`An error occurred: ${error.message}`);
      await this.askToContinue();
    }
  }

  /**
   * Asks the user if they want to continue or exit
   */
  async askToContinue() {
    await this.cmdLigneChat.continueOrClose(() => this.run());
  }

  /**
   * Starts the simple example
   */
  start() {
    this.run().catch((error) => {
      console.error("Fatal error:", error);
      this.cmdLigneChat.close();
    });
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  const example = new SimpleExample();
  example.start();
}

module.exports = SimpleExample;
