// ==UserScript==
// @name         HV Monster up stat
// @namespace    ??-??
// @version      0.3
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

var MAX_PRIMARY = 3; // max=25
var MAX_ELEMENTAL = 4; // max=50
var MAX_CHAOS = 1; // max=20

// if have value on this,  it use this first, if not go to default;
var vPri = ["pa_int", "pa_wis"];//["pa_str", "pa_dex", "pa_agi", "pa_end", "pa_int", "pa_wis"];
var vElem = ["er_holy", "er_dark"];//["er_fire", "er_cold", "er_elec", "er_wind", "er_holy", "er_dark"];
var vChaos = ["evade", "resist"];//["affect", "damage", "atkspd", "accur", "cevbl", "cpare", "health", "parry", "resist", "evade", "phymit", "magmit"];

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


var Upgrade = {
	pa: {
		caption: "Primary Crystal",
		text: ["STR", "DEX", "AGI", "END", "INT", "WIS"],
		param: "crystal_upgrade=",
		value: ["pa_str", "pa_dex", "pa_agi", "pa_end", "pa_int", "pa_wis"],
		lvmax: 25
	},
	
	er: {
		caption: "Elemental Crystal",
		text: ["FIRE", "COLD", "ELEC", "WIND", "HOLY", "DARK"],
		param: "crystal_upgrade=",
		value: ["er_fire", "er_cold", "er_elec", "er_wind", "er_holy", "er_dark"],
		lvmax: 50
	},
	
	cu: {
		caption: "Chaos Upgrade",
		text: ["Scavenging", "Brutality", "Swiftness", "Accuracy", "Precision", "Overpower", "Fortitude", "Interception", "Dissipation", "Evasion", "Defense", "Warding"],
		param: "chaos_upgrade=",
		value: ["affect", "damage", "atkspd", "accur", "cevbl", "cpare", "health", "parry", "resist", "evade", "phymit", "magmit"],
		lvmax: 20
	},
	
	other: {
		caption: "Other",
		text: ["Check State", "Check Skill", "Happy Pills", "Win => 0"],
		param: null,
		value: ["Check State", "Check Skill", "Happy Pills", "Win => 0"]
	}
};



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



function checkState(doc, param, max, type) {
	var stat = doc.getElementById("bonus_stats");
	if (stat) {
		var no = (doc.querySelector(".ms").children[0].textContent*1) - 1;
		
		var mons = {
			pa: {}, er: {}, cu: {},
			skill: ["?", "?", "?"], twin: 0, tkill: 0, win: 0, kill: 0
		};

		/*
		if (data.mons[no]) mons = data.mons[no];
		
		mons.twin = stat.children[1].children[1].textContent * 1*1;
		mons.tkill = stat.children[2].children[1].textContent * 1*1;
		*/
		
		var tables = doc.querySelectorAll("#left_pane table");
		mons.pa = checkCrystal(tables[0], Upgrade.pa);
		mons.er = checkCrystal(tables[1], Upgrade.er);
		mons.cu = checkChaos(tables[2], Upgrade.cu);

		//param = "crystal_upgrade=pa_str";
		var pr = param.split('=')[1];
		//console.log('param:'+param+' max:'+max+' type:'+type+' pr:'+pr);
		
		if("PRI" === type){
			var uVIndex = Upgrade.pa.value.indexOf(pr);
			var uText = Upgrade.pa.text[uVIndex];
			var nowValue = mons.pa[uText];

			if((max-0) === nowValue){
				//localStorage.setItem("monsterLetGo", true);
				//document.getElementById('showMLPri_'+pr).textContent = document.getElementById('showMLPri_'+pr).textContent+'[X]';
				document.getElementById('showMLPri_'+pr).classList["remove"]("doing");
			}
			
			//console.log(mons.pa[uText]);
			
		}else if("ELEM" === type){
			var uVIndex = Upgrade.er.value.indexOf(pr);
			var uText = Upgrade.er.text[uVIndex];
			var nowValue = mons.er[uText];

			if((max-0) === nowValue){
				//localStorage.setItem("monsterLetGo", true);
				//document.getElementById('showMLElem_'+pr).textContent = document.getElementById('showMLElem_'+pr).textContent+'[X]';
				document.getElementById('showMLElem_'+pr).classList["remove"]("doing");
			}
			
			//console.log(mons.er[uText]);

		}else if("CHAOS" === type){
			var uVIndex = Upgrade.cu.value.indexOf(pr);
			var uText = Upgrade.cu.text[uVIndex];
			var nowValue = mons.cu[uText];

			if((max-0) === nowValue){
				//localStorage.setItem("monsterLetGo", true);
				//document.getElementById('showMLChaos_'+pr).textContent = document.getElementById('showMLChaos_'+pr).textContent+'[X]';
				document.getElementById('showMLChaos_'+pr).classList["remove"]("doing");
			}
			
			//console.log(mons.cu[uText]);

		}

		//data.mons[no] = mons;

		//console.log(mons);
		//localStorage.setItem("HV_SmartMonsterLab", JSON.stringify(data));
	}
	
	
	function checkCrystal(table, list) {
		var array = {};
		for (var i=0; i<table.rows.length; i++) {
			array[list.text[i]] = table.rows[i].cells[1].textContent*1;
		}
		return array;
	}
	
	function checkChaos(table, list) {
		var array = {};
		for (var i=0; i<table.rows.length; i++) {
			var count = table.rows[i].cells[1].querySelectorAll("div[style*='upg2.png']").length;
			array[list.text[i]] = count;
		}
		return array;
	}
	
}



