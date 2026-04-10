const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
{
  invoiceNumber: String,

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  totalAmount: Number,
  discount: { type: Number, default: 0 },
  taxAmount: Number,
  finalAmount: Number,

  receivedAmount: Number,
  changeAmount: Number,

  paymentMethod: {
    type: String,
    enum: ["cash", "card", "upi"],
    required: true
  },

  billStatus: {
    type: String,
    enum: ["completed", "cancelled"],
    default: "completed"
  },

  billDate: Date
},
{ timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);