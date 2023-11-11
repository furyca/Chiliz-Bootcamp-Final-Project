import { getRentalContract } from "@/util/getContracts";
import { useContractWrite } from "@thirdweb-dev/react";
import { type FC, useState } from "react";

interface RentNFTCardProps {
  id: string;
}

const RentNFTCard: FC<RentNFTCardProps> = ({ id }) => {
  const [address, setAddress] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const { rental_contract } = getRentalContract();

  const {
    mutateAsync: setUser,
    isLoading,
    error: grantError,
  } = useContractWrite(rental_contract, "setUser");

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let date = new Date(event.target.value).getTime();

    setDuration(Math.floor(date / 1000));
  };

  const grantUserRole = async () => {
    let now = Math.floor(new Date().getTime() / 1000);

    if (duration - now < 0) {
      console.error("Invalid date");
      return;
    }
    try {
      await setUser({ args: [id, address, duration] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative bg-gray-800 text-white p-6 rounded-lg w-full shadow-md mt-4">
      <h1 className="text-2xl font-semibold mb-2 ">Grant User Role</h1>

      <div>
        <label className="font-bold block mt-3">To:</label>
        <input
          className=" my-2 bg-gray-800 w-full"
          placeholder="Recipient Address"
          onChange={handleAddressChange}
        />
      </div>
      <div>
        <label className="font-bold block mt-3">Duration</label>
        <input
          className=" my-2 bg-gray-800 w-30"
          placeholder="Duration"
          type="datetime-local"
          onChange={handleDurationChange}
        />
      </div>

      <button
        className="mt-6 bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
        onClick={grantUserRole}
      >
        Grant
      </button>

      {(grantError as unknown as boolean) ? (
        <div className="text-center mt-4">Grant Error! See Console</div>
      ) : null}
      {isLoading && (
        <div className="text-center mt-4">Granting in progress...</div>
      )}
    </div>
  );
};
export default RentNFTCard;
