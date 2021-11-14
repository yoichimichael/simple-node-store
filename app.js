// CORE MODULES
// const http = require('http'); // not needed because Express calls on the module itself
const path = require('path');

// 3RD PARTY PACKAGES

// variable 'express' is a top level function
const express = require('express');
const sequelize = require('./helpers/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
require('dotenv').config();

// DEPRECATED - urlencoded() and static() are now part of the express object
// const bodyParser = require('body-parser');

// variable 'app' can be named anything
// express() returns a top level management object
// app can be passed 
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// LOCAL ROUTE IMPORTS
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorsController = require('./controllers/errors');

/*
// example use of next()
app.use((req, res, next) => {
  console.log('In the middleware!');
  next(); // allows request to continue to next middleware
})
*/

// app.use('/', (req, res, next) => {
//   // console.log('This always runs!');
//   next();
// })

// parses ALL incoming request bodies
// automatically calls next()
app.use(express.urlencoded({extended: false}));
// instructs where to look for static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user; 
      next();
    })
    .catch(console.log);
})

app.use('/admin', adminRoutes);

app.use(shopRoutes);

// ERROR HANDLER
app.use(errorsController.getPageNotFound);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // redundant, but makes relationship clear
User.hasOne(Cart);
Cart.belongsTo(User); // also redundant, but makes relationship clear
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync({ force: true })
  // .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Yoichi', email: 'test@testing.com' });
    } 
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(console.log);

// CREATE AND START SERVER
// no longer need becuase of Express app methods
/*
const server = http.createServer(app);
server.listen(3000);
*/

// instead of the above:
// app.listen(3000);
