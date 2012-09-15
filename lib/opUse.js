/* new version */
//http://torrentsmd.com/download.php?id=958614

var loadingIMDzero=chrome.extension.getURL('pic/loading0.gif');
var loadingIMD=chrome.extension.getURL('pic/loading.gif');
var cURL = window.location.pathname, sURL = window.location.search;

var language = {'ro':{}, 'ru':{}};


	language.ro.upload = 
					{ 
						load:"încarcă șablonul",
						edit:"Editează",
						confirm:"Confirmă",
						cancel:"Anulează",
						wndEdit:"Modifică șabloanele salvate"
					}; 
	language.ro.forum = 
					{ 
						link:"Link"
					}; 
 
					
	language.ru.upload = 
					{ 
						load:"выберите шаблон",
						edit:"Изменить",
						confirm:"Подтвердить",
						cancel:"Отменять",
						wndEdit:"Редактировать сохраненные шаблоны"
					};												  
	language.ru.forum = 
					{ 
						link:"Ссылка"
					}; 
 
 //console.log(language, language.ro);
function getUserLanguage()
{
	$l = $('<lang>').html('<span class="lang-ru-hide-all getUserLanguage" id="ru">&nbsp</span><span class="lang-ro-hide-all getUserLanguage" id="ro">&nbsp</span>').appendTo('.pageContainer:last');
	$LANG = $('.getUserLanguage:visible', $l).attr('id');
	log("LANG",$LANG);
	$l.remove();
	return $LANG;
}
	

if(localStorage.USER===undefined)
{
	$USER=$('a[href="/userdetails.php"]').text();
	localStorage.USER = $USER;
}
if(localStorage.LANG===undefined)
{
	localStorage.LANG = getUserLanguage();
}

$USER = localStorage.USER;


function _text(p,t)
{
	//return '<span class="lang-ru-hide-all">'+language.ru[p][t]+'</span><span class="lang-ro-hide-all">'+language.ro[p][t]+'</span>';
	return language[localStorage.LANG][p][t];
}


function localStorageGet(v)
{
	chrome.extension.sendRequest(v, function(response) 
	{		  
		$.each(response, function(i, v)
		{
			localStorage[i]=v;
		});
		log(">>> localStorage updated!");			 
	});	
}

function pageUpdate()
{
	cURL = window.location.pathname;
	sURL = window.location.search;
	
	if(localStorage.opUseFU==='true') {opUseFU(localStorage.opUseFUList); topTorrentLink(true,localStorage.opUseFUList);}
	if(localStorage.opUseAW==='true') {opUseAW();}
	if(localStorage.opUseFT==='true') {opUseFT(localStorage.opUseFTList); topTorrentLink(false,localStorage.opUseFTList);}
	//if(localStorage.opUseQL==='true') {forumMkPsLink();}
	if(localStorage.opUsePT==='true') {forumShowTitle();}
	if(localStorage.opUseUploadTemplate==='true') {saveDes();}
	if(localStorage.opUseHighlightMyNickName==='true') { highlightMyNickName(); }
	if(localStorage.opUseCustomQuote==='true') { postFindCiteaza(0); }
	if(localStorage.opUseSF==='true') {repareSmileSelect();}
	if(localStorage.opUseQuickPmBox==='true') { makePmBox(); }
	
	
	//if(localStorage.decenzureaza==='true') { DeCenzureaza(); }
	if(localStorage.opUseForumMarkNewTopics==='true') { forumMarkNewTopic(); }
	mkPopBox();
	
	
	if(localStorage.opUseSearchTable==='true') { MoreThanSearch(); }
}

function init()
{
	start("init()");
		if(localStorage.opUseOF==='true') {upUseOF();}
		
		
		 pageUpdate();		
		
		
		if(localStorage.opUseWtch==='true') 
		{
			try{localStorage.removeItem('wtchInitFirst'); log(">removeItem('wtchInitFirst')");}catch(e){log(e);}
			
			if(localStorage.wtchInitFirst2 !=='true')
			{
				localStorage.wtchInitFirst2='true';
				
				wtchInit();
				wtchInitSubCat();
			} else { wtch(); }
			
		}		
		//$.wait(500).then(function(){ highlightMyNickName();  });  
		
		
		//tadam!
		//fixSpoilers2();
		fixSpoilers3blea();
		
		
		//css la image din spoilers
		$pageStyle.append(" .sp-body.inited img { background: url('"+loadingIMD+"') no-repeat center; }");
		
		if(localStorage.ajaxLink==='true') { navigareAjax(); }
	end("init()");
	
	 
}

localStorageGet('getStorageData');
opUseFUGetList();
repareLinkWWW();



//if ($('#user_box').length){$pageHtml = $('<div>',{id:'pageHtml'}).insertAfter($pageStyle);}

//var $pageHtml;
//$.wait(50).then(function(){ $pageHtml = ($('#user_box').length)?$('<div>',{id:'pageHtml'}).insertAfter($pageStyle):$('div');  });

//$pageHtml = ($('#user_box').length)?$('<div>',{id:'pageHtml'}).insertAfter($pageStyle):$('div');
//$pageStyle.append('div.wnd{ top:130px; background-color:#ECE9D8; border: 1px solid #000; z-index: 50; position: fixed; font-size:11px; display:none;} div.box_header {background-color:#5588bb;padding:2px;text-align:center;font-weight:bold;color: #FFFFFF;vertical-align:middle; cursor:move;} a.close{float:right;text-decoration:none;color:#FFFFFF;}');





