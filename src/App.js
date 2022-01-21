import './App.css';
import { Provider, chain, defaultChains } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import Nav from './components/nav';

function App() {
  

  const alchemyId = "https://eth-mainnet.alchemyapi.io/v2/L9_nj7QcxFpgM9N-6EGfuUowlpWmA9py"

  const connectors = ({ chainId }) => {
    const rpcUrl =defaultChains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0]
    return [
      new InjectedConnector({ defaultChains }),
      new WalletConnectConnector({
        options: {
          alchemyId,
          qrcode: true,
        },
      }),
    ]
  }


  return (
    <Provider autoConnect connectors={connectors}>
      <Nav>
        
      </Nav>
    </Provider>
  
  );
}




export default App;