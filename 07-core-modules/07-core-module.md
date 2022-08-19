# Section 7: Core Module

> https://www.youtube.com/watch?v=PzjGJFUjms4&list=PLFIM0718LjIW-XBdVOerYgKegBtD6rSfD&index=7

## File System

- import fs from "fs"

```js
const fs = require("fs");
```

### fs.writeFileSync()

- fs.writeFileSync() is a synchronous method
- creates a new file if the specified file does not exist
  > https://www.geeksforgeeks.org/node-js-fs-writefilesync-method/
- if the file is exists, the value will be overwritten

```js
fs.writeFileSync(__FILE_PATH__, __MESSAGE__);
```

```js
// write string to file (synchronus)
fs.writeFileSync("data/file.txt", "Hello World in Synchronous");
```

- create a folder named <b>data</b> in root
- run node app
- it will automatically create a new file in data folder

```bash
_root
└── data
    └── file.txt
```

> if the folder directory does not exist, it will throw an error <br/>
> because there are different methods to create folders <br/>
> fs.mkdir() || fs.mkdirSync() - next lecture
