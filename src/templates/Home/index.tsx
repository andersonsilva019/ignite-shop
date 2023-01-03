import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { HomeProps } from '../../pages';

import * as S from './styles'

export function HomePage({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <S.HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => (
        <S.Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageUrl} width={520} height={480} alt="" />
          <footer>
            <strong>{product.name}</strong>
            <span>{Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(product.price)}</span>
          </footer>
        </S.Product>
      ))}
    </S.HomeContainer>
  )
}