// ==UserScript==
// @name         Nekopost.net
// @namespace    GG
// @version      0.2
// @description  Enjoy :P
// @author       BB-04
// @match        http://www.nekopost.net/*
// @run-at         document-end
// @grant        none
// ==/UserScript==
/* jshint -W097 */

// Your code here...


if(document.querySelector('div.header.hidden-xs')){

    document.querySelector('div.header.hidden-xs').style.opacity = '0';
    document.querySelector('div.header.hidden-xs').addEventListener('mouseover', function() {
        document.querySelector('div.header.hidden-xs').style.opacity = '1';
    });

    document.querySelector('div.header.hidden-xs').addEventListener('mouseout', function() {
        document.querySelector('div.header.hidden-xs').style.opacity = '0';
    });

    /*
    if(document.querySelector('div a img')){
        document.querySelector('div a img').style.opacity = '0.1';
    }

    document.body.style.backgroundColor = 'black';
    */
}


function addImg(vSrc){
    var linkOimg = document.createElement("a");
    linkOimg.id = 'linkOimgID';
    linkOimg.href = vSrc;
    linkOimg.appendChild(document.createTextNode("- Open IMG -"));
    linkOimg.target = "_blank";
    linkOimg.style.position = 'fixed';
    linkOimg.style.bottom = '20px';

    document.body.appendChild(linkOimg);
}



function vGenImgCopy(){
    if(document.querySelector('div.display_content img')){

        var vImg = document.querySelector('div.display_content img');
        var vSrc = vImg.src;

        if(vSrc.indexOf('file_server_nginx') !== -1){
            addImg(vSrc);
        }else{
            if(document.querySelector('div.display_content img').getAttribute('style')){
                if(document.querySelector('div.display_content img').getAttribute('style').indexOf('file_server_nginx') !== -1){
                    vSrc = document.querySelector('div.display_content img').style.backgroundImage.replace('url("','').replace('")','');
                    addImg(vSrc);
                }
            }
            
        }

    }
}

/*
setTimeout(function(){
    //do what you need here
    vGenImgCopy();
}, 3000);
*/

function loopingFunction1() {

    if(!document.getElementById('linkOimgID')){
        vGenImgCopy();
    }

    setTimeout(loopingFunction1, 1000);
}


loopingFunction1();

