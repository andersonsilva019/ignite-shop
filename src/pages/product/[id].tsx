import mongoose from 'mongoose'
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from 'next/router'
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ProductPage } from "../../templates/Product"
import MoreAccessedModel from '../../schemas/more-accessed-products'

enum Currency {
  BRL = 'BRL',
  USD = 'USD'
}

enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc'
}

export type ProductProps = {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: string
    defaultPriceId: string
  }
}

export default function Product(props: ProductProps) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <ProductPage {...props} />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  // const response = await stripe.products.list({
  //   expand: ['data.default_price'],
  //   limit: 2
  // })

  // const paths = response.data.map(product => ({
  //   params: { id: product.id }
  // }))

  // return {
  //   paths,
  //   fallback: true
  // }

  await mongoose.connect(process.env.NEXT_MONGO_URI as string, {
    dbName: process.env.NEXT_MONGO_DATABASE,
  })

  const productsMoreAccessed = await MoreAccessedModel.find({})
    .sort({ timesAccessed: SORT_ORDER.DESC })
    .limit(2)
    .exec()

  const paths = productsMoreAccessed.map(product => ({
    params: { id: product.productId }
  }))
  
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  try {
    const product = await stripe.products.retrieve(params?.id as string, {
      expand: ['default_price']
    })

    if (!product.active) {
      console.log(`Product ${product.id} is not active`)
      return {
        notFound: true
      }
    }

    const price = product.default_price as Stripe.Price

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: Currency.BRL
    }).format(price.unit_amount ? price.unit_amount / 100 : 0)

    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          imageUrl: product.images[0],
          price: formattedPrice,
          defaultPriceId: price.id
        }
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