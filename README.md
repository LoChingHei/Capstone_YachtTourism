# BlueWave Yacht Tourism

## Summary

`Our smart contract code is in 'chaincode' folder in .go file`

`Our front-end react app code is in the 'front-end-react-app' folder`

`Our backend Express application code is in the 'yacht-application' folder`

`Our report is in the 'BlueWave_Paper_Report.pdf' file`

`Our other documentation is in the 'Documentation' folder`

With the improvement in living standards, people are trying to increase their quality of life, in which luxury tourism is getting more and more popular. This project aimed to improve the experience in yacht rental by incorporating blockchain technology to enhance transparency, security, and efficiency. The main focus of the project is to seamlessly track and manage the delivery and storage of luxury yachts, foods and products associated with yacht trips. By leveraging blockchain technology, the project aims to ensure authenticity, reduce fraud, unify, and elevate the overall customer experience in the luxury yacht tourism industry. 

## Workflow

`List Yachts page allows to see list of yachts:`
![image](https://github.com/LoChingHei/Capstone_YachtTourism/assets/72778161/e5e73931-b7a0-48ff-b1ef-82a354e2942e)
![image](https://github.com/LoChingHei/Capstone_YachtTourism/assets/72778161/a9a8e824-d996-4f43-9121-328b8e4710c5)
![image](https://github.com/LoChingHei/Capstone_YachtTourism/assets/72778161/2128b897-ee96-4b6a-9cbd-de11a0a0b6ab)

`controller.js calls get_all_yachts function and HyperLedger Fabric network receives the request and provides the following list of yachts as a response on our Hyperledger Fabric network:`
![image](https://github.com/LoChingHei/Capstone_YachtTourism/assets/72778161/7e68dd73-876e-4811-be60-d26e9ddcaab0)
![image](https://github.com/LoChingHei/Capstone_YachtTourism/assets/72778161/6033a7ba-fb7a-4ba2-bc70-5d918612f0c1)

'Add Yacht page allows to add new yacht to list of yachts:'
![image](https://github.com/LoChingHei/Capstone_YachtTourism/assets/72778161/392285d4-c7db-49ef-aaf9-911e936872de)
`controller.js calls add_yacht function and HyperLedger Fabric network receives the request and provides the following response on our Hyperledger Fabric network meaning yacht was added successfully`
![image](https://github.com/LoChingHei/Capstone_YachtTourism/assets/72778161/9606a4b8-21c2-4996-af08-30febab652b4)
'New yacht 'Ocean Explorer Yacht' was added to the list of yachts with all the details we provided in the Add Yacht form as you can see:`
![image](https://github.com/LoChingHei/Capstone_YachtTourism/assets/72778161/7a4a18cb-61f3-4067-b272-5783b4caf20c)

## Project Plan
This project aimed to utilize Hyperledger Fabric to solve the problem in traditional yacht industry including: 

#### Lack of Transparency 

Traditional yacht rental services may lack transparency regarding yacht availability, pricing, terms of agreement, and the condition of the vessel. This can lead to misunderstandings and disputes between renters and yacht owners.

#### High Transaction Costs 

Yacht rental transactions typically involve intermediaries such as brokers, agents, and payment processors, leading to high transaction costs in terms of commissions, fees, and administrative overhead.

#### Identity Verification

Verifying the identities of renters and yacht owners, as well as ensuring trustworthiness and authenticity, can be challenging in traditional yacht rental services, leading to concerns about security and fraud.

#### Inefficient Processes

The rental process in traditional yacht rental services may involve manual paperwork, phone calls, and emails, leading to inefficiencies, delays, and errors in booking, payment processing, and documentation.

#### Disputes and Discrepancies

Disputes may arise between renters and yacht owners regarding rental terms, damages, cancellations, and liability, leading to legal complications, financial losses, and damage to reputation.

### In order to solve the problems, we plan to divide our project into main three components that target to the problems. 

#### Yacht Rental Booking and Payments

We aimed to implement smart contracts on the blockchain to streamline the booking and payment processes. The self-executing contracts with predefined rules and conditions enabled automatically execute payment transactions in yacht rental upon meeting specific criteria, such as confirming the booking and the start of the yacht trip.

#### Identifying the status of the Yacht

The idea is referenced to the supply chain management system on the blockchain, which utilizes the technology to ensure the transparency and traceability of the yacht and services provided to customers in the yacht trip. The yacht info and booking info will be recorded on an immutable ledger. Thus, this reduces the risk of fraud, counterfeiting, and ensures that customers receive high-quality experiences.

#### Identity verification and access control 

With the feature provided in private blockchain, the technology can deliver a secure and decentralized method for managing customer identities. The participants in the network, including yacht rental companies, customers, and skippers, can have a unique and verifiable digital identity. This ensures that only authorized individuals gain access to specific services, enhancing security and privacy.


## Team

Lo Ching Hei (101486171)

Kirill Spitsyn (101518315)

Kevon Vincent Jaggassar (101434025)  

## Requirements

`"fabric-samples" repository to run the testnet [4Gb of memory]` 

`Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12`

`Docker Engine: Version 17.03 or higher` 

`Docker-Compose: Version 1.8 or higher` 

`Node: 8.9 or higher (note version 9 is not supported)`

`npm: v5.x git: 2.9.x or higher`


## How to Use

Please refer to documentation.

## Note

For more information, please refer to the Documentation foler.