function upUseOF()
{
	start('upUseOF()');
// Friends Online  Setings..
	var f_max_user = 10; //max user in div
	var qTime = [ "mai pu", "1 minut î", "(2 minute în urmă)", "меньше", "(1 минуту назад)", "(2 минут назад)" ];
	var query = "friends.php td[class='embedded'] table[width='750']";
	$.each(qTime, function() 
	{
		query += " td[width='80%']:contains('"+this+"') a:first-child, ";
	});


	fOnMic();
	loadingData();

	$('a[jhref="reload"]').click(function () 
	{
		$("#f_div_conteiner").html('<div style="background: url('+loadingIMDzero+') center center no-repeat; opacity: 0.5; width: 100%; height: 100%;" ></div>');
		$("#f_div_nb").text('?');
		$("#temp_boxMsg").remove(); 
		loadingData(); 
	});
		
	//allFriends preparation
	$("#f_on_div").after('<div id="allFriendsDiv"></div>');
	$('a[jhref="allFriends"]').click(function () 
	{ 
		allFriends(); 
	});


//parrent box
	function fOnMic()
	{
		log('fOnMic() ->');
		$div = $('<div>',{id:'fOnMicDiv',  'class':'tmdFont', 'style':'display:none'}).appendTo($pageHtml);
		$div.show();
		
		fOn();	

		if(localStorage.fOnPinned==='true') {$('#f_on_div').show(100); $div.hide();}

		dStyle='#fOnMicDiv{right:-2px; bottom:80px; min-width:10px; padding: 5px 5px 5px 8px; background-color:#e9f5fc; border: 1px solid #ECE9D8; position: fixed; font-size:14px; cursor:pointer; -webkit-user-select: none; -webkit-border-top-left-radius: 25px; -webkit-border-bottom-left-radius: 25px; -webkit-box-shadow: 0px 1px 3px #3E6692;  color: #0A50A1; opacity:.9;}';
		dStyleH='#fOnMicDiv:hover {color: #58B;  -webkit-transition: all .3s ease-in; opacity:1; font-weight:bold;}';
		$pageStyle.append(dStyle+dStyleH);
		
		
		$div.html('<span id="fOnMicNb"><img src="'+loadingIMD+'" /></span>').click(function()
		{ 
			$(this).hide(400, function()
			{
				$('#f_on_div').show(300);
			});
		});		 
		$('#f_div_close').click(function(){ $('div#f_on_div').hide('slow', function(){$div.show(300);}); return false;});
		$('#fOnPin').click(function(){ localStorage.fOnPinned = (localStorage.fOnPinned==='true')?'false':'true'; $(this).css({'opacity':(localStorage.fOnPinned==='true')?'1':'.3'}); log('Pin changed to '+localStorage.fOnPinned);  }); 
		 
		log('\t<- fOnMic()');
	}


	function fOn()
	{
		log('f0n() ->');

			
		fPos=(localStorage.opUseOFpRight==='false')?'left:3px;':'right:3px;';			 
		
		bCol='#a79f72';
		
		cssQ='.DivSendMSGLoader img {float:right;}  #f_div_close:hover {color: #6D6434; /*background-color: white;-webkit-border-top-left-radius: 75px;-webkit-border-top-right-radius: 75px;-webkit-border-bottom-left-radius: 75px;-webkit-border-bottom-right-radius: 75px;*/ -webkit-transition: all .3s ease-in; opacity: 1;}  #f_div_close { font-weight: bold; opacity: .4; }';
		cssQ+=':ID a, a.close, a[jhref] { cursor:pointer;} a.close:hover{color:#666}  '
+'	:ID {width:150px; cursor:default; background-color: #ece9d8; overflow: visible; position: fixed; float: right; bottom:10px; display:none; padding: 3px; -webkit-border-radius: 8px; border: 1px solid :bCol; -webkit-box-shadow: :bCol 0px 1px 5px; } '
+'	:ID .header {text-align:center; }  '
+'	:ID .content {text-align:left;  padding: 3px 0px 3px 0px; border-top: 1px solid :bCol; border-bottom: 1px solid :bCol;}  '
+'	:ID .footer {text-align:right; }  '
+'	 #f_div_conteiner{	overflow: auto;} div.userContainer{margin:0px; padding-left:2px;display: list-item} .userContainer:hover{background-color: #dbd6c0;} .fPos{:fPos}'
+'	 :ID ::-webkit-scrollbar {width: 8px;} :ID ::-webkit-scrollbar-thumb{border: 1px solid :bCol; -webkit-border-radius: 1ex; -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .4); }';
		
		$pageStyle.append(cssQ.replace(/:fPos/g,fPos).replace(/:ID/g,'#f_on_div').replace(/:bCol/g,bCol));
		
		
		var imgOpacity = (localStorage.fOnPinned==='true')?'1':'.3';
		$pageHtml.append('<div id="f_on_div" class="tmdFont fPos">'
+'			<div class="header"> <span id="opUseOF">'+chrome.i18n.getMessage('opUseOF')+'</span> (<span id="f_div_nb">?</span>)  <a onClick="return false;" id="f_div_close" style="float:right;">X</a>  <img title="'+chrome.i18n.getMessage('opUseOPinWindow')+'" style="float:left; opacity:'+imgOpacity+'" src="'+chrome.extension.getURL('pic/pin.png')+'" width="12px" height="12px" id="fOnPin" /> </div> '
+'			<div class="content"> <div id="f_div_conteiner"><center><img src="'+loadingIMD+'" /></center></div> </div> '
+'			<div class="footer"><a jhref="reload"><img title="'+chrome.i18n.getMessage('opUseOFreloadList')+'" src="'+chrome.extension.getURL('pic/refresh.png')+'" /></a> &nbsp; <a jhref="allFriends"><img title="'+chrome.i18n.getMessage('opUseOFallFriends')+'" src="'+chrome.extension.getURL('pic/friends.png')+'" /></a></div>'
+'		</div>');
 //<div class="footer"><a jhref="reload">['+chrome.i18n.getMessage('opUseOFreloadList')+']</a> &nbsp; <a jhref="allFriends">['+chrome.i18n.getMessage('opUseOFallFriends')+']</a></div>
		log('\t<- f0n()');
	}


	function loadingData()
	{ 
		log('loadingData() ->');
		$("#f_on_div").after('<div id="temp_unreadMsg" style="display:none;"></div><div id="temp_friendsList" style="display:none;"></div>');

		$("#temp_friendsList").load(query, function ()
		{
			var fUserOn = 0, fUserArray = [];
			$("div#f_div_conteiner").html('');

			$('a b', this).each(function ()
			{
				fUser = $(this).html();
				fUserID = $(this).parent('a').attr('href').replace('userdetails.php?id=', "");

				fUserHTML = '<div class="userContainer"><a href="userdetails.php?id=' + fUserID + '" target="_blank">' + fUser + '</a> [<a jhref="#box" uid="' + fUserID + '" name="' + fUser + '"  onClick="return false;">PM</a>] <font color="#C97452" size="1" id="' + fUserID + '"></font></div>';
				$("div#f_div_conteiner").append(fUserHTML);
				fUserArray.push(fUserID);
				fUserOn++;
			});

			var f_d_height = 13 * ((fUserOn > f_max_user) ? f_max_user : fUserOn);
			$("#f_div_nb").text(fUserOn);
			$('#fOnMicNb').text(fUserOn);
			$("#f_div_conteiner").css('height', f_d_height);
			
			$("#f_div_conteiner center").remove();  
			$(this).remove(); 

			//mkPopBox();
			$("#temp_unreadMsg").load("inbox.php?out=1 div#messages td:contains('Unread') b a:first-child", function ()
			{
				for(j=0; j<fUserArray.length; j++)
				{
					if ( $(this).find("a[href$='"+fUserArray[j]+"']").length > 0)
					{
						$("div#f_div_conteiner").find('font#'+fUserArray[j]).text('Unread');
					}
				}
				$(this).remove();
			});//loaded inbox 
			
			
		}); //finished loading friends list

	 log('\t<- loadingData()');
	}






	





	function allFriends()
	{	
		var curAFCLeft=0; 
		
		if ($("#allFriendsDiv").text()==='')
		{ 
		
		css  = '#:ID #allFriendsList p span {display: inline-block;} #:ID span.userContainer:hover{ opacity:0.8; border:solid 1px rgba(85, 136, 186, 1); -webkit-box-shadow:0px 0px 2px #5588bb;} '
+'				 #:ID.wnd{-webkit-box-shadow: 0px 2px 10px #3E6692; -webkit-border-bottom-right-radius: 7px 7px; -webkit-border-bottom-left-radius: 7px 7px; border: 0px !important; padding-bottom: 5px; z-index:1; width: 180px;} '
+'				 #:ID  .close {font-size:13px; right: 0px; opacity: .7; top: 2px; position: absolute;} '
+'				 #:ID  .close.resize {right:15px} '
+'				 #:ID  .close:hover {color: #58B;background-color: white;-webkit-border-top-left-radius: 75px;-webkit-border-top-right-radius: 75px;-webkit-border-bottom-left-radius: 75px;-webkit-border-bottom-right-radius: 75px; -webkit-transition: all .3s ease-in; opacity: 1;}  '
+'				 #:ID  .box_header {font-size:16px;}		'
+'				 #:ID  .do {border: 1px solid #d0d0d0; background-color:#e8e8e8; color:#0A50A1; font-size: 18px;margin: 5px;} #:ID  .do:disabled {opacity:.3} #:ID .do:hover {-webkit-box-shadow: #c0c0c0 1px 0px 7px;border: 1px solid #c0c0c0;}  #:ID td {border:0px;} #:ID #msgBox {border: #ECE9D8; -webkit-user-select:text; width: 340px; margin: 1px; background: #f4f1e3;}  #:ID ::-webkit-scrollbar {width: 8px;} #:ID ::-webkit-scrollbar-thumb{border: 1px solid #a79f72; -webkit-border-radius: 1ex; -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .4); } ';
	   
		$pageStyle.append(css.replace(/:ID/g,'allFriendsContainer'));
		
		   
		$("#allFriendsDiv").html('<div id="allFriendsContainer" class="wnd fPos"><div class="box_header"><div class="drag" style="padding-right: 20px;"><img  style="opacity:.7; float:left;" src="'+chrome.extension.getURL('pic/friends.png')+'" /> All Friends</div> <a class="close" id="close">&nbsp;X&nbsp;</a> <a id="plus"  class="close resize">&nbsp;+&nbsp;</a><a id="minus"  class="close resize">&nbsp;-&nbsp;</a> </div><div id="box_content"> <center><img src="'+loadingIMD+'" /></center> <div id="allFriendsTemp" style="display:none"></div> <div id="allFriendsList" style="overflow:auto;height:200px"></div>	 </div> </div><script>$j("#allFriendsContainer").jqDrag(".drag");</script>');
		
		$('#allFriendsContainer a#minus').hide();
		$('#allFriendsContainer a#close').click(function(){ $('#allFriendsContainer').fadeOut('slow');});
		$('#allFriendsContainer a#plus').click(function()
		{
			$(this).hide(); $('#allFriendsContainer a#minus').show();
//			$("#allFriendsContainer").css({top:'50%',left:'50%',margin:'-'+($('#allFriendsContainer').height() / 2)+'px 0 0 -'+($('#allFriendsContainer').width() / 2)+'px'});
				$("#allFriendsContainer").animate({width: "40%"}, 100, function()
				{
					var h = $("#allFriendsList p").height()+4;
					$("#allFriendsList").animate({height: h+'px'}, 100, function() {
					$("#allFriendsContainer").center(); 
					} );
					
				});
			$("#allFriendsList p").css('text-align', 'justify');
			$("#allFriendsList").css('text-align', 'justify');
		});
		$('#allFriendsContainer a#minus').click(function()
		{
			$(this).hide(); $('#allFriendsContainer a#plus').show();
			$("#allFriendsContainer").animate({width: "180px",height: "200px"}, 200, function()
				{
					//if(localStorage.opUseOFpRight==='true') {$('#allFriendsContainer').animate({'left': curAFCLeft}, 100);}
					var h = $("#allFriendsList p").height()+4;
					$(this).css('height','');
					if (h<200) {$("#allFriendsList").animate({height: h+'px'}, 100 );} 
						else { $("#allFriendsList").animate({height: '200px'}, 100 );}
				});
			$("#allFriendsList p").css('text-align', 'center');
		});


		$('#allFriendsContainer').css('display','block').css('left', $('#allFriendsContainer').position().left);
		$("#allFriendsTemp").load("friends.php td[class='embedded'] table[width='750'] td[width='80%'] a:first-child", function ()
		{
			u='<p style="margin:0px; padding:2 2 2 2; text-align:center">&nbsp;';
			var colStyle='border:solid 1px rgba(0,0,0,0.1); ';
			$("#allFriendsTemp a").each(function()
			{			
				//u += $(this).html()+', ';
				$('b', this).each(function ()
				{
					fUser = $(this).html();
					fUserID = $(this).parent('a').attr('href').replace('userdetails.php?id=', "");
					//col = 'rgba(' + (Math.floor(Math.random() * 256))+','+(Math.floor(Math.random() * 256))+','+(Math.floor(Math.random() * 256))+', 0.2)';
					if(localStorage.opUseOFuseColor==='true')
					{
						col={rgb:[(Math.floor(Math.random() * 256)),(Math.floor(Math.random() * 256)),(Math.floor(Math.random() * 256))]};
						colStyle='background:rgba('+col.rgb+',0.2); border:solid 1px rgba('+col.rgb+',0.1); ';
					}
					 
					u += '<span class="userContainer '+fUser.charAt(0).toUpperCase()+'" style="'+colStyle+' -webkit-border-radius: 4px; ">&nbsp;<a href="userdetails.php?id=' + fUserID + '" target="_blank">' + fUser + '</a>[<a jhref="#box" uid="' + fUserID + '" name="' + fUser + '"  onClick="return false;">PM</a>]&nbsp;</span> ';
				   
				});

			});
			
		
			$("#allFriendsContainer center").remove(); 
			$("#allFriendsTemp").remove();
			$('#allFriendsList').html(u+'</p>');
			var h = $("#allFriendsList p").height()+4;
			if (h<200) {$("#allFriendsList").animate({height: h+'px'}, 100 );}
			//mkPopBox();
			
			
			//$('#allFriendsList').before('<style id="keyup"><style/>');
			$(document).keyup(function(e)
			{
				$('#allFriendsList>p>span').show();
				who=String.fromCharCode(e.keyCode);
				log('keyCode '+e.keyCode+' - '+who);
				if($('#allFriendsList>p>span.'+who).length) {$('#allFriendsList>p>span:not(.'+who+')').hide();}					
			});
		});


		} else { if ($('#allFriendsContainer').is(':visible')) {$('#allFriendsContainer').fadeOut('slow');} else { $('#allFriendsList>p>span').show(); $('#allFriendsContainer').fadeIn('fast'); } }
	}//allFriends() end


	end('upUseOF()');
}

	function mkPopBox()
	{
		start('mkPopBox()');
		$('a[jhref="#box"]').live('click',function ()
		{
			if(localStorage.opUseOFflColse==='true') {$('#allFriendsContainer').hide('slow');}
			ID = $(this).attr('uid');
			USER = $(this).attr('name');

			log('Box: '+USER);

			var insertJS='<script>$j("#box").jqDrag(".drag");</script>'; 
			
			css  = '#:ID * {-webkit-user-select:none;}  #:ID.wnd{-webkit-box-shadow: 1px 2px 10px #3E6692; -webkit-border-radius: 0px 0px 7px 7px; border: 0px !important; padding-bottom: 5px;} '
+'				 #:ID  .close {font-size:13px; right: 2px; opacity: .7; top: 2px; position: absolute;} '
+'				 #:ID  .close:hover {color: #58B;background-color: white;-webkit-border-top-left-radius: 75px;-webkit-border-top-right-radius: 75px;-webkit-border-bottom-left-radius: 75px;-webkit-border-bottom-right-radius: 75px; -webkit-transition: all .3s ease-in; opacity: 1;}  '
+'				 #:ID  .box_header {font-size:16px;}		'
+'				 #:ID  .do {border: 1px solid #d0d0d0; background-color:#e8e8e8; color:#0A50A1; font-size: 18px;margin: 5px;} #:ID  .do:disabled {opacity:.3} #:ID .do:hover {-webkit-box-shadow: #c0c0c0 1px 0px 7px;border: 1px solid #c0c0c0;}  #:ID td {border:0px;} #:ID #msgBox {border: #ECE9D8; -webkit-user-select:text; width: 340px; margin: 1px; background: #f4f1e3;}   ';
	   
			if($('#temp_boxMsg').length == 0)
			{
				$pageStyle.append(css.replace(/:ID/g,'box'));
				$pageHtml.append('<div id="temp_boxMsg"></div>');
			}
			
			

			
			
			
			$('#temp_boxMsg').html('<div id="box" class="wnd fPos" style="z-index:3;"><div class="box_header"><div class="drag"><img src="'+chrome.extension.getURL('pic/inbox.png')+'" width="16" height="16" style="float: left;opacity: .7;"> ' + USER + '</div><a class="close">&nbsp;X&nbsp;</a></div><div id="box_content"> <table width="149px" border="0" align="center" cellspacing="0" cellpadding="0"><tr><td align="center" colspan="3"><textarea rows="8" cols="25" name="msgBox" id="msgBox"/></textarea></td></tr><tr> <td width="21"><div id="DivSendMSGLoaderError"></div></td><td align="center" valign="bottom" height="30"><input class="do" type="submit" value="'+chrome.i18n.getMessage('send')+'!"  /></td> <td width="21" align="right" valign="middle"><div id="DivSendMSGLoader"></div></td></tr></table></div></div>'+insertJS);



					$('#box').fadeIn(500);
					setTimeout(function(){$('#box textarea#msgBox').focus();}, 500);

					$('#box').click(function(){$('#box textarea#msgBox').focus();});
					$("#box .close").click(function(){ $("#box").fadeOut(300);return false; });

					$("#box input").attr("disabled", true);
					$("#box textarea#msgBox").bind('keyup click', function (e)
					{
						if ($("#box textarea#msgBox").val().replace(new RegExp( "\\n", "g" ),'').length > 0)
						{
							//log('IF: '+ $("#box textarea#msgBox").val().replace(new RegExp( "\\n", "g" ),'').length);
							
							$("#box input").attr("disabled", false);
							if ((e.ctrlKey) && ((e.keyCode === 10) || (e.keyCode === 13)))
							{
								send();
							}							
						} else {$("#box input").attr("disabled", true);}
						if(!havEvent("#box input")) {$("#box input").one('click', function() {send();});}
					});
					

					function send()
					{ 
						log('send() <= Pornit');
						if($("#box textarea#msgBox").val().replace(new RegExp( "\\n", "g" ),'').length)
						{
							$("#box #DivSendMSGLoader").html("<img src='"+loadingIMD+"' />");
							sendMSG2(ID, $("#box textarea#msgBox").attr('value'));
							$("font#" + ID).text('Unread');
							$("#temp_boxMsg").remove(); 
						} else {$("#box #DivSendMSGLoaderError").html('<b><center><font color="red">!</font></center></b>');}
					}

					function sendMSG2(ID, MSG)
					{
						$.ajax(
						{
							type: 'POST',
							url: 'takemessage.php',
							//data: 'receiver=' + ID + '&msg=' + urlEncode(MSG),
							data: {receiver : ID, msg: MSG},
							success: function ()
							{
								$('#box').hide(300);
							}
						});
						
						
						log('PM: '+ID+' => '+MSG);
					}
						
					//log('left: '+ $('#box').position().left);
						$('#box').css('right','15px').css({'left':$('#box').position().left, 'right':'' }).removeClass('fPos');
				   
						
				}); //clicked

		end('mkPopBox()');
	}





/**


 */
function opUseAW()
{
	start("opUseAW()");
	
	tdText = ['Urmăreşte comentariile la acest torrent', 'Следи за комментариями торента'];
//	var cURL = window.location.pathname;
//	var sURL = window.location.search;

	if (cURL==='/details.php' && (sURL.match(/redownload=1/g)!==null)) 
	{
		if( $.inArray($('td#watcherText').text(), tdText) > -1)
		{
			$(document.body).append('<script>Watcher();</script>');
			//alert('bum');
		}   
	}
	
	end("opUseAW()"); 
}




/**


 */
function opUseFU(list)
{
	start("opUseFU()");
// Fav. Uploader  Setings..
	var users=[];  users=list.split(',');   users.pop();
	var pArray = ['/browse.php', '/search.php', '/team.php'];
//	var cURL = window.location.pathname; 		
		
	if ($.inArray(cURL, pArray) > -1)
	{
//		$.each(user, function ()
//		{//log($(this)); #C6DC86 d9e2be cee0be bde09d
//			//$("div.pageContainer table[width='880'] td:last-child:contains(" + this + ")").parent("tr").css({'background-color': '#d5edc0'});
//			var u = this; u = $.trim(u);
//			
//			$td = $("div.pageContainer table[width='880'] td:last-child");
//			$a = $("a:last", $td);
//			
//			if($a.text() == u)
//				$td.parent('tr').css({'background-color': '#d5edc0'});
//			
//			$('div#torrents table[border="1"][cellspacing="0"][cellpadding="5"] td:last-child:contains('+this+')').parent("tr").css({'background-color': '#d5edc0'}); //pentru torrente din top
//		});
		
		checkTr("div.pageContainer table[width='880'] td:last-child");
		checkTr('div#torrents table[border="1"][cellspacing="0"][cellpadding="5"] td:last-child');
	}
	
	end("opUseFU()");
	
	function checkTr(td)
	{
		$("a[href*='userdetails.php']", $(td)).each(function(i,e)
		{
			var thisUser = $(e).text();
			
			if ($.inArray(thisUser, users) > -1)
				$(e).parents("tr").css({'background-color': '#d5edc0'});
					
		});
	}
}

