import fs from 'fs'
import * as http from 'http'
import path, { join, sep } from 'path'

let res = ''

function readFile() {
  res = fs.readFileSync(join(__dirname, `..${sep}package.json`), 'utf-8')

  return res
}

export default readFile
