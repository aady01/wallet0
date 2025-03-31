# Solana HD Wallet

# Solana HD Wallet

A secure, client-side Hierarchical Deterministic (HD) wallet generator for Solana with a clean, modern UI built using **Next.js, TypeScript, and Tailwind CSS**.  
A secure, client-side Hierarchical Deterministic wallet generator for Solana with a clean, modern UI built with Next.js, TypeScript, and Tailwind CSS.

![image](https://github.com/user-attachments/assets/9136d556-7e61-4e1b-949b-b406bfa1848f) ![image](https://github.com/user-attachments/assets/bc08f0fd-dfcf-4317-b5a8-aeaea68098a1)

---

## 🚀 Features

✅ **HD Wallets** – Generate multiple wallets from a single seed phrase using Solana's derivation paths  
✅ **Dark/Light Mode** – Switch between themes for a comfortable user experience  
✅ **Secure by Design** – All cryptographic operations happen locally in your browser  
✅ **Modern UI** – Built with **DM Sans**, responsive design, and clean aesthetics  
✅ **Multiple Wallet Management** – Store and manage multiple wallets within a session  
✅ **Privacy Controls** – Show/hide sensitive information like private keys and mnemonics  
✅ **One-Click Copy** – Easily copy public keys, private keys, and mnemonics

---

![Solana HD Wallet Screenshot](https://github.com/user-attachments/assets/12f93fe2-cbc7-42c4-a03e-93093e4a804e)

## Features

- **Hierarchical Deterministic Wallets**: Generate multiple wallets from a single seed phrase using derivation paths
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Secure by Design**: All cryptographic operations happen locally in your browser
- **Modern UI**: Built with DM Sans font, responsive design, and clean aesthetics
- **Multiple Wallet Management**: Generate and store multiple wallets in a session
- **Privacy Controls**: Show/hide sensitive information like private keys and mnemonics
- **Copy Functionality**: Easily copy public keys, private keys, and secret phrases to clipboard

## 📥 Installation

### **Prerequisites**

- Node.js 16.8.0 or newer
- npm or pnpm

### Prerequisites

- Node.js 16.8.0 or newer
- npm or pnpm

### **Setup Instructions**

1️⃣ **Clone the Repository**

```bash
git clone https://github.com/yourusername/hd-wallet.git
cd hd-wallet
```

2️⃣ **Install Dependencies**

```bash
npm install
# or
pnpm install
```

3️⃣ **Run the Development Server**

```bash
npm run dev
# or
pnpm dev
```

4️⃣ **Open in Browser**  
Visit **[http://localhost:3000](http://localhost:3000)** to see the application.

---

## 🛠 Usage

### **🔹 Generating a New Wallet**

1. Click **"Add Wallet"** without entering a mnemonic to create a new wallet with a random phrase.
2. The generated wallet appears in the **Vault** section.
3. Add multiple wallets from the same mnemonic to see HD wallet functionality in action.

### **🔹 Importing an Existing Wallet**

1. Enter a **12/24-word seed phrase** in the input field.
2. Click **"Add Wallet"** to import the wallet.
3. Wallet details will appear in the **Vault** section.
4. Generate additional wallets from the same phrase to see different derivation paths.

### **🔹 Managing Wallets**

- 👁 **Toggle Private Keys/Mnemonics** – Show/hide sensitive data
- 📋 **Copy Wallet Details** – Quickly copy keys and mnemonics
- 🗑 **Delete Wallet** – Remove individual wallets
- 🧹 **Clear All Wallets** – Reset the session

---

## 🔐 Security Notes

⚠ **Your keys, your responsibility!**

- **Client-Side Only** – No data is sent to a server; everything runs in your browser.
- **Session-Based Storage** – Wallets exist only in memory and disappear when the session ends.
- **Use on a Secure Device** – Ensure a safe environment before generating or importing wallets.
- **Never Share Your Secret Phrase** – Anyone with access to it has full control over your funds.

---

## 🏗 Tech Stack

| Technology         | Purpose                    |
| ------------------ | -------------------------- |
| **Next.js**        | Frontend framework         |
| **TypeScript**     | Type-safe development      |
| **Tailwind CSS**   | Styling and responsiveness |
| **shadcn/ui**      | UI components              |
| **Solana Web3.js** | Blockchain interactions    |
| **bip39**          | Mnemonic phrase handling   |
| **ed25519-hd-key** | HD wallet derivation       |

---

## 📂 Folder Structure

```
/
├── app/
│   └── page.tsx         # Main application page
├── components/
│   └── ui/              # UI components
├── public/              # Static assets
├── styles/
│   └── globals.css      # Global styles
└── package.json         # Project dependencies
```

---

## 🏗 Building for Production

```bash
npm run build
# or
pnpm build
```

---

## 📜 License

This project is licensed under the **MIT License**. See the LICENSE file for details.

---

## ⚠ Disclaimer

This software is provided **"as is"**, without warranty of any kind. **Use at your own risk.**  
The developers are **not responsible** for any loss of funds or damages.

---

## 🤝 Contributing

Contributions are welcome!

1️⃣ **Fork the repository**  
2️⃣ **Create a feature branch**

```bash
git checkout -b feature/amazing-feature
```

3️⃣ **Commit your changes**

```bash
git commit -m "Add amazing feature"
```

4️⃣ **Push to GitHub**

```bash
git push origin feature/amazing-feature
```

5️⃣ **Open a Pull Request**

---

💡 **Questions? Issues?** Open an issue on GitHub! 🚀

### **What’s Improved?**

✔️ **Clear, concise sectioning** for readability  
✔️ **Emoji-enhanced headings** for quick navigation  
✔️ **Bullet points & tables** for a structured overview  
✔️ **More engaging tone** while staying professional  
git clone https://github.com/yourusername/hd-wallet.git
cd hd-wallet

```

```
