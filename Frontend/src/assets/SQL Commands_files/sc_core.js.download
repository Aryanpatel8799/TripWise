// SC uses pages 
// 139  Describe
// 1200 Query
// 1201 History
// 1202 Explain
// 1203 Saved Sql
// 1003 Main Page
var g_dObj = '';
var gBindVals = '';
var mill = 0;
var gTid = '';
var gResults = '';
//var gFind = '';
var gNoQueue = '';
var gNoJobs = '';
var g_Running = '';

function sc_cascadeUpUntil(n,tag){
 var l_find = true;
 var htmlEl = n;
      if(htmlEl){
       while(l_find){
         htmlEl = htmlEl.parentNode;            
       if ( ! htmlEl ) 
           return false;         
         if ( htmlEl && htmlEl.nodeName == tag  ) {
           l_find = false;
         }
      } 
    }
  return htmlEl;
}  

function sc_cascadeUpClose(n,tag){
 var l_find = true;
 var htmlEl = n;
      if(htmlEl){
       while(l_find){           
        htmlEl = htmlEl.parentNode;
       if ( ! htmlEl ) 
           return false;
         if ( ( tag=='ANY' || htmlEl.nodeName == tag ) 
              && htmlEl.closable == '1' ) {
           l_find = false;
         } 
      } 
    }
  return htmlEl;
}  

function trimAll( strValue ) {
 var objRegExp = /^(\s*)$/;
    //check for all spaces
    if(objRegExp.test(strValue)) {
       strValue = strValue.replace(objRegExp, '');
       if( strValue.length == 0)
          objRegExp = '';
          return strValue;
    }
   //check for leading & trailing spaces
   objRegExp = /^(\s*) ([\W\w]*)(\b\s*$)/;
   if(objRegExp.test(strValue)) {
       //remove leading and trailing whitespace characters
       strValue = strValue.replace(objRegExp, '$2');
    }
   //check for leading & trailing spaces
   objRegExp = /^(\n*)/;
   if(objRegExp.test(strValue)) {
       //remove leading and trailing whitespace characters
       strValue = strValue.replace(objRegExp, '');
    }
  objRegExp = '';
  return strValue;
}

function RemoveChar(str) {
 charToRemove = '"';
 regExp = new RegExp("["+charToRemove+"]","g");
 return str.replace(regExp,"");
}

function RemoveSemiColon(str) {
 charToRemove = ';';
 regExp = new RegExp("["+charToRemove+"]","g");
 return str.replace(regExp,"");
}

// saves SQL to session state
function sc_postQUERY() {
    // set P1003_SQL_COMMAND2 = P1003_SQL_COMMAND2.Selected text
    sc_getSel();
    var sql = html_GetElement("P1003_SQL_COMMAND1").value;
    var sel = html_GetElement("P1003_SQL_COMMAND2").value;  
    var tSql = trimAll(sel);
    var schema = html_GetElement("P1003_SCHEMA").value;
    var get = new htmldb_Get(null,4500,null,1200);
     get.add('P1003_SQL_COMMAND1',sql);    
     get.add('P1003_SQL_COMMAND2',tSql);
     get.add('P1003_SCHEMA',schema);
    // post values to session
    get.get();  
    // clear all vars
    get = null;
    sql = null;
    sel = null;
    tSql = null;
}

function sc_ClearMessageArea(){
	html_RemoveAllChildren('htmldbMessageHolder');
	}

function sc_EncodedLength(s) {
    var l = 0;
    var m = '$-_+!*\'(),';
    if (s.length <= 3000)
       return 3000;
    for (var i=0; i < s.length; ++i)
    {
        // no use wasting users time if string is to long 
        // why compute the whole length?
        if (l > 32000)
          return l;
        if (s.charCodeAt(i) <= 127 ) {
            if ( s.charCodeAt(i) == 10 ) // test for '/n' counts as 1
                l += 1;
            else if (m.indexOf(s.charAt(i)) > -1 )
                l += 1;
            else if ( s.charAt(i).search('[0-9a-zA-Z]') >= 0)
                l += 1;
            else
                l += 3;
        }
        else if (s.charCodeAt(i) <= 2047) { l += 6; }
        else { l += 9; }
    }
    return l;
}

