const request = require('supertest');
const app = require('../../app'); // Our main Express app
const db = require('../../db');   // Used for DB cleanup

describe('Inventory API Endpoints', () => {
  // After all tests finish, close the database connection pool to allow Jest to exit
  afterAll(async () => {
    await db.pool.end();
  });

  // Clean the database before each test to ensure isolation
  beforeEach(async () => {
    await db.query('TRUNCATE TABLE inventory_snapshots');
  });

  describe('POST /api/inventory/fetch', () => {
    it('should return 202 Accepted for a valid fetch request', async () => {
      const response = await request(app)
        .post('/api/inventory/fetch')
        .send({ brand: 'hm', storeId: '101' });

      expect(response.statusCode).toBe(202);
      expect(response.body.success).toBe(true);
    });

    it('should return 400 Bad Request if brand is missing', async () => {
      const response = await request(app)
        .post('/api/inventory/fetch')
        .send({ storeId: '101' });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      console.log("Joke123", response.body)
      expect(response.body.errors[0].message).toBe('Brand is required');
    });
  });

  describe('GET /api/inventory', () => {
    it('should return the latest inventory after a fetch', async () => {
      // Step 1: Trigger a fetch to populate the database
      await request(app)
        .post('/api/inventory/fetch')
        .send({ brand: 'uniqlo', storeId: '202' });

      // Step 2: Request the inventory for that store
      const response = await request(app)
        .get('/api/inventory?brand=uniqlo&storeId=202');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].product_name).toBe('AIRism Cotton Crew Neck T-Shirt');
    });

    it('should return 400 if storeId query parameter is missing', async () => {
      const response = await request(app).get('/api/inventory?brand=uniqlo');
      expect(response.statusCode).toBe(400);
    });
  });
});