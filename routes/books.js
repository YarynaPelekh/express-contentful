const express = require("express");
const cf = require("../services/cf");
const router = express.Router();
var stringify = require("json-stringify-safe");

router.get("/", (req, res) => {
  cf.api
    .getEntries({ content_type: "book" })
    .then((response) => {
      var books = [];
      if (response.total > 0) {
        books = formatBooks_(response.items);
        // books = stringify(response.items);
      }
      res.send(books);
    })
    .catch(console.error);
});

router.get("/book", (req, res) => {
  cf.api
    .getEntry("3NexSc6JX30wOyeRQdnKhi")
    .then((entry) => {
      res.send(stringify(entry));
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  cf.api
    .getEntry(req.params.id)
    .then((entry) => {
      console.log("id -", req.params.id, entry, typeof entry);
      res.send(stringify(entry));
    })
    .catch((err) => console.log(err));
});

function formatBooks_(books) {
  const result = [];
  books.forEach((element) => {
    // result.push(stringify(element));
    // console.log("element.fields.photo", element.fields.photo);
    result.push(formatBook_(element));
  });
  return result;
}

function formatBook_(book) {
  return {
    sys: { id: book.sys.id },
    title: book.fields.title,
    author: {
      id: book.sys.id,
      firstName: book.fields.author.fields.firstName,
      lastName: book.fields.author.fields.lastName,
    },
    photo: { url: book.fields.photo.fields.file.url },
    genre: book.fields.genre,
  };
}

module.exports = router;
