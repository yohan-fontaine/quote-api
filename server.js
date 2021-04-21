const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT);

app.get('/api/quotes/random', (req, res, next) => {
  const quote = {
    quote: getRandomElement(quotes)
  };
  res.send(quote);
});

app.get('/api/quotes', (req, res, next) => {
  const name = req.query.person;
  const personQuotes = {
    quotes: quotes.filter(quote => {
      return quote.person === name;
    })
  };
  if (name) {
    res.send(personQuotes);
  } else {
    res.send({ quotes: quotes });
  }
});

app.post('/api/quotes', (req, res, next) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person
  }
  if (newQuote.quote !== '' && newQuote.person !== '') {
    quotes.push(newQuote);
    res.status(201).send({ quotes: newQuote });
  } else {
    res.status(400).send();
  }
});
