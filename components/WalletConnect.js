import { useState } from 'react';
import { BrowserProvider } from 'ethers';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

const WalletConnect = ({ onWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsLoading(true);

        // Request account access via MetaMask popup
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const address = accounts[0];

        // Set the wallet address
        setWalletAddress(address);

        // Callback for the parent component
        if (onWalletConnected) {
          onWalletConnected(address);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const disconnectWallet = () => {
    // Clear the wallet address
    setWalletAddress(null);
  };

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="absolute right-10 top-6 flex items-center space-x-4">
      {walletAddress ? (
        <div className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>{truncateAddress(walletAddress)}</span>
          </div>
          <Button
            onClick={disconnectWallet}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-1 rounded-lg flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg flex items-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
