// Synchronus
module.exports.synchronus = function () {
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
