const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// Route definitions
router.get('/', postsController.index);
router.get('/:slug', postsController.show);
router.get('/create', postsController.create);
router.get('/:slug/download', postsController.download);

module.exports = router;
