const { getUsersCollection } = require("../db/mongoDB");

async function handleGetAllUsers (req, res) {
    // const applicant = req.user;
    // console.log(applicant);
    // if (applicant?.email != 'megamart@gmail.com') {
    //     res.status(403).send('Forbidden Access!!');
    // }
    const result = await getUsersCollection().find().toArray();
    res.send(result);
}

async function handleGetUser(req, res) {
    const email = req.params.email;
    const user = await getUsersCollection().findOne({email});
    res.send(user);
}

async function handleSetUser(req, res) {
    const user = req.body;
    const result = await getUsersCollection().insertOne(user);
    res.send(result);
}

async function handleUpdateUser(req, res) {
    const email = req.params.email;
    const updatedDoc = {
        $set: {
            ...req.body
        }
    }
    const result = await getUsersCollection().updateOne({email}, updatedDoc);
    res.send(result);
}

async function handleDelete(req, res) {
    const email = req.params.email;
    const result = await getUsersCollection().deleteOne({email});
    res.send(result);
}

module.exports = {
    handleGetAllUsers,
    handleSetUser,
    handleGetUser,
    handleUpdateUser,
    handleDelete,
}