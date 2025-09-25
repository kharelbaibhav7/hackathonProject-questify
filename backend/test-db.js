import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('DB_URL:', process.env.DB_URL);
    
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Connected to MongoDB successfully!');
    process.exit(0);
  } catch (error) {
    console.log('❌ MongoDB connection failed:');
    console.log('Error message:', error.message);
    console.log('Error code:', error.code);
    process.exit(1);
  }
};

testConnection();
