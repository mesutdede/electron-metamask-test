import { MetaMaskSDK } from '@metamask/sdk';
import ethers from 'ethers'

let accounts;
let selectedAccount;
let ethersProvider;
let signer;

console.log(MetaMaskSDK);

const options = {
    forceInjectProvider: typeof window.ethereum === 'undefined',
    communicationLayerPreference: "socket",
    shouldShimWeb3: true,
    showQRCode: true,
    dappMetadata: {
        name: 'DatsProject Dapp',
        description: 'Dats Project Desktop Dapp',
        url: 'https://dapp.datsproject.io',
        icons: []
    }
}

const MMSDK = new MetaMaskSDK(options);
const ethereum = MMSDK.getProvider();

async function onConnect() {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });

    selectedAccount = accounts[0];

    console.log('connected account:', selectedAccount);

    ethersProvider = new ethers.providers.Web3Provider(ethereum, 56);
    signer = ethersProvider.getSigner();


    ethereum.on("chainChanged", function(networkId) {
        window.location.reload();
    });

    ethereum.on("accountsChanged", (account) => {
        account = account;
        window.location.reload();
    });
}


window.addEventListener('load', async() => {

    await onConnect();
});