function sc_getResults(sessionId){  
  // return if no sql to run
  if (html_GetElement("P1003_SQL_COMMAND1").value == "")
    return false;
  sc_getSel();
  // set P1003_SQL_COMMAND2 = P1003_SQL_COMMAND2.Selected text
  var sql = html_GetElement("P1003_SQL_COMMAND2").value;
  var tSql = trimAll(sql);
    var l = sc_EncodedLength(tSql);
  if (l > 32000) {
    // alert('URL Encoded SQL length '+l+' exceeds allowed 32k limit');
     alert('URL Encoded SQL length exceeds allowed 32k limit');
     return;
  }

  // test for desc stmt
  if ( tSql.substring(0,4).toUpperCase() == 'DESC' ) {
    html_TabClick(html_GetElement('describe_tab'),'describeHolder'); 
    var dSql = trimAll(tSql.substring(tSql.indexOf(' ')));
    var dSql = RemoveSemiColon(dSql);
    if (dSql != '' ) {
      g_dObj = dSql;
    }
    sc_getDesc();
    tSql = null;
    sql = null;
    dSql = null;
    html_GetElement("resultsHolder").innerHTML = '';
    return
  }
  // end describe test
  sc_clearResults();
  // check for bind values   
  var get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=21627908860597925',0);
   get.add('P1003_SQL_COMMAND2',tSql);
  gResults = get.get();
  get = null;
  // end check for binds
  if (gResults == '') { 
    // no binds process sql
    gBindVals = '';
    var pCall = 'sc_DisplayRes()';
    setTimeout(pCall,1);
  } else {
    // binds exist get values via popup
    gResults = null;
    var url = 'f?p=4500:138:'+sessionId+':::';
    popUpNamed(url,'bindLov');
  }
}
    
function sc_getDesc(dFetch){
    var lObj = '';
    var lUser = '';
    var Upperobj = '';
    var holder = '';
    holder = html_GetElement("describeHolder");  
    schema = html_GetElement("P1003_SCHEMA").value;
    if (g_dObj && g_dObj.indexOf('"') == -1 ) {
      Upperobj = trimAll(g_dObj.toUpperCase());
    } else {
      Upperobj = trimAll(RemoveChar(g_dObj));
    }
    if (Upperobj.indexOf('.') > 0) {
      lUser = Upperobj.substring(0,Upperobj.indexOf('.'));
      lObj = Upperobj.substring(Upperobj.indexOf('.')+1);
      lAct = 'HAVE';
    } else {
      lObj = Upperobj;
      lUser = schema;
      lAct = 'GET';
    }
    var get = new htmldb_Get(null,4500,null,139);        
     get.add('P1003_SCHEMA',schema);
     get.add('P139_OBJECT',lObj);
     get.add('P139_OWNER',lUser);
     get.add('P139_ACTION',lAct);
    gResults = get.get(null,'<htmldb:BOX_BODY>','</htmldb:BOX_BODY>');
    get = null;
    var holder = html_GetElement("describeHolder"); 
    holder.innerHTML = gResults;
    html_GetElement("P1003_SQL_COMMAND1").focus();
    cDebug(gResults)
    gResults = null;
    var obj = null;
    var Upperobj = null;
    var holder = null;
    var sql = null;
    var tSql = null;
}

function sc_postBind(bindVals){
    opener.gBindVals = bindVals;
    opener.sc_DisplayRes();
    close();
}

// used to generate sql when clicking on links in desc tab
function sc_getSQL(objName){
    var l_owner = '';
    var l_pack  = '';
    var l_proc  = '';
    var foo = objName.split('.');
    if (foo.length == 1) {
      l_owner = foo[0];
    } else if (foo.length == 2) {
      l_owner = foo[0];
      l_pack  = foo[1];
    } else if (foo.length == 3) {      
      l_owner = foo[0];
      l_pack  = foo[1];
      l_proc  = foo[2];
    }
    var get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=22896611795429544',0);
    if (l_owner != '' ) {
        get.add('P139_OWNER',l_owner);
    }
    if (l_proc != '') {
        get.add('P139_OBJECT',l_pack+'.'+l_proc);
    } else {
        get.add('P139_OBJECT',l_pack);
    }        
    gResults = get.get();
    ret_Column(trimAll(gResults));
    get = null;
    gResults = null;
    l_owner = null;
    l_pack  = null;
    l_proc  = null;
    foo = null;
}

