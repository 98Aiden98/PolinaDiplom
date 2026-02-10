import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import AdminUser from '../models/AdminUser.js';
import News from '../models/News.js';
import ScheduleItem from '../models/ScheduleItem.js';
import MatchResult from '../models/MatchResult.js';
import TeamMember from '../models/TeamMember.js';

dotenv.config();

async function seed() {
  await connectDB(process.env.MONGO_URI);

  const adminUsername = 'admin';
  const adminPassword = 'admin123';

  const adminExists = await AdminUser.findOne({ username: adminUsername });
  if (!adminExists) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await AdminUser.create({ username: adminUsername, passwordHash });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }

  const missingSlugs = await News.find({
    $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }]
  });
  if (missingSlugs.length > 0) {
    for (const doc of missingSlugs) {
      doc.slug = undefined;
      await doc.save();
    }
    console.log('Fixed missing news slugs');
  }

  const newsSeed = [
    {
      title: 'Старт сезона и планы на весну',
      content: 'Новый сезон стартует в марте. Мы готовим серию товарищеских матчей и открытых тренировок.'
    },
    {
      title: 'Победа в товарищеском матче',
      content: 'Наша команда одержала уверенную победу со счетом 3:1. Отличились молодые игроки.'
    },
    {
      title: 'Открытая тренировка для новых игроков',
      content: 'Приглашаем всех желающих на открытую тренировку в субботу. Возьмите удобную экипировку.'
    }
  ];
  let newsCreated = 0;
  for (const item of newsSeed) {
    const exists = await News.exists({ title: item.title });
    if (!exists) {
      await News.create(item);
      newsCreated += 1;
    }
  }
  if (newsCreated > 0) {
    console.log('News seeded');
  } else {
    console.log('News already seeded');
  }

  const scheduleCount = await ScheduleItem.countDocuments();
  if (scheduleCount === 0) {
    await ScheduleItem.insertMany([
      {
        dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        type: 'training',
        location: 'Стадион Центральный, поле №2',
        notes: 'Встречаемся за 20 минут до начала'
      },
      {
        dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        type: 'match',
        opponent: 'ФК Север',
        location: 'Стадион Северный',
        notes: 'Товарищеский матч'
      },
      {
        dateTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        type: 'training',
        location: 'Стадион Центральный, поле №1'
      }
    ]);
    console.log('Schedule seeded');
  }

  const resultsCount = await MatchResult.countDocuments();
  if (resultsCount === 0) {
    await MatchResult.insertMany([
      {
        dateTime: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        opponent: 'ФК Восток',
        ourScore: 2,
        theirScore: 2,
        competition: 'Товарищеский матч',
        notes: 'Равная игра и боевой характер'
      },
      {
        dateTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        opponent: 'ФК Маяк',
        ourScore: 1,
        theirScore: 0,
        competition: 'Городская лига'
      },
      {
        dateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        opponent: 'ФК Сокол',
        ourScore: 0,
        theirScore: 1,
        competition: 'Городская лига'
      }
    ]);
    console.log('Results seeded');
  }

  const teamCount = await TeamMember.countDocuments();
  if (teamCount === 0) {
    await TeamMember.insertMany([
      {
        fullName: 'Иван Петров',
        position: 'Нападающий',
        number: 9,
        bio: 'Лидер атаки, быстрый и техничный.'
      },
      {
        fullName: 'Алексей Смирнов',
        position: 'Полузащитник',
        number: 8,
        bio: 'Уверенно ведет игру в центре поля.'
      },
      {
        fullName: 'Дмитрий Кузнецов',
        position: 'Защитник',
        number: 4,
        bio: 'Надежный игрок обороны.'
      }
    ]);
    console.log('Team seeded');
  }

  console.log('Seed completed');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
