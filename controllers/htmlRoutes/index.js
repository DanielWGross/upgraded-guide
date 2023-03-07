const axios = require('axios');
const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('home', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/search/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params;

  const googleBookResponse =
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}
  `);

  const books = googleBookResponse.data.items.map((book) => ({
    id: book.id,
    // author:
    //   book.volumeInfo.author.length > 0
    //     ? book.volumeInfo.author[0]
    //     : 'No author found',
    description: book.volumeInfo.description,
    image: book.volumeInfo.imageLinks.thumbnail,
    title: book.volumeInfo.title,
  }));

  // res.status(200).json(books);
  res.render('search', {
    books,
  });
});

module.exports = router;