function sc_DisplayRes() {
    var sql = html_GetElement("P1003_SQL_COMMAND2").value;
    var rows = html_GetElement("P1003_ROWS").value;
    var tSql = trimAll(sql);
    var schema = html_GetElement("P1003_SCHEMA").value;
    var aCommit = 'Y';
    var t_id = '';
    var dResult = '';
    var dDbms = '';
    var holder = html_GetElement("resultsHolder"); 
    var results = '';
    if (html_GetElement("P1003_AUTOCOMMIT_0") && html_GetElement("P1003_AUTOCOMMIT_0").checked == false) {
      aCommit = 'N';
      var get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=251183224917806135',0);
       get.add('P1003_SCHEMA',schema);
      var jCount = get.get();
      if (jCount <= 0) {
        var pMessage = '<div class="htmldbNotification"><ul><li>';
        pMessage = pMessage+gNoJobs;
        pMessage = pMessage+'</li></ul></div>';
        html_GetElement('htmldbMessageHolder').innerHTML = pMessage;   
        holder.innerHTML = ''; 
        return;
      }
    } else {
      aCommit = 'Y';
    }
    var get = new htmldb_Get(null,4500,null,1200);       
     get.add('P1003_SQL_COMMAND2',tSql);
     get.add('P1003_AUTOCOMMIT',aCommit);
     get.add('P1003_SCHEMA',schema);
     get.add('P1003_ROWS',rows);
    if (gBindVals != '') 
      get.add('P1200_BIND_VALS',gBindVals);
    results = get.get(null,'<htmldb:BOX_BODY>','</htmldb:BOX_BODY>'); 
    get = null;
    if (results.indexOf('HTMLDB:RUNNING') > -1 ) {
        if (results.indexOf('HTMLDB:RUNNINGSQL') > -1) 
          gTid = sc_sendSql('SQL');
          var foo = gTid;
        if (results.indexOf('HTMLDB:RUNNINGPLSQL') > -1) 
          gTid = sc_sendSql('PLSQL');
      holder.innerHTML = results;
      results = null;
      var sqlHolder = html_GetElement("dSQLResult");
      var pipeHolder = html_GetElement("DBMS_OUTPUT_DIV");
      dResult = sc_readOut(gTid);
      if (dResult.indexOf('HTMLDB:NONE') > -1 ) {
        sqlHolder.innerHTML = sqlHolder.innerHTML+'.';
        setTimeout("sc_DisplayRes2()",1000);
        return false;
      } else {
        sqlHolder.innerHTML = dResult;
        dDbms = sc_readDbms(gTid);
        pipeHolder.innerHTML = dDbms;
        if (dDbms.indexOf('HTMLDB:NONE') == -1 ) {
          html_GetElement('R137341724550811368').id = html_GetElement('R137341724550811368').id + '_show';
        }
      }
    } else {
      holder.innerHTML = results;
    }
    html_GetElement('P1003_SQL_COMMAND1').focus();
    sql = null;
    rows = null;
    tSql = null;
    schema = null;
    aCommit = null;
    t_id = null;
    dResult = null;
    dDbms = null;
    holder = null;
    sqlHolder = null;
    pipeHolder = null;
    results = null;
    gResults = null;
}

// this will only ever be called from sc_DisplayRes()
function sc_DisplayRes2() {
      var sqlHolder = html_GetElement("dSQLResult");
      var pipeHolder = html_GetElement("DBMS_OUTPUT_DIV");
      var dResult = '';
      var dDbms = '';
      sqlHolder.innerHTML = sqlHolder.innerHTML+'.';

      dResult = sc_readOut(gTid);
      if (dResult.indexOf('HTMLDB:NONE') > -1 ) {
        setTimeout("sc_DisplayRes2()",1000);
        return false;
      } else {
        sqlHolder.innerHTML = dResult;
        dDbms = sc_readDbms(gTid);
        pipeHolder.innerHTML = dDbms;
        if (dDbms.indexOf('HTMLDB:NONE') == -1 ) {
          html_GetElement('R137341724550811368').id = html_GetElement('R137341724550811368').id + '_show';
        }
      }
    html_GetElement("P1003_SQL_COMMAND1").focus();
    sqlHolder = null;
    pipeHolder = null;
    dResult = null;
    dDbms = null;
}

