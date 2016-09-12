// ==UserScript==
// @name         nipponanime resize for view
// @namespace    GG
// @version      1.0.5
// @description  Enjoy.
// @author       GG
// @match        http://www.nipponanime.net/forum/*
// @grant        none
// @updateURL       https://github.com/suvidev/hv/raw/master/nekopost.user.js
// @downloadURL     https://github.com/suvidev/hv/raw/master/nekopost.user.js
// --@grant    GM_setValue
// --@grant    GM_getValue
// ==/UserScript==


var GBGM_KEY = "NARF_";

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function GM_setValue(vKeyv, vValuev) {
    localStorage.setItem(GBGM_KEY + vKeyv, vValuev);
}

function GM_getValue(vKeyv) {

    var vlu = localStorage.getItem(GBGM_KEY + vKeyv);

    if (vlu === 'true') {
        return true;
    } else if (vlu === 'false') {
        return false;
    } else if (isNumber(vlu)) {
        return parseFloat(vlu);
    } else if (vlu === 'null') {
        return null;
    }

    return vlu;
}


//resize main post
if(document.querySelector('div.postarea')){
    document.querySelector('div.postarea').style.margin = "0 0 0 0";
}

var mainImgOverWidth = 1150;
var chkWidthSize = 1300;


//remove center ads

function removeCenterX(){
    if(document.querySelectorAll('div center').length > 0 ){
        for(j=0;j<document.querySelectorAll('div center').length;j++){
            for(i=0;i<document.querySelectorAll('div center').length;i++){
                var elem = document.querySelector('div center');
                elem.parentNode.removeChild(elem);
                break;
            }
        }
    }
}
removeCenterX();
setTimeout(function(){ 
       removeCenterX();
    },700);

//remove ads in post
if(document.querySelectorAll('div.postarea').length > 0 ){
    
    for(i=0;i<document.querySelectorAll('div.postarea').length;i++){
        
        for(j=0;j<document.querySelectorAll('div.postarea')[i].childNodes.length;j++){
             var canRemove = true;
            if(document.querySelectorAll('div.postarea')[i].childNodes[j].className){
                if(document.querySelectorAll('div.postarea')[i].childNodes[j].className === 'post' ){
                    canRemove = false;
                }
            }
            
            if(canRemove){
                if(document.querySelectorAll('div.postarea')[i].childNodes[j]){
                    document.querySelectorAll('div.postarea')[i].childNodes[j].remove();
                }
                j=0;
            }
            
        }

    }
}


//remove up left right banner
document.querySelector('div.poster ul')?document.querySelector('div.poster ul').remove():'';
document.getElementById('click_left_skin')?document.getElementById('click_left_skin').remove():'';
document.getElementById('click_right_skin')?document.getElementById('click_right_skin').remove():'';

document.body.style.background = "black";

if(document.querySelector('div.post')){
    document.querySelector('div.post').style.overflow = "visible";
}

//resize image
function resizeImgGG(){
    if(document.querySelectorAll('td.td2').length > 0){

        for(i=0;i<document.querySelectorAll('td.td2').length;i++){

            if( document.querySelectorAll('td.td2')[i].textContent.indexOf('This image has been resized') !== -1){
                var widthImg = 1000;
                var txt = document.querySelectorAll('td.td2')[i].textContent;
                if(txt.indexOf('The original image is sized') !== -1){
                    var atxt = txt.substring(txt.indexOf('The original image is sized')+27).split('x')
                    widthImg = parseInt(atxt[0].trim());
                }
                
                if(widthImg <= chkWidthSize){
                    document.querySelectorAll('td.td2')[i].click();
                }
                    
                if( widthImg >  mainImgOverWidth ){
                    var thisIMG = document.querySelectorAll('td.td2')[i].parentNode.parentNode.parentNode.nextElementSibling;

                    var oldWidth  = parseInt(thisIMG.width);
                    var oldHeight  = parseInt(thisIMG.height);

                    var newSize = mainImgOverWidth - oldWidth;

                    thisIMG.width = oldWidth + newSize;
                    thisIMG.height = oldHeight + newSize;

                }
                
            }

        }

    }
}


function resizeOverImg(){
  
    var pOverList = document.querySelectorAll('.bbc_img');
    
    for(i=0;i<pOverList.length;i++){
        
        var oldWidth  = parseInt(pOverList[i].width);
        var oldHeight  = parseInt(pOverList[i].height);
                
        var newSize = mainImgOverWidth - oldWidth;
        
        pOverList[i].width = oldWidth + newSize;
        pOverList[i].height = oldHeight + newSize;
        
    }
    
}

GM_setValue("runchkloop", 0);
resizeImgGG();
var idGodGG = setInterval(function(){
    resizeImgGG();
    //resizeOverImg();
}, 10000);


setTimeout(function(){ 
    clearInterval( idGodGG );
},250000);

GM_setValue("idrunresize", idGodGG);

function genResizeBtn(){
    
    var divFB = document.createElement("div");
    divFB.id = "autoRZId";
    divFB.style.position = "absolute";
    divFB.style.top = "20px";
    divFB.style.left = "172px";
    divFB.style.cursor = "pointer";
    divFB.style.backgroundColor = '#FFAEAE';
    divFB.style.zIndex = "11111111111";
    var cbFFx = document.createElement("INPUT");
    cbFFx.setAttribute("type", "checkbox");
    cbFFx.id = "cbFBATUxID";
    var lbFFx = document.createElement("LABEL");
    var tnFFx = document.createTextNode("Enable Resize");
    lbFFx.appendChild(tnFFx);
    divFB.appendChild(cbFFx);
    divFB.appendChild(lbFFx);

    document.body.appendChild(divFB);

}

//genResizeBtn();

