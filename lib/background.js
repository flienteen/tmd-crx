
var requestTimeout = 1000 * 15;  // 2 seconds
var rotation = 0;
var unreadMSG = -1;
var newWatcher = -1;
var newTorrent = -1;


var domain, TMDUrl, FeedUrl;
var tmd={};
	tmd.url = 'http://www.torrentsmd.';
	tmd.feedUrl = '/toolbar/ff/ff.xml.php';


initUrlsParam();


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo)
{
  if (changeInfo.url)
  {
    log('onUpdated.addListener: '+changeInfo.url);
    getInboxCount(function(count) { updateCount(count); } );
  }
});

function initUrlsParam()
{
	domain = localStorage['domainName']||'eu';
	TMDUrl = tmd.url+domain; //TMDUrl = "http://flienteen.pc/";
	FeedUrl = TMDUrl + tmd.feedUrl ;
}

function init()
{
    log("init() - Started!");
  canvas = document.getElementById('canvas');
  loggedInImage = document.getElementById('logged_in');
  canvasContext = canvas.getContext('2d');

  chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
  chrome.browserAction.setIcon({path: "pic/TMD_logged_in.png"});

    audioS = []; 
        audioS['PM'] = new Audio("sound/"+localStorage['ntfSndInboxSrc']+".ogg");
        audioS['W']  = new Audio("sound/"+localStorage['ntfSndWatcherSrc']+".ogg");
        audioS['T']  = new Audio("sound/"+localStorage['ntfSndTorrentsSrc']+".ogg");

  delay = 1000 * ((isInLocalStorage('pInterval'))?localStorage['pInterval']:30); //  delay = 1000 * 5;
  
  initUrlsParam();
  
  startRequest();
  
  makeContextMenu(); 
  


  log("init() - End!");
}



function startRequest()
{
  log("startRequest() - Started!");
  getInboxCount
  (
    function(count)
    {
      updateCount(count);
      scheduleRequest();
    },
    function()
    { //log("startRequest(onerror) - moved")
      showLoggedOut();
      //scheduleRequest();
        window.setTimeout(startRequest, (delay+1000*60));
    }
  );
  log("startRequest() - End!");
}

function scheduleRequest()
{
  window.setTimeout(startRequest, delay);
}

function getInboxCount(onSuccess, onError)
{
    log("getInboxCount(onSuccess, onError) - Started!");
  var xhr = new XMLHttpRequest();
  var abortTimerId = window.setTimeout(function() {xhr.abort(); }, requestTimeout);

  function handleSuccess(count)
  {
    window.clearTimeout(abortTimerId);
    if (onSuccess) onSuccess(count);
  }

  function handleError()
  {
    log(" handleError() - started!");
    window.clearTimeout(abortTimerId);
    if (onError) onError();
    log(" handleError() - end!");
  }

  try {
    xhr.onreadystatechange = function()
    {
      if (xhr.readyState != 4)
        return;

      if (xhr.responseText)
      {
        var xmlDoc = xhr.responseText;
        var rsp = new Array();
        rsp = xmlDoc.split('|');

        if (xmlDoc && rsp[3]==1)
        {
          countSend = [parseInt(rsp[0]), parseInt(rsp[1]), parseInt(rsp[2])];
          handleSuccess(countSend);
          return;
        }
      }
    log('xhr-failed: intram in handleError()');
      handleError();
    log('xhr-failed: ieshim din handleError()');
    };

    xhr.onerror = function(error) {     log('xhr.onerror - started + '+error); /* handleError();*/};
    xhr.open("GET", FeedUrl+'?r='+Math.random(), true);
    xhr.send(null);


    log("getInboxCount(onSuccess, onError) - End!");
  } catch(e) {handleError();}
}



function updateCount(count)
{
  var animatedo=false;
  if (unreadMSG != count[0] && isInLocalStorage('opShowInbox'))
  {
    if (unreadMSG < count[0] && unreadMSG != -1 && isInLocalStorage('ntfSndInbox')) playSound('PM');
    unreadMSG = count[0];
    animatedo=true;
  }

  if (newWatcher != count[2] && isInLocalStorage('opShowWatcher'))
  {
    if (newWatcher < count[2] && newWatcher != -1 && isInLocalStorage('ntfSndWatcher')) playSound('W');
    newWatcher = count[2];
    animatedo=true;
  }

  if (newTorrent != count[1] && isInLocalStorage('opShowTorrents'))
  {
    if (newTorrent < count[1] && newTorrent != -1 && isInLocalStorage('ntfSndTorrents')) playSound('T');
    newTorrent = count[1];
    animatedo=true;
  }

    if(animatedo) animateFlip();
}


