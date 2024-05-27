const express = require('express');
const port = 3000;
const path = require('path');
const app = express();
const postsRouter = require('./routers/posts');

app.use(express.static('./public'));

app.use('/posts', postsRouter);

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
