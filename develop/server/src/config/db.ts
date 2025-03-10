import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    port: Number(process.env.DATABASE_PORT) || 5432,
    logging: false, // Set to true for debugging SQL queries
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log('✅ Database connected successfully!'))
  .catch((error) => console.error('❌ Unable to connect to the database:', error));
