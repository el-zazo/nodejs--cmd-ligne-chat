/**
 * @fileoverview Main entry point for the CmdLigneChat library
 * @module cmd-ligne-chat
 */

// Core classes
const CmdLigneChat = require("./src/core/CmdLigneChat");

// Constants
const { ERROR_MESSAGES } = require("./src/constants/errorMessages");

// Utilities
const validators = require("./src/utils/validators");

// Examples
const CalculatorExample = require("./src/examples/calculator");

/**
 * Export all modules
 */
module.exports = {
  // Core classes
  CmdLigneChat,

  // Constants
  ERROR_MESSAGES,

  // Utilities
  validators,

  // Examples
  examples: {
    CalculatorExample,
  },
};
