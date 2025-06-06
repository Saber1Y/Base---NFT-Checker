import NFTGallery from "@/components/NFTGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">🔍 Base NFT Checker</h1>
          <p className="text-lg text-gray-300">
            Instantly view NFTs owned by any wallet address on the Base chain.
          </p>
        </header>

        <NFTGallery />
   <Footer />
      </div>
    </div>
  );
}
