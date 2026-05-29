const fs = require('fs')
const iconv = require('iconv-lite')

const buf = fs.readFileSync('jobs.csv')
const text = iconv.decode(buf, 'cp932')
const lines = text.split('\n')

// Parse a CSV line properly (handles quoted fields with commas/newlines)
function parseCSVLine(line) {
  const result = []
  let cur = '', inQuote = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') { inQuote = !inQuote }
    else if (c === ',' && !inQuote) { result.push(cur); cur = '' }
    else { cur += c }
  }
  result.push(cur)
  return result
}

const headers = parseCSVLine(lines[0])
const row1 = parseCSVLine(lines[1])
const row2 = parseCSVLine(lines[2])

// Print key columns
const keyCols = [1, 2, 3, 51, 52, 61, 88]
console.log('=== Row 1 key columns ===')
keyCols.forEach(i => console.log(`[${i}] ${headers[i]}: ${row1[i]?.substring(0, 80)}`))

// Print a few prefecture cols
console.log('\n=== Row 1 prefecture sample (cols 4-10) ===')
for (let i = 4; i <= 10; i++) {
  console.log(`[${i}] ${headers[i]}: "${row1[i]}"`)
}

// Unique status values
const statuses = new Set()
for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue
  const row = parseCSVLine(lines[i])
  if (row[1]) statuses.add(row[1])
}
console.log('\n=== Unique status values ===')
statuses.forEach(s => console.log(JSON.stringify(s)))