function sc_DisplayHist(pReset) {
  var holder = html_GetElement("historyHolder");
  var fnd = '';
  var lURL = '';
  var get = '';
  
  if (html_GetElement("P1201_FIND"))
    fnd = html_GetElement("P1201_FIND").value;
  if(pReset){
    lURL = 'f?p=4500:1201:'+html_GetElement('pInstance').value+'::NO:RP:P1201_FIND:'+fnd;
    get = new htmldb_Get(null,4500,null,1201,null,'f',lURL.substring(2));
  } else {
    get = new htmldb_Get(null,4500,null,1201);
  }
  get.add('P1201_FIND',fnd);
  gResults = get.get(null,'<htmldb:BOX_BODY>','</htmldb:BOX_BODY>');   
  holder.innerHTML = gResults;
  html_GetElement("P1003_SQL_COMMAND1").focus(); 
  get = null;
  gResults = null;
  holder = null;
  fnd = null;
  lURL = null;
  init_htmlPPRReport('R5983109938894128');
}
 
function ret_Column(colVal) {
    html_ReturnToTextSelection(colVal,'P1003_SQL_COMMAND1');
}    

function sc_getPlan(){
    var results = '';
    sc_getSel();
    var holder = html_GetElement("explainHolder");  
    var sql = html_GetElement("P1003_SQL_COMMAND2").value;
    var tSql = trimAll(sql);
    var schema = html_GetElement("P1003_SCHEMA").value;
    var get = new htmldb_Get(null,4500,null,1202);        
     get.add('P1003_SQL_COMMAND2',tSql);
     get.add('P1003_SCHEMA',schema);
     //get.sync(true);
    results = get.get(null,'<htmldb:BOX_BODY>','</htmldb:BOX_BODY>');
    holder.innerHTML = results;      
    html_GetElement("P1003_SQL_COMMAND1").focus();
    get = null;
    results = null;
    holder = null;
    sql = null;
    tSql = null;
    schema = null;
}

// Used for getting SQL command from selection
function sc_getSel() { 
 if (document.selection) {
   //IE support for inserting HTML into textarea
   var sel = document.selection;
   var rng = sel.createRange();
   var seltxt = trimAll(rng.text);
   if (rng.text == null || rng.text == "") {
     html_GetElement('P1003_SQL_COMMAND2').value = html_GetElement('P1003_SQL_COMMAND1').value; 
   } else {
     html_GetElement('P1003_SQL_COMMAND2').value = seltxt;
   }
 } else  {
  // Mozilla/Netscape support for selecting textarea
  cmd = html_GetElement('P1003_SQL_COMMAND1');
  start = cmd.selectionStart;
  end = cmd.selectionEnd;   
  sel = (cmd.value).substring(start, end);  
  if (sel == null || sel == "" ) {
    html_GetElement('P1003_SQL_COMMAND2').value = html_GetElement('P1003_SQL_COMMAND1').value;
  }  else {
    html_GetElement('P1003_SQL_COMMAND2').value = sel;      
  }
 }
}

function sc_quickKeys(evt){ 
    var e = evt ? evt : window.event;
    var target = e.target ? e.target : e.srcElement;
    if (document.all) {  
         if (event.keyCode == 10 && event.ctrlKey == true){
             html_TabClick(html_GetElement('result_tab'),'resultsHolder');
             var pInstance = html_GetElement("pInstance").value;
             //sc_getResults(pInstance);
             var pCall = "sc_getResults('"+pInstance+"')";
             setTimeout(pCall,.1);
             return false;
         }
         if (event.keyCode == 10 && target.id != 'P1003_SQL_COMMAND1') 
            return false;
     }else{
         if (e.keyCode == 13 && e.ctrlKey == true){
             html_TabClick(html_GetElement('result_tab'),'resultsHolder');
             var pInstance = html_GetElement("pInstance").value;
             var pCall = "sc_getResults('"+pInstance+"')";
             setTimeout(pCall,.1);
             return false;
         }
         if (e.keyCode == 13 && target.id != 'P1003_SQL_COMMAND1') 
            return false;
     }
     return;
}

