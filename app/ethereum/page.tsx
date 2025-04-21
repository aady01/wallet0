"use client";

import { useState, useEffect } from "react";
import * as bip39 from "bip39";
import { hdkey } from "ethereumjs-wallet";
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
  ArrowLeft,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import Link from "next/link";

// Add Google Fonts import for DM Sans
import { DM_Sans } from "next/font/google";

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

interface WalletData {
  id: string;
  address: string;
  privateKey: string;
  mnemonic: string;
  path: string;
}

export default function EthWallet() {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [showPrivateKeys, setShowPrivateKeys] = useState<
    Record<string, boolean>
  >({});
  const [showMnemonics, setShowMnemonics] = useState<Record<string, boolean>>(
    {}
  );
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Safely check if we're in a browser environment
  const isBrowser = typeof window !== "undefined";

  // Modified localStorage effects with browser check
  useEffect(() => {
    if (!isBrowser) return; // Skip this effect on the server

    document.documentElement.classList.add("dark");

    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Load saved wallets from localStorage
    try {
      const savedWallets = localStorage.getItem("ethereumWallets");
      const savedMnemonic = localStorage.getItem("ethereumMnemonic");

      if (savedWallets) {
        const parsedWallets = JSON.parse(savedWallets);
        console.log("Loading saved Ethereum wallets:", parsedWallets.length);
        setWallets(parsedWallets);
      }

      if (savedMnemonic) {
        setMnemonic(savedMnemonic);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isBrowser]); // Add isBrowser to dependencies

  // Save wallets to localStorage whenever they change
  useEffect(() => {
    if (!isBrowser) return; // Skip this effect on the server

    try {
      localStorage.setItem("ethereumWallets", JSON.stringify(wallets));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [wallets, isBrowser]);

  // Save mnemonic to localStorage whenever it changes
  useEffect(() => {
    if (!isBrowser) return; // Skip this effect on the server

    try {
      localStorage.setItem("ethereumMnemonic", mnemonic);
    } catch (error) {
      console.error("Error saving mnemonic to localStorage:", error);
    }
  }, [mnemonic, isBrowser]);

  // Just below the useEffect loading block, add this debugging helper
  useEffect(() => {
    try {
      const savedWallets = localStorage.getItem("ethereumWallets");
      console.log("Debug - localStorage ethereumWallets:", savedWallets);
      console.log("Debug - Current wallets state:", wallets);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [wallets]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const generateWallet = async () => {
    try {
      // If mnemonic is empty, generate one
      const phrase = mnemonic.trim() ? mnemonic : bip39.generateMnemonic();

      if (!bip39.validateMnemonic(phrase)) {
        toast.error("Invalid mnemonic phrase");
        return;
      }

      const seed = await bip39.mnemonicToSeed(phrase);

      // Calculate the next index based on existing wallets with the same mnemonic
      const existingWalletsWithSameMnemonic = wallets.filter(
        (w) => w.mnemonic === phrase
      );
      const nextIndex = existingWalletsWithSameMnemonic.length;

      // Create a unique path for this wallet using the index
      // Ethereum uses m/44'/60'/0'/0/index
      const path = `m/44'/60'/0'/0/${nextIndex}`;

      const hdwallet = hdkey.fromMasterSeed(seed);
      const wallet = hdwallet.derivePath(path).getWallet();
      const address = `0x${wallet.getAddress().toString("hex")}`;
      const privateKey = wallet.getPrivateKey().toString("hex");

      const walletId = Date.now().toString();

      setWallets((prev) => [
        ...prev,
        {
          id: walletId,
          address: address,
          privateKey: privateKey,
          mnemonic: phrase,
          path: path,
        },
      ]);

      // Clear input if it was a new generation
      if (!mnemonic.trim()) {
        setMnemonic(phrase);
      }

      toast.success("Ethereum wallet generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate Ethereum wallet");
    }
  };

  const removeWallet = (id: string) => {
    setWallets((prev) => prev.filter((wallet) => wallet.id !== id));
  };

  const clearAllWallets = () => {
    setWallets([]);
    setMnemonic("");
    // Clear localStorage
    localStorage.removeItem("ethereumWallets");
    localStorage.removeItem("ethereumMnemonic");
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

  // Test write
  localStorage.setItem("testKey", "testValue");
  // Test read
  console.log(localStorage.getItem("testKey"));

  if (!isLoaded) {
    return <div>Loading your wallets...</div>;
  }

  return (
    <div
      className={`${dmSans.variable} font-sans min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden`}
    >
      {/* Add Toaster component */}
      <Toaster position="bottom-right" richColors closeButton />

      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAyaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 z-0 pointer-events-none"></div>

      {/* Header with responsive padding and sizing */}
      <div className="fixed top-0 w-full h-16 md:h-20 flex flex-col justify-center items-center backdrop-blur-lg bg-gradient-to-r from-white/60 via-white/50 to-white/60 dark:from-black/60 dark:via-gray-900/50 dark:to-black/60 z-10 px-4 py-2">
        <div className="w-full max-w-7xl flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 tracking-tight text-center">
            Ethereum HD Wallet
          </h1>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full border border-gray-200/70 dark:border-gray-700/70 bg-white/50 dark:bg-black/50 backdrop-blur-md hover:bg-white/80 dark:hover:bg-black/80"
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
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-16 relative z-1">
        <Card className="mb-8 bg-white/80 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white text-xl md:text-2xl">
              Generate New Ethereum Wallet
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              Enter a secret phrase or leave blank to generate a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:space-x-2">
              <Input
                className="flex-1 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-md"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="Enter your secret phrase (or leave blank to generate)"
              />
              <Button
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md w-full sm:w-auto transition-colors"
                onClick={generateWallet}
              >
                Generate Wallet
              </Button>
            </div>
          </CardContent>
        </Card>

        <Collapsible className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Current Secret Phrase
            </h2>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <ChevronDownIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <Card className="mt-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-sm">
              <CardContent className="pt-4 overflow-x-auto">
                <p className="font-mono text-gray-800 dark:text-gray-300 text-xs sm:text-sm break-all">
                  {mnemonic}
                </p>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Your Ethereum Wallets
          </h2>
          <Button
            variant="destructive"
            onClick={clearAllWallets}
            disabled={wallets.length === 0}
            className="cursor-pointer bg-red-500/80 hover:bg-red-600 text-white rounded-md text-xs sm:text-sm"
            size="sm"
          >
            Clear All
          </Button>
        </div>

        {wallets.length === 0 ? (
          <Card className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-12 text-center text-gray-500 dark:text-gray-400">
              No Ethereum wallets generated yet. Add a wallet to get started.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wallets.map((wallet, index) => (
              <Card
                key={wallet.id}
                className="bg-white/70 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-sm transition-all hover:shadow-md"
              >
                <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-gray-900 dark:text-white text-lg flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Wallet {index + 1}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded-full"
                      onClick={() => removeWallet(wallet.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete wallet</span>
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Path: {wallet.path}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div>
                    <div className="flex flex-wrap justify-between mb-1 gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ethereum Address
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 h-6 px-2"
                        onClick={() =>
                          copyToClipboard(wallet.address, "Ethereum Address")
                        }
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-black/50 rounded-md font-mono text-xs break-all text-gray-800 dark:text-gray-300 overflow-x-auto border border-gray-100 dark:border-gray-800">
                      {wallet.address}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between mb-1 gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Private Key
                      </span>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 h-6 px-2"
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
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 h-6 px-2"
                          onClick={() =>
                            copyToClipboard(wallet.privateKey, "Private Key")
                          }
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-black/50 rounded-md font-mono text-xs break-all text-gray-800 dark:text-gray-300 overflow-x-auto border border-gray-100 dark:border-gray-800">
                      {showPrivateKeys[wallet.id]
                        ? wallet.privateKey
                        : "•".repeat(
                            Math.min(64, Math.max(20, windowWidth / 16 || 40))
                          )}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between mb-1 gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Secret Phrase
                      </span>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 h-6 px-2"
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
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 h-6 px-2"
                          onClick={() =>
                            copyToClipboard(wallet.mnemonic, "Secret Phrase")
                          }
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-black/50 rounded-md font-mono text-xs break-all text-gray-800 dark:text-gray-300 overflow-x-auto border border-gray-100 dark:border-gray-800">
                      {showMnemonics[wallet.id]
                        ? wallet.mnemonic
                        : "•".repeat(
                            Math.min(
                              wallet.mnemonic.length || 48,
                              Math.max(24, windowWidth / 16 || 30)
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

      {/* Footer */}
      <div className="absolute bottom-0 w-full py-4 text-center text-gray-500 dark:text-gray-400 text-sm backdrop-blur-sm bg-white/30 dark:bg-black/30 border-t border-gray-200 dark:border-gray-800">
        Secure, client-side Ethereum wallet generation • Data stored only in
        your browser
      </div>
    </div>
  );
}
