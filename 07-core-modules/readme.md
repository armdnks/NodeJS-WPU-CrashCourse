# Section 7: Core Module

> https://www.youtube.com/watch?v=PzjGJFUjms4&list=PLFIM0718LjIW-XBdVOerYgKegBtD6rSfD&index=7

## File System

> https://nodejs.org/api/fs.html

- The Node.js file system module allows you to work with the file system on your computer
  > https://www.w3schools.com/nodejs/nodejs_filesystem.asp
- import fs from "fs"

```js
const fs = require("fs");
```

<br/>

## Write File

### fs.writeFileSync()

> https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options

- fs.writeFileSync() is a synchronous method
- creates a new file if the specified file does not exist
  > https://www.geeksforgeeks.org/node-js-fs-writefilesync-method/
- if the file is exists, the value will be overwritten

```js
fs.writeFileSync(__FILE_PATH__, __MESSAGE__);
```

```js
// write string to file (synchronous)
fs.writeFileSync("data/file.txt", "Hello World in Synchronous");
```

- create a folder named <b>data</b> in root
- run node app
- it will automatically create a new file (file.txt) in data folder
  - and there is "Hello World in Synchronous" inside file.txt

```bash
_root
└── data
    └── file.txt
```

> if the folder directory does not exist, it will throw an error <br/>
> because there are different methods to create folders <br/>
> fs.mkdir() || fs.mkdirSync() - next lecture

#### Catch Error

- delete data folder
- because fs.writeFileSync is a synchronous, use try-catch method to catch the error
  > if asynchronous, callback will handle the error

```js
try {
  fs.writeFileSync("data/file.txt", "Hello World in Synchronous");
} catch (error) {
  console.log(error);
}
```

```bash
Error: ENOENT: no such file or directory, open 'data/file.txt'
```

### fs.writeFile()

> https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback

- fs.writeFile() is used to asynchronously write the specified data to a file
- by default, the file would be replaced if it exists
  > https://www.geeksforgeeks.org/node-js-fs-writefile-method/

> syntax

```js
fs.writeFile(file, data, options, callback);
```

- file - file path || file name with extension
- data - can be a string, buffer, TypedArray or DataView
- options - optional parameters that will affect the output (encoding, mode, flag)
- callback - it is the function that would be called when the method is executed.
  - error - It is an error that would be thrown if the operation fails.

```js
// write string to file (asynchronous)
fs.writeFile("data/file.txt", "Hello World in Asynchronous", "utf-8", (error) => {
  if (error) throw error;
  console.log("success");
});
```

```bash
node app
success
```

> file.txt

```text
Hello World in Asynchronous
```

<br/>

## Read File

### fs.readFileSync()

> https://nodejs.org/api/fs.html#fsreadfilesyncpath-options

- fs.readFileSync() is used to read the file and return its content
- must use inside variable

```js
fs.readFileSync(path, options);
```

- path - it takes the relative path of the text file
- options - optional parameter (encoding & flag), the encoding contains data specification. Encoding default value is null which returns raw buffer

```js
// read file (synchronous)
const data = fs.readFileSync("data/file.txt");
console.log(data);
```

```bash
node app
<Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 20 69 6e 20 41 73 79 6e 63 68 72 6f 6e 6f 75 73>
```

> because the default encoding is null, which means it will return raw buffer

