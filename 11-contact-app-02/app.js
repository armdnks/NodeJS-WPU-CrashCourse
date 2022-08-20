// console.log(process.argv);

const command = process.argv[2];
switch (command) {
  case "add":
    console.log("add");
    break;
  case "remove":
    console.log("remove");
    break;
  case "list":
    console.log("list");
    break;
  default:
    console.log("invalid value");
}
