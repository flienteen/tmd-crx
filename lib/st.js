var loging=true, logDebug=false;
if(localStorage.noIndyExtToolbar !=='true')localStorage.noIndyExtToolbar='true';


function log(a)
{
 if(loging)
 {
    var t=new Date(), h=checkTime(t.getHours())+":"+checkTime(t.getMinutes())+":"+checkTime(t.getSeconds())+":"+t.getMilliseconds();
    var f=new Error().stack, w='';
    w=(logDebug)?h+" > "+a+"\n"+f:a;
    console.log(w+'\n\n');
 }
}


var start = function(e){console.time(e);console.groupCollapsed(e);}
var end = function(e){console.groupEnd(e);console.timeEnd(e);}

function checkTime(i){return (i<10)?"0"+i:i;}

var start = end = log = function(){};

/*
var loging=true, logDebug=false;
if(localStorage.noIndyExtToolbar !=='true')localStorage.noIndyExtToolbar='true';


function log(a)
{
 //
}

var start = function(e){}
var end = function(e){}
*/
