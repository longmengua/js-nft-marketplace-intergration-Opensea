import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MetamaskWalletProvider } from '../src/providers/wallet/metamask'

function MyApp({ Component, pageProps }: AppProps) {
  return <MetamaskWalletProvider>
    <Component {...pageProps} />
  </MetamaskWalletProvider>
}

export default MyApp
