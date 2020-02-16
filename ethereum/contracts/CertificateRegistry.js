// Tell web3 that a deployed copy of 'MarriageRegistry' exists
import web3 from '../web3';    // This pulls it from our web3 instance, not actual web3
import CertificateRegistry from '../build/CertificateRegistry.json';

const instance = new web3.eth.Contract(
  JSON.parse(CertificateRegistry.interface),
  // This si the address of the contract factory
  // '0x7117f833A11ecFAddD3cBFbe521219b67Fe64FEb'

  // Mainnet
  '0xf9a017772d4b01D5a5436843355eF60935921CC1'
);

export default instance;
