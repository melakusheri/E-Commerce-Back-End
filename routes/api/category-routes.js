const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');
// The `/api/categories` endpoint
// GET all tags

router.get('/', async(req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        console.log(`\n Getting all Tag data \n`)
        const categoryData = await Category.findAll({
            include: [{ model: Product }]
        })
        res.status(200).json(categoryData);

    } catch (err) {
        //console log error => 500
        res.status(500).json(err);
    }
});
router.get('/:id', async(req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Product }]
        })

        if (!categoryData) {
            res.status(404).json({ message: 'No category found with this id!' });
        } else {
            res.status(200).json(categoryData);
        }

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async(req, res) => {
    // create a new category
    try {
        console.log(`\n Adding new category: ${req.body.category_name} \n`);

        const categoryData = await Category.create(req.body);

        res.status(200).json(categoryData);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update({
            // All the fields you can update and the data attached to the request body.
            category_name: req.body.category_name,
        }, {
            // Gets the category based on the id given in the request parameters
            where: {
                id: req.params.id,
            },
        })
        .then((updatedCategory) => {
            // Sends the updated Category as a json response
            res.json(updatedCategory);
        })
        .catch((err) => res.json(err));
});

router.delete('/:id', async(req, res) => {
    // delete a category by its `id` value
    try {
        const categoryData = await Category.destroy({
            where: { id: req.params.id }
        });

        // conditional
        if (!categoryData) {
            res.status(404).json({ message: 'No category found with this id!' });
            return;
        } else {
            console.log(`\n Deleting category with id: ${req.params.id} \n`)
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;