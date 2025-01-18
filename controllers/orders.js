const { ObjectId } = require("mongodb");
const { client } = require("../db/mongoDB");
const products = require("../routers/products");

const ordersCollection = client.db("megaMart").collection("orders");
const productsCollection = client.db("megaMart").collection("products");

// function generateOrderID() {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Possible characters
//   let orderID = "";

//   for (let i = 0; i < 10; i++) {
//     const randomIndex = Math.floor(Math.random() * chars.length);
//     orderID += chars[randomIndex];
//   }
// }

async function handleGetOrder(req, res) {
  const buyer = req.query?.buyer;
  const seller = req.query?.seller;
  let orders;
  if (buyer) {
    orders = await ordersCollection.find({ buyer }).toArray();
  } else if (seller) {
    orders = await ordersCollection.find({ seller }).toArray();
    // console.log(orders);
  } else orders = await ordersCollection.find().toArray();

  res.json(orders);
}
async function handlePostOrder(req, res) {
  let orderID;
  while (true) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Possible characters
    orderID = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      orderID += chars[randomIndex];
    }
    const demo_res = await ordersCollection.findOne({ orderID });
    if (demo_res == null) break;
  }
  const orderInfo = {
    orderID,
    order_type: "platform_order",
    total_amount: req.body.total_amount,
    buyer: req.body.delivery_mail,
    phone: req.body.delivery_phone,
    seller: "supplier@gmail.com",
    address: req.body.delivery_address,
    orderedAt: req.body.orderedAt,
    order_status: "order_placed",
    products: req.body.products,
  };
  const result = await ordersCollection.insertOne(orderInfo);
  for (const product of req.body.products || []) {
    if (!product?.productID || !product?.count) continue; // Validate product data

    await productsCollection.updateOne(
      { _id: new ObjectId(product.productID) },
      { $inc: { availableQuantity: -Math.abs(Number(product.count) || 0) } }
    );
  }

  // const result2 = await productsCollection.updateOne({_id: products})
  res.send(result);
}

async function handlePatchOrder(req, res) {
  const id = req.query?.id;
  const result = await ordersCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        order_status: req.body?.order_status,
        shippedAt: new Date(),
      },
    }
  );
  res.send(result);
}

// const order = await ordersCollection.findOne({ _id: new ObjectId(id) });
// ...order,
// ...req.body,
module.exports = {
  handlePostOrder,
  handleGetOrder,
  handlePatchOrder,
};
