/*htmld_elements will contain the lower level html access js*/

var gDebug = true;
var gkeyPressTime;
var gLastTab=false;
var gRegex=false;
if(document.all){document.expando = true;}
// Elements //

function html_GetElement(pNd){
  try{
    var node;
    switch(typeof (pNd)){
      case 'string':node = document.getElementById(pNd); break;
      case 'object':node = pNd; break;
      default:node = false; break;
    }
    return node;
  }catch(e){return false;}
}

function html_HideElement(pNd){
    var node = html_GetElement(pNd);
    if (node) {node.style.display = "none"};
  return node;
}

function html_ShowElement(pNd){
    var node = html_GetElement(pNd);
    if (node) {node.style.display = ""};
  return node;
}

function html_VisibleElement(pNd){
  var l_Node = html_GetElement(pNd);
  if(l_Node){l_Node.style.visibility = "visible";}
  return l_Node;
}

function html_HiddenElement(pNd){
  var l_Node = html_GetElement(pNd);
  if(l_Node){l_Node.style.visibility = "hidden";}
  return l_Node;
}

function html_ToggleElement(pNd){
    var node = html_GetElement(pNd);
    if(node){
    if(node.style.display == "none"){html_ShowElement(node)}
    else{html_HideElement(node)}
    }
    return node;
}

function html_HideItemRow(pNd){
    var node = html_GetElement(pNd);
    var lTr = html_CascadeUpTill(node,'TR');
    html_HideElement(lTr);
    return;
}

function html_ShowItemRow(pNd){
    var node = html_GetElement(pNd);
    var lTr = html_CascadeUpTill(pNd,'TR');
    html_ShowElement(lTr);
}

function html_ToggleItemRow(pNd){
    var node = html_GetElement(pNd);
    var lTr = html_CascadeUpTill(pNd,'TR');
    html_ToggleElement(lTr)
}

 function html_GetTarget(e){
 	var targ;
  var lEvt;
	if (!e) {e = window.event;}
	  if (e.target){targ = e.target;}
    else if(e.srcElement){targ = e.srcElement;
  }
	if (targ.nodeType == 3){targ = targ.parentNode;}// defeat Safari bug
  return targ;  
 }

function html_HideSiblings(pNd){
  var l_Node = html_GetElement(pNd);
   if(l_Node){
   var l_NodeSibs = l_Node.parentNode.childNodes;
   
   for(var i=0,l=l_NodeSibs.length;i<l;i++){
    if(l_NodeSibs[i] && l_NodeSibs[i].nodeType == 1){html_HideElement(l_NodeSibs[i]);}}}
    html_ToggleElement(l_Node)
  return l_Node;
}

function html_ShowSiblings(pNd){
   var node = html_GetElement(pNd);
   if(node){
    var l_NodeSibs = node.parentNode.childNodes;
    for(var i=0,l=l_NodeSibs.length;i<l;i++){if(l_NodeSibs[i] && l_NodeSibs[i].nodeType == 1){
      html_ShowElement(l_NodeSibs[i]);}}
    }
  return node;
}

function html_CascadeUpTill(pThis,pToTag,pToClass,pCount){
	var node = html_GetElement(pThis);
 if ( node) {
	var tPar = node.parentNode;
  if(pToClass){
    while(tPar.nodeName != pToTag && tPar.className != pToClass){
  	  tPar = tPar.parentNode;
    }
  }else{
    while(tPar.nodeName != pToTag){
  	  tPar = tPar.parentNode;
    }
  }
 return tPar;
 } else {
  return null;
 }
 }
 
function htmldb_ToggleWithImage(pThis,pNd){htmldb_ToggleTableBody(pThis,pNd)}
function htmldb_ToggleTableBody(pThis,pNd){
    pThis = html_GetElement(pThis);
    if(html_CheckImageSrc(pThis,'plus')){
     pThis.className = 'pseudoButtonInactive';
     pThis.src = html_replace(pThis.src,'plus','minus');
    }else{
     pThis.className = 'pseudoButtonActive';
     pThis.src = html_replace(pThis.src,'minus','plus');
    }
    var node = html_ToggleElement(pNd);
    return;
}

function findPosX(obj){
 obj = html_GetElement(obj);
   var leftOff = 0;
   var curleft = 0;
   if (obj.x) {
     return obj.x;
   } else if (obj.offsetParent) {
     while (obj.offsetParent){
       if ( obj.style.left )  {
          curleft += parseInt(obj.style.left.substring(0,obj.style.left.length-2));
          return curleft;
       }else {
          curleft += obj.offsetLeft
       }
       obj = obj.offsetParent;
     }
   } 
   return curleft;
}

function findPosY(obj){
   obj = html_GetElement(obj);
   var curtop = 0;
   if (obj.y){
     return obj.y;
   } else if (obj.offsetParent) {
     while (obj.offsetParent){
       if ( obj.style.top )  {
          curtop += parseInt(obj.style.top.substring(0,obj.style.top.length-2));
          return curtop;
       }else {
          curtop += obj.offsetTop
       }
       obj = obj.offsetParent;
     }
   }
   return curtop;
}

function html_SwitchImageSrc(pId,pSearch,pReplace){
  var htmlEl = html_GetElement(pId);
  if(htmlEl && htmlEl.nodeName == "IMG"){
    if(htmlEl.src.indexOf(pSearch) != -1){htmlEl.src = pReplace;}
  }
 return htmlEl;
}

function html_CheckImageSrc(pId,pSearch){
  var htmlEl = html_GetElement(pId);
  var lReturn = false;
  if(htmlEl && htmlEl.nodeName == "IMG"){
    if(htmlEl.src.indexOf(pSearch) != -1){lReturn = true;}
  }
 return lReturn;
}

function html_RemoveAllChildren(pThis) {
	var node = html_GetElement(pThis);
	if (node && node.hasChildNodes && node.removeChild) {
		while (node.hasChildNodes()){
			node.removeChild(node.firstChild);
		}
	}
} 

function html_SubString(pText,pMatch){
  var lReturn = false;
  if(pText && pMatch){if(pText.toString().indexOf(pMatch.toString()) != -1){lReturn = true;}}
 return lReturn;
}

function html_replace(string,text,by) {
    var strLength = string.length, txtLength = text.length;
    if ((strLength == 0) || (txtLength == 0)) return string;
    var i = string.indexOf(text);
    if ((!i) && (text != string.substring(0,txtLength))) return string;
    if (i == -1) return string;
    var newstr = string.substring(0,i) + by;
    if (i+txtLength < strLength)newstr += html_replace(string.substring(i+txtLength,strLength),text,by);
    return newstr;

}

function html_GetPageScroll(){
  pageScroll = document.body.scrollTop;
  return pageScroll;
}

