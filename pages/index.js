import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Wallet, Package, Bot } from 'lucide-react';

// Landing Page Component
const LandingPage = ({ onLaunch }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <div className="space-y-6">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              AI Model Marketplace
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Deploy, discover, and integrate cutting-edge AI models in your applications
            </p>
            <Button 
              onClick={onLaunch}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              Launch App
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Marketplace Page Component
const MarketplacePage = ({ walletAddress, setWalletAddress }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [inferenceResult, setInferenceResult] = useState(null);

  const handleInference = async (inputData) => {
    const res = await fetch('/api/inference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ leaseId: selectedModel, inputData }),
    });

    const data = await res.json();
    setInferenceResult(data.result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">AI Marketplace</h1>
          <WalletConnect onWalletConnected={setWalletAddress} />
        </div>
      </div>
    </div>
  );
};

// Main App Component
const AIMarketplace = () => {
  const [launched, setLaunched] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  return (
    <div>
      {!launched ? (
        <LandingPage onLaunch={() => setLaunched(true)} />
      ) : (
        <MarketplacePage walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
      )}
    </div>
  );
};

// Add custom styles
const styles = `
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0px) rotate(360deg); }
  }

  .bg-grid-pattern {
    background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
`;

export default AIMarketplace;
