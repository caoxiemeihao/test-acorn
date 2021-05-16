import fs from 'fs'
import path from 'path'

let res = ''

function readFile() {
  res = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')

  return res
}

export default readFile
