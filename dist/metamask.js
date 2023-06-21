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
        url: 'http://localhost:3000/',
        icons: []
    }
}

const MMSDK = new MetaMaskSDK.MetaMaskSDK(options);

async function onConnect() {

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    selectedAccount = accounts[0];

    console.log('connected account:', selectedAccount);
    // accountAddressText.innerHTML = `${selectedAccount.substring(0,10)}..........${selectedAccount.slice(-10)}`;
    // window.account = selectedAccount;
    // connectButton.classList.add('d-none');
    // connectedProfile.classList.remove('d-none');

    ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 56);
    signer = ethersProvider.getSigner();


    window.ethereum.on("chainChanged", function(networkId) {
        window.location.reload();
    });

    window.ethereum.on("accountsChanged", (account) => {
        account = account;
        window.location.reload();
    });
}


window.addEventListener('load', async() => {
    // connectButton.classList.remove('d-none');
    // connectedProfile.classList.add('d-none');

    // connectButton.addEventListener("click", onConnect);
    // disconnectButton.addEventListener("click", onDisconnect);

    await onConnect();
});