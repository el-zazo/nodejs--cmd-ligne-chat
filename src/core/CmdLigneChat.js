/**
 * @fileoverview Core class for creating interactive command line chats
 * @module CmdLigneChat
 */

const { createInterface } = require("readline");
const { ConsoleMessages } = require("@elzazo/console-messages");
const { ERROR_MESSAGES } = require("../constants/errorMessages");

/**
 * CmdLigneChat - Creates an interactive command line chat interface
 * @class
 */
class CmdLigneChat {
  #rl;

  /**
   * Creates a new CmdLigneChat instance
   * @param {ConsoleMessages} CM - Console message formatter instance
   */
  constructor(CM = null) {
    try {
      this.CM = CM || new ConsoleMessages();

      // Initialize readline interface
      this.#rl = createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      // Add close event listener
      this.#rl.addListener("close", () => {
        this.CM.succes("App Done.");
      });
    } catch (error) {
      console.error("Error initializing CmdLigneChat:", error.message);
      throw error;
    }
  }

  /**
   * Asks a question and validates the answer
   * @param {string} query - The question to ask
   * @param {Function} checkAnswer - Function to validate the answer
   *                                Returns boolean or [boolean, errorMessage]
   * @param {string} errorMessage - Default error message if validation fails
   * @returns {Promise<string>} - The validated answer
   */
  question(query = "", checkAnswer = (response = "") => true, errorMessage = ERROR_MESSAGES.INVALID_INPUT) {
    return new Promise((resolve, reject) => {
      try {
        this.#rl.question(`${query} : `, async (response) => {
          try {
            // Get validation result
            let validationResult = checkAnswer(response);

            // Convert boolean result to array format
            if (typeof validationResult === "boolean") {
              validationResult = [validationResult];
            }

            // Update error message if provided in validation result
            const customErrorMessage = validationResult.length > 1 ? validationResult[1] : errorMessage;

            // Show error message and restart question if validation fails
            if (response.trim() === "" || !validationResult[0]) {
              this.CM.error(customErrorMessage);
              return resolve(await this.question(query, checkAnswer, customErrorMessage));
            }

            // Return validated answer
            resolve(response);
          } catch (error) {
            this.CM.error(`Error processing response: ${error.message}`);
            reject(error);
          }
        });
      } catch (error) {
        this.CM.error(`Error asking question: ${error.message}`);
        reject(error);
      }
    });
  }

  /**
   * Asks if the user wants to continue or close the chat
   * @param {Function} restartFunction - Function to call if user wants to continue
   * @returns {Promise<void>}
   */
  async continueOrClose(restartFunction = () => {}) {
    try {
      // Configure question
      const query = "Continue? [y/n]";
      const errorMessage = ERROR_MESSAGES.SELECT_Y_OR_N;
      const checkResponse = (response) => /^\s*[yn]\s*$/i.test(response);

      // Ask question
      const answer = await this.question(query, checkResponse, errorMessage);

      // Restart or close based on answer
      if (answer.trim().toLowerCase() === "y") {
        restartFunction();
      } else {
        this.#rl.close();
      }
    } catch (error) {
      this.CM.error(`Error in continueOrClose: ${error.message}`);
      this.#rl.close();
    }
  }

  /**
   * Displays a list of choices with numbers
   * @param {string[]} choices - Array of choice options
   * @param {string} label - Label for the list of choices
   */
  displayChoices(choices = [], label = "List Choices:") {
    try {
      if (!Array.isArray(choices)) {
        throw new Error("Choices must be an array");
      }

      const formattedChoices = choices.map((choice, index) => `\t${index + 1}. ${choice}`).join("\n");

      this.CM.normal(`${label}\n${formattedChoices}`);
    } catch (error) {
      this.CM.error(`Error displaying choices: ${error.message}`);
    }
  }

  /**
   * Closes the readline interface
   */
  close() {
    try {
      this.#rl.close();
    } catch (error) {
      console.error("Error closing readline interface:", error.message);
    }
  }
}

module.exports = CmdLigneChat;
