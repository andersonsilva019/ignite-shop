import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'
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
      {products?.map(product => (
        <Link key={product.id} href={`/product/${product.id}`} passHref legacyBehavior>
          <S.Product className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </S.Product>
        </Link>
      ))}
    </S.HomeContainer>
  )
}