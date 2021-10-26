function uaredirect(f){try{if(document.getElementById("bdmark")!=null){return}var b=false;if(arguments[1]){var e=window.location.host;var a=window.location.href;if(isSubdomain(arguments[1],e)==1){f=f+"/#m/"+a;b=true}else{if(isSubdomain(arguments[1],e)==2){f=f+"/#m/"+a;b=true}else{f=a;b=false}}}else{b=true}if(b){var c=window.location.hash;if(!c.match("fromapp")){if((navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i))){location.replace(f)}}}}catch(d){}}function isSubdomain(c,d){this.getdomain=function(f){var e=f.indexOf("://");if(e>0){var h=f.substr(e+3)}else{var h=f}var g=/^www\./;if(g.test(h)){h=h.substr(4)}return h};if(c==d){return 1}else{var c=this.getdomain(c);var b=this.getdomain(d);if(c==b){return 1}else{c=c.replace(".","\\.");var a=new RegExp("\\."+c+"$");if(b.match(a)){return 2}else{return 0}}}};
var murl = window.location.href.replace('www','m');
setTimeout(uaredirect(murl),0);
function cookie_encode(string){
	var decoded = encodeURIComponent(string);
	var ns = decoded.replace(/(%7B|%7D|%3A|%22|%23|%5B|%5D)/g,function(charater){return decodeURIComponent(charater);});
	return ns;
}
jQuerys();jQuery.cookie = function (key, value, options) {
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : cookie_encode(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
(function(){
	var ua = navigator.userAgent.toLowerCase();
	var is = (ua.match(/\b(chrome|opera|safari|msie|firefox)\b/) || [ '',
			'mozilla' ])[1];
	var r = '(?:' + is + '|version)[\\/: ]([\\d.]+)';
	var v = (ua.match(new RegExp(r)) || [])[1];
	jQuery.browser.is = is;
	jQuery.browser.ver = v;
	jQuery.browser[is] = true;
})();

(function(jQuery) {
	this.version = '@1.5';
	this.layer = {
		'width' :200,
		'height' :100
	};
	this.title = '信息提示';
	this.time = 4000;
	this.anims = {
		'type' :'slide',
		'speed' :600
	};
	this.timer1 = null;
	this.inits = function(title, text) {

		if ($("#message").is("div")) {
			this.closer();
			//return;
		}
		$(document.body)
				.prepend(
						'<div id="message" style="width: 400px;height: 200px;position: fixed;top: 30%;left: 50%;margin-left: -200px;overflow: hidden;border: 2px solid #88c6e5;box-shadow: 0 0 5px 1px #999999;border-radius: 10px;z-index: 100;background: #eff9ff;"><div style="width:100%;height: 35px;line-height: 35px;overflow:hidden;color:#FF0000;background: #f2f2f2;"><span id="message_close" style="float:right;padding: 8px 8px;width: 20px;line-height: 14px;color:red;font-size: 24px;font-weight:bold;text-align:center;cursor:pointer;overflow:hidden;">×</span><div style="width:100px;line-height: 32px;text-align: center;overflow:hidden;">' + title + '</div><div style="clear:both;"></div></div> <div style="width:100%;height:auto;"><div id="message_content" style="border-top: #cccccc 1px solid;padding: 20px;height: 120px;color:#FF0000;text-align: center;overflow:hidden;">' + text + '</div></div></div>');

		$("#message_close").click( function() {
			setTimeout('this.closer()', 1);
		});
		$("#message").hover( function() {
			clearTimeout(timer1);
			timer1 = null;
		}, function() {
			if (time > 0)
				timer1 = setTimeout('this.closer()', time);
			});
	};
	this.show = function(title, text, time) {
		if ($("#message").is("div")) {
			//return;
		}
		if (title == 0 || !title)
			title = this.title;
		this.inits(title, text);
		if (time >= 0)
			this.time = time;
		switch (this.anims.type) {
		case 'slide':
			$("#message").slideDown(this.anims.speed);
			break;
		case 'fade':
			$("#message").fadeIn(this.anims.speed);
			break;
		case 'show':
			$("#message").show(this.anims.speed);
			break;
		default:
			$("#message").slideDown(this.anims.speed);
			break;
		}
		this.rmmessage(this.time);
	};

	this.lays = function(width, height) {

		if ($("#message").is("div")) {
			//return;
		}
		if (width != 0 && width)
			this.layer.width = width;
		if (height != 0 && height)
			this.layer.height = height;
	}

	this.anim = function(type, speed) {
		if ($("#message").is("div")) {
			//return;
		}
		if (type != 0 && type)
			this.anims.type = type;
		if (speed != 0 && speed) {
			switch (speed) {
			case 'slow':
				;
				break;
			case 'fast':
				this.anims.speed = 200;
				break;
			case 'normal':
				this.anims.speed = 400;
				break;
			default:
				this.anims.speed = speed;
			}
		}
	}

	this.rmmessage = function(time) {
		if (time > 0) {
			timer1 = setTimeout('this.closer()', time);
		}
	};
	this.closer = function() {
		switch (this.anims.type) {
		case 'slide':
			$("#message").slideUp(this.anims.speed);
			break;
		case 'fade':
			$("#message").fadeOut(this.anims.speed);
			break;
		case 'show':
			$("#message").hide(this.anims.speed);
			break;
		default:
			$("#message").slideUp(this.anims.speed);
			break;
		}
		;
		setTimeout('$("#message").remove();', this.anims.speed);
		this.original();
	}

	this.original = function() {
		this.layer = {
			'width' :300,
			'height' :140
		};
		this.title = '信息提示';
		this.time = 10000;
		this.anims = {
			'type' :'slide',
			'speed' :5000
		};
	};
	jQuery.messager = this;
	return jQuery;
})(jQuery);
function jQuerys(){var tmp='';}
document.onkeydown = function(e){
	var e = e ? e : window.event;
	var keyCode = e.which ? e.which : e.keyCode;
	var kw = document.getElementById('wd');
	if (e.keyCode==13 && kw.value=='' && typeof(index_page) != "undefined") {
		location.href=index_page;
	}
	if (e.keyCode==37 && typeof(preview_page) != "undefined") location.href=preview_page;
	if (e.keyCode==39 && typeof(next_page) != "undefined") location.href=next_page;
} 
var speed = 5;
var autopage;// = $.cookie("autopage");
var night;
var timer;
var temPos=1;

$(document).ready(function(){
	var wd = $('#wd');
	wd.focusin(function() {
	if($(this).val()=="可搜书名，请您少字也别输错字。") $(this).val("");
	});
	wd.focusout(function() {
	if($(this).val()=='') $(this).val("可搜书名，请您少字也别输错字。");
	});
	$(".history").hover(function() {
		$(this).find('.historylist').css('display', 'block');
	}, function(){
		$(this).find('.historylist').css('display', 'none');
	});
	$(window).scroll(function(){if($(window).scrollTop()>300){$(".gobacktop").fadeIn(500)}else{$(".gobacktop").fadeOut(500)}});
	$(".gobacktop").click(function(){$('body,html').animate({scrollTop:0},400);return false});
	if( typeof(next_page) != "undefined" ) {
		next_page = next_page;
		autopage = $.cookie("autopage");
		sbgcolor = $.cookie("bcolor");
		setBGColor(sbgcolor);
		font = $.cookie("font");
		setFont(font);
		size = $.cookie("size");
		setSize(size);
		color = $.cookie("color");
		setColor(color);
		width = $.cookie("width");
		setWidth(width);
		speed = $.cookie("scrollspeed");
		if(autopage==1) {
			$('#autopage').attr("checked",true);
			speed = $.cookie("scrollspeed");
			scrollwindow();
		}
		night = $.cookie('night');
		if(night==1) {
			$("#night").attr('checked',true);
			setNight();
		}
		document.onmousedown=sc;
		document.ondblclick=scrollwindow;
	}

});
function showpop(url) {
	$.get(url, function(data){
		$.messager.lays(260, 120);
		$.messager.anim('fade', 1000);
		$.messager.show("提示信息", data ,5000);
	});
}


if (typeof(getCookie("bgcolor")) != 'undefined') {
    wrapper.style.background = getCookie("bgcolor");
    document.getElementById("bcolor").value = getCookie("bgcolor")
}
function changebgcolor(id) {
    wrapper.style.background = id.options[id.selectedIndex].value;
    setCookie("bgcolor", id.options[id.selectedIndex].value, 365)
}
function setBGColor(sbgcolor){
	$('#wrapper').css("backgroundColor",sbgcolor);
	$.cookie("bcolor",sbgcolor,{path:'/',expires:365});
}
function setColor(color) {
	$("#content").css("color",color);
	$.cookie("color",color,{path:'/',expires:365});
}
function setSize(size) {
	$("#content").css("fontSize",size);
	$.cookie("size",size,{path:'/',expires:365});
}
function setFont(font) {
	$("#content").css("fontFamily",font);
	$.cookie("font",font,{path:'/',expires:365});
}
function setWidth(width){
	$('#content').css("width",width);
	$.cookie("width",width,{path:'/',expires:365});
}
function setNight(){
	if($("#night").attr('checked')==true) {
		$('div').css("backgroundColor","#333333").css("box-shadow","none");
		$('div.header').css("display","none");
		$('div,a').css("color","#999999");
		$.cookie("night",1,{path:'/',expires:365});
	} else {
		$('div').css("backgroundColor","").css("box-shadow","");
		$('div.header').css("display","");
		$('div,a').css("color","");
		$.cookie("night",0,{path:'/',expires:365});
	}
}
function setCookie(name, value, day) {
    var exp = new Date();
    exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = name + "= " + escape(value) + ";expires= " + exp.toGMTString()
}
function getCookie(objName) {
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1])
    }
}
function scrolling() 
{  
	var currentpos=1;
	if($.browser.is=="chrome" |document.compatMode=="BackCompat" ){
		currentpos=document.body.scrollTop;
	}else{
		currentpos=document.documentElement.scrollTop;
	}

	window.scroll(0,++currentpos);
	if($.browser.is=="chrome" || document.compatMode=="BackCompat" ){
		temPos=document.body.scrollTop;
	}else{
		temPos=document.documentElement.scrollTop;
	}

	if(currentpos!=temPos){
        ///msie/.test( userAgent )
        var autopage = $.cookie("autopage");
        if(autopage==1&&/next_page/.test( document.referrer ) == false) location.href=next_page;
		sc();
	}
}

