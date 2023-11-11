# Rent NFTs Project

Built on top of NFT Marketplace template provided for Chiliz Web3 Bootcamp. In addition to the functionalities of NFT Marketplace project, this project brings out a new functionality using ERC4907 smart contract to allow users to Rent their NFT's for a desired duration.

Can do's by using this repo: 
  - Rent your NFTs to any user of you desire and choose expiration time.
  - Mint new NFTs by using ERC4907 smart contract.
  - List your non-rented NFTs for sale.

## Configuration Process

Follow these steps to properly configure your environment for the application.

### Step 1: Environment File Setup

1. Navigate to the root directory of the project, ensuring you are at the top-level (same level as the `src` directory, not within it).
2. Create a new file and name it `.env.local`. This file will store important global settings required for the application to function correctly.

### Step 2: Environment Variables

Populate the `.env.local` file with the necessary environment variables. These are crucial for linking the application with your specific resources on Thirdweb. Below is a list of the required variables:

-   `NEXT_PUBLIC_CLIENT_ID`: Your unique client identifier from Thirdweb. You can find this by logging into your account, navigating to "Settings," then "API Keys," and selecting your key to view the clientID.
-   `NEXT_PUBLIC_NETWORK`: The specific network name on Thirdweb, e.g., "SpicyChain."
-   `NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS`: The address of your marketplace smart contract.
-   `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`: The address corresponding to your NFT smart contract.
-   `NEXT_PUBLIC_RENTAL_CONTRACT_ADDRESS`: The address corresponding to your ERC4907 smart contract.


### Step 3: Dependency Installation

Execute the following command in your terminal to install the project dependencies:

```sh
npm install
```

### Step 4: Launching the Development Server

To start the development server, run:

```sh
npm run dev
```
