var h_start=0;
var h_pos=0;
var hFubar = false;
var gStartHeight=0;

function qb_hNewPos(obj){
	if (hFubar){
		if (!document.all){var newpos = obj.screenY;} 
		else {var newpos = event.clientY;}
		h_pos = h_start-newpos;
		if (h_pos > -gStartHeight && h_pos < gStartHeight){
			html_GetElement("scCommandHolder").style.height = gStartHeight - h_pos + "px";
		}
	}
	if(html_GetElement('P1003_SQL_COMMAND1')){
		sw_TextAreaResize()
	}// carl added for textarea resize
}


function sc_initSlide () {
	document.onmousedown = qb_pickIt;
	document.onmousemove = qb_dragIt;
	document.onmouseup   = qb_dropIt;
}

function qb_pickIt(evt) { 
   var evt = (evt) ? evt : ((window.event) ? event : null);
   var target = evt.target ? evt.target : evt.srcElement;
   if ( target.id == 'h_slide') {
       qb_hPosition(evt);
       return;
   }
}

function qb_hPosition(obj) {
  if (!document.all) {
    h_start = obj.screenY + h_pos;
  } else {
    h_start = event.clientY + h_pos;
  }
    hFubar = true;
}

function qb_dragIt(evt) {
    evt = (evt) ? evt : ((window.event) ? event : null);
    var target = evt.target ? evt.target : evt.srcElement;
    if ( hFubar ) {
       qb_hNewPos(evt);
       return;
    }
}

function qb_hNewPos(obj) {
  if (hFubar) {
    if (!document.all) {
       var newpos = obj.screenY;
    } else {
       var newpos = event.clientY;
    }
    h_pos = h_start-newpos;
    if (h_pos > -gStartHeight && h_pos < gStartHeight)
      {
        html_GetElement("scCommandHolder").style.height = gStartHeight - h_pos + "px";
      }
   }
   if(html_GetElement('P1003_SQL_COMMAND1')){sw_TextAreaResize()}// carl added for textarea resize
}


function qb_dropIt(evt) {
  evt = (evt) ? evt : ((window.event) ? event : null);
  var target = evt.target ? evt.target : evt.srcElement;
  if ( hFubar ) {
   hFubar = false;
  }
}


function db_Resize(){
	var l_Height = 0;
	if(document.all){l_Height = document.body.clientHeight *.75;}
	else{l_Height = window.innerHeight *.75;}
	gStartHeight = (l_Height/2)-3
	html_GetElement('SqlAndResults').style.height = l_Height;
	html_GetElement('scCommandHolder').style.height = gStartHeight;
	sw_TextAreaResize();
	return;
}

function sw_TextAreaResize(){
	sw_TextAreaResizeW();
	sw_TextAreaResizeH();
	return
}


function sw_TextAreaResizeW(){
	var l_NewWidth = 0;
    if(document.all){l_NewWidth = parseInt(document.body.offsetWidth) - 25;}
	else{l_NewWidth = parseInt(document.body.offsetWidth)-10;}
	var lArray = new Array('h_slide','P1003_SQL_COMMAND1','scCommandHolder','SqlAndResults','htmlTabHolder','scBottomHolder');
    for (y=0,l_length=lArray.length; y<l_length; y++){ 
		html_GetElement(lArray[y]).style.width = l_NewWidth;
	}
	html_GetElement('scCommandHolder').style.overflow = 'hidden';
  return;

}

function sw_TextAreaResizeH(){
  var l_SQL = html_GetElement('P1003_SQL_COMMAND1');
  var l_NewHeight = parseInt(html_GetElement('scCommandHolder').offsetHeight)-10;
  if(l_NewHeight<0){l_NewHeight = 0}
  l_SQL.style.height = l_NewHeight;
  html_GetElement('scCommandHolder').style.overflow = 'hidden';
  return;
}
