/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('inventory_snapshots', {
    id: 'id', // Primary key, serial
    sku: { type: 'varchar(255)', notNull: true },
    product_name: { type: 'varchar(255)', notNull: true },
    size: { type: 'varchar(50)', notNull: true },
    color: { type: 'varchar(50)' },
    quantity: { type: 'integer', notNull: true, default: 0 },
    is_available: { type: 'boolean', notNull: true, default: false },
    brand: { type: 'varchar(100)', notNull: true },
    store_id: { type: 'varchar(100)', notNull: true },
    last_refreshed_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createIndex('inventory_snapshots', ['brand', 'store_id']);
  pgm.createIndex('inventory_snapshots', 'sku');
};

exports.down = (pgm) => {
  pgm.dropTable('inventory_snapshots');
};
