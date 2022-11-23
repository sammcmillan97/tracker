const { Record, User, Category } = require('../../../models')


const create = async function(req, res){
    const { userId, categoryId, description, notes, start, end, enjoyment, productivity } = req.body
    try {
        const user = await User.findOne({
            where: { id: userId }
        })
        const category = await Category.findOne({
            where: {id: categoryId}
        })

        if (user != null) {
            const record = await Record.create({ description, notes, start, end, enjoyment, productivity, userId: user.id, categoryId: category.id });
            return res.status(201).send(record)
        } else {
            return res.status(400).send("No user in the database with id:" + userId);
        }
    } catch(err) {
        console.log(err)
        return res.status(500).send("Internal Server Error");
    }
}


const readAll = async function (req, res) {
    console.log("Getting Records");
    try {
        const records = await Record.findAll();
        if (records != null) {
            return res.status(200).send(records);
        } else {
            return res.status(404).send("No Records in the database");
        }
    } catch(err) {
        console.log(err)
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { 
    create,
    readAll
};