function sc_PageInit(){
  db_Resize();
  window.onresize = function(){db_Resize()};
  sc_initSlide();
  var cFlag = html_GetElement("P1003_AUTOCOMMIT_0").checked;
   if (!cFlag) 
    sc_createJob();
  cFlag = null;  
  html_GetElement("P1003_SQL_COMMAND1").focus();
  get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=251509908846066406',0);
  get.add('SYSTEM_MESSAGE','NO_JOB_QUEUE_PROCESSES');
  gNoQueue = get.get();
  get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=251509908846066406',0);
  get.add('SYSTEM_MESSAGE','NO_AVAIL_JOBS');
  gNoJobs = get.get();
  get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=251509908846066406',0);
  get.add('SYSTEM_MESSAGE','SC_SQL_RUNNING');
  g_Running = get.get();
}

function sc_callResultPopup(sessionId, resultId) {
  var url = 'f?p=4500:1223:' + sessionId + ':::1223:P1223_ID:' + resultId;
  popupURL (url);
}


function sc_returnSQL(){
   var ret = html_GetElement("P1003_RETURN_INTO").value;
    sc_getSel();
    opener.html_GetElement(ret).value = html_GetElement("P1003_SQL_COMMAND2").value;
   ret = null;
   window.close();
}

function sc_toggleJob(obj) {
    html_GetElement("P1003_SQL_COMMAND1").focus();
    if (obj.checked) {
        sc_removeJob();
    } else {
        sc_createJob();
    }
}

function sc_createJob() {
    var pMessage = '';
    var get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=251183224917806135',0);
     get.add('P1003_SCHEMA',schema);
    var jCount = get.get();
    if (jCount <= 0) {
      pMessage = '<div class="htmldbNotification"><ul><li>';
      pMessage = pMessage+gNoQueue;
      pMessage = pMessage+'</li></ul></div>';
      html_GetElement('htmldbMessageHolder').innerHTML = pMessage;    
      return;
    }      
    get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=251183224917806135',0);
    get.add('P1003_SCHEMA',schema);
    jCount = get.get();
    if (jCount > 0) {
      var schema = html_GetElement('P1003_SCHEMA').value;
      get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=136604317027747819',0);
      get.add('P1003_SCHEMA',schema);
      gResults = get.get();
      get = null;
      schema = null;
      gResults = null;
   } else {
      pMessage = '<div class="htmldbNotification"><ul><li>';
      pMessage = pMessage+gNoJobs;
      pMessage = pMessage+'</li></ul></div>';
      html_GetElement('htmldbMessageHolder').innerHTML = pMessage;    
   }
}    

function sc_removeJob() {
    var get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=136605514734756665',0);
    gResults = get.get();
    get = null;
    gResults = null;
	sc_ClearMessageArea()
}    

function sc_readOut(pTid) {
    var get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=137030824141880927',0);
     get.add('P1200_STMT',pTid);
    gResults = get.get();
    get = null;
    return gResults;
}    

function sc_readDbms(pTid) {
    var get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=140873708217846868',0);
     get.add('P1200_STMT',pTid);
    gResults = get.get();
    get = null;
    return gResults;
}    

function sc_sendSql(pType) {
    var sql = html_GetElement("P1003_SQL_COMMAND2").value;
    var rows = html_GetElement("P1003_ROWS").value;
    var tSql = trimAll(sql);
    var schema = html_GetElement("P1003_SCHEMA").value;
    var get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=141051327945527301',0);
     get.add('P1003_SQL_COMMAND2',tSql);
     get.add('P1003_AUTOCOMMIT','N');
     get.add('P1003_SCHEMA',schema);
     get.add('P1003_ROWS',rows);
     get.add('P1200_TYPE',pType);
     if (gBindVals != '') 
       get.add('P1200_BIND_VALS',gBindVals);
    gResults = get.get();
    sql = null;
    rows = null;
    tSql = null;
    schema = null;
    get = null;
    return parseInt(gResults);
}    