function topTorrentLink(t,list)
{
	if(t){ $('a.a_inactive').click(function(){ window.setTimeout(opUseFU, 200, list); window.setTimeout(opUseFU, 1000, list); });
	}else{ $('a.a_inactive').click(function(){ window.setTimeout(opUseFT, 200, list); window.setTimeout(opUseFT, 1000, list); });}
}




/**


 */
function opUseFT(list)
{
	start("opUseFT()");
	torrent=[];  torrent=list.split(',');   torrent.pop();
	var pArray = ['/browse.php', '/search.php', '/team.php'];
//  var cURL = window.location.pathname; 		
		
	if ($.inArray(cURL, pArray) > -1)
	{
		log('opUseFT List:');
		$.each(torrent, function ()
		{//log($(this));
			var find = $.trim(this);
			if ((find!=="" || find !==null || find !==' ') && find) //ghemaroi cu kktu ista..
			{
				log("1 \t|"+find+'| '+typeof(find));
				$("div.pageContainer table[width='880'] td:nth-child(2):containsi(" + find + ")").parent("tr").css({'background-color': '#d7daea'});
				//log($("div.pageContainer table[width='880'] td:nth-child(2):contains(" + find + ")").parent("tr"));
				log("2 \t"+find);
			}
		});
		log('opUseFT List End!');
	}
	
	end("opUseFT()");
}





/**


 */
function opUseFUGetList()
{
	start("opUseFUGetList()");


	if (cURL==='/friends.php' && sURL==='?import')
	{
		u='';
		$("body").css('display','none').after('<div style="background: rgba(42, 0, 0, 0.7);margin: 0px;padding: 0px;height: 100%;width: 100%;overflow: hidden;position: absolute;visibility: visible;z-index: auto;text-align: center;vertical-align: middle;"></div><div style="padding: 0px;height: 50%;width: 50%;position: absolute;z-index: 2;display: block;right:25%;top:25%;" align="center"><textarea onclick="this.select()" id="u" name="u" cols="" rows="" readonly="readonly" style="width:100%; height:100%;font-size: 20px;border:dashed 5px #191919;-webkit-border-radius: 22px;-webkit-box-shadow:0px 0px 52px #662618; padding:10px"></textarea></div>');
		$("td[class='embedded'] table[width='750'] td[width='80%'] b").each(function()
		{			
			u += $(this).html()+', ';
		});
		$('#u').text(u);

	}

	end("opUseFUGetList()");
}



/**
<a href="sendmessage.php?receiver=220733">PM</a>
<a href="userdetails.php?id=220733"><b>andreiprc</b></a>

<a jhref="#box" uid="11" name="Kerdic" onclick="return false;">PM</a>
 */
function makePmBox()
{
	start("makePmBox()");
	
	if (cURL !=='/inbox.php')
	{
		$('a[href*="sendmessage.php?receiver="]').each(function()
		{
			var uid = $(this).attr('href').replace(/.*receiver=/, '');
			var name = $('a[href="userdetails.php?id='+uid+'"] b').eq(0).text();
			$(this).attr({'jhref':'#box', 'uid':uid, 'name':name+'&nbsp;', 'style':'border-bottom: 1px dashed black;'}).click(function(e){ e.preventDefault(); log('click-ed pe ',name); });
		});
	}
	
	end("makePmBox()");
}




/**


 */
function repareLinkWWW()
{
	start("repareLinkWWW()");
	$('a[href*="http://torrentsmd.com"]').each(function()
	{
		var href = $(this).attr('href').replace(/http:\/\/torrentsmd/, 'http://www.torrentsmd');
		$(this).attr('href',href);
	});
	end("repareLinkWWW()");
}



/**


 */
function repareSmileSelect()
{
	start("repareSmileSelect()");
	$('.comment img').each(function()
	{
		$(this).before('<span style="float:right; font-size:.001px; color:transparent; display:inline-block; width:0px; right: -2px; position: fixed;">'+$(this).attr('alt')+'</span>');
	});
	end("repareSmileSelect()");
}





/**


 */
function postFindCiteaza(d)
{
	start("postFindCiteaza()");
	
	//id (typeof(d)=)
//	d=typeof(d)==='number'?'.comment':d[0];
	d=typeof(d)==='number'?'.comment':'.getHeight';
	var scrollTop = $(window).scrollTop();
	
	
	$(d).not('.inited').each(function()
	{
//		console.log($(this), $(this).html());
//		tmp=$(this).clone();
//		tmpChildren = tmp.children();
//		
//		tmp.children(":not(a), :not(br)").remove();
//		
//		//(#\d{1,}\s[^\s][^\/><;:,\s]+)
//		tmp = tmp.html();
//		tmpM = tmp.replace(/\n/g,'').replace(new RegExp("(#\\d{1,}\\s[^\\s][^\/><;:,\\s]+)","img"), "<pfc>$1</pfc>").replace(new RegExp('("\\.{3}\\s.+\\s\\.{3}")', 'img'), "<pfci>$1</pfci>");

		//		tmp=$(this).html().replace(/\n/g,'');
		
//		console.log(tmp);
		r = $(this).html().replace(new RegExp("(#\\d{1,}\\s[^\/><;:,\\s][^\/><;:,\\s]+|#\\d{1,}\\s<me>.*</me>)","img"), "<pfc>$1</pfc>").replace(new RegExp('("\\.{3}\\s.+\\s\\.{3}")', 'img'), "<pfci>$1</pfci>");

		$(this).html(r);
//		$(this).html(tmp).append(tmpChildren);
		$(d).addClass('inited');
	});
	fixSpoilers();
	$(window).scrollTop(scrollTop);

	$('pfc:not(.inited)').click(function()
	{
		
		pTitle = $(this).html();
		pId =  pTitle.replace(new RegExp("#(\\d{1,}).*",'gi'),'$1');

//		log($(this), pId);
		if (cURL !== "/userhistory_posts.php")
		{
			showPost();
		}
		
		
	
	}).addClass('inited');


	function showPost()
	{
		
		
		
		id = 'postContainer'+pId;	
		
		$showPost = $('<div>',{'id':id, 'class':'wnd postContainer'}).appendTo($pageHtml);
		
		
		css  = '#:ID.wnd{-webkit-box-shadow: 1px 2px 10px #3E6692; border: 0px !important; -webkit-border-radius: 0px 0px 7px 7px; padding-bottom: 5px; z-index:1; width: 704px; max-height: 200px; left: 300px; } '
+'				 #:ID  .close {font-size:13px; right: 0px; opacity: .7; top: 2px; position: absolute;} '
+'				 #:ID  .close:hover {color: #58B;background-color: white;-webkit-border-top-left-radius: 75px;-webkit-border-top-right-radius: 75px;-webkit-border-bottom-left-radius: 75px;-webkit-border-bottom-right-radius: 75px; -webkit-transition: all .3s ease-in; opacity: 1;}  '
+'				 #:ID  .box_header {font-size:16px;}		'
+'				 #:ID ::-webkit-scrollbar {width: 8px;} #:ID ::-webkit-scrollbar-thumb{border: 1px solid #a79f72; -webkit-border-radius: 1ex; -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .4); } '
+'				 #:ID .box_header { text-align: left; padding-left: 10px;}';
	   
		$pageStyle.append(css.replace(/:ID/g,id));
		   
		$showPost.html('<div class="box_header"><div class="drag" style="padding-right: 20px;"> '+pTitle+' </div> <a class="close">&nbsp;X&nbsp;</a> </div><div id="box_content"> <div class="pfcPost" style="overflow:auto; max-height: 170px; min-height: 20px;  padding:5px;"> <img src="'+loadingIMD+'" /></center></div>	 </div> <script>$j("#'+id+'").jqDrag(".drag");</script>').fadeIn('slow').center();
		
		$('a.close', $showPost).click(function(){ $(this).parents('div.wnd').fadeOut('slow', function(){ $(this).remove();  });  });


		pageNb = $('center p.center a:last').attr('href');
		nb = parseInt(pageNb.replace(/.*page=/,''));
		pageNb = pageNb.replace(new RegExp("(.*page=).*",'gi'),'$1');
		
		$span = $('span.lnk:contains("#'+pId+'")');
		
		
		if( $span.length !== 0 )
		{
			$showPost.find('.pfcPost').html("<div class='getHeight'>"+ $span.parents('table.forumPostName').next('table.main').find('.comment').html() +"</div>");
			fixSpoilers();
//			postFindCiteaza([ $('.getHeight', $showPost).get(0) ]);
			postFindCiteaza('a');
			
		} else {
			goBack();
		}

		hidePost();

		


	}//showPost
		function hidePost()
		{
			$(document).one("click", function(e)
			{
				if ($(e.target).parents('.wnd').length > 0 || $(e.target).get(0).nodeName==="PFC" || $(e.target).get(0).nodeName==="ME")
				{
					hidePost();
				} else { 
					$('.postContainer').fadeOut('slow', function(){ $(this).remove();  });
				}
			}); 
		}


			function goBack()
			{
				url = pageNb+nb;
				if ( $('#page'+nb).length === 0 )
				{
					$p = $('<div>',{'id':'page'+nb, 'style':'display:none;'}).appendTo($pageHtml);
				}
			
				$p.load("forum.php"+url+"  #forumPosts", function ()
				{
					$spanOnP = $(this).find('span.lnk:contains("#'+pId+'")').parents('table.forumPostName').next('table.main').find('.comment');
					
					if( $spanOnP.length !== 0 )
					{
						$showPost.find('.pfcPost').html("<div class='getHeight'>"+ $spanOnP.html() +"</div>");
						fixSpoilers();
						postFindCiteaza('a');
					} else {
						nb--;
						$showPost.find('.pfcPost').append("<br> looking in page number "+nb+"...");
						goBack();
					}
				}); 
			}//goBack()

	//ch11=(parseInt(navigator.appVersion.replace(/.*Chrome\//,'').replace(/\..*/,''))>10)?true:false;
	//ch11style=(ch11)?'vertical-align: top;':'';
	ch11style= '';
	
	$pageStyle.append('pfc{border-bottom: 1px dotted #000; ::CH11} pfc:hover{border-bottom-style: solid; color: #0A50A1; cursor:pointer; -webkit-transition: all .3s ease-in;} pfci{opacity: .7; cursor: default; ::CH11} pfci:hover{opacity:1; -webkit-transition: all .3s ease-in;}'.replace(/::CH11/g,ch11style) );
	end("postFindCiteaza()");
}




/**


 */
function highlightMyNickName()
{
	start("highlightMyNickName()");
	if($USER)
	{
		$('.comment:contains("'+$USER+'")').each(function()
		{
			tmp=$(this).html().replace(new RegExp("("+$USER+")","gi"), "<me>$1</me>");
			$(this).html(tmp);
		});
		fixSpoilers();


		$pageStyle.append('me {cursor: default; color: #3E9269; font-weight: bold;} .box_header me {color: #fff;}');
	} else { log("Can't read you nickname'");}
	
	end("highlightMyNickName()");
}



