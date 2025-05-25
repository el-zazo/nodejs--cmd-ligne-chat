# Command Line Chat

A professional Node.js library for creating interactive command line chats between your application and users.

## Features

- Interactive command line interface
- Input validation with custom validators
- Error handling with customizable error messages
- Display formatted lists of choices
- Continue/exit prompts
- Colorful console output (via @elzazo/console-messages)

## Installation

```bash
npm install @elzazo/cmd-ligne-chat
```

## Basic Usage

```js
const { CmdLigneChat } = require("@elzazo/cmd-ligne-chat");

// Create a new instance
const chat = new CmdLigneChat();

// Ask a simple question
chat
  .question("What is your name?")
  .then((name) => {
    chat.CM.succes(`Hello, ${name}!`);
    chat.close();
  })
  .catch((error) => {
    chat.CM.error(`An error occurred: ${error.message}`);
    chat.close();
  });
```

## Advanced Usage

### Input Validation

```js
const { CmdLigneChat, validators } = require("@elzazo/cmd-ligne-chat");

const chat = new CmdLigneChat();

async function run() {
  try {
    // Using built-in validators
    const age = await chat.question("Enter your age", validators.isNumber, "Please enter a valid number for your age");

    // Using custom validation
    const email = await chat.question("Enter your email", (input) => {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
      return [isValid, "Please enter a valid email address"];
    });

    chat.CM.succes(`Age: ${age}, Email: ${email}`);
    await chat.continueOrClose(run);
  } catch (error) {
    chat.CM.error(`Error: ${error.message}`);
    chat.close();
  }
}

run();
```

### Displaying Choices

```js
const { CmdLigneChat } = require("@elzazo/cmd-ligne-chat");

const chat = new CmdLigneChat();

async function run() {
  // Display choices
  chat.displayChoices(["Option A", "Option B", "Option C", "Exit"], "Select an option:");

  // Get user choice
  const choice = await chat.question("Enter option number (1-4)", (response) => {
    const isValid = /^\s*[1-4]\s*$/.test(response);
    return [isValid, "Please enter a number between 1 and 4"];
  });

  // Process choice
  switch (choice.trim()) {
    case "1":
      chat.CM.succes("You selected Option A");
      break;
    case "2":
      chat.CM.succes("You selected Option B");
      break;
    case "3":
      chat.CM.succes("You selected Option C");
      break;
    case "4":
      chat.CM.succes("Exiting...");
      chat.close();
      return;
  }

  // Ask to continue
  await chat.continueOrClose(run);
}

run();
```

## Calculator Example

Here's a complete calculator example:

```js
const { CmdLigneChat, validators } = require("@elzazo/cmd-ligne-chat");

const chat = new CmdLigneChat();

async function run() {
  try {
    // Display available operations
    chat.displayChoices(["Addition (+)", "Subtraction (-)", "Multiplication (*)", "Division (/)"], "Choose Your Operation:");

    // Get operation choice
    const operationChoice = await chat.question("Enter operation number (1-4)", (response) => {
      const isValid = /^\s*[1-4]\s*$/.test(response);
      return [isValid, "Please enter a number between 1 and 4"];
    });

    // Get two numbers
    const numbersInput = await chat.question("Enter two numbers (ex: 12, 33)", validators.isTwoNumbersCommaSeparated);

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
          chat.CM.error("Cannot divide by zero");
          await askToContinue();
          return;
        }
        result = num1 / num2;
        operationSymbol = "/";
        break;
    }

    // Display result
    chat.CM.succes(`Result: ${num1} ${operationSymbol} ${num2} = ${result}`);

    // Ask to continue or exit
    await askToContinue();
  } catch (error) {
    chat.CM.error(`An error occurred: ${error.message}`);
    await askToContinue();
  }
}

async function askToContinue() {
  await chat.continueOrClose(run);
}

run();
```

## API Reference

### CmdLigneChat Class

#### Constructor

```js
const chat = new CmdLigneChat(consoleMessages);
```

- `consoleMessages` (optional): Instance of ConsoleMessages. If not provided, a new instance will be created.

#### Methods

##### question(query, checkAnswer, errorMessage)

Asks a question and validates the answer.

- `query` (string): The question to ask
- `checkAnswer` (function): Validation function that returns boolean or [boolean, errorMessage]
- `errorMessage` (string): Default error message if validation fails
- Returns: Promise<string> - The validated answer

##### continueOrClose(restartFunction)

Asks if the user wants to continue or close the chat.

- `restartFunction` (function): Function to call if user wants to continue
- Returns: Promise<void>

##### displayChoices(choices, label)

Displays a list of choices with numbers.

- `choices` (array): Array of choice options
- `label` (string): Label for the list of choices

##### close()

Closes the readline interface.

## Built-in Validators

The library includes several built-in validators:

- `isNotEmpty`: Validates if input is not empty
- `isNumber`: Validates if input is a valid number
- `isYesNo`: Validates if input is a yes/no response (y/n)
- `isTwoNumbersCommaSeparated`: Validates if input contains two comma-separated numbers
- `createRegexValidator`: Creates a custom validator with a specific regex pattern

## License

ISC

## Author

elzazo
