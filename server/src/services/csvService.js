// Simple CSV parse/serialize stubs (extend with csv-parse or papaparse)
function parseCSV(buffer) {
    const s = buffer.toString('utf8');
    const lines = s.split('\n').map(l => l.trim()).filter(Boolean);
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(line => {
      const parts = line.split(',').map(p => p.trim());
      const obj = {};
      headers.forEach((h, i) => { obj[h] = parts[i]; });
      return obj;
    });
    return rows;
  }
  
  module.exports = { parseCSV };
  