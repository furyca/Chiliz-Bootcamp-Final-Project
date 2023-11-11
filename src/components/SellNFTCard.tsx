import { createListingFromPriceID } from "@/util/createListing";
import { getMarketplaceAddress } from "@/util/getContractAddress";
import { getMarketplaceContract, getNFTContract } from "@/util/getContracts";
import {
  Marketplace,
  NFT,
  RequiredParam,
  useCreateDirectListing,
  useGrantRole,
} from "@thirdweb-dev/react";
import { type FC } from "react";

interface SellNFTCardProps {
  price: number;
  onUpdatePrice: (newPrice: number) => void;
  id: string;
  nft: NFT;
  user: string;
}

const SellNFTCard: FC<SellNFTCardProps> = ({
  price,
  onUpdatePrice,
  id,
  nft,
  user,
}) => {
  const { marketplace } = getMarketplaceContract();
  const { nft_contract } = getNFTContract();

  const { mutate: grantRole, error: roleError } = useGrantRole(nft_contract);

  const {
    mutate: createDirectListing,
    isLoading: listingLoading,
    error: listError,
  } = useCreateDirectListing(marketplace as RequiredParam<Marketplace>);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdatePrice(Number(event.target.value));
  };

  const handleListing = () => {
    try {
      //Grant Role
      grantRole({
        role: "admin",
        address: getMarketplaceAddress(),
      });

      const listing = createListingFromPriceID(price, id);

      // List NFT
      createDirectListing(listing);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative bg-gray-800 text-white p-6 rounded-lg w-full shadow-md mt-4">
      <h1 className="text-2xl font-semibold mb-2 ">Sell NFT</h1>

      {user === "0x0000000000000000000000000000000000000000" ||
      user === nft.owner ? (
        <>
          <div>
            <label className="font-bold text-xl">Price</label>
            <input
              className=" ml-2 bg-gray-800 w-20"
              placeholder="Recipient Address"
              type="number"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <button
            onClick={handleListing}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            List
          </button>{" "}
        </>
      ) : (
        <p>
          This NTF is currently used by another user. Wait for the expiration
          date..
        </p>
      )}

      {(roleError as unknown as boolean) ||
      (listError as unknown as boolean) ? (
        <div className="text-center mt-4">Error Listing!</div>
      ) : null}
      {listingLoading && (
        <div className="text-center mt-4">Listing in progress...</div>
      )}
    </div>
  );
};
export default SellNFTCard;
