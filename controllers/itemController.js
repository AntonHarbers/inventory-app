const Item = require('../models/item');
const Category = require('../models/category');
const fs = require('fs');
const path = require('path');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

require('dotenv').config();

exports.index = asyncHandler(async (req, res, next) => {
  const [itemCount, categoryCount, items] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
    Item.find({}).exec(),
  ]);

  var totalValue = 0;

  items.forEach((item) => {
    totalValue += item.total_value;
  });

  res.render('index', {
    title: 'Vegan Grocer Inventory Home',
    item_count: itemCount,
    category_count: categoryCount,
    total_value: totalValue,
  });
});

exports.item_detail = [
  asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate('category').exec();
    if (item === null) {
      const err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }
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

exports.item_create_get = [
  asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}).exec();

    res.render('item_form', {
      title: 'Add new Item',
      categories: allCategories,
    });
  }),
];

exports.item_create_post = [
  body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('category', 'Category must be selected')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Price must be a positive numeric value')
    .trim()
    .isNumeric({ min: 0 })
    .escape(),
  body(
    'num_in_stock',
    'Amount of units in stock must be a positive numeric value'
  )
    .trim()
    .isNumeric({ min: 0 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}).sort({ name: 1 }).exec();

      res.render('item_form', {
        title: 'Add new Item',
        categories: allCategories,
        errors: errors,
      });
    } else {
      const item = new Item({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        num_in_stock: req.body.num_in_stock,
        imageUrl: req.file ? req.file.filename : '',
      });
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_update_get = [
  asyncHandler(async (req, res, next) => {
    const [item, allCategories] = await Promise.all([
      Item.findById(req.params.id).populate('category').exec(),
      Category.find({}).exec(),
    ]);

    if (item === null) {
      const err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }

    res.render('item_form', {
      title: 'Update Item',
      categories: allCategories,
      item: item,
    });
  }),
];

exports.item_update_post = [
  body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('category', 'Category must be selected')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Price must be a positive numeric value')
    .trim()
    .isNumeric({ min: 0 })
    .escape(),
  body(
    'num_in_stock',
    'Amount of units in stock must be a positive numeric value'
  )
    .trim()
    .isNumeric({ min: 0 })
    .escape(),
  body('pass', 'Incorrect Admin Password')
    .equals(process.env.ADMINPASS)
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      num_in_stock: req.body.num_in_stock,
      _id: req.params.id,
      imageUrl: req.body.oldimage,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}).sort('name').exec();

      if (req.file) {
        const imagePath = path.join(
          __dirname,
          '../public/uploads/',
          req.file.filename
        );
        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.log(err);
              return;
            }
          });
        }
      }
      res.render('item_form', {
        title: 'Update Item',
        categories: allCategories,
        item: item,
        errors: errors.errors,
      });
      return;
    } else {
      // Check if a new file is uploaded and an old image exists
      if (req.file && req.body.oldimage) {
        const oldImagePath = path.join(
          __dirname,
          '../public/uploads/',
          req.body.oldimage
        );
        // Delete the old image file
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            // File deleted successfully
          });
        }
      }

      const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        num_in_stock: req.body.num_in_stock,
        _id: req.params.id,
        ...(req.file && { imageUrl: req.file.filename }),
      });

      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        newItem,
        {}
      );
      res.redirect(updatedItem.url);
    }
  }),
];

exports.item_delete_get = [
  asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).exec();

    if (item === null) {
      const err = new Error('Item could not be found');
      err.status = 404;
      return next(err);
    }

    res.render('item_delete', {
      title: 'Delete Item',
      item: item,
    });
  }),
];

exports.item_delete_post = [
  body('pass', 'Incorrect Admin Password')
    .equals(process.env.ADMINPASS)
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const item = await Item.findById(req.params.id).exec();

      if (item === null) {
        const err = new Error('Item could not be found');
        err.status = 404;
        return next(err);
      }

      res.render('item_delete', {
        title: 'Delete Item',
        item: item,
        errors: errors.errors,
      });
    } else {
      if (req.body.oldimage) {
        if (req.body.oldimage == '') return;
        const oldImagePath = path.join(
          __dirname,
          '../public/uploads/',
          req.body.oldimage
        );
        // Delete the old image file
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            // File deleted successfully
          });
        }
      }
      await Item.findByIdAndDelete(req.body.itemid);
      res.redirect('/inventory/items');
    }
  }),
];
