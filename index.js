const { createInterface } = require("readline");
const { ConsoleMessages } = require("@elzazo/console-messages");

// Error Messages
const MAIN_ERR_MSG = "Invalid choice or input, retry!";

/**
 * ## Create Chat in CMD line Between App And User
 */
class CmdLigneChat {
  #rl;

  /**
   * @param {ConsoleMessages} CM
   */
  constructor(CM = null) {
    this.CM = CM || new ConsoleMessages();

    // ReadLine
    this.#rl = createInterface({ input: process.stdin, output: process.stdout });
    this.#rl.addListener("close", () => {
      this.CM.succes("App Don.");
    });
  }

  /**
   * ### Question
   *
   * **params:**
   * ```txt
   *    query         : Question To Ask & has ' : ' in the end by default
   *    checkAnswer   : Function return (Boolean or [Boolean, ErrorMessage]) | default is check response not empty
   *    error_message : Message To Display If 'checkAnswer' return False | default is 'Invalid choice or input, retry!'
   * ```
   */
  question(query = "", checkAnswer = (response = "") => true, error_message = MAIN_ERR_MSG) {
    return new Promise((resolve, reject) => {
      this.#rl.question(`${query} : `, async (reponse) => {
        // Get Check Answer Result
        let result_test = checkAnswer(reponse);

        // Set Test Return in Array If is it Boolean
        if (typeof result_test == "boolean") result_test = [result_test];

        // Update Error Message If Exist in checkAnswer Result
        if (result_test.length > 1) error_message = result_test[1];

        // Show Error Message And Restart Question If Error Exist
        if (reponse.trim() === "" || !result_test[0]) {
          this.CM.error(error_message);
          return resolve(await this.question(query, checkAnswer, error_message));
        }

        // Return Answer
        resolve(reponse);
      });
    });
  }

  /**
   * ### Default Question For Continue or Close Chat
   */
  async ContinueOrClose(FctReStart = () => {}) {
    // Config Question
    const [query, err_msg] = ["Continue? [y/n]", "Select [y/n]"];
    const check = (rep) => /^\s*(y|n)\s*$/gi.test(rep);

    // Question
    const answer = await this.question(query, check, err_msg);

    // ReStart or Close
    answer.trim().toLowerCase() === "y" ? FctReStart() : this.#rl.close();
  }

  /**
   * ### Display List Choises
   *
   * **Example:**
   *
   * code:
   * ```js
   *    DisplayChoises(["Operation +", "Operation -", "Operation *", "Operation /"], "Chose Your Operation:");
   * ```
   *
   * result:
   * ```txt
   *    Chose Your Operation:
   *       1. Operation +
   *       2. Operation -
   *       3. Operation *
   *       4. Operation /
   * ```
   */
  DisplayChoises(Choises = [], Label = "List Choises:") {
    this.CM.normal(`${Label}\n${Choises.map((e, i) => `\t${i + 1}. ${e}`).join("\n")}`);
  }
}

const a = new CmdLigneChat();
a.DisplayChoises(["Operation +", "Operation -", "Operation *", "Operation /"], "Chose Your Operation:");
a.question("test")
  .then((res) => {
    console.log(res);
    a.ContinueOrClose();
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { CmdLigneChat };
