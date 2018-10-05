function nestle_login()
 {  invokeitem();
	  var username = document.getElementById("email").value;
	  var pwd = document.getElementById("pwd").value; 
		
	  if((username == "techmahindra@org.in") && (pwd == "123")) 
	  {  
		 // window.location="buyer-NestleFP.html"; 
		 console.log("success");
	  } else {
		  alert("Enter the valid Username and Password");
	  }
	     return false;
 }
function supplier_login()
{  
	  var username = document.getElementById("email").value;
	  var pwd = document.getElementById("pwd").value; 
		
	  if((username == "Frank@supplier.in") && (pwd == "123")) 
	  {
		  
		  window.location="supplier-details.html"; 
	  } else {
		  alert("Enter the valid Username and Password");
	  }
	     return false;
}
 
function customs_login()
{  
	  var username = document.getElementById("email").value;
	  var pwd = document.getElementById("pwd").value; 
		
	  if((username == "Stephen@ymg.com") && (pwd == "123")) 
	  {
		  
		  window.location="customs-world.html"; 
	  } else {
		  alert("Enter the valid Username and Password");
	  }
	     return false;
}
 
function transport_login()
{  
	  var username = document.getElementById("email").value;
	  var pwd = document.getElementById("pwd").value; 
		
	  if((username == "Roghan@trans.in") && (pwd == "123")) 
	  {
		  
		  window.location="transport-PO.html"; 
	  } else {
		  alert("Enter the valid Username and Password");
	  }
	     return false;
}
 function invokeitem()
 {
	 		var jsonBlob={
						"header" : {
							"event_const" : "CNST_CREATEITEMS",
							"head_id" : 123
						},
						"jsonblob" : {
									"key":"Key_001",
									"supplier_id":"8888",
									"item_id":"IT_001_SP_001",
									"item":"coffee bean",
									"quantity":"50",
									"price_unit":"500"
								 }
						}


						var jsonBlobUpd = JSON.stringify(jsonBlob);
						
						$.ajax({ 
	
		url:"/invoke",
	    type: "post",                   //Type of request, can be PUT,POST,GET,DELETE
	    dataType: "json",        //Type of data to be sent in the body.
	    contentType: "application/json",
		data: jsonBlobUpd,                       
		success:function(response){
			
			if(response.status === "success")
			{
				console.log("success");
				console.log("data",json_blob);
				}
		},
	    error: function(jqXHR, textStatus, errorThtrown) {
			console.log(textStatus);
	        }
	                                                                             
	
	  });
			}		
