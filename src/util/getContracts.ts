import { useContract } from "@thirdweb-dev/react";
import {
  getMarketplaceAddress,
  getNFTAddress,
  getRentalAddress,
} from "./getContractAddress";

export const getMarketplaceContract = () => {
  let market_address = getMarketplaceAddress();

  const { contract: marketplace, isLoading: marketplaceLoading } = useContract(
    market_address,
    "marketplace-v3"
  );

  return { marketplace, marketplaceLoading };
};

export const getNFTContract = () => {
  const nft_address = getNFTAddress();
  const { contract: nft_contract, isLoading: nftLoading } =
    useContract(nft_address);
  return { nft_contract, nftLoading };
};

export const getRentalContract = () => {
  const rental_address = getRentalAddress();
  const { contract: rental_contract, isLoading: rentalLoading } =
    useContract(rental_address);
  return { rental_contract, rentalLoading };
};
