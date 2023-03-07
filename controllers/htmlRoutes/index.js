const axios = require('axios');
const router = require('express').Router();
const { authChecker } = require('../../utils/authChecker');

router.get('/', async (req, res) => {
  res.render('home', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/search/:searchTerm', authChecker, async (req, res) => {
  const { searchTerm } = req.params;

  const googleBookResponse =
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}
  `);

  const books = googleBookResponse.data.items.map((book) => ({
    id: book.id,
    description: book.volumeInfo.description,
    image: book.volumeInfo.imageLinks.thumbnail,
    title: book.volumeInfo.title,
  }));

  res.render('search', {
    books,
  });
});

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
