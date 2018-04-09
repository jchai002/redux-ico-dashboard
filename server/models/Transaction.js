const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  transactionId: Number,
  transactionHash: String,
  destination: String,
  amount: Number,
  confirmedBy: Array,
  executed: Boolean,
  dateSubmitted: Date,
  dateExecuted: Date
});

transactionSchema.plugin(mongoosePaginate);

mongoose.model("transactions", transactionSchema);
