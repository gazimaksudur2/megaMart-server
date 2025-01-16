const { client } = require("../db/mongoDB");

const ordersCollection = client.db("megaMart").collection("orders");

function generateOrderID() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Possible characters
  let orderID = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    orderID += chars[randomIndex];
  }
}

async function handleGetOrder(req, res) {
  const orders = await ordersCollection.find().toArray();
  res.json(orders);
}
async function handlePostOrder(req, res) {
  let orderID;
  while (true) {
    orderID = generateOrderID();
    const demo_res = await ordersCollection.findOne({ orderID });
    if (demo_res == null) break;
  }
  // console.log(req.body);
  console.log({
    orderID,
    order_type: "platform_order",
    amount: req.body.amount,
    sender: req.body.delivery_mail,
    phone: req.body.delivery_phone,
    receiver: "seller@gmail.com",
    address: req.body.delivery_address,
    orderedAt: req.body.orderedAt,
    order_status: "pending",
  });
  // const result = await ordersCollection.insertOne({
  //   orderID,
  //   order_type: "platform_order",
  //   amount: req.body.amount,
  //   sender: req.body.delivery_mail,
  //   phone: req.body.delivery_phone,
  //   receiver: 'seller@gmail.com',
  //   address: req.body.delivery_address,
  //   orderedAt: req.body.orderedAt,
  //   order_status: "pending",
  // });
  // const user = await usersCollection.findOne({
  //   "accountInfo.account_no": req.body.account_no,
  // });
  // const result2 = await usersCollection.updateOne(
  //   { "accountInfo.account_no": req.body.account_no },
  //   {
  //     $set: {
  //       accountInfo: {
  //         ...user?.accountInfo,
  //         balance: parseFloat(
  //           parseFloat(user?.accountInfo.balance) +
  //             parseFloat(req.body.amount)
  //         ),
  //       },
  //     },
  //   }
  // );
  // res.send(result);
  res.send(req.body);
}

module.exports = {
  handlePostOrder,
  handleGetOrder,
};
