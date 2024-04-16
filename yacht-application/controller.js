const { Wallets, Gateway, DefaultEventHandlerStrategies} = require('fabric-network');
const path = require('path');
const fs   = require('fs');
        
const ccpPath = path.resolve(__dirname, '..', 'test-network/organizations/peerOrganizations/org1.example.com', 'connection-org1.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function connectToNetwork(callback) {
    // Create a new file system based wallet for managing identities
    const walletPath = path.join('/Users/chingheilo/Desktop/Hyperledger_Project/YachtProject/fabric-samples/yacht-app/wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled user
    
    
    // Create a new gateway for connecting to our peer node. 
    const gateway = new Gateway();
    await gateway.connect(
        ccp, 
        {
            wallet: wallet, 
            identity:'User1@org1.example.com', 
            discovery:{enabled:true, asLocalhost:true}
        }
    );
    
    // Get the network(channel) our contract is deployed to
    const network = await gateway.getNetwork('mychannel');
    // Get the contract from the network
    const contract = network.getContract('yacht');
    
    callback(contract);
}

module.exports = (function() {
    return{
        get_all_yachts: async function(req, res) {
            console.log('Getting all yachts from the blockchain...');
            connectToNetwork(async contract => {
                try {
                    const result = await contract.submitTransaction('queryAllYacht');
                    res.json(JSON.parse(result.toString()));
                    res.render("allyacht",{list: JSON.parse(result)});
                    
                } catch (error) {
                    console.error('Failed to query all yachts:', error);
                    res.status(500).json({ error: 'Failed to query all yachts' });
                }
            });
        },
        add_Yacht: async function(req, res) {
            connectToNetwork(async contract => {
                try {
                    var array       = req.params.yacht.split('_');
                    var key         = array[0];
                    var shipid      = array [1];
                    var location    = array[2];
                    var logBook   = array[3];
                    var owner      = array[4];
                    var ipfs      = array[5];
                    var name      = array[6];
                    var model      = array[7];
                    var capacity      = array[8];
                    var description      = array[9];
                    var length      = array[10];
                    var width      = array[11];
                    var amenities      = array[12];
                    var crew      = array[13];
                    var safetyfeatures      = array[14];
            
    
                    await contract.submitTransaction('addYacht', key, shipid, location, logBook, owner, ipfs, name, model, capacity, description, length, width, amenities, crew, safetyfeatures);
                    console.log(array)
                    console.log('Transaction has been submitted');
                    res.json({message:"Transaction has been submitted"});
                } catch (error) {
                    console.error(error);
                }
            });
        },
        book_yacht: async function(req, res) {
            connectToNetwork(async contract => {
                try {
                    var array       = req.params.yacht.split('_');
                    var key         = array[0];
                    var timestampfrom   = array[1];
                    var timestampto     = array[2];
    
                    await contract.submitTransaction('book', key, timestampfrom, timestampto);
                    console.log(array)
                    console.log('Transaction has been submitted');
                    res.json({message:"Transaction has been submitted"});
                } catch (error) {
                    console.error(error);
                }
            });
        },
        sign_company: async function(req, res) {
            connectToNetwork(async contract => {
                try {
                    var array       = req.params.yacht.split('_');
                    var key         = array[0];
                    var signaturecompany   = array[1];
    
                    await contract.submitTransaction('signcompany', key, signaturecompany);
                    console.log(array)
                    console.log('Transaction has been submitted');
                    res.json({message:"Transaction has been submitted"});
                } catch (error) {
                    console.error(error);
                }
            });
        },
        sign_skipper: async function(req, res) {
            connectToNetwork(async contract => {
                try {
                    var array       = req.params.yacht.split('_');
                    var key         = array[0];
                    var signatureskipper   = array[1];
    
                    await contract.submitTransaction('signskipper', key, signatureskipper);
                    console.log(array)
                    console.log('Transaction has been submitted');
                    res.json({message:"Transaction has been submitted"});
                } catch (error) {
                    console.error(error);
                }
            });
        },
        remove_booking: async function(req, res) {
            connectToNetwork(async contract => {
                try {
                    var array       = req.params.yacht.split('_');
                    var key         = array[0];
    
                    await contract.submitTransaction('removebooking', key);
                    console.log(array)
                    console.log('Transaction has been submitted');
                    res.json({message:"Transaction has been submitted"});
                } catch (error) {
                    console.error(error);
                }
            });
        }


    }
})();
