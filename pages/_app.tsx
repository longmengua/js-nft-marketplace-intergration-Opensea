import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MetamaskWalletProvider } from '../src/providers/wallet/metamask'

function MyApp({ Component, pageProps }: AppProps) {
  return <MetamaskWalletProvider>
    <div style={{minHeight: '100vh'}}>
      <Component {...pageProps} />
    </div>
  </MetamaskWalletProvider>
}

export default MyApp
