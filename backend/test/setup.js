// Mock de la base de datos para los tests
const mockDb = {
  query: jest.fn((query, params, callback) => {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }
    
    if (query.includes('SELECT * FROM users')) {
      callback(null, [{
        id: 1,
        username: 'testuser',
        password: '$2a$10$YourHashedPasswordHere',
        email: 'test@example.com'
      }]);
    } else if (query.includes('SELECT COUNT(*)')) {
      callback(null, [{ count: 1 }]);
    } else if (query.includes('SELECT * FROM products')) {
      if (params && params.length > 0) {
        const category = params[0];
        const sqlInjectionPatterns = [
          "' OR '1'='1",
          "'; DROP TABLE products; --",
          "' UNION SELECT * FROM users --",
          "1' AND (SELECT COUNT(*) FROM users) > 0 --",
          "' OR 1=1 --",
          "'; DELETE FROM products WHERE '1'='1",
          "' UNION SELECT table_name, column_name, null, null, null FROM information_schema.columns --",
          "Electronics' OR category='Furniture",
          "Electronics' --",
          "Electronics' /*",
          "Electronics' #"
        ];
        
        if (category && sqlInjectionPatterns.some(pattern => category.includes(pattern) || category === pattern)) {
          callback(null, []);
        } else {
          callback(null, [
            { id: 1, name: 'Test Product', category: 'Test', price: 10, stock: 100 }
          ]);
        }
      } else {
        callback(null, [
          { id: 1, name: 'Test Product', category: 'Test', price: 10, stock: 100 }
        ]);
      }
    } else {
      callback(null, []);
    }
  }),
  connect: jest.fn((callback) => callback(null))
};

// Mock del módulo de database
jest.mock('../src/config/database', () => ({
  db: mockDb,
  connectWithRetry: jest.fn()
}));

// Variables de entorno para tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.DB_HOST = 'localhost';
process.env.DB_USER = 'test';
process.env.DB_PASSWORD = 'test';
process.env.DB_NAME = 'test_db';

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
});
