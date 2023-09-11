let { upsertDeal } = require('../../database/controllers/dealsController');
const sequelize = require('./../../database/database');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Esto creará la estructura de la base de datos antes de ejecutar los tests
});

afterAll(async () => {
  await sequelize.close(); // Esto cerrará la conexión después de ejecutar todos los tests
});

describe('Deal Controller', () => {

  test('should create or update a deal', async () => {
    const deal = {
      id: "1",
      offerId: "1",
      client: "DataTypes.STRING",
      provider: "DataTypes.STRING",
      resourceId: "DataTypes.STRING",
      totalPayment: "DataTypes.STRING",
      blockedBalance: "DataTypes.STRING",
      pricePerSecond: "DataTypes.STRING",
      minDuration: 1,
      billFullPeriods: true,
      singlePeriodOnly: true,
      createdAt: 1,
      acceptedAt: 1,
      billingStart: 1,
      active: true,
      cancelled: 1,
      cancelledAt: 1,
      metadata: "DataTypes.STRING",
      network: "DataTypes.STRING"
    };

    const newDeal = await upsertDeal(deal)

    expect(newDeal[0].id).toBe(deal.id);

    // Actualiza el trato y verifica que ha sido actualizado
    const updatedDealData = {
      id: 1,
      isActive: false
    };

    const updatedDeal = await upsertDeal(updatedDealData);

    expect(updatedDeal[0].id).toBe(updatedDealData.id);
  });
});
