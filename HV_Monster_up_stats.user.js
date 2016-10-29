// ==UserScript==
// @name         HV Monster up stat
// @namespace    ??-??
// @version      0.7
// @description  Enjoy :P
// @author       BB-05
// @run-at         document-end
// @match        http://hentaiverse.org/?s=Bazaar&ss=ml*
// @icon			http://g.e-hentai.org/favicon.ico
// @updateURL       https://github.com/suvidev/hv/raw/master/HV_Monster_up_stats.user.js
// @downloadURL     https://github.com/suvidev/hv/raw/master/HV_Monster_up_stats.user.js
// @grant          GM_addStyle
// ==/UserScript==


//====== Setting Zone ======//

var MAX_PRIMARY = 1; // max=25
var MAX_ELEMENTAL = 1; // max=50
var MAX_CHAOS = 0; // max=20
var ENABLE_AUTO_NEXT_MONSTER = true; // true , false

// if have value on this,  it use this first, if not go to default;
            //["pa_str", "pa_dex", "pa_agi", "pa_end", "pa_int", "pa_wis"];
var vPri = ["pa_str", "pa_dex", "pa_agi", "pa_end", "pa_int", "pa_wis"];

               //["er_fire", "er_cold", "er_elec", "er_wind", "er_holy", "er_dark"];
var vElem = ["er_fire", "er_cold", "er_elec", "er_wind", "er_holy", "er_dark"];

                 //["affect", "damage", "atkspd", "accur", "cevbl", "cpare", "health", "parry", "resist", "evade", "phymit", "magmit"];
var vChaos = ["affect"];

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



function reload_data(){
	var ml_data = {};
	var ml_load = localStorage.getItem("MS_monsterSetting");
	if (ml_load){
		ml_data = JSON.parse(ml_load);
		vPri = [];
		var zInd = 0;
		for(zInd=0;zInd<pri.value.length;zInd++){
			if(ml_data[pri.value[zInd]]){
				vPri.push(pri.value[zInd]);
			}
		}

		vElem = [];
		for(zInd=0;zInd<elem.value.length;zInd++){
			if(ml_data[elem.value[zInd]]){
				vElem.push(elem.value[zInd]);
			}
		}

		vChaos = [];
		for(zInd=0;zInd<chaos.value.length;zInd++){
			if(ml_data[chaos.value[zInd]]){
				vChaos.push(chaos.value[zInd]);
			}
		}

		MAX_PRIMARY = ml_data["MAX_PRIMARY"]*1; // max=25
		MAX_ELEMENTAL = ml_data["MAX_ELEMENTAL"]*1; // max=50
		MAX_CHAOS = ml_data["MAX_CHAOS"]*1; // max=20

		ENABLE_AUTO_NEXT_MONSTER = ml_data["next_monster"];

	}


}

reload_data();

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

