const mongoose = require("mongoose");

const SalesHistorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesHistory", SalesHistorySchema);
