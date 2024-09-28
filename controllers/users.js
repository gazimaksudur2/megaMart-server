const connectDB = require("../db/mongoDB");

async function handleGetAllUsers (req, res) {
    try {
        const db = await connectDB();
        const usersCollection = await db.collection('users');
        // const applicant = req.user;
        // console.log(applicant);
        // if (applicant?.email != 'megamart@gmail.com') {
        //     res.status(403).send('Forbidden Access!!');
        // }
        const result = await usersCollection.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.error('Error in GET Request: ',error);
        res.status(500).send('Error retrieving users')
    }
}

async function handleGetUser(req, res) {
    try {
        const db = await connectDB();
        const usersCollection = await db.collection('users');
        const email = req.params.email;
        const user = await usersCollection.findOne({email});
        res.send(user);
    } catch (error) {
        console.error('Error in GET Request: ',error);
        res.status(500).send('Error retrieving users')
    }
}

async function handleSetUser(req, res) {
    try {
        const db = await connectDB();
        const usersCollection = await db.collection('users');
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
    } catch (error) {
        console.error('Error in POST Request: ',error);
        res.status(500).send('Error creating users')
    }
}

async function handleUpdateUser(req, res) {
    try {
        const db = await connectDB();
        const usersCollection = await db.collection('users');
        const email = req.params.email;
        const updatedDoc = {
            $set: {
                ...req.body
            }
        }
        const result = await usersCollection.updateOne({email}, updatedDoc);
        res.send(result);
    } catch (error) {
        console.error('Error in PATCH Request: ',error);
        res.status(500).send('Error updating users')
    }
}

async function handleDelete(req, res) {
    try {
        const db = await connectDB();
        const usersCollection = await db.collection('users');
        const email = req.params.email;
        const result = await usersCollection.deleteOne({email});
        res.send(result);
    } catch (error) {
        console.error('Error in DELETE Request: ',error);
        res.status(500).send('Error deleting users')
    }
}

module.exports = {
    handleGetAllUsers,
    handleSetUser,
    handleGetUser,
    handleUpdateUser,
    handleDelete,
}