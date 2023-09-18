import {sequelize} from "../database";
import {DataTypes} from "sequelize";

export const Deal = sequelize.define("Deals",
  {
    id: {type: DataTypes.STRING, primaryKey: true},
    offerId: DataTypes.STRING,
    client: DataTypes.STRING,
    provider: DataTypes.STRING,
    resourceId: DataTypes.STRING,
    totalPayment: DataTypes.STRING,
    blockedBalance: DataTypes.STRING,
    pricePerSecond: DataTypes.STRING,
    minDuration: DataTypes.BIGINT,
    billFullPeriods: DataTypes.BOOLEAN,
    singlePeriodOnly: DataTypes.BOOLEAN,
    createdAt: DataTypes.BIGINT,
    acceptedAt: DataTypes.BIGINT,
    billingStart: DataTypes.BIGINT,
    active: DataTypes.BOOLEAN,
    cancelled: DataTypes.BOOLEAN,
    cancelledAt: DataTypes.BIGINT,
    metadata: DataTypes.STRING,
    network: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'Deal',
    freezeTableName: true
  }
);