function DeCenzureaza()
{
	start("DeCenzureaza()");
	
	if($('#pageUserHistory').length == 0)
		var $pageUserHistory = $('<div>',{'id':'pageUserHistory', 'style':'display:none;'}).appendTo($pageHtml);
	else
		var $pageUserHistory = $('#pageUserHistory');
	
	/*
	 *	sessionStorage
	 * 		beah.. sessionStorage lucreaza numa pe pagina curenta..
	 * 		tre de facut cu altceva ^_^
	 * 
	 */
	var localUsers;
	if(sessionStorage.pageUserHistory!==undefined)
	{
		localUsers = JSON.parse( sessionStorage.pageUserHistory );
		$.each(localUsers, function(users,pages)
		{
			var $tl = $('<div>',{'id':users, 'style':'display:none;'}).appendTo($pageUserHistory);
			$.each(pages, function(id,html)
			{
				$('<div>', {'id':'page'+id}).html(html).appendTo($tl);			
			});
		});
	} else {
		//JSON.stringify(savedRss);
		//sessionStorage.pageUserHistory = '';
		localUsers = {};
	}

	
	if(cURL==='/forum.php')
	{
		
		$pageStyle.append('.decenzureaza{ background:#C7D5ED; cursor:pointer; } .decenzureazat{ background:#DCE6F7; cursor:default; }  ');
		$('.forumPostName').each(function()
		{
			$table = $(this);
			$a = $table.find('a').length;
			
			if($a==3)
			{
				userID = $table.find('a[href*="userdetails.php?id="]').attr('href').replace(/.*id=/, "");
				postID = $table.prev().attr('name');
				if (postID==='last')
					postID = $table.prev().prev().attr('name');
				
				
				$tdComment = $table.next().find('.comment').html('Decenzurează');
				$trComment = $tdComment.parent().attr({'postID':postID, 'userID':userID}).addClass('decenzureaza');
				
				//console.log(userID, postID);
			}		   
		});
		
		//console.log('adaugam click event');
		$('.decenzureaza').one('click', function()
		{
			//console.log('decenzuram', $(this) );
			var $tr = $(this);
			var $td = $tr.find('.comment').html('<img src="'+loadingIMDzero+'" />');
			
			var userID = $tr.attr('userID');
			var postID = $tr.attr('postID');			
			var pageNb=0;
			var $p;
			
			if ( $('#pageUser'+userID).length === 0 )
			{
					$p = $('<div>',{'id':'pageUser'+userID, 'style':'display:none;'}).appendTo($pageUserHistory);
					localUsers['pageUser'+userID] = {};
					loadPage();
			} else {
					$p = $('#pageUser'+userID);
					loadPage1();
			}
			
			
			
			function loadPage1()
			{
				var $a = $p.find('a[href*="p'+postID+'#'+postID+'"]');
				if( $a.length !== 0 )
				{
					comment = $a.parents('table:eq(0)').next().next().find('.comment').html();
					$td.html(comment).attr('align','left');
					$tr.removeClass('decenzureaza').addClass('decenzureazat');
					fixSpoilers();
					postFindCiteaza(1);
				} else {
					pageNb = parseInt($p.attr('pageNb'))+1;
					loadPage();
				} 
				
			}
			
			
			function loadPage()
			{
				if ( $('#page'+pageNb, $p).length === 0 )
				{
					$tmp = $('<div>', {'id':'page'+pageNb}).appendTo($p);					
				} else
					$tmp = $('#page'+pageNb, $p);
					
				
				$tmp.load("userhistory_posts.php?action=viewposts&id="+userID+"&page="+pageNb+"  .pageContainer table:eq(0) table:eq(0)", function (d)
				{
					localUsers['pageUser'+userID][pageNb] = $(this).html();					
					sessionStorage.pageUserHistory = JSON.stringify(localUsers);
					
					
					//<a href="./forum.php?action=viewtopic&amp;topicid=12763&amp;page=p9521489#9521489">9521489</a>
					var $a = $(this).find('a[href*="p'+postID+'#'+postID+'"]');
						
					if( $a.length !== 0 )
					{
							comment = $a.parents('table:eq(0)').next().next().find('.comment').html();
							$td.html(comment).attr('align','left');
							$p.attr('pageNb',pageNb);
							$tr.removeClass('decenzureaza').addClass('decenzureazat');
							fixSpoilers();
							postFindCiteaza(1);
					} else {
							pageNb++;
							loadPage();
						}
				}); 
				
			}
		});
		
	}
	
	
	end("DeCenzureaza()");
}


function forumMarkNewTopic()
{
	start("forumMarkNewTopic()");

	//forum.php?action=viewforum&forumid=7
	fAction = sURL.replace(/.*viewforum&/, "");
	forumID = fAction.replace(/.*forumid=/, "").replace(/&.*/,"");
	fAction = fAction.replace(/=.*/, "");
	
	fID = 'fID'+forumID;
	
	//console.log(fID, forumID, fAction);
	
	if(localStorage.arrayTopic == undefined) 
		var arrayTopic = new Object();	
	else 
		var arrayTopic = JSON.parse( localStorage.arrayTopic );
	
	//console.log('arrayTopic', arrayTopic);
	//console.log('arrayTopic[fID]', arrayTopic[fID]);
	
	if (arrayTopic[fID] == undefined)
		arrayTopic[fID] = [];
	
	
	
	if (cURL==='/forum.php' && fAction==='forumid')
	{
		$tr = $('.pageContainer table:eq(0) tr');
		
		// href=​"?action=viewtopic&topicid=42968&page=p#"
		$tr.find('td table').each(function()
		{
			$a = $(this).find('a:eq(0)');
			topicID = parseInt($a.attr('href').replace(/.*topicid=/, '').replace(/&.*/, ''));
			
			if (  $.inArray(topicID, arrayTopic[fID]) == -1 )
			{
				$(this).attr('style', 'background: #d5edc0').parents('tr:eq(0)').attr('style', 'background: #d5edc0');
				arrayTopic[fID].push(topicID);
			}
			//console.log($a,  topicID, $(this), $(this).parent(), $(this).parents('tr:eq(0)') );
			
		});
		
		localStorage.arrayTopic = JSON.stringify(arrayTopic);
		//console.log(localStorage.arrayTopic);
	}
	//console.log(fAction, forumID, arrayTopic, JSON.stringify(arrayTopic));
	
	
	end("forumMarkNewTopic()");
}



function MoreThanSearch()
{
	if(cURL !=='/search.php')
		return;
	
	start("MoreThanSearch()");
	var cat = [];
	cat[11] = "Filme animate";
	cat[13] = "Filme documentare";
	cat[10] = "Anime";
	cat[2] = "Muzică";
	cat[3] = "Software";
	cat[9] = "Muzică video";
	cat[8] = "Cărţi";
	cat[7] = "Alte";
	cat[14] = "Cărţi audio";
	cat[16] = "Fotografii";
	cat[12] = "DVD";
	cat[5] = "TV";
	cat[4] = "Jocuri";
	cat[15] = "Lecţii video";
	cat[18] = "HDTV";
	cat[17] = "Sport";
	cat[1] = "Filme";
	
	
	
	$moreThanSearch = $('<div>',{'id':'moreThanSearch'}).attr({'style':' -webkit-border-radius:8px; border:1px solid #A79F72; background:#DCDCD2; padding:10px; opacity:0.8; cursor:default; margin: auto; font-size:13px; width: 800px;'}).insertBefore('.pageContainer:eq(0)');
	
	$loading = $('<div>',{'id':'mtsLoading'}).attr({'style':' background: url(/pic/loading.gif); width:60px; height:60px; position: fixed; top: 200px; left: 10px;'}).hide().appendTo($pageHtml);
	
	$resultsPage = $('.pageContainer > div:eq(1)');
	$torrentsTable = $('.pageContainer .tableTorrents');
	
	
	$('.pageContainer .tableTorrents tr:not(:eq(0))').attr('page', '0');
	
	var catHtml = '<label><input type="checkbox" id="mtsShow" checked="checked"/> Show Selected Categories</label> | <label><input checked="checked" type="checkbox" id="mtsToggle"/> Toggle</label>\
					<hr />';
	var i=0;
	$.each(cat, function(id, val)
    {
		if(val===undefined) return;
		i++;
		//if ()
		
		catHtml += '<label><input class="hideCat" type="checkbox" sid=":ID"/> :VAL</label>\n'.replace(/:ID/, id).replace(/:VAL/, val);
		if(i==11) catHtml += '<br>';
			
        console.log(id, val);
        
    });
    $moreThanSearch.html(catHtml);
	//console.log(catHtml);
	
	var inited = false;
	$moreThanSearch.find('.hideCat').one('click', function()
	{
		$loading.show();
		var id = parseInt($(this).attr('sid'));
		var show = $moreThanSearch.find('#mtsShow').is(':checked');
		var toggle = $moreThanSearch.find('#mtsToggle').is(':checked');
		
		
		
		if (! inited)
		{
			inited = true;
			
			//http://www.torrentsmd.com/search.php?search_str=naruto&page=1
			if ($resultsPage.find('a').length > 0)
			{
				$a = $resultsPage.find('a:last').attr('href');
				url = $a.replace(/page=.*/,'page=');
				pageNb = parseInt($a.replace(/.*page=/,''));
			} else {
				url = '';
				pageNb = 0;
			}
			
			var i=1;
			
			
			load(); 			
			
			function load()
			{
				if (i>pageNb) { $loading.hide(); return;}
				
				$tmp = $('<div>', {'id':'searchPage'+i, 'style':'display:none;'}).appendTo($torrentsTable);
				
				$tmp.load(url+i+"  .pageContainer .tableTorrents tr:not(:eq(0))", function ()
				{
					
					$(this).find('tr').each(function()
					{
						//$(this).attr('page',i).clone().insertAfter('.pageContainer .tableTorrents tr:last');
						
						gId = parseInt($(this).find('td:eq(0) a:eq(0)').attr('href').replace(/.*cat=/, ''));
						
						
						var display = "display:";
						if (show)						
							display += (id==gId)?'table-row':'none';
						else 
							display += (id==gId)?'none':'table-row';
						
						
						
						//$(this).attr('page',i).attr('style', function ()
													//{
														//return "display:"+ (  (id==gId && show)?'table-row':''  ) + (  (id==gId && !show)?'none':''  )
													//}).appendTo('.pageContainer .tableTorrents tbody');
						
						$(this).attr('page',i).attr('cat',gId).attr('style', display).appendTo('.pageContainer .tableTorrents tbody');
						//<a href="browse.php?cat=11">
						
					});
					
					
					i++;
					load();
					
					
				});
				
				var $tmp;
			}
		}
		
		$('.pageContainer .tableTorrents tr:not(:eq(0))').each(function()
		{
			gId = parseInt($(this).find('td:eq(0) a:eq(0)').attr('href').replace(/.*cat=/, ''));
			
			var display = "display:";
			if (show)
				display += (id==gId)?'table-row':'none';
			else 
				display += (id==gId)?'none':'table-row';
			
			$(this).attr('page',i).attr('cat',gId).attr('style', display)//.appendTo('.pageContainer .tableTorrents tbody');
		});
		
		$resultsPage.hide();
		$('.pageContainer > p:eq(0)').hide();
		
		//console.log(id);
		
		//console.log("face unbind");
		$moreThanSearch.find('.hideCat').unbind();
		
		
		//console.log('facem un nou catch pu events-uri..');
		
		$moreThanSearch.find('.hideCat').click(function()
		{
			$loading.show();
			var allId, id;
			show = $moreThanSearch.find('#mtsShow').is(':checked');
			toggle = $moreThanSearch.find('#mtsToggle').is(':checked');
			
			if (toggle)
			{
				$moreThanSearch.find('.hideCat:checked').not($(this)).attr('checked', false);
				allId = [parseInt($(this).attr('sid'))];
			} else {
				allId = $moreThanSearch.find('.hideCat:checked').map(function()
						{
							return parseInt($(this).attr('sid'));
						});
			}		
			
			
			//console.log('clicked pe', id||allId, cat[id]);
			//$(this).attr('cheched', 'cheched');			
			
			$('.pageContainer .tableTorrents tr:not(:eq(0))').each(function()
			{
				$tr = $(this);
				gId = parseInt($tr.attr('cat'));
				var display = "display:";
				
				
				if (  $.inArray(gId, allId) != -1 )
				{
					if (show)
						display += 'table-row';
					else 
						display += 'none';
				} else {
					if (!show)
						display += 'table-row';
					else 
						display += 'none';
				}
				//console.log(gId, allId, display);
				//if (toggle)
				//{
					//if (show)
						//display += (id==gId)?'table-row':'none';
					//else 
						//display += (id==gId)?'none':'table-row';
				//} else {
					
					////~ $.each(allId, function(id)
					////~ {
						////~ if (show)
							////~ display += (id==gId)?'table-row':'none';
						////~ else 
							////~ display += (id==gId)?'none':'table-row';						
					////~ });
					//if ($.inArray(gId, allId))
					//{
						//if (show)
							//display += 'table-row';
						//else 
							//display += 'none';
					//} else {
						//if (show)
							//display += 'table-row';
						//else 
							//display += 'none';
					//}			
					
				//}
											
				$tr.attr('style', display);				
				//console.log($tr, gId, show, toggle, display);
			});
			
			$loading.hide();
		});
		
		$moreThanSearch.find('#mtsShow').click(function()
		{
			$loading.show();
			
			sh = $(this).is(':checked');
			//console.log('rvert', sh);
			
			
				$('.pageContainer .tableTorrents tr:not(:eq(0))').each(function()
				{
					css = $(this).css('display');
					revertedCss = (css==='none')?'table-row':'none';
					$(this).css('display', revertedCss)		
				});	
			
			$loading.hide();
			
		});
		
		
	});
	
	
	//$('.topheader form');
	//window.history.pushState("object or string", "Title", "/new-url");
	$plus = $('<span>',{'id':'plusMoreThanSearch'}).html('<b>[+]</b> ').prependTo('.topheader form').click(function()
			{
				console.log($(this), 'clicked');				
			});
	
	

	
	

	
	
	end("MoreThanSearch()");
}





			//log(JSON.stringify(newTorrent));
				//log(JSON.parse(JSON.stringify(newTorrent)));
			
			
			//if(localStorage.torrentsList == undefined) 
			//{				
				//var storageData = new Object();
					//storageData.data=[];
					
				//storageData.data.push(JSON.stringify(newTorrent));
				//log('saved');
				//log(storageData);
				//localStorage.torrentsList= JSON.stringify(storageData);
			//} else {
				//var storageData = JSON.parse(localStorage.torrentsList);
					
				//storageData.data.push(JSON.stringify(newTorrent));
				//log('saved');
				//log(storageData);
				//localStorage.torrentsList= JSON.stringify(storageData);
			
			//}




/**


 */
