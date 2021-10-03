const { log } = require("console");
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const morgan = require("morgan");
const book = require("./book.controller");

const connectAndRetry = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin-bookdb:o8aypw2FHxC6e0AM@cluster0.sxlyo.mongodb.net/BookDB?retryWrites=true&w=majority"
    );
    log("Connected to MongoDB");
  } catch (error) {
    log("retrying connect in 5s");
    setTimeout(connectAndRetry, 5000);
  }
};
if(process.env.NODE_ENV !== "test") {

    app.use(morgan("combined"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json({ type: "application/json" }));

connectAndRetry();
app.get("/api", (req, res) => {
  res.send("Welcome to the App");
});

app.route("/api/books").get(book.getBooks).post(book.postBook);
app
  .route("/api/books/:id")
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook);

app.listen(port);

module.exports = app;