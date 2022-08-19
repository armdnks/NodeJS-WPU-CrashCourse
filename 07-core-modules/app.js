const fs = require("fs"); // file system

// ... write string to file (synchronous)
// fs.writeFileSync("data/file.txt", "Hello World in Synchronous");
// try {
//   fs.writeFileSync("data/file.txt", "Hello World in Synchronous");
// } catch (error) {
//   console.log(error);
// }

// ... write string to file (asynchronous)
// fs.writeFile("data/file.txt", "Hello World in Asynchronous", "utf-8", (error) => {
//   if (error) throw error;
//   console.log("success");
// });

// ... read file (synchronous)
// const data = fs.readFileSync("data/file.txt", "utf-8");
// console.log(data);

// ... read file (asynchronous)
// fs.readFile("data/file.txt", "utf8", (error, data) => {
//   if (error) throw error;
//   console.log(data);
// });

// ... readline module
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.question("Please enter your name? ", (name) => {
//   rl.question("Please enter your phone number? ", (phone) => {
//     console.log("Hello, " + name + ", your number is " + phone);
//     rl.close();
//   });
// });

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
