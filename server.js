const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const { database } = require('./mongoclient')
const itemDetails = require('./itemDetails')
const itemDecriptionDetails = require('./itemDecriptionDetails')
const orderDetails = require('./orderDetails')

const cors =require("cors")
app.use(cors());
 
 
database().then(async(database) => {
    app.use(express.json())

    // CRUD Operations of Items
    app.get('/items', async (req, res) =>  {
        const items = await itemDetails.list(database)
        res.send(items);
    })
    app.get('/item/:id', async (req, res) =>  {    
        const item = await itemDetails.show(database, req.params.id)
        res.send(item);
    })

    app.put('/item/:id', async (req, res) =>  {    
        const item = await itemDetails.update(database, req)
        res.send(item);
    })

    app.delete('/item/:id', async (req, res) =>  {  
        const item = await itemDetails.delete(database, req.params.id)
        res.send(item);
    })

    app.post('/item', async (req, res) =>  {     
        const item = await itemDetails.create(database, req)
        res.send(item);
    })

    
    // CRUD Operations of Item Description
    app.get('/itemDescriptions', async (req, res) =>  {
        const itemDecription = await itemDecriptionDetails.list(database)
        res.send(itemDecription);
    })

    app.get('/itemDescription/:id', async (req, res) =>  {
        const itemDecription = await itemDecriptionDetails.show(database, req.params.id)
        res.send(itemDecription);
    })

    app.post('/itemDescription', async (req, res) =>  {      
        const itemDecription = await itemDecriptionDetails.create(database, req)
        res.send(itemDecription);
    })

    app.put('/itemDescription/:id', async (req, res) =>  {      
        const itemDecription = await itemDecriptionDetails.update(database, req)
        res.send(itemDecription);
    })

    app.delete('/itemDescription/:id', async (req, res) =>  {
        const itemDecription = await itemDecriptionDetails.delete(database, req.params.id)
        res.send(itemDecription);
    })


    // CRUD Operations of Orders
    app.get('/orders', async (req, res) =>  {
        const order = await orderDetails.list(database)
        res.send(order);
    })

    app.get('/order/:id', async (req, res) =>  {
        const order = await orderDetails.show(database, req.params.id)
        res.send(order);
    })

    app.post('/order', async (req, res) =>  {      
        const order = await orderDetails.create(database, req)
        res.send(order);
    })

    app.put('/order/:id', async (req, res) =>  {      
        const order = await orderDetails.update(database, req)
        res.send(order);
    })

    app.delete('/order/:id', async (req, res) =>  {
        const order = await orderDetails.delete(database, req.params.id)
        res.send(order);
    })

    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
});
