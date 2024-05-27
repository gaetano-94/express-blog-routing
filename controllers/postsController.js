const posts = require('../data/posts.js');
const path = require('path');

// Index: Ritorna una lista dei post
const index = (req, res) => {
  let html = '<ul>';
  res.format({
    html: () => {
      //logica html
      posts.forEach((post) => {
        html += `<li>
                    <div>
                        <h1>${post.title}</h1>
                        <h2>${post.slug}</h2>
                        <img width="200" src=${`/images/${post.image}`} />
                        <p><strong>Ricetta</strong>: ${post.content}</p>
                        <span><strong>Tags</strong>: ${post.tags}</span>
                    </div>
                </li>`;
      });
      html += '</ul>';
      res.send(html);
    },
    json: () => {
      //logica json
      res.json({
        data: posts,
        count: posts.length,
      });
    },
  });
};

// Create: Ritorna un HTML per la creazione di un nuovo post
const create = (req, res) => {
  if (req.accepts('html')) {
    res.send('<html><body><h1>Creazione nuovo post</h1></body></html>');
  } else {
    res.status(406).send('Not Acceptable');
  }
};

// Show: Ritorna i dati del post in formato JSON
const show = (req, res) => {
  const slugPostRichiesta = req.params.slug;
  const postRichiesta = posts.find((posts) => posts.slug === slugPostRichiesta);
  res.format({
    html: () => {
      if (postRichiesta) {
        const post = postRichiesta;
        res.send(`
                    <div>
                        <h1>${post.title}</h1>
                        <h2>${post.slug}</h2>
                        <img width="200" src=${`/images/${post.image}`} />
                        <p><strong>Ricetta</strong>: ${post.content}</p>
                        <span><strong>Tags</strong>: ${post.tags}</span>
                    </div>
                `);
      } else {
        res.status(404).send(`<h1>Post non trovato</h1>`);
      }
    },
    json: () => {
      if (postRichiesta) {
        res.json({
          ...postRichiesta,
          image_url: `http://${req.headers.host}/${postRichiesta.image}`,
        });
      } else {
        res.status(404).json({
          error: 'Not Found',
          description: `Non esiste una post con slug ${slugPostRichiesta}`,
        });
      }
    },
  });
};

// Download: Permette di scaricare l'immagine del post
const download = (req, res) => {
  const post = posts.find((p) => p.slug === req.params.slug);
  if (post) {
    const imagePath = path.join(
      __dirname,
      '..',
      'public',
      'images',
      post.image
    );
    res.download(imagePath, (err) => {
      if (err) {
        res.status(500).send('Error downloading the file');
      }
    });
  } else {
    res.status(404).send('Post non trovato');
  }
};

module.exports = {
  index,
  create,
  show,
  download,
};
