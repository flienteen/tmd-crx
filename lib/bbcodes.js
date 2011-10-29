var temp=[], i=0, p=0; temp[i]='';
//var bbs=['bold', 'italic', 'underline', 'stroke', 'picture', 'link', 'fonts', 'list', 'quotes', 'code', 'clean', 'preview', 'center', 'right', 'spoiler', 'anchor', 'anchor_lnk', 'pre', 'undo', 'redo', 'youtube', 'smiles', 'colors'];


//fashem jQuery function pentru inserare frumoasa
$.fn.insertInTextarea = function(val) 
{
    return this.each(function()
    {
        if (this.selectionStart || this.selectionStart == '0') 
        {
            var startP = this.selectionStart;
            var endP = this.selectionEnd;
            var scrollTop = this.scrollTop;
            this.value = this.value.substring(0, startP) + val + this.value.substring(endP, this.value.length);
            this.focus();
            this.selectionStart = startP + val.length;
            this.selectionEnd = startP + val.length;
            this.scrollTop = scrollTop;
        } else {
            this.value += val;
            this.focus();
        }
    });
};



//function UnReDo(h)
//{   log('UnReDo');
//    temp[++i]=h;
//    log('\tUnReDo>'+temp);
//}
//function undo(h)
//{   log('redo');
//    if (temp[i+1]==undefined) {log('\tto unredo>');UnReDo(h);}
//    if (temp[i-1]==undefined) {log('\tredo>'+temp+'\n\t'+h);return h;}
//    i=i-1;

//    log('\tundo>'+temp);
//    return temp[i]; 
//}
//function redo(h)
//{   log('redo');
//    if (temp[i+1]==undefined) {log('\tredo>'+temp+'\n\t'+h);return h;}
//    i=i+1;
//    log('\tredo>'+temp);
//    return temp[i];   
//}

//function wLogAdd(h)
//{   log('wLogAdd');
//    
//}

