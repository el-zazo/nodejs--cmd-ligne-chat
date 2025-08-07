/**
 * @fileoverview Validation utility functions for input validation
 * @module validators
 */

const { ERROR_MESSAGES } = require("../constants/errorMessages");

/**
 * Validates if input is not empty
 * @param {string} input - The input to validate
 * @returns {[boolean, string]} - Tuple of [isValid, errorMessage]
 */
const isNotEmpty = (input) => {
  const isValid = input && input.trim() !== "";
  return [isValid, isValid ? "" : ERROR_MESSAGES.EMPTY_INPUT];
};

/**
 * Validates if input is a valid number
 * @param {string} input - The input to validate
 * @returns {[boolean, string]} - Tuple of [isValid, errorMessage]
 */
const isNumber = (input) => {
  const isValid = /^\s*\d+(\.\d+)?\s*$/.test(input);
  return [isValid, isValid ? "" : ERROR_MESSAGES.NUMERIC_INPUT_REQUIRED];
};

/**
 * Validates if input is a yes/no response (y/n)
 * @param {string} input - The input to validate
 * @returns {[boolean, string]} - Tuple of [isValid, errorMessage]
 */
const isYesNo = (input) => {
  const isValid = /^\s*[yn]\s*$/i.test(input);
  return [isValid, isValid ? "" : ERROR_MESSAGES.SELECT_Y_OR_N];
};

/**
 * Validates if input contains two comma-separated numbers
 * @param {string} input - The input to validate
 * @returns {[boolean, string]} - Tuple of [isValid, errorMessage]
 */
const isTwoNumbersCommaSeparated = (input) => {
  const isValid = /^\s*\d+(\.\d+)?\s*,\s*\d+(\.\d+)?\s*$/.test(input);
  return [isValid, isValid ? "" : "Please enter just numbers separated by comma (ex: 12, 33)"];
};

/**
 * Creates a custom validator with a specific regex pattern
 * @param {RegExp} pattern - The regex pattern to test
 * @param {string} errorMessage - The error message to return if validation fails
 * @returns {Function} - A validator function
 */
const createRegexValidator = (pattern, errorMessage = ERROR_MESSAGES.INVALID_FORMAT) => {
  return (input) => {
    const isValid = pattern.test(input);
    return [isValid, isValid ? "" : errorMessage];
  };
};

module.exports = {
  isNotEmpty,
  isNumber,
  isYesNo,
  isTwoNumbersCommaSeparated,
  createRegexValidator,
};