function fixSpoilersOld()
{
	start("fixSpoilers()");

	function initPostImages(context)
	{
		var done_anything = false;
		var $in_spoilers = $('div.sp-body var.postImg', context);
		$('var.postImg', context).not($in_spoilers).each(function ()
		{
			var $v = $(this);
			var src = $v.attr('title');
			var $img = $('<img class="' + $v.attr('className') + '" alt="pic" />').attr('src', src);
			$v.before($img).remove();
			done_anything = true;
		});
		
		return done_anything;
	}

//	function initIurl()
//	{
//		$("a.lbimg").not('.initIurl').each(function ()
//		{
//			if ($(this).hasClass('initIurl')) return; // Putea fi adaugat mai jos, cind deja acest ciclu era pornit
//			$(this).parents('td:first').not('.initIurl').each(function ()
//			{
//				$("a.lbimg", $(this)).lightBox().css("color", "green").css("font-weight", "bold").addClass('initIurl');
//			}).addClass('initIurl');
//		});
//	}



/*
	<div class="sp-wrap">
		<div class="sp-head folded clickable jsClickEvAttached">Screenshot (apasă aici)</div>
		<div class="sp-body">Aici e un text şi o imagine ascunsă<br>
			<var class="postImg" title="http://zamolxismd.org/m/www.torrentsmd.com/pic/torrents_logo.png"></var><br>
			* 
			<div class="sp-foot jsClickEvAttached" style="display: block; "><span class="lang-ro-hide-all">Închide</span><span class="lang-ru-hide-all">Закрыть</span></div>
		</div>
	</div>
	* 
function initSpoilers()
{
  $j('div.sp-head').not('.jsClickEvAttached').click(function (e)
  {
    var $sp_body = $j('div.sp-body:first', $j(this).parents('div.sp-wrap')[0]);

    if (!$sp_body.hasClass('inited'))
    {
      var any_image = initPostImages($sp_body);

      $sp_body.addClass('inited');

      if ($sp_body.height() > 300 || any_image) $sp_body.find('.sp-foot:last').show();
    }

    if (e.shiftKey)
    {
      e.stopPropagation();
      e.shiftKey = false;
      var fold = $j(this).hasClass('unfolded');
      $j('div.sp-head', $j($sp_body.parents('td')[0])).filter(function ()
      {
        return $j(this).hasClass('unfolded') ? fold : !fold
      }).click();
    }
    else
    {
      $j(this).toggleClass('unfolded');
      $sp_body.slideToggle('fast');
    }
  }).addClass('jsClickEvAttached').each(function ()
  {
    this.innerHTML += ' (' + lang_click_here + ')';
  });
  $j('div.sp-foot').not('.jsClickEvAttached').click(function ()
  {
    var $sp_head = $j(this).parents('div.sp-wrap:first');
    // Only if our viewpoint is below the top of the spoiler
    if ($j(window).scrollTop() > $sp_head.offset().top) $j('html, body').animate(
    {
      scrollTop: $sp_head.offset().top - 1
    }, 80);
    $sp_head.find('div.sp-head:first').click();
  }).addClass('jsClickEvAttached');
}
*/
	$('div.sp-head:not(.flienteenDiv)').each(function()
	{
		log($(this));  
		t=$(this).html(); //нажмите\\sсюда
		reg=new RegExp("(\\(apasă aici\\)$)|(\\(нажмите сюда\\)$)");
//		console.log(":"+t+":", t.replace(reg, ''));
		
		if(t.match(reg) && localStorage.opUseSpoilerHideHlp==='true')
		{
//			alert('match');
			$(this).html( t.replace(reg, '&nbsp;') );
		}
		
		$(this).unbind('click').click(function(e)
		{
			var $this = $(this);
			var $parent = $this.parents('div.sp-wrap')[0];
			var $sp_body = $('div.sp-body:first', $parent);
//			var top = $(document).scrollTop();

			
			if (!$sp_body.hasClass('inited'))
			{
				var any_image = initPostImages($sp_body);

				$sp_body.addClass('inited');
				
				//if ($sp_body.height()>300 || any_image)
                    $sp_body.find('.sp-foot:last').show();
				
//				if ( $('.cstmPlus',$parent).length ===0 )
//				{
//					var $cstmPlus = $('<div>',{'class':'cstmPlus','style':'margin-left: 10px; font-weight:bold; padding: 1px 14px 3px; cursor: pointer;'}).insertAfter($sp_body).html( $this.html() );
//				}
			
			} else {
//					var $cstmPlus = $('.cstmPlus', $parent);
			}
			
			
			if (e.shiftKey)
			{
				e.stopPropagation();
				e.shiftKey = false;
				var fold = $this.hasClass('unfolded');
				$('div.sp-head', $parent).filter(function ()
				{
					return $this.hasClass('unfolded') ? fold : !fold;
				}).click();
				
			} else {
				$this.toggleClass('unfolded');
//				$cstmPlus.toggleClass('unfolded');
				$sp_body.slideToggle('fast');
			}
			
			
			
			$('div.sp-foot').unbind('click').click(function ()
			{
				var $sp_head = $(this).parents('div.sp-wrap:first');
				// Only if our viewpoint is below the top of the spoiler
				if ($(window).scrollTop() > $sp_head.offset().top) 
				$('html, body').animate(
									{
										scrollTop: $sp_head.offset().top - 20
									}, 80);
				$sp_head.find('div.sp-head:first').click();
			});
			
//			$cstmPlus.unbind('click').click(function()
//			{
//				log($this);
//				$('html, body').animate({scrollTop: top+'px'}, 500);
//				$this.toggleClass('unfolded');
//				$sp_body.slideToggle('fast');
//				$cstmPlus.toggleClass('unfolded');
//				
//			});
			
		}); 
	}).addClass('flienteenDiv');

	$pageStyle.append('/*Fixiruim width-ul la spoilere */.sp-body, .sp-wrap{overflow:auto;}  .sp-body{max-width:757px;} .sp-wrap{max-width:766px;} .comment .sp-body{max-width:675px;} .comment .sp-wrap{max-width:680px;}  div.cstmPlus:not(.unfolded){display:none;}');
	$pageHtml.append('<script>$j("div.sp-head").unbind();</script>');

	end("fixSpoilers()");
}
//$.wait(1000).then(function() { fixSpoilers();  } );
//fixSpoilers(); 

//ushidem si o fost pana acum.
function fixSpoilers(){}


/*
 * cica new version
 * blea. lucreaza super, da raman parantezele de la click aici ()
 */
function fixSpoilers2()
{
	start("fixSpoilers()");

	$pageHtml.append('<script>$j("div.sp-head").unbind();</script>');
	$('div.sp-head').each(function(i,e)
	{
		t=$(e).html();
		reg=new RegExp("(\\(apasă aici\\)$)|(\\(нажмите сюда\\)$)");
		
		if(t.match(reg) && localStorage.opUseSpoilerHideHlp==='true')
		{
			$(e).html( t.replace(reg, '&nbsp;') );
		}
		console.log(t.match(reg)==true, localStorage.opUseSpoilerHideHlp==='true', t, reg, e);
		
		$(e).removeClass('jsClickEvAttached');		
	});
	$('div.sp-foot').removeClass('jsClickEvAttached');

	//iaka sha nna! ^_^
	$pageHtml.append('<script>message = function message(v){return "&nbsp;";}; initSpoilers();</script>');
	
	end("fixSpoilers()");
}

/*
 * cica new version
 * 
 */
function fixSpoilers3blea()
{
	$pageHtml.append('<script>$j("div.sp-head").unbind();</script>');
	$('div.sp-head').each(function(i,e)
	{
		t=$(e).html();
		reg=new RegExp("(\\(apasă aici\\)$)|(\\(нажмите сюда\\)$)");
		
		if(t.match(reg) && localStorage.opUseSpoilerHideHlp==='true')
		{
			$(e).html( t.replace(reg, '&nbsp;') );
		}
		
		$(e).removeClass('jsClickEvAttached');		
	});
	$('div.sp-foot').removeClass('jsClickEvAttached');

	//imported code from tmd sources
	$j = $;
	function initPostImages(context)
	{
	    var done_anything = false;
		var $in_spoilers = $j('div.sp-body var.postImg', context);
		$j('var.postImg', context).not($in_spoilers).each(function(){
			var $v = $j(this);
			var src = $v.attr('title');
			var $img = $j('<img class="'+ $v.attr('className') +'" alt="pic" />').attr('src',src);
			$v.before($img).remove();
	        done_anything = true;
		});
	    return done_anything;
	}
	
	
	$j('div.sp-head').not('.jsClickEvAttached').click(function(e){
			var $sp_body = $j('div.sp-body:first', $j(this).parents('div.sp-wrap')[0]);

			if (!$sp_body.hasClass('inited')) {
				var any_image = initPostImages($sp_body);
				
				$sp_body.addClass('inited');

    			if ($sp_body.height()>300 || any_image)
    				$sp_body.find('.sp-foot:last').show();
            }
            
			if (e.shiftKey) {
				e.stopPropagation();
				e.shiftKey = false;
				var fold = $j(this).hasClass('unfolded');
				$j('div.sp-head', $j($sp_body.parents('td')[0])).filter( function(){ return $j(this).hasClass('unfolded') ? fold : !fold } ).click();
			}
			else {
				$j(this).toggleClass('unfolded');
				$sp_body.slideToggle('fast');
			}
	}).addClass('jsClickEvAttached');
	$j('div.sp-foot').not('.jsClickEvAttached').click(function () {
		var $sp_head = $j(this).parents('div.sp-wrap:first');
        // Only if our viewpoint is below the top of the spoiler
        if ( $j(window).scrollTop() > $sp_head.offset().top )
		    $j('html, body').animate({scrollTop:$sp_head.offset().top-1}, 80);
		$sp_head.find('div.sp-head:first').click();
	}).addClass('jsClickEvAttached');
}


/**


 */
function forumMkPsLink()
{
	start("forumMkPsLink()");

	if(cURL==='/forum.php')
	{//span.post_like ?action=editpost
		$('.forumPostName').each(function()
		{
			$a = 0;
			if ($(this).find('a[href*="?action=quotepost"]').length > 0)
			{
				$a = $(this).find('a[href*="?action=quotepost"]');	   
			} else if ($(this).find('a[href*="?action=editpost"]').length > 0)
			{
				$a = $(this).find('a[href*="?action=editpost"]');
			}
		
//		if($('.forumPostName a[href*="?action=quotepost"]').length > 0)
			if ($a)
			{
				pId=$a.attr('href').replace(/.*postid=/, "");
				tId=sURL.replace(/.*topicid=/, "").replace(/&.*/, "");
				qLink="http://www.torrentsmd."+(localStorage.domainName||'com')+"/forum.php?action=viewtopic&topicid="+tId+"&page=p"+pId+"#"+pId;
				$a.after('] - [<a href="'+qLink+'">'+_text('forum','link')+'</a>');
			}
		});
//		$('.forumPostName a[href*="?action=quotepost"], .forumPostName a[href*="?action=editpost"]').each(function()
//		{
//			pId=$(this).attr('href').replace(/.*postid=/, "");
//			tId=sURL.replace(/.*topicid=/, "").replace(/&.*/, "");
//			qLink="http://www.torrentsmd.com/forum.php?action=viewtopic&topicid="+tId+"&page=p"+pId+"#"+pId;
//			$(this).after('] - [<a href="'+qLink+'">'+_text('forum','link')+'</a>');
//		});	
	}
	
	end("forumMkPsLink()");
}


/**


 */
function forumShowTitle()
{
	start("forumShowTitle()");

//	cURL=window.location.pathname;
//	sURL = window.location.search;
	fAction = sURL.replace(/\?action=/, "").replace(/&topicid=.*/, "");
	
	if ( $('#forumShowTitle').length == 0 )
	{
		$c = $("<div>", {id:'forumShowTitle'}).appendTo(document.body);
		$pageStyle.append("#forumShowTitle {-webkit-transition: opacity .3s ease-in-out; position:fixed; top:30px; left:12px; -webkit-border-radius:8px; border:1px solid #A79F72; background:#DCDCD2; padding:5px; opacity:0.5; cursor:default; -webkit-user-select:none; max-width:150px; text-align: center;} #forumShowTitle:hover {opacity: 1}");
		
	} else $c = $('#forumShowTitle');
	
	if(cURL==='/forum.php' && fAction==='viewtopic')
	{
		//Torrents.Md - BitTorrent Tracker Moldova :: Vezi tema - Connectable: NO
		pTitle = $('title').text().replace(/ ::.+/,'').replace(/(Vezi tema - )|(Просмотр темы - )/,'');
		
		
//		if( $('#forumShowTitle').length == 0 )
//			$(document.body).append('<div id="forumShowTitle" style="position:fixed; top:5px; left:12px; -webkit-border-radius:8px; border:1px solid #A79F72; background:#DCDCD2; padding:5px; opacity:0.5; cursor:default; -webkit-user-select:none; max-width:150px; text-align: center;"  onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.5">'+pTitle+'</div>');
//		else
			$c.text(pTitle).fadeIn(500);
		//		 $('div[align="center"][style="width:880;margin:auto;height:auto;"]').eq(0).attr('id','container');
//		 $("#container").append('<div id="pTitle" style="position:fixed; top:5px; left:12px; -webkit-border-radius:8px; border:1px solid #A79F72; background:#DCDCD2; padding:5px; opacity:0.5; cursor:default; -webkit-user-select:none; max-width:150px;"  onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.5">'+pTitle+'</div>');		 
	} else $c.fadeOut(500);
	
	//console.log($c, cURL, sURL, fAction);
	
	end("forumShowTitle()");
}