- there is 2 ways to show value inside the file
  - (variable.toString() method or { encoding: "utf-8 } | "utf-8")

```js
const data = fs.readFileSync("data/file.txt", "utf-8");
console.log(data);
// ... or
const data = fs.readFileSync("data/file.txt");
console.log(data.toString());
```

```bash
node app
Hello World in Synchronous
```

### fs.readFile()

> https://nodejs.org/api/fs.html#fsreadfilepath-options-callback

- fs.readFile() - is an inbuilt method which is used to read the file
- this method read the entire file into buffer
  > https://www.geeksforgeeks.org/node-js-fs-readfile-method/

```js
fs.readFile(filename, encoding, callback_function);
```

- filename - it holds the name of the file to read or the entire path if stored at other location.
- encoding - it holds the encoding of file. Its default value is ‘utf8’.
- callback_function - it is a callback function that is called after reading of file. It takes two parameters:
  - err - if any error occurred.
  - data - contents of the file.

```js
// read file (asynchronous)
fs.readFile("data/file.txt", "utf-8", (error, data) => {
  if (error) throw error;
  console.log(data);
});
```

```bash
node app
Hello World in Asynchronous
```

<br/>

## Readline

> https://nodejs.org/api/readline.html

- Readline Module in Node.js allows the reading of input stream line by line.
  > https://www.geeksforgeeks.org/node-js-readline-module/?ref=gcse

```js
const readline = require("readline");
```

### Create Interface

- the createInterface() method takes two arguments. The first argument will be for the standard input and the second one will be for reading the standard output

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
```

### Question

- rl.question() - is used for asking questions from the user and reading their reply (output)
  > The first parameter is used to ask the question and the second parameter is a callback function which will take the output from the user as the parameter and return it on the console
- rl.close() - this method will close the interface or exit the question section

```js
rl.question("Your Question? ", (answer) => {
  console.log("Here is your " + answer + " in console");
  rl.close();
});
```

```js
rl.question("Please enter your name? ", (name) => {
  console.log("Hello, " + name);
  rl.close();
});
```

```bash
node app
Please enter your name? John Doe # question
Hello, John Doe # result
```

### Multiple Question

- to create multiple question, put the 2nd question inside 1st question's callback

```js
rl.question("Please enter your name? ", (name) => {
  rl.question("Please enter your phone number? ", (phone) => {
    console.log("Hello, " + name + ", your number is " + phone);
    rl.close();
  });
});
```

```bash
node app
Please enter your name? John Doe
Please enter your phone number? 08123456789
Hello, John Doe, your number is 08123456789
```

<br/>

## Mini Projects - Contacts App

> create contacts app <br/>
> store name and phone number to contacts.json

### 01. First Step

- create contacts.json with empty array in data folder

```bash
_root
└── data
    └── contact.json
```

> contacts.json

```json
[]
```

### 02. Result To Variable

- in rl.question's callback,
- instead of "console.log("Hello, " + name + ", your number is " + phone);",
- store the result into contact variable
  - const contact = { name, phone }

```js
rl.question("Please enter your name? ", (name) => {
  rl.question("Please enter your phone number? ", (phone) => {
    const contact = { name, phone };
    console.log(contact);
    rl.close();
  });
});
```

```bash
node app
Please enter your name? John Doe
Please enter your phone number? 08123456789
{ name: 'John Doe', phone: '08123456789' }
```

### 03. Read JSON File

- read contacts.json file and store in file variable

```js
const contact = { name, phone };
const file = fs.readFileSync("data/contacts.json", "utf-8");
console.log(file);
rl.close();
```

```bash
node app
Please enter your name? John Doe
Please enter your phone number? 08123456789
[] # result is empty array in string
```

### 03. String To JSON

- transfrom string into json file, use JSON.parse() and store in new variable named contacts
  > JSON.parse() - A common use of JSON is to exchange data to/from a web server. <br/>
  > When receiving data from a web server, the data is always a string. <br/>
  > Parse the data with JSON.parse(), and the data becomes a JavaScript object. <br/> https://www.w3schools.com/js/js_json_parse.asp

> WHY JSON? <br/> because json's behavior is like array. So we can use .push() method to insert new data (new object)

```js
const contact = { name, phone };
const file = fs.readFileSync("data/contacts.json", "utf8");
const contacts = JSON.parse(file);

contacts.push(contact);
console.log(contacts); // check inside contacts variable
rl.close();
```

```bash
Please enter your name? John Doe
Please enter your phone number? 08123456789
[ { name: 'John Doe', phone: '08123456789' } ] # result is new object in array, in JSON form
```

### 04. Insert New Data To contacts.json

- use fs.writeFileSync( file, data, options )
- because the file needs string form, so we have to convert json into string with JSON.stringify()
  > JSON.stringify() - Convert a JavaScript object into a string with <br/> > https://www.w3schools.com/js/js_json_stringify.asp

```js
contacts.push(contact);
fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf8");
rl.close();
```

- insert 1st data

```bash
node app
Please enter your name? John Doe
Please enter your phone number? 08123456789
Thank you
```

- insert 2nd data

```bash
node app
Please enter your name? Jane Doe
Please enter your phone number? 08876543210
Thank you
```

> contacts.json

```json
[
  { "name": "John Doe", "phone": "08123456789" },
  { "name": "Jane Doe", "phone": "08876543210" }
]
```

### 05. Complete Code

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
