import NFTDetails from "@/components/NFTDetails";
import Layout from "@/layout/Layout";
import { getMarketplaceContract } from "@/util/getContracts";
import {
  useContractRead,
  useNFT,
  useValidDirectListings,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import CancelSellingCard from "@/components/CancelSelling";
import SellNFTCard from "@/components/SellNFTCard";
import { useRouter } from "next/router";
import { getRentalContract } from "@/util/getContracts";
import RentNFTCard from "@/components/RentNFTCard";

function NFTDetailsPage() {
  const router = useRouter();
  const [price, setPrice] = useState(0.01);
  const [symbol, setSymbol] = useState("");
  const [listingID, setListingID] = useState("");
  const [nftID, setNftID] = useState("");

  const { rental_contract } = getRentalContract();
  const { marketplace } = getMarketplaceContract();

  const { data: nft, isLoading: isNFTLoading } = useNFT(rental_contract, nftID);
  const { data: rentalNFT } = useContractRead(rental_contract, "userOf", [
    nftID,
  ]);
  const { data: expires } = useContractRead(rental_contract, "userExpires", [
    nftID,
  ]);

  //console.log(expires && new Date(expires?.toNumber()*1000));

  const { data: directListings } = useValidDirectListings(marketplace, {
    start: 0,
    count: 100,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { id } = router.query;
      setNftID(id as string);
    }
    let listedNFT = directListings?.find((item) => item.tokenId === nftID);
    if (listedNFT) {
      setListingID(listedNFT.id);
      setPrice(Number(listedNFT.currencyValuePerToken.displayValue));
      setSymbol(listedNFT.currencyValuePerToken.symbol);
    }
  }, [directListings, price, listingID, router.query]);

  return (
    <Layout>
      <div>
        <h1 className="text-6xl font-semibold my-4 text-center">NFT Details</h1>

        {isNFTLoading || !nft ? (
          <div className="text-center">{`Loading NFT with id ${nftID} `}</div>
        ) : (
          <>
            <NFTDetails nft={nft} user={rentalNFT} expires={expires} />

            {listingID ? (
              <CancelSellingCard
                price={price}
                symbol={symbol}
                listingID={listingID}
              />
            ) : (
              <>
                <SellNFTCard
                  price={price}
                  onUpdatePrice={setPrice}
                  id={nftID}
                  nft={nft}
                  user={rentalNFT}
                />
                <RentNFTCard id={nftID} nft={nft} user={rentalNFT} />
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
export default NFTDetailsPage;