/**


 */
function wtch()
{
	start('wtch()');
	$cntWtch = $("<div>", {id: 'cntWtch', style: "display:none"}).appendTo($pageHtml);
	$cnt=$('a[href="/watcher.php"]').parent();
	$cnt.html($cnt.html().replace(/\)/,' - <a id="cntWtchI" href="#loadWtch">?</a>) <img id="cntWtchLoading" src="'+loadingIMDzero+'" style="height: 6px;" />'));

	var db = openDatabase('wtchDB', '1.0', 'wtch db', 5 * 1024 * 1024), isMkRequest=false;
	
	function checkCookie()
	{
		var isCntWtchLoad=getCookie("CntWtchLoad");
		if (isCntWtchLoad!==null && isCntWtchLoad!=="" && isCntWtchLoad!==undefined){ log('checkCookie() - nu facem nica >>'+isCntWtchLoad); isMkRequest=false;}
		else {log('checkCookie() - am introdus! >>'+isCntWtchLoad); isMkRequest=true;}
	}
	checkCookie();
	
	cntWtchLoad();
	
   
//	var cURL = window.location.pathname;
	var faction = window.location.search.replace(/\?action=/, "").replace(/&topicid=.*/, "").replace(/&forumid=.*/, "");
	if (cURL==='/forum.php' && faction==='viewforum')
	{
		db.transaction(function (tx) 
		{
			var sId=parseInt(window.location.search.replace(/.*forumid=/, ""));
			tx.executeSql('UPDATE forumsS SET teme=(SELECT forumsI.teme FROM forumsI WHERE id=?) WHERE forumsS.id=?', [sId, sId]);
			tx.executeSql('UPDATE forumsCatS SET teme=(SELECT teme FROM forumsCatI WHERE id=?) WHERE id=?',[sId,sId]);
			log('Updated DB. ID='+sId);
		});
	}	

	
	//check if db is not empty..
	db.transaction(function (tx) 
	{
		log('>check if db is not empty..');
		tx.executeSql('SELECT COUNT(forumsI.id) AS c FROM forumsI', [], function (tx, results)
		{
			if(results.rows.item(0).c < 1) 
			{
				log('>>is empty.. reiniting..');
				wtchInit();
				wtchInitSubCat();
			}			
		});
	});//db 

//==========
function cntWtchLoad()
{
//	start("cntWtchLoad()");
	if (isMkRequest){MkRequest();}else{fillCntWtchIcount();}

	function MkRequest()
	{
		log('MkRequest>>>'); 
//		console.log('$pageHtml>',$pageHtml, '  $cntWtch>',$cntWtch);
		$cntWtch.load('forum.php div.pageContainer p+table', function()
		{
			log('GET> '+$cntWtch.html());
			db.transaction(function (tx) {
			   $('a[href*="?action=viewforum&forumid="] b', $cntWtch).each(function()
			   {
					$tr=$(this).parents('tr:eq(1)');//.css('background-color', 'red');
					
					forum=$('a[href*="?action=viewforum&forumid="] b',$tr).text();
					forumID=$('a[href*="?action=viewforum&forumid="] b',$tr).parent().attr('href').replace(/.*forumid=/,'');
					teme=$('td[align="right"]:eq(0)',$tr).text();
					//replici=$('td[align="right"]:eq(1)',$tr).text();
					//data=$('nobr',$tr).text().replace(/by.*/, "");				

					tx.executeSql('UPDATE forumsI SET teme=? WHERE id=?', [parseInt(teme), parseInt(forumID)]);
					
					$td=$(this).parents('td:eq(0)');
					$td.html($td.html().replace(/\(/g,'<span>').replace(/\)/g,'</span>'));
					$td.find('a:not(:eq(0))').each(function()
					{
						cId=parseInt($(this).attr('href').replace(/.*subcat=/,''));
						cTeme=parseInt($(this).next('span').text());							
						
						tx.executeSql('UPDATE forumsCatI SET teme=? WHERE id=?', [cTeme, cId]);
					});  
					//$cntWtch.remove();
					
					setCookie("CntWtchLoad",'true',1);
			   });//fill db $.each			  
			
			});//db 
			
			fillCntWtchIcount();  
		});//load complete   
	}//MkRequest()



	function fillCntWtchIcount()
	{
		db.transaction(function (tx) {	
			tx.executeSql('SELECT COUNT(forumsS.id) AS c FROM forumsI LEFT JOIN forumsS on forumsI.id=forumsS.id WHERE forumsI.teme>forumsS.teme', [], function (tx, results)
			{
				  count = results.rows.item(0).c;
				  $('#cntWtchI').text(count);
				  $('#cntWtchLoading').hide();
//				  localStorage.cntWtchIcount=count;				
			});
			
 

			var tds='', cArray=[], cAc=0, tArray=[], tAc=0, i;
			tx.executeSql('SELECT *, forumsI.teme-forumsS.teme AS dif FROM forumsI LEFT JOIN forumsS on forumsI.id=forumsS.id WHERE forumsI.teme>forumsS.teme', [], function (tx, results)
			{
				tAc=results.rows.length;
				for (i = 0; i < tAc; i++)
				{
				   tArray[i]=[];
				   tArray[i]['id']=results.rows.item(i).id;
				   tArray[i]['teme']=results.rows.item(i).teme;
				   tArray[i]['forum']=results.rows.item(i).forum;
				   tArray[i]['dif']=results.rows.item(i).dif;
				}
			});
			
			
			
		start("SQL->SELECT #2");
			//SELECT *, forumsCatI.teme-forumsCatS.teme AS dif, (SELECT forum FROM forumsI WHERE ID=forumsCatI.forum ) as F FROM forumsCatI LEFT JOIN forumsCatS ON forumsCatI.id=forumsCatS.id WHERE forumsCatI.teme>forumsCatS.teme ORDER BY forum ASC
			tx.executeSql('SELECT *, forumsCatI.teme-forumsCatS.teme AS dif FROM forumsCatI LEFT JOIN forumsCatS ON forumsCatI.id=forumsCatS.id WHERE forumsCatI.teme>forumsCatS.teme ORDER BY forum ASC', [], function (tx, results)
			{
				cAc=results.rows.length;
				
				cVc=[];cVc2=[];
				for (i = 0; i < cAc; i++){cVc.push(parseInt(results.rows.item(i).forum));}
				for (i = 0; i < cAc; i++)
				{
					cZ=parseInt(results.rows.item(i).forum);
					
					//log('1. '+results.rows.item(i).forum+'\t'+results.rows.item(i).cat+'\t'+results.rows.item(i).id);
					if($.inArray(cZ,cVc2)===-1)
					{
						//log('2.\t'+cZ+"\t"+countvalues(cVc)[cZ]); 
						cVc2.push(cZ);
						var cI=0;
						cArray[cZ]=[]; log('cArray['+cZ+']=[]');
						
						if  (countvalues(cVc)[cZ]>1)
						{
							//cArray[cZ][cI]=[];
							for (k = 0; k < cAc; k++)
							{
								kcZ=parseInt(results.rows.item(k).forum);
								if (kcZ==cZ) 
								{
									//log('3a.\t\t'+results.rows.item(k).cat+'\t'+kcZ);
									//try{log('\t0.cArray['+cZ+']['+(cI-1)+'][cat]='+cArray[cZ][cI-1]['cat']);}catch(e){log('\t0.cArray['+cZ+']['+(cI-1)+'][cat]');}
									//if(!isArray(cArray[cZ][cI])) 
									cArray[cZ][cI]=[]; log('cArray['+cZ+']['+cI+']=[]');
									//try{log('\t1.cArray['+cZ+']['+cI+'][cat]='+cArray[cZ][cI]['cat']);}catch(e){log('\t1.cArray['+cZ+']['+cI+'][cat]=')}
									
									cArray[cZ][cI]['id']=results.rows.item(k).id;
									cArray[cZ][cI]['cat']=results.rows.item(k).cat;
									cArray[cZ][cI]['forum']=cZ;
									cArray[cZ][cI]['dif']=results.rows.item(k).dif;
									
									log('\tcArray['+cZ+']['+cI+'][cat]='+cArray[cZ][cI]['cat']);
									//log('3a.\t\t'+cI+'|'+cZ+':>'+cArray[cZ][cI]['id']+":"+cArray[cZ][cI]['cat']+":"+cArray[cZ][cI]['forum']+":"+cArray[cZ][cI]['dif']);
									
									cI++;
								}//if
							}//for
						}else{
							//for (j=0; j<countvalues(cVc)[cZ]; j++){
							//log('3b.\t\t'+results.rows.item(i).cat+'\t'+cZ); //}
							cArray[cZ][0]=[]; 
//							log('cArray['+cZ+'][0]=[]');
							cArray[cZ][0]['id']=results.rows.item(i).id;
							cArray[cZ][0]['cat']=results.rows.item(i).cat;
							cArray[cZ][0]['forum']=cZ;
							cArray[cZ][0]['dif']=results.rows.item(i).dif;
							
							log('3b.\t\t'+cZ+':>'+cArray[cZ][0]['id']+":"+cArray[cZ][0]['cat']+":"+cArray[cZ][0]['forum']+":"+cArray[cZ][0]['dif']);
						}
					}
				}
				
//						$.each(cArray, function(i, v) {log("index", i, "value", v);});
//						log(cArray.valueOf());
			
		end("SQL->SELECT #2");  
			});
			
			
			
			function mkTds()
			{
				var mTds='',i;
				for (i = 0; i < tAc; i++)
				{
				   var tc=tArray[i]["id"], mCtd='';
				   if(isArray(cArray[tc]))
				   {		  
					   for (j=0; j<cArray[tc].length; j++)
					   {
							mCtd+=(j)?', ':'';
							mCtd+='<a href="forum.php?action=viewforum&amp;forumid='+cArray[tc][j]['forum']+'&amp;subcat='+cArray[tc][j]['id']+'">'+cArray[tc][j]['cat']+'</a> ('+cArray[tc][j]['dif']+')';											 
					   }
					   if(j){mCtd='<br><div style="max-width:500px; min-width: 300px;">'+mCtd+'</div>';}				  
				   }
				   
				   mTds+='<tr><td><input mar="true" type="checkbox" vId="'+tArray[i]["id"]+'" vTeme="'+tArray[i]["teme"]+'" /></td><td align="left"><a href="forum.php?action=viewforum&forumid='+tArray[i]["id"]+'"><b>'+tArray[i]["forum"]+'</b></a>'+ mCtd +'</td><td align="right">'+tArray[i]["dif"]+'</td>	<td align="right">'+tArray[i]["teme"]+'</td>  </tr>';
				}
				
				return (tAc)?mTds:'<tr class="noHover"><td colspan="4" align="center"><h1><span class="lang-ru-hide-all">Ничего нового</span><span class="lang-ro-hide-all">Nimic nou</span></h1></td>	</tr>';
			}
			
			
				$('#cntWtchI').click(function()
				{
					log('#cntWtchI.click()');				
					$('div.pageContainer:eq(0)').html('<h1><span class="lang-ru-hide-all">Новые темы</span><span class="lang-ro-hide-all">Topicuri Noi</span></h1><table id="tableNewPoics" align="center" width="100px" border="1" cellspacing="0" cellpadding="5">  <tbody>	<tr class="noHover">	<td class="colhead"><input id="markAll" type="checkbox" /></td>	  <td class="colhead" align="left"><span class="lang-ru-hide-all">Форум</span><span class="lang-ro-hide-all">Forum</span></td>	  <td nowrap class="colhead"><span class="lang-ru-hide-all">Новые темы</span><span class="lang-ro-hide-all">Topicuri Noi</span></td>	  <td class="colhead"><span class="lang-ru-hide-all">Темы</span><span class="lang-ro-hide-all">Topicuri</span></td>		  </tr>	'+mkTds()+'	   <tr class="noHover"><td colspan="4" align="center" style="padding:10px;"><span class="lang-ru-hide-all" id="markAsRead">Отметить как прочитанное</span><span class="lang-ro-hide-all" id="markAsRead">Marchează ca fiind citite</span></td>	</tr>  </tbody></table><br><br>');
					
					$pageStyle.append('#forumShowTitle{display:none;} #tableNewPoics tr:not(.noHover):hover{cursor: pointer;background-color: #DBD6C0;}	#markAsRead {opacity:.2;background: #0A50A1;padding: 5px 10px 6px;font-weight: bold; font-size:12px; color: #fff; -webkit-border-radius: 6px;	-webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.6);	text-shadow: 0 -1px 1px rgba(0,0,0,0.25);	cursor: pointer;	-webkit-transition-property: background-color;-webkit-transition-duration: 0.5s;-webkit-transition-timing-function: ease;}#markAsRead:hover {background-color: #5E8ABC;}');
					
					$('#markAll').click(function()
					{
						inValC=$(this).attr('checked');
						$('#tableNewPoics input[mar="true"]').each(function()
						{
							$(this).attr('checked',inValC);
							$(this).parent().parent().animate({opacity:( (inValC)?'0.2':'1'), 'background-color':( (inValC)?'#f7f3e1':'') }, 400);					   $('#tableNewPoics #markAsRead').animate({opacity:1}, 400);
						});					
					});
					
					$('#tableNewPoics tr:not(.noHover)').click(function()
					{
						inValC=!$('input', this).attr('checked');
						$('input', this).attr('checked', inValC);
						$(this).animate({opacity:( (inValC)?'0.2':'1'), 'background-color':( (inValC)?'#f7f3e1':'') }, 400);
						$('#tableNewPoics #markAsRead').animate({opacity:1}, 400);
					});
					
					$('#tableNewPoics input').click(function()
					{
						log(this);
						inValC=!$(this).attr('checked');
						$(this).attr('checked', inValC);
						$(this).parent().parent().animate({opacity:( (inValC)?'0.2':'1'), 'background-color':( (inValC)?'#f7f3e1':'') }, 400);
						$('#tableNewPoics #markAsRead').animate({opacity:1}, 400);
					});		 
					 
					 
				});
			//});
		});//db
	}// fillCntWtchIcount()		
			
					$('#tableNewPoics #markAsRead').live('click', function()
					{
						db.transaction(function (tx) 
						{				  
							$('#tableNewPoics input[mar="true"]:checked').each(function()
							{
								var upId=parseInt($(this).attr('vID')), upTeme=parseInt($(this).attr('vTeme'));

								tx.executeSql('UPDATE forumsS SET teme=? WHERE id=?',[upTeme,upId]);
								tx.executeSql('UPDATE forumsCatS SET teme=(SELECT teme FROM forumsCatI WHERE id=?) WHERE id=?',[upId,upId]);

								$(this).parent().parent().hide();
								$('#markAll').attr('checked',false);
								$('#tableNewPoics #markAsRead').animate({opacity:.2}, 400);						   
							}); 
						});
					}); 
							

}//fn
//==========
	end('wtch()');
}





