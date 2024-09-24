const {database} = require('./mongoclient')

exports.list = async (database) => {
    let collection =  await database.collection('orderDetails');
    let result = await collection.find({}).toArray()

    if (result.length == 0) {
        return "No Orders Available";
    }

    return new Promise((resolve, reject) => resolve(result));
}

exports.show = async (database, id) => {
    console.log(id, typeof id)
    let collection =  await database.collection('orderDetails');
    let result = await collection.findOne({"_id": Number(id)});

    if (result == null) {
        return "No Order Available";
    }

    return new Promise((resolve, reject) => resolve(result));
}

exports.create = async (database, request) => {
    const itemOrderDetails = JSON.parse(JSON.stringify(request.body));
    if (itemOrderDetails) {
        const collection = await database.collection('orderDetails');
        let result = await collection.insertOne(itemOrderDetails);
        return new Promise((resolve, reject) => resolve(itemOrderDetails));
    } else {
        return new Promise((resolve, reject) => reject('Invalid Item Order Details Details'));
    }
}

exports.update = async (database, request) => {
    console.log(`${JSON.stringify(request.body)}`);
    const itemOrderDetailsId = request.params.id;
    console.log(itemOrderDetailsId);
    if (itemOrderDetailsId) {
        const itemOrderDetails = JSON.parse(JSON.stringify(request.body));
        const collection = await database.collection('orderDetails');
        const filter = { _id: Number(itemOrderDetailsId) };
        const result = await collection.updateOne(filter, { $set: itemOrderDetails });
        console.log(`${JSON.stringify(result)}`);
        return new Promise((resolve, reject) => resolve('Item Order Details record updated successfully'));
    } else {
        return new Promise((resolve, reject) => reject('Item Order Details not found'));
    }
}

exports.delete = async function deleteEmployee(database, id) {
    const collection = database.collection('orderDetails');
    return await collection.deleteOne({_id: Number(id)});
}