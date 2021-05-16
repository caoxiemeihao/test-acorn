const path = require('path')
const fs = require('fs')
const acorn = require('acorn')

const code = fs.readFileSync(path.join(__dirname, 'test.js'), 'utf8')
const node = acorn.parse(code, {
  ecmaVersion: 2018,
  sourceType: 'module',
})

fs.writeFileSync(path.join(__dirname, 'node.json'), JSON.stringify(node, null, 2))

let codeRet = code
node.body.reverse().forEach((item) => {
  if (item.type !== 'ImportDeclaration') return

  const statr = codeRet.substring(0, item.start)
  const end = codeRet.substring(item.end)
  const deft = item.specifiers.find(({ type }) => type === 'ImportDefaultSpecifier')
  const deftModule = deft ? deft.local.name : ''
  const nameAs = item.specifiers.find(({ type }) => type === 'ImportNamespaceSpecifier')
  const nameAsModule = nameAs ? nameAs.local.name : ''
  const modules = item.
    specifiers
    .filter((({ type }) => type === 'ImportSpecifier'))
    .reduce((acc, cur) => acc.concat(cur.imported.name), [])

  console.log(deftModule, '|', nameAsModule, '|', modules, '\n----')

  if (nameAsModule) {
    codeRet = `${statr}const ${nameAsModule} = require(${item.source.raw})${end}`
  } else {
    const imported = modules.length
      ? (deftModule && ', ') + `{ ${modules.join(', ')} }`
      : ''
    codeRet = `${statr}const ${deftModule + imported} = require(${item.source.raw})${end}`
  }
})

console.log(codeRet)
