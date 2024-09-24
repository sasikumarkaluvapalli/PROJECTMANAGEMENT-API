const { database } = require('./mongoclient')

exports.list = async (database) => {
    let collection = await database.collection('ItemDecription');
    let result = await collection.find({}).toArray()

    if (result.length == 0) {
        return "No Description Available";
    }

    return new Promise((resolve, reject) => resolve(result));
}

exports.show = async (database, id) => {
    console.log(id, typeof id)
    let collection = await database.collection('ItemDecription');
    let result = await collection.findOne({ "_id": Number(id) });

    if (result == null) {
        return "No Descriptiohghhn ";
    }

    return new Promise((resolve, reject) => resolve(result));
}

exports.create = async (database, request) => {
    const itemDecription = JSON.parse(JSON.stringify(request.body));
    if (itemDecription) {
        const collection = await database.collection('ItemDecription');
        let result = await collection.insertOne(itemDecription);
        return new Promise((resolve, reject) => resolve(itemDecription));
    } else {
        return new Promise((resolve, reject) => reject('Invalid Item Decription Details'));
    }
}

exports.update = async (database, request) => {   
    const itemDecriptionId = request.params.id;
    if (itemDecriptionId) {
        const itemDecription = JSON.parse(JSON.stringify(request.body));
        const collection = await database.collection('ItemDecription');
        const filter = { _id: Number(itemDecriptionId) };
        const result = await collection.updateOne(filter, { $set: itemDecription });       
        return new Promise((resolve, reject) => resolve('Item Decription record updated successfully'));
    } else {
        return new Promise((resolve, reject) => reject('Item Decription not found'));
    }
}

exports.delete = async function deleteEmployee(database, id) {
    const collection = database.collection('Item Decription');
    return await collection.deleteOne({ _id: Number(id) });
}