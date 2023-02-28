
        var contract;
        $(document).ready(function () {
            var account;
            web3 = new Web3(web3.currentProvider);
            var address = "0x830849B0cB9b00913192194339f271Abd982C026";
            var abi = [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "voter",
                            "type": "address"
                        }
                    ],
                    "name": "register",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "vo",
                            "type": "uint256"
                        }
                    ],
                    "name": "voting_process",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "a",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "candidates",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "candidate_name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "no_of_votes",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "candidatescount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "chairperson",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getcandidates",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "candidate_name",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "no_of_votes",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct voting.Candidates[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "reveal_winner",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "winning_candidate",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "test",
                    "outputs": [
                        {
                            "internalType": "int256",
                            "name": "",
                            "type": "int256"
                        }
                    ],
                    "stateMutability": "pure",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "voters",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "voted",
                            "type": "bool"
                        },
                        {
                            "internalType": "address",
                            "name": "delegate",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "vote",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "weight",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
            web3.eth.getAccounts()
                .then(function (accounts) {
                    $('#acc').html("Your account:" + accounts);
                    
                })
            contract = new web3.eth.Contract(abi, address);
            contract.methods.reveal_winner().call().then(function (winning_candidate) {
                $('#winner').html(winning_candidate);
            }
            )

            /*$('#register').click(function () {
                var address = $('#reg').val();
                const a = web3.utils.toChecksumAddress(address);
                web3.eth.getAccounts().then(function(accounts){
                    var acc = accounts[0];
                    return contract.methods.register(a).send({from:acc});
                })

            }
            
            )*/
            const registerForm = document.getElementById('register-form');
            registerForm.addEventListener('submit', async (event) => {
              event.preventDefault();
              const voterAddress = document.getElementById('voter-address').value;
              const accounts = await web3.eth.getAccounts();
              const result = await contract.methods.register(voterAddress).send({ from: accounts[0] });
              contract.once('receipt', (receipt) => {
                console.log(receipt);
                // Update the HTML page to reflect the success or failure of the transaction
              });
            });
            $('#vote').click(function () {
                web3.eth.getAccounts().then(function(accounts){
                    var voteno = parseInt($('#inp').val());
                    const currentAccount = web3.eth.defaultAccount || accounts[0];
                    contract.methods.voting_process(voteno).send({from:currentAccount});
                })
                    
            })
            $('#v').click(function(){
                console.log("hi");
               contract.methods.candidatescount().call().then(function(candidatescount){
                contract.methods.getcandidates().call().then(function(result){
                
                    var names = result.map(can=>can.candidate_name);
                    var namelist = $('#candidates-list');
                    namelist.empty();
                    for(var i=0;i<candidatescount;i++)
                    {   var n = names[i] +":"+i+ "<br>";
                        namelist.append(n);

                    }
                   })
               })
                
            })
            
            
           
            
            ;
            $('#chairperson').click(function(){
                
                contract.methods.chairperson().call().then(async (chairperson)=>{
                    $('#chair').html("chairperson:"+chairperson);
                    console.log("ho");
                })
            })
        }
        )
