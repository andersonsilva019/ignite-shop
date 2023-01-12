import { GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { HomePage } from "../templates/Home";

enum Currency {
  BRL = "BRL",
  USD = "USD",
}

export interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  price: string
}

export interface HomeProps {
  products: Product[]
}

export default function Home(props: HomeProps) {
  return (
    <HomePage {...props} />
  )
}

export const getStaticProps: GetStaticProps = async () => {

  try {
    const response = await stripe.products.list({
      expand: ['data.default_price'],
      active: true,
    })

    const products = response.data.map(product => {

      const price = product.default_price as Stripe.Price

      const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: Currency.BRL
      }).format(price.unit_amount ? price.unit_amount / 100 : 0)


      return {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: formattedPrice
      }
    })

    return {
      props: {
        products
      },
      revalidate: 60 * 60 * 1 // 1 hour
    }
  } catch (error: any) {
    throw new Error(error.message)

    return {
      notFound: true
    }
  }
}