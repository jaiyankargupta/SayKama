const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/saykama';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'customer' },
  phone: String,
  isVerified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seedUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing test users
    await User.deleteMany({ email: { $in: ['admin@saykama.com', 'customer@saykama.com'] } });
    console.log('🗑️  Cleared existing test users');

    // Create Admin User
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@saykama.com',
      password: adminPassword,
      role: 'admin',
      phone: '+911234567890',
      isVerified: true
    });
    console.log('✅ Created Admin User');

    // Create Customer User
    const customerPassword = await bcrypt.hash('Customer@123', 10);
    const customer = await User.create({
      name: 'John Customer',
      email: 'customer@saykama.com',
      password: customerPassword,
      role: 'customer',
      phone: '+919876543210',
      isVerified: true
    });
    console.log('✅ Created Customer User');

    console.log('\n' + '='.repeat(60));
    console.log('🎉 USER ACCOUNTS CREATED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📝 LOGIN CREDENTIALS:\n');
    
    console.log('👨‍💼 ADMIN ACCOUNT:');
    console.log('   Email: admin@saykama.com');
    console.log('   Password: Admin@123');
    console.log('   Role: admin');
    console.log('   Access: Full dashboard & admin panel\n');
    
    console.log('👤 CUSTOMER ACCOUNT:');
    console.log('   Email: customer@saykama.com');
    console.log('   Password: Customer@123');
    console.log('   Role: customer');
    console.log('   Access: Shopping, orders, profile\n');
    
    console.log('='.repeat(60));
    console.log('🔗 Login URL: http://localhost:3000/login');
    console.log('='.repeat(60) + '\n');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers();
