const { questions, saveContact } = require("./contact.js");

const main = async () => {
  const name = await questions("Please enter your name: ");
  const email = await questions("Please enter your email: ");
  const phone = await questions("Please enter your phone number: ");

  saveContact({ name, email, phone });
};

main();
