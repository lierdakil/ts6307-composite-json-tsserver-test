# Test repository

1. Clone
2. Run `npm install`
3. Run `node test.js`
4. Observe output
5. Kill `test.js` (ctrl+c or whathaveyou)

### Expected:

No error diagnostics

### Actual:

In tsserver output, we see:

`{"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"src/test.ts","configFile":"tsconfig.json","diagnostics":[{"text":"File '/tmp/test/src/blabla.json' is not listed within the file list of project 'tsconfig.json'. Projects must list all files or use an 'include' pattern.","code":6307,"category":"error"}]}}`

That is, TS6307 on a JSON file, which is included in the project via `include` pattern.

## Complete listing

##### `src/blabla.json`
```json
{}
```

##### `src/test.ts`
```ts
import * as blabla from "./blabla.json"
```

##### `tsconfig.json`
```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "composite": true
  },
  "include": ["./src/*.ts", "./src/*.json"]
}
```

##### `test.js`
```js
#!/usr/bin/env node

var path = require('path')
var sp = path.join(require.resolve('typescript'), '..', 'tsserver.js')
var cp = require('child_process')
var proc = cp.fork(sp, {stdio: 'pipe'})

proc.stdin.write('{"seq":1,"command":"open","arguments": {"file": "./src/test.ts"}}\n')
proc.stdout.on('data', data => console.log(data.toString()))
```

##### `package.json`

Is only there to easily get tsserver to where node can find it.

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typescript": "3.6.3"
  }
}
```
