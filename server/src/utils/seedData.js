module.exports = {
    admin: {
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'Admin'
    },
    sampleProducts: [
      { name: 'Bolt M8', sku: 'BOLT-M8', category: 'Hardware', price: 0.5, stockQuantity: 100 },
      { name: 'Bearing 6202', sku: 'BRG-6202', category: 'Mechanical', price: 4.5, stockQuantity: 20 }
    ],
    sampleSuppliers: [
      { name: 'Acme Supplies', contactInfo: { email: 'sales@acme.local' } }
    ],
    sampleWarehouses: [
      { name: 'Main Warehouse', location: 'Plant 1' }
    ]
  };
  