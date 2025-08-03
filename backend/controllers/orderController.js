const { getDatabase } = require("../models/database");
async function orderMenu(req, res) {
    console.log("Order menu being reached");
    try{
        const db = getDatabase();
        const order = req.body;
        if(!order.items || order.items.length == 0) {
            return res.status(400).json({ error: "You must order to save" });
        }
        const result = await db.collection("orders").insertOne(order);
        res.status(200).json({ message: "Items ordered", OrderID: result.insertedId });
    }
    catch(error){
        res.status(500).json({ error: "Failed to place order" });
    }
}

async function orderHistory(req, res) {
    try{
        const db = getDatabase();
        const orders = await db.collection('orders').find().toArray();
        res.json(orders);
    }
    catch(error){
        res.status(500).json({ error: "Failed to get Order history" });
    }
}

module.exports = { orderMenu, orderHistory };