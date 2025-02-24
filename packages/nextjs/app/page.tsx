"use client";

import { client } from "./client";
import type { NextPage } from "next";
import { base, baseSepolia, ethereum } from "thirdweb/chains";
import { ConnectButton, PayEmbed, useActiveAccount } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const wallets = [
    inAppWallet({
      auth: {
        options: ["passkey"],
      },
    }),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];

  const activeAccount = useActiveAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <div className="text-center mb-4">
            <ConnectButton
              client={client}
              wallets={wallets}
              chains={[base, baseSepolia, ethereum]}
              connectModal={{
                size: "compact",
                showThirdwebBranding: false,
              }}
            />
          </div>
          {activeAccount?.address && (
            <div className="mb-4 flex justify-center items-center space-x-2 flex-col sm:flex-row">
              <p className="my-2 font-medium">Connected Address:</p>
              <Address address={activeAccount?.address} />
            </div>
          )}

          {activeAccount?.address && (
            <PayEmbed
              client={client}
              payOptions={{
                mode: "fund_wallet",
                metadata: {
                  name: "Get funds",
                },
                prefillBuy: {
                  token: {
                    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                    name: "Base USDC",
                    symbol: "USDC",
                  },
                  chain: base,
                  amount: "5.00",
                },
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
