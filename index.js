const express = require("express");
// Import Moralis
const Moralis = require("moralis").default;
// Import the EvmChain dataType
const { EvmChain } = require("@moralisweb3/common-evm-utils");
require('dotenv').config();
const app = express();
const port = 3002;

const MORALIS_API_KEY = process.env.MY_API_KEY;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/update", async (req, res) => {
    try {
        const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
          "chain": "0x7e4",
          "limit": 2,
          "order": "DESC",
          "address": "0xefF0c4Fdbebd2EbeE46912d78BcdDda9d763f837"
        });
      
        res.send(response.raw);
      } catch (e) {
        console.error(e);
        res.send('No funva');

      }
});

app.get("/nfts", async (req, res) => {
  try {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: "0x7e4", // red Ronin
      address: "0x99DF0c1D9DF2924Fa5580cD2D897D220a7688952",
      format: "decimal", // muestra IDs como número normal
      limit: 50, // máximo de NFTs que traerá por solicitud
    });
    res.send(response.raw);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error al obtener NFTs");
  }
});



const startServer = async () => {
    await Moralis.start({
        apiKey: MORALIS_API_KEY,
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

startServer();