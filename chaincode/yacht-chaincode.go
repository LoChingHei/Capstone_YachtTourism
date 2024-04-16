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
		Yacht{ShipId: "80F 3476", Location:"67.0006, -70.4576", LogBook: "Hash", Owner: "John", SignatureCompany: "", SignatureSkipper:"", Booking:false, TimestampFrom:"", TimestampTo:"", Allbooking: [][]string{{"1713585600", "1713758400"}, {"1714017600", "1714104000"}}, IPFS: "https://bafybeidzrnffghqo35mh6nzdakioweg5zn5ad74jjwgzpsrkishnwrfkky.ipfs.cf-ipfs.com/", Name: "Blue Moon", Model: "Ocean Voyager", Capacity: "10 guests", Description: "Luxury yacht with spacious cabins and stunning ocean views. Perfect for a relaxing getaway.", Length: "50 ft", Width: "20 ft", Amenities: "Jacuzzi, BBQ grill", Crew: "Captain, Chef, Steward", SafetyFeatures: "Life jackets, fire extinguishers", },
		Yacht{ShipId: "35M 3314", Location:"40.6064, -73.6745", LogBook: "Hash", Owner: "Peter", SignatureCompany: "sign", SignatureSkipper:"DID_S", Booking:true, TimestampFrom:"1706954400", TimestampTo:"1707127200", Allbooking: [][]string{}, IPFS: "https://bafybeiexopp6sdls4fix3nwjib4reiytgxoevtb4luur4tlb6glcbm26eu.ipfs.cf-ipfs.com/", Name: "Green Wave", Model: "Sea Yacht", Capacity: "5 guests", Description: "Luxury yacht with spacious cabins.", Length: "200 ft", Width: "10 ft", Amenities: "Jacuzzi", Crew: "Captain", SafetyFeatures: "Life jackets", },
		Yacht{ShipId: "92F 8193", Location:"46.147656, -1.163943", LogBook: "Hash", Owner: "Anna", SignatureCompany: "", SignatureSkipper:"DID_S", Booking:false, TimestampFrom:"", TimestampTo:"", Allbooking: [][]string{}, IPFS: "https://bafybeidm5i37kedzbize5cvh6z7n2crexfe4zsfnczfnqcfpb66xixfmfq.ipfs.cf-ipfs.com/", Name: "Flying the Seas", Model: "Sea Voyager", Capacity: "7 guests", Description: "Luxury yacht to travel around the world.", Length: "40 ft", Width: "15 ft", Amenities: "BBQ grill", Crew: "Captain, Chef", SafetyFeatures: "fire extinguishers", },
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
	if len(args) != 14 {
		return shim.Error("Invalid number of arguments - expecting 6")
	}
	var yacht = Yacht{ShipId: args[1], Location: args[2], LogBook: args[3], Owner: args[4], SignatureCompany: "", SignatureSkipper: "", Booking: false, TimestampFrom: "", TimestampTo: "", Allbooking: [][]string{}, IPFS: args[5], Name: args[6], Model: args[7], Capacity: args[8], Description: args[9], Length: args[10], Width: args[11], Amenities: args[12], Crew: args[13], SafetyFeatures: args[14],}
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
	if len(args) != 12 {
		return shim.Error("Invalid number of arguments - expecting 12")
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
	yacht.Name = args[3]
    	yacht.Model = args[4]
    	yacht.Capacity = args[5]
    	yacht.Description = args[6]
    	yacht.Length = args[7]
    	yacht.Width = args[8]
    	yacht.Amenities = args[9]
    	yacht.Crew = args[10]
    	yacht.SafetyFeatures = args[11]
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
