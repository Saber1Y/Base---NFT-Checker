import axios from 'axios';

const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

console.log("Alchemy Key:", ALCHEMY_KEY);

const baseURL = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;

const alchemyClient = axios.create({
    baseURL,
});

export default alchemyClient;