const fs = require('fs')
const iconv = require('iconv-lite')
const Papa = require('papaparse')

const buf = fs.readFileSync('jobs.csv')
const text = iconv.decode(buf, 'cp932')
const { data } = Papa.parse(text, { header: true, skipEmptyLines: true })

const row = data[0]
console.log('=== Key columns ===')
console.log('title (col2):', row['求人名【法人名×職種】'])
console.log('company (col61):', row['法人名'])
console.log('job type (col3):', row['★職種'])
console.log('salary_min (col51):', row['年収（下限）'])
console.log('salary_max (col52):', row['年収（上限）'])
console.log('status (col1):', row['★ステータス'])
console.log('description (col88):', row['具体的な業務内容']?.substring(0, 100))

console.log('\n=== Prefecture sample ===')
const prefKeys = Object.keys(row).filter(k => k.startsWith('★配属先エリア'))
prefKeys.slice(0, 5).forEach(k => console.log(k, '=', row[k]))

const areas = prefKeys.filter(k => row[k] === '1').map(k => k.match(/\[(.+?)\]/)?.[1]).filter(Boolean)
console.log('\nareas for row1:', areas)

const statuses = new Set(data.map(r => r['★ステータス']).filter(Boolean))
console.log('\n=== Unique statuses ===')
statuses.forEach(s => console.log(JSON.stringify(s)))

console.log('\nTotal rows:', data.length)
