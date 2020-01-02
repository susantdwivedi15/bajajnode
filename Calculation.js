
function Calculation () {
    var nodeEval = require('node-eval');
    var replaceString = require('replace-string');

    this.evalExpression = function(strEvalExprsn){
        var rtrnEval;
        for(var j=0 ;j < 5000;j++){
            rtrnEval = nodeEval(strEvalExprsn);
            //console.log(j+'=====rtrnEval====='+rtrnEval);
        }
       return rtrnEval;
    }

    function objToStrMap(obj) {
        var strMap = new Map();
        for(var j=0 ;j < 5000;j++){
            for (var k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
            }
        }
        return strMap;
    }

    function jsonToStrMap(jsonStr) {
        return objToStrMap(JSON.parse(jsonStr));
    }

    // This is used to calculate maximum from list
    this.replaceWithData = function (jsonString, strExpnData){
        var datanew = jsonToStrMap(jsonString);
        for (var k of datanew.keys()){
            strExpnData = strExpnData.split(k).join(datanew.get(k));
            //strExpnData = strExpnData.replace(k,datanew.get(k));
        }
        return strExpnData;
    }

    this.checkTime = function (i) {
        return (i < 10) ? "0" + i : i;
    }

    // This is used to calculate maximum from list
    this.checkMaxInOprtn = function (operationLst){
        var maxmun = operationLst[0];
        for(var i=1;i < operationLst.length;i++){
            maxmun = Math.max(maxmun,operationLst[i]);
        }
        return maxmun;
    }

    // This is used to calculate minimum from list
    this.checkMinInOprtn = function (operationLst){
        var minimun = operationLst[0];
        for(var i=1;i< operationLst.length;i++){
            minimun = Math.min(minimun,operationLst[i]);
        }
        return minimun;
    }

    // This is used to calculate minimum from list
    this.evaluateExpressionData = function (jsonString, strExpnData){
        var minimun = this.replaceWithData(jsonString,strExpnData);
        var datatoGet = this.evalExpression(minimun);
        return datatoGet;
    }
}
/*
var calc1 = new Calculation();
var Today = new Date();
var startTime = Today.getTime();
var today = new Date();
            h = calc1.checkTime(today.getHours()),
            m = calc1.checkTime(today.getMinutes()),
            s = calc1.checkTime(today.getSeconds());
console.log(h + ":" + m + ":" + s);
var numData2 = '(Operand1*Operand2)+Operand3+(Operand4*Operand5)';
var numData3 = '(Operand1*Operand2)+Operand3+(Operand4*Operand5)*Operand3*Operand2*Operand1';
var numData4 = 'Min((((Operand1*Operand2)+Operand3+(Operand4*Operand5))*Operand3*Operand2*Operand1),(Operand1*Operand2)+Operand3+(Operand4*Operand5))';
var numData5 = 'Max((((Operand1*Operand2)+Operand3+(Operand4*Operand5))*Operand3*Operand2*Operand1),(Operand1*Operand2)+Operand3+(Operand4*Operand5))';
var strJSon = '{"Operand1":78,"Operand2":89,"Operand3":99,"Operand4":55,"Operand5":2,"Min":"Math.min","Max":"Math.max"}';
var equation7 = 'Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232))';
var numData6 = '(Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232)) > 0) && (Min((1.2*10000)+(-1*1200)+(2*13)+(-1*12004),(0.17*3232))<0)';
var calc = new Calculation();
console.log(calc.replaceWithData(strJSon,numData2));
console.log(calc.replaceWithData(strJSon,numData3));
var datalst = [];
console.log('====datalst====='+datalst);
datalst.push(calc.evalExpression(calc.replaceWithData(strJSon,numData2)));
datalst.push(calc.evalExpression(calc.replaceWithData(strJSon,numData3)));
console.log('====datalst====='+datalst);
console.log(calc.evalExpression(calc.replaceWithData(strJSon,numData2)));
console.log(calc.evalExpression(calc.replaceWithData(strJSon,numData3)));
console.log('==Minimum====='+calc.evalExpression(calc.replaceWithData(strJSon,numData4)));
console.log(calc.checkMaxInOprtn(datalst));
console.log(calc.checkMinInOprtn(datalst));
console.log('==Maximum====='+calc.evalExpression(calc.replaceWithData(strJSon,numData5)));
console.log('========Data to be checked'+calc.evalExpression(calc.replaceWithData(strJSon,numData6)));
console.log(h + ":" + m + ":" + s);
console.log(calc.evaluateExpressionData(strJSon,equation7));
console.log(startTime -Today.getTime()); */
//module.exports.Calculation = Calculation;
this.evaluateExpressionData = function (jsonString, strExpnData){
    var nodeEval = require('node-eval');
    //var minimun = this.replaceWithData(jsonString,strExpnData);
    var obj = JSON.parse(jsonString);
    var strMap = new Map();
    for(var j=0 ;j < 1;j++){
        for (var k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
    }
    console.log('===Reaplcement done');
    for (var k of strMap.keys()){
        strExpnData = strExpnData.split(k).join(strMap.get(k));
    }
    var datatoGet ;
    for(var j=0 ;j < 100000;j++){
        datatoGet = nodeEval(strExpnData);
    }
    return datatoGet;
}