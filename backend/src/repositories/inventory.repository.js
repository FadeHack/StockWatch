const db = require('../db');

const inventoryRepository = {
  async createSnapshots(inventoryItems) {
    // --- FIX: PART 1 ---
    // Generate a single, consistent timestamp for the entire batch.
    const snapshotTimestamp = new Date();

    const queryText = `
      INSERT INTO inventory_snapshots(
        sku, product_name, size, color, quantity, is_available, brand, store_id, last_refreshed_at
      )
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const results = [];
    for (const item of inventoryItems) {
      const values = [
        item.sku,
        item.product_name,
        item.size,
        item.color,
        item.quantity,
        item.is_available,
        item.brand,
        item.store_id,
        snapshotTimestamp, // --- FIX: PART 2 --- Use the same timestamp for every item.
      ];
      const { rows } = await db.query(queryText, values);
      results.push(rows[0]);
    }
    return results;
  },

  async findLatestByStore(brand, storeId) {
    // With the fix above, this query now works perfectly as intended.
    // It will find the single latest timestamp and correctly return all 10 rows
    // that share that exact timestamp.
    const queryText = `
      SELECT sku, product_name, size, color, quantity, is_available, last_refreshed_at
      FROM inventory_snapshots
      WHERE brand = $1 AND store_id = $2 AND last_refreshed_at = (
        SELECT MAX(last_refreshed_at)
        FROM inventory_snapshots
        WHERE brand = $1 AND store_id = $2
      )
      ORDER BY product_name, size;
    `;
    const { rows } = await db.query(queryText, [brand, storeId]);
    return rows;
  },
};

module.exports = inventoryRepository;