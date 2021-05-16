const path = require('path')
const fs = require('fs')
const acorn = require('acorn')

const code = fs.readFileSync(path.join(__dirname, 'test.js'), 'utf8')
const node = acorn.parse(code, {
  ecmaVersion: 2018,
  sourceType: 'module',
})

fs.writeFileSync(path.join(__dirname, 'node.json'), JSON.stringify(node, null, 2))

console.log(node)
