const path = require("path");
const express = require("express"); //CommonJS Modules
const app = express();
const postsRouter = require("./routers/posts.js");
app.use(express.static('./public'));

app.use('/posts', postsRouter);



//start server
app.listen(3000, () => {
    console.log('Server attivo sulla porta http://localhost:3000.');
});