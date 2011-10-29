var domain = localStorage['domainName']||'eu';
var TMDUrl = "http://www.torrentsmd."+domain+"/"; //var TMDUrl = "http://flienteen.pc/";

xhr = new XMLHttpRequest();
var searchBoxDefault = getText('search');  


function call_server(back) 
{
  var url = TMDUrl+"toolbar/ff/ff.xml.php";
  xhr.open("GET", url);
  xhr.onload = update_page;
  xhr.send();
}

function update_page() 
{
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = xhr.responseText;
	
	if( response[0] != '<' && response[0] != ' ' )
	{
		var rsp = new Array();
		rsp = response.split('|');
	  try{
		if (rsp[0] != '0') {
			document.getElementById('pic_inboxC').src='pic/inbox_new.png';
		} else {
			document.getElementById('pic_inboxC').src='pic/inbox.png';
		}
	  } catch(e) { console.error(e); }
	  try {	document.getElementById('inboxC').innerHTML=rsp[0]; } catch(e) { console.error(e); }
	  try {	document.getElementById('new_torrC').innerHTML=rsp[1];} catch(e) { console.error(e); }
	  try {	document.getElementById('watcherC').innerHTML=rsp[2];} catch(e) { console.error(e); }
      $('#reloading').hide('slow');
	}
  }
}



function baseurl(addr) 
{
    event = (baseurl.arguments[1]!==undefined)?baseurl.arguments[1]:'';
    var what=(event.which == 1) ? localStorage.btn_click_opt : 
             (event.which == 2) ? localStorage.btn_click_optMiddle : 
             (event.which == 3) ? localStorage.btn_click_optRight : '';
	var addrs = TMDUrl+addr;
    if(addr==='optionsPage') addrs=chrome.extension.getURL('options.html'); 

	switch(what)
	{
	case 'newTab':
	  chrome.tabs.create({url:addrs, selected:false});
	  break;
	case 'thisIfTmd':
	  goToTMDTab(addrs);
	  break;
	case 'this':
	  chrome.tabs.getSelected(null,function(tab){
			chrome.tabs.update(tab.id,{url:addrs});
		});
	  break;
	default:
	  chrome.tabs.create({url:addrs});
	}

    event.preventDefault();
    return false;
}



function tmdsearch(s)
{
	s = $.trim(s);
	if (s == '' || s==searchBoxDefault) return;		
	s = encodeURIComponent(s).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	baseurl('search.php?search_str='+s);
}