function scrollwindow(){
	timer=setInterval("scrolling()",250/speed);
}

function sc(){ 
	clearInterval(timer); 
}

function setSpeed(ispeed){ 
	if(ispeed==0)ispeed=5;
	speed=ispeed;
	$.cookie("scrollspeed",ispeed,{path:'/',expires:365});
}

function setAutopage(){
	if($('#autopage').is(":checked") == true){
		$('#autopage').attr("checked",true);	
		$.cookie("autopage",1,{path:'/',expires:365});
	}else{
		$('#autopage').attr("checked",false);
		$.cookie("autopage",0,{path:'/',expires:365});
	}
}

var jieqiUserId = 0;
var jieqiUserName = '';
var jieqiUserPassword = '';
var jieqiUserGroup = 0;
var jieqiNewMessage = 0;
var jieqiUserVip = 0;
var jieqiUserHonor = '';
var jieqiUserGroupName = '';
var jieqiUserVipName = '';


var timestamp = Math.ceil((new Date()).valueOf()/1000); //当前时间戳
var flag_overtime = -1;
if(document.cookie.indexOf('jieqiUserInfo') >= 0){
	var jieqiUserInfo = get_cookie_value('jieqiUserInfo');
	//document.write(jieqiUserInfo);
	start = 0;
	offset = jieqiUserInfo.indexOf(',', start); 
	while(offset > 0){
		tmpval = jieqiUserInfo.substring(start, offset);
		tmpidx = tmpval.indexOf('=');
		if(tmpidx > 0){
           tmpname = tmpval.substring(0, tmpidx);
		   tmpval = tmpval.substring(tmpidx+1, tmpval.length);
		   if(tmpname == 'jieqiUserId') jieqiUserId = tmpval;
		   else if(tmpname == 'jieqiUserName_un') jieqiUserName = tmpval;
		   else if(tmpname == 'jieqiUserPassword') jieqiUserPassword = tmpval;
		   else if(tmpname == 'jieqiUserGroup') jieqiUserGroup = tmpval;
		   else if(tmpname == 'jieqiNewMessage') jieqiNewMessage = tmpval;
		   else if(tmpname == 'jieqiUserVip') jieqiUserVip = tmpval;
		   else if(tmpname == 'jieqiUserHonor_un') jieqiUserHonor = tmpval;
		   else if(tmpname == 'jieqiUserGroupName_un') jieqiUserGroupName = tmpval;
		}
		start = offset+1;
		if(offset < jieqiUserInfo.length){
		  offset = jieqiUserInfo.indexOf(',', start); 
		  if(offset == -1) offset =  jieqiUserInfo.length;
		}else{
          offset = -1;
		}
	}
	flag_overtime = get_cookie_value('overtime');
} else {
	delCookie('overtime');
}
function delCookie(name){
   var date = new Date();
   date.setTime(date.getTime() - 10000);
   document.cookie = name + "=a; expires=" + date.toGMTString();
}

