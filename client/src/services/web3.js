import Web3 from 'web3';

let web3;
if (typeof window.web3 !== undefined){
    web3 = new Web3(window.web3.currentProvider);
}
else {
    console.log('web3 is not defined at user window');
    const provider =  new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/7e9c3cde23b1417a9ecb5d406cbad449');
    web3 = new Web3(provider);
}
export default web3;