/**
 * @fileoverview Centralized error messages for the application
 * @module errorMessages
 */

/**
 * Error messages used throughout the application
 * @constant
 * @type {Object}
 */
const ERROR_MESSAGES = {
  /**
   * Default error message for invalid input
   */
  INVALID_INPUT: "Invalid choice or input, retry!",

  /**
   * Error message for y/n selection
   */
  SELECT_Y_OR_N: "Select [y/n]",

  /**
   * Error message for numeric input validation
   */
  NUMERIC_INPUT_REQUIRED: "Please enter a valid number",

  /**
   * Error message for empty input
   */
  EMPTY_INPUT: "Input cannot be empty",

  /**
   * Error message for initialization errors
   */
  INITIALIZATION_ERROR: "Failed to initialize the application",

  /**
   * Error message for invalid format
   */
  INVALID_FORMAT: "Invalid format, please check your input",
};

module.exports = { ERROR_MESSAGES };
