# Zora Land


[<img src="https://w3bbie.xyz/ethglobal/screenshot.png">](https://w3bbie.xyz/ethglobal)


ZoraLand is a RPG that allows users to discover available tokens and collections on Zora through gaming.

Try it Live. https://w3bbie.xyz/ethglobal/

## Game
ZoraLand combines the Zora Development Kit (ZDK) with the Phaser 3 game engine. TypeScript and node was used to build the final product. The game allows users to move around using the cursor keys and WASD. It features a main character and multiple envelopes. When the player collides with an envelope they may discover Zora tokens. When Zora tokens are discovered the title of the token and media is displayed. Players then have the option to view the collection on Zora by pressing V or Minting a ZoraLand token by pressing M. The token data displayed is acquired by calling the ZDK token query. 

## [Minting](https://github.com/ss251/metabolism-22)
We used the Zora starter kit to create our ‘Zora World’ edition NFTs (deployed on rinkeby). The idea behind this would be to let users access our game in future. We have also created ‘Zora World Custom’ NFTs (deployed on polygon) that would let users create their own NFT with custom attributes. The idea behind this is to integrate the ‘Zora World Custom’ NFTs with the Zora World game, enabling the NFTs to be playable in-game characters. The Zora Starter Kit was especially helpful  The tech stack used on the frontend includes NextJS, Typescript, Tailwindcss, web3.storage (for metadata storage), wagmi wallet connector, alchemy NFT api for fetching NFTs (was a preferrable option to display NFTs from mainnet, rinkeby and mumbai testnet), ethers for interacting with smart contracts, and hardhat for deploying and verifiying our ERC721 smart contract. 




