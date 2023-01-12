import { NextApiRequest, NextApiResponse } from "next";
import { captureException as SentryCaptureException } from '@sentry/nextjs'
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    try {
      const price = req.body.priceId;

      if(!price) return res.status(400).json({ error: 'Price not found' })

      const quantity = req.body.quantity;

      if(!quantity) return res.status(400).json({ error: 'Quantity not found' })

      const domainURL = process.env.NEXT_URL;

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price,
            quantity,
          },
        ],
        payment_method_types: ['card'],
        success_url: `${domainURL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/`,
      })

      if(!checkoutSession.url) return res.status(400).json({ error: 'Checkout session not found' })

      return res.status(201).json({ checkout_url: checkoutSession.url })

    } catch (error: any) {
      
      SentryCaptureException(error.message)

      return res.status(400).json({ error: error.message });
    }
  }
}