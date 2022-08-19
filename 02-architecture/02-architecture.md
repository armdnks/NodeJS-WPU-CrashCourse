## Section 2: Node.js Architecture

> https://www.youtube.com/watch?v=wcQaspZE-20&list=PLFIM0718LjIW-XBdVOerYgKegBtD6rSfD&index=2

### What is Node.js?

> Node.js is a <b>runtime environment</b> for executing JavaScript code

### Let's Code

- create .js file

> 02-architecture.js

```js
function getUserSync(id) {
  let name = "";
  if (id === 1) {
    name = "Admin";
  } else {
    name = "User";
  }
  return { id, name };
}
```

```js
// Refactor
function getUserSync(id) {
  const name = id === 1 ? "Admin" : "User";
  return { id, name };
}
```

### Synchronus

```js
// Synchronus
module.exports.Synchronus = function () {
  function getUserSync(id) {
    const name = id === 1 ? "Admin" : "User";
    return { id, name };
  }

  const userOne = getUserSync(1);
  console.log(userOne);

  const userTwo = getUserSync(2);
  console.log(userTwo);

  const hello = "Hello World";
  console.log("hello");
};
```

```bash
node -p "require('./app.js').synchronus()"
```

```bash
{ id: 1, name: 'Admin' }
{ id: 2, name: 'User' }
hello
undefined
```

### Asynchronus

```js
// Asynchronus
module.exports.asynchronus = function () {
  const getUser = (id, callback) => {
    const time = id === 1 ? 3000 : 2000;
    setTimeout(() => {
      const name = id === 1 ? "Admin" : "User";
      callback({ id, name });
    }, time);
  };

  const userOne = getUser(1, (result) => {
    console.log(result);
  });

  const userTwo = getUser(2, (result) => {
    console.log(result);
  });

  const hello = "Hello World";
  console.log("hello");
};
```

```bash
node -p "require('./app.js').asynchronus()"
```

```bash
hello
undefined
{ id: 2, name: 'User' }
{ id: 1, name: 'Admin' }
```
