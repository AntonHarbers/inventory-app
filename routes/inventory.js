var express = require('express');
var router = express.Router();

const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

// Home page Route
router.get('/', item_controller.index);

// GET AND POST for creating item
router.get('/item/create', item_controller.item_create_get);
router.post('/item/create', item_controller.item_create_post);

// GET AND POST for deleting specific item
router.get('/item/:id/delete', item_controller.item_delete_get);
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET AND POST for updating specific item
router.get('/item/:id/update', item_controller.item_update_get);
router.post('/item/:id/update', item_controller.item_update_post);

// GET specific item details
router.get('/item/:id', item_controller.item_detail);

// GET list of all items
router.get('/items', item_controller.item_list);

// GET AND POST for creating category
router.get('/category/create', category_controller.category_create_get);
router.post('/category/create', category_controller.category_create_post);

// GET AND POST for deleting specific category
router.get('/category/:id/delete', category_controller.category_delete_get);
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET AND POST for updating specific category
router.get('/category/:id/update', category_controller.category_update_get);
router.post('/category/:id/update', category_controller.category_update_post);

// GET specific category details
router.get('/category/:id', category_controller.category_detail);

// GET list of all categories
router.get('/categories', category_controller.category_list);

module.exports = router;
