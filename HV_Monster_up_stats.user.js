// ==UserScript==
// @name         HV Monster up stat
// @namespace    ??-??
// @version      0.2
// @description  Enjoy :P
// @author       BB-04
// @match        http://hentaiverse.org/?s=Bazaar&ss=ml*
// @icon			http://g.e-hentai.org/favicon.ico
// @updateURL       https://github.com/suvidev/hv/raw/master/HV_Monster_up_stats.user.js
// @downloadURL     https://github.com/suvidev/hv/raw/master/HV_Monster_up_stats.user.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
// Your code here...

//====== Setting Zone ======//

var MAX_PRIMARY = 1; // max=25
var MAX_ELEMENTAL = 1; // max=50
var MAX_CHAOS = 0; // max=20

// if have value on this,  it use this first, if not go to default;
var vPri = ["pa_str", "pa_dex", "pa_agi", "pa_end", "pa_int", "pa_wis"];
var vElem = ["er_fire", "er_cold", "er_elec", "er_wind", "er_holy", "er_dark"];
var vChaos = ["affect", "damage", "atkspd", "accur", "cevbl", "cpare", "health", "parry", "resist", "evade", "phymit", "magmit"];

//====== Setting Zone END ======//







//Don't change anything on this parameter and value.
//["pa_str", "pa_dex", "pa_agi", "pa_end", "pa_int", "pa_wis"]
var pri = {value:["pa_str", "pa_dex", "pa_agi", "pa_end", "pa_int", "pa_wis"],
           param:"crystal_upgrade=",
           max:25};

//["er_fire", "er_cold", "er_elec", "er_wind", "er_holy", "er_dark"]
var elem = {value:["er_fire", "er_cold", "er_elec", "er_wind", "er_holy", "er_dark"],
            param:"crystal_upgrade=",
            max:50};

//["affect", "damage", "atkspd", "accur", "cevbl", "cpare", "health", "parry", "resist", "evade", "phymit", "magmit"],
var chaos = {value:["affect", "damage", "atkspd", "accur", "cevbl", "cpare", "health", "parry", "resist", "evade", "phymit", "magmit"],
             param:"chaos_upgrade=",
             max:20};