function BBsmiles(here)
{
    $('#BBsmilesDiv').show().html('<iframe src="./smilies_popup.php?&amp;text='+here+'&amp;container=bb_iframe_smilies&amp;lang='+chrome.i18n.getMessage('lang')+'" width="180" height="318" id="bb_iframe_smilies" frameborder="0"></iframe>');

    $('#bb_iframe_smilies').load(function()
    {
        $('#bb_iframe_smilies').contents().find("div").css('display','none');
        $('#bb_iframe_smilies').contents().find("a").each(function()
        {
            $img=$('img',this); 
            $img.attr('width', ($img.attr('width') > 40)? 40: $img.attr('width'));
            $img.attr('height', ($img.attr('height') > 40)? 40: $img.attr('height'));
        }).click(function(e)
        {                   
            $('#'+here).insertInTextarea($(this).attr('href').replace(/.+IT\(\"/, '').replace(/\"\);/, ''));
            e.preventDefault();
            $('#BBsmilesDiv').hide();         
        });
        $(document).one('click', function(){ $('#BBsmilesDiv').hide(); }); 
    });
}


//fashem fonts-uri la oameni)))
var f=[], fonts = ['Arial', 'Comic Sans MS', 'Courier New', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana', 'Symbol'];
for (var i=0; i<fonts.length; i++)
{
	f.push({name:fonts[i], openWith:'[font='+fonts[i]+']', closeWith:'[/font]'});
}


//$(document).delay(2000).ready(function() 
//$(document).ready(function() 
//{

tmdBbCodes = {
    markupSet: [
		{name:'Bold', key:'B', className:'bold', openWith:'[b]', closeWith:'[/b]'},
		{name:'Italic', key:'I', className:'italic', openWith:'[i]', closeWith:'[/i]'},
		{name:'Underline', key:'U', className:'underline', openWith:'[u]', closeWith:'[/u]'},
		{name:'Stroke', className:'stroke', openWith:'[s]', closeWith:'[/s]'},
		//[font=Font]Text[/font]
		{name:'Font', className:'font', openWith:'[font=[![Font]!]]', closeWith:'[/font]', dropMenu : f},
		{separator:' ' },
		{name:'Center Alignment', className:'center', openWith:'[center]', closeWith:'[/center]'},
		{name:'Right Alignment', className:'right', openWith:'[right]', closeWith:'[/right]'},
		{name:'Preformed text', className:'pre', openWith:'[pre]', closeWith:'[/pre]'},
		{separator:' ' },
		{name:'Size', key:'S', className:'fonts', openWith:'[size=[!['+chrome.i18n.getMessage('bb_size')+']!]]', closeWith:'[/size]',
		dropMenu :[
			{name:'Size 1', openWith:'[size=1]', closeWith:'[/size]' },
			{name:'Size 2', openWith:'[size=2]', closeWith:'[/size]' },
			{name:'Size 3', openWith:'[size=3]', closeWith:'[/size]' },
			{name:'Size 4', openWith:'[size=4]', closeWith:'[/size]' },
			{name:'Size 5', openWith:'[size=5]', closeWith:'[/size]' },
			{name:'Size 6', openWith:'[size=6]', closeWith:'[/size]' },
			{name:'Size 7', openWith:'[size=7]', closeWith:'[/size]' }
		]},
		{	name:'Colors', key:'K', className:'colors', openWith:'[color=[![Color]!]]', closeWith:'[/color]',  
				dropMenu: [
					{openWith:'[color=#FFFFFF]', 	closeWith:'[/color]', className:"col1-1" },
					{openWith:'[color=#CCCCCC]', 	closeWith:'[/color]', className:"col1-2" },
					{openWith:'[color=#999999]', 	closeWith:'[/color]', className:"col1-3" },
					{openWith:'[color=#666666]', 	closeWith:'[/color]', className:"col1-4" },
					{openWith:'[color=#333333]', 	closeWith:'[/color]', className:"col1-5" },
					{openWith:'[color=#000000]', 	closeWith:'[/color]', className:"col1-6" },

					{openWith:'[color=#FF3333]', 	closeWith:'[/color]', className:"col2-1" },
					{openWith:'[color=#FF0000]', 	closeWith:'[/color]', className:"col2-2" },
					{openWith:'[color=#CC0000]', 	closeWith:'[/color]', className:"col2-3" },
					{openWith:'[color=#990000]', 	closeWith:'[/color]', className:"col2-4" },
					{openWith:'[color=#660000]', 	closeWith:'[/color]', className:"col2-5" },
					{openWith:'[color=#330000]', 	closeWith:'[/color]', className:"col2-6" },
					
					{openWith:'[color=#FFFF99]', 	closeWith:'[/color]', className:"col3-1" },
					{openWith:'[color=#FFFF66]', 	closeWith:'[/color]', className:"col3-2" },
					{openWith:'[color=#FFCC33]', 	closeWith:'[/color]', className:"col3-3" },
					{openWith:'[color=#CC9933]', 	closeWith:'[/color]', className:"col3-4" },
					{openWith:'[color=#996633]', 	closeWith:'[/color]', className:"col3-5" },
					{openWith:'[color=#663333]', 	closeWith:'[/color]', className:"col3-6" },
					
					{openWith:'[color=#66FF66]', 	closeWith:'[/color]', className:"col4-1" },
					{openWith:'[color=#00FF00]', 	closeWith:'[/color]', className:"col4-2" },
					{openWith:'[color=#00CC00]', 	closeWith:'[/color]', className:"col4-3" },
					{openWith:'[color=#009900]', 	closeWith:'[/color]', className:"col4-4" },
					{openWith:'[color=#006600]', 	closeWith:'[/color]', className:"col4-5" },
					{openWith:'[color=#003300]', 	closeWith:'[/color]', className:"col4-6" },
					
					{openWith:'[color=#6666FF]', 	closeWith:'[/color]', className:"col5-1" },
					{openWith:'[color=#0000FF]', 	closeWith:'[/color]', className:"col5-2" },
					{openWith:'[color=#0000CC]', 	closeWith:'[/color]', className:"col5-3" },
					{openWith:'[color=#000099]', 	closeWith:'[/color]', className:"col5-4" },
					{openWith:'[color=#000066]', 	closeWith:'[/color]', className:"col5-5" },
					{openWith:'[color=#000033]', 	closeWith:'[/color]', className:"col5-6" },
					
					{openWith:'[color=#FF66FF]', 	closeWith:'[/color]', className:"col6-1" },
					{openWith:'[color=#FF33FF]', 	closeWith:'[/color]', className:"col6-2" },
					{openWith:'[color=#CC33CC]', 	closeWith:'[/color]', className:"col6-3" },
					{openWith:'[color=#993399]', 	closeWith:'[/color]', className:"col6-4" },
					{openWith:'[color=#663366]', 	closeWith:'[/color]', className:"col6-5" },
					{openWith:'[color=#330033]', 	closeWith:'[/color]', className:"col6-6" }
				],
        },
		{name:'List item', className:'list', openWith:'\n[*] '},
	        {name:'Smiles', className:'smiles', openWith:function(h){h.textarea.id=h.textarea.id||h.textarea.name; BBsmiles(h.textarea.id); }, closeWith:'', 
              dropMenu:[
	            {name:'smile', openWith:':)'},
	            {name:'cry', openWith:":'-("},
	            {name:'sad', openWith:':('},
	            {name:'grin', openWith:':D'},
	            {name:'confused', openWith:':-/'},

	            {name:'w00t', openWith:':w00t:'},
	            {name:'noexpression', openWith:":|"},
	            {name:'acute', openWith:':acute:'},
	            {name:'annoyed', openWith:':annoyed:'},
	            {name:'look', openWith:':look:'},

	            {name:'airkiss', openWith:':airkiss:'},
	            {name:'alien', openWith:":alien:"},
	            {name:'angel', openWith:':angel:'},
	            {name:'beee', openWith:':beee:'},
	            {name:'ras', openWith:':ras:'},

	            {name:'blink', openWith:':blink:'},
	            {name:'blush', openWith:":blush:"},
	            {name:'boxing', openWith:':boxing:'},
	            {name:'bye', openWith:':bye:'},
	            {name:'down', openWith:':down:'},

	            {name:'fie', openWith:':fie:'},
	            {name:'fist', openWith:":fist:"},
	            {name:'fun', openWith:':fun:'},
	            {name:'geek', openWith:':geek:'},
	            {name:'giveheart2', openWith:':giveheart2:'},

	            {name:'heartbeat', openWith:':heartbeat:'},
	            {name:'hmm', openWith:":hmm:"},
	            {name:'hmmm', openWith:':hmmm:'},
	            {name:'huh', openWith:':huh:'},
	            {name:'ike', openWith:':ike:'},
	        ]},
		{separator:' ' },
		{name:'Picture', key:'P', className:'picture', replaceWith:'[img][![Url]!][/img]'},
		{name:'Iurl', className:'iurl', openWith:'[iurl=[![Url]!]]{}', closeWith:'[/iurl]', placeHolder:'TEXT'},
		{name:'Link', key:'L', className:'link', openWith:'[url=[![Url]!]]', closeWith:'[/url]', placeHolder:chrome.i18n.getMessage('bb_link')},
		{name:'Anchor', className:'anchor', openWith:'[anchor][!['+chrome.i18n.getMessage('bb_anchor')+':]!][/anchor]'},
		{name:'Anchor Link', className:'anchor_lnk', openWith:'[url=#[!['+chrome.i18n.getMessage('bb_anchor')+':]!]]', closeWith:'[/url]', placeHolder:'Numele linkului'},
        {name:'Youtube', className:'youtube', openWith:'[yt][![Youtube link:]!]', closeWith:'[/yt]'},
		{separator:' ' },
		{name:'Quotes', openWith:'[quote]', className:'quote', closeWith:'[/quote]'},
		{name:'Code', openWith:'[code]', className:'code', closeWith:'[/code]'}, 
		{name:'Spoiler', openWith:'[spoiler=[![Spoiler name:]!]]', className:'spoiler', closeWith:'[/spoiler]', placeHolder: chrome.i18n.getMessage('bb_spoiler')}, 
		{separator:' ' },
		{name:'Clean', className:"clean", replaceWith:function(markitup) { return markitup.selection.replace(/\[(.*?)\]/g, "") } },
        {name:'Undo', key:'Z', className:"undo", replaceWith:function(h) { h.textarea.value = wLogBack(h.textarea.value);  } },
        {name:'Redo', key:'Y', className:"redo", replaceWith:function(h) { h.textarea.value = wLogNext(h.textarea.value); }  },
//		{name:'Preview', className:"preview", call:'myPreview' }
        {name:'Preview', className:"preview" }

	],
    
    afterInsert:function(h) 
    {
        log('after');
        
        //if (h.name!=='Undo' && h.name!=='Redo')
            //UnReDo($(h.textarea).val());
        if(h.className==='preview')
        {
            if( $(h.textarea).val() ) { myPreview(); }
            
            
            
            
        }
    },
    
    //myPreview:function() { alert('bum'); }
    
};//tmdBbCodes


function myPreview()
{
    start('myPreview()');

    if( $('#prv').length > 0) { return; }
    var bg = (sURL.match(/viewtopic/g))?'#F5F4EA':'#ECE9D8';
    var minus = (sURL.match(/viewtopic/g))?-300:0;
      
    $t	= $('textarea.markItUpEditor');
    t = $t.map(function()
              {
                return {w:$(this).width(), h:$(this).height(), c:$(this).offset()};
              });
    t = t[0];

    $ldngDiv = $('<div>').css({'position':'absolute', 'left':t.c.left+t.w-1+minus, top:t.c.top-20, 'width':'15px', 'background-color':bg}).html('<img src="'+chrome.extension.getURL('pic/loading.gif')+'"/>').insertBefore($t).fadeIn(50);
    
    
    var val = $t.val();

    dfdPost = $.post("tags.php", { 'test': val } );
    
    dfdPost.then(function(data)
    {//(.|\n|\r\n|\t)*<p><hr>
        var html = data.replace(/\n/g, '').replace(/.*<p><hr>/g, '').replace(new RegExp("<hr></p>.*", "g" ), '');
        html='<td style="border: 0px;">'+html+'</td>';
//        var html = data.replace( new RegExp("<hr>((?:\\n|.|\\s)*)<hr>" ,"img"), "$1" );
        //console.log('2', html );
        
        //$tmp = $('<div>').html(data);
        //console.log('2', $tmp.find('hr').html() )
        
        $prv = $('<div>',{'id':'prv'}).css({ 'width':t.w, 'height':t.h, 'left':t.c.left, 'top':t.c.top, 'position':'absolute', 'background-color':'#ece9d8', 'border':'solid #A79F72 1px', 'display':'none', 'padding':'5px', 'overflow-y':'auto' }).insertBefore($t.parents('form')  ).fadeIn(300).html(html);
        
        //$ldngDiv.fadeOut(300, function(){ $ldngDiv.remove(); });
        $ldngDiv.fadeOut(300, function()
        { 
            $(this).delay(300).css({'width':'595px', 'left':t.c.left, 'height':'20px'}).html('<b>&nbsp;&nbsp;&nbsp;Right Click to close the preview window</b>').fadeIn(600).delay(5000).fadeOut(300, function(){ $ldngDiv.remove(); });
        });
        $prv.append('<script>initSpoilers(); initIurl(); </script>');
        //fixSpoilers(); //my version this script.. from opUse.js Line ~774
        
        var hidePrv = function()
        {
            $(document).one("click", function(e)
            {
                if ($(e.target).parents('#prv').length > 0)
                {
                    hidePrv();
                } else { 
                    $prv.fadeOut(300, function(){ $prv.remove(); $ldngDiv.remove();  });
//                     $(this).parents('td:first').removeClass('initIurl');
                }
                
                //console.log(e, e.which);
            }); 
            
            $(document).one("contextmenu", function(e)
            {
                    $prv.fadeOut(300, function(){ $prv.remove(); $ldngDiv.remove(); }); 
                    e.preventDefault();
            }); 
        };
        hidePrv();
    
    });//dfdPost 
        
    


    end('myPreview()');
}


	//$("#posttext, form[action*='editpost'] textarea, form[action*='edit'] textarea, textarea[name='test'], textarea[name='msg'], textarea[name='body']").markItUp(tmdBbCodes);

    //for upload.php
    log('bbcodes..');
    $("#type_select").live('change', function () 
    {
        log('Upload page.. bbcodes');
        isTready().done(function() { $("textarea[name='descr']").markItUp(tmdBbCodes); markItUpStart(); });
//        window.setTimeout(function () 
//        { 
//            $("textarea[name='descr']").markItUp(tmdBbCodes);//upload
//            markItUpStart();
//        }, 1000);        
    });
    
//    $("#loadButton").live('change', function () 
//    {
//        log('Upload page.. bbcodes');
////        window.setTimeout(function () 
////        { 
////            $("textarea[name='descr']").markItUp(tmdBbCodes);//upload
////            markItUpStart();
////        }, 1000);        
//        //isTready().done(function() { $("textarea[name='descr']").markItUp(tmdBbCodes); markItUpStart(); });
//    });

//function UnReDo(h)
//{   log('UnReDo');
//    temp[++i]=h;
//    log('\tUnReDo>'+temp);
//}
//function undo(h)
//{   log('redo');
//    if (temp[i+1]==undefined) {log('\tto unredo>');UnReDo(h);}
//    if (temp[i-1]==undefined) {log('\tredo>'+temp+'\n\t'+h);return h;}
//    i=i-1;

//    log('\tundo>'+temp);
//    return temp[i]; 
//}
//function redo(h)
//{   log('redo');
//    if (temp[i+1]==undefined) {log('\tredo>'+temp+'\n\t'+h);return h;}
//    i=i+1;
//    log('\tredo>'+temp);
//    return temp[i];   
//}


   
//});
function wLogAdd(h)
{   log('wLogAdd');

    if (temp[i]!=h && h!="")
    {
        i=i+1; p=i;
        temp[i]=h;
        //log('\t"'+h+'"  !'+typeof(h));
        //log('\t'+temp);
       // log('\t'+i+'-'+p);
       // log(event);
//        if (event.keyCode ==90) log('bun');
    } else log('\tignored');    
}

function wLogBack(h)
{   log('wLogBack');
    if (p>0)
    {
//        p=p-1;
        if (p==i) {wLogAdd(h);}
        p=p-1;
        //log('\t'+(p)+'>'+temp[p]);
       // log('\t'+temp);
        return temp[p];    
    } 
    if (p==0) 
    {
        //log('\t'+p+'>'+temp[p]);
       // log('\t'+temp);
        return temp[p];
    } else log('\tignored ');
    return '';
}

function wLogNext(h)
{   log('wLogNext');
//    log('\t'+i+'-'+p);
//    log('\t'+temp[p]+'-'+temp[p+1]);
    if (p+1<=i)
    {
        p=p+1;
       // log('\t'+p+'>'+temp[p]);
       // log('\t'+temp);
        return temp[p];    
    
    } else log('\tignored ');
    return h;
 
}
    function markItUpStart()
    { 
//        var bbsCss='';

//        $(bbs).each(function()
//		{
//            var imgURL = chrome.extension.getURL('pic/bbcodes/'+this+'.png');
//			bbsCss += ' .markItUp .'+this+' a {background-image:url('+imgURL+');} ';
//		});
//        $(".markItUp").before('<style>'+bbsCss+'</style>');
    	$("#posttext, form[action*='editpost'] textarea, form[action*='edit'] textarea, textarea[name='test'], textarea[name='msg'], textarea[name='body']").markItUp(tmdBbCodes);


        $(".markItUpEditor")
            //.keypress(function(e){ UnReDo(this.value); })
            .keypress(function(e)
            {
                //if(e.witch==15) {wLogAdd(this.value); log('z'); }
                //if (!(event.which == 65 && event.ctrlKey)) { log(event); }
                wLogAdd(this.value);
            })
            .keydown(function(e) { log(e.type); 
            
                if(e.keyCode==8 || e.keyCode==46) {wLogAdd(this.value);}
                if ((e.ctrlKey) && (e.keyCode == 86)) {log('ctrl+v'); wLogAdd(this.value);}
                })
        ;

//	    $('.markItUpContainer *').each(function()
//	    {
//		    if ($(this).css('background-image')!='none')
//		    {			
//			    var imgCur = $(this).css('background-image').replace(/.+com\//, '').replace(/\)/, '');
//			    var imgURL = chrome.extension.getURL(imgCur);
//			    $(this).attr("style", 'background-image:url('+imgURL+') !important;');
//	        }
//	    });
        
        var imgURL = chrome.extension.getURL('pic/bbcodes/');
        $('.markItUpContainer').before('<style type="text/css" id="bbsCss">.markItUpHeader ul .markItUpDropMenu {background:transparent url('+imgURL+'menu.png) no-repeat 120% 100%;margin-right:5px;}.markItUpHeader ul ul .markItUpDropMenu {background:#FFF url('+imgURL+'submenu.png) no-repeat right bottom;}.markItUp .bold a{background-image:url('+imgURL+'bold.png);}.markItUp .italic a{background-image:url('+imgURL+'italic.png);}.markItUp .underline a{background-image:url('+imgURL+'underline.png);}.markItUp .stroke a{background-image:url('+imgURL+'stroke.png);}.markItUp .picture a{background-image:url('+imgURL+'picture.png);}.markItUp .iurl a{background-image:url('+imgURL+'iurl.png);}.markItUp .link a{background-image:url('+imgURL+'link.png);}.markItUp .fonts a{background-image:url('+imgURL+'fonts.png);}.markItUp .font > a{background-image:url('+imgURL+'font.png);} .markItUp .font > ul li {background:url('+imgURL+'font.png) no-repeat 5px 5px !important;}  .markItUp .font > a{background-image:url('+imgURL+'font.png);} .markItUp .font > ul li a {width: 100px !important;}         .markItUp .list a{background-image:url('+imgURL+'list-bullet.png);}.markItUp .quote a{background-image:url('+imgURL+'quotes.png);}.markItUp .code a{background-image:url('+imgURL+'code.png);}.markItUp .clean a {background-image:url('+imgURL+'clean.png);}.markItUp .preview a {background-image:url('+imgURL+'preview.png);}.markItUp .center a {background-image:url('+imgURL+'center.png);}.markItUp .right a {background-image:url('+imgURL+'right.png); text-align: left;}.markItUp .spoiler a {background-image:url('+imgURL+'spoiler.png);}.markItUp .anchor a {background-image:url('+imgURL+'anchor.png);}.markItUp .anchor_lnk a {background-image:url('+imgURL+'anchor_lnk.png);}.markItUp .pre a {background-image:url('+imgURL+'pre.png);}.markItUp .undo a {background-image:url('+imgURL+'undo.png);}.markItUp .redo a {background-image:url('+imgURL+'redo.png);}.markItUp .youtube a {background-image:url('+imgURL+'youtube.png);}.markItUp .preview a {background-image:url('+imgURL+'preview.png);}.markItUp .smiles a {background-image:url('+imgURL+'smiles.png);}.markItUp .colors a {background-image:url('+imgURL+'colors.png);} '+   '.markItUp *{margin:0px;padding:0px;outline:none;}.markItUp a:link,.markItUp a:visited{color:#000;text-decoration:none;}.markItUp{margin:0px;}.markItUpEditor{padding:5px;min-width:590px !important;min-height:320px !important;clear:both;display:block;line-height:18px;overflow:auto;}.markItUpFooter{width:100%;}.markItUpHeader ul li{list-style:none;float:left;position:relative;margin-bottom: 0pt !important;margin-top: 0pt !important;}.markItUpHeader ul li:hover > ul{display:block;}.markItUpHeader ul .markItUpDropMenu li{margin-right:0px;background-position:center center;}.markItUpHeader ul ul{display:none;position:absolute;top:18px;left:-10px;background-color:#ece9d8;border:1px solid #a79f72;}.markItUpHeader ul ul li{float:none;border-bottom:1px solid #a79f72;}.markItUpHeader ul .markItUpSeparator{margin:2px 5px 0 5px;width:1px;height:16px;overflow:hidden;background-color:#CCC;}.markItUpHeader ul ul .markItUpSeparator{width:auto;height:1px;margin:0px;}.markItUpHeader ul ul ul{position:absolute;top:-1px;left:150px;}.markItUpHeader ul ul ul li{float:none;}.markItUpHeader ul a{display:block;width:16px;height:16px;text-indent:-10000px;background-repeat:no-repeat;padding: 3px;margin:0px;}.markItUpHeader  ul a:hover{    background-color:#d3cfb8;-webkit-border-radius:2px;-webkit-box-shadow:0 1px 2px rgba(0,0,0,0.3);}.markItUpHeader ul ul a{display:block;padding-left:0px;text-indent:0;width:80px;padding:5px 5px 5px 25px;background-position:2px 50%;}.markItUpHeader ul ul a:hover{color:#FFF;background-color:#d3cfb8;}.markItUpHeader ul li a{background-position:center center;}.markItUp .fonts .markItUpButton a{background-position: left center;}.markItUp .smiles ul{width:160px;padding: 1px;}.markItUp .smiles  li{border:1px solid #ece9d8;width:30px;height:30px;overflow:hidden;padding:0px;margin:0px;float:left;}.markItUp .smiles ul a{width:30px;height:30px;background-image:none;}.markItUp .smiles li:hover{background-color:none;border-color:#a79f72;-webkit-border-radius:5px;}.markItUp .colors ul{width:132px;padding:1px;}.markItUp .colors  li{border:1px solid #ece9d8;width:20px;height:20px;overflow:hidden;padding:0px;margin:0px;float:left;}.markItUp .colors ul a{width:20px;height:20px;}.markItUp .colors li:hover{background-color:none;border-color:#a79f72;}.markItUp .colors .col1-1 a{background:#FFFFFF;}.markItUp .colors .col1-2 a{background:#CCCCCC;}.markItUp .colors .col1-3 a{background:#999999;}.markItUp .colors .col1-4 a{background:#666666;}.markItUp .colors .col1-5 a{background:#333333;}.markItUp .colors .col1-6 a{background:#000000;}.markItUp .colors .col2-1 a{background:#FF3333;}.markItUp .colors .col2-2 a{background:#FF0000;}.markItUp .colors .col2-3 a{background:#CC0000;}.markItUp .colors .col2-4 a{background:#990000;}.markItUp .colors .col2-5 a{background:#660000;}.markItUp .colors .col2-6 a{background:#330000;}.markItUp .colors .col3-1 a{background:#FFFF99;}.markItUp .colors .col3-2 a{background:#FFFF66;}.markItUp .colors .col3-3 a{background:#FFCC33;}.markItUp .colors .col3-4 a{background:#CC9933;}.markItUp .colors .col3-5 a{background:#996633;}.markItUp .colors .col3-6 a{background:#663333;}.markItUp .colors .col4-1 a{background:#66FF66;}.markItUp .colors .col4-2 a{background:#00FF00;}.markItUp .colors .col4-3 a{background:#00CC00;}.markItUp .colors .col4-4 a{background:#009900;}.markItUp .colors .col4-5 a{background:#006600;}.markItUp .colors .col4-6 a{background:#003300;}.markItUp .colors .col5-1 a{background:#6666FF;}.markItUp .colors .col5-2 a{background:#0000FF;}.markItUp .colors .col5-3 a{background:#0000CC;}.markItUp .colors .col5-4 a{background:#000099;}.markItUp .colors .col5-5 a{background:#000066;}.markItUp .colors .col5-6 a{background:#000033;}.markItUp .colors .col6-1 a{background:#FF66FF;}.markItUp .colors .col6-2 a{background:#FF33FF;}.markItUp .colors .col6-3 a{background:#CC33CC;}.markItUp .colors .col6-4 a{background:#993399;}.markItUp .colors .col6-5 a{background:#663366;}.markItUp .colors .col6-6 a{background:#330033;}</style>');


        $(".markItUpContainer ul li.smiles ul li a").each(function() //smiles
	    {
			    var sName = $(this).attr('title'); 
			    $(this).attr("style", 'background:url(pic/smilies/'+sName+'.gif)  no-repeat center center !important; padding: 0px;');
			    $(this).text('');
                $(this).attr('title','');
	    });


        //container for bb_iframe_smilies
        $(".markItUpHeader").after('<div id="BBsmilesDiv" style="margin-left:509px;margin-top:23px;position: absolute; z-index: 10001; display:none"></div>'); 
        
        
        //fashem ca la oameni ^_^
        $('.markItUpContainer li.font ul li a').each(function(i,v)
        {
        	$(v).css('font-family', $(v).attr('title'));
        });
    }

$(document).ready(function() 
{
	markItUpStart();
});
    