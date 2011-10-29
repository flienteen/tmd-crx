$(document).ready(function()
{
    lang = chrome.i18n.getMessage('lang');
    $("."+lang).show();

    $("input[type=button]").each(function()
    {
        var btnId = $(this).attr('id'); 
        $(this).attr("value", chrome.i18n.getMessage(btnId));
    });

	$('#screens a').lightBox({fixedNavigation:true});

    $('#suggestion').click(function()
    {
        chrome.tabs.getSelected(null,function(tab){
			chrome.tabs.update(tab.id,{url:'http://www.torrentsmd.com/forum.php?action=viewtopic&topicid=2854&page=lastseen'});
		});
    });

    $('#goToOptions').click(function()
    {
        chrome.tabs.getSelected(null,function(tab){
			chrome.tabs.update(tab.id,{url:chrome.extension.getURL('options.html')});
		});
    });

});
