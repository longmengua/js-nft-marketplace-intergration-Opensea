import detectEthereumProvider from '@metamask/detect-provider';
import { BigNumber, ethers } from 'ethers';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

export type Provider = Web3Provider | undefined;
export type Signer = ethers.Signer | undefined;

interface IEthereumProviderContext {
  connect(): void;
  disconnect(): void;
  provider: Provider;
  chainId: number | undefined;
  signer: Signer;
  signerAddress: string | undefined;
  providerError: string | null;
  switchNetwork(chainId: number): void;
}

interface IDetectedProvider extends ExternalProvider {
  on(event: string, value: (value: any) => void): void | PromiseLike<void>;
}

// noinspection JSUnusedLocalSymbols
const EthereumProviderContext = React.createContext<IEthereumProviderContext>({
  connect: () => undefined,
  disconnect: () => undefined,
  provider: undefined,
  chainId: undefined,
  signer: undefined,
  signerAddress: undefined,
  providerError: null,
  switchNetwork: (chainId: number) => undefined,
});
export const MetamaskWalletProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [providerError, setProviderError] = useState<string | null>(null);
  const [provider, setProvider] = useState<Provider>(undefined);
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const [signer, setSigner] = useState<Signer>(undefined);
  const [signerAddress, setSignerAddress] = useState<string | undefined>(
    undefined,
  );

  detectEthereumProvider()
    .then((detectedProvider: unknown) => {
      if (detectedProvider) {
        const walletProvider = new ethers.providers.Web3Provider(
          detectedProvider as ExternalProvider,
          `any`,
        );
        walletProvider
          .send(`eth_accounts`, [])
          .then((accounts) => {
            if (
              accounts.length &&
              !signer &&
              localStorage.getItem('disconnected') !== 'true'
            ) {
              onConnected(detectedProvider);
            }
          })
          .catch(() => {
            setProviderError(`An error occurred while activating eth accounts`);
          });
      } else {
        setProviderError(`Please install MetaMask`);
      }
    })
    .catch(() => {
      setProviderError(`Please install MetaMask`);
    });

  const connect = useCallback(() => {
    setProviderError(null);
    detectEthereumProvider()
      .then((detectedProvider) => {
        if (detectedProvider) {
          const walletProvider = new ethers.providers.Web3Provider(
            detectedProvider as ExternalProvider,
            `any`,
          );
          walletProvider
            .send(`eth_requestAccounts`, [])
            .then(() => {
              onConnected(detectedProvider);
            })
            .catch(() => {
              setProviderError(
                `An error occurred while requesting eth accounts`,
              );
            });
        } else {
          setProviderError(`Please install MetaMask`);
        }
      })
      .catch(() => {
        setProviderError(`Please install MetaMask`);
      });
  }, []);

  const onConnected = (provider: unknown) => {
    const walletProvider = new Web3Provider(
      provider as ExternalProvider,
      `any`,
    );
    setProviderError(null);
    setProvider(walletProvider);
    const walletSigner = walletProvider.getSigner();
    setSigner(walletSigner);

    walletProvider
      .getNetwork()
      .then((network) => {
        setChainId(network.chainId);
      })
      .catch(() => {
        setProviderError(`An error occurred while getting the network.`);
      });

    walletSigner
      .getAddress()
      .then((address) => {
        setSignerAddress(address);
      })
      .catch(() => {
        setProviderError(`An error occurred while getting the signer address.`);
      });

    // attach event handlers
    if (provider && (provider as IDetectedProvider)) {
      (provider as IDetectedProvider).on(`chainChanged`, (updatedChainId) => {
        try {
          setChainId(BigNumber.from(updatedChainId).toNumber());
        } catch (e) {}
      });
      (provider as IDetectedProvider).on(
        `accountsChanged`,
        (accounts: Array<string>) => {
          if (accounts.length) {
            try {
              const walletSigner2 = walletProvider.getSigner();
              setSigner(walletSigner2);
              walletSigner2
                .getAddress()
                .then((address) => {
                  setSignerAddress(address);
                })
                .catch(() => {
                  setProviderError(
                    `An error occurred while getting the signer address`,
                  );
                });
            } catch (e) {}
          } else {
            setSigner(undefined);
            setSignerAddress(undefined);
          }
        },
      );
    }

    localStorage.setItem('disconnected', 'false');
  };

  const switchNetwork = useCallback(
    (chainId: number) => {
      if (provider) {
        provider
          .send(`wallet_switchEthereumChain`, [
            { chainId: '0x' + chainId.toString(16) },
          ])
          .catch(() => {
            setProviderError(`Install Network!`);
          });
      }
    },
    [provider],
  );

  const disconnect = useCallback(() => {
    localStorage.setItem('disconnected', 'true');
    setProviderError(null);
    setProvider(undefined);
    setChainId(undefined);
    setSigner(undefined);
    setSignerAddress(undefined);
  }, []);

  const contextValue = useMemo(
    () => ({
      connect,
      disconnect,
      provider,
      chainId,
      signer,
      signerAddress,
      providerError,
      switchNetwork,
    }),
    [
      connect,
      disconnect,
      provider,
      chainId,
      signer,
      signerAddress,
      providerError,
      switchNetwork,
    ],
  );
  return (
    <EthereumProviderContext.Provider value={contextValue}>
      {children}
    </EthereumProviderContext.Provider>
  );
};
export const useMetamaskWallet = () => useContext(EthereumProviderContext);