function wtchInit()
{
	start('wtchInit()');
	//DB init
	var db = openDatabase('wtchDB', '1.0', 'wtch db', 5 * 1024 * 1024);
	db.transaction(function (tx) 
	{
		tx.executeSql('DROP TABLE IF EXISTS forumsI');
		tx.executeSql('DROP TABLE IF EXISTS forumsS');
		tx.executeSql('CREATE TABLE IF NOT EXISTS forumsI (id unique, forum, teme)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS forumsS (id unique, forum, teme)');
	});

	$cntWtch = $("<div>", {id: 'cntWtch', style: "display:none"}).appendTo($pageHtml);

	$cntWtch.load('forum.php div p+table', function()
	{
		db.transaction(function (tx) 
		{ 
		   $('a[href*="?action=viewforum&forumid="] b', $cntWtch).each(function()
		   {
				$tr=$(this).parents('tr:eq(1)');//.css('background-color', 'red');
				
				forum=$('a[href*="?action=viewforum&forumid="] b',$tr).text();
				forumID=$('a[href*="?action=viewforum&forumid="] b',$tr).parent().attr('href').replace(/.*forumid=/,'');
				teme=$('td[align="right"]:eq(0)',$tr).text();				

				tx.executeSql('INSERT INTO forumsI (id, forum, teme) VALUES (?, ?, ?)', [parseInt(forumID),forum,parseInt(teme)] );
				tx.executeSql('INSERT INTO forumsS (id, forum, teme) VALUES (?, ?, ?)', [parseInt(forumID),forum,parseInt(teme)] );				
				
				$cntWtch.remove();
				
				//wtch();
		   });	   
		});
	});  
	
	end('wtchInit()');  
}

function wtchInitSubCat()
{
	start('wtchInitSubCat()');
	//DB init
	var db = openDatabase('wtchDB', '1.0', 'wtch db', 5 * 1024 * 1024);
	db.transaction(function (tx) 
	{
		tx.executeSql('DROP TABLE IF EXISTS forumsCatI');
		tx.executeSql('DROP TABLE IF EXISTS forumsCatS');
		tx.executeSql('CREATE TABLE IF NOT EXISTS forumsCatI (id unique, cat, forum, teme)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS forumsCatS (id unique, cat, forum, teme)');
	});

	$cntWtchCat = $("<div>", {id: 'cntWtchCat', style: "display:none"}).appendTo($pageHtml);

	$cntWtchCat.load('forum.php div p+table', function()
	{
		db.transaction(function (tx) 
		{ 

		   $('a[href*="?action=viewforum&forumid="] b', $cntWtchCat).each(function()
		   {
				$td=$(this).parents('td:eq(0)');
				$td.html($td.html().replace(/\(/g,'<span>').replace(/\)/g,'</span>'));

				$td.find('a:not(:eq(0))').each(function()
				{
					cId=parseInt($(this).attr('href').replace(/.*subcat=/,''));
					cCat=$(this).text();
					cForum=parseInt($(this).attr('href').replace(/.*forumid=/,'').replace(/&amp.*/,''));
					cTeme=parseInt($(this).next('span').text());
						log('\t'+cId+'\t'+cCat+'\t'+cForum+'\t'+cTeme);
					
					tx.executeSql('INSERT INTO forumsCatI (id, cat, forum, teme) VALUES (?, ?, ?, ?)', [cId, cCat, cForum, cTeme]);
					tx.executeSql('INSERT INTO forumsCatS (id, cat, forum, teme) VALUES (?, ?, ?, ?)', [cId, cCat, cForum, cTeme]);
//										INSERT INTO forumsCatS (id, cat, forum, teme) VALUES (79,'Familie',	8,	29)
				});
		   });
		   $cntWtchCat.remove();	   
		}); //db
	});	

	end('wtchInitSubCat()');
}


/**


 */
function saveDes()
{
	start('saveDes()');
	coloram='#D2E1EF';
//	cURL=window.location.pathname;
	if(cURL!=='/upload.php' && cURL!=='/edit.php'){log('nu suntem unde trebuie');end('saveDes()');return;}
	

	
	if(cURL=='/edit.php'){ log('pe edit!'); $.wait(1000).then(function(){ addSaveButton();}); end('saveDes()'); return;}
	
	
	
	log('suntem pe upload.php');

	$pageHtml.append('<style>#off{display:none;}</style>');
	
	$form=$('div>form');
	$form.html($form.html().replace(/<br>/,'<div id="off"><br>').replace(/<table/,'</div><table'));
	
	$off = $('#off');
	$on = $('<div>',{'id':'on'});
	 anUrl=$off.find('p:eq(0) b').html();
	 $inputAnUrl = $('<input>',{'type':'text', 'readonly':'readonly', 'value':anUrl, 'style':'width:590px; background:#DCDCD2; border:1px #DCDCD2; margin-bottom: 6px; font-weight: bold;'});
	 $plus = $('<a>',{'class':'plus', 'style':'position: absolute;font-size: 10px;color: #999;'}).html('<sup><b>[+]</b></sup>').click(function()
	 {
		$on.hide('slow', function(){$off.show('fast');}); 
	 });
	$on.html("The tracker's announce url is ").attr({'style':' -webkit-border-radius:8px; border:1px solid #A79F72; background:#DCDCD2; padding:10px; opacity:0.8; cursor:default; margin: 10px 40px 10px 40px; font-size:13px; '}).append($inputAnUrl).append($plus).insertAfter($off);
 
	$on.hover(function(){$inputAnUrl.hover(function(){$(this).select()}).select();}, function(){window.getSelection().removeAllRanges();});
	

	$t=$('#place_for_upload_table');
	$p=$('#table_upload_tbody', $t);
	$("#type_select").change(function(){ isTready().done(function() { addSaveButton();  }); });
	addLoadButton();

	
	
	function addLoadButton()
	{
		if(localStorage.torrentsList == undefined){return;}
		if(JSON.parse(localStorage['torrentsList']).data.length == 0){return;}
		
		$("#type_select").after('<select id="loadButton">   <option>('+_text('upload','load')+')</option>	</select>');
		$menu = $('#loadButton');
		
		var storageData = JSON.parse(localStorage['torrentsList']), op='';
		log(storageData);
		
		//var data=JSON.parse(storedData.data);
		  //	  log(data);
		for (i=0; i<storageData.data.length; i++)
		{
			log(i+'\t'+storageData.data[i]);
			op+="<option v='"+i+"' value='"+storageData.data[i]+"'>"+htmlDencode(JSON.parse(storageData.data[i]).name)+"</option>";		
		}
		$menu.append(op).css({'max-width':'300px'});
	
		$menu.change(function()
		{
			if($(this).val()=='('+_text('upload','load')+')'){return;}
			$ajaxS.show();
			data = JSON.parse($(this).val());
			log(data);
			
			$("#type_select").val(data.type).trigger('onchange');
			additional = countvalues(data.n)['additional_name[]'] || 0;
			log('additional='+additional);
			
			$menu.css({'background-color':coloram});
			
			
			isTready().done(function()
			{
				//$("#_add_new_additional").trigger('onclick');
				var cmnd='', j=-1;
				for(i=0; i<additional; i++) { cmnd+='new_additional(); '; }
				$pageHtml.append('<script>'+cmnd+'</script>');
				
				addSaveButton();
				$.each(data.n, function(i, v) 
				{
					if(v=='additional_name[]')
					{
						j++;
						$('*[name="'+v+'"]:eq('+j+')').css({'background-color':coloram}).val( htmlDencode(data.v[i]) );
						log(v+' '+j+'\t'+htmlDencode(data.v[i]));
					} else if (v=='additional_descr[]') {					
						$('*[name="'+v+'"]:eq('+j+')').css({'background-color':coloram}).val( htmlDencode(data.v[i]) );
						log(v+' '+j+'\t'+htmlDencode(data.v[i]));					
					} else if (v=='movie_genres_input') {
						$('#movie_genres_input').css({'background-color':coloram}).val( htmlDencode(data.v[i]) );
						log(v+' '+j+'\t'+htmlDencode(data.v[i])); 
					} else if (typeof(data.v[i])=='boolean') {
						$('*[name="'+v+'"]').css({'background-color':coloram}).attr('checked', data.v[i]);
						log(v+'\t'+htmlDencode(data.v[i]));					
					} else {
						$('*[name="'+v+'"]').css({'background-color':coloram}).val( htmlDencode(data.v[i]) );
						log(v+'\t'+htmlDencode(data.v[i]));
					}
					
				});
				
				$ajaxS.hide();
				//$("textarea[name='descr']").markItUp(tmdBbCodes); markItUpStart();				
			});			
		});
		
		//$menu.after('<input type="button" id="" />');
		$ajaxS = $('<img>',{src:loadingIMDzero}).hide().insertAfter($menu);
		$('<input>',{type:"button",value:_text('upload','edit')}).click(function(){editStoredData()}).insertAfter($menu);
	}
	
	
	function editStoredData()
	{
		log('editStoredData() -> Started');
		
		$id='cntESD'; $title=_text('upload','wndEdit');
		$('#'+$id).remove();
		$cntESD = $("<div>", {id: $id}).appendTo($pageHtml);
		
		$css  = '<style>#:ID * {-webkit-user-select:none;}  .container{width:600px !important;display: list-item;text-align: justify;line-height: 18px; -webkit-box-shadow: 1px 1px 10px #3E6692; -webkit-border-radius: 0px 0px 7px 7px; border: 0px !important;} '
+'				 #:ID  .box {padding: 10px;  overflow:auto; }	  '
+'				 #:ID  .l{z-index:1; border:solid 1px rgba(0,0,0,0.1);  -webkit-border-radius: 4px; cursor:default; background-color:#DCDCD2; font-size:12px; margin-right: 20px;} '
+'				 #:ID  .l a, .close {font-size:11px;} '
+'				 #:ID  .close {position: absolute;top: 1px;right: 2px;} '
+'				 #:ID  .close:hover {color: #58B;background-color: white;-webkit-border-top-left-radius: 75px;-webkit-border-top-right-radius: 75px;-webkit-border-bottom-left-radius: 75px;-webkit-border-bottom-right-radius: 75px; -webkit-transition: all .3s ease-in;}  '
+'				 #:ID  .l:hover{background-color: #dbd6c0;}  #:ID  .l af{font-weight:bold} '
+'				 #:ID  .l:hover af:hover { color:#0A50A1; cursor:pointer !important;}   '
+'				 #:ID  .d {color:rgba(0,0,0,0.3); background: #ece9d8; z-index:1; border:solid 1px #ece9d8; -webkit-border-radius: 4px; cursor:default; font-size:12px; margin-right: 20px;} '
+'				 #:ID  .box_header {font-size:16px;}		'
+'				 #:ID  .footer {padding: 10px; text-align: right; margin-right: 20px;}  '
+'				 #:ID  .do, #:ID .cancel {border: 1px solid #d0d0d0; background-color:#e8e8e8; color:#0A50A1; font-size: 18px;margin: 5px;} #:ID .do:hover, #:ID .cancel:hover {-webkit-box-shadow: #c0c0c0 1px 0px 7px;border: 1px solid #c0c0c0;}	  </style>';
		$html = '<div class="wnd container" style="z-index:1;"><div class="box_header"><div class="drag">:TITLE</div> <a class="close">&nbsp;X&nbsp;</a></div> <div class="content">   <div class="box"></div> <div class="footer"><input class="do" value=":CONFIRM" type="button" /> <input class="cancel" value=":CANCEL" type="button" /></div>	</div></div>			 <script>$j("#:ID .container").jqDrag(".drag");</script>';
		$inner = $css+$html; $inner = $inner.replace(/:ID/g,$id).replace(/:TITLE/g, $title).replace(/:CANCEL/g, _text('upload','cancel')).replace(/:CONFIRM/g, _text('upload','confirm'));
		$cntESD.html($inner);
 
 
		
		$('.container', $cntESD).css({'display':'block', 'left':50});
		$box = $('.box', $cntESD);		
		
		var storageData = JSON.parse(localStorage['torrentsList']);
		
		var spans='', del=[];
		for (i=0; i<storageData.data.length; i++)
		{
			t ='<span class="l">:N <af do="delete" what=":ID">x&nbsp;</af></span> ';
			spans+=t.replace(/:N/g, htmlDencode(JSON.parse(storageData.data[i]).name)).replace(/:ID/g, i);		
		}
		$box.html(spans);



		$('a.close', $cntESD).click(function(){ $cntESD.hide(800); });
		
		 $('af', $cntESD).click(function ()
		 {
			//log($(this).attr('what') + " Delete");
			del.push($(this).attr('what'));
//			var currentList=$("#toList").val();
//			$("#toList").val(currentList.replace($(this).attr('what'),''));
			$(this).parent().removeClass().addClass('d');
			$(this).parent().html($(this).parent().text());			  
		 });
		
		$('input.do', $cntESD).click(function()
		{
			log('input.do -> Clicked!');
			k = storageData.data;
			
			
			var rm=[];
//			for (var i=0; i<del.length; i++)
//			{
//				cSpliced+=' '+del[i];
//				var z =null;
//				z = k.splice(del[i],1);
//				
//				if(z.length==0)
//				{
//					console.log(z, 'pula! eroare');
//					console.log(del, del[i], i);
//					console.log(k[del[i]], k.length, [k], [k[del[i-1]]]);
//				}
//				rm.push(z);
//				$('.d', $cntESD).remove();
//				$('option[v="'+del[i]+'"]','#loadButton').remove();
//			}
			for(var i=0; i<k.length; i++)
			{
				if($.inArray(i+'', del) == -1)
				{
					rm.push(k[i]);
				}
				
			}
			
			storageData.data = rm;
			
			
			localStorage.torrentsList = JSON.stringify(storageData);			
			console.log(del);
			
			del=[];
		});
		
		$('input.cancel', $cntESD).click(function()
		{
			log('input.cancel -> Clicked!');
			$('.d', $cntESD).removeClass().addClass('l');
			del=[];
		});	
	
	}
	
	
	function addSaveButton()
	{
		log('addSaveButton() -> started');
		$('#send_button').after('<input type="button" class="btn" id="saveButton" value="Salvează" />');
		
//		log($('#send_button'));
//		log($('#send_button').length);
		
		$('#saveButton').click(function()
		{
			log('#saveButton - clicked');
			
			$t=$('#place_for_upload_table');
			$p=$('#table_upload_tbody', $t);
//			tip=$("#type_select").val();
			var sData=[], sS='';
			var newTorrent=new Object();
			newTorrent.n=[];
			newTorrent.v=[];
			newTorrent.type=$("#type_select").val() || $("select[name='type']").val();
			
			
			$p.find('input:not(input[type="button"], :checkbox), :radio, select, textarea').each(function()
			{
				n=$(this).attr('name') || $(this).attr('id');
				v=htmlEncode($(this).val());
				//newTorrent= {n:v};
				newTorrent.n.push(n);
				newTorrent.v.push(v);
				//sData[n]='ee';
				//'{"one":1, "two":2}'
//				sS+='"'+n+'":"'+v+'", ';
//				sS+="'"+n+"':'"+v+"', ";
				//log($(this).attr('name')+'='+$(this).val()+"\tsData["+n+"]="+v+';\t'+sData[n]);
				//log(sData);
				//log()
			}).css({'background-color':coloram});


			$p.find(':checkbox').each(function()
			{
				//log('!#'+$(this).attr('id')+'.'+$(this).attr('name')+'='+$(this).attr('checked'));
				//sData[$(this).attr('name')]=$(this).attr('checked');
				n=$(this).attr('name');
				v=$(this).attr('checked');
				newTorrent.n.push(n);
				newTorrent.v.push(v);
				//newTorrent= {n:v};
				//newTorrent.n=v;
//				sS+="'"+n+"':'"+v+"', ";
			}).css({'background-color':coloram});
			//log(tip);
			//sS='{'+sS+'"tip":"'+tip+'"}'
			//sS="{"+sS+"'tip':'"+tip+"'}";
			//log(sS);
			//var storageData = ['{"name":"Fedora", "bookz_author":"Коллектив авторов", "bookz_genre":"2", "year":"2010", "language":"0", "descr":"", "tip":"8"}', '{"name":"Full Circle Magazine", "appz_version":"14 (live/desktop|DVD|32/64bit)", "appz_license":"1", "appz_os":"1", "language":"3", "descr":"cc", "tip":"3"}', sS];
			//log(sS);
			promtName=prompt("Please enter name",$('input:eq(0)', $p).val());
			if(promtName==null){ $p.find(':input').css('background-color',''); return;}
			
			newTorrent.name=htmlEncode(promtName);
				log(newTorrent);
				log(JSON.stringify(newTorrent));
				log(JSON.parse(JSON.stringify(newTorrent)));
			
			
			if(localStorage.torrentsList == undefined) 
			{				
				var storageData = new Object();
					storageData.data=[];
					
				storageData.data.push(JSON.stringify(newTorrent));
				log('saved');
				log(storageData);
				localStorage.torrentsList= JSON.stringify(storageData);
			} else {
				var storageData = JSON.parse(localStorage.torrentsList);
					
				storageData.data.push(JSON.stringify(newTorrent));
				log('saved');
				log(storageData);
				localStorage.torrentsList= JSON.stringify(storageData);
			
			}
			
			
			
			
		   // var storedData = JSON.parse(localStorage['torrentsList']);
		   // $.each(storedData, function(index, value) { storageData.push(value); });
//			storageData.push(sS);
//			
//			toStr=JSON.stringify(storageData);
//			log(toStr);
//			localStorage.torrentsList=toStr;
//			var jsObject = JSON.parse(toStr);
//			log(jsObject);
			
//						$.each(cArray, function(i, v) {log("index", i, "value", v);});
//						log(cArray.valueOf());
//			log(sData.valueOf());
			//$.each(jsObject, function(index, value) {log(":", index, "=", value);});
			
		});
	}
	

	

	
	end('saveDes()');
}


