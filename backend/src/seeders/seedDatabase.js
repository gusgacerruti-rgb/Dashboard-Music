const mongoose = require('mongoose');
const Band = require('../models/Band');
const Concert = require('../models/Concert');
require('dotenv').config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/music-dashboard');
};

const bands = [
  {
    name: "Sleep Token",
    genre: "Metal",
    subgenre: "Progressive Metal",
    totalSongs: 75,
    popularity: 95,
    listeners: 2500000,
    country: "UK",
    formedYear: 2016
  },
  {
    name: "Avenged Sevenfold",
    genre: "Metal",
    subgenre: "Heavy Metal",
    totalSongs: 36,
    popularity: 90,
    listeners: 5000000,
    country: "USA",
    formedYear: 1999
  },
  {
    name: "Korn",
    genre: "Metal",
    subgenre: "Nu Metal",
    totalSongs: 36,
    popularity: 88,
    listeners: 4500000,
    country: "USA",
    formedYear: 1993
  },
  {
    name: "Linkin Park",
    genre: "Rock",
    subgenre: "Alternative Rock",
    totalSongs: 28,
    popularity: 92,
    listeners: 8000000,
    country: "USA",
    formedYear: 1996
  },
  {
    name: "Imagine Dragons",
    genre: "Pop Rock",
    subgenre: "Indie Rock",
    totalSongs: 27,
    popularity: 85,
    listeners: 6500000,
    country: "USA",
    formedYear: 2008
  },
  {
    name: "Bring Me The Horizon",
    genre: "Metal",
    subgenre: "Metalcore",
    totalSongs: 24,
    popularity: 87,
    listeners: 3800000,
    country: "UK",
    formedYear: 2004
  },
  {
    name: "My Chemical Romance",
    genre: "Rock",
    subgenre: "Emo Rock",
    totalSongs: 19,
    popularity: 89,
    listeners: 4200000,
    country: "USA",
    formedYear: 2001
  },
  {
    name: "Bullet For My Valentine",
    genre: "Metal",
    subgenre: "Metalcore",
    totalSongs: 16,
    popularity: 84,
    listeners: 2800000,
    country: "Wales",
    formedYear: 1998
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🔄 Limpando banco de dados...');
    
    await Band.deleteMany({});
    await Concert.deleteMany({});
    
    console.log('🌱 Inserindo bandas...');
    const createdBands = await Band.insertMany(bands);
    
    console.log('🌱 Inserindo shows...');
    const concerts = [
      {
        bandId: createdBands[7]._id,
        title: "Bullet For My Valentine",
        date: new Date("2026-02-18")
      },
      {
        bandId: createdBands[0]._id,
        title: "Sleep Token",
        date: new Date("2026-03-15")
      },
      {
        bandId: createdBands[2]._id,
        title: "Korn",
        date: new Date("2026-05-08")
      },
      {
        bandId: createdBands[1]._id,
        title: "Avenged Sevenfold",
        date: new Date("2026-06-22")
      },
      {
        bandId: createdBands[3]._id,
        title: "Linkin Park",
        date: new Date("2026-07-30")
      },
      {
        bandId: createdBands[4]._id,
        title: "Imagine Dragons",
        date: new Date("2026-09-12")
      },
      {
        bandId: createdBands[5]._id,
        title: "Bring Me The Horizon",
        date: new Date("2026-10-14")
      },
      {
        bandId: createdBands[6]._id,
        title: "My Chemical Romance",
        date: new Date("2026-11-05")
      }
    ];
    
    await Concert.insertMany(concerts);
    
    console.log('✅ Banco de dados populado com sucesso!');
    console.log(`📊 ${createdBands.length} bandas inseridas`);
    console.log(`🎫 ${concerts.length} shows inseridos`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
};

seedDatabase();
