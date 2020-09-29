const Web3 = require('web3');
import  Jerry  from '../../../jerryContract/build/contracts/Jerry.json'

console.log(Jerry.abi);

const address = '0x4da84Aef2f2e3d7C1cc15614eD487a2F534Fefe9'

async function initWeb3() {
  const web3 = await new Web3('http://localhost:7545')
  return web3
}

async function loadContract(obj) {
  const contract = await new obj.eth.Contract(
    Jerry.abi, address
    )
  return contract
}

export async function getAccounts() {
  let web3 = await initWeb3();
  let accounts = await web3.eth.getAccounts()
  return accounts
}

export async function getValue(account) {
  let web3 = await initWeb3();

  let response
  try {
    const contract = await loadContract(web3)
    response = await contract.methods.retrieveValue().call({from: account})
  } catch (e) {
    console.log(e);
  }

  return response;
}


export async function getProduct( account) {
  let web3 = await initWeb3();
  
  let response
  try {
    const contract = await loadContract(web3)
    response = await contract.methods.retrieveProduct().call({from: account})
  } catch (e) {
    console.log(e);
  }

  return response;
}

export async function storeValue(value, account)  {
  let web3 = await initWeb3();
  let contract = await loadContract(web3)

  let error, response

  try {
    console.log('sending');
    response = await contract.methods.storeValue(value).send({from: account})
    console.log('received');
  } catch (e) {
    error = e
  }
  return response
}

export async function changeMultiplier(value, account)  {
  let web3 = await initWeb3();
  let contract = await loadContract(web3)

  let error, response

  try {
    response = await contract.methods.changeMultiplier(value).send({from: account})
  } catch (e) {
    error = e
  }
  return response
}