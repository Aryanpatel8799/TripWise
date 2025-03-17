/*
  str should be in the form of a valid f?p= syntax
*/

function htmldb_Get(obj,flow,req,page,instance,proc,queryString) {
  //
  // setup variables
  //
  this.obj      = html_GetElement(obj);                   // object to put in the partial page
  this.proc     = proc != null ? proc  : 'wwv_flow.show'; // proc to call 
  this.flow     = flow != null ? flow  : '4500';          // flowid
  this.request  = req  != null ? req  : '';               // request 
  this.page     = page; // page
  this.params   = '';   // holder for params
  this.response = '';   // holder for the response
  this.base     = null; // holder fot the base url
  this.queryString = queryString!= null ? queryString : null ; // holder for passing in f? syntax
  this.syncMode     = false;
  //
  // declare methods
  //
  
  this.addParam     = htmldb_Get_addParam;
  this.add          = htmldb_Get_addItem;
  this.getPartial   = htmldb_Get_trimPartialPage;
  this.getFull      = htmldb_Get_fullReturn;
  this.get          = htmldb_Get_getData;
  this.url          = htmldb_Get_getUrl;
  this.escape       = htmldb_Get_escape;
  this.clear        = htmldb_Get_clear;
  this.sync         = htmldb_Get_sync;
  this.setNode      = setNode;
  this.replaceNode  = replaceNode
  //
  // setup the base url
  //
   var u = window.location.href.indexOf("?") > 0 ?
             window.location.href.substring(0,window.location.href.indexOf("?"))
             : window.location.href;
   this.base = u.substring(0,u.lastIndexOf("/"));
   
   if ( this.proc == null || this.proc == "" ) 
    	   this.proc = u.substring(u.lastIndexOf("/")+1);
    	   
   this.base = this.base +"/" + this.proc;
    	
    	
  //
  // grab the instance form the page form 	
  //
  if ( instance == null || instance == "" ) {
    var pageInstance = document.getElementById("pInstance");
      if ( typeof(pageInstance) == 'object' ) {
        this.instance = pageInstance.value;
      }
  } else {
    this.instance = instance;
  }

  
  //
  // finish setiing up the base url and params
  //
  if ( ! queryString ) {
      this.addParam('p_request',     this.request) ;
      this.addParam('p_instance',    this.instance);
      this.addParam('p_flow_id',     this.flow);
      this.addParam('p_flow_step_id',this.page);
  }

  function setNode(id) {
    this.node = html_GetElement(id);
  }
  function replaceNode(newNode){
      var i=0;
      for(i=this.node.childNodes.length-1;i>=0;i--){
        this.node.removeChild(this.node.childNodes[i]);
      }
      this.node.appendChild(newNode);
  }
}
function htmldb_Get_sync(s){
  this.syncMode=s;
}

function htmldb_Get_clear(val){
  this.addParam('p_clear_cache',val);
}
 
//
// return the queryString
//
function htmldb_Get_getUrl(){
    return this.queryString == null ? this.base +'?'+ this.params : this.queryString;
}

