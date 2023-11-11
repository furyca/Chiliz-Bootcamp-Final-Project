import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import React, { FC } from "react";

interface NFTProps {
  nft: NFT;
  user: string;
  expires: BigNumber;
}

const NFTDetails: FC<NFTProps> = ({ nft, user, expires }) => {
  const expirationDate = new Date(expires?.toNumber() * 1000);
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <div className="flex w-full justify-between mb-4">
        <h2 className="text-2xl font-bold">{nft.metadata.name}</h2>
        <h2 className="text-2xl font-bold ">{`ID:${nft.metadata.id}`}</h2>
      </div>
      <ThirdwebNftMedia
        metadata={nft.metadata}
        height={"100%"}
        width={"100%"}
        style={{ maxHeight: 450 }}
      />
      <div className="mb-2 text-center">
        <strong>{nft.metadata.description}</strong>
      </div>
      {nft.metadata.external_url && (
        <div className="mb-2">
          <strong>External URL:</strong>{" "}
          <a
            href={nft.metadata.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            {nft.metadata.external_url}
          </a>
        </div>
      )}

      <div className="mb-2">
        <strong>Supply:</strong> {nft.supply}
      </div>
      <div className="mb-2">
        <strong>Type:</strong> {nft.type}
      </div>
      <div className="mb-2">
        <strong>Owner:</strong> {nft.owner}
      </div>
      {user === "0x0000000000000000000000000000000000000000" ? (
        <div className="mb-2">
          <strong>User: </strong> <span>Not Rented</span>
        </div>
      ) : (
        <>
          <div className="mb-2">
            <strong>User: </strong> <span>{user}</span>
          </div>
          <div className="mb-2">
            <strong>Expiration Date:</strong> {expirationDate?.toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
};

export default NFTDetails;
