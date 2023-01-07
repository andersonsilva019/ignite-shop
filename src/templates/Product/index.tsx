import Image from 'next/image'
import { StripeServices } from '../../services/StripeServices'

import * as S from './styles'

type ProductProps = {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: string
    defaultPriceId: string
  }
}

export function ProductPage({ product }: ProductProps){

  const handleBuyProduct = async () => {
    try {
      
      const url = await StripeServices.createCheckoutSession({
        priceId: product.defaultPriceId,
        quantity: 1
      })

      window.location.href = url.checkout_url;

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <S.ProductContainer>
      <S.ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480}/>
      </S.ImageContainer>
      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button onClick={handleBuyProduct}>Comprar agora</button>
      </S.ProductDetails>
    </S.ProductContainer>
  )
}