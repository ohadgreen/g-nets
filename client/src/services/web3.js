import Web3 from 'web3';

let web3;
if (window.web3 && typeof window.web3 !== undefined && typeof window.web3.currentProvider !== undefined){
    console.log('web3: \n' + Object.keys(window.web3.currentProvider));
    web3 = new Web3(window.web3.currentProvider);
}
else {
    console.log('web3 is not defined at user window');
    const provider =  new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/7e9c3cde23b1417a9ecb5d406cbad449');
    web3 = new Web3(provider);
}
export default web3;