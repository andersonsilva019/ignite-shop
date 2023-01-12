import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { captureException as SentryCaptureException } from '@sentry/nextjs'
import MoreAccessedModel from '../../schemas/more-accessed-products'

const INITIAL_TIMES_ACCESSED = 1

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    try {

      await mongoose.connect(process.env.NEXT_MONGO_URI as string, {
        dbName: process.env.NEXT_MONGO_DATABASE,
      })

      const { productId } = req.body

      const product = await MoreAccessedModel.findOne({ productId }).exec()

      if (!product) {

        const newProduct = { productId, timesAccessed: INITIAL_TIMES_ACCESSED }

        await MoreAccessedModel.create(newProduct)

        return res.status(200).json({ success: true, newProduct })
      }

      const productUpdated = {
        productId: product.productId,
        timesAccessed: product.timesAccessed + 1
      }

      await MoreAccessedModel.updateOne({ productId }, productUpdated).exec()

      return res.status(200).json({ success: true, productUpdated })
      
    } catch (error: any) {
      SentryCaptureException(error.message)

      return res.status(400).json({ error: error.message })
    }
  }

}