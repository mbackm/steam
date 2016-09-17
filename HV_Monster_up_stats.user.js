// ==UserScript==
// @name         Monster up stat
// @namespace    ??-??
// @version      0.1
// @description  Enjoy :P
// @author       BB-04
// @match        http://hentaiverse.org/?s=Bazaar&ss=ml*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
// Your code here...


var max_primary = 2;
var max_elemental = 2;


function increPrimaryStat(divPriAttr){
	
	var rt = false;
	var vStatPri = divPriAttr.querySelectorAll('table div.fd4');
	var i=0;
	for(i=0;i<vStatPri.length;i++){
		if(i%2 === 0){
			var nowStat = vStatPri[i].textContent.replace('+','')*1;

			if(nowStat < max_primary ){
				rt = true;
				vStatPri[i].parentNode.parentNode.querySelector('img').click();
				break;
			}
		}
	}

	return rt;
}

function increElementalStat(divElemMiti){
	
	var rt = false;
	var vStatEle = divElemMiti.querySelectorAll('table div.fd4');
	var i=0;
	for(i=0;i<vStatEle.length;i++){
		if(i%2 === 0){
			var nowStat = vStatEle[i].textContent.replace('+','')*1;

			if(nowStat < max_elemental ){
				rt = true;
				vStatEle[i].parentNode.parentNode.querySelector('img').click();
				break;
			}
		}
	}

	return rt;
}

function genLetGoMonBtn(){

	var linkx = document.createElement("a");
	linkx.href = "javascript:void(0)";
	var linkText = document.createTextNode("- Pri["+max_primary+"] Ele["+max_elemental+"] -");
	linkx.appendChild(linkText);
	linkx.id = "ltmon";
	linkx.style.position = "absolute";
	linkx.style.top = "22px";
	linkx.style.left = "1244px";
	linkx.style.cursor = "pointer";
    
    linkx.addEventListener('click', function() {
		localStorage.setItem("monsterLetGo", true);
		window.location.href = window.location.href;
	});

	document.getElementsByClassName('stuffbox csp')[0].appendChild(linkx);
	

}


var letGo = "false";

if(!localStorage.getItem("monsterLetGo")){
	localStorage.setItem("monsterLetGo", false);
}else{
	letGo = localStorage.getItem("monsterLetGo");
}

if(letGo === "false"){
	genLetGoMonBtn();
}else if(document.querySelector('#mainpane div.fd4')){

	var nowMon = document.querySelector('#mainpane div.fd4').textContent;



	if(nowMon !== '1'){

		//primary zone
		var divPriAttr = document.querySelector('#feed_pane').parentNode.childNodes[3];

		if(increPrimaryStat(divPriAttr)){
			return;
		}

		//element zone
		var divElemMiti = document.querySelector('#feed_pane').parentNode.childNodes[5];

		if(increElementalStat(divElemMiti)){
			return;
		}


		document.querySelector('img[src="/y/monster/next.png"]').click();

	}else{
        localStorage.setItem("monsterLetGo", false);
    }



}
