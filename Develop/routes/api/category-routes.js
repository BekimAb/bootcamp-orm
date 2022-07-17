const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes:[
      'id',
      'category_name'
    ],
    include:[Product]
  })
  .then(dbCategoryData =>res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// if you wanted to find the category with the id of 3 your route would be /api/categories/3
// the :id lets the server file know that a "dynamic id" will be put in its place...its acting as a placeholder
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where:{
      id:req.params.id
    },
    include:[
      {
        model:Product,
        attributes:['id','product_name','price','stock','category_id'],
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,
  {
    where:{
      id:req.params.id
    }
  })
  .then(dbCategoryData =>{
    if (!dbCategoryData){
      res.status(404).json({message:'category not found'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(dbCategoryData =>{
    if (!dbCategoryData){
      res.status(404).json({message:'category not found'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
