import { NextApiRequest, NextApiResponse } from "next";
import mongoose from 'mongoose'
import MoreAccessedModel from '../../schemas/more-accessed-products'

enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    try {
      const { quantity } = req.query

      if(!quantity) {
        return res.status(400).json({ success: false, error: 'Quantity is required' })
      }

      await mongoose.connect(process.env.NEXT_MONGO_URI as string, {
        dbName: process.env.NEXT_MONGO_DATABASE,
      })

      const productsMoreAccessed = await MoreAccessedModel.find({})
        .sort({ timesAccessed: SORT_ORDER.DESC })
        .limit(Number(quantity))
        .exec()

      return res.status(200).json({ success: true, productsMoreAccessed })
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message })
    }
  }
}