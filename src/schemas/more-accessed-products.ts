import mongoose from 'mongoose';

const { Schema } = mongoose

const moreAccessedProductSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  timesAccessed: {
    type: Number,
    required: true,
  },
})

export default mongoose.models.MoreAccessedProducts || mongoose.model('MoreAccessedProducts', moreAccessedProductSchema)