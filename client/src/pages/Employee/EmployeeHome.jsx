import React from 'react';
import useBarcodeScanner from '../../hooks/useBarcodeScanner';

export default function EmployeeHome() {
  const { startScan, lastScanned } = useBarcodeScanner();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Employee</h1>
      <div className="bg-white p-4 rounded shadow space-y-4">
        <button onClick={startScan} className="px-3 py-1 bg-indigo-600 text-white rounded">Scan Barcode</button>
        <div>Last scanned: <span className="font-medium">{lastScanned || 'None'}</span></div>
      </div>
    </div>
  );
}