function sc_CancelSave(){
	html_RemoveAllChildren('htmldbMessageHolder');
	sc_close('saveDialog');
	}




function sc_popup(id){
	var t = sc_cascadeUpUntil(html_GetElement(id),'TABLE');
    t.closable='1';
    t.movable  = '1';
    html_ShowElement(t);	
    sc_Centerme(t);
    t = null;
    if(id=='saveDialog'){html_GetElement('P1003_SAVE_NAME').focus();}
}

function sc_Centerme(id){
	  html_Centerme(id)
}

function sc_close(id){
  var t = sc_cascadeUpClose(html_GetElement(id),'TABLE');
  html_HideElement(t);
  t = null;
  html_enableBase();
}

function sc_postHistory(historyId,qSchema){
  html_GetElement("P1003_SAVE_NAME").value = '';
  html_GetElement("P1003_SAVE_DESC").value = '';
  html_GetElement("P1003_QUERY_ID").value = '';
  html_GetElement("P1003_SCHEMA").value = qSchema;
  var geter = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=6231903825594156',0);  
    geter.add('P1201_HISTORY_ID',historyId);
  var sql = geter.get('FULL');  
  var e2 = html_GetElement('P1003_SQL_COMMAND1');
  e2.value = sql;
  sql = null;
  e2.focus();
  geter = null;
  return;  
}

function sc_postSavedSQL(qId,qTitle,qDesc,qType, qSchema){  
  if (qType == 'SC') {
    if (qDesc == '-')
      qDesc = '';
    html_GetElement("P1003_SAVE_NAME").value = qTitle;
    html_GetElement("P1003_SAVE_DESC").value = qDesc;
    html_GetElement("P1003_QUERY_ID").value = qId;
    html_GetElement("P1003_SCHEMA").value = qSchema;
  }  else {
    html_GetElement("P1003_SAVE_NAME").value = '';
    html_GetElement("P1003_SAVE_DESC").value = '';
    html_GetElement("P1003_QUERY_ID").value = '';
    html_GetElement("P1003_SCHEMA").value = qSchema;
  }    
  var get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=7139200190149482',0);  
   get.add('P1003_SAVE_NAME',qTitle);
   get.add('P1003_SAVE_DESC',qDesc);
   get.add('P1003_QUERY_ID',qId);
   get.add('P1003_SCHEMA',qSchema);
  var sql = get.get('FULL');  
  get = null;
  var e2 = html_GetElement('P1003_SQL_COMMAND1');
  e2.value = sql;
  sql = null;
  e2.focus();   
}

function sc_getSavedSQL(pReset){
  var shw = "0";
  var find = "";
  var rows = 10;
  var holder = html_GetElement("SavedSQLHolder");
  if (html_GetElement("P1203_SHOW"))
    shw = html_SelectValue("P1203_SHOW");

  if (html_GetElement("P1203_FIND") && html_GetElement("P1203_FIND").value != "undefined" ) {
    find = html_GetElement("P1203_FIND").value;
  }
  
//  if (gFind != '') {
//    shw = '0';
//    find = gFind;
//    if (html_GetElement("P1203_FIND")){html_GetElement("P1203_FIND").value = find;}
//  }

  if (html_GetElement("P1203_ROWS")){
  rows = html_SelectValue("P1203_ROWS");
  }
   if(pReset){
     lURL = 'f?p=4500:1203:'+html_GetElement('pInstance').value+'::NO:RP:P1203_SHOW,P1203_FIND,P1203_ROWS:'+shw+','+find+','+rows;
     cDebug(lURL)
     var get = new htmldb_Get(null,4500,null,1203,null,'f',lURL.substring(2));
   }else{
     var get = new htmldb_Get(null,4500,null,1203);
   }
//    if (shw != 0 || gFind != '') get.add('P1203_SHOW',shw);
    get.add('P1203_SHOW',shw);
    get.add('P1203_FIND',find);
    get.add('P1203_ROWS',rows);
  var results = get.get(null,'<htmldb:BOX_BODY>','</htmldb:BOX_BODY>');
  get = null;
  holder.innerHTML = results;
  //gFind = '';
  results = null;
  init_htmlPPRReport('R6415019707620645');
}