function $id(id){return document.getElementById(id);}
function $qs(q,n){return (n||document).querySelector(q);}
function $qsa(q,n){var r=(n||document).querySelectorAll(q),a=[],i=0,l=r.length;for(i;i<l;i++){a.push(r[i]);}return a;}
function $element(t,p,a,f){var e;if(!t){if(arguments.length>1){e=document.createTextNode(a);a=null;}else{return document.createDocumentFragment();}}else{e=document.createElement(t);}if(a!==null&&a!==undefined){switch(a.constructor){case Number:e.textContent=a;break;case String:e.textContent=a;break;case Array:var a1;a.forEach(function(a0){a1=a0.substr(1);switch(a0[0]){case "#":e.id=a1;break;case ".":e.className=a1;break;case "/":e.innerHTML=a1;break;case " ":e.textContent=a1;break;}});break;case Object:var ai,av,es,esi;for(ai in a){av=a[ai];if(av&&av.constructor===Object){if(ai in e){es=e[ai];}else{es=e[ai]={};}for(esi in av){es[esi]=av[esi];}}else{if(ai==="style"){e.style.cssText=av;}else if(ai in e){e[ai]=av;}else{e.setAttribute(ai,av);}}}break;}}if(f){if(f.constructor===Function){e.addEventListener("click",f,false);}else if(f.constructor===Object){var fi;for(fi in f){e.addEventListener(fi,f[fi],false);}}}if(p){var p0,p1;if(p.nodeType===1||p.nodeType===11){p0=p;p1=null;}else if(p.constructor===Array){p0=p[0];p1=p[1];if(!isNaN(p1)){p1=p0.childNodes[parseInt(p1,10)];}}p0.insertBefore(e,p1);}return e;}
function time_format(t){t=parseInt(t/1000);return parseInt(t/3600)+":"+(100+parseInt(t%3600/60)).toString().substr(1)+":"+(100+t%60).toString().substr(1);}
function date_format(t){t=new Date(t);return t.getFullYear().toString().substr(2)+"-"+(t.getMonth()+101).toString().substr(1)+"-"+(t.getDate()+100).toString().substr(1)+" "+(t.getHours()+100).toString().substr(1)+":"+(t.getMinutes()+100).toString().substr(1);}




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
				//_div.classList["add"]("doing");
				//vTD.appendChild(_div);
			}
			
			

			var req = {
                type: "POST",	
                tag: [],	
                url: "http://hentaiverse.org/?s=Bazaar&ss=ml&slot=", 
                param: "", 
                callback: checkState,
                repeat: 1, 
                elm: null, 
                text: vValue+" (#)"
            };

            //param: "crystal_upgrade=pa_wis", 
            req.param = vMainData.param+vValue;

            if(nowStat < vMainData.max){

                if(nowStat < vMaxSetting){
                    var loop = vMaxSetting - nowStat;
					//console.log('vValue:'+vValue+' loop:'+loop);
                    var haveTag = false;
                    for(var i=0;i<loop;i++){
                        vTag.push(vSlot);
                        haveTag = true;
                    }

                    if(haveTag){
						if(_div){
							_div.classList["add"]("doing");
							vTD.appendChild(_div);
							req.elm = _div;
						}

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
				//_div.classList["add"]("doing");
				//vTD.appendChild(_div);
			}

			var req = {
                type: "POST",	
                tag: [],	
                url: "http://hentaiverse.org/?s=Bazaar&ss=ml&slot=", 
                param: "", 
                callback: checkState,
                repeat: 1,
                elm: null, 
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
						if(_div){
							_div.classList["add"]("doing");
							vTD.appendChild(_div);
							req.elm = _div;
						}

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
				//_div.classList["add"]("doing");
				//document.getElementById('mainpane').insertBefore(_div, spTable);
				//spTable.appendChild(_div);
				//vTD.appendChild(_div);
			}

            var req = {
                type: "POST",	
                tag: [],	
                url: "http://hentaiverse.org/?s=Bazaar&ss=ml&slot=", 
                param: "", 
                callback: checkState,
                repeat: 1, 
                elm: null, 
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
						if(_div){
							_div.classList["add"]("doing");
							vTD.appendChild(_div);
							req.elm = _div;
						}
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


GM_addStyle(
	".ml_st {position:absolute;top:22px;left:1244px;cursor:pointer;}"+
	".ml_mst {z-index:1100;outline:opx; zIndex:1002; height:324px; width:480px; top:13px; display:none; left:760px; position:absolute; background-color:#C8CA8C}"
);


function genLetGoMonBtn(){

	//console.log(vPri);
	//console.log(vElem);
	//console.log(vChaos);
	//console.log('ENABLE_AUTO_NEXT_MONSTER : '+ENABLE_AUTO_NEXT_MONSTER);


	if(document.querySelectorAll("#left_pane table").length < 1) return;

	var data = {MAX_PRIMARY:10, MAX_ELEMENTAL:23, MAX_CHAOS:0};
	var load = localStorage.getItem("MS_monsterSetting");
	if (load) data = JSON.parse(load);


    var linkx = document.createElement("a");
    linkx.href = "javascript:void(0)";
    var linkText = document.createTextNode("Pri["+MAX_PRIMARY+"] Ele["+MAX_ELEMENTAL+"] Chos["+MAX_CHAOS+"]");
    linkx.appendChild(linkText);
    linkx.id = "ltmon";
    //linkx.style.position = "absolute";
    //linkx.style.top = "22px";
    //linkx.style.left = "1244px";
    //linkx.style.cursor = "pointer";

    linkx.addEventListener('click', function() {
        localStorage.setItem("MS_monsterLetGo", true);

		var nowMon = document.querySelector('#mainpane div.fd4').textContent;

		localStorage.setItem("MS_monster_start", nowMon);
        window.location.href = window.location.href;
    });

    //var dpc = document.getElementsByClassName('stuffbox csp')[0].appendChild(linkx);

	var _div_main = $element("div",document.getElementsByClassName('stuffbox csp')[0],[".ml_st"]);
		_div_main.appendChild(linkx);

	var _div_setting = $element("div",document.getElementsByClassName('stuffbox csp')[0],[".ml_mst"]);

	var _div_setting_btn = $element("div",_div_main,{style:"padding-top: 10px;"});

		$element("input",_div_setting_btn,{type:"button",value:"..."},function(){
			
            _div_setting.style.display = "block";

            // divOverlay
            var nDivOlay = document.createElement("div");
            nDivOlay.id = "divOptionsOverlayTHV";
            nDivOlay.style.width = window.outerWidth + "px"; //"100%";
            nDivOlay.style.height = window.outerHeight + "px"; //"100%";
            nDivOlay.style.zIndex = "1001";

            nDivOlay.style.position = "absolute";
            nDivOlay.style.top = "0";
            nDivOlay.style.left = "0";
            nDivOlay.style.background = "black";
            nDivOlay.style.opacity = "0.5";

            document.body.appendChild(nDivOlay);
			
		});

	var mTable =  $element("TABLE",_div_setting);
	var mTR =  $element("tr",mTable);

	var mTDLeft =  $element("td",mTR,{valign:"top"});
	var mTDRight = $element("td",mTR,{valign:"top"});
	var mTDRight2 = $element("td",mTR,{valign:"top"});
	var mTDRight3 = $element("td",mTR,{valign:"top"});

	var	pri_type = ["pa_str", "pa_dex", "pa_agi", "pa_end", "pa_int", "pa_wis"];
	var elem_type = ["er_fire", "er_cold", "er_elec", "er_wind", "er_holy", "er_dark"];
	var chaos_type = ["affect", "damage", "atkspd", "accur", "cevbl", "cpare", "health", "parry", "resist", "evade", "phymit", "magmit"];

	//pri stat Zone
	var mLPriTable = $element("TABLE",mTDLeft);//document.createElement("TABLE");
	for(m in pri_type){
		//console.log(m);
		var tr = $element("tr",mLPriTable);
		var td1 = $element("td",tr);
			td1.innerHTML = pri_type[m];

		var td2 = $element("td",tr);
		var chkb = $element("input",td2,{type:"checkbox",value:pri_type[m]},function(){
			data[this.value] = this.checked;
			localStorage.setItem("MS_monsterSetting", JSON.stringify(data));
		});

		if(data[pri_type[m]]) chkb.checked = data[pri_type[m]];

		mLPriTable.appendChild(tr);
	}

	//mTDLeft.appendChild(mLPriTable);



	//elem stat Zone
	var mRElemTable = $element("TABLE",mTDRight);//document.createElement("TABLE");
	for(m in elem_type){
		//console.log(m);
		var tr = $element("tr",mRElemTable);
		var td1 = $element("td",tr);
			td1.innerHTML = elem_type[m];

		var td2 = $element("td",tr);
		var chkb = $element("input",td2,{type:"checkbox",value:elem_type[m]},function(){
			data[this.value] = this.checked;
			localStorage.setItem("MS_monsterSetting", JSON.stringify(data));
		});

		if(data[elem_type[m]]) chkb.checked = data[elem_type[m]];

		mRElemTable.appendChild(tr);
	}

	//mTDRight.appendChild(mRElemTable);

	//chaos stat Zone
	var mRChaosTable = $element("TABLE",mTDRight2);//document.createElement("TABLE");
	for(m in chaos_type){
		//console.log(m);
		var tr = $element("tr",mRChaosTable);
		var td1 = $element("td",tr);
			td1.innerHTML = chaos_type[m];

		var td2 = $element("td",tr);
		var chkb = $element("input",td2,{type:"checkbox",value:chaos_type[m]},function(){
			data[this.value] = this.checked;
			localStorage.setItem("MS_monsterSetting", JSON.stringify(data));
		});

		if(data[chaos_type[m]]) chkb.checked = data[chaos_type[m]];

		mRChaosTable.appendChild(tr);
	}

	//mTDRight2.appendChild(mRChaosTable);

	/*var MAX_PRIMARY = 10; // max=25
		var MAX_ELEMENTAL = 23; // max=50
		var MAX_CHAOS = 0; // max=20 */
	var parameter_settings = ["MAX_PRIMARY", "MAX_ELEMENTAL", "MAX_CHAOS"];

	var mRParaTable = $element("TABLE",mTDRight3);//document.createElement("TABLE");
	for(m in parameter_settings){
		//console.log(m);
		var tr = $element("tr",mRParaTable);
		var td1 = $element("td",tr);
			td1.innerHTML = parameter_settings[m];

		var td2 = $element("td",tr);
		var max = 20;
		if("MAX_PRIMARY" === parameter_settings[m]){
			max = 10;
		}else if("MAX_ELEMENTAL" === parameter_settings[m]){
			max = 50;
		}

		$element("input",td2,{type:"number",min:0,max:max,id:parameter_settings[m],value:data[parameter_settings[m]],style:"width: 40px;"},{keyup:function(){
			data[this.id] = this.value;
			localStorage.setItem("MS_monsterSetting", JSON.stringify(data));
		},click:function(){
			data[this.id] = this.value;
			localStorage.setItem("MS_monsterSetting", JSON.stringify(data));
		}});

		mRParaTable.appendChild(tr);
	}


	//var mR3Table = $element("TABLE",mTDRight3);
	var ttr = $element("tr",mRParaTable);
	var tdd1 = $element("td",ttr);
	    tdd1.innerHTML = "Auto next monster";
	var tdd2 = $element("td",ttr);

	var chkNM = $element("input",tdd2,{type:"checkbox",value:"next_monster"},function(){
			data[this.value] = this.checked;
			localStorage.setItem("MS_monsterSetting", JSON.stringify(data));
		});

	if(data["next_monster"]) chkNM.checked = data["next_monster"];

	

	var ttrSave = $element("tr",mRParaTable);
	var tddSave = $element("td",ttrSave);
	$element("input",tddSave,{type:"button",value:"..Close.."},function(){
		reload_data();

		linkx.textContent = "Pri["+MAX_PRIMARY+"] Ele["+MAX_ELEMENTAL+"] Chos["+MAX_CHAOS+"]";

	    _div_setting.style.display = "none";
			
	    var elementDel = $id("divOptionsOverlayTHV");
	    elementDel.parentNode.removeChild(elementDel);
			
	});



}

/*
function saveSetting(){


}
*/

var letGo = "false";

if(!localStorage.getItem("MS_monsterLetGo")){
    localStorage.setItem("MS_monsterLetGo", false);
}else{
    letGo = localStorage.getItem("MS_monsterLetGo");
}

if(letGo === "false"){
    genLetGoMonBtn();
}else if(document.querySelector('#slot_pane')){
	localStorage.setItem("MS_monsterLetGo", false);
}else if(document.querySelector('#mainpane div.fd4')){

    var nowMon = document.querySelector('#mainpane div.fd4').textContent;

	var nowMonStart = localStorage.getItem("MS_monster_start");

	if(nowMon == nowMonStart) localStorage.setItem("MS_monster_start", nowMonStart+'x');

    if( (nowMon+'x') !== nowMonStart){
		

		localStorage.setItem("MS_monsterLetGo", false);

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
		//console.log('( '+nowMon+' ) Time = '+vTimeout);

		if(vTimeout > 0){
			/*
			setTimeout(function() {
				location.href = location.href;
			}, (vTimeout*1000));
			*/
			setInterval(function() {

				var TotalDoing = document.querySelectorAll('div.doing').length;

				if(TotalDoing === 0){
					if(ENABLE_AUTO_NEXT_MONSTER){
						localStorage.setItem("MS_monsterLetGo", true);
					}
					
					if((nowMon == nowMonStart) && ENABLE_AUTO_NEXT_MONSTER){
						localStorage.setItem("MS_monsterLetGo", true);
						document.querySelector('img[src="/y/monster/next.png"]').click();
					}else{
						location.href = location.href;
					}

					
					
				}

			}, 1*1000);
			

		}else{
			if(ENABLE_AUTO_NEXT_MONSTER){
				localStorage.setItem("MS_monsterLetGo", true);
				document.querySelector('img[src="/y/monster/next.png"]').click();
			}else{
				location.href = location.href;
			}
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
        localStorage.setItem("MS_monsterLetGo", false);

		genLetGoMonBtn();
    }



}
