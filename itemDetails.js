const { database } = require('./mongoclient')

// To dispaly/fetch Item List.
exports.list = async (database) => {
    let collection = await database.collection('Item');
    let result = await collection.find({}).toArray()

    if (result.length == 0) {
        return "No Items Available";
    }

    return new Promise((resolve, reject) => resolve(result));
}

// To dispaly/fetch Item by Id.
exports.show = async (database, id) => {

    // Initlizating the Item from database.
    // Get Item data by Id from database
    // returning error message if data not available.
    // return the response as Item.

    let collection = await database.collection('Item');

    // logics
    let result = await collection.findOne({ "_id": Number(id) });
    if (result == null) {
        return "No Item Available";
    }
    return new Promise((resolve, reject) => resolve(result));
}

exports.create = async (database, request) => {

    // Initlizating the Item from database.
    // Validate Name - should allow only alpha numeric (allows chars _-' ').

    const item = JSON.parse(JSON.stringify(request.body));

    // logic
    if (item.Name == "") {
        return "Please Enter Valid Name";
    }
    if (item) {
        const collection = await database.collection('Item');
        let result = await collection.insertOne(item);
        return new Promise((resolve, reject) => resolve(item));
    } else {
        return new Promise((resolve, reject) => reject('Invalid Item Details'));
    }
}

exports.update = async (database, request) => {   
    const itemId = request.params.id; 
    if (itemId) {
        const item = JSON.parse(JSON.stringify(request.body));
        const collection = await database.collection('Item');
        const filter = { _id: Number(itemId) };
        const result = await collection.updateOne(filter, { $set: item });       
        return new Promise((resolve, reject) => resolve('Item record updated successfully'));
    } else {
        return new Promise((resolve, reject) => reject('Item not found'));
    }
}

exports.delete = async function deleteItem(database, id) {
    const collection = database.collection('Item');
    return await collection.deleteOne({ _id: Number(id) });
}