function sc_saveSql() {
    if(isEmpty("P1003_SAVE_NAME")){
		html_GetElement("P1003_SAVE_NAME").value = '';
		html_GetElement("P1003_SAVE_NAME").focus();
	}else{
		sc_getSel();
		var sql = html_GetElement("P1003_SQL_COMMAND2").value;
		var tSql = trimAll(sql);
		var sName = html_GetElement("P1003_SAVE_NAME").value;
		var sDesc = html_GetElement("P1003_SAVE_DESC").value;
        charToRemove = "'";
        regExp = new RegExp("["+charToRemove+"]","g");
        sDesc = sDesc.replace(regExp,"");
        html_GetElement("P1003_SAVE_DESC").value = sDesc;
		var sId = html_GetElement("P1003_QUERY_ID").value;
		var get = new htmldb_Get(null,4500,'INTERNAL_APPLICATION_PROCESS=158194723674245313',0);
		get.add('P1003_SAVE_NAME',sName);
		get.add('P1003_SAVE_DESC',sDesc);
		get.add('P1003_QUERY_ID',sId);
		get.add('P1003_SQL_COMMAND2',tSql);
		var result = get.get();  
		if (result.indexOf('HTMLDB:ERROR') > 0) { 
			html_GetElement('htmldbMessageHolder').innerHTML = result;
		} else {    
			html_GetElement("P1003_QUERY_ID").value = result;
			sc_ClearMessageArea()
			html_TabClick(html_GetElement("savedsql_tab"),'SavedSQLHolder');
			sc_getSavedSQL();
			sc_close('saveDialog');
		}
		results = null;
		get = null;
	}
}

function sc_clearResults(){
  if ( html_GetElement("resultsHolder") ) {
        html_GetElement("resultsHolder").innerHTML = g_Running;
      }
}

/* static for saved sql PPR*/

            var rowStyle      = new Array(10);
            var rowActive     = new Array(10);
            var rowStyleHover = new Array(10);
            
            function checkAll(masterCheckbox) {
                if (masterCheckbox.checked) {
                    for (var i = 0; i<document.wwv_flow.f01.length; i++) {
                        if (document.wwv_flow.f01[i].checked==false) {
                          document.wwv_flow.f01[i].checked=true;
                          highlight_row(document.wwv_flow.f01[i],i);
                        }
                    }
                } else {
                    rowsNotChecked=0;
                    for (var i = 0; i<document.wwv_flow.f01.length; i++) {
                       if (document.wwv_flow.f01[i].checked!=true) {
                           rowsNotChecked=rowsNotChecked+1;
                       }
                    }
                    if (rowsNotChecked==0) {
                        for (var i = 0; i<document.wwv_flow.f01.length; i++) {
                            if (document.wwv_flow.f01[i].checked==true) {
                              document.wwv_flow.f01[i].checked=false;
                              highlight_row(document.wwv_flow.f01[i],i);
                            }
                        }
                    }
                }
            }

            function highlight_row(checkBoxElemement,currentRowNum) {
                if(checkBoxElemement.checked==true) {
                    for( var i = 0; i < checkBoxElemement.parentNode.parentNode.childNodes.length; i++ ) {
                        if (checkBoxElemement.parentNode.parentNode.childNodes[i].tagName=='TD') {
                            if(rowActive=='Y') {
                                rowStyle[currentRowNum] = rowStyleHover[currentRowNum];
                            } else {
                                rowStyle[currentRowNum] = checkBoxElemement.parentNode.parentNode.childNodes[i].style.backgroundColor;
                            }
                            checkBoxElemement.parentNode.parentNode.childNodes[i].style.backgroundColor = '#CCCCCC';
                        }
                    }
                    rowStyleHover[currentRowNum] =  '#CCCCCC';
                } else {
                      for( var i = 0; i < checkBoxElemement.parentNode.parentNode.childNodes.length; i++ ) {
                          if (checkBoxElemement.parentNode.parentNode.childNodes[i].tagName=='TD') {
                              checkBoxElemement.parentNode.parentNode.childNodes[i].style.backgroundColor =  rowStyle[currentRowNum];
                              rowStyleHover[currentRowNum] =  rowStyle[currentRowNum];
                              document.wwv_flow.x02.checked=false;
                          }
                      }
                }
            }
