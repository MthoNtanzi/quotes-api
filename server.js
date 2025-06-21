const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// Read the categorized quotes JSON
const quotesData = JSON.parse(fs.readFileSync('./categorizedQuotes.json', 'utf-8'));

// 1. Get all quotes
app.get('/api/quotes', (req, res) => {
  res.json(quotesData);
});

// 2. Get all quotes by category
app.get('/api/quotes/:category', (req, res) => {
  const category = req.params.category.toLowerCase();

  if (!quotesData[category]) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json(quotesData[category]);
});

// 3. Get quote by ID (across all categories)
app.get('/api/quote/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  for (const category in quotesData) {
    const found = quotesData[category].find(q => q.id === id);
    if (found) {
      return res.json({ ...found, category });
    }
  }

  res.status(404).json({ error: 'Quote not found' });
});

// 4. Search quotes by text or person
app.get('/api/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing search query (?q=)' });
  }

  const query = q.toLowerCase();
  const results = [];

  for (const category in quotesData) {
    quotesData[category].forEach(quoteObj => {
      const quoteText = quoteObj.quote.toLowerCase();
      const personText = quoteObj.person.toLowerCase();

      if (quoteText.includes(query) || personText.includes(query)) {
        results.push({ ...quoteObj, category });
      }
    });
  }

  if (results.length === 0) {
    return res.status(404).json({ message: 'No quotes found' });
  }

  res.json(results);
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
