import Image from 'next/image'

import camiseta1 from '../../assets/camisetas/1.png';
import camiseta2 from '../../assets/camisetas/2.png';
import camiseta3 from '../../assets/camisetas/3.png';

import * as S from './styles'

export function HomePage(){
  return (
    <S.HomeContainer>
      <S.Product>
        <Image src={camiseta1} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta ...</strong>
          <span>R$ 120,00</span>
        </footer>
      </S.Product>
      <S.Product>
        <Image src={camiseta2} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta ...</strong>
          <span>R$ 120,00</span>
        </footer>
      </S.Product>
    </S.HomeContainer>
  )
}