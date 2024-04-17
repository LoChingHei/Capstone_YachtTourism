package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-protos-go/peer"
)

// SmartContract structure
type SmartContract struct {
}

// Yacht data
type Yacht struct {
	ShipId            string   `json:"shipid"`
	Location          string   `json:"location"`
	LogBook           string   `json:"logbook"`
	Owner             string   `json:"owner"`
	SignatureCompany  string   `json:"signatureC"`
	SignatureSkipper  string   `json:"signatureS"`
	Booking           bool     `json:"booking"`
	TimestampFrom     string   `json:"timestampfrom"`
	TimestampTo       string   `json:"timestampto"`
	Allbooking        [][]string `json:"allbooking"`
	IPFS              string   `json:"ipfs"`
	Name              string   `json:"name"`
    	Model             string   `json:"model"`
    	Capacity          string   `json:"capacity"`
    	Description       string   `json:"description"`
    	Length            string   `json:"length"`
    	Width             string   `json:"width"`
    	Amenities         string   `json:"amenities"`
    	Crew              string   `json:"crew"`
    	SafetyFeatures    string   `json:"safetyFeatures"`
}

/*
Init method

 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

/*Invoke*/
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) peer.Response {

	function, args := APIstub.GetFunctionAndParameters()

	if function == "queryYacht" {
		return s.queryYacht(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "addYacht" {
		return s.addYacht(APIstub, args)
	} else if function == "queryAllYacht" {
		return s.queryAllYacht(APIstub)
	} else if function == "book" {
		return s.book(APIstub, args)
	} else if function == "signcompany"{
		return s.signcompany(APIstub, args)
	} else if function == "signskipper"{
		return s.signskipper(APIstub, args)
	} else if function == "removebooking"{
		return s.removebooking(APIstub, args)
	}
	return shim.Error("Invalid Smart Contract function name.")
}

/* queryyacht method One Yacht//done
 */
func (s *SmartContract) queryYacht(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments - expecting 1")
	}

	yachtAsBytes, _ := APIstub.GetState(args[0])
	if yachtAsBytes == nil {
		return shim.Error("Could find this yacht.")
	}
	return shim.Success(yachtAsBytes)
}

/* initLedger method //done
 * Used to add default data
 * Default ledger in blockchain
 */
func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) peer.Response {
	yacht := []Yacht{
		Yacht{ShipId: "80F 3476", Location:"67.0006, -70.4576", LogBook: "Hash", Owner: "John", SignatureCompany: "", SignatureSkipper:"", Booking:false, TimestampFrom:"", TimestampTo:"", Allbooking: [][]string{{"1713585600", "1713758400"}, {"1714017600", "1714104000"}}, IPFS: "https://bafybeidzrnffghqo35mh6nzdakioweg5zn5ad74jjwgzpsrkishnwrfkky.ipfs.cf-ipfs.com/", Name: "Blue Moon", Model: "Ocean Voyager", Capacity: "10 guests", Description: "Luxury yacht with spacious cabins and stunning ocean views. Perfect for a relaxing getaway.", Length: "50 ft", Width: "20 ft", Amenities: "Jacuzzi, BBQ grill", Crew: "Captain, Chef, Steward", SafetyFeatures: "Life jackets, fire extinguishers" },
		Yacht{ShipId: "35M 3314", Location:"40.6064, -73.6745", LogBook: "Hash", Owner: "Peter", SignatureCompany: "sign", SignatureSkipper:"DID_S", Booking:true, TimestampFrom:"1706954400", TimestampTo:"1707127200", Allbooking: [][]string{}, IPFS: "https://bafybeiexopp6sdls4fix3nwjib4reiytgxoevtb4luur4tlb6glcbm26eu.ipfs.cf-ipfs.com/", Name: "Green Wave", Model: "Sea Yacht", Capacity: "5 guests", Description: "Luxury yacht with spacious cabins.", Length: "20 ft", Width: "10 ft", Amenities: "Jacuzzi", Crew: "Captain", SafetyFeatures: "Life jackets" },
		Yacht{ShipId: "92F 8193", Location:"46.147656, -1.163943", LogBook: "Hash", Owner: "Anna", SignatureCompany: "", SignatureSkipper:"DID_S", Booking:false, TimestampFrom:"", TimestampTo:"", Allbooking: [][]string{}, IPFS: "https://bafybeihggywdwg2np5j2froc62h3ybf2wxhng4jquwnpbvoaimnntujckq.ipfs.cf-ipfs.com/", Name: "Flying the Seas", Model: "Sea Voyager", Capacity: "7 guests", Description: "Luxury yacht to travel around the world.", Length: "40 ft", Width: "15 ft", Amenities: "BBQ grill", Crew: "Captain, Chef", SafetyFeatures: "fire extinguishers" },
		Yacht{ShipId: "45C 8822", Location: "33.6895, -118.0436", LogBook: "Hash", Owner: "Michael", SignatureCompany: "SeaLux", SignatureSkipper: "DID_S", Booking: true, TimestampFrom: "1743369600", TimestampTo: "1743462400", Allbooking: [][]string{}, IPFS: "https://bafybeig2w6agoaqdr43bytp3xlodl3xaedkofsmbxwobw4mgsyodawaahm.ipfs.cf-ipfs.com/", Name: "Sapphire Dream", Model: "Luxury Liner", Capacity: "12 guests", Description: "A magnificent luxury liner equipped with state-of-the-art amenities and opulent interiors.", Length: "100 ft", Width: "30 ft", Amenities: "Helipad, Swimming pool, Cinema room", Crew: "Captain, First Officer, Chef, Butler, Housekeeping", SafetyFeatures: "Safety boats, CCTV surveillance" },
		Yacht{ShipId: "78K 6543", Location: "25.0343, -77.3963", LogBook: "Hash", Owner: "Emily", SignatureCompany: "Marine Haven", SignatureSkipper: "", Booking: false, TimestampFrom: "", TimestampTo: "", Allbooking: [][]string{{"1762060800", "1762147200"}, {"1762406400", "1762492800"}}, IPFS: "https://bafybeidm5i37kedzbize5cvh6z7n2crexfe4zsfnczfnqcfpb66xixfmfq.ipfs.cf-ipfs.com/", Name: "Ocean Serenity", Model: "Cruise Master", Capacity: "20 guests", Description: "A grand cruise master with lavish accommodations and panoramic views of the ocean.", Length: "150 ft", Width: "40 ft", Amenities: "Spa, Gym, Observatory deck", Crew: "Captain, Chief Engineer, Bartender, Spa Therapist", SafetyFeatures: "Life rafts, Emergency exits"},
		Yacht{ShipId: "22T 9988", Location: "41.9028, 12.4964", LogBook: "Hash", Owner: "Sophia", SignatureCompany: "", SignatureSkipper: "DID_S", Booking: true, TimestampFrom: "1783484800", TimestampTo: "1783571200", Allbooking: [][]string{}, IPFS: "https://bafybeicjc2wbflwcxvl3u52oks2n3tueiemkuxgvl3fnwszp72tqeaw2ce.ipfs.cf-ipfs.com/", Name: "Majestic Voyager", Model: "Ocean Explorer", Capacity: "8 guests", Description: "An elegant ocean explorer designed for luxurious expeditions to remote destinations.", Length: "80 ft", Width: "25 ft", Amenities: "Sauna, Barbecue area, Dive platform", Crew: "Captain, Dive Instructor, Steward", SafetyFeatures: "Emergency beacon, Sonar system"},
		Yacht{ShipId: "66R 7766", Location: "33.9416, -118.4085", LogBook: "Hash", Owner: "David", SignatureCompany: "Seafarers Inc.", SignatureSkipper: "", Booking: false, TimestampFrom: "", TimestampTo: "", Allbooking: [][]string{}, IPFS: "https://bafybeicugikyo77aaxbgp47zc744z3cddcgfhg4kgxws42t5oznbj7drnq.ipfs.cf-ipfs.com/", Name: "Sunset Explorer", Model: "Sunset Cruiser", Capacity: "6 guests", Description: "A sleek sunset cruiser offering unparalleled comfort and style for intimate voyages.", Length: "60 ft", Width: "18 ft", Amenities: "Sun deck, Cocktail bar", Crew: "Captain, Deckhand", SafetyFeatures: "Radar, GPS navigation"},
		Yacht{ShipId: "19P 3321", Location: "25.0343, -77.3963", LogBook: "Hash", Owner: "Robert", SignatureCompany: "Sailors Haven", SignatureSkipper: "DID_S", Booking: true, TimestampFrom: "1806835200", TimestampTo: "1806921600", Allbooking: [][]string{}, IPFS: "https://bafybeidplmh7iohw3kw5zcm6f77miy2xvf2kmm72tcpfd4xmgyjhzhhkti.ipfs.cf-ipfs.com/", Name: "Golden Breeze", Model: "Sailor's Delight", Capacity: "4 guests", Description: "A charming sailboat designed for intimate journeys along scenic coastlines.", Length: "40 ft", Width: "12 ft", Amenities: "Galley kitchen, Hammocks", Crew: "Captain, Deckhand", SafetyFeatures: "Lifebuoys, Navigation lights"},
		Yacht{ShipId: "88W 1234", Location: "51.5074, -0.1278", LogBook: "Hash", Owner: "Olivia", SignatureCompany: "Oceanic Ventures", SignatureSkipper: "", Booking: false, TimestampFrom: "", TimestampTo: "", Allbooking: [][]string{}, IPFS: "https://bafybeifbjdmgy3d27tmpasmtdxia6pqggkqdcr6w3l2mh2mvpl7e2efige.ipfs.cf-ipfs.com/", Name: "Azure Horizon", Model: "Ocean Explorer", Capacity: "10 guests", Description: "A sophisticated ocean explorer offering unmatched luxury and adventure.", Length: "60 ft", Width: "22 ft", Amenities: "Sky lounge, Jet ski", Crew: "Captain, First Mate, Chef", SafetyFeatures: "Emergency generator, Satellite communication"},
	}

	i := 0
	for i < len(yacht) {
		yachtAsBytes, _ := json.Marshal(yacht[i])
		APIstub.PutState(strconv.Itoa(i+1), yachtAsBytes)
		i = i + 1
	}
	return shim.Success(nil)
}

