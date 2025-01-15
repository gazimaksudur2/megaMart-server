const { client } = require("../db/mongoDB");

const usersCollection = client.db('megaMart').collection('users');

async function handleGetAllUsers (req, res) {
    // const applicant = req.user;
    // console.log(applicant);
    // if (applicant?.email != 'megamart@gmail.com') {
    //     res.status(403).send('Forbidden Access!!');
    // }
    const result = await usersCollection.find().toArray();
    res.send(result);
    // res.send({"result": true});
}

async function handleGetUser(req, res) {
    const email = req.params.email;
    const user = await usersCollection.findOne({email});
    res.send(user);
}

async function handleSetUser(req, res) {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result);
}

async function handleUpdateUser(req, res) {
    const email = req.params.email;
    const updatedDoc = {
        $set: {
            ...req.body
        }
    }
    const result = await usersCollection.updateOne({email}, updatedDoc);
    res.send(result);
}

async function handleDelete(req, res) {
    const email = req.params.email;
    const result = await usersCollection.deleteOne({email});
    res.send(result);
}

module.exports = {
    handleGetAllUsers,
    handleSetUser,
    handleGetUser,
    handleUpdateUser,
    handleDelete,
}