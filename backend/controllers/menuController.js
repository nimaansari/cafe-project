const { getDatabase } = require("../models/database");

async function getMenuItems(req, res) {
    try {
        const db = getDatabase();
        const items =  await db.collection('menu').find().toArray();
        res.json(items);
    }
    catch(error) {
        res.status(505).json({ error: "Failed to load menu items"});
    }
}

module.exports = { getMenuItems };