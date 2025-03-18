"use client";

import { useState, useEffect } from "react";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  EyeIcon,
  EyeOffIcon,
  TrashIcon,
  ChevronDownIcon,
  Copy,
  Moon,
  Sun,
} from "lucide-react";
import { toast } from "sonner";

// Add Google Fonts import for DM Sans
import { DM_Sans } from "next/font/google";

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

interface WalletData {
  id: string;
  publicKey: string;
  privateKey: string;
  mnemonic: string;
}

export default function Kosh() {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [showPrivateKeys, setShowPrivateKeys] = useState<
    Record<string, boolean>
  >({});
  const [showMnemonics, setShowMnemonics] = useState<Record<string, boolean>>(
    {}
  );
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Set dark theme on initial load
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const generateWallet = () => {
    try {
      // If mnemonic is empty, generate one
      const phrase = mnemonic.trim() ? mnemonic : bip39.generateMnemonic();

      if (!bip39.validateMnemonic(phrase)) {
        toast.error("Invalid mnemonic phrase");
        return;
      }

      const seed = bip39.mnemonicToSeedSync(phrase);
      const path = "m/44'/501'/0'/0'";
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const keypair = Keypair.fromSeed(derivedSeed);

      const walletId = Date.now().toString();

      setWallets((prev) => [
        ...prev,
        {
          id: walletId,
          publicKey: keypair.publicKey.toBase58(),
          privateKey: Buffer.from(keypair.secretKey).toString("hex"),
          mnemonic: phrase,
        },
      ]);

      // Clear input if it was a new generation
      if (!mnemonic.trim()) {
        setMnemonic(phrase);
      }

      toast.success("Wallet generated successfully!");
    } catch (err) {
      console.error(err); // Using the err variable to fix ESLint error
      toast.error("Failed to generate wallet");
    }
  };

  const removeWallet = (id: string) => {
    setWallets((prev) => prev.filter((wallet) => wallet.id !== id));
  };

  const clearAllWallets = () => {
    setWallets([]);
    setMnemonic("");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const togglePrivateKey = (id: string) => {
    setShowPrivateKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleMnemonic = (id: string) => {
    setShowMnemonics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  };

  return (
    <div
      className={`${dmSans.variable} font-sans container mx-auto px-4 py-6 dark:bg-black min-h-screen`}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="fixed top-0 w-full h-16 flex justify-center items-center backdrop-blur-sm bg-white/80 dark:bg-black/80 z-10 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-4xl font-bold dark:text-white tracking-tight">
            Financial Fun House
          </h1>
        </div>
        <div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      <Card className="mb-8 dark:bg-gray-900 dark:border-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="dark:text-white">Generate New Wallet</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Enter a secret phrase or leave blank to generate a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg"
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
              placeholder="Enter your secret phrase (or leave blank to generate)"
            />
            <Button
              className="dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg"
              onClick={generateWallet}
            >
              Add Wallet
            </Button>
          </div>
        </CardContent>
      </Card>

      <Collapsible className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-white">
            Current Secret Phrase
          </h2>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="dark:text-gray-400 dark:hover:text-white"
            >
              <ChevronDownIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <Card className="mt-2 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
            <CardContent className="pt-4">
              <p className="font-mono dark:text-gray-300">{mnemonic}</p>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Vault</h2>
        <Button
          variant="destructive"
          onClick={clearAllWallets}
          disabled={wallets.length === 0}
          className="rounded-lg"
        >
          Clear Wallets
        </Button>
      </div>

      {wallets.length === 0 ? (
        <Card className="dark:bg-gray-900 dark:border-gray-800 shadow-md">
          <CardContent className="p-8 text-center text-muted-foreground">
            No wallets generated yet. Add a wallet to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {wallets.map((wallet, index) => (
            <Card
              key={wallet.id}
              className="dark:bg-gray-900 dark:border-gray-800 shadow-md transition-all hover:shadow-lg"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="dark:text-white">
                    Wallet {index + 1}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="dark:text-gray-400 dark:hover:text-white rounded-full"
                    onClick={() => removeWallet(wallet.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete wallet</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium dark:text-gray-300">
                      Public Key
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="dark:text-gray-400 dark:hover:text-white"
                      onClick={() =>
                        copyToClipboard(wallet.publicKey, "Public Key")
                      }
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="p-2 bg-muted rounded-md font-mono text-xs break-all dark:bg-gray-800 dark:text-gray-300">
                    {wallet.publicKey}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium dark:text-gray-300">
                      Private Key
                    </span>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="dark:text-gray-400 dark:hover:text-white"
                        onClick={() => togglePrivateKey(wallet.id)}
                      >
                        {showPrivateKeys[wallet.id] ? (
                          <EyeOffIcon className="h-3 w-3" />
                        ) : (
                          <EyeIcon className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="dark:text-gray-400 dark:hover:text-white"
                        onClick={() =>
                          copyToClipboard(wallet.privateKey, "Private Key")
                        }
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 bg-muted rounded-md font-mono text-xs break-all dark:bg-gray-800 dark:text-gray-300">
                    {showPrivateKeys[wallet.id]
                      ? wallet.privateKey
                      : "•".repeat(64)}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium dark:text-gray-300">
                      Secret Phrase
                    </span>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="dark:text-gray-400 dark:hover:text-white"
                        onClick={() => toggleMnemonic(wallet.id)}
                      >
                        {showMnemonics[wallet.id] ? (
                          <EyeOffIcon className="h-3 w-3" />
                        ) : (
                          <EyeIcon className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="dark:text-gray-400 dark:hover:text-white"
                        onClick={() =>
                          copyToClipboard(wallet.mnemonic, "Secret Phrase")
                        }
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 bg-muted rounded-md font-mono text-xs break-all dark:bg-gray-800 dark:text-gray-300">
                    {showMnemonics[wallet.id]
                      ? wallet.mnemonic
                      : "•".repeat(wallet.mnemonic.length || 48)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