function get_cookie_value(Name) { 
  var search = Name + "=";
　var returnvalue = ""; 
　if (document.cookie.length > 0) { 
　  offset = document.cookie.indexOf(search) 
　　if (offset != -1) { 
　　  offset += search.length 
　　  end = document.cookie.indexOf(";", offset); 
　　  if (end == -1) 
　　  end = document.cookie.length; 
　　  returnvalue=unescape(document.cookie.substring(offset, end));
　　} 
　} 
　return returnvalue; 
}
//滑动门
	function getNames(obj,name,tij)
	{	
		var p = document.getElementById(obj);
		var plist = p.getElementsByTagName(tij);
		var rlist = new Array();
		for(i=0;i<plist.length;i++)
		{
			if(plist[i].getAttribute("name") == name)
			{
				rlist[rlist.length] = plist[i];
			}
		}
		return rlist;
	}

		function fod(obj,name)
		{
			var p = obj.parentNode.getElementsByTagName("td");
			var p1 = getNames(name,"f","div"); // document.getElementById(name).getElementsByTagName("div");
			for(i=0;i<p1.length;i++)
			{
				if(obj==p[i])
				{
					p[i].className = "tab"+i+"1";   ;
					p1[i].className = "dis";
				}
				else
				{
					p[i].className = "tab"+i+"0"; 
					p1[i].className = "undis";
				}
			}
		}
