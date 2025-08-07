/**
 * @fileoverview Example of using CmdLigneChat for a simple calculator
 * @module examples/calculator
 */

const CmdLigneChat = require("../core/CmdLigneChat");
const { isTwoNumbersCommaSeparated } = require("../utils/validators");

/**
 * Simple calculator example using CmdLigneChat
 */
class CalculatorExample {
  constructor() {
    this.cmdLigneChat = new CmdLigneChat();
  }

  /**
   * Runs the calculator example
   */
  async run() {
    try {
      // Display available operations
      this.cmdLigneChat.displayChoices(["Addition (+)", "Subtraction (-)", "Multiplication (*)", "Division (/)"], "Choose Your Operation:");

      // Get operation choice
      const operationChoice = await this.cmdLigneChat.question("Enter operation number (1-4)", (response) => {
        const isValid = /^\s*[1-4]\s*$/.test(response);
        return [isValid, "Please enter a number between 1 and 4"];
      });

      // Get two numbers
      const numbersInput = await this.cmdLigneChat.question("Enter two numbers (ex: 12, 33)", isTwoNumbersCommaSeparated);

      // Parse numbers and calculate result
      const [num1, num2] = numbersInput.split(",").map((n) => parseFloat(n.trim()));

      let result;
      let operationSymbol;

      // Perform calculation based on operation choice
      switch (operationChoice.trim()) {
        case "1":
          result = num1 + num2;
          operationSymbol = "+";
          break;
        case "2":
          result = num1 - num2;
          operationSymbol = "-";
          break;
        case "3":
          result = num1 * num2;
          operationSymbol = "*";
          break;
        case "4":
          if (num2 === 0) {
            this.cmdLigneChat.CM.error("Cannot divide by zero");
            await this.askToContinue();
            return;
          }
          result = num1 / num2;
          operationSymbol = "/";
          break;
      }

      // Display result
      this.cmdLigneChat.CM.succes(`Result: ${num1} ${operationSymbol} ${num2} = ${result}`);

      // Ask to continue or exit
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
   * Starts the calculator example
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
  const calculator = new CalculatorExample();
  calculator.start();
}

module.exports = CalculatorExample;
