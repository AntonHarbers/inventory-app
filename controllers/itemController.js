const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
  const [itemCount, categoryCount] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render('index', {
    title: 'Vegan Grocer Inventory Home',
    item_count: itemCount,
    category_count: categoryCount,
  });
});

exports.item_create_get = [
  asyncHandler(async (req, res, next) => {
    res.send('Not yet implemented');
  }),
];

exports.item_create_post = [
  asyncHandler(async (req, res, next) => {
    res.send('Not yet implemented');
  }),
];

exports.item_delete_get = [
  asyncHandler(async (req, res, next) => {
    res.send('Not yet implemented');
  }),
];

exports.item_delete_post = [
  asyncHandler(async (req, res, next) => {
    res.send('Not yet implemented');
  }),
];

exports.item_update_get = [
  asyncHandler(async (req, res, next) => {
    res.send('Not yet implemented');
  }),
];

exports.item_update_post = [
  asyncHandler(async (req, res, next) => {
    res.send('Not yet implemented');
  }),
];

exports.item_detail = [
  asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate('category').exec();

    res.render('item_detail', { title: 'Item Details', item: item });
  }),
];

exports.item_list = [
  asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({})
      .sort({ title: 1 })
      .populate('category')
      .exec();

    res.render('item_list', { title: 'Item List', item_list: allItems });
  }),
];
