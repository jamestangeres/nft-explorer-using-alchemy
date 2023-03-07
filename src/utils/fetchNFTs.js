// Go to www.alchemy.com and create an account to grab your own api key!

const apiKey = "MZ7X7ALaWX2CGdHk4fLjjzAQdtatd58e";
const endpoint = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;

export const fetchNFTs = async (owner, contractAddress, setNFTs, retryAttempt) => {
  if (retryAttempt === 5) {
    console.log("Max retry attempts reached. Aborting fetch request.")
    return;
  }

  if (!owner) {
    console.log("Owner address is missing or invalid.")
    return;
  }

  let data;
  try {
    if (contractAddress) {
      data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`)
        .then(response => response.json());
    } else {
      data = await fetch(`${endpoint}/getNFTs?owner=${owner}`)
        .then(response => response.json());
    }
    if (!data || !data.ownedNfts) {
      console.log("No data or ownedNfts property found in fetched data.");
      return;
    }
  } catch (error) {
    console.log(`Error fetching NFT data: ${error.message}`);
    fetchNFTs(owner, contractAddress, setNFTs, retryAttempt + 1);
    return;
  }

  setNFTs(data.ownedNfts);
  return data;
}


