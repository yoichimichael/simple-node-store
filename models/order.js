const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [{
    product: { 
      type: {
        title: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          require: true
        },
        description: {
          type: String,
          required: true
        },
        imageUrl: {
          type: String,
          required: true
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        }
      }, 
      require: true 
    },
    quantity: { type: Number, required: true}
  }],
  user: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
})

module.exports = mongoose.model('Order', orderSchema);