# Section 10: Contact App Pt.1

> https://www.youtube.com/watch?v=IXyMKLIGf6Y&list=PLFIM0718LjIW-XBdVOerYgKegBtD6rSfD&index=10

<br/>

## First Step

- copy and paste readline's complete code from 07-core-modules to new app.js

> app.js

```js
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please enter your name? ", (name) => {
  rl.question("Please enter your phone number? ", (phone) => {
    const contact = { name, phone };
    const file = fs.readFileSync("data/contacts.json", "utf8");
    const contacts = JSON.parse(file);

    contacts.push(contact);
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf8");
    console.log("Thank you");
    rl.close();
  });
});
```

<br/>

## Check Folder & File If Not Exist

### fs.existsSync()

- fs.existsSync()
  > used to synchronously check if a file already exists in the given path or not. <br/>
  > It returns a boolean value which indicates the presence of a file. <br/> https://www.geeksforgeeks.org/node-js-fs-existssync-method/

> syntax

```js
fs.existsSync(path);
```

- path: It holds the path of the file that has to be checked. It can be a String, Buffer or URL.

### fs.mkdirSync()

- fs.mkdirSync() to create folder
  > used to create a directory Synchronously <br/> https://www.geeksforgeeks.org/node-js-fs-mkdirsync-method/

> syntax

```js
fs.mkdirSync(path, options);
```

- path - the path at which directory is to be created
- options - optional parameter which determines how to create directory like recursively

### Implementing fs.existsSync() & fs.mkdirSync()

- write below rl variable (readline.createInterface())
- create new variable named dirPath and holds the folder directory path
  > const dirPath = "./data"
- if check - if the folder does not exist, then create the folder

```js
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
```

- run node app
- if folder does not exist, it will be created automatically

```bash
_root
└── data
```

### Check File Is Exist

- create new variable named dataPath and holds the living data path
  > const dataPath = "./data/contacts.json"
- if check - if the file does not exist, then create the file
- use fs.writeFileSync() to create new file and pass 2nd argument (data) with empty array

```js
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}
```

- run node app
- if the file does not exist, it will be created automatically

```bash
_root
└── data
    └── contacts.json # with empty array inside the file
```

> data / contacts.json

```json
[]
```

### Complete Code

```js
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}
```

<br/>

## Avoid Callback Hell

> https://medium.com/@jaybhoyar1997/avoiding-callback-hell-in-node-js-7c1c16ebd4d3

```js
a(function (resultsFromA)) {
  b(resultsFromA, function (resultsFromB)) {
    c(resultsFromB, function (resultsFromC)) {
      d(resultsFromC, function (resultsFromD)) {
        e(resultsFromD, function (resultsFromE)) {
          console.log(resultsFromE)
        }
      }
    }
  }
}
```

- to avoid callback hell, wrap question with Promise() - A Promise is a JavaScript object that links producing code and consuming code
  > https://www.w3schools.com/js/js_promise.asp
- create generic function named questions()
- return new Promise and pass resolve & reject

```js
const questions = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (result) => {
      resolve(result);
    });
  });
};
```

<br/>

## Implementing Promise

- remove all rl.question() at the bottom
- create new async function called main()
- inside the async function create variable and fill with await questions() function
  - async function() - tell the function that this is asynchronous method and wait until one question is fulfilled

```js
const main = async () => {
  const name = await questions("Please enter your name: ");
  const email = await questions("Please enter your email: ");
  const phone = await questions("Please enter your phone number: ");

  const contact = { name, email, phone };
  console.log(contact);

  rl.close();
};

main();
```

```bash
node app
Please enter your name: John Doe
Please enter your email: john@email.com
Please enter your phone number: 0812345678
{ name: 'John Doe', email: 'john@email.com', phone: 'Please enter your phone number: 0812345678' } # result
```

<br/>

## Complete main() function

```js
const main = async () => {
  const name = await questions("Please enter your name: ");
  const email = await questions("Please enter your email: ");
  const phone = await questions("Please enter your phone number: ");

  const contact = { name, email, phone };
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf8");
  console.log("Thank you");
  rl.close();
};

main();
```

- run app node

> contacts.json

```json
[
  {
    "name": "John Doe",
    "email": "john@email.com",
    "phone": "0812345678"
  }
]
```

<br/>

## Complete Code

```js
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}

const questions = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (result) => {
      resolve(result);
    });
  });
};

const main = async () => {
  const name = await questions("Please enter your name: ");
  const email = await questions("Please enter your email: ");
  const phone = await questions("Please enter your phone number: ");

  const contact = { name, email, phone };
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf8");
  console.log("Thank you");
  rl.close();
};

main();
```

<br/>

## Refactoring The Code

### New contact.js File

- entry point only app.js
- create new file named contact.js - it holds every logic from directory to question() function
- cut from the top (fs) until question() function in app.js
- and paste to contact.js

> contact.js

```js
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}

const questions = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (result) => {
      resolve(result);
    });
  });
};
```

### Save Contact Function

- create new function called saveContact() at the bottom of contact.js
- saveContact() - pass props as a parameter
- cut contact variable until rl.close() in main app.js
- paste in saveContact() at contact.js
- fill contact variable with props

```js
const saveContact = (props) => {
  const contact = props; // pass every props in main app.js
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf8");
  console.log("Thank you");
  rl.close();
};
```

```js
module.exports = { questions, saveContact };
```

### app.js

- import questions & saveContact from contact.js

> app.js

```js
const { questions, saveContact } = require("./contact.js");

const main = async () => {
  const name = await questions("Please enter your name: ");
  const email = await questions("Please enter your email: ");
  const phone = await questions("Please enter your phone number: ");

  saveContact({ name, email, phone });
};

main();
```

- run node app

```bash
node app
Please enter your name: John Doe
Please enter your email: john@email.com
Please enter your phone number: 123456789
Thank you
```

```bash
node app
Please enter your name: Jane Doe
Please enter your email: jane@email.com
Please enter your phone number: 987654321
Thank you
```

> contacts.json

```json
[
  { "name": "John Doe", "email": "john@email.com", "phone": "123456789" },
  { "name": "Jane Doe", "email": "jane@email.com", "phone": "987654321" }
]
```
