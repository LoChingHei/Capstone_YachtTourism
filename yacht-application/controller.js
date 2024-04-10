const { Wallets, Gateway, DefaultEventHandlerStrategies } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function connectToNetwork(callback) {
    const walletPath = path.resolve(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet: wallet,
        identity: 'User1@org1.example.com',
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('yacht');

    callback(contract);
}

module.exports = {
    get_all_yachts: async function(req, res) {
        console.log('Getting all yachts from the blockchain...');
        connectToNetwork(async contract => {
            try {
                const result = await contract.submitTransaction('queryAllYacht');
                res.json(JSON.parse(result.toString()));
            } catch (error) {
                console.error('Failed to query all yachts:', error);
                res.status(500).json({ error: 'Failed to query all yachts' });
            }
        });
    },
    add_yacht: async function(req, res) {
        connectToNetwork(async contract => {
            try {
                
            } catch (error) {
                console.error('Failed to add yacht:', error);
                res.status(500).json({ error: 'Failed to add yacht' });
            }
        });
    },
    book_yacht: async function(req, res) {
        connectToNetwork(async contract => {
            try {
                
            } catch (error) {
                console.error('Failed to book yacht:', error);
                res.status(500).json({ error: 'Failed to book yacht' });
            }
        });
    },
    sign_company: async function(req, res) {
        connectToNetwork(async contract => {
            try {
                
            } catch (error) {
                console.error('Failed to add company signature:', error);
                res.status(500).json({ error: 'Failed to add company signature' });
            }
        });
    },
    sign_skipper: async function(req, res) {
        connectToNetwork(async contract => {
            try {
                
            } catch (error) {
                console.error('Failed to add skipper signature:', error);
                res.status(500).json({ error: 'Failed to add skipper signature' });
            }
        });
    },
    query_yacht: async function(req, res) {
        connectToNetwork(async contract => {
            try {
                
                }
                res.json(JSON.parse(result.toString()));
            } catch (error) {
                console.error('Failed to query yacht:', error);
                res.status(500).json({ error: 'Failed to query yacht' });
            }
        });
    }
};
