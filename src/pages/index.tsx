import { GetServerSideProps } from "next";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { HomePage } from "../templates/Home";

interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
}

export interface HomeProps {
  products: Product[]
}

export default function Home(props: HomeProps) {
  return (
    <HomePage {...props} />
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {

    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      price: price.unit_amount ? price.unit_amount / 100 : 0
    }
  })

  return {
    props: {
      products
    }
  }
}