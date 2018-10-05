// Uncomment following to enable zipkin tracing, tailor to fit your network configuration:
// var appzip = require('appmetrics-zipkin')({
//     host: 'localhost',
//     port: 9411,
//     serviceName:'frontend'
// });

require('appmetrics-dash').attach();
require('appmetrics-prometheus').attach();
const appName = require('./../package').name;
const http = require('http');
const express = require('express');
const log4js = require('log4js');
const localConfig = require('./config/local.json');
const path = require('path');

const logger = log4js.getLogger(appName);
const app = express();
const server = http.createServer(app);

app.use(log4js.connectLogger(logger, { level: process.env.LOG_LEVEL || 'info' }));
const serviceManager = require('./services/service-manager');
require('./services/index')(app);
require('./routers/index')(app, server);

// Add your code here
/* invoke get code starta here */
var route = require('./route.js');
app.post('/invoke',function(request,reply){
	route.invoke(request,reply);
}) 


app.get('/query/GetItemForSupplier/:arg1',function(req,res){
//  console.log("req: jax: ");
                 route.queryGetItemForSupplier(req,res);

})



app.get('/query/GetAllPurchaseOrders',function(req,res){

                 route.queryGetAllPurchaseOrders(req,res);
})

app.get('/query/GetPurchaseOrder/:arg1',function(req,res){
  //console.log("req: jax: "+req.params.arg1);
                 route.queryGetPurchaseOrder(req,res);

})
/* 
invoke get code ends here */

const port = process.env.PORT || localConfig.port;
server.listen(port, function(){
  logger.info(`los listening on http://localhost:${port}/appmetrics-dash`);
  logger.info(`los listening on http://localhost:${port}`);
});

app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public', '404.html'));
});

app.use(function (err, req, res, next) {
    res.sendFile(path.join(__dirname, '../public', '500.html'));
});