/* record method //Done
 * Used to add yacht data to yacht records
 * Accept five argument - key, ShipId, location, logbook, owner, ipfs
 */
func (s *SmartContract) addYacht(APIstub shim.ChaincodeStubInterface, args []string) peer.Response {
	if len(args) != 15 {
		return shim.Error("Invalid number of arguments - expecting 15")
	}
	var yacht = Yacht{ShipId: args[1], Location: args[2], LogBook: args[3], Owner: args[4], SignatureCompany: "", SignatureSkipper: "", Booking: false, TimestampFrom: "", TimestampTo: "", Allbooking: [][]string{}, IPFS: "https://fuchsia-absent-goose-826.mypinata.cloud/ipfs/QmUjoJZswNVWysApba8mUgCix2PsaaiTKhdGbVcfNxSJVZ", Name: args[6], Model: args[7], Capacity: args[8], Description: args[9], Length: args[10], Width: args[11], Amenities: args[12], Crew: args[13], SafetyFeatures: args[14],}
	yachtAsBytes, _ := json.Marshal(yacht)
	err := APIstub.PutState(args[0], yachtAsBytes)
	if err != nil {
		return shim.Error("Failed to record new yacht")
	}
	return shim.Success(nil)
}



/*
Book a yacht //done
accept three argument - key, from date, to date
*/
func (s *SmartContract) book(APIstub shim.ChaincodeStubInterface, args []string) peer.Response{
	if len(args) != 3 {
		return shim.Error("Invalid number of arguments - expecting 3")
	}
	yachtAsBytes, _ := APIstub.GetState(args[0])
	if yachtAsBytes == nil {
		return shim.Error("Can not find the yacht record")
	}
	yacht := Yacht{}
	json.Unmarshal(yachtAsBytes, &yacht)
	//check whether yacht was booked
	if yacht.Booking == true {
		return shim.Error("The Yacht was booked!")
	}
	//record booking
	yacht.Booking = true
	yacht.SignatureCompany = ""
	yacht.TimestampFrom = args[1]
	yacht.TimestampTo = args[2]
	booking := []string{args[1], args[2]}
	yacht.Allbooking = append(yacht.Allbooking, booking)
	yachtAsBytes, _ = json.Marshal(yacht)
	err := APIstub.PutState(args[0], yachtAsBytes)
	if err != nil {
		return shim.Error("Booking failed.")
	}
	return shim.Success(nil)
}

