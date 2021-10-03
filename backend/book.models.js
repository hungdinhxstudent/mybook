let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    pages: { type: Number, required: true, min: 1 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('books', BookSchema);