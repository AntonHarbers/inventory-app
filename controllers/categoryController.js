const Category = require('../models/category');
const Item = require('../models/item');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

require('dotenv').config();

exports.category_detail = [
  asyncHandler(async (req, res, next) => {
    const [category, allItemsInCategory] = await Promise.all([
      Category.findById(req.params.id).exec(),
      Item.find({ category: req.params.id }).sort({ name: 1 }).exec(),
    ]);

    if (category === null) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }

    res.render('category_detail', {
      title: 'Category Details',
      category: category,
      category_items: allItemsInCategory,
    });
  }),
];

exports.category_list = [
  asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}).sort({ name: 1 }).exec();

    res.render('category_list', {
      title: 'All Categories',
      category_list: allCategories,
    });
  }),
];

exports.category_create_get = (req, res, next) => {
  res.render('category_form', {
    title: 'Create new Category',
  });
};

exports.category_create_post = [
  body('name', 'Name can not be empty').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description can not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create new Category',
        errors: errors,
      });
      return;
    } else {
      const category = new Category({
        name: req.body.name,
        description: req.body.description,
      });

      await category.save();
      res.redirect(category.url);
    }
  }),
];

exports.category_update_get = [
  asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();

    if (category === null) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }

    res.render('category_form', {
      title: 'Update Category',
      category: category,
    });
  }),
];

exports.category_update_post = [
  body('name', 'Name cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description cannot be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('pass', 'Incorrect Admin Password')
    .equals(process.env.ADMINPASS)
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Update Category',
        category: category,
        errors: errors.errors,
      });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {}
      );

      res.redirect(updatedCategory.url);
    }
  }),
];

exports.category_delete_get = [
  asyncHandler(async (req, res, next) => {
    const [category, categoryItems] = await Promise.all([
      Category.findById(req.params.id).exec(),
      Item.find({ category: req.params.id }).sort({ name: 1 }).exec(),
    ]);
    if (category === null) {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }

    res.render('category_delete', {
      title: 'Delete Category',
      category: category,
      category_items: categoryItems,
    });
  }),
];

exports.category_delete_post = [
  body('pass', 'Incorrect Admin Password')
    .equals(process.env.ADMINPASS)
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const category = await Category.findById(req.params.id).exec();
      categoryItems = [];

      res.render('category_delete', {
        title: 'Delete Category',
        category: category,
        category_items: categoryItems,
        errors: errors.errors,
      });
    } else {
      await Category.findByIdAndDelete(req.body.categoryid);
      res.redirect('/inventory/categories');
    }
  }),
];
