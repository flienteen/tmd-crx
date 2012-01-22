
function init() 
{ 
    $(":checkbox").each(function() 
	{
		var chID = $(this).attr('id');
		$("#"+chID).attr('checked', (localStorage[chID] === "true") ? true : false);
		
		 if( $(this).parents('.sndChecker').length > 0 ){sndChecker($(this));}
	});

    //$("#pInterval option[value='"+localStorage['pInterval']+"']").attr('selected', 'selected');
	//selects
	$("select").each(function() 
	{
		var sId = $(this).attr('id');
        $(this).find("option[value='"+localStorage[sId]+"']").attr('selected', 'selected');
        
	});


//  	$("#popupBtns :checkbox").each(function() 
//	{
//		var btnID = $(this).attr('id');
//		$("#"+btnID).attr('checked', (localStorage[btnID] === "true") ? true : false);
//	});

    
    $("#TRorder").attr('value', localStorage.popapOrder);

    $(":radio").each(function() 
	{
		var rdID = $(this).attr('id');
        if ($(this).val()==localStorage[rdID]) $(this).attr('checked','true');
	});


    $("#opUse :checkbox, #opUseOFOp :checkbox").each(function() 
	{
		var chID = $(this).attr('id');
		$("#"+chID).attr('checked', (localStorage[chID] === "true") ? true : false);
        try {disableTable(chID);} catch(e) {console.error(e);}
	}); 
    $("#opUseFUList").val(localStorage.opUseFUList);
    $("#opUseFTList").val(localStorage.opUseFTList);


	if(localStorage.ntfSndVolume)
		$('.volume').val(localStorage.ntfSndVolume);


  btnClean();
}

function opUseFUListSave(list,nospace) 
{
    //var regex=/[^a-zA-Z0-9,$!®_.]/g;
    list = list.replace(/[\n]/g, '');
    if (nospace) list = list.replace(/[ ]/g, '');
    return uniqueArray(list.split(','));
}
function uniqueArray(arr)
{
    var i, len = arr.length, out=[], obj={};
    for (i = 0; i < len; i++){obj[arr[i]] = 0;}
    for (i in obj){out.push(i);}
    return out;
}

function save() 
{  
//  localStorage.ntfSnd = $("#ntfSnd").attr('checked');
//  localStorage.opShowWatcher = $("#opShowWatcher").attr('checked');
    $(":checkbox").each(function() 
	{
		var chID = $(this).attr('id');
        localStorage[chID] = $("#"+chID).attr('checked');
	});

  //localStorage['pInterval'] = $("#pInterval").val();
  localStorage.popapOrder = $("#TRorder").val();

    $(":radio").each(function() 
	{
		var rdID = $(this).attr('id');
        localStorage[rdID] = $("#"+rdID+":checked").val();
	});
	
	//selects
	$("select").each(function()
	{
		var sId = $(this).attr('id');
        localStorage[sId] = $(this).val();
	});


	//
	localStorage.ntfSndVolume = $('.volume').val();


//popupBtns
//	$("#popupBtns :checkbox").each(function() 
//	{
//		var btnID = $(this).attr('id'); 
//		localStorage[btnID] = $("#"+btnID).attr('checked');	
//	});


//    $("#opUse :checkbox, #opUseOFOp :checkbox").each(function() 
//	{
//		var chID = $(this).attr('id');
//        localStorage[chID] = $("#"+chID).attr('checked');
//	});
    localStorage.opUseFUList=opUseFUListSave($("#opUseFUList").val()+',',true);
    localStorage.opUseFTList=opUseFUListSave($("#opUseFTList").val()+', ',false);


  btnClean();

  chrome.extension.getBackgroundPage().init();
  chrome.extension.getBackgroundPage().animateFlip();
  init();
}

function btnDirty() 
{
  $("#save").attr("disabled", false);
}

function btnClean() 
{
  $("#save").attr("disabled", true);
}

function getText(id)
{
	return chrome.i18n.getMessage(id);
}

