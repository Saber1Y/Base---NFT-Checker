"use client";

import { useState } from "react";
import { getBaseNFT } from "@/utils/getBaseNFTs";
import Image from "next/image";

export default function NFTGallery() {
  const [input, setInput] = useState("");
  const [nfts, setNfts] = useState<
    { metadata?: { image?: string; name?: string } }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [wrong, setWrong] = useState(false); //check if the address is wrong

  const handlefetch = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEvmAddress = /^0x[a-fA-F0-9]{40}$/.test(input); //check if it is an EVM adrees (validation)

    if (!isEvmAddress) {
      alert("Please enter a valid Base wallet address (starts with 0x...)");
      setWrong(true);
      return;
    } else {
      setWrong(false);
    }

    try {
      setIsLoading(true);
      setError("");
      const res = await getBaseNFT(input);
      setNfts(res);
    } catch (err) {
      setError("Error displaying NFTs.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  function normalizeIPFS(url: string): string {
    if (!url) return "/fallback.png";

    const cleanedUrl = url
      .replace(/^ipfs:\/\//, "https://nftstorage.link/ipfs/")
      .replace("https://ipfs.io/ipfs/", "https://nftstorage.link/ipfs/")
      .replace("ipfs://", "https://nftstorage.link/ipfs/")
      .replace(
        "https://nftstorage.link/ipfs/ipfs/",
        "https://nftstorage.link/ipfs/"
      );

    return cleanedUrl;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form
        onSubmit={handlefetch}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 w-full"
      >
        <input
          type="text"
          placeholder="Enter Base wallet address"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`flex-1 px-4 py-3 rounded-xl border border-gray-700 ${
            wrong ? "border-red-500" : "border-gray-700"
          } bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all font-medium shadow-md"
        >
          View NFTs
        </button>
      </form>

      <p className="text-xs my-10 text-red-500">
        Note: Only Base NFTs will be shown. Other chain addresses may not return
        results.
      </p>

      {isLoading && <p>Loading NFTs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {nfts.map((nft, idx) => (
          <div key={idx} className="border p-2 rounded">
            <Image
              src={normalizeIPFS(nft?.metadata?.image || "/fallback.png")}
              alt="NFT"
              width={300}
              height={300}
              onError={(e) => {
                e.currentTarget.src = "/fallback.png";
              }}
              className="w-full h-48 object-cover"
              unoptimized
            />
            <div className="mt-2 text-sm font-semibold">
              {nft?.metadata?.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
