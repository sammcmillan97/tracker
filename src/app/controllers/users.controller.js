const { User } = require('../../../models')

const get = async function(req, res){
    const id = req.params.id
    try {
        const user = await User.findOne({
            where: { id }
        })
        if(user) {
            return res.status(200).send(user);
        } else {
            return res.status(404).send("User not found")
        }
    } catch {
        return res.status(500).send("Internal Server Error");
    }
}

const create = async function(req, res){
    const { email, firstName, lastName, password } = req.body
    try {
         const user = await User.create({email, firstName, lastName, password})
         return res.status(201).send(user)
    } catch(err) {
        console.log(err)
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    get,
    create
};