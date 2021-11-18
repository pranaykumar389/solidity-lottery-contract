const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const mySecret = process.env.MNEMONIC;
const rinkebyApi = process.env.RINKEBY_API;

const provider = new HDWalletProvider(
  mySecret,
  rinkebyApi
);
const web3 = new Web3(provider);

async(() => {
  try {
      const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from contract', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: '1000000' });

    console.log('Contract deployed to', result);
  } catch (error) {
    console.error(error);
  }
  provider.engine.stop();
})();
