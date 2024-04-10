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
                var array       = req.params.tuna.split('_');
                const yacht = {
                    ShipId: ShipId,
                    Location: Location,
                    LogBook: LogBook,
                    Owner: Owner,
                    SignatureCompany: "",
                    SignatureSkipper: "",
                    Booking: false,
                    TimestampFrom: "",
                    TimestampTo: "",
                    Allbooking: []
                };
                await contract.submitTransaction('addYact', JSON.stringify(yacht));
                console.log('Yacht added successfully');
                res.json({ message: 'Yacht added successfully' });
            } catch (error) {
                console.error('Failed to add yacht:', error);
                res.status(500).json({ error: 'Failed to add yacht' });
            }
        });
    },
    book_yacht: async function(req, res) {
        connectToNetwork(async contract => {
            try {
                const { key, from, to } = req.body;
                await contract.submitTransaction('book', key, from, to);
                console.log('Yacht booking successful');
                res.json({ message: 'Yacht booking successful' });
            } catch (error) {
                console.error('Failed to book yacht:', error);
                res.status(500).json({ error: 'Failed to book yacht' });
            }
        });
    },
    sign_company: async function(req, res) {
        connectToNetwork(async contract => {
            try {
                const { key, signature } = req.body;
                await contract.submitTransaction('signcompany', key, signature);
                console.log('Company signature added successfully');
                res.json({ message: 'Company signature added successfully' });
            } catch (error) {
                console.error('Failed to add company signature:', error);
                res.status(500).json({ error: 'Failed to add company signature' });
            }
        });
    },
    sign_skipper: async function(req, res) {
        connectToNetwork(async contract => {
            try {
                const { key, signature } = req.body;
                await contract.submitTransaction('signskipper', key, signature);
                console.log('Skipper signature added successfully');
                res.json({ message: 'Skipper signature added successfully' });
            } catch (error) {
                console.error('Failed to add skipper signature:', error);
                res.status(500).json({ error: 'Failed to add skipper signature' });
            }
        });
    },
    query_yacht: async function(req, res) {
        connectToNetwork(async contract => {
            try {
                const { key } = req.params;
                const result = await contract.evaluateTransaction('queryYacht', key);
                if (!result) {
                    console.error('No yacht found for the given key');
                    res.status(404).json({ error: 'No yacht found for the given key' });
                    return;
                }
                res.json(JSON.parse(result.toString()));
            } catch (error) {
                console.error('Failed to query yacht:', error);
                res.status(500).json({ error: 'Failed to query yacht' });
            }
        });
    }
};
