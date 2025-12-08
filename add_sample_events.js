const db = require('./db');

async function addSampleEvents() {
  try {
    console.log('🔄 Adding sample events to database...\n');
    
    // Check if we have users
    const [users] = await db.query('SELECT id, name, email FROM users LIMIT 3');
    if (users.length === 0) {
      console.log('❌ No users found! Please add users first.');
      process.exit(1);
    }
    
    console.log('👥 Found users:');
    users.forEach(u => console.log(`   - ${u.name} (${u.email})`));
    console.log('');
    
    // Use the first user as host
    const hostId = users[0].id;
    
    // Sample events
    const events = [
      {
        title: 'Веб хөгжүүлэлтийн семинар',
        description: 'React болон Node.js ашиглан орчин үеийн веб хөгжүүлэлт сурах. Анхан болон дунд түвшний хөгжүүлэгчдэд тохиромжтой.',
        category: 'Workshop',
        location: 'Компьютерийн лаб А',
        start_datetime: '2025-01-15 14:00:00',
        end_datetime: '2025-01-15 17:00:00',
        max_attendees: 30
      },
      {
        title: 'Сургуулийн хөлбөмбөгийн тэмцээн',
        description: 'Тэнхимүүдийн хоорондох жилийн хөлбөмбөгийн тэмцээн. 5 тоглогчтой баг. Бүртгэл арга хэмжээнээс долоо хоногийн өмнө хаагдана.',
        category: 'Sports',
        location: 'Төв спортын талбай',
        start_datetime: '2025-01-20 09:00:00',
        end_datetime: '2025-01-20 18:00:00',
        max_attendees: 100
      },
      {
        title: 'Карьерын үзэсгэлэн 2025',
        description: 'Шилдэг ажил олгогчидтой уулзаж карьерын боломжуудтай танилцаарай. Анкетаа авчирна уу!',
        category: 'Academic',
        location: 'Хурлын танхим',
        start_datetime: '2025-01-25 10:00:00',
        end_datetime: '2025-01-25 16:00:00',
        max_attendees: null
      }
    ];
    
    // Insert events
    for (const event of events) {
      const [result] = await db.query(
        'INSERT INTO events (title, description, category, location, start_datetime, end_datetime, host_id, max_attendees) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [event.title, event.description, event.category, event.location, event.start_datetime, event.end_datetime, hostId, event.max_attendees]
      );
      console.log(`✅ Added event: ${event.title} (ID: ${result.insertId})`);
    }
    
    console.log('\n✨ Sample events added successfully!');
    console.log('🚀 You can now browse events at http://localhost:3001/events');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit();
  }
}

addSampleEvents();
