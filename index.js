var cool=require('cool-ascii-faces');
var Calculation = require("./Calculation.js");
var express=require('express');
var app=express();
const {Pool, Client }= require('pg');

const config = {
	host: 'ec2-54-83-192-68.compute-1.amazonaws.com',
    user: 'wuozbydcovqbcb',
    database: 'd8om06551ce08p',
    password: '2008c9d644495866864c395bde71065ac521c74ab348b1b737469a5bb9c752db',
	port: 5432	
};

// pool takes the object above -config- as parameter
const pool = new Pool(config);

//Set port to app
app.set('port',(process.env.PORT || 5001));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



//Connect to database using client
const client= new Client({
  
    connectionString: process.env.DATABASE_URL,
     ssl: true,
});
client.connect();



app.get('/', function(request, response) {
	
	var numData2 = '(Operand1*Operand2)+Operand3+(Operand4*Operand5)'; 
	var numData3 = '(Operand1*Operand2)+Operand3+(Operand4*Operand5)*Operand3*Operand2*Operand1';
	var numData4 = 'Min((((Operand1*Operand2)+Operand3+(Operand4*Operand5))*Operand3*Operand2*Operand1),(Operand1*Operand2)+Operand3+(Operand4*Operand5))';
	var numData5 = 'Max((((Operand1*Operand2)+Operand3+(Operand4*Operand5))*Operand3*Operand2*Operand1),(Operand1*Operand2)+Operand3+(Operand4*Operand5))';
	var strJSon = '{"Operand1":78,"Operand2":89,"Operand3":99,"Operand4":55,"Operand5":2,"Min":"Math.min","Max":"Math.max"}';
	var equation7 = 'Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232))';
	var numData6 = '(Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232)) > 0) && (Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232))<0)';
	//var calc = new Calculation();
	//response.send(Calculation.evaluateExpressionData(strJSon,equation7));
	//console.log(Calculation('',''));
	var Today = new Date();
	var startTime = Today.getTime(); 
	var today = new Date();
            h = today.getHours(),
            m = today.getMinutes(),
            s = today.getSeconds();
	console.log(h + ":" + m + ":" + s);
	var result= Calculation.evaluateExpressionData(strJSon,numData6);
	response.send(result);
	console.log(startTime - Today.getTime());
	
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


