import { api } from "./axios"

type createCheckoutSessionParams = {
  priceId: string,
  quantity: number
}

type createCheckoutSessionReturnType = {
  checkout_url: string
}

export const StripeServices = {
  async createCheckoutSession({
    priceId,
    quantity
  }: createCheckoutSessionParams): Promise<createCheckoutSessionReturnType> {
    try {

      if (!priceId) throw new Error('Price ID is required')

      if (!quantity) throw new Error('Quantity is required')

      const response = await api.post('/create-checkout-session', {
        priceId,
        quantity
      })

      return response.data

    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}