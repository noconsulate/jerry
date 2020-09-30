const Web3 = require('web3');
import  Jerry  from '../../../jerry-contract/build/contracts/Jerry.json'
import { ROPSTEN_URL, PRIVATE_KEY } from '../../../secrets.json'

console.log(ROPSTEN_URL);
const address = '0x43e0eeC2f9d5d8cfB8Eca8427598bf04184f9450'

async function initWeb3() {
  const web3 = await new Web3(ROPSTEN_URL)
  return web3
}

async function loadContract(obj) {
  const contract = await new obj.eth.Contract(
    Jerry.abi, address
    )
  return contract
}

export async function getAccounts() {
  // let web3 = await initWeb3();
  // let accounts = await web3.eth.getAccounts()
  // console.log(accounts);
  // return accounts

  let web3 = await initWeb3()
  // let account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY)
  // console.log(account);

  web3.eth.accounts.wallet.add(PRIVATE_KEY)
  const account = web3.eth.accounts.wallet[0].address

  return account
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
    response = await contract.methods.retrieveProduct().call({from: null})
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
    console.log('sending', account.address);
    response = await contract.methods.storeValue(value).send({from: account})
    console.log('received');
  } catch (e) {
    error = e
    console.log(e);
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