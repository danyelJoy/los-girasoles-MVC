var express = require('express');
var router = express.Router();
var productoController = require('../controllers/productos');

router.get('/', productoController.producto_list);
router.get('/create', productoController.producto_create_get);
router.post('/create', productoController.producto_create_post);
router.get('/:id/update', productoController.producto_update_get);
router.post('/:id/update', productoController.producto_update_post);
router.post('/:id/delete', productoController.producto_delete_post);



module.exports = router;