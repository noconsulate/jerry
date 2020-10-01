const Web3 = require("web3");
import Jerry from "../../../jerry-contract/build/contracts/Jerry.json";
import { ROPSTEN_URL, PRIVATE_KEY } from "../../secrets.json";

console.log(ROPSTEN_URL);
const address = "0x43e0eeC2f9d5d8cfB8Eca8427598bf04184f9450";

const mode = process.env.chainServer
console.log(mode);

async function initWeb3() {
  const web3 = await new Web3(ROPSTEN_URL);
  return web3;
}

async function loadContract(obj) {
  const contract = await new obj.eth.Contract(Jerry.abi, address);
  return contract;
}

async function sendTx(web3, transaction) {
  const block = await web3.eth.getBlock("latest");
  const gasLimit = block.gasLimit;
  const gasPrice = await web3.eth.getGasPrice();

  try {
    const options = {
      to: transaction._parent._address,
      data: transaction.encodeABI(),
      gas: gasLimit,
      gasPrice: gasPrice * 10,
    };
    const signed = await web3.eth.accounts.signTransaction(
      options,
      PRIVATE_KEY
    );
    console.log("sending tx", signed.transactionHash);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log("transaction completed", receipt);
    return receipt;
  } catch (e) {
    console.log(e.message);
  }
}

export async function getAccounts() {
  // let web3 = await initWeb3();
  // let accounts = await web3.eth.getAccounts()
  // console.log(accounts);
  // return accounts

  let web3 = await initWeb3();
  // let account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY)
  // console.log(account);

  web3.eth.accounts.wallet.add(PRIVATE_KEY);
  const account = web3.eth.accounts.wallet[0].address;

  return account;
}

export async function getValue() {
  let web3 = await initWeb3();

  let response;
  try {
    const contract = await loadContract(web3);
    response = await contract.methods.retrieveValue().call({ from: null });
  } catch (e) {
    console.log(e);
  }

  return response;
}

export async function getProduct() {
  let web3 = await initWeb3();

  let response;
  try {
    const contract = await loadContract(web3);
    response = await contract.methods.retrieveProduct().call({ from: null });
  } catch (e) {
    console.log(e);
  }

  return response;
}
export async function doThing(value) {
  let web3 = await initWeb3();
  let contract = await loadContract(web3);

  const transaction = contract.methods.storeValue(value);

  const block = await web3.eth.getBlock("latest");
  const gasLimit = block.gasLimit;
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);

  const options = {
    to: transaction._parent._address,
    data: transaction.encodeABI(),
    gas: gasLimit,
    gasPrice: gasPrice * 2,
  };
  const signed = await web3.eth.accounts.signTransaction(options, PRIVATE_KEY);
  console.log(signed);
}
export async function storeValue(value) {
  let web3 = await initWeb3();
  let contract = await loadContract(web3);
  const transaction = contract.methods.storeValue(value);

  const receipt = await sendTx(web3, transaction);
  return receipt;
}

export async function changeMultiplier(value) {
  let web3 = await initWeb3();
  let contract = await loadContract(web3);
  const transaction = contract.methods.changeMultiplier(value)

  const receipt = await sendTx(web3, transaction)
  return receipt

}
