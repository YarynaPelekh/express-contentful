const express = require("express");
const cf = require("../services/cf");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("authors router");
  cf.api
    .getEntries({ content_type: "persona", limit: 4 })
    .then((response) => {
      //   console.log(response.items, "response.total ", response.total);
      var authors = [];
      if (response.total > 0) {
        authors = formatAuthors_(response.items);
      }
      res.send(authors);
    })
    .catch(console.error);
});

router.get("/author", (req, res) => {
  cf.api
    .getEntry("1k4vJ3mdEBnBx5U6JDpIFb")
    .then((entry) => {
      console.log(entry, typeof entry);
      return entry;
    })
    .then((entry) => {
      // res.send(`${entry.fields.firstName} ${entry.fields.lastName}`);
      res.send(entry);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  cf.api
    .getEntry(req.params.id)
    .then((entry) => {
      console.log(entry, typeof entry);
      res.send(entry);
      // return entry;
    })
    // .then((entry) => {
    //   res.send(`${entry.fields.firstName} ${entry.fields.lastName}`);
    // })
    .catch((err) => console.log(err));
});

function formatAuthors_(authors) {
  //   console.log("Books books", books);
  const result = [];
  console.log("Authors array -", authors);
  authors.forEach((element) => {
    result.push({
      id: element.sys.id,
      firstName: element.fields.firstName,
      lastName: element.fields.lastName,
    });
  });

  return result;
}

module.exports = router;