//全站顶部登录
//历史记录
var _num = 10;

function LastRead(){
	this.bookList="bookList"
	}
LastRead.prototype={	
	set:function(bid,tid,title,texttitle){
		if(!(bid&&tid&&title&&texttitle))return;
		var v=bid+'#'+tid+'#'+title+'#'+texttitle;
		this.setItem(bid,v);
		this.setBook(bid)		
		},
	
	get:function(k){
		return this.getItem(k)?this.getItem(k).split("#"):"";						
		},
	
	remove:function(k){
		this.removeItem(k);
		this.removeBook(k)			
		},
	
	setBook:function(v){
		var reg=new RegExp("(^|#)"+v); 
		var books =	this.getItem(this.bookList);
		if(books==""){
			books=v
			}
		 else{
			 if(books.search(reg)==-1){
				 books+="#"+v				 
				 }
			 else{
				  books.replace(reg,"#"+v)
				 }	 
			 }	
			this.setItem(this.bookList,books)
		
		},
	
	getBook:function(){
		var v=this.getItem(this.bookList)?this.getItem(this.bookList).split("#"):Array();
		var books=Array();
		if(v.length){
			
			for(var i=0;i<v.length;i++){
				var tem=this.getItem(v[i]).split('#');	
				if(i>v.length-(_num+1)){
					if (tem.length>3)	books.push(tem);
				}
				else{
					lastread.remove(tem[0]);
				}
			}		
		}
		return books		
	},
	
	removeBook:function(v){		
	    var reg=new RegExp("(^|#)"+v); 
		var books =	this.getItem(this.bookList);
		if(!books){
			books=""
			}
		 else{
			 if(books.search(reg)!=-1){	
			      books=books.replace(reg,"")
				 }	 
			 
			 }	
			this.setItem(this.bookList,books)		
		
		},
	
	setItem:function(k,v){
		if(!!window.localStorage){		
			localStorage.setItem(k,v);		
		}
		else{
			var expireDate=new Date();
			  var EXPIR_MONTH=30*24*3600*1000;			
			  expireDate.setTime(expireDate.getTime()+12*EXPIR_MONTH)
			  document.cookie=k+"="+encodeURIComponent(v)+";expires="+expireDate.toGMTString()+"; path=/";		
			}			
		},
		
	getItem:function(k){
		var value=""
		var result=""				
		if(!!window.localStorage){
			result=window.localStorage.getItem(k);
			 value=result||"";	
		}
		else{
			var reg=new RegExp("(^| )"+k+"=([^;]*)(;|\x24)");
			var result=reg.exec(document.cookie);
			if(result){
				value=decodeURIComponent(result[2])||""}				
		}
		return value
		
		},
	
	removeItem:function(k){		
		if(!!window.localStorage){
		 window.localStorage.removeItem(k);		
		}
		else{
			var expireDate=new Date();
			expireDate.setTime(expireDate.getTime()-1000)	
			document.cookie=k+"= "+";expires="+expireDate.toGMTString()							
		}
		},	
	removeAll:function(){
		if(!!window.localStorage){
		 window.localStorage.clear();		
		}
		else{
		var v=this.getItem(this.bookList)?this.getItem(this.bookList).split("#"):Array();
		var books=Array();
		if(v.length){
			for( i in v ){
				var tem=this.removeItem(v[k])				
				}		
			}
			this.removeItem(this.bookList)				
		}
		}	
	}
