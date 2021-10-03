let Book = require("./book.models");

module.exports = {
  getBooks(req, res, next) {
    Book.find({}).exec((err, books) => {
      if (err) res.send(err);
      //If no errors, send them back to the client
      res.json(books);
    });
  },
  async postBook(req, res, next) {
    const { title, year, author, pages } = req.body;
    try {
        const book = await Book.create({ title, year, author, pages })
        res.json({ message: "Book successfully added!", book });
    } catch (error) {
        res.status(400).send(error);
    }
  },
  getBook(req, res, next) {
    const id = req.params.id;
    Book.findById(id).exec((err, book) => {
      if (err) res.send(err);
      //If no errors, send them back to the client
      res.json(book);
    });
  },
  deleteBook(req, res, next) {
    const id = req.params.id;
    Book.findByIdAndDelete(id).exec((err, book) => {
      if (err) res.send(err);
      //If no errors, send them back to the client
      res.json({ msg: "deleted " + id });
    });
  },
  updateBook(req, res, next) {
    const { title, year, author, pages } = req.body;
    const { id } = req.params;
    Book.findByIdAndUpdate(id, { title, year, author, pages }).exec(
      (err, book) => {
        if (err) res.send(err);
        //If no errors, send them back to the client
        res.json({ msg: "Updated " + id });
      }
    );
  },
};