function html_Find(pThis,pString,pTags,pClass){
    if (!pTags){pTags = 'DIV'}
    pThis = html_GetElement(pThis);
    if(pThis){
    var d=pThis.getElementsByTagName(pTags);
    pThis.style.display="none";
    if ( ! gRegex  ) 
         gRegex =new RegExp("test");
    gRegex.compile(pString,"i");
    var start = new Date();
    for(var i=0,len=d.length ;i<len;i++){
          if (gRegex.test(d[i].innerHTML)){
            d[i].style.display="block";
          }else{
            d[i].style.display="none";}
     }
    pThis.style.display="block";
    }
  return;
}

function html_disableItems(a,nd){
  if(nd){
    for (var i=1;i <= arguments.length; i++){html_disableItem(arguments[i],a)}
  }
  return;
}

function html_disableItem(nd,a){
    var lEl = html_GetElement(nd);
    if (lEl && lEl != false){
	  if(a){
      lEl.disabled = true;
      lEl.style.background = '#cccccc';
    }else{
      lEl.disabled = false;
      lEl.style.background = '#ffffff';
     }
	}
	return true;
} 

function html_InitTextFieldSubmits(){
 var docI = document.getElementsByTagName('INPUT');
 for(var i=0;i<docI.length;i++){
 if(docI[i].type == "text"){docI[i].onkeypress = html_submitFormFromKeyPress;}
 }
}

function html_submitFormFromKeyPress(key) {
   if ( event.keyCode == "13" )  {
       var form =  html_cascadeUpTillTag("FORM");
         if(form){form.submit()}
     }
}

function html_TabClick(pThis , pId){
    var lTab = html_GetElement(pId);
    var lParent = lTab.parentNode;
    html_HideSiblings(lTab);
    html_TabMakeCurrent(pThis);
    return;
}


function html_TabMakeCurrent(pThis){
   var node = html_GetElement(pThis);
   if(node){
    var nodeSibs = node.parentNode.parentNode.childNodes;
    for(var i=0;i < nodeSibs.length;i++){
      if(nodeSibs[i] && nodeSibs[i].nodeType == 1 && nodeSibs[i].getElementsByTagName('A')[0]){
        nodeSibs[i].getElementsByTagName('A')[0].className = "";}
      }
    pThis.className = "tabcurrent";
    }
  return node;
}

function html_ShowLov(s){
    if(lovUI){
        lovUI.innerHTML = s;
        html_ShowElement(lovUI);
        lovUI.scrollIntoView(false);
    }
    return;
}


var returnInput = null;
var returnDisplay = null;

function setReturn(return_id,display_id){
    if(return_id){returnInput = html_GetElement(return_id);}
    if(display_id){returnDisplay = html_GetElement(display_id);}
    return;
}

function html_Return_Form_Items(pThis,pType){
 var l_This = html_GetElement(pThis);
 var l_Inputs = new Array();
 var l_Array = new Array();
 l_Selects = l_This.getElementsByTagName('SELECT');
 l_Textarea = l_This.getElementsByTagName('TEXTAREA');
 l_Inputs = l_This.getElementsByTagName('INPUT');
 
 if(pType && pType.toUpperCase() == 'SELECT'){
  l_Inputs = l_Selects;
  pType = false;
 }
 else if(pType && pType.toUpperCase() == 'TEXTAREA'){
  l_Inputs = l_Textarea;
  pType = false;
 }
 else if (pType && pType.toUpperCase() == 'ALL'){
 l_Inputs = l_Inputs.concat(l_Textarea);
 l_Inputs = l_Inputs.concat(l_Selects);
 }
 else {
  l_Inputs = l_This.getElementsByTagName('INPUT');
 }
 for (var i=0;i<l_Inputs.length;i++){
  if(pType && (pType.toUpperCase() == 'ALL')){
    l_Array[l_Array.length] = l_Inputs[i];
  }
  else if(pType && (l_Inputs[i].type.toUpperCase()==pType.toUpperCase())){
    l_Array[l_Array.length] = l_Inputs[i];
  }else{
    l_Array[l_Array.length] = l_Inputs[i];
  }
 }
return l_Array;
}

function html_CheckAll(pThis,pCheck,pArray){
  if(pArray){l_Inputs = pArray;}
  else{var l_Inputs = html_Return_Form_Items(pThis,'checkbox');}
  for (var i=0,l=l_Inputs.length;i<l;i++){
    l_Inputs[i].checked = pCheck;
  }
  return;
}

function detailTab(id){
 html_TabClick(id)
 return;
}


function html_CreateFormElement(pType,pName,pValue){
 var lEl =   document.createElement('<input type="'+pType+'" name="'+ pName +'" value="'+ pValue +'" />');
 return lEl;
}

function html_StringReplace(string,text,by) {
      if(!by){by = ''}
    var strLength = string.length, txtLength = text.length;
    if ((strLength == 0) || (txtLength == 0)) {return string;}
    var i = string.indexOf(text);
    if ((!i) && (text != string.substring(0,txtLength))) {return string;}
    if (i == -1) {return string;}
    var newstr = string.substring(0,i) + by;
    if (i+txtLength < strLength){
        newstr += html_StringReplace(string.substring(i+txtLength,strLength),text,by);
                }
    return newstr;
}

function html_HideHolderDiv(){
    var tRow = html_cascadeUpTillTag("DIV");
    html_ToggleVis(tRow);
    if(tId){tId = null;}
  return;
}

function formHasValue(what) {
    var result = false;
    var output = '';
    for (var i=0, j=what.elements.length; i<j; i++) {
        myType = what.elements[i].type;
        /*if (myType == 'checkbox' || myType == 'radio') {
            if (what.elements[i].checked && what.elements[i].defaultChecked) {
                output += what.elements[i].name + ' is still checked' + '\n';
                result = false
            }
        }*/
        //if (myType == 'hidden' || myType == 'password' || myType == 'text' || myType == 'textarea') {
                if (myType == 'text' || myType == 'textarea') {
            if (what.elements[i].value != '') 
                        {result = true;
                        }
                        
        }
        if (myType == 'select-one' || myType == 'select-multiple') {
                        if(what.elements[i].selectedIndex != 0 && what.elements[i].options[what.elements[i].selectedIndex].value!=''){
                                result = true;
                            }
        }
    }
    return result;
}

function html_GoToRelative(nURL){
 var urlP = location.pathname.substring(0,location.pathname.lastIndexOf('/')); 
 document.location = urlP+"/"+nURL;
 return;
}

function html_toggleNextCell(){
 var tCell = html_cascadeUpTillTag('TD');
 tCell = tCell.nextSibling
 html_ToggleVis(tCell);
 return tCell;
}

function html_ResetSelect(tCell){
 var l_Node = html_GetElement(tCell);
 if(l_Node.nodeName == 'SELECT'){
 var tSelects = l_Node;
 }else{
 var tSelects = tCell.getElementsByTagName('select')[0];
 }
 tSelects.selectedIndex = 0;
 return;
}

function html_PageTable(table,start,end){
        var tTable = html_GetElement(table);
        if(!start){start = 1}
        if(!end){end=25}
        for(var i=0;i<tTable.rows.length;i++){
         if(i>=!start && i<=end){
                html_ShowElement(tTable.rows[i])
         }else{
           html_HideElement(tTable.rows[i])
         }
        }
}