function animateFlip()
{
  rotation += 1/36; // 36 = animationFrames
  drawIconAtRotation();

  if (rotation <= 1)
  {
    setTimeout(animateFlip, 10); //animationSpeed=10
  } else {
    rotation = 0;
    drawIconAtRotation();


//    totalCount=String(unreadMSG+newWatcher);
//
    var totalCount=0, sText=0;

    if (isInLocalStorage('opShowInbox'))  totalCount += unreadMSG;
    if (isInLocalStorage('opShowWatcher'))  totalCount += newWatcher;
    if (isInLocalStorage('opShowTorrents'))  totalCount += newTorrent;


    var acolor={unreadMSGColor:[226, 65, 11, 255], newWatcherColor:[102, 154, 244, 255], newTorrentColor:[48, 199, 59, 255]};
    if (unreadMSG > 0 && isInLocalStorage('opShowInbox'))    { bcolor = acolor.unreadMSGColor;  sText = unreadMSG } else
    if (newWatcher > 0 && isInLocalStorage('opShowWatcher')) { bcolor = acolor.newWatcherColor; sText = newWatcher} else
    if (newTorrent > 0 && isInLocalStorage('opShowTorrents')) { bcolor = acolor.newTorrentColor; sText = newTorrent}

    text = ''+((isInLocalStorage('opShowSum'))?totalCount:sText);
    //text = ''+((isInLocalStorage('opShowSum'))?'TRU':'FLS');
    //console.log(isInLocalStorage('opShowSum')+'>'+typeof(isInLocalStorage('opShowSum'))+'>'+text+'>'+bcolor);
    chrome.browserAction.setBadgeText({text: text != "0" ? text : ""});
    chrome.browserAction.setBadgeBackgroundColor({color:bcolor});

    chrome.browserAction.setPopup({popup: "popup.html"});
  }
}

function showLoggedOut()
{
  unreadMSG = -1; newWatcher = -1; newTorrent = -1;
  chrome.browserAction.setIcon({path:"pic/TMD_not_logged_in.png"});
  chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
  chrome.browserAction.setBadgeText({text:"off"});
  chrome.browserAction.setPopup({popup: ""});
}



function goToTMDListener()
{

   chrome.browserAction.onClicked.addListener(function(tab) { goToTMD(); });

   function isUrlOk(url)
   {
     var tmd = TMDUrl;
     if (url.indexOf(tmd) != 0)
       return false;

     return url.length == tmd.length;
   }

   function goToTMD()
   {
     chrome.tabs.getAllInWindow(undefined, function(tabs) {
       for (var i = 0, tab; tab = tabs[i]; i++) {
         if (tab.url && isUrlOk(tab.url)) {
    chrome.tabs.update(tab.id, {selected: true});
    return;
         }
       }
       chrome.tabs.create({url: TMDUrl});
     });
   }

}
goToTMDListener();


function drawIconAtRotation()
{
  canvasContext.save();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.translate(
      Math.ceil(canvas.width/2),
      Math.ceil(canvas.height/2));
  canvasContext.rotate(2*Math.PI*((1-Math.sin(Math.PI/2+rotation*Math.PI))/2));
  canvasContext.drawImage(loggedInImage,
      -Math.ceil(canvas.width/2),
      -Math.ceil(canvas.height/2));
  canvasContext.restore();

  chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)});
}



//     audio.play(); 
function playSound(what)
{
    try
    {
//        document.getElementById('notify_sound'+what).currentTime = 0;
//        document.getElementById('notify_sound'+what).play();

		audioS[what].volume = parseInt(localStorage.ntfSndVolume)/100;
        audioS[what].play();
    }
    catch(e) { console.error(e); }
}


//work with localStorage
chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
    if(request === "getStorageData") {
        sendResponse(localStorage);
    }else if(request === "getMessage") {
        //sendResponse(localStorage);
        //chrome.i18n.getMessage(id);
    }
});



function initStorage(key, value)
{
    if(localStorage[key]==undefined)
    {
        localStorage[key]=value;
        return true;
    }
    return false;
}
function isInLocalStorage(btn)
{
    return localStorage[btn]!='false' && localStorage[btn]!=undefined;
}

