import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    try {
      const price = req.body.priceId;
      const quantity = req.body.quantity;

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
        success_url: `${domainURL}/order/success`,
        cancel_url: `${domainURL}/`,
      })

      if(!checkoutSession.url) return res.status(400).json({ error: 'Checkout session not found' })

      return res.status(201).json({ checkout_url: checkoutSession.url })

    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}