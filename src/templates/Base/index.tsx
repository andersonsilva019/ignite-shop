import Image from 'next/image'
import logo from '../../assets/logo.svg'

import * as S from './styles'

interface BaseTemplateProps {
  children: React.ReactNode
}

export function BaseTemplate({ children }: BaseTemplateProps) {
  return (
    <S.Container>
      <S.Header>
          <Image src={logo} alt="" />
      </S.Header>
      {children}
    </S.Container>
  )
}