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

const saveContact = (props) => {
  const contact = props;
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts), "utf8");
  console.log("Thank you");
  rl.close();
};

module.exports = { questions, saveContact };