function makeOptionalTDOp()
{
	var TRorderString = localStorage.popapOrder;

	var TRorder = new Array();
		TRorder = TRorderString.split(':');
		TRorder.shift(); TRorder.pop(); TRorder.reverse();

	$(TRorder).each(function()
	{
		id2 = this.replace("TR_",""); 
		$('#popupBtns  tr:nth-child(1)').after('<tr id="'+this+'"> <td  class="trHover"><label><input trid="'+id2+'" name="'+id2+'" type="checkbox" id="'+id2+'"></label></td></tr>');
	});
}

function disableTable(chID)
{
    var tbID = "#"+chID+"table";
        if ($("#"+chID).attr('checked')===false)
        {
            var divHeight = $(tbID).height();
            var divWidth  = $(tbID).width();
            var divHtml   = '<div class="tableHide" style="height:'+divHeight+'px; width:'+divWidth+'px"></div>';
            $(tbID).prepend(divHtml);
        } else {
            $('.tableHide',tbID).remove();  
        }
}

    function sndChecker($select)
    {
        id=$select.attr('id')+'Src';
        if ($select.attr('checked')===false)
        {   
            $('#'+id).attr("disabled", true);
            $('.play[what="'+id+'"]').addClass('dis');         
                    
        } else {
            $('#'+id).attr("disabled", false);
            $('.play[what="'+id+'"]').removeClass('dis'); 
        }
    }

$(document).ready(function()
{
    $pageStyle = $('<style>',{type:'text/css',id:'pageStyle'}).appendTo("head + body").append(myCss);

//popup table
	makeOptionalTDOp();
	$("#popupBtns").tableDnD(
	{
	    onDragClass: "alt",
	    onDrop: function(table, row) 
		{
            var rows = table.tBodies[0].rows;
            var debugStr=':';
            for (var i=0; i<rows.length; i++) 
			{
                if (rows[i].id!='') debugStr += rows[i].id+":";
            }
	        $('#TRorder').val(debugStr);
			btnDirty();
	    }
	});
//popup table		end


//translating..	
	document.title = getText('optionTitle'); 


	$("span").each(function() 
    { 		
		var spid =  $(this).attr('id');
		if (spid)
  			$(this).append(getText(spid));
	});

	$(".autoLang label :checkbox").each(function() 
    { 
		//var trid = (($(this).attr('trid')!=undefined)? $(this).attr('trid') : $(this).attr('id'));
		var chid =  $(this).attr('id');
  		$(this).parent().append(getText(chid));
	});

	$(".autoLang label :radio").each(function() 
    { 
		var rdid =  $(this).attr('value');
  		$(this).parent().append(getText(rdid));
	});

	//$("#save").attr("value", getText('save'));
    $("input[type=button]").each(function()
    {
        var btnId = $(this).attr('id'); 
        $(this).attr("value", getText(btnId));
    });
//translating..	end




	$("#save").click(function() {save(); });
	$(":checkbox, :radio, select, textarea, input").change(function() {btnDirty();});
	//$(":radio").change(function() {btnDirty();});

    $('#suggestion').click(function()
    {
        chrome.tabs.getSelected(null,function(tab){
			chrome.tabs.update(tab.id,{url:'http://www.torrentsmd.com/forum.php?action=viewtopic&topicid=2854&page=lastseen'});
		});
    });

    $('#goToNews').click(function()
    {
        chrome.tabs.getSelected(null,function(tab){
			chrome.tabs.update(tab.id,{url:chrome.extension.getURL('news.html#log')});
		});
    });

    //$("head").append('<style>@font-face {   font-family: "SansTMD";  src: local("EXCELSIOR SANS"), url('+chrome.extension.getURL('ExcelsiorSans.ttf')+') format("truetype"); } * {font-family: SansTMD}</style>');
	init();


    $("#opUse :checkbox").change(function() 
	{
		var chID = $(this).attr('id');        
        disableTable(chID);        
	});


    $('.play').click(function()
    {
        if(!$(this).is('.dis'))
        {
            what=$(this).attr('what');
            s=$('#'+what).val();
            
            audio = new Audio("sound/"+s+".ogg");
			audio.volume = parseInt($('.volume').val())/100;
            audio.play();
            log(what, s);
        }
    });



    $('.sndChecker :checkbox').change(function()
    {
        sndChecker($(this)); 
    });

});


 
