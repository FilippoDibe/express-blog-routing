const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController.js")

// siamo in /posts

router.get("/", postsController.index);
router.get("/create", postsController.create)
router.get("/:slug", postsController.show);
router.get("/:slug/download", postsController.downloadImage);



module.exports = router;
