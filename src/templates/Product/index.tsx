import Image from 'next/image'
import { useEffect, useMemo } from 'react'
import { ApiServices, cancelIncrementalTimesAccessed } from '../../services/ApiServices'
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

export function ProductPage({ product }: ProductProps) {

  useEffect(() => {  
    const incrementalTimesAccessed = async () => {
      try {
        await ApiServices.incrementalTimesAccessed(product.id)
      } catch (error) {
        console.log(error)
      }
    }

    incrementalTimesAccessed()

    return () => cancelIncrementalTimesAccessed()
    
  },[product.id])

  const handleBuyProduct = async () => {
    // Adicionar uma validação para priceId e quantity
    try {

      const url = await StripeServices.createCheckoutSession({
        priceId: product.defaultPriceId,
        quantity: 1
      })

      window.location.href = url.checkout_url;

    } catch (error) {
      // Conectar com algum serviço de monitoramento de erros (Sentry, Bugsnag, DataDog, etc)

      console.log(error)
    }
  }

  return (
    <S.ProductContainer>
      <S.ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480} />
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