function showbook(){
	var showbook=document.getElementById('showbook');
	var bookhtml='';
	var books=lastread.getBook();
	if(books.length){
			for(var i=books.length-1;i>-1;i--){
				var shortid = parseInt(books[i][0]/1000);
				bookhtml+='<li><a class="bookname" href="'+books[i][0]+'" title="'+books[i][2]+'" target="_blank">'+books[i][2]+'</a><a href="'+books[i][1]+'" title="'+books[i][3]+'" class="chaptername" target="_blank">'+books[i][3]+'</a><a href="javascript:removebook(\''+books[i][0]+'\')" class="delbook">删除</a></li>'
			}
		}else{
			bookhtml+='<li class="nohistory">暂无阅读记录！</li>'
		}
	showbook.innerHTML=bookhtml;
} 
function removebook(k){
	lastread.remove(k);
	showbook()
}
window.lastread = new LastRead();
//阅读页
function textselect(){
	document.writeln('<div id="page_set"><select onchange="javascript:setFont(this.options[this.selectedIndex].value);" id="bcolor" name="bcolor"><option value="">字体</option><option value="方正启体简体">默认</option><option value="黑体">黑体</option><option value="楷体_GB2312">楷体</option><option value="微软雅黑">雅黑</option><option value="方正启体简体">启体</option><option value="宋体">宋体</option></select>&nbsp;<select onchange="javascript:setColor(this.options[this.selectedIndex].value);" id="bcolor" name="bcolor"><option value="">颜色</option><option value="#888888">默认</option><option value="#9370DB">暗紫</option><option value="#2E8B57">藻绿</option><option value="#2F4F4F">深灰</option><option value="#778899">青灰</option><option value="#800000">栗色</option><option value="#6A5ACD">青蓝</option><option value="#BC8F8F">玫褐</option><option value="#F4A460">黄褐</option><option value="#F5F5DC">米色</option><option value="#F5F5F5">雾白</option></select>&nbsp;<select onchange="javascript:setSize(this.options[this.selectedIndex].value);" id="bcolor" name="bcolor"><option value="#E9FAFF">大小</option><option value="19pt">默认</option><option value="10pt">10pt</option><option value="12pt">12pt</option><option value="14pt">14pt</option><option value="16pt">16pt</option><option value="18pt">18pt</option><option value="20pt">20pt</option><option value="22pt">22pt</option><option value="25pt">25pt</option><option value="30pt">30pt</option></select>&nbsp;<select onchange="javascript:setSpeed(this.options[this.selectedIndex].value);" id="scrollspeed" name="scrollspeed"><option value=5>滚屏</option><option value=1>最慢</option><option value=2>慢2</option><option value=3>慢3</option><option value=4>中4</option><option value=5>中5</option><option value=6>中6</option><option value=7>快7</option><option value=8>快8</option><option value=9>快9</option><option value=10>最快</option></select>&nbsp;<select onchange="javascript:setBGColor(this.options[this.selectedIndex].value);" id="bcolor" name="bcolor"><option value="" style="background-color: #f9f9f9;">背景</option><option value="#EFEFEF" style="background-color: #EFEFEF;">默认</option><option value="#E9FAFF" style="background-color: #E9FAFF;">淡蓝</option><option value="#FFFFFF" style="background-color: #FFFFFF;">白雪</option><option value="#000000" style="background-color: #000000;color:#FFFFFF;">漆黑</option><option value="#FFFFED" style="background-color: #FFFFED;">明黄</option><option value="#EEFAEE" style="background-color: #EEFAEE;">淡绿</option><option value="#CCE8CF" style="background-color: #CCE8CF;">草绿</option><option value="#FCEFFF" style="background-color: #FCEFFF;">红粉</option><option value="#EFEFEF" style="background-color: #EFEFEF;">深灰</option><option value="#F5F5DC" style="background-color: #F5F5DC;">米色</option><option value="#D2B48C" style="background-color: #D2B48C;">茶色</option><option value="#C0C0C0" style="background-color: #E7F4FE;">银色</option></select>&nbsp;<select onchange="javascript:setWidth(this.options[this.selectedIndex].value);" id="bcolor" name="bcolor"><option value="90%">宽度</option><option value="90%">默认</option><option value="85%">85%</option><option value="80%">80%</option><option value="75%">75%</option><option value="70%">70%</option><option value="65%">65%</option></select>&nbsp;翻页<input type="checkbox" name="autopage" id="autopage" onchange="javascript:setAutopage();" value="" />&nbsp;夜间<input type="checkbox" name="night" id="night" onchange="javascript:setNight();" value="" /></div>');
}
//百度自动推送
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
//统计
function tj() {
    /*var BcB1 = BcB1 || [];(function() {  var LHX2 = window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]["\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74"]("\x73\x63\x72\x69\x70\x74");  LHX2["\x73\x72\x63"] = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x68\x6d\x2e\x62\x61\x69\x64\x75\x2e\x63\x6f\x6d\x2f\x68\x6d\x2e\x6a\x73\x3f\x62\x66\x63\x38\x66\x64\x66\x65\x37\x61\x32\x36\x61\x30\x30\x33\x31\x37\x34\x65\x62\x31\x64\x36\x31\x62\x32\x35\x34\x32\x38\x32";  var QZCivh3 = window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]["\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x73\x42\x79\x54\x61\x67\x4e\x61\x6d\x65"]("\x73\x63\x72\x69\x70\x74")[0];   QZCivh3["\x70\x61\x72\x65\x6e\x74\x4e\x6f\x64\x65"]["\x69\x6e\x73\x65\x72\x74\x42\x65\x66\x6f\x72\x65"](LHX2, QZCivh3);})();*/
}
//阅读页右上角
function read_panel(){
	document.writeln("<div class=\"header_search\"><form name=\"form\" method=\"post\" action=\"/modules/article/search.php\" target=\"_blank\"><select name=\"searchtype\" class=\"bstype\"><option value=\"articlename\" selected=\"selected\">书名</option><option value=\"author\">作者</option></select><input name=\"searchkey\" type=\"text\" value=\"\" class=\"search\" id=\"wd\" baidusug=\"2\" placeholder=\"可搜书名，请您少字也别输错字。\" autocomplete=\"off\"><button id=\"sss\" type=\"submit\"> 搜 索 </button></form><a class=\"header_mark\" href=\"/modules/article/bookcase.php\">我的书架</a></div>");
	document.writeln("<div class=\"userpanel\">&nbsp;<font color=\"red\">报错：</font><a target=\"_blank\" href=\"http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=\">通过邮件</a>、<a href=\"/newmessage.php?tosys=1&title="+booktitle+"-章节错误&content=错误章节为:"+readtitle+"\" >站内短信</a><br /><a target=\"_blank\" href=\"/gg/jw2015.html\">净网2015</a>&nbsp;&nbsp;<a target=\"_blank\" href=\"/gg/jifen.html\">积分规则</a>&nbsp;&nbsp;<a target=\"_blank\" href=\"/gg/dns.html\">DNS劫持</a></div>");
}
//列表页右上角
function list_panel(){
	document.writeln("<div class=\"header_search\"><form name=\"form\" method=\"post\" action=\"/modules/article/search.php\" target=\"_blank\"><select name=\"searchtype\" class=\"bstype\"><option value=\"articlename\" selected=\"selected\">书名</option><option value=\"author\">作者</option></select><input name=\"searchkey\" type=\"text\" value=\"\" class=\"search\" id=\"wd\" baidusug=\"2\" placeholder=\"可搜书名，请您少字也别输错字。\" autocomplete=\"off\"><button id=\"sss\" type=\"submit\"> 搜 索 </button></form><a class=\"header_mark\" href=\"/modules/article/bookcase.php\">我的书架</a></div>");
	document.writeln("<div class=\"userpanel\">&nbsp;<font color=\"red\">报错：</font><a target=\"_blank\" href=\"http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=\">通过邮件</a>、<a href=\"/newmessage.php?tosys=1&title="+booktitle+"-章节错误&content=错误为:\" >站内短信</a><br /><a target=\"_blank\" href=\"/gg/jw2015.html\">净网2015</a>&nbsp;&nbsp;<a target=\"_blank\" href=\"/gg/jifen.html\">积分规则</a>&nbsp;&nbsp;<a target=\"_blank\" href=\"/gg/dns.html\">DNS劫持</a></div>");
}
//右上角
function panel(){
	document.writeln("<div class=\"header_search\"><form name=\"form\" method=\"post\" action=\"/modules/article/search.php\" target=\"_blank\"><select name=\"searchtype\" class=\"bstype\"><option value=\"articlename\" selected=\"selected\">书名</option><option value=\"author\">作者</option></select><input name=\"searchkey\" type=\"text\" value=\"\" class=\"search\" id=\"wd\" baidusug=\"2\" placeholder=\"可搜书名，请您少字也别输错字。\" autocomplete=\"off\"><button id=\"sss\" type=\"submit\"> 搜 索 </button></form><a class=\"header_mark\" href=\"/modules/article/bookcase.php\">我的书架</a></div>");
	document.writeln("<div class=\"userpanel\">&nbsp;<font color=\"red\">留言：</font><a target=\"_blank\" href=\"http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=\">通过邮件</a>、<a href=\"/newmessage.php?tosys=1\" >站内短信</a><br /><a target=\"_blank\" href=\"/gg/jw2015.html\">净网2015</a>&nbsp;&nbsp;<a target=\"_blank\" href=\"/gg/jifen.html\">积分规则</a>&nbsp;&nbsp;<a target=\"_blank\" href=\"/gg/dns.html\">DNS劫持</a></div>");
}
//阅读页
function mark(){
	document.writeln("<div class=\"reader_mark1\"><a href=\"javascript:;\" onclick=\"showpop('/modules/article/addbookcase.php?id="+bookid+"&cid="+readid+"&ajax_request=1');\"></a></div>");
	document.writeln("<div class=\"reader_mark0\"><a href=\"javascript:;\" onclick=\"showpop('/modules/article/uservote.php?id="+bookid+"&ajax_request=1');\"></a></div>");
}