function post(req, count, max, type) {
    //console.log(req, count);
    //return;

    count = count || 0;
	//localStorage.setItem("monsterLetGo", false);
    if (req.elm) req.elm.textContent = req.text.replace("#", (count+1) + " / " + req.tag.length);

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
            req.callback(res, req.param, max, type);
        }

        if (count < req.tag.length - 1){
            post(req, count + 1, max, type);

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


function upStatPri(vMainData, vMaxSetting, vSlot){
    var rt_value = 0;
    var vMainValue = vMainData.value;
	var vDiv = document.createElement("DIV");
	var vTable = document.createElement("TABLE");
		vTable.id = 'tableStatPri';

	var vCenter = document.createElement("CENTER");
		vCenter.appendChild(vTable);
		vDiv.appendChild(vCenter);
	var vTR = document.createElement("TR");

	vTable.appendChild(vTR);
	document.getElementById('mainpane').insertBefore(vDiv, document.getElementById('stats_pane'));

    for(var j=0;j<vMainValue.length;j++){
        var vValue = vMainValue[j];
        var img = document.querySelector('img[onclick*="value=\''+vValue+'\'"]');
		var vTD = document.createElement("TD");

        if(img){
            var nowStat = img.parentNode.parentNode.childNodes[1].textContent.replace('+','')*1;
            var vTag = [];

			/*
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
			*/
			var spTable = document.getElementById('tableStatPri');
			
			var _div = document.getElementById('showMLPri_'+vValue);

			if(!_div){
				_div = document.createElement("DIV");
				_div.id = 'showMLPri_'+vValue;
				//document.getElementById('mainpane').insertBefore(_div, spTable);
				//spTable.appendChild(_div);
				_div.classList["add"]("doing");
				vTD.appendChild(_div);
			}
			
			

			var req = {
                type: "POST",	
                tag: [],	
                url: "http://hentaiverse.org/?s=Bazaar&ss=ml&slot=", 
                param: "", 
                callback: checkState,
                repeat: 1, 
                elm: _div, 
                text: vValue+" (#)"
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
                        post(req, 0, vMaxSetting, "PRI");

                        rt_value += vTag.length;
                    }
                }

            }

        }// end if img

		vTR.appendChild(vTD);

    }// end loop

    return rt_value;

}


function upStatElem(vMainData, vMaxSetting, vSlot){
    var rt_value = 0;
    var vMainValue = vMainData.value;

	var vDiv = document.createElement("DIV");
	var vTable = document.createElement("TABLE");
		vTable.id = 'tableStatPri';

	var vCenter = document.createElement("CENTER");
		vCenter.appendChild(vTable);
		vDiv.appendChild(vCenter);
	var vTR = document.createElement("TR");

	vTable.appendChild(vTR);
	document.getElementById('mainpane').insertBefore(vDiv, document.getElementById('stats_pane'));

    for(var j=0;j<vMainValue.length;j++){
        var vValue = vMainValue[j];
        var img = document.querySelector('img[onclick*="value=\''+vValue+'\'"]');
		var vTD = document.createElement("TD");
        if(img){
            var nowStat = img.parentNode.parentNode.childNodes[1].textContent.replace('+','')*1;
            var vTag = [];

			/*
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
			*/
			
			var spTable = document.getElementById('tableStatElem');
			
			var _div = document.getElementById('showMLElem_'+vValue);

			if(!_div){
				_div = document.createElement("DIV");
				_div.id = 'showMLElem_'+vValue;
				//document.getElementById('mainpane').insertBefore(_div, spTable);
				//spTable.appendChild(_div);
				_div.classList["add"]("doing");
				vTD.appendChild(_div);
			}

			var req = {
                type: "POST",	
                tag: [],	
                url: "http://hentaiverse.org/?s=Bazaar&ss=ml&slot=", 
                param: "", 
                callback: checkState,
                repeat: 1,
                elm: _div, 
                text: vValue+" (#)"
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
                        post(req, 0, vMaxSetting, "ELEM");

                        rt_value += vTag.length;
                    }
                }

            }

        }// end if img

		vTR.appendChild(vTD);

    }// end loop

    return rt_value;

}

