//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Book = require("./book.models");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./main");
chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Books", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Book.deleteMany({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET books", () => {
    it("it should GET all the books", (done) => {
      chai
        .request(server)
        .get("/api/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST books with pages", () => {
    it("it should POST all the books", (done) => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
        pages: 111,
      };
      chai
        .request(server)
        .post("/api/books")
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Book successfully added!");
          res.body.book.should.have.property("title");
          res.body.book.should.have.property("author");
          res.body.book.should.have.property("pages");
          res.body.book.should.have.property("year");
          done();
        });
    });
  });

  describe("/POST books", () => {
    it("it should not POST a book without pages field", (done) => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        year: 1954,
      };
      chai
        .request(server)
        .post("/api/books")
        .send(book)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("pages");
          res.body.errors.pages.should.have.property("kind").eql("required");
          done();
        });
    });
  });

  describe("/GET/:id books", () => {
      it("it should GET  a book by the given id", (done) => {
        let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
        book.save((err, book) => {
            chai.request(server)
          .get('/api/books/' + book.id)
          .send(book)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('author');
                res.body.should.have.property('pages');
                res.body.should.have.property('year');
                res.body.should.have.property('_id').eql(book.id);
            done();
          });
        });
      })
  })
});
