import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/globalStyles'
import { BaseTemplate } from '../templates/Base'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseTemplate>
      <Component {...pageProps} />
    </BaseTemplate>
  )
}