function increPrimaryStat(divPriAttr){

    var rt = false;
    var vStatPri = divPriAttr.querySelectorAll('table div.fd4');
    var i=0;
    for(i=0;i<vStatPri.length;i++){
        if(i%2 === 0){
            var nowStat = vStatPri[i].textContent.replace('+','')*1;

            if(nowStat < MAX_PRIMARY ){
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

            if(nowStat < MAX_ELEMENTAL ){
                rt = true;
                vStatEle[i].parentNode.parentNode.querySelector('img').click();
                break;
            }
        }
    }

    return rt;
}





function post(req, count) {
    //console.log(req, count);
    //return;

    count = count || 0;

    if (req.elm) req.elm.value = req.text.replace("#", (count+1) + " / " + req.tag.length);

    var xhr = new XMLHttpRequest();
    xhr.open(req.type, req.url + req.tag[count]);
    xhr.responseType = "document";

    if (req.type === "POST") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    xhr.onload = (function() {
        if (xhr.status !== 200) {
            alert("Error: Status Code " + xhr.status);
            return;
        }

        if (req.callback) {
            var res = xhr.responseXML;
            if (!res) res = new DOMParser().parseFromString(xhr.responseText, "text/xml");
            req.callback(res);
        }

        if (count < req.tag.length - 1){
            post(req, count + 1);

        } else {
            if (req.repeat > 1) {
                req.repeat--;
                post(req);

            } else {
                //location.href = location.href;
            }
        }
    });

    xhr.send(req.param);
}


function upStatPriElem(vMainData, vMaxSetting, vSlot){
    var rt_value = 0;
    var vMainValue = vMainData.value;

    for(var j=0;j<vMainValue.length;j++){
        var vValue = vMainValue[j];
        var img = document.querySelector('img[onclick*="value=\''+vValue+'\'"]');
        if(img){
            var nowStat = img.parentNode.parentNode.childNodes[1].textContent.replace('+','')*1;
            var vTag = [];

            var req = {
                type: "POST",	
                tag: [],	
                url: "http://hentaiverse.org/?s=Bazaar&ss=ml&slot=", 
                param: "", 
                callback: null,
                repeat: 1, 
                elm: null, 
                text: "Pri Elem.."
            };

            //param: "crystal_upgrade=pa_wis", 
            req.param = vMainData.param+vValue;

            if(nowStat < vMainData.max){

                if(nowStat < vMaxSetting){
                    var loop = vMaxSetting - nowStat;
                    var haveTag = false;
                    for(var i=0;i<loop;i++){
                        vTag.push(vSlot);
                        haveTag = true;
                    }

                    if(haveTag){
                        req.tag = vTag;
                        post(req, 0);

                        rt_value += vTag.length;
                    }
                }

            }

        }// end if img

    }// end loop

    return rt_value;

}

function upStatChaos(vMainData, vMaxSetting, vSlot){
    var rt_value = 0;
    var vMainValue = vMainData.value;
    for(var j=0;j<vMainValue.length;j++){
        var vValue = vMainValue[j];
        var img = document.querySelector('img[onclick*="value=\''+vValue+'\'"]');
        if(img){
            var statCannotUp = img.parentNode.parentNode.querySelectorAll('div[style*="/upg0.png"]').length;
            var statCanUp = img.parentNode.parentNode.querySelectorAll('div[style*="/upg1.png"]').length;
            var statAlreadyUp = img.parentNode.parentNode.querySelectorAll('div[style*="/upg2.png"]').length;

            var nowStat = statAlreadyUp;
            var vTag = [];

            var req = {
                type: "POST",	
                tag: [],	
                url: "http://hentaiverse.org/?s=Bazaar&ss=ml&slot=", 
                param: "", 
                callback: null,
                repeat: 1, 
                elm: null, 
                text: "Chaos.."
            };

            req.param = vMainData.param+vValue;

            if(nowStat < vMainData.max){
                if(statCannotUp > 0){
                    var loop = vMaxSetting - nowStat;
                    var haveTag = false;
                    for(var i=0;i<loop;i++){
                        vTag.push(vSlot);
                        haveTag = true;
                    }

                    if(haveTag){
                        req.tag = vTag;
                        post(req, 0);

                        rt_value += vTag.length;
                    }
                }
            }

        }// end if img

    }//end loop

    return rt_value;
}

function genLetGoMonBtn(){

    var linkx = document.createElement("a");
    linkx.href = "javascript:void(0)";
    var linkText = document.createTextNode("Pri["+MAX_PRIMARY+"] Ele["+MAX_ELEMENTAL+"] Chos["+MAX_CHAOS+"]");
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

        //pri--zone
        if(vPri.length > 0){
            pri.value = vPri;
        }
        var vPriDo = upStatPriElem(pri, MAX_PRIMARY, nowMon);


        //elem--zone
        if(vElem.length > 0){
            elem.value = vElem;
        }

        var vElemDo = upStatPriElem(elem, MAX_ELEMENTAL, nowMon);


        //chaos--zone
        if(vChaos.length > 0){
            chaos.value = vChaos;
        }

        var vChaosDo = upStatChaos(chaos, MAX_CHAOS, nowMon);

        var vTimeout = 1;// sec
        vTimeout = (vPriDo+vElemDo+vChaosDo)/2;

		if(vTimeout > 3){
			vTimeout = 3;
		}

        document.title = '-Wait '+vTimeout+' sec.';

		if(vTimeout > 0){
			setTimeout(function() {
				location.href = location.href;
			}, (vTimeout*1000));
		}else{
			document.querySelector('img[src="/y/monster/next.png"]').click();
		}

        


        /* 
		//Old logic
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

		*/

    }else{
        localStorage.setItem("monsterLetGo", false);

		genLetGoMonBtn();
    }



}