if (initStorage("1.1.4.9", true))
{
	initStorage('ntfSndVolume','90');


//v.1.1.1.6
	initStorage('domainName','com');
	initStorage('opUseSearchTable','true');
	initStorage('opUseForumMarkNewTopics','true');
	
	
//v.1.0.0.3
    initStorage('opUseSpoilerHideHlp', 'false');



//v.1.0
    initStorage('opUseUploadTemplate', 'true');
    initStorage('opUseHighlightMyNickName', 'true');
    initStorage('opUseCustomQuote', 'true');
    initStorage('opUseQuickPmBox', 'true');
    initStorage('rClick', 'true');
    initStorage('ntfSndInboxSrc', 'notify'); 
    initStorage('ntfSndWatcherSrc', 'notify'); 
    initStorage('ntfSndTorrentsSrc', 'notify');
 
 
//v.0.9.7    
    initStorage('opUseQL', 'true');
    initStorage('opUsePT', 'true');
    initStorage('opUseSF', 'true');
    initStorage('opUseWtch', 'true');

    initStorage('showSearch', 'true');
    initStorage('showOptionPage', 'true');

//v.0.9.1
    initStorage('opUseOFflColse', 'true');
    //initStorage('opShowCheckerSum', 'true');
    initStorage('opUseOFuseColor', 'true');
    initStorage('opUseOFpRight', 'true');
    initStorage('btn_click_ContextSearch', 'newTab');
//adaugam toate butoanele
    initStorage('btn_forum', 'true');
    initStorage('btn_torrents', 'true');
    initStorage('btn_upload', 'true');
    initStorage('btn_bookmarks', 'true');
    initStorage('btn_mytorrents', 'true');
    initStorage('btn_to_appreciate', 'true');
    initStorage('btn_friends', 'true');


//v.0.7.3
    initStorage('opShowSum', 'false');

//v.0.7.2
    initStorage('ntfSndInbox', (isInLocalStorage('ntfSnd')?(localStorage['ntfSnd']==='false'?'true':'false'):'true'));
    initStorage('ntfSndWatcher', 'true');
    initStorage('opShowInbox', 'true');
    initStorage('pInterval', 30);
    initStorage('btn_click_opt', 'thisIfTmd');
    initStorage('btn_click_optMiddle', 'newTab');
    initStorage('btn_click_optRight', 'this');
    initStorage('opUseFUList', 'flienteen,mishunika,');
    initStorage('opUseFU', 'true');
    initStorage('opUseOF', 'true');
    initStorage('opUseAW', 'true');

//v.0.3.6
    initStorage('opShowWatcher', 'true');

//v.0.2.6
    initStorage('popapOrder', ':TR_btn_inbox:TR_btn_watcher:TR_btn_new_torr:TR_btn_forum:TR_btn_torrents:'
                    + 'TR_btn_upload:TR_btn_bookmarks:TR_btn_friends:TR_btn_mytorrents:TR_btn_to_appreciate:');
    initStorage('btn_inbox', 'true');
    initStorage('btn_new_torr', 'true');
    initStorage('btn_watcher', 'true');

	//oricum nu o mai inoim..
    //chrome.tabs.create({'url': chrome.extension.getURL('news.html#log')}, function(tab){});
}
//localStorage.clear();


//s videm si putem
function makeContextMenu()
{
    chrome.contextMenus.removeAll(function() //fișiruim bugul găsit de ceekay
    {
        if (localStorage.rClick==='true')
        {
            var cmSearch = chrome.contextMenus.create({"title": chrome.i18n.getMessage('rClick'), "contexts":['selection'], "onclick":function(data){tmdsearch(data.selectionText);}});
        }    
    });

}



function baseurl(addr)
{

    var addrs = TMDUrl+addr;


    switch(localStorage.btn_click_ContextSearch)
    {
	    case 'newTab':
	      chrome.tabs.create({url:addrs, selected:false});
	      break;
	    case 'thisIfTmd':
	      goToTMDTab(addrs);
	      break;
	    case 'this':
	      chrome.tabs.getSelected(null,function(tab)
	      {
	            chrome.tabs.update(tab.id,{url:addrs});
	        });
      break;
    default:
      chrome.tabs.create({url:addrs});
    }

    //event.preventDefault();
    return false;
}

function tmdsearch(s)
{
    s = encodeURIComponent(s).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');;
    baseurl('/search.php?search_str='+s);
}
function goToTMDTab(TMDUrlf)
{
   function isUrlOk(url)
   {//TMDUrl = "http://www.torrentsmd.eu/"
	 var tmpurl = TMDUrl;
	 tmpurl = tmpurl.replace(/http:\/\/www./,'').replace(/\//,'');
     var re = new RegExp(tmpurl+'\/');
     return url.match(re);
   }

   function goToTMD()
   {
     chrome.tabs.getAllInWindow(undefined, function(tabs) 
     {
       for (var i = 0, tab; tab = tabs[i]; i++) {

         if (tab.url && isUrlOk(tab.url)) 
         {
            chrome.tabs.update(tab.id, {url:TMDUrlf, selected: true});
            //chrome.tabs.getSelected(null,function(tab){chrome.tabs.update(tab.id,{url:TMDUrl});});
            return;
         }
       }
       chrome.tabs.create({url: TMDUrlf});
     });
   }
    goToTMD();
}


document.addEventListener('DOMContentLoaded', function () {
	init();
});