func (s *SmartContract) removebooking(APIstub shim.ChaincodeStubInterface, args []string) peer.Response{
	if len(args) != 1 {
		return shim.Error("Invalid number of arguments - expecting 3")
	}
	yachtAsBytes, _ := APIstub.GetState(args[0])
	if yachtAsBytes == nil {
		return shim.Error("Can not find the yacht record")
	}
	yacht := Yacht{}
	json.Unmarshal(yachtAsBytes, &yacht)
	//record booking
	yacht.Booking = false
	if len(yacht.Allbooking) > 0 {
		yacht.Allbooking = yacht.Allbooking[:len(yacht.Allbooking)-1]
	}
	yachtAsBytes, _ = json.Marshal(yacht)
	err := APIstub.PutState(args[0], yachtAsBytes)
	if err != nil {
		return shim.Error("Remove Booking failed.")
	}
	return shim.Success(nil)
}


/*signature skipper // done
accept two arguments key, and skipper signiture
*/
func (s *SmartContract) signskipper(APIstub shim.ChaincodeStubInterface, args []string) peer.Response{
	if len(args) != 2 {
		return shim.Error("Invalid number of arguments - expecting 2")
	}

	yachtAsBytes, _ := APIstub.GetState(args[0])
	if yachtAsBytes == nil {
		return shim.Error("Can not find yacht record")
	}
	yacht := Yacht{}
	json.Unmarshal(yachtAsBytes, &yacht)
	yacht.SignatureSkipper = args[1]
	yachtAsBytes, _ = json.Marshal(yacht)
	err := APIstub.PutState(args[0], yachtAsBytes)
	if err != nil {
		return shim.Error("Sign failed.")
	}
	return shim.Success(nil)
}
// sign company
func (s *SmartContract) signcompany(APIstub shim.ChaincodeStubInterface, args []string) peer.Response{
	if len(args) != 2 {
		return shim.Error("Invalid number of arguments - expecting 2")
	}

	yachtAsBytes, _ := APIstub.GetState(args[0])
	if yachtAsBytes == nil {
		return shim.Error("Can not find yacht record")
	}
	yacht := Yacht{}
	json.Unmarshal(yachtAsBytes, &yacht)
	yacht.SignatureCompany = args[1]
	yacht.Booking = false
	yachtAsBytes, _ = json.Marshal(yacht)
	err := APIstub.PutState(args[0], yachtAsBytes)
	if err != nil {
		return shim.Error("Sign failed.")
	}
	return shim.Success(nil)
}


/* queryAllYacht method //done
 */
func (s *SmartContract) queryAllYacht(APIstub shim.ChaincodeStubInterface) peer.Response {
	startKey := "0"
	endKey := "999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}

		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")
	fmt.Printf(" - queryAllYacht: \n%s\n", buffer.String())
	return shim.Success(buffer.Bytes())
}



/* main function
 * start the chaincode in the container during the instantiation
 */
func main() {

	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new smart contract: %s", err)
	}
}
