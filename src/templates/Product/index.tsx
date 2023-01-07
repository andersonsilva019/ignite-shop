import * as S from './styles'

export function ProductPage(){
  return (
    <S.ProductContainer>
      <S.ImageContainer>

      </S.ImageContainer>
      <S.ProductDetails>
        <h1>Product Name</h1>
        <span>R$ 79,00</span>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit dicta sequi aperiam itaque reprehenderit quasi ad, nesciunt eveniet sunt corrupti vel commodi nulla facere voluptatem repellat in aliquam harum.</p>
        <button>Comprar agora</button>
      </S.ProductDetails>
    </S.ProductContainer>
  )
}