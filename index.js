const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

const comments = [
  {
    id: 1,
    username: 'Todd',
    comment: 'lol that is so funny!',
  },
  {
    id: 2,
    username: 'Skyler',
    comment: 'I like to go birdwatching with my dog',
  },
  {
    id: 3,
    username: 'Sk8erBoi',
    comment: 'Plz delete your account, Todd',
  },
  {
    id: 4,
    username: 'onlysayswoof',
    comment: 'woof woof woof',
  },
];

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

app.post('/comments', (req, res) => {
  console.log(req.body);
  const { username, comment } = req.body;
  comments.push({ username, comment });
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === parseInt(id));
  res.render('comments/show', { comment });
});

app.get('/tacos', (req, res) => {
  res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
  const { meat, qty } = req.body;
  res.send(`Okay here are your ${qty} ${meat} tacos.`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
