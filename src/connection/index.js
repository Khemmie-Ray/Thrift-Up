import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import {baseSepolia} from "@reown/appkit/networks";


// 1. Get projectId
const projectId = import.meta.env.VITE_PROJECTID;

const networks = [baseSepolia];

// 3. Create a metadata object - optional
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "http://localhost:5173", // origin must match your domain & subdomain
  icons: ["./mark.svg"],
};

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  }
});