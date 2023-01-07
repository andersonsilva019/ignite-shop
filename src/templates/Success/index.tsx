import Link from 'next/link'

import * as S from './styles'

type OrderSuccessProps = {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  }
}

export function SuccessPage({ customerName, product }: OrderSuccessProps) {
  return (
    <S.SuccessContainer>
      <h1>Compra efetuada</h1>

      <S.ImageContainer>
        <img src={product.imageUrl} alt="" width={120} height={110}/>
      </S.ImageContainer>

      <p>
        Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link href="/">
        Voltar ao catálogo
      </Link>
    </S.SuccessContainer>
  )
}