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
  path: string; // Added path to store the derivation path
}

export default function hdWallet() {
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

      // Calculate the next index based on existing wallets with the same mnemonic
      const existingWalletsWithSameMnemonic = wallets.filter(
        (w) => w.mnemonic === phrase
      );
      const nextIndex = existingWalletsWithSameMnemonic.length;

      // Create a unique path for this wallet using the index
      const path = `m/44'/501'/${nextIndex}'/0'`;

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
          path: path, // Store the path used
        },
      ]);

      // Clear input if it was a new generation
      if (!mnemonic.trim()) {
        setMnemonic(phrase);
      }

      toast.success("Wallet generated successfully!");
    } catch (err) {
      console.error(err);
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
    <div className={`${dmSans.variable} font-sans min-h-screen dark:bg-black`}>
      {/* Header with responsive padding and sizing */}
      <div className="fixed top-0 w-full h-16 md:h-20 flex flex-col justify-center items-center backdrop-blur-sm bg-white/80 dark:bg-black/80 z-10 border-b border-gray-200 dark:border-gray-800 px-4 py-2">
        <div className="w-full flex justify-center items-center relative">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold dark:text-white tracking-tight text-center px-8">
            Hierarchical Deterministic Wallet
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="absolute right-0 rounded-full"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Main container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 pt-24 pb-8">
        <Card className="mb-8 dark:bg-black dark:border-gray-800 shadow-md">
          <CardHeader>
            <CardTitle className="dark:text-white text-xl md:text-2xl">
              Generate New Wallet
            </CardTitle>
            <CardDescription className="dark:text-gray-400 text-sm md:text-base">
              Enter a secret phrase or leave blank to generate a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:space-x-2">
              <Input
                className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="Enter your secret phrase (or leave blank to generate)"
              />
              <Button
                className="cursor-pointer dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg w-full sm:w-auto"
                onClick={generateWallet}
              >
                Add Wallet
              </Button>
            </div>
          </CardContent>
        </Card>

        <Collapsible className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold dark:text-white">
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
              <CardContent className="pt-4 overflow-x-auto">
                <p className="font-mono dark:text-gray-300 text-xs sm:text-sm break-all">
                  {mnemonic}
                </p>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold dark:text-white">
            Vault
          </h2>
          <Button
            variant="destructive"
            onClick={clearAllWallets}
            disabled={wallets.length === 0}
            className="cursor-pointer rounded-md text-xs sm:text-sm"
            size="sm"
          >
            Clear Wallets
          </Button>
        </div>

        {wallets.length === 0 ? (
          <Card className="dark:bg-black dark:border-gray-800 shadow-md">
            <CardContent className="p-8 text-center text-muted-foreground">
              No wallets generated yet. Add a wallet to get started.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wallets.map((wallet, index) => (
              <Card
                key={wallet.id}
                className="dark:bg-black dark:border-gray-800 shadow-md transition-all hover:shadow-lg"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="dark:text-white text-lg">
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
                    <div className="flex flex-wrap justify-between mb-1 gap-2">
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
                    <div className="p-2 bg-muted rounded-md font-mono text-xs break-all dark:bg-gray-800 dark:text-gray-300 overflow-x-auto">
                      {wallet.publicKey}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between mb-1 gap-2">
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
                          <span className="sr-only">
                            {showPrivateKeys[wallet.id] ? "Hide" : "Show"}{" "}
                            private key
                          </span>
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
                    <div className="p-2 bg-muted rounded-md font-mono text-xs break-all dark:bg-gray-800 dark:text-gray-300 overflow-x-auto">
                      {showPrivateKeys[wallet.id]
                        ? wallet.privateKey
                        : "•".repeat(
                            Math.min(
                              64,
                              Math.max(20, window?.innerWidth / 16 || 40)
                            )
                          )}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between mb-1 gap-2">
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
                          <span className="sr-only">
                            {showMnemonics[wallet.id] ? "Hide" : "Show"} secret
                            phrase
                          </span>
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
                    <div className="p-2 bg-muted rounded-md font-mono text-xs break-all dark:bg-gray-800 dark:text-gray-300 overflow-x-auto">
                      {showMnemonics[wallet.id]
                        ? wallet.mnemonic
                        : "•".repeat(
                            Math.min(
                              wallet.mnemonic.length || 48,
                              Math.max(24, window?.innerWidth / 16 || 30)
                            )
                          )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
