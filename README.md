# Command Line Chat

Create Chat in CMD line Between App And User

## Usage

Example Chat For Calculat two Numbers

```js
const cmdLigneChat = new CmdLigneChat();

async function run() {
  // Question N1
  const check1 = (response) => /^\s*\d+\s*,\s*\d+\s*$/gi.test(response);
  const err_msg1 = "Please entre just numbers separated by comma (ex: 12, 33)";
  const numbers = await cmdLigneChat.question("Entre Two Numbers (ex: 12, 33)", check1, err_msg1);

  // Result
  const [n1, n2] = numbers.split(",").map((n) => Number(n.trim()));
  cmdLigneChat.CM.succes(`result is ${n1} + ${n2} = ${n1 + n2}`);
  await cmdLigneChat.ContinueOrClose(run);
}

run();
```

result:

```txt
Entre Two Numbers (ex: 12, 33) : 2, 33
> 00001 | result is 2 + 33 = 35 √
Continue? [y/n] : y
Entre Two Numbers (ex: 12, 33) : 23 23
> 00002 | Please entre just numbers separated by comma (ex: 12, 33) ×
Entre Two Numbers (ex: 12, 33) : 23, 23
> 00003 | result is 23 + 23 = 46 √
Continue? [y/n] : n
> 00004 | App Don. √
```
# nodejs--cmd-ligne-chat
