## Obscoin

Obscoin is a blockchain-based project developed as a school assignment. Obscoin symbolizes commitment to transparency and accountability.

Obscoin allows users to create transactions with ease, retrieve transaction details, and add new blocks to the blockchain seamlessly. The integration of PubNub ensures that the blockchain remains synchronized across all nodes, maintaining consistency and reliability.

Join us as we delve into the world of OBScoin, where every transaction tells a story, and every block holds the promise of a brighter future. Welcome to the beginning of a remarkable journey. Welcome to Obscoin!

## Features

- Create Transactions: Add new transactions to the blockchain.
- Get Transaction by ID: Retrieve details of a specific transaction using its unique identifier.
- Add Blocks: Mine and add new blocks to the blockchain.
- List Blocks: List all blocks in the blockchain.
- Sync Blockchain: Synchronize the blockchain across different nodes using PubNub.

## Packages

- Nodemon
- Express
- Pubnub
- Uuid
- Cors
- Cross-env

## Installation and usage

To install and run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Medieinstitutet/obscoin.git

   ```

2. Install dependencies
   - Backend
     ```bash
      cd server
      npm install

     ```
   - Frontend
     ```bash
     cd client
     npm install
     ```
3. Configure Environment Variables

- Navigate to the config directory and locate the .env file.
- Replace the placeholder values with your actual API keys or configuration settings.

4.  Run project

    - To run the backend server with port 5010

      ```bash
      cd server
      npm run dev

      ```

    - To run backend server with dynamic port
      ```bash
      cd server
      npm run dev-node

      ```
    - To run frontend
      ```bash
      cd client
      npm run dev
      ```

## Contributors

- Sebastian Flavet
- Nathalie Persson Enriquez
- Igor Ristic
- Gert Ove Jacobsson
