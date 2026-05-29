const fs = require('fs')
const iconv = require('iconv-lite')

const buf = fs.readFileSync('jobs.csv')
const text = iconv.decode(buf, 'cp932')
const firstLine = text.split('\n')[0]
const headers = firstLine.split(',').map(h => h.replace(/^"|"$/g, ''))
headers.forEach((h, i) => console.log(i + ': ' + h))
