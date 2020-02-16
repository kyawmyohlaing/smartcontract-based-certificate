# smartcontract-based-certificate
Blockchain based Certificate


## Build Status

## Built Using

 - [Next.js](https://nextjs.org/)
 - [Semantic UI](https://react.semantic-ui.com/) for React

## Setup
Prerequisite: [set up Metamask](https://www.cryptokitties.co/faq#Installing-MetaMask-your-digital-wallet) 

Install project dependencies:

    $ npm install

Start the app

    $ npm run dev

**To compile your own contracts:**
CD into Ethereum directory, then run: 

    $ node compile.js

**To deploy your own contracts:**

    // Never commit this file!
    
    const HDWalletProvider = require('truffle-hdwallet-provider');
    const Web3 = require('web3');
    const compiledFactory = require('./build/MarriageRegistry.json');
    const fs = require('fs-extra')
    
    const provider = new HDWalletProvider(
      // NEVER SHARE your keys!
      'YOUR OWN KEY FOR DEPLOYING FACTORY CONTRACT',
      'https://mainnet.infura.io/[YOUR ACCOUNT]'
    );
    
    const web3 = new Web3(provider);
    
    const deploy = async () => {
      console.log("Starting to deploy...");
      const accounts = await web3.eth.getAccounts();
    
      console.log("Attempting to deploy from account", accounts[0]);
    
      const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '5000000' });
    
      console.log(compiledFactory.interface);
      console.log('Contract deployed to', result.options.address);
    
    }
    deploy();

## Contributing

 1. Fork it the project
 2. Create your feature branch using issue #: `git checkout -b issue#-feature`
 3. Commit your changes: git commit -am 'Fix/Add/Change: commit msg'
 4. Push to the branch: `git push origin issue#-feature`
 5. Create a new Pull Request


