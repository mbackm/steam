// ==UserScript==
// @name         HV Items Stamp Storage
// @namespace    GG
// @icon         http://g.e-hentai.org/favicon.ico
// @description  Enjoy. :P  HV 0.85
// @author       BB-04
// @match        http://hentaiverse.org/?s=Character&ss=in
// @match        http://hentaiverse.org/?s=Character&ss=it
// @match        https://hentaiverse.org/?s=Character&ss=in
// @match        https://hentaiverse.org/?s=Character&ss=it
// @updateURL       https://github.com/suvidev/hv/raw/master/HV_items_stamp.user.js
// @downloadURL     https://github.com/suvidev/hv/raw/master/HV_items_stamp.user.js
// @version      0.7
// @grant        none
// ==/UserScript==

var GBGM_KEY = "ITS_";

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function GM_setValue(vKeyv, vValuev){
    localStorage.setItem(GBGM_KEY+vKeyv, vValuev);
}

function GM_getValue(vKeyv){

    var vlu = localStorage.getItem(GBGM_KEY+vKeyv);

    if(vlu === 'true'){
        return true;
    }else if(vlu === 'false'){
        return false;
    }else if(isNumber(vlu)){
        return parseFloat(vlu);
    }else if(vlu === 'null'){
        return null;
    }

    return vlu;
}


var gbKeyPanel = 'inv_item';


var gbStampData = {};

if(GM_getValue("gbStampData")) gbStampData = JSON.parse(GM_getValue("gbStampData"));

//document.getElementById('inv_item').querySelectorAll('tr')[0].outerText.replace('\n','||').trim()


function doStampItems(){

    if(document.getElementById(gbKeyPanel)){

        var itemListx = document.getElementById(gbKeyPanel).querySelectorAll('tr');

        for(i=0; i<itemListx.length ;i++){
            var strTxt = itemListx[i].outerText.replace('\t','||').trim();
            var strArray = strTxt.split('||');

            if(strArray.length === 2){
                strArray[1] = strArray[1].substring(0,strArray[1].indexOf('[')).trim();
                //GM_setValue(strArray[0],strArray[1]);
				gbStampData[strArray[0]] = strArray[1];
            }


        }

		GM_setValue("gbStampData",JSON.stringify(gbStampData));

        return itemListx.length;
    }

    return 0;
}

function getDDtoday(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var hh = today.getHours();
    var mmin = today.getMinutes();

    var yyyy = today.getFullYear();

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
	if(hh<10) hh='0'+hh;
	if(mmin<10) mmin='0'+mmin;

    var today = dd+'/'+mm+'/'+yyyy+'  '+hh+':'+mmin;

    return today;
}

function genBtnStamp(){

    var linkx = document.createElement("a");
    linkx.href = "javascript:void(0)";
    var linkText = document.createTextNode("Stamp! [ "+GM_getValue('getDDtoday')+" ]");
    linkx.appendChild(linkText);
    linkx.id = "stampid";
    linkx.style.position = "absolute";
    linkx.style.top = "35px";
    linkx.style.right = "4px";
    linkx.style.cursor = "pointer";
    //linkx.style.backgroundColor = 'beige';

     document.getElementById('mainpane').appendChild(linkx);
    document.getElementById('stampid').addEventListener('click', function() {
        var noDoit = doStampItems();

        GM_setValue('getDDtoday',getDDtoday());
        console.log(noDoit);
        window.location.href = window.location.href;
    });

    if( GM_getValue('getDDtoday') == null ){
        showStampItem();
        doStampItems();
        GM_setValue('getDDtoday',getDDtoday());
        window.location.href = window.location.href;
    }

}



function showStampItem(){

    if(document.getElementById(gbKeyPanel)){
console.log('cc');
        var itemListx = document.getElementById(gbKeyPanel).querySelectorAll('tr');

        for(i=0; i<itemListx.length ;i++){
            var strTxt = itemListx[i].outerText.replace('\t','||').trim();
            var strArray = strTxt.split('||');

            if(strArray.length === 2){
               // GM_setValue(strArray[0],strArray[1]);
                var nowVl = parseInt(itemListx[i].querySelectorAll('td')[1].textContent);
               // console.log('1 = '+itemListx[i].querySelectorAll('div.fd2')[0].children[0].textContent);
                var oldVl = gbStampData[itemListx[i].querySelectorAll('td')[0].textContent];// GM_getValue(itemListx[i].querySelectorAll('div.fd2')[0].children[0].textContent);
				 
				if(isNaN(oldVl)){ gbStampData[itemListx[i].querySelectorAll('td')[0].textContent] = (nowVl); oldVl=0; GM_setValue("gbStampData",JSON.stringify(gbStampData));}

                var sumTotalVL = nowVl-oldVl;
                if(sumTotalVL < 0){
                    itemListx[i].querySelectorAll('td')[0].style.color = '#DA0000';
                    itemListx[i].querySelectorAll('td')[1].style.fontWeight = 'bold';
                }
                itemListx[i].querySelectorAll('td')[1].textContent = itemListx[i].querySelectorAll('td')[1].textContent + ' [' + (sumTotalVL)+']';
                itemListx[i].querySelectorAll('td')[1].style.width = '130px';

            }


        }

    }

}

//console.log('Health Draught = '+GM_getValue('Health Draught'));

if(document.getElementById('inv_item') || document.getElementById('togpane_item')){

    if(document.getElementById('togpane_item')){
        gbKeyPanel = 'togpane_item';
    }else{
        genBtnStamp();
    }
    showStampItem();
}


