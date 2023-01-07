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
    
    const response = await api.post('/create-checkout-session', {
      priceId,
      quantity
    })

    return response.data
  }
}