require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: ["http://localhost:8000", "http://localhost:8081", "https://cardist-backend.azurewebsites.net", "https://cardist.azurewebsites.net", "https://checkout.stripe.com"],
  //preflightContinue: true,
  //allowedHeaders: ['Content-Type, Authorization']
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const db = require("./app/models");

db.sequelize.sync()

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Base API route.
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Cardist backend application." });
});

require("./app/routes/cart.routes")(app);
require("./app/routes/cartItem.routes")(app);
require("./app/routes/comment.routes")(app);
require("./app/routes/item.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/orderItem.routes")(app);
require("./app/routes/tag.routes")(app);
require("./app/routes/itemTag.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/banner.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});