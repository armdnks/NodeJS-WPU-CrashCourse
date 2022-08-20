# Section 11: Contact App Pt.2

> https://www.youtube.com/watch?v=3zX5VmbOHxk&list=PLFIM0718LjIW-XBdVOerYgKegBtD6rSfD&index=11

<br/>

## Node Argument

### process.argv

- process.argv - used to get the arguments passed to the node.js process when run in the command line
  > https://www.geeksforgeeks.org/node-js-process-argv-property/

> app.js

```js
console.log(process.argv);
```

- run node app hello world in terminal

```bash
node app hello world
```

```bash
# result in array
[
  '/usr/local/bin/node', # node.js repository
  '/Users/__USERNAME__/Desktop/NodeJS-WPU-CrashCourse/11-contact-app-02/app', # file entry point
  'hello', # 1st argument
  'world' # 2nd argument
]
```

> node app [2] [3]

```js
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
```