function htmldb_Get_escape(val){
    // force to be a string
     val = val + "";
     val = val.replace(/\%/g, "%25");
     val = val.replace(/\+/g, "%2B");
     val = val.replace(/\ /g, "%20");
     val = val.replace(/\./g, "%2E");
     val = val.replace(/\*/g, "%2A");
     val = val.replace(/\?/g, "%3F");
     val = val.replace(/\\/g, "%5C");
     val = val.replace(/\//g, "%2F");
     val = val.replace(/\>/g, "%3E");
     val = val.replace(/\</g, "%3C");
     val = val.replace(/\{/g, "%7B");
     val = val.replace(/\}/g, "%7D");
     val = val.replace(/\~/g, "%7E");
     val = val.replace(/\[/g, "%5B");
     val = val.replace(/\]/g, "%5D");
     val = val.replace(/\`/g, "%60");
     val = val.replace(/\;/g, "%3B");
     val = val.replace(/\?/g, "%3F");
     val = val.replace(/\@/g, "%40");
     val = val.replace(/\&/g, "%26");
     val = val.replace(/\#/g, "%23");
     val = val.replace(/\|/g, "%7C");
     val = val.replace(/\^/g, "%5E");
     val = val.replace(/\:/g, "%3A");
     val = val.replace(/\=/g, "%3D");
     val = val.replace(/\$/g, "%24");
     //val = val.replace(/\"/g, "%22");
    return val;
}

//
// Simple function to add name/value pairs to the url
//
function htmldb_Get_addParam(name,val){
	if ( this.params == '' ) 
     this.params =  name + '='+ ( val != null ? this.escape(val)  : '' );
  else
     //this.params = this.params + '&'+ name + '='+ ( val != null ? val  : '' );
     this.params = this.params + '&'+ name + '='+ ( val != null ? this.escape(val)  : '' );
     return;
}


//
// Simple function to add name/value pairs to the url
//
function htmldb_Get_addItem(name,value){
  this.addParam('p_arg_names',name);
  this.addParam('p_arg_values',value);  
}

//
// funtion strips out the PPR sections and returns that
//
function htmldb_Get_trimPartialPage(startTag,endTag,obj) {
   setTimeout(html_processing,1);
   if (obj) { this.obj = html_GetElement(obj);}
   if (!startTag){startTag = '<!--START-->'};  
   if (!endTag){endTag  = '<!--END-->'};
   var start = this.response.indexOf(startTag);
   var part;
   if ( start >0 ) {
       this.response  = this.response.substring(start+startTag.length);
       var end   = this.response.indexOf(endTag); 
       this.response  = this.response.substring(0,end);
   }         
       if ( this.obj ) {
          if(this.obj.nodeName == 'INPUT'){
            if(document.all){
              gResult = this.response;
              gNode = this.obj;
              var ie_HACK = 'htmldb_get_WriteResult()';
              setTimeout(ie_HACK,100);
            }else{
              this.obj.value = this.response;
            }
          }else{
            if(document.all){
              gResult = this.response;
              gNode = this.obj;
              var ie_HACK = 'htmldb_get_WriteResult()';
              setTimeout(ie_HACK,100);
            }else{
              this.obj.innerHTML = this.response;
            }
          }
       }
   //window.status = 'Done'
   setTimeout(html_Doneprocessing,1);
   return this.response;
}


var gResult = null;
var gNode = null
function htmldb_get_WriteResult(){
    if(gNode && ( gNode.nodeName == 'INPUT' || gNode.nodeName == 'TEXTAREA')){
    gNode.value = gResult;
    }else{
    gNode.innerHTML = gResult;
    }
    gResult = null;
    gNode = null;
  return;
}

//
// function return the full response
//
function htmldb_Get_fullReturn(obj) {
   setTimeout(html_processing,1);
   if (obj) { this.obj = html_GetElement(obj);}
   
       if ( this.obj ) {
          if(this.obj.nodeName == 'INPUT'){
            this.obj.value = this.response;
          }else{
            if(document.all){
              gResult = this.response;
              gNode = this.obj;
              var ie_HACK = 'htmldb_get_WriteResult()';
              setTimeout(ie_HACK,10);
            }else{
              this.obj.innerHTML = this.response;
            }
          }
       }
       setTimeout(html_Doneprocessing,1);
  return this.response;
}

//
// Perform the actual get from the server
//
function htmldb_Get_getData(mode,startTag,endTag){
   html_processing();
   var p;
   try {
      p = new XMLHttpRequest();
    } catch (e) {
      p = new ActiveXObject("Msxml2.XMLHTTP");
    }
    try {
    	var startTime = new Date();
   	    p.open("POST", this.base, this.syncMode);   	    
    	p.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        p.send(this.queryString == null ? this.params : this.queryString );   
        //html_Doneprocessing();
        //cDebug(this.queryString == null ? this.params : this.queryString)
        //cDebug("Request Time:"+(new Date() - startTime));
        this.response = p.responseText;
        if ( this.node ) 
         this.replaceNode(p.responseXML);
        if ( mode == null || mode =='PPR' ) {
            return this.getPartial(startTag,endTag);
        } if ( mode == "XML" ) {
            setTimeout(html_Doneprocessing,1);
            return p.responseXML;
        } else {
            return this.getFull();
        }
            
    } catch (e) {
       //cDebug(e.message + '\n' + p.statusText + '\n\n : Data Load Error');
       setTimeout(html_Doneprocessing,1);
       return;
    }
 }
 
function html_Doneprocessing(){
//return;
  //html_enableBase();
  document.body.style.cursor="default";
  //var t = html_GetElement("htmldbWait");
   //if (t)
    // t.parentNode.removeChild(t);

}

function html_processing(){
//return;
  //var t = html_GetElement("htmldbWait");
   //if (!t) {
    //var l_newDiv = document.createElement('DIV');
    //l_newDiv.innerHTML='<table style="position:absolute;background-color:#EEEEEE;border:#000000 solid 1px;padding:0px;text-align:center;font-size:12px;color:#000000;" summary="" cellpadding="0" cellspacing="0" border="0" id="#REGION_ID#"> <tr> <td class="htmldbWizardHeader"></td><td class="htmldbWizardHeader" align="right"></td></tr> <tr><td colspan="2" class="htmldbWizardBody">(T)Processing....</td></tr> <tr><td colspan="2" align="right"></td></tr></table>';
    //l_newDiv.style.zIndex=20000;
    //l_newDiv.id = "htmldbWait";
    //l_newDiv.style.position="absolute";
    //document.body.insertBefore(l_newDiv,document.body.firstChild);
    document.body.style.cursor="wait";
    //html_Centerme(l_newDiv);
    //html_disableBase(19999,"");
  //}
}


 
 
 
 /* PDF OUTPUT */
/*Gets PDF src XML */



function htmldb_ExternalPost(pThis,pRegion,pPostUrl){
   var pURL = 'f?p='+html_GetElement('pFlowId').value+':'+html_GetElement('pFlowStepId').value+':'+html_GetElement('pInstance').value+':FLOW_FOP_OUTPUT_R'+pRegion
   document.body.innerHTML = document.body.innerHTML + '<div style="display:none;" id="dbaseSecondForm"><form id="xmlFormPost" action="' + pPostUrl + '?ie=.pdf" method="post" target="pdf"><textarea name="vXML" id="vXML" style="width:500px;height:500px;"></textarea></form></div>';
   var l_El = html_GetElement('vXML');
   var get = new htmldb_Get(l_El,null,null,null,null,'f',pURL.substring(2));
   get.get();
   get = null;
   setTimeout('html_GetElement("xmlFormPost").submit()',10);
  return;
}