var gDebugWindow = false;

function cDebug(pText){
   if(false){
   var vEl = top.html_GetElement('htmldbDEBUG');
   if(!vEl){
     var vEl = top.document.createElement('textarea');
     top.document.body.appendChild(vEl);
     vEl.id = 'htmldbDEBUG';
   }
 
   if(vEl){
	vEl.value =  pText + '\n' + vEl.value;

	}
}
}

function timestamp(){
   var d, s = "T:";
   var c = ":";
   d = new Date();
   s += d.getHours() + c;
   s += d.getMinutes() + c;
   s += d.getSeconds() + c;
   s += d.getMilliseconds();
   return(s);
}

var dbaseTime1 = null;
var dbaseTime2 = null;

function timeC(t){
if(dbaseTime1){
  dbaseTime2 = new Date();
  dbaseTime1 = null;
  dbaseTime2 = null;
}else{
  dbaseTime1 = new Date();
}
}

function html_MakeParent(p_Node,p_Parent){
  var l_Node = html_GetElement(p_Node);
  var l_Parent = html_GetElement(p_Parent);
  if(l_Node.parentNode != l_Parent){l_Parent.appendChild(l_Node)}
  return l_Node;
}

var gCurrentRow = false;
function html_RowHighlight(pThis,pColor){
  var l_Cells = pThis.getElementsByTagName('TD');
  for (var i=0,l=l_Cells.length;i<l;i++){
    l_Cells[i].style.background = pColor;
  }
  gCurrentCells = pThis;
  return;
}

function html_RowHighlightOff(pThis,pColor){
  var l_Cells = pThis.getElementsByTagName('TD');
  for (var i=0,l=l_Cells.length;i<l;i++){
    l_Cells[i].style.background = '';
  }
}

function html_Allow_Copy(e){
  l_return = false;
  var keyCode = document.layers ? evt.which :document.all ? event.keyCode :document.getElementById ? e.keyCode : 0; 
  if (e.ctrlKey && keyCode == "c"){l_return = true}
  return l_return
}

function html_SelectValue(pId){
 var lSelect = html_GetElement(pId);
 if(lSelect.nodeName == 'SELECT'){
  return lSelect.options[lSelect.selectedIndex].value;
 }
}

function html_SetSelectValue(pId,pValue){
 var lSelect = html_GetElement(pId);
 if(lSelect.nodeName == 'SELECT'){
  lSelect.selectedIndex = 0;
  
  for(var i=0,l=lSelect.options.length;i<l;i++){
    if(lSelect.options[i].value == pValue){lSelect.options[i].selected=true;};
  }
 }
}

function html_RadioValue(pId){
 var lReturn = false;
 var lSelect = html_Return_Form_Items(pId,'RADIO');
 var l=lSelect.length
   for(var i=0;i<l;i++){
   if(lSelect[i].checked){
    lReturn=lSelect[i].value;
   }
 }
 return lReturn;
}

