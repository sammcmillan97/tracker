const { User } = require('../../../models')

const create = async function(userBody) {
    try {
        const user = await User.create(userBody);
        return user
    } catch(err) {
        return err;
    }
}

const read = async function(id) {
    try {
        const user = await User.findOne({
            where: { id }
        })
        return user
    } catch(err) {
        return err;
    }
}

module.exports = {
    create,
    read
};