function upStatChaos(vMainData, vMaxSetting, vSlot){
    var rt_value = 0;
    var vMainValue = vMainData.value;

	var vDiv = document.createElement("DIV");
	var vTable = document.createElement("TABLE");
		vTable.id = 'tableStatPri';

	var vCenter = document.createElement("CENTER");
		vCenter.appendChild(vTable);
		vDiv.appendChild(vCenter);
	var vTR = document.createElement("TR");

	vTable.appendChild(vTR);
	document.getElementById('mainpane').insertBefore(vDiv, document.getElementById('stats_pane'));

    for(var j=0;j<vMainValue.length;j++){
        var vValue = vMainValue[j];
        var img = document.querySelector('img[onclick*="value=\''+vValue+'\'"]');
		var vTD = document.createElement("TD");
        if(img){
            var statCannotUp = img.parentNode.parentNode.querySelectorAll('div[style*="/upg0.png"]').length;
            var statCanUp = img.parentNode.parentNode.querySelectorAll('div[style*="/upg1.png"]').length;
            var statAlreadyUp = img.parentNode.parentNode.querySelectorAll('div[style*="/upg2.png"]').length;

            var nowStat = statAlreadyUp;
            var vTag = [];
			
			var spTable = document.getElementById('tableStatElem');
			
			var _div = document.getElementById('showMLChaos_'+vValue);

			if(!_div){
				_div = document.createElement("DIV");
				_div.id = 'showMLChaos_'+vValue;
				_div.classList["add"]("doing");
				//document.getElementById('mainpane').insertBefore(_div, spTable);
				//spTable.appendChild(_div);
				vTD.appendChild(_div);
			}

            var req = {
                type: "POST",	
                tag: [],	
                url: "http://hentaiverse.org/?s=Bazaar&ss=ml&slot=", 
                param: "", 
                callback: checkState,
                repeat: 1, 
                elm: _div, 
                text: vValue+" (#)"
            };

            req.param = vMainData.param+vValue;

            if(nowStat < vMainData.max){
                if(statCannotUp > 0){
                    var loop = vMaxSetting - nowStat;

					if(statCanUp < loop){
						loop = statCanUp;
					}

                    var haveTag = false;
                    for(var i=0;i<loop;i++){
                        vTag.push(vSlot);
                        haveTag = true;
                    }

                    if(haveTag){
                        req.tag = vTag;
                        post(req, 0, vMaxSetting, "CHAOS");

                        rt_value += vTag.length;
                    }
                }
            }

        }// end if img

		vTR.appendChild(vTD);

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
        var vPriDo = upStatPri(pri, MAX_PRIMARY, nowMon);


        //elem--zone
        if(vElem.length > 0){
            elem.value = vElem;
        }

        var vElemDo = upStatElem(elem, MAX_ELEMENTAL, nowMon);


        //chaos--zone
        if(vChaos.length > 0){
            chaos.value = vChaos;
        }

        var vChaosDo = upStatChaos(chaos, MAX_CHAOS, nowMon);

        var vTimeout = 1;// sec
        vTimeout = (vPriDo+vElemDo+vChaosDo)/2;

		//console.log('vPriDo:'+vPriDo+' vElemDo:'+vElemDo+' vChaosDo:'+vChaosDo);

		if(vTimeout > 999){
			vTimeout = 10;
		}

        //document.title = '-Wait '+vTimeout+' sec.';

		if(vTimeout > 0){
			/*
			setTimeout(function() {
				location.href = location.href;
			}, (vTimeout*1000));
			*/
			setInterval(function() {

				var TotalDoing = document.querySelectorAll('div.doing').length;

				if(TotalDoing === 0){
					location.href = location.href;
				}

			}, 1*1000);
			

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
