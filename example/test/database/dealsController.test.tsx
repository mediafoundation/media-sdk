import {Deal} from "../../database/models/Deal";

let { upsertDeal } = require('../../database/controllers/dealsController');


beforeAll(async () => {
  //console.log(sequelize)
  await Deal.sync({force: true})
  //await sequelize.sync({ force: true });
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
