#!/usr/bin/env node

var path = require('path')

var sp = path.join(require.resolve('typescript'), '..', 'tsserver.js')

var cp = require('child_process')

var proc = cp.fork(sp, {stdio: 'pipe'})

proc.stdin.write('{"seq":1,"command":"open","arguments": {"file": "./src/test.ts"}}\n')
proc.stdout.on('data', data => console.log(data.toString()))
