"use client";

import { useState } from "react";
import { getBaseNFT } from "@/utils/getBaseNFTs";

export default function NFTGallery() {
  const [input, setInput] = useState("");
  const [nfts, setNfts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlefetch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");
      const res = await getBaseNFT(input);
      setNfts(res);
    } catch (err: any) {
      setError("Error displaying NFTs. Please check the address.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const normalizeIPFS = (url: string) => {
    return url?.startsWith("ipfs://")
      ? url.replace("ipfs://", "https://ipfs.io/ipfs/")
      : url;
  };

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
          className="flex-1 px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all font-medium shadow-md"
        >
          View NFTs
        </button>
      </form>

      {isLoading && <p>Loading NFTs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {nfts.map((nft, idx) => (
          <div key={idx} className="border p-2 rounded">
            <img
              src={normalizeIPFS(nft?.metadata?.image) || "/placeholder.png"}
              alt={nft?.metadata?.name}
              className="w-full h-48 object-cover"
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