function html_ReturnToTextSelection(pText,pThis){ 
 if (document.selection){//IE support for inserting HTML into textarea
   var cmd = html_GetElement(pThis);
   cmd.focus();
   var sel = document.selection;
   var rng = sel.createRange();
   rng.text = rng.text + ' ' + pText;
 }else{ // Mozilla/Netscape support for selecting textarea
  cmd = html_GetElement(pThis);
  start = cmd.selectionStart;
  end = cmd.selectionEnd;
  cmd.value = cmd.value.slice(0,start) +' ' + pText + cmd.value.slice(end,cmd.value.length);  
  cmd.focus();
  setCaretToPos (cmd, end +(pText.length + 2));
 }
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToEnd (input) {
  setSelectionRange(input, input.value.length, input.value.length);
}

function setCaretToBegin (input) {
  setSelectionRange(input, 0, 0);
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

function selectString (input, string) {
  var match = new RegExp(string, "i").exec(input.value);
  if (match) {
    setSelectionRange (input, match.index, match.index + match
[0].length);
  }
}

 function ob_PPR_TAB(l_URL){
  top.gLastTab = l_URL;
  var lBody = document.body;
  var http = new htmldb_Get(lBody,null,null,null,null,'f',l_URL.substring(2));
  var temp = http.get(null,'<body  style="padding:10px;">','</body>');
  get = null;
  if(document.all){
    var ie_HACK = 'window.parent.obFrameSize()';
	setTimeout(ie_HACK,100);}
    else{window.parent.obFrameSize();}
 } 

/* FROM core.js*/
function flowSelectAll(){
	var theList;
	if (typeof(flowSelectArray)=="undefined"){return true;}
	else{
		for (a=0;a<flowSelectArray.length;a++){						
			theList = html_GetElement(flowSelectArray[a]);
			 for ( i = 0; i <= theList.length-1; i++ )
			  theList.options[i].selected = false;
			 for ( i = 0; i <= theList.length-1; i++ )
			  theList.options[i].selected = true;
		}
	}
 return true;
}

function redirect(where){
  location.href=where;
  return;
} // End redirect

function doSubmit(r){
	flowSelectAll();
	document.wwv_flow.p_request.value = r;
	document.wwv_flow.submit();
} // End doSubmit()

function first_field(field1){
try{
    	if(html_GetElement(field1)){
    		var theField = html_GetElement(field1);
    		if((theField.type!="hidden")&&(!theField.disabled)){theField.focus();}
      }
	return true;
}catch(e){}
}

function charCount(tArea,maxNo,ctrField,maxField,ctrBlock,allowExtra){
	var textArea = html_GetElement(tArea);
	var ctrF	 = html_GetElement(ctrField);
	var maxF	 = html_GetElement(maxField);
	var ctrBlk   = html_GetElement(ctrBlock);
	var pctFull  = textArea.value.length / maxNo * 100;
	if (allowExtra != 'Y')
		{if (textArea.value.length >= maxNo)
			{textArea.value = textArea.value.substring(0, maxNo);
			 textArea.style.color = 'red';
			}
		 else
			{msg = null;
			 textArea.style.color = 'black';}
		}
	ctrF.innerHTML = textArea.value.length;
	maxF.innerHTML = maxNo;
	if (textArea.value.length > 0){
    ctrBlk.style.visibility = 'visible';
  }else{
    ctrBlk.style.visibility = 'hidden';
  }

	if (pctFull >= 90){
    ctrBlk.style.color='red';
  }else if (pctFull >= "80"){
    ctrBlk.style.color='#EAA914';
  }else{
    ctrBlk.style.color='black';
  }

} // End charCount()

function shuttleItem(theSource, theDest, moveAll) {
    srcList  = html_GetElement(theSource);
    destList = html_GetElement(theDest);
    var arrsrcList = new Array();
    var arrdestList = new Array();
    var arrLookup = new Array();
    var i;
    if (moveAll){
        for ( i = 0; i <= srcList.length-1; i++ )
			  srcList.options[i].selected = true;
    }
    for (i = 0; i < destList.options.length; i++) {
        arrLookup[destList.options[i].text] = destList.options[i].value;
        arrdestList[i] = destList.options[i].text;}
    var fLength = 0;
    var tLength = arrdestList.length;
    for(i = 0; i < srcList.options.length; i++) {
        arrLookup[srcList.options[i].text] = srcList.options[i].value;
        if (srcList.options[i].selected && srcList.options[i].value != "") {
            arrdestList[tLength] = srcList.options[i].text;
            tLength++;}
        else {
            arrsrcList[fLength] = srcList.options[i].text;
            fLength++;}
    }
    arrsrcList.sort();
    arrdestList.sort();
    srcList.length = 0;
    destList.length = 0;
    var c;
    for(c = 0; c < arrsrcList.length; c++) {
        var no = new Option();
        no.value = arrLookup[arrsrcList[c]];
        no.text = arrsrcList[c];
        srcList[c] = no;
    }
    for(c = 0; c < arrdestList.length; c++) {
        var no = new Option();
        no.value = arrLookup[arrdestList[c]];
        no.text = arrdestList[c];
        destList[c] = no;
       }
} // End shuttleItem()

var ie = (document.all) ? true : false;

function setStyleByClass(t,c,p,v){
	var elements;
	if(t == '*') {
		// '*' not supported by IE/Win 5.5 and below
		elements = (ie) ? document.all : document.getElementsByTagName('*');
	} else {
		elements = document.getElementsByTagName(t);
	}
	for(var i = 0; i < elements.length; i++){
		var node = elements.item(i);
		for(var j = 0; j < node.attributes.length; j++) {
			if(node.attributes.item(j).nodeName == 'class') {
				if(node.attributes.item(j).nodeValue == c) {
					eval('node.style.' + p + " = '" +v + "'");
				}
			}
		}
	}
}

function setClassByClass(t,c,p){
	var elements;
	if(t == '*') {
		// '*' not supported by IE/Win 5.5 and below
		elements = (ie) ? document.all : document.getElementsByTagName('*');
	} else {
		elements = document.getElementsByTagName(t);
	}
	for(var i = 0; i < elements.length; i++){
		var node = elements.item(i);
		for(var j = 0; j < node.attributes.length; j++) {
			if(node.attributes.item(j).nodeName == 'class') {
				if(node.attributes.item(j).nodeValue == c) {
					node.className = p ;
				}
			}
		}
	}
}

function setStyle(e,s,v){
    theItem = html_GetElement(e);
    eval('theItem.style.'+ s + " = '" + v + "'");
}

function confirmDelete(msg,req){
    if(req==null){req='Delete'}
    var confDel = msg;
    if(confDel ==null){
        confDel= confirm("Would you like to perform this delete action?");
    }else{
        confDel= confirm(msg);}
    
    if (confDel== true){
      doSubmit(req);}
}

function submitEnter(itemObj,e){
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    else return true;
    if (keycode == 13){
       doSubmit(itemObj.id);
      return false;
    }else{
       return true;
    }

}

function hideShow(objectID,imgID,showImg,hideImg){
    var theImg = html_GetElement(imgID);
    var theDiv = html_GetElement(objectID);
    if(theDiv.style.display == 'none' || theDiv.style.display == '' || theDiv.style == null){
        theImg.src = hideImg;
        html_GetElement(objectID).style.display = 'block';}
    else{
        theImg.src = showImg;
        html_GetElement(objectID).style.display = 'none';}
    return;
}

//Get a value from a cookie
function htmldbCheckCookie(pThis){
  SetCookie ('ISCOOKIE','true');
  flow = GetCookie ('ISCOOKIE');
  if(flow){}else{
   //doSubmit()
  }
  return
}

function getCookieVal (offset){
   var endstr = document.cookie.indexOf (";", offset);
   if (endstr == -1)
      endstr = document.cookie.length;
   return unescape(document.cookie.substring(offset, endstr));

   }
//Get a cookie and it's value
function GetCookie (name) 
   {
   var arg = name + "=";
   var alen = arg.length;
   var clen = document.cookie.length;
   var i = 0;
   while (i < clen) 
      {
      var j = i + alen;
      if (document.cookie.substring(i, j) == arg)
         return getCookieVal (j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0) break; 
      }
   return null;
   }

//Set a cookie and it's value
function SetCookie (name, value) {
   var argv = SetCookie.arguments;
   var argc = SetCookie.arguments.length;
   var expires = (argc > 2) ? argv[2] : null;
   var path = (argc > 3) ? argv[3] : null;
   var domain = (argc > 4) ? argv[4] : null;
   var secure = (argc > 5) ? argv[5] : false;
   document.cookie = name + "=" + escape (value) +
        ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
        ((path == null) ? "" : ("; path=" + path)) +
        ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");
   }

// Used for quick edit links
function quickLinks(what){
    if (what == 'HIDE'){  
        setClassByClass('a','eLinkOn','eLink');
        setClassByClass('img','eLinkOn','eLink');
        setStyle('hideEdit','display','none');
        setStyle('showEdit','display','inline');
        SetCookie('MarvelQuickEdit',what);}
    else{
        setClassByClass('a','eLink','eLinkOn');
        setClassByClass('img','eLink','eLinkOn'); 
        setStyle('hideEdit','display','inline');
        setStyle('showEdit','display','none');
        SetCookie('MarvelQuickEdit',what);}            
}

/* */
var htmldb_ch=false;  
function htmldb_item_change(e){htmldb_ch=true;}

function htmldb_doUpdate(r){
     if(htmldb_ch){
         lc_SetChange()
         doSubmit(r);
     }else{
         doSubmit(r);
     }  
     return;
 }

function htmldb_goSubmit(r){
  if(htmldb_ch){
		if (!htmldb_ch_message || htmldb_ch_message == null){htmldb_ch_message='Are you sure you want to leave this page without saving? /n Please use translatable string.';}
    if (window.confirm(htmldb_ch_message)){doSubmit(r);}
  }else{
    doSubmit(r);
  }
  return;      
} 

function html_PopUp(pURL,pName,pWidth,pHeight){
  if(!pURL){pURL = 'about:blank'}
  if(!pName){pName = 'Popup'}
  if(!pWidth){pWidth = 600}
  if(!pHeight){pHeight = 600}
  l_Window = window.open(pURL,pName, 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width='+pWidth+',height='+pHeight);
  if (l_Window.opener == null){l_Window.opener = self;}
  l_Window.focus();
  return l_Window;
}

// used for custom popup of condition types
function callConditionsPopup(s1, sessionId) {
     var pURL = 'f?p=4000:271:' + sessionId + ':::271:PASSBACK:' + s1.name;
     html_PopUp(pURL,null,null,null);
 }

// used for custom popup of page template preview
function callPageTemplatePopup(s1, sessionId, flowId, pageId) {
     var pURL = 'f?p=4000:74:' + sessionId + ':::74:F4000_P74_PASSBACK,F4000_P74_FLOW_ID,F4000_P74_PAGE_ID:' + s1.name + ',' + flowId + ',' + pageId;
     html_PopUp(pURL,null,null,null);
 } 
 
function popupFieldHelp(curentItemId, sessionId, closeButtonName){
    var closeButton;
    if (closeButtonName){closeButton = '&p_close_button_name='+closeButtonName;}
    else{closeButton = '';}
    html_PopUp("wwv_flow_item_help.show_help?p_item_id=" + curentItemId + "&p_session=" + sessionId+closeButton,'Help',500,350);
    return;
}

// use for popups in which you want the page to close after delete
function confirmDelete2(msg,req){
    if(req==null){req='Delete'}
    var confDel = msg;
    if(confDel ==null){
        confDel= confirm("Would you like to perform this delete action?");}
    else{
        confDel= confirm(msg);}
    if (confDel== true){
        doSubmit(req);
        window.close();
     }
}

function popUpNamed(pURL,pName) {html_PopUp(pURL,pName,null,null)}
function popUp2(pURL,pWidth,pHeight) {day = new Date();pName = day.getTime();html_PopUp(pURL,pName,pWidth,pHeight);}
function popUp(pURL) {day = new Date();pName = day.getTime();html_PopUp(pURL,pName,null,null);}
function popupURL(pURL){html_PopUp(pURL,"winLov",800,600);}

/* End Popup Functionality */



// similar to lpad (str, 2, '0')
function LZ(x) {
    return(x<0||x>9?x:"0"+x);
 }

function whichElement ( pForm, pElement, pOffset ){
  n = parseInt(pElement.substring(3,pElement.length),10);
  m = n + parseInt(pOffset,10);  
  return  eval("document." + pForm + ".p_t" + LZ(m));
}

function nullFields(event, pField1, pField2, pField3) {
    var code = 0;
    code = event.keyCode;
    if (code > 45 && code < 106 || code == 8) {
      if (pField1) {pField1.value = "";}
      if (pField1) {pField2.value = "";}
      if (pField3) {pField3.value = "";}
    }
}


function selectAll(fromList){
 for ( i = 0; i <= fromList.length-1; i++ )
  fromList.options[i].selected = false;
 for ( i = 0; i <= fromList.length-1; i++ )
  fromList.options[i].selected = true;
 return true;
}

function upperMe(pId){
   var obj = html_GetElement(pId);
   if(obj){obj.value = obj.toUpperCase()}
}

function disableItems(testString,item1,item2,item3,item4,item5,item6,item7,item8,item9,item10){
    var theTest = eval(testString);
    var i = 1;
    if(theTest){
        for(i;i<12;i++){
            if (arguments[i]){
                disItem = html_GetElement(arguments[i]);
                disItem.style.background = '#cccccc';
                disItem.disabled = true;
                }
            }
        }
    else{
        for(i;i<12;i++){
            if (arguments[i]){
                disItem = html_GetElement(arguments[i]);
                disItem.disabled = false;
                disItem.style.background = '#ffffff';
                }
            }
    }
}     

function setValue(id,val){
    var obj = html_GetElement(id);
    if(obj){
      obj.value = val;
    }
}

function lc_SetChange(){
   if (gChangeCheck){
   gChangeCheck.value = 1;
   gChangeCheck.type = 'text';
   }
}

//  errorMsg = the message returned if the value is not avilible.
function setValue2(id,val,errorMsg){
        obj = html_GetElement(id);
        if(obj){
          obj.value = val;
          if (obj.value != val){alert(errorMsg)}
        }
}
 
 
 /*Notes: complex elements dhtml library*/
/*Begin DHTML Menus*/
var gCurrentAppMenu = false;
var gCurrentAppMenuImage = false;
var gSubMenuArray = new Array();

/* close all submenus */
function dhtml_CloseAllSubMenus(pStart){
  var l_Start = null;
  if(!pStart){l_Start = 0}
  else{l_Start = pStart;}
  
  for (var i=l_Start;i<=gSubMenuArray.length;i++){
    if(gSubMenuArray[i]){
      var l_Sm = html_HideElement(gSubMenuArray[i]);
      if(l_Sm){html_HideElement(l_Sm)};
    }
  }
  /*if you deleted starting from level do not null out array*/
  if(!pStart){gSubMenuArray.length = 0}
  htmldb_IE_Select_Item_Fix(false)
  return;
}

/* close all submenus starting from level */
function dhtml_CloseAllSubMenusL(pThis){
  var l_Start = parseInt(html_CascadeUpTill(pThis,'UL').getAttribute("htmldb:listlevel"))+1;
  dhtml_CloseAllSubMenus(l_Start);
  return;
}

function dhtml_DocMenuCheck(e){
  var tPar = html_GetTarget(e);
  var l_Test = true;
    while(tPar.nodeName != 'BODY'){
  	  tPar = tPar.parentNode;
      if(html_SubString(tPar.className,'dhtmlMenuLG')){l_Test = !l_Test;}
    }
  if(l_Test){
    app_AppMenuMultiClose();
    dhtml_CloseAllSubMenus();
    document.onclick = null;
  }
  else{
  }
  return;
}

function dhtml_ButtonDropDown(pThis,pThat,pDir,pX,pY){
  //var lThis = html_CascadeUpTill(pThis,'TABLE')//.cells[1];
  dhtml_SingeMenuOpen(pThis,pThat,'Bottom',pX,pY);
  return
}

function dhtml_MenuOpen(pThis,pThat,pSub,pDir){
    if(html_GetElement(pThat)){
      document.onclick = dhtml_DocMenuCheck;
      if(!pSub){
        dhtml_CloseAllSubMenus();
        gCurrentAppMenu = pThat;
      }else{
        var l_Level = parseInt(html_GetElement(pThat).getAttribute("htmldb:listlevel"));
        var l_Temp = gSubMenuArray[l_Level];
        if(l_Temp){html_HideElement(l_Temp);}
        gSubMenuArray[l_Level] = html_GetElement(pThat);
       }
        var lMenu = html_GetElement(pThat);
        document.body.appendChild(lMenu);
        if(!pDir || pDir == 'Right'){
          lMenu.style.position = "absolute"
          lMenu.style.top = parseInt(findPosY(pThis));
          lMenu.style.left = parseInt(findPosX(pThis));
        }else if(pDir == 'Bottom'){
          lMenu.style.position = "absolute"
          lMenu.style.top = parseInt(findPosY(pThis)) + parseInt(pThis.offsetHeight);
          lMenu.style.left = parseInt(findPosX(pThis));
        }else if(pDir == 'BottomRight'){
          lMenu.style.position = "absolute"
          lMenu.style.top = parseInt(findPosY(pThis)) + parseInt(pThis.offsetHeight);
          lMenu.style.left = parseInt(findPosX(pThis)) - parseInt(pThis.offsetWidth);
        }else{
          lMenu.style.position = "absolute"
          lMenu.style.top = parseInt(findPosY(pThis));
          lMenu.style.left = parseInt(findPosX(pThis)) + parseInt(pThis.offsetWidth);
        }
        html_ShowElement(lMenu);
        dhtml_FixLeft(pThis,lMenu)
        htmldb_IE_Select_Item_Fix(lMenu);
        }
      return
}

function dhtml_DocMenuSingleCheck(e,force){
  if(g_Single_Menu_Count > 0){
  if(e){
	var tPar = html_GetTarget(e)
	var l_Test = true;
    while(tPar.nodeName != 'BODY' && !force){
  	  tPar = tPar.parentNode;
      if(tPar == g_Single_Menu){
        l_Test = !l_Test;
      }
    }
	}
    if(l_Test || force){
      html_HideElement(g_Single_Menu);
      document.onclick = null;
    }else{}
  }else{
    g_Single_Menu_Count = 1
  }
  return;
}

var g_Single_Menu = false;
var g_Single_Menu_Count = 0;
function dhtml_SingeMenuOpen(pThis,pThat,pDir,pX,pY){
        var lMenu = html_GetElement(pThat);
        var lThis = html_GetElement(pThis);
        lMenu.style.zIndex = 2001;
        document.body.appendChild(lMenu);
        if(!pDir || pDir == 'Right'){
          lMenu.style.position = "absolute"
          lMenu.style.top = parseInt(findPosY(lThis));
          lMenu.style.left = parseInt(findPosX(lThis));
        }else if(pDir == 'Bottom'){
          lMenu.style.position = "absolute"
          lMenu.style.top = parseInt(findPosY(lThis)) + parseInt(lThis.offsetHeight);
          lMenu.style.left = parseInt(findPosX(lThis));
        }else if(pDir == 'BottomRight'){
          lMenu.style.position = "absolute"
          lMenu.style.top = parseInt(findPosY(lThis)) + parseInt(lThis.offsetHeight);
          lMenu.style.left = parseInt(findPosX(lThis)) - parseInt(lThis.offsetWidth);
        }else if(pDir == 'Set'){
          lMenu.style.position = "absolute"
          lMenu.style.top = parseInt(pY);
          lMenu.style.left = parseInt(pX);
        }else {
          lMenu.style.position = "absolute"
          lMenu.style.top = parseInt(findPosY(lThis));
          lMenu.style.left = parseInt(findPosX(lThis)) + parseInt(lThis.offsetWidth);
        }
        
      html_ShowElement(lMenu);
      dhtml_FixLeft(lThis,lMenu);
      htmldb_IE_Select_Item_Fix(true);
      g_Single_Menu_Count = 0;
      g_Single_Menu = lMenu;
      document.onclick = dhtml_DocMenuSingleCheck;
      return
}

function dhtml_FixLeft(pThis,pMenu){
     var l_Width;
     if(document.all){l_Width = document.body.clientWidth}
     else{l_Width = window.innerWidth}
        if(parseInt(l_Width) < parseInt(findPosX(pThis)) + parseInt(pThis.offsetWidth) + parseInt(pMenu.offsetWidth)){
          pMenu.style.position = "absolute"
          pMenu.style.left = (parseInt(findPosX(pThis)) - parseInt(pMenu.offsetWidth));
        }
    return
}

function htmldb_IE_Select_Item_Fix(pTest){
  /* only run in IE and only if there is a select in the page*/
  var lSel = document.getElementsByTagName('SELECT').length >= 1;
  if(document.all && pTest && lSel){
        if(pTest.firstChild && pTest.firstChild.nodeName != 'IFRAME'){
          pTest.innerHTML = '<iframe  src="'+htmldb_Img_Dir+'blank.html" width="'+pTest.offsetWidth+'" height="'+pTest.offsetHeight+'" style="z-index:-10;position: absolute;left: 0;top: 0;filter: progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);" scrolling="no" frameborder="0"></iframe>' + pTest.innerHTML;
        }
  } 
  return
}

/* this runs the the show hide with sideimages template*/
function app_AppMenuMultiOpenBottom(pThis,pThat,pSub){
      var lMenu = html_GetElement(pThat);
      if(pThis != gCurrentAppMenuImage){
        app_AppMenuMultiClose();
        var l_That = pThis.previousSibling.firstChild ; 
        pThis.className = "dhtmlMenuOn";
        dhtml_MenuOpen(l_That,pThat,false,'Bottom');
        gCurrentAppMenuImage = pThis;
      }else{
        dhtml_CloseAllSubMenus();
        app_AppMenuMultiClose();
      }
  return;
}

function app_AppMenuMultiOpenBottom2(pThis,pThat,pSub){
      var lMenu = html_GetElement(pThat);
      if(pThis != gCurrentAppMenuImage){
        app_AppMenuMultiClose();
        var l_That = pThis.parentNode; 
        pThis.className = "dhtmlMenuOn";
        dhtml_MenuOpen(l_That,pThat,false,'Bottom');
        gCurrentAppMenuImage = pThis;
      }else{
        dhtml_CloseAllSubMenus();
        app_AppMenuMultiClose();
      }
  return;
}

/* this runs the the show hide with sideimages template*/
function app_AppMenuMultiClose(){
  if(gCurrentAppMenu){
    var lMenu = html_GetElement(gCurrentAppMenu);
    gCurrentAppMenuImage.className = "dhtmlMenu";
    html_HideElement(lMenu);
    gCurrentAppMenu = false;
    gCurrentAppMenuImage = false;
  }
  return;
}
/*End DHTML Menus*/

function html_CleanRegionId(pRid){
	var l_PTest = pRid.indexOf('.');
	var l_CTest = pRid.indexOf(',');
	var l_Rid = pRid;
	if(l_PTest >= 0){
		l_Rid = l_Rid.substring(0,l_PTest)
	}else if (l_CTest >= 0){
		l_Rid = l_Rid.substring(0,l_CTest)}
	return l_Rid;
}




/* Begin PPR Reports */
function html_PPR_Report_Page (pThis,pRid,pURL,pHeader,pFooter){
	var l_pRid = html_CleanRegionId(pRid);
	document.body.style.cursor = 'wait';
    var l_URL = pURL;
    var start = l_URL.indexOf('?');
    l_URL = l_URL.substring(start + 1);
    l_URL = html_replace(l_URL,'pg_R_','FLOW_PPR_OUTPUT_'+l_pRid+'_pg_R_');
    l_URL = html_replace(l_URL,'fsp_sort_','FLOW_PPR_OUTPUT_'+l_pRid+'_fsp_sort_');
    var http = new htmldb_Get('report'+ l_pRid,null,null,null,null,'f',l_URL);
    http.get(null,'<htmldb:'+l_pRid+'>','</htmldb:'+l_pRid+'>');
    if(pHeader){html_GetElement('report'+ l_pRid).innerHTML =  pHeader + html_GetElement('report'+ l_pRid).innerHTML}
    if(pFooter){html_GetElement('report'+ l_pRid).innerHTML += pFooter;}
    document.body.style.cursor = '';
    init_htmlPPRReport(l_pRid);
    http = null;
    return;
}

/* inits ppr report by replacing href's with javascript call*/
function init_htmlPPRReport2(pId){
  var l_Table = html_GetElement('report'+pId);
  if(l_Table){
    var l_THS = l_Table.getElementsByTagName('TH');
    for(var i = 0;i<l_THS.length;i++){
    if(l_THS[i].getElementsByTagName('A')[0]){
      var oldHREF = l_THS[i].getElementsByTagName('A')[0].href;
      l_THS[i].getElementsByTagName('A')[0].href = 'javascript:html_PPR_Report_Page(this,\''+pId+'\',\''+oldHREF+'\');'
      }
    }
  }
  return;
}

/*this function needs to be called for a bug in ie*/
function init_htmlPPRReport(pId){
  if(document.all){
    var ie_HACK = 'init_htmlPPRReport2(\''+pId+'\')';setTimeout(ie_HACK,100);}
    else{init_htmlPPRReport2(pId);}
  return;
}


/*Given a region id*/
function PPR_Tabluar_Submit(pId,pFlowID,pPageId,pRequest,pInsertReturn,pReportId,pReplacementOveride){
 pThis = html_GetElement(pId);
 if(pInsertReturn){var get = new htmldb_Get(pId,pFlowID,pRequest,pPageId,null,'wwv_flow.accept');}
 else{var get = new htmldb_Get(null,pFlowID,pRequest,pPageId,null,'wwv_flow.accept');}
 var lItems = html_Return_Form_Items(pThis);
 for(var i=0;i<lItems.length;i++){
  if(lItems[i].type == 'checkbox'){
    if(lItems[i].checked == true){
      get.addParam(lItems[i].name,lItems[i].value);
     }
    }else{
      if(lItems[i].name && lItems[i].name != 'fcs'){
        get.addParam(lItems[i].name,lItems[i].value);
      }

    }  
 }
 var lSelects = html_Return_Form_Items(pThis,'SELECT');
 for(var i=0;i<lSelects.length;i++){
 get.addParam(lSelects[i].name,html_SelectValue(lSelects[i]))
 
 }
 var lTextarea= html_Return_Form_Items(pThis,'TEXTAREA');
 for(var i=0;i<lTextarea.length;i++){
         get.addParam(lTextarea[i].name,lTextarea[i].value);
 }

 if(pReplacementOveride){
  var q = get.get(null,'<htmldb:'+pReplacementOveride+'>','</htmldb:'+pReplacementOveride+'>');
 }else{
  var q = get.get(null,'<htmldb:PPR_'+pId+'>','</htmldb:PPR_'+pId+'>');
 }
 if(pReportId){init_htmlPPRReport(pReportId);}
 get = null;
 return q;
}

/* End PPR Reports */

/* Begin Smart Table Code */
  /* delete table row based off off element*/
function html_RemoveRow(pId){
 var l_Table = html_GetElement('htmldbAddRowTable');
 var l_Row = html_CascadeUpTill(pId,'TR');
 if(l_Table.childNodes.length >= 2 && l_Row){
  l_Table.removeChild(l_Row)
  l_Table.normalize();
 }
 return;
}

/* inits the Add Row Table */
function html_InitAddRowTable(){
  var l_Table = html_GetElement('htmldbAddRowTable');
  var l_Cell = l_Table.rows[0].cells[l_Table.rows[0].cells.length-1];
  l_Cell.innerHTML ="<br />"
  l_Cell.className = l_Table.rows[0].cells[l_Table.rows[0].cells.length-2].className;
  return;
}

function html_RowUp(pThis){
  var l_Row = html_CascadeUpTill(pThis,'TR');
  var l_Table = l_Row.parentNode;
  var l_RowPrev = l_Row.previousSibling;
	while(l_RowPrev != null){
	 if(l_RowPrev.nodeType == 1){break}
	 l_RowPrev = l_RowPrev.previousSibling;
	}
	if(l_RowPrev != null && l_RowPrev.firstChild != null && l_RowPrev.firstChild.nodeName != 'TH' && l_RowPrev.nodeName == 'TR'){
    oElement = l_Table.insertBefore(l_Row ,l_RowPrev);
  }else{
    oElement = l_Table.appendChild(l_Row);
  }
  return oElement;
 }
  
function html_RowDown(pThis){
  var l_Row = html_CascadeUpTill(pThis,'TR');
  var l_Table = l_Row.parentNode;
  var l_RowNext = l_Row.nextSibling;
	while(l_RowNext != null){
	 if(l_RowNext.nodeType == 1){break}
	 l_RowNext = l_RowNext.nextSibling;
	}
	if(l_RowNext != null && l_RowNext.nodeName == 'TR'){
    oElement = l_Table.insertBefore(l_Row ,l_RowNext.nextSibling);
  }else{
    oElement = l_Table.insertBefore(l_Row ,l_Table.getElementsByTagName('TR')[1]);
  }
  return oElement;
}
 /* End Smart Table Code */
  
 function dhtml_CloseDialog(pThis){
  html_enableBase();
  html_HideElement(html_CascadeUpTill(pThis,'TABLE'));
  toolTip_disable();
}

function html_processing(){
  var t = html_GetElement("htmldbWait");
   if (!t) {
    var l_newDiv = document.createElement('DIV');
    l_newDiv.className="htmldbProcessing";
    l_newDiv.style.zIndex=20000;
    l_newDiv.id = "htmldbDisablePage";
    l_newDiv.style.width = "100%";
    l_newDiv.style.height = "100%";
    l_newDiv.onclick = "return false;";
    l_newDiv.style.position="absolute";
    l_newDiv.style.top="0";
    l_newDiv.style.left="0";
    document.body.insertBefore(l_newDiv,document.body.firstChild);
  }
}
function html_enableBase(){
  var t = html_GetElement("htmldbDisablePage");
   if (t)
     t.parentNode.removeChild(t);
}
function html_disableBase(z,c){
  var t = html_GetElement("htmldbDisablePage");
   if (!t) {
    var l_newDiv = document.createElement('DIV');
    l_newDiv.className= c!= null ? c : "htmldbDisablePage";
    l_newDiv.style.zIndex=z;
    l_newDiv.id = "htmldbDisablePage";
    l_newDiv.style.width = "100%";
    l_newDiv.style.height = "100%";
    l_newDiv.onclick = "return false;";
    l_newDiv.style.position="absolute";
    l_newDiv.style.top="0";
    l_newDiv.style.left="0";
    document.body.insertBefore(l_newDiv,document.body.firstChild);
  }
}

function html_Centerme(id){
      var t = html_GetElement(id);
     if(document.all){
      l_Width = document.body.clientWidth;
      l_Height = document.body.clientHeigth;
     }
     else{
      l_Width = window.innerWidth;
      l_Height = window.innerHeight;
     }

      var tW=t.offsetWidth;
      var tH=t.offsetHeight;  
      t.style.top = '40%';
      t.style.left = '40%';
}

var gChangeCheck = null;
function htmldb_InitPrevNextChange(pThis){}
function htmldb_SetOC(pThis){}

/* tool tip section */
var tt_target;
function toolTip_init(){
  if ( document && document.body) {
        var tt_tipobj=html_GetElement("dhtmltooltip");
        if (tt_tipobj == null || typeof(tt_tipobj) != 'object' ){
              tt_tipobj = document.createElement('DIV');
              tt_tipobj.id="dhtmltooltip";
              tt_tipobj.className="htmldbToolTip";
              tt_tipobj.style.position = "absolute";
              tt_tipobj.style.border="1px solid black"; 
              tt_tipobj.style.padding="2px"; 
              tt_tipobj.style.backgroundColor=""; 
              tt_tipobj.style.visibility="hidden"; 
              tt_tipobj.style.zIndex=10000;
              document.body.appendChild(tt_tipobj);
        }
        var tt_pointerobj=html_GetElement("dhtmlpointer");
        if (tt_pointerobj == null ||  typeof(tt_pointerobj) != 'object' ) {
               tt_pointerobj = document.createElement('IMG');
               tt_pointerobj.id="dhtmlpointer";
               tt_pointerobj.src= htmldb_Img_Dir + "arrow2.gif";
               tt_pointerobj.style.position = "absolute";
               tt_pointerobj.style.zIndex=10001;
              document.body.appendChild(tt_pointerobj );   
        }
     return true;
    } else {
     return false;
    }
}

function toolTip_disable(){
    if ( toolTip_init() ) {
    var tt_tipobj=html_GetElement("dhtmltooltip");
    var tt_pointerobj=html_GetElement("dhtmlpointer");

    tt_target = null;
    tt_tipobj.style.visibility="hidden"
    tt_pointerobj.style.visibility="hidden"
    tt_tipobj.style.backgroundColor=''
    tt_tipobj.style.width=''
    tt_tipobj.innerHTML='';   
  }
}

function toolTip_enable(evt,obj,tip, width, color){
    var evt = (evt) ? evt : ((window.event) ? event : null);
    var target_x = evt.pageX ? evt.pageX : evt.clientX ;
    var target_y = evt.pageY ? evt.pageY : evt.clientY ;
    
    if ( toolTip_init() ) {
    var tt_tipobj=html_GetElement("dhtmltooltip");
    var tt_pointerobj=html_GetElement("dhtmlpointer");

    tt_target = obj;
    if (!tip) 
      tip = obj.getAttribute("htmldb:tip");      
    tt_tipobj.innerHTML=tip;
    if (typeof width!="undefined") 
         tt_tipobj.style.width=width+"px"      
    if (typeof color!="undefined" && color!="")  {
         tt_tipobj.style.backgroundColor=color
    } else {
        tt_tipobj.style.backgroundColor="lightyellow";
    }

    tt_pointerobj.style.left = ( 10 + target_x ) +"px";
    tt_pointerobj.style.top  = (15 + target_y ) +"px";   

    tt_tipobj.style.left = ( 7 + target_x ) +"px";
    tt_tipobj.style.top  = ( 28 + target_y ) +"px";   
     
    tt_tipobj.style.visibility="visible"
    tt_tipobj.style.zIndex=10000;
    tt_pointerobj.style.zIndex=10001;
    tt_pointerobj.style.visibility="visible";
    
    try {
        obj.addEventListener("mouseout", toolTip_disable, false);
     } catch(E) {
      obj.attachEvent('onmouseout', toolTip_disable);
     }
   }
    return false;
}

function dhtml_ShuttleValue(pThis,pThat){
 var l_SelectArray = new Array();
 var l_From = html_GetElement(pThis);
 var l_To = html_GetElement(pThat); 
 l_SelectArray = getSelected(l_From.options);
 for (var i=0;i<l_SelectArray.length;i++){
  l_To.appendChild(l_SelectArray[i])
 }
}

   function getSelected(opt) {
      var selected = new Array();
      var index = 0;
      for (var intLoop=0; intLoop < opt.length; intLoop++) {
         if (opt[intLoop].selected) {
            index = selected.length;
            selected[index] = opt[intLoop];
         }
      }
      return selected;
   }
   
function retFalse() {
  return false;
}


function dhtml_ShuttleObject(pThis,pThat){
 this.Select1 = html_GetElement(pThis);
 this.Select2 = html_GetElement(pThat);
 this.Select1ArrayInit = this.Select1.cloneNode(true);
 this.Select2ArrayInit = this.Select2.cloneNode(true);
 this.Op1Init = new Array();
 this.Op2Init = new Array(); 
 this.Op1Init = this.Select1ArrayInit.options;
 this.Op2Init = this.Select2ArrayInit.options;
 this.move = move;
 this.moveall = moveall;
 this.remove = remove;
 this.removeall = removeall;
 this.reset = reset;
 return;

 function move(){
 var l_SelectArray = getSelected(this.Select1.options);
 var Array_Length = l_SelectArray.length;
 for (var i=0;i<Array_Length;i++){
	 this.Select2.appendChild(l_SelectArray[i]);
 }
 }
 
 function remove(){
 var l_SelectArray = getSelected(this.Select2.options);
 var Array_Length = l_SelectArray.length;
 for (var i=0;i<Array_Length;i++){
  this.Select1.appendChild(l_SelectArray[i])
 }
 }
 
 function reset(){
  this.Select1.options.length = 0;
  this.Select2.options.length = 0;
  var L_Count1 = this.Op1Init.length;
  for(var i=0;i<L_Count1;i++){
	  this.Select1.options[i]= new Option(this.Op1Init[i].text,this.Op1Init[i].value)	  
  }
  var L_Count2 = this.Op2Init.length;
  for(var i=0;i<L_Count2;i++){
	  this.Select2.options[i]= new Option(this.Op2Init[i].text,this.Op2Init[i].value)	  
  }
  
 }

 function moveall(){}
 function removeall(){}
 
 
}


gReturn = 'F4000_P4017_SOURCE_CHART'

function ChartSqlReturn(pThis){
opener.html_GetElement(gReturn).value = html_GetElement('P4000_CHART_SQL').value;
window.close();
}


function plsql_in_string(pThis,pArray){
 var l_Return = false;
 var l = pArray.length;
 for(var i=0;i<l;i++){
  if(pThis == pArray[i]){l_Return = true}
 }
 return l_Return;
}

function plsql_in(pThis,pArray){
 var l_Return = false;
 var l = pArray.length;
 for(var i=0;i<l;i++){
  if(html_GetElement(pThis) == html_GetElement(pArray[i])){l_Return = true}
 }
 return l_Return;
}

function isEmpty(pThis) {
	var re = /^\s{1,}$/g; //match any white space including space, tab, form-feed, etc.
	if ((html_GetElement(pThis).value.length==0) || (html_GetElement(pThis).value==null) || ((html_GetElement(pThis).value.search(re)) > -1)) {
		return true;
	}else{
		return false;
	}
}