function goToTMDTab(TMDUrlf)
{
   function isUrlOk(url) 
   {
	   var tmpurl = TMDUrl;
		 tmpurl = tmpurl.replace(/http:\/\/www./,'').replace(/\//,'');
	     var re = new RegExp(tmpurl+'\/');
	     return url.match(re);
   }

   function goToTMD() 
   {
     chrome.tabs.getAllInWindow(undefined, function(tabs) {
       for (var i = 0, tab; tab = tabs[i]; i++) {
		
         if (tab.url && isUrlOk(tab.url)) {
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


function getText(id)
{
	return chrome.i18n.getMessage(id);
}
function putText(id)
{
	$("#"+id).html(getText('btn_'+id));
}
function putTextIn(where,waht)
{
	$("#"+where).html(getText(waht));
}

function isArray(obj) 
{
	return obj instanceof Array;
}

function showOk(btn)
{
	return localStorage[btn]!='false' && localStorage[btn]!=undefined;
}

function mConstructor()
{
	var allBtns = [//btnid, containerID, imgSrc, Url
			['btn_inbox', ['inbox', 'inboxC'], 'inbox.png', 'inbox.php'], 
			['btn_new_torr', ['new_torr', 'new_torrC'], 'new.png', 'browse.php?unseen=1'], 
			['btn_torrents', 'torrents', 'torrents.png', 'browse.php'], 
			['btn_bookmarks', 'bookmarks', 'bookmarks.png', 'bookmarks.php'], 
			['btn_watcher', ['watcher', 'watcherC'], 'watcher.png', 'watcher.php'], 
			['btn_forum', 'forum', 'forum.png', 'forum.php'], 
			['btn_friends', 'friends', 'friends.png', 'friends.php'], 
			['btn_mytorrents', 'mytorrents', 'mytorrents.png', 'mytorrents.php'], 
			['btn_to_appreciate', 'to_appreciate', 'appreciate.png', 'to_appreciate.php'], 
			['btn_upload', 'upload', 'upload.png', 'upload.php'] 
				];
	var TRorderString = localStorage.popapOrder;

	var TRorder = new Array();
		TRorder = TRorderString.split(':');
		TRorder.shift(); TRorder.pop();

	$(TRorder).each(function()
	{
		btn = this.replace("TR_",""); 
		if (showOk(btn))
		{ 
			$(allBtns).each(function()
			{
				if (btn==this[0]) makeOptionalTD(this[1], this[2], this[3]);
				popupEmpty(false);
			});
		}
	});
	
}


function makeOptionalTD(id, img, url)
{
	if ( !isArray(id))
		$('#menuHere').before('<tr><td nowrap class="button"  onmousedown="return false" onmouseup="return baseurl(\''+url+'\',event)" onclick="return false" ondblclick="return false" oncontextmenu="return false"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td width="16"><img src="pic/'+img+'" width="16" height="16"></td> <td><span id="'+id+'"></span></td></tr></table></td></tr>');
	else 
		$('#menuHere').before('<tr><td nowrap class="button" onmousedown="return false" onmouseup="return baseurl(\''+url+'\',event)" onclick="return false" ondblclick="return false" oncontextmenu="return false"><table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td width="16"><img id="pic_'+id[1]+'" src="pic/'+img+'" width="16" height="16"></td> <td><span id="'+id[0]+'"></span>(<span id="'+id[1]+'"></span>)</td></tr></table></td></tr>');

}

function mSearchable()
{
	$("#search")
		.focus(function()
		{  
			if($(this).attr("value") == searchBoxDefault) $(this).attr("value", "");  
			$(this).css("color","#000000");
		}) 
		.blur(function()
		{  
			if($(this).attr("value") == "") $(this).attr("value", searchBoxDefault);
			$(this).css("color","#A79F72");
			$("#searchPlus").animate({opacity: "hide", top: "-26"}, "slow");
		})
		.keypress(function(event) 
		{
			if (event.keyCode == '13') tmdsearch($("#search").val());;		   
		})	
		.click(function(){
			$("#searchPlus").animate({opacity: "show", top: "+26"}, "slow");
		});
	
	$("#searchIMDB").click(function() {
		var s=parseInt($("#search").val());
  		baseurl("browse.php?imdb="+s);
	});
	$("#searchGo").click(function() { 
		tmdsearch($("#search").val());
	});
	
	$("#search").attr("value", getText('search'));
	
	//popupEmpty(false);
}

function popupEmpty(i)
{
    if(i) $('#popup-empty').show();
     else $('#popup-empty').hide();
}

$(document).ready(function()
{
    $pageStyle = $('<style>',{type:'text/css',id:'pageStyle'}).appendTo("body").append(myCss);


    popupEmpty(true);
    if (localStorage.showOptionPage === "false") $('#popup-options').remove(); 
    if (localStorage.showSearch === "true") mSearchable();
     else $('#showSearch').remove();
    
    if (localStorage.showOptionPage==="true" || localStorage.showSearch==="true") popupEmpty(false); 
    
	mConstructor();


	putTextIn('optionsPage','showOptionPage');
	putText('inbox');
	putText('new_torr');
	putText('torrents');
	putText('bookmarks');
	putText('watcher');
	putText('forum');
	putText('friends');
	putText('mytorrents');
	putText('to_appreciate');
	putText('upload');


/*
    $('#searchPlus img').mouseenter(function(e) {
        $(this).animate({ height: '18', left: '-1', top: '-2', width: '18'}, 100);
    }).mouseleave(function(e) {
        $(this).animate({ height: '16', left: '0', top: '0', width: '16'}, 100);
    });
*/
});



