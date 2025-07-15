import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';

const app = express();
const PORT = 5000;

app.use(cors());


app.get('/api/teachers', async (req, res) => {
  try {
    const data = await fs.readFile('src/data/mockTeachers.json', 'utf8');
    const teachers = JSON.parse(data);
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi đọc dữ liệu teachers' });
  }
});


app.get('/api/products', async (req, res) => {
  try {
    const data = await fs.readFile('src/data/mockProducts.json', 'utf8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi đọc dữ liệu products' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const data = await fs.readFile('src/data/mockUsers.json', 'utf8');
    const users = JSON.parse(data);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi đọc dữ liệu users' });
  }
});

app.get('/api/suggestion', async (req, res) => {
  try {
    const data = await fs.readFile('src/data/mockSuggestion.json', 'utf8');
    const suggestion = JSON.parse(data);
    res.json(suggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi đọc dữ liệu suggestion' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
