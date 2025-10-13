# 🪙 ThriftChains Frontend

**ThriftChain** is a decentralized savings dApp that enables users to create and manage individual or group savings goals using ERC20 tokens. This repository contains the frontend interface that interacts with the underlying smart contracts to offer a seamless user experience for thrift creation, participation, and tracking.

---

## 🔍 Overview

ThriftChain empowers users to:
- Save towards personal financial goals (Solo Thrift)
- Collaboratively contribute with friends or community members (Group Thrift)
- Enjoy secure, on-chain management of savings via low-gas proxy contracts

The frontend is designed to guide users through:
- Wallet connection and registration
- Creating or joining savings goals
- Tracking progress and managing contributions

---

## ✨ Features

- **User Registration**: Sign up with a unique username and optional verification for group participation.
- **Thrift Creation**: Launch solo or group savings goals with custom parameters.
- **Group Participation**: Join existing thrift pools once verified by the admin.
- **On-Chain Saving**: Make token contributions securely using ERC20 approvals.
- **Progress Tracking**: View your savings milestones, deadlines, and group stats.
- **Admin Dashboard** *(for superusers)*: Verify users, adjust platform settings, and monitor thrift contracts.

---

## 🛠 Tech Stack

| Layer           | Tools/Frameworks                             |
|----------------|-----------------------------------------------|
| UI              | React.js, Tailwind CSS, Headless UI          |
| Blockchain      | Ethers.js, Reown                 |
| State Mgmt      | Context                         |


---


## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn
```

### 2. Setup Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_CONTRACT_ADDRESS=0x...
VITE_FACTORY_ADDRESS=0x...
VITE_SINGLE_IMPL=0x...
VITE_GROUP_IMPL=0x...
VITE_RPC_URL=...
```

### 3. Run Local Dev Server

```bash
npm run dev
```

---