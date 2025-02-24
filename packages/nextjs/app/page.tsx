"use client";

import { client } from "./client";
import type { NextPage } from "next";
import { base, baseSepolia, ethereum, optimism } from "thirdweb/chains";
import { ConnectButton, ConnectEmbed, useActiveAccount } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
// import { useAccount, useConnect, useDisconnect } from "wagmi";
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
  // const { connect, connectors } = useConnect();

  // const onWagmiConnect = () => {
  //   // grab the connector
  //   const inAppWallet = connectors.find(x => x.id === "in-app-wallet");
  //   // call connect with the desired strategy
  //   connect({
  //     connector: inAppWallet,
  //     strategy: "passkey",
  //   });
  // };

  // const account = useAccount();
  // const { disconnect } = useDisconnect();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <div className="text-center mb-4">
            {!activeAccount?.address && (
              <ConnectEmbed
                client={client}
                wallets={wallets}
                chains={[base, baseSepolia, optimism, ethereum]}
                showThirdwebBranding={false}
              />
            )}
            {activeAccount?.address && (
              <ConnectButton
                client={client}
                wallets={wallets}
                chains={[base, baseSepolia, optimism, ethereum]}
                connectModal={{
                  size: "compact",
                  showThirdwebBranding: false,
                }}
              />
            )}
          </div>
          {activeAccount?.address && (
            <>
              <div>
                <p className="my-4 font-medium">Connected Address:</p>
                <Address address={activeAccount?.address} />
              </div>
            </>
          )}

          {/* <div>
            <button className="btn btn-primary" onClick={onWagmiConnect}>
              Connect
            </button>
            <p>WAGMI: {account?.address}</p>
            <button className="btn btn-primary" onClick={() => disconnect()}>
              Disconnect
            </button>
          </div> */}

          {/* {activeAccount?.address && (
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
          )} */}
        </div>
      </div>
    </>
  );
};

export default Home;
