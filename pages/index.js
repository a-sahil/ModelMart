import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const models = {
  textModels: [
    {
      id: 1,
      name: 'LLaMA 3.2 1B',
      category: 'Text Generation',
      description: 'Compact model for general-purpose NLP tasks',
      price: '0.05 ETH',
      features: ['General NLP', 'Text Generation', 'Compact Size'],
      performance: 'Fast inference on consumer hardware',
    },
    {
      id: 2,
      name: 'LLaMA 3.2 3B',
      category: 'Text Generation',
      description: 'Enhanced capacity for complex language tasks',
      price: '0.08 ETH',
      features: ['Enhanced NLP', 'Complex Tasks', 'Larger Capacity'],
      performance: 'Balanced speed and capability',
    },
    {
      id: 3,
      name: 'Hymba-1.5B-Instruct',
      category: 'Text Instruction',
      description: 'NVIDIA’s optimized model for instruction tasks',
      price: '0.06 ETH',
      features: ['Instruction Tuned', 'NVIDIA Optimized', 'Efficient'],
      performance: 'Optimized for instruction following',
    },
  ],
  imageModels: [
    {
      id: 4,
      name: 'Dreamlike Photoreal 2.0',
      category: 'Image Generation',
      description: 'Photorealistic image generation with varied aspect ratios',
      price: '0.12 ETH',
      features: ['Photorealistic', 'Multiple Aspects', 'High Quality'],
      performance: 'Best for professional photo generation',
    },
    {
      id: 5,
      name: 'Waifu Diffusion',
      category: 'Image Generation',
      description: 'Specialized anime-style image generation',
      price: '0.09 ETH',
      features: ['Anime Style', 'Character Focus', 'Style Consistency'],
      performance: 'Optimized for anime art creation',
    },
  ],
};

// Landing Page Component
const LandingPage = ({ onLaunch }) => (
  <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="relative z-10 text-center px-4">
        <div className="space-y-6">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            ModelMart
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

// Marketplace Page Component
const MarketplacePage = ({ walletAddress, setWalletAddress }) => {
  const [selectedModel, setSelectedModel] = useState(null);

  const handleModelSelection = (model) => {
    setSelectedModel(model);
    alert(`You selected: ${model.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">ModelMart</h1>
          <WalletConnect onWalletConnected={setWalletAddress} />
        </div>

        <h2 className="text-2xl font-bold mb-6">Text Models</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {models.textModels.map((model) => (
            <Card key={model.id} className="bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold mt-4">{model.name}</CardTitle>
                <CardDescription>{model.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{model.description}</p>
                <ul className="text-sm text-gray-300 mt-2">
                  {model.features.map((feature, index) => (
                    <li key={index} className="list-disc ml-4">
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm mt-2">Performance: {model.performance}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">{model.price}</span>
                <Button
                  onClick={() => handleModelSelection(model)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Select
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="my-12"></div> {/* Added spacing between sections */}

        <h2 className="text-2xl font-bold mb-6">Image Models</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.imageModels.map((model) => (
            <Card key={model.id} className="bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold mt-4">{model.name}</CardTitle>
                <CardDescription>{model.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{model.description}</p>
                <ul className="text-sm text-gray-300 mt-2">
                  {model.features.map((feature, index) => (
                    <li key={index} className="list-disc ml-4">
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm mt-2">Performance: {model.performance}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">{model.price}</span>
                <Button
                  onClick={() => handleModelSelection(model)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Select
                </Button>
              </CardFooter>
            </Card>
          ))}
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

export default AIMarketplace;