function navigareAjax()
{
	//return;
	$container = $('#no_td_border + .pageContainer');
	
	$navigareTempt = $("<div>").insertAfter($pageStyle);
	$tmp = $("<div>").hide().appendTo($navigareTempt);
	$loading = $("<div>", {id:'navigareLoading'}).hide().appendTo($navigareTempt);
	
	var bindEventVal = false, response, reponse, title, html, z, target, hash;
	
	$pageStyle.append('#navigareLoading {position: fixed; top: 130px; left: 10px;width: 60px;height: 60px;background: url("/pic/loading.gif");}');
	
	var ignoreThisLink = ['download.php'];
	
	
	function loadTargetFunc(data, textStatus, jqXHR)
	{
		html = $tmp.html();			
		$tmp.html('');

		response = $(jqXHR.responseText);
		reponseScript = response.filter("script");
		title = response.filter("title").html();
		
	    
	    z='';
	    $.each(reponseScript, function(i, val)
	    {
	    	if(val.text != "" && ((val.text.search(/lang_raport_ok/i) != -1) || (val.text.search(/langPostsChecking/i) != -1) || (val.text.search(/langWatchOn/i) != -1)) )
	    	{
	    		//console.log(i, $.trim(val.text));
	    		//eval(val.text); 
	    		z+=val.text ;
	    	} 		    
	    });
	    z+='console.log("JS Inserted")';
	    
	    
	    
	    $('title').html(title);
	    		    
	    
		$container.fadeOut(100, function()
		{
			$container.html(html).fadeIn(100, function()
			{
				$loading.hide();
				reScroll();
				reMakeLinks();
				
				//adaugam JS-urile.
				$('<script>', {'type':'text/javascript'}).html(z).appendTo($container);
				
				$.getScript("./js/forum_v2.js?v=11");
				
				$.getScript("./details.js");
				
				fixSpoilers();
				
				
				//markItUpStart();
				
				pageUpdate();
			});
		});
	}
	
	var loadTarget = function loadTarget(target)
	{
		//se creaza din nou. deci il stergem
		$('#avatar_like_container').remove();		
		
		$tmp.load(target+" #no_td_border + .pageContainer", loadTargetFunc);		
	};	
	
	var reMakeLinks = function reMakeLinks()
	{
		
		$('a[href]:not([target="_blank"]):not(href*="sendmessage.php"):not(.flienteenAjax)').addClass('flienteenAjax').click(function(e,o)
		{
			if(e.which !== 1 ) return;
			
			//console.log(e, o);
			e.preventDefault();
			$loading.show();
			
			target = $(this).attr('href').replace(/^\//,'');;
			
			window.history.pushState(null, null, target);
			
			//console.log(target, $(this));
			bindEvent();
			loadTarget(target);
		});		
	}; 

	var reScroll = function reScroll()
	{
		hash = location.hash.replace(/#/,'')||null;
		if(hash)
		{
			var v = $('a[name="'+hash+'"]:eq(0)').position().top;
			
			$('body').animate({scrollTop : ( (v-100 >0)?v-100: v-10 )},100).animate({scrollTop : v},1000);
		}
		
	};

	//reScroll();
	reMakeLinks();
	
	function bindEvent()
	{
		if(!bindEventVal)
		{
			$(window).bind("popstate", function(data) 
			{
				$loading.show();
				//console.log(data, location.href.replace(/.*\//g,''));
				loadTarget(location.href.replace(/.*\//g,''));
			});
			
			bindEventVal = true;
		}
		
	}
	
	
	
}













function isTready()
{	
	d = $.Deferred();
	function isLoaded()
	{
		h=$('#place_for_upload_table').find('table').length;
		
		if (!h)
		{
			log('Tip => loading.. ('+h+')');
			window.setTimeout(isLoaded, 1000);
		} else {log('Tip => done;"'); d.resolve();}
		
		return d.promise();  
	}

	return isLoaded();
}



//var db = openDatabaseSync('db', "1.0", "", 1024 * 1024 * 5);
//db.transaction(function (db)
//{
//	//sincron..
//	var result = db.executeSql("SELECT id FROM test");
//	for (var i = 0; i < result.rows.length; i++)
//	{
//		//result.rows.item(i)['id'];
//	}
//});





//functii adaugatoare
function getCookie(cName)
{
	var i,x,y,c=document.cookie.split(";");
	for (i=0;i<c.length;i++)
	{
	  x=c[i].substr(0,c[i].indexOf("="));
	  y=c[i].substr(c[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==cName){return y;}
	}
}




function setCookie(cName,value,cH)
{
	var exdate=new Date();
		exdate.setHours(exdate.getHours()+cH);
	var cValue=value+"; expires="+exdate.toUTCString();
	document.cookie=cName + "=" + cValue;
}


function htmlEncode(s)
{	
	return (typeof(s)=='string')?s.replace(/"/g, "{:1}").replace(/'/g, "{:2}").replace(/\n/g,'{:n}').replace(/\r/g,'{:r}'):s;
}
function htmlDencode(s)
{
	//return s.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#039").replace(/\n/g,'{n}').replace(/\r/g,'{r}');
	return  (typeof(s)=='string')?s.replace(/{:1}/g, '"').replace(/{:2}/g, "'").replace(/{:n}/g,'\n').replace(/{:r}/g,'\r'):s;
}
function urlEncode(s)
{
	return  (typeof(s)=='string')? s.replace(/&/g, "&amp;") : s;
}


	function havEvent(e)
	{	
		try
		{
			var foo = $(e).data('events');
			$.each( foo, function(i,o) 
			{
			   if(i=='click') {r=true;}
			});
		} catch(e){r=false;}

		return r;
	}
function isArray(a) 
{
	return a instanceof Array;
}
				function countvalues(a) 
				{
					var b = {}, i = a.length, j;
					while( i-- ) 
					{
						j = b[a[i]];
						b[a[i]] = j ? j+1 : 1;
					}
					return b;
				}
function Acount(array)
{
	var c = 0;
	for(i in array) // in returns key, not object
	{
		if(array[i] != undefined) { c++; }
	}
	return c;
}


localStorage.USER = $('#user_box a[href="/userdetails.php"]').text();

$.wait(60).then(function()
{
	log('wait(60) ', localStorage.USER?'ok':'no' );

	if(localStorage.USER)
	{
		if($('#pageStyle').length)
		{
			log('>#pageStyle finded..');
			
			$pageHtml = ($('#user_box').length)?$('<div>',{id:'pageHtml'}).insertAfter($pageStyle):$('input',{'type':'hidden'});
			$pageStyle.append('div.wnd{ top:130px; background-color:#ECE9D8; border: 1px solid #000; z-index: 50; position: fixed; font-size:11px; display:none;} div.box_header {background-color:#5588bb;padding:2px;text-align:center;font-weight:bold;color: #FFFFFF;vertical-align:middle; cursor:move;} a.close{float:right;text-decoration:none;color:#FFFFFF;}');
			
			init();
			localStorage.LANG = getUserLanguage();
		
		} else {
			log('>#pageStyle do not exists.. recreating..');
		}
		 
	}
});


//functii adaugatoare  END!





	
	
	
