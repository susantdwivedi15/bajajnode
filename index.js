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
	
	var equation1 = '(Operand1*Operand2)+Operand3+(Operand4*Operand5)'; 
	var equation2 = '(Operand1*Operand2)+Operand3+(Operand4*Operand5)*Operand3*Operand2*Operand1';
	var equation3 = 'Min((((Operand1*Operand2)+Operand3+(Operand4*Operand5))*Operand3*Operand2*Operand1),(Operand1*Operand2)+Operand3+(Operand4*Operand5))';
	var equation4 = 'Max((((Operand1*Operand2)+Operand3+(Operand4*Operand5))*Operand3*Operand2*Operand1),(Operand1*Operand2)+Operand3+(Operand4*Operand5))';
	//var strJSon = '{"Operand1":78,"Operand2":89,"Operand3":99,"Operand4":55,"Operand5":2,"Min":"Math.min","Max":"Math.max"}';
	//var strJSon = '{"Operand1":78,"Operand2":89,"Operand3":99,"Operand4":55,"Operand5":2,"Min":"Math.min","Max":"Math.max","preapprove":"10000","orpvehicle":"48000","model":"ECONOMY"}';
	//var strJSon = '{"Operand1":78,"Operand2":89,"Operand3":99,"Operand4":55,"Operand5":2,"Min":"Math.min","Max":"Math.max","preapprove":"10000","orpvehicle":"45000","model":"ECONOMY", "productcategory":"2 Wheeler", "repaymentMode":"DCC","maketype":"KTM"}';
	var equation7 = 'Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232))';
	var equation5 = '(Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232)) > 0) && (Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232))<0)';
	var equation6 = '(Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232)) > 0) && (Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232))<0)';
	//var equation8 = 'Max(preapprove,Min(orpvehicle*.85,(model==="ECONOMY"?50000:if(model==="Executive":70000:if(model==="PREMIUM",85000,if(model==="Racing-1",110000,if(model==="Racing-2",110000)))))))';
	//var equation8 = 'Max(preapprove,Min(orpvehicle*.85,(("model"=="ECONOMY")?50000:(("model"=="Executive")?70000:(("model"=="PREMIUM"),85000,(("model"=="Racing-1")?110000:(("model"=="Racing-2")?110000:0)))))))';
	//var equation8 = 'Max(preapprove,Min(orpvehicle*.85,("model"=="ECONOMY")?50000:("model"=="Executive")?70000:("model"=="PREMIUM"),85000,("model"=="Racing-1")?110000:("model"=="Racing-2")?110000:0))';// )))))';
	var equation8 = '(("productcategory" == "2 Wheller"  && "repaymentMode" == "DCC" && "maketype" == "KTM")?Max(preapprove,Min(orpvehicle*.85,(("model"=="ECONOMY")?50000:(("model"=="Executive")?70000:(("model"=="PREMIUM"),85000,(("model"=="Racing-1")?110000:(("model"=="Racing-2")?110000:0))))))): (Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232)) > 0) && (Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232))<0))';

	//var calc = new Calculation();
	//response.send(Calculation.evaluateExpressionData(strJSon,equation7));
	//console.log(Calculation('',''));
	let equation = request.query.equation;
	let loop1 = request.query.loop1;
	let loop2 = request.query.loop2;
	let loop3 = request.query.loop3;
	let strJSon = request.query.jsonStr;
	
	// console.log('====equation'+equation8);
	// console.log('====loop1'+loop1);
	// console.log('====loop2'+loop2);
	// console.log('====loop3'+loop3);

	var Today = new Date();
	var startTime = Today.getTime(); 
	var today = new Date();
            h = today.getHours(),
            m = today.getMinutes(),
            s = today.getSeconds();
	console.log(h + ":" + m + ":" + s);
	var result= Calculation.evaluateExpressionData(strJSon,equation,loop1,loop2,loop3);
	console.log(startTime - Today.getTime());

	response.status(200).json({
        message: String(result)
    });
	//response.status(200).send(String(result));
	//status(200).send('some text');
	console.log(startTime - Today.getTime());
	
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


