//load the build artifacts of the contract you want to interact with. This way, Truffle will know how to format our function calls in a way the contract will understand.
const FroggyContract = artifacts.require("FroggyContract");
const MarketPlaceContract = artifacts.require("FroggyMarketPlace");
//helper method that wraps the function call inside of a try/catch block 
const utils = require("./helpers/utils");

contract("FroggyMarketPlace", (accounts) => {

    let froggyContractInstance;
    beforeEach(async () => {
        froggyContractInstance = await FroggyContract.new();
        marketplaceContractInstance = await MarketPlaceContract.new(froggyContractInstance.address);
        await froggyContractInstance.setApprovalForAll(marketplaceContractInstance.address,true,{from:accounts[0]})
    });
    /**
     *  setOffer test 
     */
    context("setOffer() Tests", async () => {
        
        it("owner should be able to set an offer on the marketplace", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            const result = await marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]})
            assert.equal(result.receipt.status,true)
        })
    
       it("revert when creating a duplicate offer on the marketplace", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]})
            utils.shouldThrow(marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]}))
        })
    
      it("revert if offer created by non owner of the token", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            utils.shouldThrow(marketplaceContractInstance.setOffer(1000,0,{from:accounts[1]}))
        })

    })
   

    /**
     *  getAllTokenOnSale() test 
     */
     context("getAllTokenOnSale() tests", async () => {
        
        it("should be able to query all tokens currently on sale", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await froggyContractInstance.createFrogGen0(1111111111111123,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(1000,1,{from:accounts[0]})
            const result = await marketplaceContractInstance.getAllTokenOnSale.call({from:accounts[0]})
            assert.equal(result.length,2)
        })
    
       it("return an empty array when there are no TokensOnSale", async() => {
            const result = await marketplaceContractInstance.getAllTokenOnSale.call({from:accounts[0]})
            assert.equal(result.length,0)
        })
    
     })

   
    /*
     * getOffer() Tests 
     */
    context("getOffer() Tests", async () => {
    
        it("should be able to get the details of a token on offer", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]})
            const result = await marketplaceContractInstance.getOffer.call(0,{from:accounts[0]})
            assert.equal(result.seller, accounts[0])
            assert.equal(result.price, 1000)
            assert.equal(result.index,0)
            assert.equal(result.tokenId,0)
            assert.equal(result.active, true)
        })
    
        it("revert when trying to get details of offer that doesn't exist", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            utils.shouldThrow(marketplaceContractInstance.getOffer(1,{from:accounts[0]}))   
        })
    
    })

   
     /*
     * removeOffer() Tests 
     */

     context("removeOffer() Tests", async () => {

       it("offer creator should be able to remove offer", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]})
            await marketplaceContractInstance.removeOffer(0,{from: accounts[0]})
            const result = await marketplaceContractInstance.getAllTokenOnSale.call({from:accounts[0]})
            assert.equal(result.length,[])
        })
    
       it("revert if account other than offer creator tries to remove offer ", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]})
            utils.shouldThrow(marketplaceContractInstance.removeOffer(0,{from: accounts[1]}))   
        })
    
       it("revert if trying to remove an offer that doesn't exist ", async() => {
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            utils.shouldThrow(marketplaceContractInstance.removeOffer(0,{from: accounts[0]}))   
        })
    })

    context("buyFroggy() Tests", async () => {
        
       it("transfer ownership of token when a user buys an offer", async () =>{
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]})
            await marketplaceContractInstance.buyFroggy(0,{from: accounts[1], value:1000})
            const owner = await froggyContractInstance.ownerOf.call(0,{from:accounts[3]})
            const balanceOf = await froggyContractInstance.balanceOf.call(accounts[1],{from:accounts[3]})
            assert.equal(owner, accounts[1])
            assert.equal(balanceOf,1)

        })

       it("seller should recieve payment of token when another user buys offer", async () =>{
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(10000000000,0,{from:accounts[0]})
            const balanceBeforeString =  await web3.eth.getBalance(accounts[0]) //returns string
            const balanceBeforeInt = Number(balanceBeforeString)
            await marketplaceContractInstance.buyFroggy(0,{from: accounts[1], value:10000000000})
            const balanceAfterString =  await web3.eth.getBalance(accounts[0])
            const balanceAfterInt = Number(balanceAfterString)
            assert.isAbove(balanceAfterInt,balanceBeforeInt)
            
        })

       it("buyer should be relieved of amount equal to token's offer price when offer brought", async () =>{
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]})
            const balanceBeforeString =  await web3.eth.getBalance(accounts[1]) //returns string
            const balanceBeforeInt = Number(balanceBeforeString)
            await marketplaceContractInstance.buyFroggy(0,{from: accounts[1], value:1000})
            const balanceAfterString =  await web3.eth.getBalance(accounts[1])
            const balanceAfterInt = Number(balanceAfterString)
            assert.isBelow(balanceAfterInt,balanceBeforeInt)
        })

       it("offer should be removed once a buyer buys token on sale", async () =>{
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]})
            await marketplaceContractInstance.buyFroggy(0,{from: accounts[1], value:1000})
            const offers = await marketplaceContractInstance.getAllTokenOnSale.call({from: accounts[3]})
            assert.equal(offers.length,0)
        })

       it("revert if the transaction if the value of sender's message isn't equal to the sale price",async () =>{
            await froggyContractInstance.createFrogGen0(1111111111111111,{from:accounts[0]})
            await marketplaceContractInstance.setOffer(1000,0,{from:accounts[0]})
            utils.shouldThrow(marketplaceContractInstance.buyFroggy(0,{from: accounts[1], value:1}))
        })

       it("revert if the account attempts to buy offer that doesn't exist",async () =>{
            utils.shouldThrow(marketplaceContractInstance.buyFroggy(0,{from: accounts[1], value:10000000}))
        })
    })

  })    