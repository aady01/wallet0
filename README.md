# Solana HD Wallet

A secure, client-side Hierarchical Deterministic wallet generator for Solana with a clean, modern UI built with Next.js, TypeScript, and Tailwind CSS.

![Solana HD Wallet Screenshot](https://github.com/user-attachments/assets/12f93fe2-cbc7-42c4-a03e-93093e4a804e)

## Features

- **Hierarchical Deterministic Wallets**: Generate multiple wallets from a single seed phrase using derivation paths
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Secure by Design**: All cryptographic operations happen locally in your browser
- **Modern UI**: Built with DM Sans font, responsive design, and clean aesthetics
- **Multiple Wallet Management**: Generate and store multiple wallets in a session
- **Privacy Controls**: Show/hide sensitive information like private keys and mnemonics
- **Copy Functionality**: Easily copy public keys, private keys, and secret phrases to clipboard

## Getting Started

### Prerequisites

- Node.js 16.8.0 or newer
- npm or pnpm

### Installation

1. Clone the repository:
bash
git clone https://github.com/yourusername/hd-wallet.git
cd hd-wallet
2. Install dependencies:
bash
npm install
# or
pnpm install
3. Run the development server:
bash
npm run dev
# or
pnpm dev
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Generating a New Wallet

1. Leave the input field blank and click "Add Wallet" to generate a completely new wallet with a random mnemonic phrase.
2. The generated wallet will appear in the Vault section.
3. Generate additional wallets from the same mnemonic to see HD wallet functionality in action.

### Importing an Existing Wallet

1. Enter your existing 12/24-word secret phrase in the input field.
2. Click "Add Wallet" to import your wallet.
3. Your wallet details will appear in the Vault section.
4. Add multiple wallets from the same phrase to see different derivation paths.

### Managing Wallets

- **View Private Keys/Mnemonics**: Click the eye icon to toggle visibility of sensitive information.
- **Copy Details**: Use the copy button to copy public keys, private keys, or mnemonics to your clipboard.
- **Delete Wallet**: Remove individual wallets with the trash icon.
- **Clear All Wallets**: Use the "Clear Wallets" button to remove all wallets from your session.

## Security Notes

- This application runs entirely on the client-side; no data is ever sent to a server.
- Secret phrases and private keys are never stored anywhere except in your browser's memory during the current session.
- Always use this application on a secure device and connection.
- Consider running this application locally for maximum security.
- **Warning**: Anyone with access to your secret phrase or private key has complete control over your wallet and funds.

## Tech Stack

- **Next.js**: React framework for building the user interface
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling
- **shadcn/ui**: For UI components
- **Solana Web3.js**: For Solana blockchain interactions
- **bip39**: For mnemonic phrase handling
- **ed25519-hd-key**: For HD wallet derivation

## Development

### Folder Structure

/
├── app/
│   └── page.tsx         # Main application page
├── components/
│   └── ui/              # UI components
├── public/              # Static assets
├── styles/             
│   └── globals.css      # Global styles
└── package.json         # Project dependencies
### Building for Production
bash
npm run build
# or
pnpm build
## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This software is provided "as is", without warranty of any kind. Use at your own risk. The developers are not responsible for any loss of funds or other damages that may occur from using this software.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


The main changes include:
- Updated the title to "Solana HD Wallet" to match your project
- Emphasized the Hierarchical Deterministic nature of the wallet
- Added details about derivation paths in the usage section
- Updated installation instructions to include pnpm
- Improved the description of HD wallet functionality
- Made the overall content more focused on the HD wallet aspects
