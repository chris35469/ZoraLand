import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";


const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Mainnet,
}

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
  endPoint: API_ENDPOINT,
  networks: [networkInfo],
}

  /*
  private getAddressTokens(address: string, cb: Function, limit: number): void {
    const args = {
      where: {
        ownerAddresses: [address]
      },
      pagination: { limit }, // Optional, limits the response size to 3 NFTs
      includeFullDetails: false, // Optional, provides more data on the NFTs such as events
      includeSalesHistory: false // Optional, provides sales data on the NFTs
    };

    const resultPromise = new Promise((resolve, reject) => {
      resolve(zdk.tokens(args))
    })

    resultPromise.then(res => cb(res))
  }
  */


export const zdk = new ZDK(args) // All arguments are optional
