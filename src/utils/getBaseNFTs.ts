import alchemyClient from "../lib/alchemy";

 export async function getBaseNFT(wallet: string) {
    const res = await alchemyClient.get('getNFTs', {
        params: {
            owner: wallet,
            withMetadata: true,
            pageSize: 100,
        },
    });

    return res.data.ownedNfts;
 }