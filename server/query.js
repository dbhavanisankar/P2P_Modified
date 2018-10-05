'use strict';
/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
/*
 * Chaincode query
 */

var Fabric_Client = require('fabric-client');
var path = require('path');
var util = require('util');
var os = require('os');
var creds= require('../creds.json');
//
var fabric_client = new Fabric_Client();

// setup the fabric network
var channel = fabric_client.newChannel('defaultchannel');
var peer = fabric_client.newPeer('grpcs://nc72ac8e335ef4507a137de7a1a2fe4ea-org1-peer1.us05.blockchain.ibm.com:31002',{pem:creds.peers["org1-peer1"].tlsCACerts.pem, 'ssl-target-name-override': null});
channel.addPeer(peer);
var store_path = path.join(__dirname, 'hfc-key-store');
console.log('Store path:'+store_path);
var tx_id = null;
//modifications
exports.querySDK = function (fnName,request,reply) {
    var func_name = fnName;
    console.log ("Function Name Rcvd:"+func_name);
    if(func_name == "GetAllPurchaseOrders"){
             
    }
    if(func_name == "GetPurchaseOrder"){
          var arg1_f3 = request.params.arg1;
    }
    if(func_name == "GetItemForSupplier"){
        var arg1_f4 = request.params.arg1;
    }
    if(func_name == "CreateGNR"){
        var arg1_f5 = request.params.arg1;
		//var arg1_f6 = request.params.arg2;
	} 

//modifications ends here
// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
Fabric_Client.newDefaultKeyValueStore({ path: store_path
}).then((state_store) => {
	// assign the store to the fabric client
	fabric_client.setStateStore(state_store);
	var crypto_suite = Fabric_Client.newCryptoSuite();
	// use the same location for the state store (where the users' certificate are kept)
	// and the crypto store (where the users' keys are kept)
	var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
	crypto_suite.setCryptoKeyStore(crypto_store);
	fabric_client.setCryptoSuite(crypto_suite);

	// get the enrolled user from persistence, this user will sign all requests
	return fabric_client.getUserContext('user1', true);
}).then((user_from_store) => {
	if (user_from_store && user_from_store.isEnrolled()) {
		console.log('Successfully loaded user1 from persistence');
		member_user = user_from_store;
	} else {
		throw new Error('Failed to get user1.... run registerUser.js');
	}

	// queryCar chaincode function - requires 1 argument, ex: args: ['CAR4'],
	// queryAllCars chaincode function - requires no arguments , ex: args: [''],
	const request = {
		//targets : --- letting this default to the peers assigned to the channel
		chaincodeId: 'P2P'
		
	};

	// send the query proposal to the peer
	 var transaction_id = client.newTransactionID();
    console.log("Assigning transaction_id: ", transaction_id._transaction_id);

    if(func_name == "getDetailsByPurchaseOrder"){
         const request = {
                chaincodeId: options.chaincode_id,
                txId: transaction_id,
                fcn: func_name,
				args: [arg1_f1]
                //args: []
            };
             console.log("Calling One getDetailsByPurchaseOrder Function..");
            return channel.queryByChaincode(request);
    }
	if(func_name == "getAllPOOrders"){
         const request = {
                chaincodeId: options.chaincode_id,
                txId: transaction_id,
                fcn: func_name,
				//args: [arg1_f1]
                args: []
            };
             console.log("Calling One getAllPOOrders Function..");
            return channel.queryByChaincode(request);
    }
	if(func_name == "getDetailsByItemNo"){
         const request = {
                chaincodeId: options.chaincode_id,
                txId: transaction_id,
                fcn: func_name,
				args: [arg1_f2]
                //args: []
            };
             console.log("Calling One getDetailsByItemNo Function..");
            return channel.queryByChaincode(request);
    }
	if(func_name == "getShippingAddressByDeliverTo"){
         const request = {
                chaincodeId: options.chaincode_id,
                txId: transaction_id,
                fcn: func_name,
				args: [arg1_f3]
                //args: []
            };
             console.log("Calling One getShippingAddressByDeliverTo Function..");
            return channel.queryByChaincode(request);
    }

	//return channel.queryByChaincode(request);
}).then((query_responses) => {
	console.log("Query has completed, checking results");
	// query_responses could have more than one  results if there multiple peers were used as targets
	if (query_responses && query_responses.length == 1) {
		if (query_responses[0] instanceof Error) {
			console.error("error from query = ", query_responses[0]);
		} else {
			console.log("Response is ", query_responses[0].toString());
		}
	} else {
		console.log("No payloads were returned from query");
	}
}).catch((err) => {
	console.error('Failed to query successfully :: ' + err);
});
};