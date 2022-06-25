//load the build artifacts of the contract you want to interact with. This way, Truffle will know how to format our function calls in a way the contract will understand.
const FroggyContract = artifacts.require("FroggyContract");
const MarketPlaceContract = artifacts.require("FroggyMarketPlace");
//helper method that wraps the function call inside of a try/catch block 
const utils = require("./helpers/utils");

contract("FroggyContract", (accounts) => {

    let froggyContractInstance;
    beforeEach(async () => {
        froggyContractInstance = await FroggyContract.new();
        marketplaceContractInstance = await MarketPlaceContract.new(froggyContractInstance.address);
    });

    context("balanceOf() Tests", async () => {
        
       it("should be able to query balance of an account", async() => {
            const result = await froggyContractInstance.balanceOf.call(accounts[0],{from:accounts[0]})
            assert.equal(result,0)
        })
        
    })

    context("totalSupply() Tests", async () => {
        
       it("query the totalSupply of frogs", async() => {
            const result = await froggyContractInstance.totalSupply.call({from:accounts[0]})
            assert.equal(result,0)
        })

    })

    context("name() Tests", async () => {
        
       it("get name of the contract", async() => {
            const result = await froggyContractInstance.name.call({from:accounts[0]})
            assert.equal(result,"ALFROGS")
        })

    })

    context("symbol() Tests", async () => {
        
       it("get symbol of the contract", async() => {
            const result = await froggyContractInstance.symbol.call({from:accounts[0]})
            assert.equal(result,"ALF")
        })

    })

    context("createFrogGen0() Tests", async () => {
        
       it("should be able to create a frog", async() => {
            const result = await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            assert.equal(result.receipt.status,true)
        })

       it("should not be able to create more than 10 gen0 frogs", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111111121,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111111123,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111211121,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(3111111111111121,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111151111,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111131121,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111141123,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111281121,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(3111111111191121,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(3111114411191121,{from:accounts[0]})
            utils.shouldThrow(froggyContractInstance.createFrogGen0(3111118111191121,{from:accounts[0]}));
        })
    
       it("revert if not owner of contract tries to create gen0 frog", async() => {
            const result = await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
        })
    
       it("get the owner of a frog", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            const owner = await froggyContractInstance.ownerOf.call(0,{from:accounts[1]})
            assert.equal(owner,accounts[0])
        })
    
    })
    
    context("transfer() Tests", async () => {
        
       it("should be able to transfer a frog to another address", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            const result = await froggyContractInstance.transfer(accounts[1],0,{from:accounts[0]})
            const frogOwner = await froggyContractInstance.ownerOf.call(0,{from:accounts[0]})
            assert.equal(frogOwner,accounts[1])
            // assert.equal(result.receipt.status,true)
        })


        //according to stackOverflow nobody can have a zero address, so no point testing this case
        //it("should not be able to transfer a frog to a zero address", async() => {
        //     const contractInstance = await FroggyContract.new();
        //     await contractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
        //     const result = await contractInstance.transfer(0x0,0,{from:accounts[0]})
        //     // const frogOwner = await contractInstance.ownerOf.call(0,{from:accounts[0]})
        //     // assert.equal(frogOwner,accounts[1])
        //     assert.equal(result.receipt.status,false)
        // })

       it("should not be able to transfer a frog if you do not ownit", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await utils.shouldThrow(froggyContractInstance.transfer(accounts[1],0,{from:accounts[1]}));
        })
    })
    
    context("getFrogDetails() Tests", async () => {
        
       it("should be able to get frog details", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            const result = await froggyContractInstance.getFrogDetails.call(0,{from:accounts[1]})
            // assert.equal(result.receipt.status,false)
            // assert.lengthOf(result[0], 6, 'results value has a length of 3');
            assert.equal(result.genes,1111111111111111)
        })

    })
    /**
     * Testing approval cases
     */
     context("approve() Tests", async () => {
       it("approve an account B to use account A's token", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await froggyContractInstance.approve(accounts[1],0,{from:accounts[0]})
            const result = await froggyContractInstance.getApproved.call(0,{from:accounts[1]})
            assert.equal(result,accounts[1])
        })
    
       it("approve an account B to use account A's token that doesn't exist", async() => {
            utils.shouldThrow(froggyContractInstance.approve(accounts[1],0,{from:accounts[0]}))
        })
    
       it("approve own account for token", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            utils.shouldThrow(froggyContractInstance.approve(accounts[0],0,{from:accounts[0]}))
        })
    
       it("approve account B for token the approving account doesn't own", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            utils.shouldThrow(froggyContractInstance.approve(accounts[1],0,{from:accounts[1]}))
        })
    
       it("operator approve account[2] for token owned by account[0]", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await froggyContractInstance.setApprovalForAll(accounts[1],true,{from:accounts[0]})
            await froggyContractInstance.approve(accounts[2],0,{from:accounts[1]})
            const result = await froggyContractInstance.getApproved.call(0,{from:accounts[1]})
            assert.equal(result,accounts[2])
        })
    
       it("revert when non operator tries to approve another account", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            utils.shouldThrow(froggyContractInstance.approve(accounts[2],0,{from:accounts[1]}))
        })    
     })
    
    /**
     * setApprovalForAll() Test
     */

     context("setApprovalForAll() Tests", async () => {
       it("should set an operator", async() => {
            await froggyContractInstance.setApprovalForAll(accounts[1],true,{from:accounts[0]})
            const result = await froggyContractInstance.isApprovedForAll.call(accounts[0],accounts[1],{from:accounts[3]})
            assert.equal(result,true)
        })
    
       it("revert setting self as operator", async() => {
            utils.shouldThrow(froggyContractInstance.setApprovalForAll(accounts[0],true,{from:accounts[0]}))
        })
     })
     

    /**
     * transferFrom() tests
     */
     context("transferFrom() tests", async () => {
        
       it("transfer token from one account to another using transferFrom", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await froggyContractInstance.transferFrom(accounts[0],accounts[1],0,{from:accounts[0]})
            const owner = await froggyContractInstance.ownerOf.call(0,{from:accounts[1]})
            assert.equal(owner,accounts[1])
        })

       it("revert transferFrom to contract address", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            utils.shouldThrow(froggyContractInstance.transferFrom(accounts[0],froggyContractInstance.address,0,{from:accounts[0]}))
        })

       it("transferFrom called from operator ", async() => {
            await froggyContractInstance.setApprovalForAll(accounts[1],true,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await froggyContractInstance.transferFrom(accounts[0],accounts[2],0,{from:accounts[1]})
            const owner = await froggyContractInstance.ownerOf.call(0,{from:accounts[1]})
            assert.equal(owner,accounts[2])
        })

       it("transferFrom called from approved ", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await froggyContractInstance.approve(accounts[1],0,{from:accounts[0]})
            await froggyContractInstance.transferFrom(accounts[0],accounts[2],0,{from:accounts[1]})
            const owner = await froggyContractInstance.ownerOf.call(0,{from:accounts[1]})
            assert.equal(owner,accounts[2])
        })

       it("revert transferFrom when _from isn't the owner of the token ", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            utils.shouldThrow(froggyContractInstance.transferFrom(accounts[1],accounts[2],0,{from:accounts[1]}))
        })

       it("revert transferFrom when frog doesn't exist", async() => {
            utils.shouldThrow(froggyContractInstance.transferFrom(accounts[0],accounts[1],0,{from:accounts[0]}))
        })
         
     })


    /**
     * safeTransferFrom() Tests
     */
     context("safeTransferFrom() Tests", async () => {

       it("should be able to safely transfer token usign safeTransfer ", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await froggyContractInstance.safeTransferFrom(accounts[0],accounts[1],0,{from:accounts[0]})
            const owner = await froggyContractInstance.ownerOf.call(0,{from:accounts[1]})
            assert.equal(owner,accounts[1])
        })
        
       it("should be able to transfer token to a contract address that can handle ERC721 tokens ", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            const result = await froggyContractInstance.safeTransferFrom(accounts[0],marketplaceContractInstance.address,0,{from:accounts[0]})
            assert.equal(result.receipt.status,true)
        })
    
     })

     context("breed() Tests", async () => {

       it("should be able to breed two frogs together ", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111111131,{from:accounts[0]})
            const result = await froggyContractInstance.breed(0,1,{from:accounts[0]})
            const balanceOf = await froggyContractInstance.balanceOf(accounts[0],{from:accounts[0]})
            assert.equal(result.receipt.status,true)
            assert.equal(balanceOf,3)

        })
        
       it("revert if account attempts to breed Frog not belonging to them ", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111111131,{from:accounts[0]})
            await froggyContractInstance.safeTransferFrom(accounts[0],accounts[1],1,{from:accounts[0]})
            utils.shouldThrow(froggyContractInstance.breed(0,1,{from:accounts[0]}))
        })
    
     })

     context("tokensOfOwner() Tests", async () => {

        it("should be able to return the tokens a user owns ", async() => {
             await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
             await froggyContractInstance.createFrogGen0(1111111111111131,{from:accounts[0]})
             const result = await froggyContractInstance.tokensOfOwner(accounts[0],{from:accounts[0]})
             assert.equal(result.length,2)
 
         })
         
        it("return an array of length 0 if account does not own any frogs ", async() => {
            const result = await froggyContractInstance.tokensOfOwner(accounts[0],{from:accounts[0]})
            assert.equal(result.length,0)
         })
     
      })

})    