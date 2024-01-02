const contentful = require("contentful");

// Configure Contentful
exports.const = {
  POST_CT: "2wKn6yEnZewu2SCCkus4as",
  CAT_CT: "5KMiN6YPvi42icqAUQMCQe",
  AUTHOR_CT: "1kUEViTN4EmGiEaaeC6ouY",
};

exports.api = contentful.createClient({
  space: "lnflsi90e8vx",
  accessToken: "ER9ZMhqKlvvQPviTrsvEQw1_7GsZF32sUYivrOCFMkQ",
});
