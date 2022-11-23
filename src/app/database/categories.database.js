const { Category } = require('../../../models');

const create = async function (categoryBody) {
    try {
        const category = await Category.create(categoryBody);
        return category
    } catch(err) {
        return err;
    }
}

const getOne = async function(id) {
    try {
        const category = Category.findOne({ where: { id }});
        return category;
    } catch(err) {
        return err;
    }
}

const getAll = async function() {
    try {
        const categories = Category.findAll();
        return categories;
    } catch(err) {
        return err;
    }
}

const remove = async function(id) {
    try {
        const category = await Category.findOne({ where: { id }})
        if (category == null) {
            return category
        }
        category.destroy();
        return category;
    } catch(err) {
        return err;
    }
}

const update = async function(id, categoryBody) {
    try {
        const category = await Category.findOne({ where: { id }})
        if (category == null) {
            return category
        }
        category.update(categoryBody);
        return category;
    } catch(err) {
        return err;
    }
}


module.exports = {
    create,
    getOne,
    getAll,
    remove,
    update
};