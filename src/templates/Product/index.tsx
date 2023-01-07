import Image from 'next/image'

import * as S from './styles'

type ProductProps = {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: string
  }
}

export function ProductPage({ product }: ProductProps){
  return (
    <S.ProductContainer>
      <S.ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480}/>
      </S.ImageContainer>
      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button>Comprar agora</button>
      </S.ProductDetails>
    </S.ProductContainer>
  )
}