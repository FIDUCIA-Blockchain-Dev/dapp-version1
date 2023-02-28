# dapp-version1

This project is a voting dapp made using solidity smart contract, html, css and javascript.
To run the app the following are required to install:
a) ganache
b) metamask wallet

Installing ganache:
ganache creates an artificial blockchain which is useful for development. It can be downloaded from the following link:https://trufflesuite.com/ganache/
after installing ganache open it and click on  quickstart ethereum  a blockchain with ten fake accounts will be created for use.

installing and setting up metamask wallet:
metamask is a wallet which can be used in dapps. It is available as chrome extension.Install the metamask wallet in the chrome web store. After installing the extension 
set up according to the instructions given.
![1](https://user-images.githubusercontent.com/96581782/221616680-89a71f05-13cd-4707-9b6a-2a7db4b4bf25.png)
after setting up you should arrive at a screen which should be similar to this.

Now that we have installed both ganache and metamask lets connect both of them.
Open metamask wallet in the chrome browser. Go to settings then click on networks. Delete any localhost networks.To delete the localhost network 
click on the network you will see a delete button .On the same screen you will see a add network button click on that. Now click on add a network manually.
Give a suitable network name.For the RPC url enter the one which is visible on the ganache. For example: http://127.0.0.1:7545. enter the chain id as 1337.
The currency symbol will be ETH then click on save.You have now connected the metamask to the ganache. Now lets import some accounts. At the right most corner you 
will find some icon similar to a profile photo click on that you will find a button called import account. It asks to enter a private key. Open the ganache 
and click on the key symbol of an account you want to import. Copy the private key and paste it in the import account. After doing it your account will be imported.

Now to run the dapp. In the repository there is a voting.sol file copy all its contents. Open remix.ethereum.org create a new file and paste the voting.sol contents.
after doing that go to solidity compiler window and click compile. After clicking compile you will get ABI and bytecode. Click the ABI button to copy abi and store it 
somewhere it is necessary.
Now go to deploy and run transactions window. In the environment select injecter metamask option then metamask will pop up and ask with accounts to connect.
Then select the accounts which you have imported.
Then click the deploy button to deploy the contract. Metamask will again pop up to confirm the transaction. After transaction is confirmed the contract will be deployed.
You will see a copy button click it and copy the contract address and save it near the abi you will need these two.

Now open web3.js file. instead of the value of address paste the smart contract address in it and instead of the given abi paste the abi which you have copied. 
Now the dapp can be started using main.html.

FIDUCIA VOTING APP FEATURES

only chairperson i.e. the account which has deployed the contract can register voters if some other person tries nothing will happen.
only registered voter can vote and that too only once. 
This is a very basic voting dapp in case of a tie the first person with maximum votes will be the winner. To run the dapp a server like http server is recommended.

In metamask if the account does not automatically connect to the website on the write that you will see three dots click on that and click manually connect.
