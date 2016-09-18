// ==UserScript==
// @name           HV Utils mod v2
// @namespace      HV Utils
// @date           2015-12-17
// @author         sssss2
// @include        http://hentaiverse.org/*
// @include        http://alt.hentaiverse.org/*
// @exclude        http://hentaiverse.org/?hvbh
// @exclude        http://alt.hentaiverse.org/?hvbh
// @exclude        http://hentaiverse.org/pages/showequip*
// @exclude        http://alt.hentaiverse.org/pages/showequip*
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// @icon 		http://g.e-hentai.org/favicon.ico
// @updateURL       https://github.com/suvidev/hv/raw/master/HVUT_1.6.1_mod.user.js
// @downloadURL     https://github.com/suvidev/hv/raw/master/HVUT_1.6.1_mod.user.js
// @version        1.6.1.0.20
// ==/UserScript==

var settings = {

template : '$no $name ($lvl)', // $no = [Hea01] $name =  Legendary Onyx Power Helmet of Slaughter <<< [url]...[/url] $lvl = show level required.

minimize : false,
scrollbar : true,

equipment : true,
abilities : true,
training : true,
	trainingCounterPosition : 605, //(top:3, bottom:605)
inventory : true,
	equipSort : true,
	equipColor : true,
equipmentShop : true,
	checkOldEID : 0,
	showResultSalvage : false,	// #1 mod
itemShop : true,
itemShopBot : true,
shrine : true,
monsterLab : true,
	monsterMorale : 6001, //7000
	monsterHunger : 6001, //11000
	disableMorale : false,		// #2 mod
moogleMail : true,
upgrade : true,

arena : true,
itemWorld : true,

enchant : true,
	enchant_weapon : 4,
	enchant_armor : 3,

battle : {
	check :  false,
	"Arena" : {difficulty:"PFUDOR",equip:1,stamina:80},
	"Ring of Blood" : {difficulty:"PFUDOR",equip:1,stamina:80},
	"Grindfest" : {difficulty:"PFUDOR",equip:1,stamina:30},
	"Item World" : {difficulty:"",equip:1,stamina:30}
},

equipSorter : {
	category: {"One-handed Weapon":1,"Two-handed Weapon":2,"Staff":3,"Shield":4,"Cloth Armor":5,"Light Armor":6,"Heavy Armor":7,"Obsolete":99},
	type: {
		"Rapier":1,"Axe":2,"Wakizashi":3,"Club":4,"Shortsword":5,"Dagger":6,"Sword Chucks":7,
		"Estoc":1,"Mace":2,"Katana":3,"Longsword":4,"Scythe":5,
		"Katalox Staff":1,"Willow Staff":2,"Oak Staff":3,"Redwood Staff":4,"Ebony Staff":5,
		"Force Shield":1,"Buckler":2,"Kite Shield":3,"Tower Shield":4,
		"Phase":1,"Cotton":2,"Gossamer":3,"Silk":4,
		"Shade":1,"Leather":2,"Kevlar":3,"Dragon Hide":4,
		"Power":1,"Plate":2,"Shield":3
		},
	quality: {"Peerless":1,"Legendary":2,"Magnificent":3,"Exquisite":4,"Superior":5,"Fine":6,"Average":7,"Fair":8,"Crude":9,"Flimsy":10},
	prefix: {
		"Ethereal":1,"Fiery":2,"Arctic":3,"Shocking":4,"Tempestuous":5,"Hallowed":6,"Demonic":7,
		"Radiant":1,"Charged":2,"Frugal":3,"Mystic":4,
		"Agile":1,"Savage":2,"Reinforced":3,"Shielding":4,"Mithril":5,
		"Ruby":11,"Cobalt":12,"Amber":13,"Jade":14,"Zircon":15,"Onyx":16
		},
	suffix: {
		"Slaughter":1,"Balance":2,"Swiftness":3,"the Barrier":4,"the Nimble":5,"the Battlecaster":6,"the Vampire":7,"the Illithid":8,"the Banshee":9,
		"Destruction":1,"Surtr":2,"Niflheim":3,"Mjolnir":4,"Freyr":5,"Heimdall":6,"Fenrir":7,"Focus":8,"the Elementalist":9,"the Heaven-sent":10,"the Demon-fiend":11,"the Earth-walker":12,"the Curse-weaver":13,
		"the Shadowdancer":1,"the Fleet":2,"Negation":3,"the Arcanist":4,
		"Protection":21,"Warding":22,"Dampening":23,"Stoneskin":24,"Deflection":25
		},
	part: {
		"Cap":1,"Robe":2,"Gloves":3,"Pants":4,"Shoes":5,
		"Helmet":1,"Breastplate":2,"Cuirass":2,"Armor":2,"Gauntlets":3,"Greaves":4,"Leggings":4,"Sabatons":5,"Boots":5
		}
},

protectEquips : ["Magnificent && (Power && Slaughter || Radiant)","Legendary","Peerless"],
autoLock : false,

checkBazaars : ["Peerless","Legendary","Magnificent && !Cotton && !Leather && !Plate"],
//checkBazaars : ["Peerless","Legendary && Rapier of Slaughter","Legendary Ethereal && (Katana || Estoc || Mace) && Slaughter","Legendary Fiery Redwood && (Destruction||Surtr||Elementalist)","Legendary Arctic Redwood && (Destruction||Niflheim||Elementalist)","Legendary Shocking && (Redwood||Willow) && (Destruction||Mjolnir||Elementalist)","Legendary Tempestuous && (Redwood||Willow) && (Destruction||Freyr||Elementalist)","Legendary Hallowed && (Katalox||Oak) && (Destruction||Heimdall||Heaven-sent)","Legendary Demonic && (Katalox||Willow) && (Destruction||Fenrir||Demon-fiend)","Legendary && Force Shield","Legendary && (Frugal || Mystic || Charged || Radiant) && Phase","Legendary && (Frugal || Charged) && (Elementalist || Heaven-sent || Demon-fiend)","Legendary && (Agile || Savage) && Shadowdancer","Legendary && Power && Slaughter"],


hideItem : ["Infusion of","Scroll of","Flower Vase","Bubble-Gum","ManBearPig Tail","Holy Hand Grenade of Antioch","Mithra's Flower","Dalek Voicebox","Lock of Blue Hair","Bunny-Girl Costume","Hinamatsuri Doll","Broken Glasses","Black T-Shirt","Sapling","Unicorn Horn","Noodly Appendage","Crystal of","Monster Chow","Monster Edibles","Monster Cuisine","Happy Pills","Crystallized Phazon","Shade Fragment","Repurposed Actuator","Defense Matrix Modulator","Binding of","Figurine","Draught","Potion","Elixir","Last Elixir","Energy Drink","Precursor Artifact","Soul Fragment"],

hideShop : ["Draught","Potion","Elixir","Crystal of","Monster Chow","Monster Edibles","Monster Cuisine","Happy Pills","Featherweight Shard"],

hideShrine : ["Figurine"],


price : {

	"Salvage" : {
		"Energy Cell":180,
		"Energy Cell Chance":0.4, // 0.1 ~ 1.0

		"Scrap Cloth":90,
		"Scrap Leather":85,
		"Scrap Metal":80,
		"Scrap Wood":90,

		"Low-Grade Cloth":200,
		"Mid-Grade Cloth":600,
		"High-Grade Cloth":20000,

		"Low-Grade Leather":200,
		"Mid-Grade Leather":550,
		"High-Grade Leather":1000,

		"Low-Grade Metal":200,
		"Mid-Grade Metal":600,
		"High-Grade Metal":2000,

		"Low-Grade Wood":200,
		"Mid-Grade Wood":600,
		"High-Grade Wood":2000,
	},

	"Trophies" : {
		"ManBearPig Tail":500,
		"Holy Hand Grenade of Antioch":500,
		"Mithra's Flower":500,
		"Dalek Voicebox":500,
		"Lock of Blue Hair":750,
		"Bunny-Girl Costume":1000,
		"Hinamatsuri Doll":1000,
		"Broken Glasses":1000,
		"Sapling":3000,
		"Black T-Shirt":3000,
		"Unicorn Horn":6000,
		"Noodly Appendage":25000,
	},

	"Crystal Pack" : {
		"Crystal of Vigor":4,
		"Crystal of Finesse":4,
		"Crystal of Swiftness":4,
		"Crystal of Fortitude":4,
		"Crystal of Cunning":4,
		"Crystal of Knowledge":4,
		"Crystal of Flames":2.5,
		"Crystal of Frost":2.5,
		"Crystal of Lightning":2.5,
		"Crystal of Tempest":2.5,
		"Crystal of Devotion":2.5,
		"Crystal of Corruption":2.5,
	},


},

}

// END OF SETTING


if($id("togpane_log") || $id("riddleform")) {
	return;
}

function $id(id){return document.getElementById(id);}
function $qs(q,n){return (n||document).querySelector(q);}
function $qsa(q,n){var r=(n||document).querySelectorAll(q),a=[],i=0,l=r.length;for(i;i<l;i++){a.push(r[i]);}return a;}
function $element(t,p,a,f){var e;if(!t){if(arguments.length>1){e=document.createTextNode(a);a=null;}else{return document.createDocumentFragment();}}else{e=document.createElement(t);}if(a!==null&&a!==undefined){switch(a.constructor){case Number:e.textContent=a;break;case String:e.textContent=a;break;case Array:var a1;a.forEach(function(a0){a1=a0.substr(1);switch(a0[0]){case "#":e.id=a1;break;case ".":e.className=a1;break;case "/":e.innerHTML=a1;break;case " ":e.textContent=a1;break;}});break;case Object:var ai,av,es,esi;for(ai in a){av=a[ai];if(av&&av.constructor===Object){if(ai in e){es=e[ai];}else{es=e[ai]={};}for(esi in av){es[esi]=av[esi];}}else{if(ai==="style"){e.style.cssText=av;}else if(ai in e){e[ai]=av;}else{e.setAttribute(ai,av);}}}break;}}if(f){if(f.constructor===Function){e.addEventListener("click",f,false);}else if(f.constructor===Object){var fi;for(fi in f){e.addEventListener(fi,f[fi],false);}}}if(p){var p0,p1;if(p.nodeType===1||p.nodeType===11){p0=p;p1=null;}else if(p.constructor===Array){p0=p[0];p1=p[1];if(!isNaN(p1)){p1=p0.childNodes[parseInt(p1,10)];}}p0.insertBefore(e,p1);}return e;}
function ajax(url,post,onload,onerror,headers){GM_xmlhttpRequest({method:post?"POST":"GET",url:url,data:post||"",headers:(headers=headers||{},(post?headers["Content-Type"]="application/x-www-form-urlencoded":null),headers),onload:onload,onerror:onerror});}
function time_format(t){t=parseInt(t/1000);return parseInt(t/3600)+":"+(100+parseInt(t%3600/60)).toString().substr(1)+":"+(100+t%60).toString().substr(1);}
function date_format(t){t=new Date(t);return t.getFullYear().toString().substr(2)+"-"+(t.getMonth()+101).toString().substr(1)+"-"+(t.getDate()+100).toString().substr(1)+" "+(t.getHours()+100).toString().substr(1)+":"+(t.getMinutes()+100).toString().substr(1);}

var getValue,setValue,deleteValue;
(function(){
var p = "hvut-";
getValue = function(k,d){var v=localStorage.getItem(p+k);return v===null?d:JSON.parse(v);};
setValue = function(k,v){localStorage.setItem(p+k,JSON.stringify(v));};
deleteValue = function(k){localStorage.removeItem(p+k);};
})();


var loc = {};
if(location.search) {
	location.search.substr(1).split("&").forEach(function(q){
		q = q.split("=");
		loc[decodeURIComponent(q[0])] = decodeURIComponent(q[1]);
	});
}

var unsafe_input;


// Init
var _ch = {},
	_eq = {},
	_ab = {},
	_tr = {},
	_it = {},
	_in = {},
	_se = {},

	_es = {},
	_is = {},
	_ib = {},
	_ml = {},
	_ss = {},
	_mm = {},
	_lt = {},
	_la = {},

	_battle = {},
	_ar = {},
	_rb = {},
	_gr = {},
	_iw = {},

	_re = {},
	_up = {},
	_en = {},
	_sa = {},
	_fo = {};


var cit = $qsa(".cit");

var player = {
	stamina : Number(cit[0].rows[0].textContent.trim().match(/Stamina: (\d+)/)[1]),
	difficulty : cit[1].rows[1].textContent.trim(),
	level : Number(cit[2].rows[0].textContent.match(/Level (\d+)/)[1]),
	title : cit[2].rows[1].textContent.trim(),
	remain_exp : Number(cit[3].rows[1].textContent.replace(/\D/g,"")),
	credits : Number(cit[4].rows[1].textContent.replace(/\D/g,"")),
};


GM_addStyle(
	"body:not(.hvut-show) .hvut-hide {display:none}" +
	".hvut-none {display:none}" +
	".cit {position:relative}" +
	"input.hvut-show {position:absolute; top:4px; left:1100px}"
);

if(settings.scrollbar) {
	GM_addStyle(".cspp {overflow-y:auto !important}");
}
if(settings.minimize && $id("navbar")) {
	$id("navbar").insertBefore($id("navbar").children[2],$id("navbar").children[0]);
}

$qsa("input,textarea").forEach(function(i){
	i.addEventListener("keypress",function(e){e.stopPropagation();});
});


// Parser: Equipment name and div
var equip_parser = {
quality:"Flimsy|Crude|Fair|Average|Fine|Superior|Exquisite|Magnificent|Legendary|Peerless",
ethereal:"Ethereal",
elemental:"Fiery|Arctic|Shocking|Tempestuous|Hallowed|Demonic|Ruby|Cobalt|Amber|Jade|Zircon|Onyx",
prefix:"Charged|Frugal|Radiant|Mystic|Agile|Reinforced|Savage|Shielding|Mithril",
OneHanded:"Axe|Club|Rapier|Shortsword|Wakizashi|Dagger|Sword Chucks",
TwoHanded:"Estoc|Longsword|Mace|Katana|Scythe",
Staff:"Oak Staff|Redwood Staff|Willow Staff|Katalox Staff|Ebony Staff",
Shield:"Buckler|Kite Shield|Force Shield|Tower Shield",
Cloth:"Cotton|Phase|Gossamer|Silk",
Light:"Leather|Shade|Kevlar|Dragon Hide",
Heavy:"Plate|Power|Shield",
part:"Cap|Robe|Gloves|Pants|Shoes|Helmet|Breastplate|Gauntlets|Leggings|Boots|Cuirass|Armor|Greaves|Sabatons"
};

equip_parser.reg_name = new RegExp("^("+equip_parser.quality+")(?: (?:("+equip_parser.ethereal+")|("+equip_parser.elemental+")|("+equip_parser.prefix+")))? (?:("+equip_parser.OneHanded+")|("+equip_parser.TwoHanded+")|("+equip_parser.Staff+")|("+equip_parser.Shield+")|(?:(?:("+equip_parser.Cloth+")|("+equip_parser.Light+")|("+equip_parser.Heavy+")) ("+equip_parser.part+")))(?: of (.+))?$","i");

equip_parser.name = function(name) {
	var exec = equip_parser.reg_name.exec(name);
	return !exec ? {category:"Obsolete",name:name} : {
		name : name,
		quality : exec[1],
		//ethereal : exec[2],
		//elemental : exec[3],
		//prefix : exec[4],
		prefix : exec[2] || exec[3] || exec[4],
		category : exec[5]?"One-handed Weapon" : exec[6]?"Two-handed Weapon" : exec[7]?"Staff" : exec[8]?"Shield" : exec[9]?"Cloth Armor" : exec[10]?"Light Armor" : exec[11]?"Heavy Armor" : "",
		//query : exec[5]?"1handed" : exec[6]?"2handed" : exec[7]?"staff" : exec[8]?"shield" : exec[9]?"acloth" : exec[10]?"alight" : exec[11]?"aheavy" : "",
		type : exec[5] || exec[6] || exec[7] || exec[8] || exec[9] || exec[10] || exec[11],
		rarity : exec[8]==="Force Shield" || exec[9]==="Phase" || exec[10]==="Shade" || exec[11]==="Power",
		part : exec[12],
		suffix : exec[13]
	};
};

equip_parser.real_names = getValue("equip_names",{});

equip_parser.reg_onmouseover = /<div class="e1">(.+?) &nbsp; &nbsp; (?:Level (\d+|Unassigned))? &nbsp; &nbsp; <span style=(?:"font-weight:normal"|"color:red")>(Tradeable|Untradeable|Soulbound)<\/span><\/div><div class="e1">Condition: (\d+) \/ (\d+) \(\d+%\) &nbsp; &nbsp; Potency Tier: (\d+) \((?:(\d+) \/ (\d+)|MAX)\).+equips\.set\((\d+), '(\w+)'\)/;

equip_parser.div = function(div) {
	var mouseover = div.getAttribute("onmouseover"),
		click = div.getAttribute("onclick"),
		exec = equip_parser.reg_onmouseover.exec( mouseover );

	return {
		name : div.textContent.trim(),
		category : exec[1],
		bound : Number(exec[2]),
		unassigned : typeof(exec[2])==='undefined'?'soulbound':exec[2],
		tradeable : exec[3]==="Tradeable",
		soulbound : exec[3]==="Soulbound",
		cdt : exec[4]*100/exec[5],
		cdt1 : Number(exec[4]),
		cdt2 : Number(exec[5]),
		level : Number(exec[6]),
		pxp1 : Number(exec[7]),
		pxp2 : Number(exec[8]),
		eid : exec[9],
		key : exec[10],
		price : click && click.match(/_pane', \d+, \d+, (\d+),/) && Number(RegExp.$1)
	};
};

equip_parser.factor = {
	"Attack Damage" : 16+2/3,
	"Magic Damage" :  22.75,
	"Attack Accuracy" : 5000,
	"Magic Accuracy" : 5000,
	"Attack Crit Chance" : 2000,
	"Magic Crit Chance" : 2000,
	"Physical Mitigation" : 2000,
	"Magical Mitigation" : 2000,
	"Evade Chance" : 2000,
	"Block Chance" : 2000,
	"Parry Chance" : 2000,
	"Resist Chance" : 2000,
	"Spell Damage" : 200,
	"Proficiency" : 35+5/7,
	"Primary Attributes" : 35+5/7,
};

equip_parser.stat = function(data) {
	var stat = {"Spell Damage":{},"Proficiency":{},"Damage Mitigations":{},"Primary Attributes":{}},
		mouseover = data.div.getAttribute("onmouseover"),
		_div = $element("div",null,["/"+mouseover.substring(mouseover.indexOf("<div>")+5, mouseover.lastIndexOf("</div>"))]),
		level = data.bound || player.level;

	$qsa(".e2 > strong",_div).some(function(e){
		if(e.textContent.match(/^(\d+) .+ Damage$/)) {
			stat["Attack Damage"] = Number(RegExp.$1) / (1 + level/equip_parser.factor["Attack Damage"]);
			return true;
		}
	});

	$qsa(".e3 strong",_div).forEach(function(e){
		var text = e.parentNode.previousElementSibling.textContent,
			number = Number(e.textContent),
			factor = equip_parser.factor[text];
		stat[text] = factor ? number / (1 + level/factor) : number;
	});

	$qsa(".e5",_div).forEach(function(e){
		var type = e.firstElementChild.textContent,
			factor = equip_parser.factor[type];
		$qsa("strong",e).forEach(function(e){
			var text = e.previousSibling.textContent.replace(/ \+$/,""),
				number = Number(e.textContent);
			stat[type][text] = factor ? number / (1 + level/factor) : number;
		});
	});

	data.stat = stat;
};

function equip_filter(name,filter) {
	return filter.some(function(c){return eval(c.toLowerCase().replace(/[A-Za-z\- ]+/g,function(s){s=s.trim();return !s?"":name.toLowerCase().indexOf(s)===-1?false:true;}));});
}


// Coloring Equipment
if(settings.equipColor) {

GM_addStyle(
	".eqspd {overflow:hidden}" +
	".hvut-equip-Exquisite {background-color:#cf9}" +
	".hvut-equip-Magnificent {background-color:#9cf}" +
	".hvut-equip-Legendary {background-color:#faa}" +
	".hvut-equip-Peerless {background-color:#000; color:#fff !important}" +
	".hvut-real-name:before {content:'[ '}" +
	".hvut-real-name:after {content:' ]'}"
);

function equip_color(e) {
	$qsa(".eqdp, .eqde",e).forEach(function(div){
		var d = $qs(".fd2 > div",div),
			eid = div.id.match(/^(\d+)/) && RegExp.$1 || equip_parser.div(div).eid,
			name = d.textContent.trim(),
			real_name = equip_parser.real_names[eid];

		if(real_name && real_name!==name) {
			d.classList.add("hvut-real-name");
			d.addEventListener("mouseenter",function(){d.textContent=real_name;});
			d.addEventListener("mouseleave",function(){d.textContent=name;});
		}

		d.classList.add("hvut-equip-"+(real_name||name).split(" ")[0]);
	});
}

equip_color();

}


// Training Counter
var trainer = {

value : getValue("trainer",{}),

get_level : function(html,name) {
	var idx_s = html.indexOf(name+"</div></div></td>");
	var tr = $element("tr",null,["/"+html.substring(html.indexOf("<td",idx_s),html.indexOf("</tr",idx_s))]);
	return Number(tr.cells[tr.cells.length-4].textContent);
},

clock : function() {
	var remain = parseInt(trainer.value.eta-Date.now());
	if(remain > 0) {
		trainer.time_span.textContent = time_format(remain);
		setTimeout(trainer.clock,1000);

	} else {
		ajax("/?s=Character&ss=tr",null,function(r){
			var html = r.responseText,
				msg,delay;

			if(html.indexOf('<form id="trainform"') === -1) {
				msg = "Waiting...";
				delay = 60000;

			} else if( html.match(/Training <strong>(.+?)<\/strong>/) ) {
				trainer.value.name = RegExp.$1;
				trainer.value.level = trainer.get_level(html,trainer.value.name);
				trainer.value.eta = Date.now() + (Number(html.match(/var end_time = (\d+);/) && RegExp.$1) - Number(html.match(/var start_time = (\d+);/) && RegExp.$1)) * 1000;
				setValue("trainer",trainer.value);

				trainer.name_span.textContent = trainer.value.name;
				trainer.level_span.textContent = "("+trainer.value.level+" -> "+(trainer.value.to||(trainer.value.level+1))+")";

				delay = 10000;

			} else if(trainer.value.reserved) {
				if(trainer.get_level(html,trainer.value.reserved) < trainer.value.to) {
					if(html.indexOf('onclick="training.start_training('+trainer.value.id+')"') !== -1) {
						ajax("/?s=Character&ss=tr","trainid="+trainer.value.id,function(){trainer.clock();},function(){trainer.clock();});

					} else {
						msg = "Not enough Credits!";
						delay = 60000;
					}

				} else {
					delete trainer.value.reserved;
					delete trainer.value.id;
					delete trainer.value.to;
					setValue("trainer",trainer.value);

					msg = "Completed!";
				}

			} else {
				msg = "Completed!";
			}

			if(msg) {
				trainer.time_span.textContent = msg;
			}
			if(delay) {
				setTimeout(trainer.clock,delay);
			}

		},function(){setTimeout(trainer.clock,1000);});
	}
}

};

if(settings.training && (trainer.value.name || trainer.value.reserved)) {
	trainer.counter_div = $element("div",document.body,{style:"position:absolute; top:"+settings.trainingCounterPosition+"px; left:3px; box-sizing:border-box; width:150px; height:100px; font-size:10pt; color:#c00; background-color:#edebdf; line-height:1.6; padding-top:5px"});
	$element("",trainer.counter_div,"Training");
	$element("br",trainer.counter_div);
	trainer.name_span = $element("span",trainer.counter_div,trainer.value.name || "-");
	$element("br",trainer.counter_div);
	trainer.level_span = $element("span",trainer.counter_div,trainer.value.name ? "("+trainer.value.level+" -> "+(trainer.value.name===trainer.value.reserved?trainer.value.to:trainer.value.level+1)+")" : "-");
	$element("br",trainer.counter_div);
	trainer.time_span = $element("span",trainer.counter_div,"Initializing...");

	trainer.clock();
}


// Equipment
var equip = {
	value : getValue("equipment",{current:[0],list:["---"]})
};

if(settings.equipment && loc.s==="Character" && loc.ss==="eq" && !loc.slot) {

GM_addStyle(
	".hvut-cdt {position:absolute; top:5px; right:5px; padding:0 3px; z-index:2}" +
	".hvut-cdt:hover {text-decoration:underline}" +
	".hvut-repair1 {font-weight:bold; color:#fff; background-color:#f00}" +
	".hvut-repair2 {font-weight:bold; color:#00f}" +
	".hvut-repair3 {font-weight:bold; color:#090}"
);

equip.value.list.length = $id("setform").querySelectorAll("img[src^='/y/equip/set']").length + 1;
equip.value.current = [Number($id("setform").querySelector("img[src$='_on.png']").src.match(/set(\d+)_on\.png/) && RegExp.$1)];

$qsa(".eqde").forEach(function(div){
	var data = equip_parser.div(div);
	data.part = div.previousElementSibling.textContent.trim();
	data.cn = data.cdt<52?" hvut-repair1" : data.cdt<60?" hvut-repair2" : data.cdt<75?" hvut-repair3" : "";

	equip.value.current.push({category:data.category,part:data.part,eid:data.eid,key:data.key,name:data.name});

	$element("span",div.parentNode,[" "+data.cdt1+" / "+data.cdt2+" ("+data.cdt.toFixed(1)+"%)",".hvut-cdt"+data.cn],function(e){ajax("/?s=Forge&ss=re","select_item="+data.eid,function(){location.href=location.href;});e.stopPropagation();});
});

setValue("equipment",equip.value);

$id("leftpane").firstElementChild.remove();
equip.name_div = $element("div",[$id("leftpane"),0],{style:"height:30px"}),
equip.name_input = $element("input",equip.name_div,{value:equip.value.list[equip.value.current[0]]||("Set "+equip.value.current[0]),style:"width:100px;text-align:center"});
$element("input",equip.name_div,{type:"button",value:"Change"},function(){equip.value.list[equip.value.current[0]]=equip.name_input.value.trim();setValue("equipment",equip.value);});

}


// Setting: Change Difficulty and Equipment set
var difficulty = {};

difficulty.td1 = $qsa(".cit")[1].rows[0].cells[0];
difficulty.td1.style.position = "relative";

difficulty.td2 = $qsa(".cit")[1].rows[1].cells[0];

$element("div",difficulty.td1,{textContent:"["+equip.value.current[0]+": "+(equip.value.list[equip.value.current[0]]||("Set "+equip.value.current[0]))+"]",style:difficulty.td2.firstElementChild.firstElementChild.style.cssText+";position:absolute;top:100%;left:0;width:100%;margin:0;text-align:left"});

difficulty.td2.addEventListener("mouseenter",function(){
	if(!difficulty.div) {
		difficulty.div = $element("div",difficulty.td1,{style:"position:absolute;top:100%;left:0;width:100%;background-color:#edebdf;z-index:1"},{mouseenter:function(){clearTimeout(difficulty.timer);},mouseleave:function(){difficulty.timer=setTimeout(function(){difficulty.div.classList.add("hvut-none");},1000);}});

		difficulty.timer = null;

		difficulty.change_select = $element("select",difficulty.div,{size:7,style:"float:right;width:70px"},{change:function(){
			difficulty.change_select.disabled = true;
			$element("iframe",difficulty.div,{src:"/?s=Character&ss=se&hvut=difficulty&difficulty="+difficulty.change_select.value,style:"position:absolute;width:0;height:0;border:0;visibility:hidden"});
			
			//setInterval(function(){ window.location.href = window.location.href; }, 2000);
			setTimeout(function(){ window.location.href = window.location.href; }, 2000);

		}});

		["Normal","Hard","Nightmare","Hell","Nintendo","IWBTH","PFUDOR"].forEach(function(d,i){$element("option",[difficulty.change_select,0],{value:i,text:d,selected:d===player.difficulty});});

		equip.change_select = $element("select",difficulty.div,{size:equip.value.list.length-1,style:"float:left;width:70px"},{change:function(){
			equip.change_select.disabled = true;

			$element("iframe",difficulty.div,{name:"hvut",style:"position:absolute;width:0;height:0;border:0;visibility:hidden"});
			var form = $element("form",difficulty.div,{method:"POST",action:"/?s=Character&ss=eq&hvut=reload",target:"hvut",style:"position:absolute;width:0;height:0;border:0;visibility:hidden"});
			$element("input",form,{type:"hidden",name:"equip_set",value:equip.change_select.value});
			form.submit();
		}});
		equip.value.list.forEach(function(e,i){
			if(i) {
				$element("option",equip.change_select,{value:i,text:i+": "+(e||("Set "+i))});
			}
		});
		equip.change_select.value = equip.value.current[0];
	}

	difficulty.div.classList.remove("hvut-none");
});


// Abilities
if(settings.abilities && loc.s==="Character" && loc.ss==="ab") {

_ab.data = {
	"HP Tank":{"tier":[0,25,50,75,100,120,150,200,250,300]},
	"MP Tank":{"tier":[0,30,60,90,120,160,210,260,310,350]},
	"SP Tank":{"tier":[0,40,80,120,170,220,270,330,390,450]},
	"Better Health Pots":{"tier":[0,100,200,300,400]},
	"Better Mana Pots":{"tier":[0,80,140,220,380]},
	"Better Spirit Pots":{"tier":[0,90,160,240,400]},
	"1H Damage":{"tier":[0,100,200]},
	"1H Accuracy":{"tier":[50,150]},
	"1H Block":{"tier":[250]},
	"2H Damage":{"tier":[0,100,200]},
	"2H Accuracy":{"tier":[50,150]},
	"2H Parry":{"tier":[250]},
	"DW Damage":{"tier":[0,100,200]},
	"DW Accuracy":{"tier":[50,150]},
	"DW Crit":{"tier":[250]},
	"Staff Spell Damage":{"tier":[0,100,200]},
	"Staff Accuracy":{"tier":[50,150]},
	"Staff Damage":{"tier":[0]},
	"Cloth Spellacc":{"tier":[120]},
	"Cloth Spellcrit":{"tier":[0,40,90,130,190]},
	"Cloth Castspeed":{"tier":[150,250]},
	"Cloth MP":{"tier":[0,60,110,170,230,290,350]},
	"Light Acc":{"tier":[0]},
	"Light Crit":{"tier":[0,40,90,130,190]},
	"Light Speed":{"tier":[150,250]},
	"Light HP/MP":{"tier":[0,60,110,170,230,290,350]},
	"Heavy Crush":{"tier":[0,75,150]},
	"Heavy Prcg":{"tier":[0,75,150]},
	"Heavy Slsh":{"tier":[0,75,150]},
	"Heavy HP":{"tier":[0,60,110,170,230,290,350]},
	"Better Weaken":{"tier":[70,100,130,190,250]},
	"Faster Weaken":{"tier":[80,165,250]},
	"Better Imperil":{"tier":[130,175,230,285,330]},
	"Faster Imperil":{"tier":[140,225,310]},
	"Better Blind":{"tier":[110,130,160,190,220]},
	"Faster Blind":{"tier":[120,215,275]},
	"Mind Control":{"tier":[80,130,170]},
	"Better Silence":{"tier":[120,170,215]},
	"Better MagNet":{"tier":[250,295,340,370,400]},
	"Better Slow":{"tier":[30,50,75,105,135]},
	"Better Drain":{"tier":[20,50,90]},
	"Faster Drain":{"tier":[30,70,110,150,200]},
	"Ether Theft":{"tier":[150]},
	"Spirit Theft":{"tier":[150]},
	"Better Haste":{"tier":[60,75,90,110,130]},
	"Better Shadow Veil":{"tier":[90,105,120,135,155]},
	"Better Absorb":{"tier":[40,60,80]},
	"Stronger Spirit":{"tier":[200,220,240,265,285]},
	"Better Heartseeker":{"tier":[140,185,225,265,305,345,385]},
	"Better Arcane Focus":{"tier":[175,205,245,285,325,365,405]},
	"Better Regen":{"tier":[50,70,95,145,195,245,295,375,445,500]},
	"Better Cure":{"tier":[1,35,65]},
	"Better Spark":{"tier":[100,125,150]},
	"Better Protection":{"tier":[40,55,75,95,120]},
	"Flame Spike Shield":{"tier":[10,65,140,220,300]},
	"Frost Spike Shield":{"tier":[10,65,140,220,300]},
	"Shock Spike Shield":{"tier":[10,65,140,220,300]},
	"Storm Spike Shield":{"tier":[10,65,140,220,300]},
	"Conflagration":{"tier":[50,100,150,200,250,300,400]},
	"Cryomancy":{"tier":[50,100,150,200,250,300,400]},
	"Havoc":{"tier":[50,100,150,200,250,300,400]},
	"Tempest":{"tier":[50,100,150,200,250,300,400]},
	"Sorcery":{"tier":[70,140,210,280,350]},
	"Elementalism":{"tier":[85,170,255,340,425]},
	"Archmage":{"tier":[90,180,270,360,450]},
	"Better Corruption":{"tier":[75,150]},
	"Better Disintegrate":{"tier":[175,250]},
	"Better Ragnarok":{"tier":[250,325,400]},
	"Ripened Soul":{"tier":[150,300,450]},
	"Dark Imperil":{"tier":[175,225,275,325,375]},
	"Better Smite":{"tier":[75,150]},
	"Better Banish":{"tier":[175,250]},
	"Better Paradise":{"tier":[250,325,400]},
	"Soul Fire":{"tier":[150,300,450]},
	"Holy Imperil":{"tier":[175,225,275,325,375]},
};

_ab.list = [];
_ab.url = "/?s=Character&ss=ab";
_ab.reg = /overability\(\d+, '([^']+)'.+?(?:(Not Acquired)|Requires <strong>Level (\d+))/;
_ab.preset = getValue("ab_preset",{});
_ab.current = {};

_ab.message = function(m) {
	_ab.msg.textContent = m;
};

_ab.change = function(preset) {
	_ab.buttons.style.display = "none";
	_ab.target = _ab.preset[preset];

	var ab,name;
	for(name in _ab.data) {
		ab = _ab.data[name];
		_ab.list.push(ab);
		ab.name = name;
	}

	_ab.message("Loading...");
	["general","onehanded","twohanded","dualwield","staff","cloth","light","heavy","deprecating1","deprecating2","supportive1","supportive2","elemental","forbidden","divine"].forEach(function(c){
		_ab.check(c);
	});
};

_ab.check = function(c) {
	ajax(_ab.url+"&tree="+c,null,
		function(r){
			var html = r.responseText;
			var frag = $element(),
				wrap = $element("div",frag,["/"+html.substring(html.indexOf('<div id="botpane"'),html.indexOf('<div id="abinfo"'))]);

			$qsa("div[id^='slot_']",wrap).forEach(function(div){
				var mover = div.getAttribute("onmouseover");
				if(!mover) {
					return;
				}
				var exec = _ab.reg.exec(mover),
					ab = _ab.data[exec[1]];

				ab.id = div.id.substr(5);
				ab.level = exec[2] ? 0 : ab.tier.indexOf(Number(exec[3])) + 1;
				ab.max = ab.tier.length;
				ab.avail = 0;
				ab.tier.some(function(l,i){if(l>player.level){return true;}else{ab.avail=i+1;}});
				ab.to = Math.min(_ab.target[ab.name]||0,ab.avail,ab.max);

				if(ab.slot && !(ab.to && (ab.name==="HP Tank" || ab.name==="MP Tank" || ab.name==="SP Tank"))) {
					_ab.unset(ab);
				} else {
					ab.unset = true;
				}
				if(ab.to < ab.level) {
					_ab.reset(ab);
				} else {
					ab.reset = true;
				}
				if(ab.to === ab.level) {
					ab.unlock = true;
				}
			});
			_ab.set();
		},
		function(){
			_ab.check(c);
		}
	);
};

_ab.unset = function(ab) {
	_ab.message("Unset...: "+ab.name);
	ajax(_ab.url,"equip_slot="+ab.slot+"&equip_ability=0",
		function(){
			_ab.message("Unset: "+ab.name);
			ab.unset = true;
			_ab.set();
		},
		function(){
			_ab.message("Failed to unset: "+ab.name);
			_ab.unset(ab);
		}
	);
};

_ab.reset = function(ab) {
	_ab.message("Reset...: "+ab.name);
	ajax(_ab.url,"reset_ability="+ab.id,
		function(){
			_ab.message("Reset: "+ab.name);
			ab.reset = true;
			ab.level = 0;
			_ab.set();
		},
		function(){
			_ab.message("Failed to reset: "+ab.name);
			_ab.reset(ab);
		}
	);
};

_ab.unlock = function(ab) {
	_ab.message("Unlock...:"+ab.name+" "+(ab.level+1));
	ajax(_ab.url,"unlock_ability="+ab.id,
		function(){
			ab.level++;
			_ab.message("Unlock: "+ab.name+" "+ab.level);
			if(ab.level===ab.to) {
				ab.unlock = true;
				_ab.set();
			} else {
				_ab.unlock(ab);
			}
		},
		function(){
			_ab.message("Failed to unlock: "+ab.name);
			_ab.unlock(ab);
		}
	);
};

_ab.set = function() {
	if(!_ab.list.every(function(ab){return ab.unset && ab.reset;})) {
		return;
	}
	if(!_ab.ready) {
		_ab.ready = true;
		if(_ab.list.every(function(ab){return ab.reset;})) {
			_ab.list.forEach(function(ab){
				if(ab.to > ab.level) {
					_ab.unlock(ab);
				} else {
					ab.unlock = true;
				}
			});
		}
	}
	if(!_ab.list.every(function(ab){return ab.unlock;})) {
		return;
	}

	var ab;
	for(var p in _ab.target) {
		ab = _ab.data[p];
		if(!ab.set) {
			break;
		}
		ab = null;
	}

	if(!ab) {
		_ab.message("Finished!");
		setTimeout(function(){location.href=location.href;},2000);
		return;
	}

	_ab.message("Set...:"+ab.name);
	ajax(_ab.url,"equip_slot=0&equip_ability="+ab.id,
		function(){
			ab.set = true;
			_ab.message("Set: "+ab.name);
			_ab.set();
		},
		function(){
			_ab.message("Failed to set: "+name);
			_ab.set();
		}
	);
};

_ab.add = function() {
	var name = prompt("");
	if(!name || !name.trim()) {
		return;
	}
	_ab.preset[name.trim()] = _ab.current;
	setValue("ab_preset",_ab.preset);
	location.href = location.href;
};

_ab.remove = function(name) {
	delete _ab.preset[name];
	setValue("ab_preset",_ab.preset);
	location.href = location.href;
};


GM_addStyle(
	".hvut-ab-div {position:absolute; top:90px; left:670px; width:360px; text-align:left; line-height:20pt}" +
	".hvut-ab-sub {margin-right:40px}" +
	".hvut-ab-current {font-weight:bold}" +
	".hvut-ab-remove {position:absolute; display:none; margin-left:-1px}" +
	".hvut-ab-sub:hover > .hvut-ab-remove {display:inline-block}" +

	".hvut-ability {position:absolute; bottom:-5px; left:2px; width:30px; background-color:rgba(0,0,0,.8); color:#fff}" +
	".hvut-max {background-color:rgba(0,0,102,.8)}" +
	".hvut-avail {background-color:rgba(0,102,0,.8)}" +
	".hvut-not {background-color:rgba(102,0,0,.8)}"
);


$qsa("#toppane div[id^='slot_']").forEach(function(div){
	var mover = div.getAttribute("onmouseover");
	if(!mover) {
		return;
	}
	var exec = _ab.reg.exec(mover),
		ab = _ab.data[exec[1]];

	ab.slot = div.id.substr(5);
	ab.level = exec[2] ? 0 : ab.tier.indexOf(Number(exec[3])) + 1;
	ab.max = ab.tier.length;
	ab.avail = 0;
	ab.tier.some(function(l,i){if(l>player.level){return true;}else{ab.avail=i+1;}});

	if(ab.level) {
		_ab.current[exec[1]] = ab.level;
	}

	var span = $element("span",div,[".hvut-ability"]);
	if(ab.level === ab.max) {
		span.textContent = "max";
		span.classList.add("hvut-max");
	} else if(ab.level === ab.avail) {
		span.textContent = ab.level+"/"+ab.max;
	} else if(ab.level === 0) {
		span.textContent = ab.level+"/"+ab.max;
		span.classList.add("hvut-not");
	} else {
		span.textContent = ab.level+"/"+ab.max;
		span.classList.add("hvut-avail");
	}
});


_ab.div = $element("div",$id("toppane"),[".hvut-ab-div"]);
_ab.buttons = $element("div",_ab.div);
_ab.msg = $element("div",_ab.div,{style:"font-size:12pt; color:#000"});

(function(){

$element("input",_ab.buttons,{type:"button",value:"[Add]",style:"position:absolute;left:-80px"},function(){_ab.add();});

var sub,preset,
	current_json = JSON.stringify(_ab.current);

for(preset in _ab.preset) {
	sub = $element("span",_ab.buttons,[".hvut-ab-sub"]);
	$element("input",sub,{type:"button",value:preset,className:"hvut-ab-btn"+(JSON.stringify(_ab.preset[preset])===current_json?" hvut-ab-current":"")},(function(p){return function(){_ab.change(p);}})(preset));
	$element("input",sub,{type:"button",value:"X",className:"hvut-ab-remove"},(function(p){return function(){_ab.remove(preset);}})(preset));
}

})();


// Training
} else if(settings.training && loc.s==="Character" && loc.ss==="tr") {

_tr.data = {
	"Adept Learner":{id:50,b:100,l:50,e:0.000417446},
	"Assimilator":{id:51,b:50000,l:50000,e:0.0058690916},
	"Ability Boost":{id:80,b:100,l:100,e:0.0005548607},
	"Manifest Destiny":{id:81,b:1000000,l:1000000,e:0},
	"Scavenger":{id:70,b:500,l:500,e:0.0088310825},
	"Luck of the Draw":{id:71,b:2000,l:2000,e:0.0168750623},
	"Quartermaster":{id:72,b:5000,l:5000,e:0.017883894},
	"Archaeologist":{id:73,b:25000,l:25000,e:0.030981982},
	"Metabolism":{id:84,b:1000000,l:1000000,e:0},
	"Inspiration":{id:85,b:2000000,l:2000000,e:0},
	"Set Collector":{id:96,b:12500,l:12500,e:0}
};

_tr.calc = function() {
	var name = _tr.reserve_select.value,
		to = Number(_tr.to_input.value);
	if(!name || !to) {
		return;
	}

	var data = _tr.data[name],
		level = data.level,
		b = data.b,
		l = data.l,
		e = data.e,
		c = 0;

	if(name === trainer.current) {
		level++;
	}1

	while(level < to) {
		c += Math.ceil(parseInt(Math.pow(b+l*level,1+e*level)*10)/10);
		level++;
	}

	_tr.cost_input.value = c.toLocaleString();
};

_tr.div = $element("div",[$id("trainform").parentNode,$id("trainform")]);
_tr.reserve_select = $element("select",_tr.div,null,{change:function(){if(_tr.reserve_select.value){_tr.to_input.disabled=false;_tr.to_input.value=_tr.to_input.min=_tr.data[_tr.reserve_select.value].level;_tr.to_input.max=_tr.data[_tr.reserve_select.value].max;_tr.calc();}else{_tr.to_input.disabled=true;}}});
_tr.to_input = $element("input",_tr.div,{type:"number",style:"width:50px;text-align:right"},function(){_tr.calc();});

$element("option",_tr.reserve_select,{text:"--Reserve--",value:""});
$element("input",_tr.div,{type:"button",value:"Set"},function(){
	if(_tr.reserve_select.value) {
		trainer.value.reserved = _tr.reserve_select.value;
		trainer.value.id = _tr.data[_tr.reserve_select.value].id;
		trainer.value.to = Number(_tr.to_input.value);

	} else {
		_tr.to_input.value = "";
		delete trainer.value.reserved;
		delete trainer.value.id;
		delete trainer.value.to;
	}

	setValue("trainer",trainer.value);

	location.href = location.href;
});

_tr.cost_input = $element("input",_tr.div,{style:"width:80px;text-align:right;margin-left:20px",readOnly:true});

$qsa("#trainform > table > tbody > tr").forEach(function(tr){
	var cells = tr.cells,
		name,level,max;

	name = cells[0].textContent.trim();
	if(!_tr.data.hasOwnProperty(name)) {
		return;
	}

	level = _tr.data[name].level = Number(cells[4].textContent);
	max = _tr.data[name].max = Number(cells[6].textContent);

	$element("option",_tr.reserve_select,{text:name,value:name});
});


if((_tr.progress=$id("progress_counter_1")) && (_tr.name=_tr.progress.previousElementSibling.textContent) && _tr.data.hasOwnProperty(_tr.name)) {
	_tr.eta = Date.now();
	if(unsafeWindow.MAIN_URL) {
		_tr.eta += (unsafeWindow.end_time - unsafeWindow.start_time) * 1000;
	} else { // for Chrome that doesn't support unsafeWindow
		unsafe_input = $element("input",document.body,{style:"position:absolute;top:0;left:0;width:0;height:0"});
		unsafe_input.setAttribute("onfocus","this.value=JSON.stringify(end_time-start_time);");
		unsafe_input.focus();
		_tr.eta += JSON.parse(unsafe_input.value) * 1000;
		unsafe_input.remove();
	}

	trainer.current = _tr.name;
	trainer.value.name = _tr.name;
	trainer.value.level = _tr.data[_tr.name].level;
	trainer.value.eta = _tr.eta;

} else {
	delete trainer.value.name;
	delete trainer.value.level;
	delete trainer.value.eta;
}

setValue("trainer",trainer.value);

if(trainer.value.reserved) {
	_tr.reserve_select.value = trainer.value.reserved;
	_tr.to_input.value = trainer.value.to;
	_tr.to_input.min = _tr.data[_tr.reserve_select.value].level + 1;
	_tr.to_input.max = _tr.data[_tr.reserve_select.value].max;
	_tr.calc();
}


// Inventory
} else if(settings.inventory && loc.s==="Character" && loc.ss==="in") {

if(settings.equipSort) {

GM_addStyle(
	".hvut-item-Consumable .fd2 > div {color:#00B000 !important}" +
	".hvut-item-Artifact .fd2 > div {color:#0000FF !important}" +
	".hvut-item-Trophy .fd2 > div {color:#461B7E !important}" +
	".hvut-item-Token .fd2 > div {color:#254117 !important}" +
	".hvut-item-Crystal .fd2 > div {color:#BA05B4 !important}" +
	".hvut-item-Monster_Food .fd2 > div {color:#489EFF !important}" +
	".hvut-item-Material .fd2 > div {color:#f00 !important}" +
	".hvut-item-Collectable .fd2 > div {color:#0000FF !important}" +
	
	".hvut-btns {position:absolute; top:0px; left:25%; white-space:nowrap; text-align:left; z-index:8888}" +
	".hvut-btns-tp {position:absolute; top:0px; left:68%; white-space:nowrap; text-align:left; z-index:8888}" +
	".hvut-bf {position:absolute;left:70%;z-index:7777;}" +

	"div#inv_equip > div:after {content:''; display:block; clear:both}" +
	"div.eqpp {padding-top:0}" +
	"div.il, div.ilp, div.iu, div.iup {top:auto; margin-top:1px}" +
	".hvut-category {margin:10px 0 5px; padding:2px 5px; font-size:11pt; color:#fff; background-image:linear-gradient(to bottom, #666, #000); border:1px solid #333; box-shadow:inset 0 0 1px rgba(255,255,255,.5)}" +
	".hvut-type {margin:10px 5px 5px; padding:1px 5px; border:1px solid #333; border-radius:3px; font-size:10pt; color:#000}" +
	".hvut-part {margin-top:3px; padding-top:5px !important; border-top:2px dotted #333}"
);

_in.inv_equip = {};

function n(n){
    return n > 9 ? "" + n: "0" + n;
}

function getBold(txt){
	/*
	var bold = ['Force Shield ','Phase ','Shade ','Power '];
	if(bold.indexOf(txt) !== -1){
		txt = '[b]'+txt+'[/b]';
	}
	*/

	return txt;
}

_in.genTemplate = function (e,no){

	//console.log(e);
	
	var output = settings.template;

	//$name
	//'[url=http://hentaiverse.org/pages/showequip.php?eid='+eid+'&key='+e.key+']'+quality+prefix+type+part+' of '+suffix+'[/url];
	var sName='';

	var quality='';
	var prefix='';
	var type='';
	var part='';
	var suffix='';
	var vOf = 'of ';

	quality = e.quality;
	prefix = e.prefix;
	type = e.type;
	part = e.part;
	suffix = e.suffix;

	if(typeof(quality) !== 'undefined'){ quality = quality+' '}else{quality='';};
	if(typeof(prefix) !== 'undefined'){ prefix = prefix+' '}else{prefix='';};
	if(typeof(type) !== 'undefined'){ type = type+' '}else{type='';};
	if(typeof(part) !== 'undefined'){ part = part+' '}else{part='';};
	if(typeof(suffix) !== 'undefined'){ suffix = suffix;}else{suffix='';vOf='';};


	var Peerless = '[color=#ff0000]P[/color][color=#ff7f00]e[/color][color=#c3c300]e[/color][color=#00ff00]r[/color][color=#00ffff]l[/color][color=#7171ff]e[/color][color=#8b00ff]s[/color][color=#ff0000]s[/color] ';
	if( quality === 'Peerless ') quality=Peerless;

	
	sName = '[url=http://hentaiverse.org/pages/showequip.php?eid='+e.eid+'&key='+e.key+']'+getBold(quality)+getBold(prefix)+getBold(type)+getBold(part)+vOf+getBold(suffix)+'[/url]';

	//$no
	//'['+category+no]'
	var sNo = '';
	switch (e.category) {
		case "One-handed Weapon":
			sNo = '[One'+no+']';
			break;
		case "Two-handed Weapon":
			sNo = '[Two'+no+']';
			break;
		case "Staff":
			sNo = '[Sta'+no+']';
			break;
		case "Shield":
			sNo = '[Shd'+no+']';
			break;
		case "Cloth Armor":
			sNo = '[Clo'+no+']';
			break;
		case "Light Armor":
			sNo = '[Lig'+no+']';
			break;
		case "Heavy Armor":
			sNo = '[Hea'+no+']';
			break;
	}

	var vLvl = e.bound;
	//console.log(vLvl);
	if(e.unassigned === 'Unassigned'){
		vLvl = 'Unassigned';
	}else if(isNaN(vLvl)){
		vLvl = '[b][color=red]Soulbound[/color][/b]';
	}
	
	return output.replace('$name',sName).replace('$no',sNo).replace('$lvl',vLvl)+'<br/>';
	
}

var iOne=1,iTwo=1,iSta=1,iShd=1,iClo=1,iLig=1,iHea=1;

_in.template = function() {

//	var e = _in.inv_equip[eid];
	iOne=1;
	iTwo=1;
	iSta=1;
	iShd=1;
	iClo=1;
	iLig=1;
	iHea=1;

	var count = 0;

	var rtOne = '',rtTwo = '',rtSta = '',rtShd = '',rtClo = '',rtLig = '',rtHea = '';

	var eid, e;
	var nDocument = window.open("", "List").document;
	
	nDocument.body.innerHTML = "";
    for (eid in _in.inv_equip) {
        e = _in.inv_equip[eid];
        if (!e.div.parentNode.classList.contains('hvut-hide') && e.checkbox.checked) {

			count++;
            //_es.sell(eid);
			//console.log(e.checkbox.checked+' eid:'+eid+' key:'+e.key);
			//[Lig02] [url=http://hentaiverse.org/pages/showequip.php?eid=106237764&key=cfe29d35cf]Legendary [b]Agile[/b] Shade Boots of the Arcanist[/url]
			//console.log(e);

			switch (e.category) {
				case "One-handed Weapon":
					rtOne += _in.genTemplate(e,n(iOne++));
					break;
				case "Two-handed Weapon":
					rtTwo += _in.genTemplate(e,n(iTwo++));
					break;
				case "Staff":
					rtSta += _in.genTemplate(e,n(iSta++));
					break;
				case "Shield":
					rtShd += _in.genTemplate(e,n(iShd++));
					break;
				case "Cloth Armor":
					rtClo += _in.genTemplate(e,n(iClo++));
					break;
				case "Light Armor":
					rtLig += _in.genTemplate(e,n(iLig++));
					break;
				case "Heavy Armor":
					rtHea += _in.genTemplate(e,n(iHea++));
					break;
			}

			//nDocument.body.appendChild(document.createElement("div")).innerHTML = _in.genTemplate(e);

        }
    }
	if(rtOne!=='') nDocument.body.appendChild(document.createElement("BR")); nDocument.body.appendChild(document.createElement("div")).innerHTML = rtOne;
	if(rtTwo!=='') nDocument.body.appendChild(document.createElement("BR")); nDocument.body.appendChild(document.createElement("div")).innerHTML = rtTwo;
	if(rtSta!=='') nDocument.body.appendChild(document.createElement("BR")); nDocument.body.appendChild(document.createElement("div")).innerHTML = rtSta;
	if(rtShd!=='') nDocument.body.appendChild(document.createElement("BR")); nDocument.body.appendChild(document.createElement("div")).innerHTML = rtShd;
	if(rtClo!=='') nDocument.body.appendChild(document.createElement("BR")); nDocument.body.appendChild(document.createElement("div")).innerHTML = rtClo;
	if(rtLig!=='') nDocument.body.appendChild(document.createElement("BR")); nDocument.body.appendChild(document.createElement("div")).innerHTML = rtLig;
	if(rtHea!=='') nDocument.body.appendChild(document.createElement("BR")); nDocument.body.appendChild(document.createElement("div")).innerHTML = rtHea;
	
	nDocument.title = "Result [ "+count+" ]";
};

_in.equip = [];
_in.equip_template = [];
_in.real_names = {};
_in.check_names = [];
//var showx = true;
$qsa("#inv_equip > div").forEach(function(div){
	var eq = equip_parser.div($qs(".eqdp",div));
	if(eq.level === 10) {
		if( (eq.real_name=equip_parser.real_names[eq.eid]) ) {
			_in.real_names[eq.eid] = eq.real_name;
		} else {
			_in.check_names.push(eq);
		}
	}

	/*
	//http://hentaiverse.org/pages/showequip.php?eid=107705841&key=53f4e73a08
	bound:397
	category:"One-handed Weapon"
	cdt:88.21362799263352
	cdt1:479
	cdt2:543
	eid:"107705841"
	key:"53f4e73a08"
	level:0
	name:"Legendary Fiery Axe of Slaughter"
	price:null
	pxp1:0
	pxp2:357
	soulbound:false
	tradeable:true
	*/

	var e = equip_parser.name(eq.real_name || eq.name);
	e.div = div;
	e.key = eq.key;
	e.eid = eq.eid;
	e.bound = eq.bound;
	e.unassigned = eq.unassigned;
	e.sub = $element("div",e.div,[".hvut-bf"]);
	e.checkbox = $element("input",e.sub,{type:"checkbox"});

	//_in.inv_equip[eq.eid] = e;
	_in.equip_template.push(e);
	
	_in.equip.push(e);
});


if(_in.check_names.length) {
	_in.check_button = $element("input",$id("rightpane"),{type:"button",value:"Checking...",style:"position:absolute;top:0;left:30px;z-index:10"});
	_in.check_count = 0;
	_in.check_names.forEach(function(eq){
		ajax("/pages/showequip.php?eid="+eq.eid+"&key="+eq.key,null,function(r){
			var html = r.responseText,
				div = $element("div",null,["/"+html.substring(html.indexOf("<div"),html.indexOf('<div id="equipment">'))]);

			if(div.children.length === 2) {
				_in.real_names[eq.eid] = $qsa(".fd2",div).reduce(function(p,c){return p+" "+c.textContent.replace(/^(Of|The) /,function(e){return e.toLowerCase();});},"").trim();
			} else {
				_in.real_names[eq.eid] = eq.name;
			}

			_in.check_count++;
			_in.check_button.value = "Checking... (" + _in.check_count + "/" + _in.check_names.length +")";

			if(_in.check_count === _in.check_names.length) {
				setValue("equip_names",_in.real_names);
				_in.check_button.value = "Complete! (" + _in.check_count + "/" + _in.check_names.length +")";
			}
		});
	});

} else {
	setValue("equip_names",_in.real_names);
}

_in.equip.sort(function(a,b){
	var sorter = settings.equipSorter;
	if(a.category !== b.category) {
		return sorter.category[a.category] - sorter.category[b.category];
	} else if(a.category === "Obsolete") {
		return a.name>b.name?1 : a.name<b.name?-1 : 0;
	} else if(a.type !== b.type) {
		return sorter.type[a.type] - sorter.type[b.type];
	}

	var by =
		(a.category==="One-handed Weapon" || a.category==="Two-handed Weapon") ? ["suffix","quality","prefix"] :
		a.category==="Staff" ? ["suffix","quality","prefix"] :
		a.category==="Shield" ? ["quality","suffix","prefix"] :
		a.type==="Phase" ? ["suffix","part","quality","prefix"] :
		a.type==="Cotton" ? ["suffix","part","quality","prefix"] :
							["part","quality","suffix","prefix"];

	var r = 0;
	by.some(function(e){
		if(sorter.hasOwnProperty(e)) {
			r = (sorter[e][a[e]]||99) - (sorter[e][b[e]]||99);
		} else {
			r = a[e]>b[e]?1 : a[e]<b[e]?-1 : 0
		}

		if(r) {
			return true;
		} else {
			return false;
		}
	});

	return r;
});

_in.equip_template.sort(function(a,b){
	var sorter = settings.equipSorter;
	if(a.category !== b.category) {
		return sorter.category[a.category] - sorter.category[b.category];
	} else if(a.category === "Obsolete") {
		return a.name>b.name?1 : a.name<b.name?-1 : 0;
	} else if(a.type !== b.type) {
		return sorter.type[a.type] - sorter.type[b.type];
	}

	var by =
		(a.category==="One-handed Weapon" || a.category==="Two-handed Weapon") ? ["suffix","quality","prefix"] :
		a.category==="Staff" ? ["suffix","quality","prefix"] :
		a.category==="Shield" ? ["quality","suffix","prefix"] :
		a.type==="Phase" ? ["suffix","part","quality","prefix"] :
		a.type==="Cotton" ? ["suffix","part","quality","prefix"] :
							["part","quality","suffix","prefix"];

	var r = 0;
	by.some(function(e){
		if(sorter.hasOwnProperty(e)) {
			r = (sorter[e][a[e]]||99) - (sorter[e][b[e]]||99);
		} else {
			r = a[e]>b[e]?1 : a[e]<b[e]?-1 : 0
		}

		if(r) {
			return true;
		} else {
			return false;
		}
	});

	return r;
});

for(var j=0;j<_in.equip_template.length;j++){
	_in.inv_equip[_in.equip_template[j].eid] = _in.equip_template[j];
}


_in.frag = $element();
_in.equip.forEach(function(e,i,a){
	var p = a[i-1] || {};
	if(e.category !== p.category) {
		$element("h4",_in.frag,[" "+e.category,".hvut-category"]);
	}

	if(e.category !== "Obsolete") {
		if(e.type==="Phase" && e.suffix !== p.suffix) {
			$element("h5",_in.frag,[" "+e.suffix,".hvut-type"]);
		} else if(e.type==="Cotton" && e.suffix !== p.suffix) {
			vSuffix = e.suffix;
			if(typeof(vSuffix) === 'undefined') vSuffix = 'No Suffix';
			$element("h5",_in.frag,[" "+vSuffix,".hvut-type"]);
		} else if(e.type !== p.type) {
			$element("h5",_in.frag,[" "+e.type,".hvut-type"]);
		} else if(e.category==="One-handed Weapon" || e.category==="Two-handed Weapon") {
			if(e.suffix !== p.suffix) {
				e.div.classList.add("hvut-part");
			}
		} else if(e.category==="Staff") {
			if(e.suffix !== p.suffix) {
				e.div.classList.add("hvut-part");
			}
		} else if(e.category==="Shield") {
		} else if(e.part !== p.part) {
			e.div.classList.add("hvut-part");
		}
	}


	//e.sub = $element("div",e.parentNode,[".hvut-sub"]);
	//e.div.insertBefore(e.checkbox,e.div);
	//e.div.appendChild(e.checkbox);

	_in.frag.appendChild(e.div);
});
$id("inv_equip").appendChild(_in.frag);

}


_in.equip_btn_tp = $element("div",$id("rightpane"),[".hvut-btns-tp"]);
$element("input",_in.equip_btn_tp,{type:"button",value:"Template"},function(){_in.template();});
$element("input",_in.equip_btn_tp,{type:"button",value:"Clear"},function(){var eid, e; for (eid in _in.inv_equip) { e = _in.inv_equip[eid]; e.checkbox.checked = false; }});

//**************************//
//== START == new logic search equip
//**************************//
_in.filterx = function(list,search,keep) {
	search = search.trim();
	if(list.key === search) {
		return;
	}

	list.key = search;
	if(!keep) {
		list.input.value = search;
	}
	if(!search) {
		list.forEach(function(item){
			item.filtered = true;
			if(item.dom) item.dom.classList.remove("hvut-hide");
		});
		return;
	}

	search = search.toLowerCase().split(";").filter(function(value){return value.trim();}).map(function(value){return value.trim().split(/\s+/);});

	list.forEach(function(item){
		var name = item.name.toLowerCase().replace(/ /g,"_");
		item.filtered = search.some(function(value){
							return value.every(function(v){
								return name.indexOf(v)!==-1;
							});
						});
		if(item.dom) item.dom.classList[item.filtered?"remove":"add"]("hvut-hide");
		
	});
};


_in.equip.key = "";
_in.equip_btn = $element("div",$id("rightpane"),[".hvut-btns"]);

_in.equip.input = $element("input",_in.equip_btn,{type:"text",placeholder:"keyword; keyword; keyword"},{keypress:function(e){e.stopPropagation();},keyup:function(e){if(e.keyCode===27){_in.filterx(_in.equip,"");}else{_in.filterx(_in.equip,_in.equip.input.value,true);}}});
$element("input",_in.equip_btn,{type:"button",value:"Reset"},function(){_in.filterx(_in.equip,"");});



$qsa("#inv_equip > div").forEach(function(div){
	var d = equip_parser.div(div.children[1]);
	var item = {
		type : "equip",
		name : d.name,
		id : d.eid,
		key : d.key,
		count : 1,
		price : 0,
		cod : 0,
		filtered : true,
		dom : div,
		lockBtn : div.firstElementChild
	};
	_in.equip.push(item);

	//var sub = $element("div",null,[".hvut-sub hvut-sub-equip"]);
	//item.checkbox = $element("input",sub,{type:"checkbox"});
	//item.codInput = $element("input",sub,{type:"text",placeholder:"CoD",pattern:"\\d*",className:"hvut-cod",value:""},{change:function(){_mm.calc_equip(item,"cod",item.codInput.value);}});
	//item.sendBtn = $element("input",sub,{type:"button",value:"send"},function(){_mm.send_queue(item);});

	//div.appendChild(sub);
});


$qsa("#inv_equip > div").forEach(function(div){
	var eq = equip_parser.div($qs(".eqdp",div));

	var e = equip_parser.name(eq.real_name || eq.name);
	e.div = div;
	_in.equip.push(e);
});
//**************************//
//== END == new logic search equip
//**************************//


_in.items = {};
_in.price = getValue("price",settings.price);

_in.alert_price = function(name) {
	var obj = _in.price[name] || {},
		log = [],
		item,
		count,
		price,
		total = 0;

	for(item in obj) {
		if( (count=_in.items[item]) ) {
			price = obj[item];
			total += count * price;
			log.push(count.toLocaleString()+" x ["+item+"] @ "+price.toLocaleString()+" = "+(count*price).toLocaleString());
		}
	}

	log.push("==========","Total: "+total.toLocaleString());

	alert(log.join("\n"));
};

_in.set_price = function() {
	var wrapper = $element("div",document.body,{style:"position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,.5); z-index:1001; display:flex; justify-content:center; align-items:center"});

	var div = $element("div",wrapper,{style:"width:450px; height:650px; border:1px solid #333; background-color:#fff"});

	var text = $element("textarea",div,{value:JSON.stringify(_in.price,null,2),spellcheck:false,style:"width:400px;height:600px;margin:5px"});

	$element("input",div,{type:"button",value:"Save"},
		function(){
			try {
				var json = JSON.parse(text.value),
					name,item;

				if(!json || json.constructor !== Object) {
					alert('Invalid');
					return;
				}

				for(name in json) {
					if(!json[name] || json[name].constructor !== Object) {
						alert('Invalid: "'+name+'"');
						return;
					}
					for(item in json[name]) {
						if(isNaN(json[name][item])) {
							alert('Invalid: "'+item+'" ("'+name+'") is Not a Number.');
							return;
						}
					}
				}

				if(!json["Salvage"]) {
					alert('Invalid: "Salvage" is missing.');
					return;
				}
				for(item in settings.price["Salvage"]) {
					if(!json["Salvage"].hasOwnProperty(item)) {
						alert('Invalid: "'+item+'" ("Salvage") is missing.');
						return;
					}
				}

			} catch(e) {
				alert("Invalid: Parsing error");
				return;
			}

			_in.price = json;
			setValue("price",_in.price);
			wrapper.remove();
		}
	);
	$element("input",div,{type:"button",value:"Cancel"},function(){wrapper.remove();});
};

_in.crystal = function() {
	var pa = ["Vigor","Finesse","Swiftness","Fortitude","Cunning","Knowledge"],
		em = ["Flames","Frost","Lightning","Tempest","Devotion","Corruption"],
		pa_avg = Math.round(pa.reduce(function(p,c){return p+(_in.items["Crystal of "+c]||0);},0)/6),
		em_avg = Math.round(em.reduce(function(p,c){return p+(_in.items["Crystal of "+c]||0);},0)/6),
		pa_surplus = [],
		em_surplus = [],
		pa_shortage = [],
		em_shortage = [];

	pa.forEach(function(c){
		var m = (_in.items["Crystal of "+c] || 0) - pa_avg;
		if(m > 0) {
			pa_surplus.push("Crystal of "+c+" ("+(m)+")");
		} else if(m < 0) {
			pa_shortage.push("Crystal of "+c+" ("+(-m)+")");
		}
	});

	em.forEach(function(c){
		var m = (_in.items["Crystal of "+c] || 0) - em_avg;
		if(m > 0) {
			em_surplus.push("Crystal of "+c+" ("+(m)+")");
		} else if(m < 0) {
			em_shortage.push("Crystal of "+c+" ("+(-m)+")");
		}
	});

	alert([
		"[Primary attributes]","",
		"[I have]",
		pa_surplus.join("\n"),"",
		"[I need]",
		pa_shortage.join("\n"),"","",
		"[Elemental mitigation]","",
		"[I have]",
		em_surplus.join("\n"),"",
		"[I need]",
		em_shortage.join("\n"),
	].join("\n"));
};

_in.figurine = function(k) {
	k = k || 0;
	var msg = [];
	for(var item in _in.items) {
		if(item.indexOf("Figurine")!==-1 && _in.items[item]-k>0) {
			msg.push(item+" ("+(_in.items[item]-k)+")");
		}
	}
	alert("[Figurines]\n\n"+msg.join("\n"));
};


$qsa("#inv_item > table > tbody > tr").forEach(function(tr){
	var name = tr.cells[0].textContent.trim(),
		count = Number(tr.cells[1].textContent),
		type = tr.cells[0].firstElementChild.getAttribute("onmouseover").match(/,'([^']+)','inv_item'\)/)[1].replace(/\W/g,"_");

	_in.items[name] = count;
	tr.classList.add("hvut-item-"+type);
});

_in.item_buttons = $element("div",$id("leftpane"),{style:"position:absolute;top:625px;left:20px;width:350px;text-align:left;z-index:10"});


$element("input",_in.item_buttons,{type:"button",value:"Set Price"},function(){_in.set_price();});
$element("input",_in.item_buttons,{type:"button",value:"Trophies"},function(){_in.alert_price("Trophies");});
$element("input",_in.item_buttons,{type:"button",value:"Crystals"},function(){_in.crystal();});
$element("input",_in.item_buttons,{type:"button",value:"Figurines"},function(){_in.figurine(1);});

// Equipment Shop
} else if(settings.equipmentShop && loc.s==="Bazaar" && loc.ss==="es") {

_es.type = loc.filter || "1handed";
_es.alias = {"1handed":"One-Handed Weapon","2handed":"Two-Handed Weapon","staff":"Staff","shield":"Shield","acloth":"Cloth Armor","alight":"Light Armor","aheavy":"Heavy Armor"};
_es.mat = {"1handed":"Metal","2handed":"Metal","staff":"Wood","shield":"Wood","acloth":"Cloth","alight":"Leather","aheavy":"Metal"};
_es.quality = {"Flimsy":1,"Crude":2,"Fair":3,"Average":4,"Fine":5,"Superior":6,"Exquisite":7,"Magnificent":8,"Legendary":9,"Peerless":10};
_es.mat_price = getValue("price",settings.price)["Salvage"] || {};


_es.item_pane = {};
_es.shop_pane = {};

_es.salvage = function(eid) {
	var data = _es.item_pane[eid];
	data.checkbox.checked = false;
	data.checkbox.disabled = true;
	data.div.classList.add("hvut-disabled");
	data.sub.classList.add("hvut-disabled");
	delete _es.item_pane[eid];
	ajax("/?s=Forge&ss=sa&filter="+data.type,"select_item="+eid,function(response){
		if(settings.showResultSalvage){
			var strDocument = response.responseText;
		
			//console.log('Salvge strDocument='+strDocument);

			var xg = strDocument.split('>Salvaged');
			var message = '';
			for(var i=1;i<xg.length;i++){
				if(message!=='') message = message +' / ';

				message = message + xg[i].substring(0, xg[i].indexOf('<')).trim();
				
			}

		
			message = message.trim();

			data.div.textContent = message+' | '+data.div.textContent;
			
			data.div.style.textDecoration = 'overline';
			data.div.parentNode.childNodes[4].innerHTML = data.div.parentNode.childNodes[4].innerHTML;
		}else{
			data.div.parentNode.remove();
		}

		

		
	
	},null,{"Content-Type":"application/x-www-form-urlencoded"} );
};

_es.sell = function(eid) {
	var data = _es.item_pane[eid];
	data.checkbox.checked = false;
	data.checkbox.disabled = true;
	data.div.classList.add("hvut-disabled");
	data.sub.classList.add("hvut-disabled");
	delete _es.item_pane[eid];
	ajax("/?s=Bazaar&ss=es&filter="+data.type,"select_mode=item_pane&select_item="+eid+"&select_count=1",function(){data.div.parentNode.remove();});
};

_es.sal_value = function(data,price) {
	var q = _es.quality[data.name.split(" ")[0]],
		value = 0,
		count = 0;

	if(!q) {
		return null;

	} else if(q < 6) {
		count = Math.ceil(price/100);

	} else {
		count = Math.ceil(price/500);
		value = _es.mat_price[(q===6?"Low-Grade " : q===7?"Mid-Grade " : "High-Grade ") + _es.mat[data.type]] || 0;
	}

	if(data.name.match(/Force Shield|Phase|Shade|Power/)) {
		value += _es.mat_price["Energy Cell"] * Math.max(count*_es.mat_price["Energy Cell Chance"],1) || 0;
	}

	count = Math.min(count,10);
	return Math.round( value + count * (_es.mat_price["Scrap "+_es.mat[data.type]] || 0) );
};

_es.showequip = function(eid,key) {
	var popup = $id("popup_box");
	popup.innerHTML = "";
	popup.style.top = "125px";
	popup.style.width = "380px";
	popup.style.height = "510px";
	popup.style.visibility = "visible";

	$element("iframe",popup,{src:"/pages/showequip.php?eid="+eid+"&key="+key,style:"border:0; width:100%; height:100%; overflow:hidden"});
};

_es.shop_buy = function(data) {
	ajax("/?s=Bazaar&ss=es&filter="+data.type,"select_mode=shop_pane&select_item="+data.eid+"&select_count=1",function(){data.div.parentNode.remove();});
};

_es.shop_salvage = function(data) {
	var div = data.div.parentNode;
	div.style.textDecoration = "line-through";

	ajax("/?s=Bazaar&ss=es&filter="+data.type,"select_mode=shop_pane&select_item="+data.eid+"&select_count=1",
		function(r){
		ajax("/rpc/rpc_equip.php?act=toggle_lock&eid="+data.eid+"&val=0",null,
			function(r){
			ajax("/?s=Forge&ss=sa&filter="+data.type,"select_item="+data.eid,
				function(r){
					div.remove();
				},
				function(){alert("Failed to salvage the item");}
			);
			},
			function(){alert("Failed to unlock the item");}
		);
		},
		function(){alert("Failed to purchase the item");}
	);
};

_es.get_item_pane = function(eqdp,type,append) {
	eqdp.forEach(function(div){
		var data = equip_parser.div(div);
		data.div = div;
		div.dataset.eid = data.eid;
		data.type = type;
		data.sal_value = _es.sal_value(data,data.price);

		data.sub = $element("div",div.parentNode,[".hvut-sub"]);
		data.checkbox = $element("input",data.sub,{type:"checkbox"});
		data.sell_btn = $element("span",data.sub,"Sell "+data.price,function(){_es.sell(data.eid);});
		data.sal_btn = $element("span",data.sub,"Salvage "+data.sal_value,function(){_es.salvage(data.eid);});
		data.locked = equip_filter(data.name,settings.protectEquips);

		if(data.level) {
			data.locked = true;
			$element("span",data.sub,[" Level "+data.level,".hvut-level"]);
		}

		if(data.sal_value > data.price) {
			data.salvage = true;
			data.div.classList.add("hvut-salvage");
			data.sal_btn.classList.add("hvut-bold");

		} else {
			data.sell_btn.classList.add("hvut-bold");
		}

		_es.item_pane[data.eid] = data;

		if(append) {
			append.appendChild(div.parentNode);
		}

		if(settings.autoLock && data.locked) {
			div.previousElementSibling.onclick();
		}

	});
};

_es.get_shop_pane = function(eqdp,type,append) {
	eqdp.forEach(function(div){
		var data = equip_parser.div(div);
		data.div = div;
		div.dataset.eid = data.eid;
		data.type = type;
		data.sal_value = _es.sal_value(data,Math.ceil(data.price/5));

		data.sub = $element("div",null,[".hvut-sub"]);

		var display;

		if(equip_filter(data.name,settings.checkBazaars)) {
			display = true;
		}

		if(!data.tradeable) {
			display = false;
		}

		if(data.level) {
			display = true;
			$element("span",data.sub,[" Level "+data.level,".hvut-level"],function(){_es.showequip(data.eid,data.key);});
		}

		if(data.sal_value > data.price) {
			display = true;
			$element("span",data.sub,[" Salvage "+data.sal_value,".hvut-salvage2"],function(){_es.shop_salvage(data);});
		}

		if(data.eid < settings.checkOldEID) {
			display = true;
			$element("span",data.sub,"EID "+data.eid);
		}

		if(display) {
			_es.shop_pane[data.eid] = data;
			div.querySelector('div.fd2 div').textContent = div.querySelector('div.fd2 div').textContent + ' ['+data.price+']';
			$element("span",[data.sub,0],"Buy "+data.price,function(){_es.shop_buy(data);});
			div.parentNode.appendChild(data.sub);

			if(append) {
				append.appendChild(div.parentNode);
			}

		} else {
			div.querySelector('div.fd2 div').textContent = div.querySelector('div.fd2 div').textContent + ' ['+data.price+']';
			div.parentNode.classList.add("hvut-hide");
		}

	});
};


_es.sell_all = function() {
	if(!confirm('Are you sure you wish to sell ALL UNLOCKED EQUIPMENT in ALL pane?')) {
		return;
	}

	_es.sell_all_btn.value = "Sell All (0 / 7)";

	["1handed","2handed","staff","shield","acloth","alight","aheavy"].forEach(function(type){
		ajax("?s=Bazaar&ss=es&filter="+type,"sell_all="+_es.sell_all_id,
			function(){
				_es.sell_all_btn.value = "Sell All ("+(++_es.sell_all_cnt)+" / 7)";
			},
			function(){}
		);
	});
};


GM_addStyle(
	"#mainpane > div:first-child > div:first-child > div {float:left; width:125px !important}" +
	".hvut-h2 {margin:10px; padding:10px 0 0; border-top:1px dashed}" +
	".hvut-salvage {text-decoration:line-through}" +
	".hvut-sub {clear:left; margin-bottom:5px}" +
	"#shop_pane .hvut-sub {margin-left:30px}" +
	".hvut-sub > input {vertical-align:sub}" +
	".hvut-sub > span {margin:5px; cursor:pointer}" +
	".hvut-btns {position:absolute; top:0px; left:30px; white-space:nowrap; text-align:left; z-index:8888}" +
	".hvut-bold {font-weight:bold; color:#c00}" +
	".hvut-level {font-weight:bold; color:#00c}" +
	".hvut-disabled {text-decoration:line-through}" +
	".hvut-item {position:absolute; top:25px; left:20px}" +
	".hvut-salvage2 {font-weight:bold; color:#093; cursor:pointer}"
);


_es.submenu = $id("mainpane").firstElementChild.firstElementChild;
$element("div",[_es.submenu,0],[" All"],function(){location.href="/?s=Bazaar&ss=es";});


$element("input",document.body,{type:"button",value:"View",className:"hvut-show"},function(){document.body.classList.toggle("hvut-show");});

_es.div = $element("div",[$id("item_pane"),0],[".hvut-item"]);
$element("input",_es.div,{type:"button",value:"Select for Selling"},function(){var eid,e;for(eid in _es.item_pane){e=_es.item_pane[eid];if(!e.div.parentNode.classList.contains('hvut-hide')) e.checkbox.checked=!e.locked&&!e.salvage;}});
$element("input",_es.div,{type:"button",value:"$ Sell"},function(){var eid,e;for(eid in _es.item_pane){e=_es.item_pane[eid];if(!e.div.parentNode.classList.contains('hvut-hide') && e.checkbox.checked){_es.sell(eid);}}});
$element("input",_es.div,{type:"button",value:"Select for Salvaging"},function(){var eid,e;for(eid in _es.item_pane){e=_es.item_pane[eid];if(!e.div.parentNode.classList.contains('hvut-hide')) e.checkbox.checked=!e.locked&&e.salvage;}});
$element("input",_es.div,{type:"button",value:"# Salvage"},function(){var eid,e;for(eid in _es.item_pane){e=_es.item_pane[eid];if(!e.div.parentNode.classList.contains('hvut-hide') && e.checkbox.checked){_es.salvage(eid);}}});
$element("input",_es.div,{type:"button",value:"Clear"},function(){var eid,e;for(eid in _es.item_pane){e=_es.item_pane[eid];if(!e.div.parentNode.classList.contains('hvut-hide')) e.checkbox.checked=false;}});

function doSearch(){
		
	//**************************//
	//== START == new logic search equip
	//**************************//
	_es.filterx = function(list,search,keep) {
		search = search.trim();
		if(list.key === search) {
			return;
		}

		list.key = search;
		if(!keep) {
			list.input.value = search;
		}
		if(!search) {
			list.forEach(function(item){
				item.filtered = true;
				if(item.dom) item.dom.classList.remove("hvut-hide");
			});
			return;
		}

		search = search.toLowerCase().split(";").filter(function(value){return value.trim();}).map(function(value){return value.trim().split(/\s+/);});
		//console.log('search:'+search);
		list.forEach(function(item){
			var name = item.name.toLowerCase().replace(/ /g,"_");
			//console.log(item);
			var price = item.price;//(item.price+'').replace(/ /g,"_");
			var p_salve = item.sal_value;

			item.filtered = search.some(function(value){
								return value.every(function(v){
									var rt = false;
									if(v.startsWith('$')){ 
										if(v.length > 1){
											v = v.substring(1);

											if(v.startsWith('>')){
												v = v.substring(1);
												if(v.length > 0) rt = ((price*1) > (v*1))?true:false;
											}else if(v.startsWith('<')){
												v = v.substring(1);
												if(v.length > 0) rt = ((price*1) < (v*1))?true:false;
											}else{
												rt = ((price*1) < (v*1))?true:false;
											}
										}
										//console.log('p:'+price+' < '+'v:'+v+' = '+rt);
										return rt;
									}else if(v.startsWith('#')){
										if(v.length > 1){
											v = v.substring(1);

											if(v.startsWith('>')){
												v = v.substring(1);
												if(v.length > 0) rt = ( ((p_salve*1) > (v*1)) && ((p_salve*1)>0) )?true:false;
											}else if(v.startsWith('<')){
												v = v.substring(1);
												if(v.length > 0) rt = ( ((p_salve*1) < (v*1)) && ((p_salve*1)>0) )?true:false;
											}else{
												rt = ( ((p_salve*1) < (v*1)) && ((p_salve*1)>0) )?true:false;
											}
										}
										//console.log('p_salve:'+p_salve+' < '+'v:'+v+' = '+rt+' name:'+name);
										return rt;
									}else{
										rt = name.indexOf(v)!==-1;
										//console.log('name:'+name+' = '+rt);
										return rt;
									}
								});
							});

			//console.log('price:'+price+' fil:'+item.filtered);
			if(item.dom) item.dom.classList[item.filtered?"remove":"add"]("hvut-hide");
			
		});
	};

	_es.equip = [];

	_es.equip.key = "";
	_es.equip_btn = $element("div",$id("leftpane"),[".hvut-btns"]);

	_es.equip.input = $element("input",_es.equip_btn,{type:"text",placeholder:"$>[sell]; #<[Salvage]"},{keypress:function(e){e.stopPropagation();},keyup:function(e){if(e.keyCode===27){_es.filterx(_es.equip,"");}else{_es.filterx(_es.equip,_es.equip.input.value,true);}}});
	$element("input",_es.equip_btn,{type:"button",value:"Reset"},function(){_es.filterx(_es.equip,"");});

	
	$qsa("#item_pane > div").forEach(function(div){
		if(div.children.length > 0){
			if(div.children[1]){
				if(div.children[1].getAttribute("onmouseover")){
					var d = equip_parser.div(div.children[1]);
						d.type =_es.type;
					//console.log(d.price);
					var item = {
						type : "equip",
						name : d.name,
						id : d.eid,
						key : d.key,
						count : 1,
						price : d.price,
						sal_value : _es.sal_value(d,d.price),
						cod : 0,
						filtered : true,
						dom : div,
						lockBtn : div.firstElementChild
					};
					_es.equip.push(item);
				}
			}
		}
	});
	
	
	$qsa("#item_pane > div").forEach(function(div){
		if($qs(".eqdp",div)){
			var eq = equip_parser.div($qs(".eqdp",div));

			var e = equip_parser.name(eq.real_name || eq.name);
			e.div = div;
			e.price = eq.price;
			e.type = _es.type;
			e.sal_value = _es.sal_value(eq,eq.price);
			_es.equip.push(e);
		}
	});
	
	
	//**************************//
	//== END == new logic search equip
	//**************************//

}
if(loc.filter) {
	_es.submenu.children[0].classList.add("cfb");
	_es.get_item_pane($qsa("#item_pane .eqdp"),_es.type);
	_es.get_shop_pane($qsa("#shop_pane .eqdp"),_es.type);

} else {

	_es.submenu.children[0].classList.add("cfbs");
	_es.submenu.children[1].classList.remove("cfbs");
	_es.submenu.children[1].classList.add("cfb");

	$element("h2",[$id("item_pane"),3],[" "+_es.alias["1handed"],".hvut-h2"]);
	_es.get_item_pane($qsa("#item_pane .eqdp"),"1handed");

	$element("h2",[$id("shop_pane"),3],[" "+_es.alias["1handed"],".hvut-h2"]);
	_es.get_shop_pane($qsa("#shop_pane .eqdp"),"1handed");

	["2handed","staff","shield","acloth","alight","aheavy"].forEach(function(type){
		$element("h2",$id("item_pane"),[" "+_es.alias[type],".hvut-h2"]);
		$element("h2",$id("shop_pane"),[" "+_es.alias[type],".hvut-h2"]);

		var item_temp = $element("div",$id("item_pane"),[" loading...","."]),
			item_frag = $element(),
			shop_temp = $element("div",$id("shop_pane"),[" loading...","."]),
			shop_frag = $element();

		ajax("/?s=Bazaar&ss=es&filter="+type,null,
			function(r){
				var html = r.responseText,
					s = html.indexOf('<div id="leftpane"'),
					e = html.indexOf('<div id="sellall_pane"',s);

				var doc = $element();
				$element("div",doc,["/"+html.substring(s,e)]);

				_es.get_item_pane($qsa("#item_pane .eqdp",doc),type,item_frag);
				equip_color(item_frag);
				$id("item_pane").insertBefore(item_frag,item_temp);
				item_temp.remove();

				_es.get_shop_pane($qsa("#shop_pane .eqdp",doc),type,shop_frag);
				equip_color(shop_frag);
				$id("shop_pane").insertBefore(shop_frag,shop_temp);
				shop_temp.remove();
				
				doSearch();
			},
			function(){item_temp.textContent=shop_temp.textContent="error";}
		);

	});
		
	$id("sellall_form").style.display = "none";
	$id("transaction_pane").style.display = "none";

	_es.sell_all_id = $qs("img[src*='sellall.png']").getAttribute("onclick").match(/value='(\w+)'/)[1];
	_es.sell_all_cnt = 0;
	_es.sell_all_btn = $element("input",$id("sellall_pane"),{type:"button",value:"Sell All"},function(){_es.sell_all();});
}

doSearch();



// Item Shop
} else if(settings.itemShop && loc.s==="Bazaar" && loc.ss==="is") {

GM_addStyle(
	".hvut-bid {width:50px; text-align:right; font-size:10pt}" +
	".hvut-curbid {color:#00f}" +
	".hvut-otherbid {color:#f00}"
);

$element("input",document.body,{type:"button",value:"View",className:"hvut-show"},function(){document.body.classList.toggle("hvut-show");});

_is.items = {};

$qsa("#item_pane > table > tbody > tr").forEach(function(r){
	var item = r.cells[0].textContent.trim();
	_is.items[item] = {tr:r,td:$element("td",r,[".hvut-bid"])};
	var hide = settings.hideItem.some(function(h){return item.indexOf(h)!==-1;});
	if(hide) {
		r.classList.add("hvut-hide");
	}
});

$qsa("#shop_pane > table > tbody > tr").forEach(function(r){
	var item = r.cells[0].textContent.trim();
	var hide = settings.hideShop.some(function(h){return item.indexOf(h)!==-1;});
	if(hide) {
		r.classList.add("hvut-hide");
	}
});

ajax("/?s=Bazaar&ss=ib",null,
	function(r){
		var html = r.responseText,
			s = html.indexOf('<option value="0">[Select an item...]'),
			e = html.indexOf('</select',s);

		var select = $element("select",null,["/"+html.substring(s,e)]);
		var bid_data = {
			curbid : html.match(/var curbid += (\[[ ,0-9]+\])/) && JSON.parse(RegExp.$1),
			highbid : html.match(/var highbid += (\[[ ,0-9]+\])/) && JSON.parse(RegExp.$1)
		};

		[].forEach.call(select.options,function(o,i){
			var name = o.textContent,
				curbid = bid_data.curbid[i],
				highbid = bid_data.highbid[i];

			if(_is.items.hasOwnProperty(name) && highbid) {
				_is.items[name].td.textContent = highbid;
				if(curbid) {
					_is.items[name].tr.classList.add(highbid!==curbid?"hvut-otherbid":"hvut-curbid");
				}
			}
		});
	}
);


// The Shrine
} else if(settings.shrine && loc.s==="Bazaar" && loc.ss==="ss") {

GM_addStyle(
	"td.iop, td.io {width:200px}" +
	"td.hvut-sub {width:110px}" +
	".hvut-count {width:40px; text-align:right}" +
	".hvut-results {position:absolute; top:150px; left:650px; width:500px; height:400px; margin:0; padding:10px; border:1px solid #999 ; border-radius:5px; text-align:left; overflow:auto; background-color:rgba(255,255,255,0.9); z-index:10}" +
	".hvut-results > h4 {margin:10px 5px 5px; font-size:12pt}" +
	".hvut-results > ul {margin:10px; padding:0; list-style:none; font-size:10pt}"
);

_ss.items = {};

_ss.offer = function(item,count) {
	count = parseInt(count);
	if(!count || count<1) {
		return;
	}
	var type;
	if(item.type==="Artifact" || item.type==="Collectable") {
		type = "0";
	} else {
		var img = $qs("img[src$='_on.png']",$id("pane_trophy"));
		if(img) {
			type = img.id.match(/^reward_(\d+)$/)[1];
		} else {
			return;
		}
	}

	if(!item.ul) {
		item.header = $element("h4",_ss.div,item.name);
		item.ul = $element("ul",_ss.div);
		item.ul.scrollIntoView();
	}

	_ss.div.classList.remove("hvut-none");

	if(count > item.remains) {
		count = item.remains;
	}
	item.remains -= count;
	item.request += count;
	item.rDiv.textContent = item.remains;

	while(count--) {
		ajax("/?s=Bazaar&ss=ss","select_item="+item.eid+"&select_reward="+type,function(r){
			var html = r.responseText;
				message = html.substring(html.indexOf('<div id="messagebox"'),html.indexOf('<!-- /messagebox -->'));

			item.count++;
			item.header.textContent = item.name + " ("+item.count+"/"+item.request+")";

			var reward = [],
				reg = /(?:Received (.+?)|(Your .+ has increased by one)|((?:Flimsy|Crude|Fair|Average|Fine|Superior|Exquisite|Magnificent|Legendary|Peerless) .+?))<\/div>/g,
				exec;
			while( (exec=reg.exec(message)) !== null ) {
				reward.push(exec[1] || exec[2] || exec[3]);
			}

			if(!reward.length) {
				reward.push(message);
			}

			if(type === "0") {
				reward.forEach(function(r){
					if(!item.results[r]) {
						var obj = {};
						item.keys.push(r);
						item.keys.sort();
						item.keys.forEach(function(k){
							obj[k] = item.results[k] || 0;
						});
						item.results = obj;
					}
					item.results[r]++;
				});

				item.ul.innerHTML = "";
				for(var i in item.results) {
					$element("li",item.ul,"["+item.results[i]+"] "+i);
				}

			} else {
				var quality = {"Flimsy":1,"Crude":2,"Fair":3,"Average":4,"Fine":5,"Superior":6,"Exquisite":7,"Magnificent":8,"Legendary":9,"Peerless":10};
				reward.forEach(function(r){
					item.results.push(r);
					item.results.sort(function(a,b){return quality[b.split(" ")[0]]-quality[a.split(" ")[0]] || a.toLowerCase()>b.toLowerCase();});
					$element("li",[item.ul,item.results.indexOf(r)],r);
				});
			}
		});
	}
};

_ss.div = $element("ul",document.body,[".hvut-results hvut-none"]);

$element("input",$id("rightpane"),{type:"button",value:"Result",style:"position:absolute;top:0;left:200px"},function(){_ss.div.classList.toggle("hvut-none");});

$element("input",document.body,{type:"button",value:"View",className:"hvut-show"},function(){document.body.classList.toggle("hvut-show");});

$qsa("#item_pane > table > tbody > tr").forEach(function(r){
	var div = r.cells[0].firstElementChild,
		exec = div.getAttribute("onclick").match(/snowflake\.set_selected_item\((\d+), '(.+)'\);/),
		eid = exec[1],
		name = $element("span",null,["/"+exec[2]]).textContent,
		type = div.getAttribute("onmouseover").match(/'([^']+)','item_pane'/)[1],
		rDiv = r.cells[1].firstElementChild.firstElementChild,
		remains = Number(rDiv.textContent);

	var item = _ss.items[eid] = {eid:eid,name:name,type:type,remains:remains,request:0,count:0,keys:[],results:(type==="Artifact"||type==="Collectable")?{}:[],rDiv:rDiv};

	var td = $element("td",r,[".hvut-sub"]),
		count = $element("input",td,[".hvut-count"]);
	$element("input",td,{type:"button",value:"Offer"},function(){_ss.offer(item,count.value);});

	var hide = settings.hideShrine.some(function(h){return name.indexOf(h)!==-1;});
	if(hide) {
		r.classList.add("hvut-hide");
	}
});


// Item Shop Bot
} else if(settings.itemShopBot && loc.s==="Bazaar" && loc.ss==="ib") {

	if(unsafeWindow.MAIN_URL) {
		_ib.data = {highbid:unsafeWindow.highbid,curbid:unsafeWindow.curbid,curcount:unsafeWindow.curcount};

	} else { // for Chrome that doesn't support unsafeWindow
		unsafe_input = $element("input",document.body,{style:"position:absolute;top:0;left:0;width:0;height:0"});
		unsafe_input.setAttribute("onfocus","this.value=JSON.stringify({highbid:highbid,curbid:curbid,curcount:curcount});");
		unsafe_input.focus();
		_ib.data = JSON.parse(unsafe_input.value);
		unsafe_input.remove();
	}

	GM_addStyle(
		".hvut-mybid {width:70px; font-size:10pt; text-align:right}" +
		".hvut-bot {display:flex; flex-flow:column wrap; position:absolute; top:280px; left:3px; width:720px; height:380px; margin:0; padding:5px; list-style:none; text-align:left; background-color:#EDEBDF; z-index:1000}" +
		".hvut-bot > li {width:170px; margin:1px 5px; overflow:hidden; border-bottom:1px solid #666}" +
		".hvut-curbid {color:#00f}" +
		".hvut-otherbid {color:#f00}" +
		".hvut-bot .hvut-item {float:left; width:120px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}" +
		".hvut-bot .hvut-bid {float:right}"
	);

	_ib.mybid = {};
	$qsa("#active_pane > table > tbody > tr").forEach(function(tr){
		_ib.mybid[tr.cells[0].textContent.trim()] = tr;
	});

	_ib.ul = $element("ul",$id("mainpane"),[".hvut-bot"]);
	_ib.selector = $id("bot_item");

	[].forEach.call(_ib.selector.options,function(o,i){
		if(o.value*1===0){return;}
		var name = o.textContent,
			curbid = _ib.data.curbid[i],
			highbid = _ib.data.highbid[i];

		var li = $element("li",_ib.ul,[curbid&&(highbid===curbid)?".hvut-curbid" : curbid?".hvut-otherbid" : ""],function(){_ib.selector.selectedIndex=i;});
		li.setAttribute("onclick","itembot.update_bidstats()");
		$element("span",li,[" "+name,".hvut-item"]);
		$element("span",li,[" "+highbid,".hvut-bid"]);

		if(_ib.mybid.hasOwnProperty(name)) {
			$element("td",_ib.mybid[name],[" "+curbid,".hvut-mybid"+(highbid!==curbid?" hvut-otherbid":" hvut-curbid")]);
			$element("td",_ib.mybid[name],[(highbid!==curbid?" "+highbid:""),".hvut-mybid"]);
		}
	});


// Monster Lab
} else if(settings.monsterLab && loc.s==="Bazaar" && loc.ss==="ml") {

if(loc.slot) {
	if(loc.pane === "skills") {
		_ml.prev_btn = $qs("img[src$='/monster/prev.png']");
		_ml.prev_btn.setAttribute("onclick",_ml.prev_btn.getAttribute("onclick").replace("ss=ml","ss=ml&pane=skills"));
		_ml.next_btn = $qs("img[src$='/monster/next.png']");
		_ml.next_btn.setAttribute("onclick",_ml.next_btn.getAttribute("onclick").replace("ss=ml","ss=ml&pane=skills"));

	} else {
		_ml.upgrade = function(type,count) {
			while(count-- > 0) {
				ajax("/?s=Bazaar&ss=ml&slot="+loc.slot,"crystal_upgrade="+type,
					function(r){
						_ml.crystals[type].span.textContent = "+"+(++_ml.crystals[type].count);
					}
				);
			}
		};

		_ml.upgrade_selected = function(count) {
			for(var type in _ml.crystals) {
				if(_ml.crystals[type].checkbox.checked) {
					_ml.upgrade(type,count);
				}
			}
		};

		_ml.crystals = {};

		$qsa("#feed_pane ~ div > table > tbody > tr").forEach(function(tr,i){
			var img = tr.cells[0].firstElementChild,
				td = $element("td",[tr,tr.cells[2]]),
				type = ["pa_str","pa_dex","pa_agi","pa_end","pa_int","pa_wis","er_fire","er_cold","er_elec","er_wind","er_holy","er_dark"][i];

			var obj = _ml.crystals[type] = {};
			obj.current = Number(tr.cells[1].textContent);
			obj.count = 0;
			obj.checkbox = $element("input",td,{type:"checkbox",value:type});
			if(!img.hasAttribute("onclick")) {
				obj.checkbox.disabled = true;
			}
			obj.span = $element("span",td,{style:"position:absolute;margin:3px"});
		});

		$element("input",$id("feed_pane").nextElementSibling.firstElementChild.firstElementChild.firstElementChild,{type:"checkbox",style:"vertical-align:top"},function(e){["pa_str","pa_dex","pa_agi","pa_end","pa_int","pa_wis"].forEach(function(t){var checkbox=_ml.crystals[t].checkbox;if(!checkbox.disabled){checkbox.checked=e.target.checked;}});});
		$element("input",$id("feed_pane").nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.firstElementChild,{type:"checkbox",style:"vertical-align:top"},function(e){["er_fire","er_cold","er_elec","er_wind","er_holy","er_dark"].forEach(function(t){var checkbox=_ml.crystals[t].checkbox;if(!checkbox.disabled){checkbox.checked=e.target.checked;}});});


		_ml.upgrade_div = $element("div",$id("feed_pane").parentNode,{style:"margin-left:250px"});
		$element("input",_ml.upgrade_div,{type:"button",value:"+1"},function(){_ml.upgrade_selected(1);});
		$element("input",_ml.upgrade_div,{type:"button",value:"+5"},function(){_ml.upgrade_selected(5);});
		$element("input",_ml.upgrade_div,{type:"button",value:"+10"},function(){_ml.upgrade_selected(10);});

		/*
		$element("input",_ml.upgrade_div,{type:"button",value:"SET"},function(){
			var pa = 2,
				er = 6;
			["pa_str","pa_dex","pa_agi","pa_end","pa_int","pa_wis"].forEach(function(type){
					_ml.upgrade(type,pa-_ml.crystals[type].current);
			});
			["er_fire","er_cold","er_elec","er_wind","er_holy","er_dark"].forEach(function(type){
					_ml.upgrade(type,er-_ml.crystals[type].current);
			});
		});

		$element("input",_ml.upgrade_div,{type:"button",value:"NEXT"},function(){
			location.href = "/?s=Bazaar&ss=ml&slot=" + (loc.slot*1+1);
		});
		//*/

	}

} else {

GM_addStyle(
	"#slot_pane > div {position:relative; padding-right:70px; width:930px}" +
	"#slot_pane > div > div:nth-child(5) {display:none}" +
	".hvut-buttons {position:absolute; top:30px; left:260px; white-space:nowrap}" +
	".hvut-win {position:absolute; top:6px; right:0; width:70px; text-align:center}" +
	".hvut-feed {position:absolute; top:6px; left:62px; width:124px; text-align:center; z-index:2}" +
	".hvut-feed:hover {background-color:rgba(255,255,255,.5)}" +
	".hvut-check {position:absolute; top:4px; left:280px; min-width:20px; padding:1px 3px; border:1px solid #5c0d11; border-radius:3px; font-size:9pt; text-align:center}" +
	".hvut-check:hover {background-color:#fff; color:#000}" +
	".hvut-got {background-color:#06c; color:#fff; border-color:#009}" +
	".hvut-failed {background-color:#900; color:#fff; border-color:#300}" +
	".hvut-gift {display:none; position:absolute; top:2px; left:315px; padding:5px; border:1px solid; border-radius:3px; list-style:none; font-size:9pt; white-space:nowrap; background-color:#fff; z-index:3}" +
	".hvut-check:hover + .hvut-gift:not(:empty) {display:block}" +
	".hvut-result {position:absolute; top:24px; left:-78px; max-height:530px; min-width:200px; margin:0; padding:5px; overflow:auto; border:1px solid; list-style:none; background-color:#fff; text-align:center; white-space:nowrap; font-size:11pt; line-height:16pt; z-index:1; cursor:default}"
);

_ml.mobs = [];
_ml.names = {};
_ml.gift = {};

_ml.feed = function(m,t) {
	if(!m.status) {
		return;
	}
	m.status = 0;
	m.checkDiv.textContent = "Checking";
	ajax("/?s=Bazaar&ss=ml&slot="+m.index,t?"food_action="+t:"",function(r){_ml.update(m,r.responseText);},function(){_ml.update(m,-1);});
};

_ml.update = function(m,html) {
	if(html === -1) {
		m.status = -1;
		m.checkDiv.textContent = "Failed";
		m.checkDiv.classList.add("hvut-failed");

	} else {
		m.status = 1;
		m.checkDiv.classList.remove("hvut-failed");

		var reg = /width:(\d+)px/g;
		//reg.lastIndex = html.indexOf("http://ehgt.org/v/monster/hungerbar.png");
		reg.lastIndex = html.indexOf("/y/monster/hungerbar.png");

		var hunger = Number(reg.exec(html) && RegExp.$1);
		//reg.lastIndex = html.indexOf("http://ehgt.org/v/monster/moralebar.png");
		reg.lastIndex = html.indexOf("/y/monster/moralebar.png");
		var morale = Number(reg.exec(html) && RegExp.$1);

		console.log('hunger:'+hunger+' morale'+morale);

		var reg2 = /(\d+)<\/div>/g;
		reg2.lastIndex = html.indexOf("Battles Won");
		var won = Number(reg2.exec(html) && RegExp.$1);
		reg2.lastIndex = html.indexOf("Killing Blows");
		var kill = Number(reg2.exec(html) && RegExp.$1);

		m.winText.textContent = won + " / " + kill;
		m.hungerText.textContent = m.hunger = hunger * 100;
		m.hungerImg.style.width = hunger+"px";
		if(!settings.disableMorale) m.moraleText.textContent = m.morale = morale * 100;
		m.moraleImg.style.width = morale+"px";

		/*
		html = html.substring(html.indexOf('<div id="messagebox"'),html.indexOf('<!-- /messagebox -->'));
		if(html) {
			var box = $element("div",null,["/"+html]);
			$qsa("#messagebox > div:nth-child(2) > div:nth-child(n+3)",box).forEach(function(d){
				var text = d.textContent.trim();
				if(!text) {
					return;
				}
				text = text.replace(/^Received (?:a|some) /,"");
				m.gift.push(text);
				$element("li",m.giftUl,text);

				if(!_ml.gift.hasOwnProperty(text)) {
					_ml.gift[text] = 0;
				}
				_ml.gift[text]++;
			});
		}
		*/

		if(m.gift.length) {
			m.checkDiv.textContent = m.gift.length;
			m.checkDiv.classList.add("hvut-got");
		} else {
			m.checkDiv.textContent = "-";
			m.checkDiv.classList.remove("hvut-got");
		}
	}

	_ml.summary();
};

_ml.summary = function() {
	var array = [],
		result = $element(),
		sort = ["Binding","High-Grade","Mid-Grade","Low-Grade"];

	for(var g in _ml.gift) {
		array.push({item:g,count:_ml.gift[g]});
	}

	if(array.length) {
		array.sort(function(a,b){var ai=-1,bi=-1;sort.forEach(function(e,i){if(a.item.indexOf(e)!==-1){ai=i;}if(b.item.indexOf(e)!==-1){bi=i;}});return ai-bi || (a.item>b.item)*2-1;});
		array.forEach(function(g){
			$element("li",result,g.count+"x "+g.item);
		});

	} else {
		$element("li",result,"No Gifts");
	}

	var failed = _ml.mobs.reduce(function(p,c){return p+(c.status===-1);},0);

	_ml.result_ul.innerHTML = "";
	if(failed) {
		$element("li",_ml.result_ul,"["+failed+"x failed to load]");
	}
	_ml.result_ul.appendChild(result);
	_ml.result_ul.classList.remove("hvut-hide");
};


_ml.div = $element("div",$id("slot_pane").previousElementSibling,[".hvut-buttons"],function(e){e.stopPropagation();});
$element("input",_ml.div,{type:"button",value:"Summary"},function(){_ml.result_ul.classList.toggle("hvut-hide");});
$element("input",_ml.div,{type:"button",value:"Check All",style:"margin-left:100px"},function(){_ml.mobs.forEach(function(m){_ml.feed(m);});});

$element("input",_ml.div,{type:"button",value:"Pill All",style:"margin-left:50px",disabled:settings.disableMorale},function(){_ml.mobs.forEach(function(m){_ml.feed(m,"happyhappyjoyjoy");});});
$element("input",_ml.div,{type:"button",value:"Under "+settings.monsterMorale,disabled:settings.disableMorale},function(){_ml.mobs.forEach(function(m){_ml.feed(m,m.morale<settings.monsterMorale?"happyhappyjoyjoy":"");});});

$element("input",_ml.div,{type:"button",value:"Feed All",style:"margin-left:50px"},function(){_ml.mobs.forEach(function(m){_ml.feed(m,"feedmax");});});
$element("input",_ml.div,{type:"button",value:"Under "+settings.monsterHunger},function(){_ml.mobs.forEach(function(m){_ml.feed(m,m.hunger<settings.monsterHunger?"feedmax":"");});});

_ml.result_ul = $element("ul",_ml.div,[".hvut-result hvut-hide"]);


$qsa("#slot_pane > div").forEach(function(div,i){
	if(div.getAttribute("onclick").indexOf("&act=create") !== -1) {
		return;
	}

	var mob = _ml.mobs[i+1] = {index:i+1,status:2,gift:[]};
	_ml.names[div.children[1].textContent.trim()] = i+1;

	mob.winText = $element("div",div,[".hvut-win"]);
	mob.checkDiv = $element("div",div,[" -",".hvut-check"],function(e){_ml.feed(mob);e.stopPropagation();});

	var hungerDiv = div.children[6],
		hungerImg = mob.hungerImg = hungerDiv.firstElementChild.firstElementChild,
		moraleDiv = div.children[7],
		moraleImg = mob.moraleImg = moraleDiv.firstElementChild.firstElementChild;

	mob.hunger = hungerImg.width * 100;
	if(!settings.disableMorale) mob.morale = moraleImg.width * 100;

	mob.hungerText = $element("div",hungerDiv,[" "+mob.hunger,".hvut-feed"],function(e){_ml.feed(mob,"feedmax");e.stopPropagation();});
	if(!settings.disableMorale) mob.moraleText = $element("div",moraleDiv,[" "+mob.morale,".hvut-feed"],function(e){_ml.feed(mob,"happyhappyjoyjoy");e.stopPropagation();});
	mob.giftUl = $element("div",div,[".hvut-gift"]);
});

$qsa("#messagebox .cmb6").forEach(function(d){
	var text = d.textContent.trim();
	if(!text) {
		return;
	} else if(/^(.+) brought you a gift!$/.exec(text)) {
		_ml.current = _ml.names[RegExp.$1];
	} else {
		text = text.match(/^Received (?:a|some) (.+)\.$/,"") && RegExp.$1 || text;

		var m = _ml.mobs[_ml.current];
		m.gift.push(text);
		$element("li",m.giftUl,text);

		if(!_ml.gift.hasOwnProperty(text)) {
			_ml.gift[text] = 0;
		}
		_ml.gift[text]++;


		if(m.gift.length) {
			m.checkDiv.textContent = m.gift.length;
			m.checkDiv.classList.add("hvut-got");
		} else {
			m.checkDiv.textContent = "-";
			m.checkDiv.classList.remove("hvut-got");
		}
	}
});

_ml.summary();

}


// MoogleMail
} else if(settings.moogleMail && loc.s==="Bazaar" && loc.ss==="mm") {

// MM write
if(loc.filter === "new") {

GM_addStyle(
	"#mainpane {width:1086px !important}" +
	"#mailform > #leftpane {z-index:4 !important}" +
	"#mailform > #leftpane > div:last-child {position:absolute !important; top:0; left:500px; width:500px !important}" +
	".hvut-msg {position:absolute; top:-60px; right:20px; padding:5px; white-space:nowrap; font-size:12pt; font-weight:bold}" +
	".hvut-btns {position:absolute; top:30px; left:30px; white-space:nowrap; text-align:left}" +
	".hvut-invalid {color:#c00}" +
	"#mm_dynattach {height:auto !important; padding-top:35px !important}" +
	"#pane_item > div:nth-child(2) {margin-left:0 !important; width:580px !important}" +
	"#item td:first-child {width:200px}" +
	".hvut-sub {white-space:nowrap; text-align:left}" +
	".hvut-sub-equip {position:absolute; left:370px}" +
	".hvut-sub > input {text-align:right}" +
	".hvut-count {width:40px}" +
	".hvut-max {color:#c00}" +
	".hvut-price {width:50px}" +
	".hvut-cod {width:70px}" +
	".hvut-sub > input::-moz-placeholder {color:#666}"
);

if($qs("textarea.stdinput")) {
	$element("div",[$qs("textarea.stdinput").parentNode,$qs("textarea.stdinput")],{textContent:"Templates: {$name} {$count} {$cod} {$price} {$link} {$level}",style:"margin:5px 15px;font-size:10pt;font-weight:bold;text-align:left"});
}


_mm.status = 0;
_mm.url = "/?s=Bazaar&ss=mm&filter=new";
_mm.queue = [];
_mm.index = 0;
_mm.current = {};
_mm.invalids = [];
_mm.unsent = 0;
_mm.msg = $element("div",$id("rightpane"),[".hvut-msg"]);
_mm.preset = getValue("price",settings.price);

_mm.send_queue = function(queue) {
	if(_mm.status) {
		_mm.msg.textContent = "Now sending other mail";
		return;
	}

	if(queue.constructor !== Array) {
		queue = [queue];
	}
	if(queue.length) {
		_mm.status = 1;

		var form = $id("mailform").elements;
		_mm.postkey = form["postkey"].value;
		_mm.to = form["message_to_name"].value.trim();
		_mm.subject = form["message_subject"].value.trim();
		_mm.body = form["message_body"].value;

		_mm.queue = queue;
		_mm.index = 0;
		_mm.unsent = 0;
		_mm.attach(_mm.queue[0]);
	} else {
		_mm.msg.textContent = "No items selected";
	}
};

_mm.reset_queue = function() {
	_mm.discard();
	_mm.status = 0;
	_mm.queue = [];
	_mm.index = 0;
	_mm.current = {};
	setTimeout(function(){_mm.msg.textContent="";},5000);
};

_mm.finish = function() {
	if(_mm.unsent) {
		_mm.msg.textContent = "Failed to send "+_mm.unsent+" of "+_mm.index+" mail";
	} else {
		_mm.msg.textContent = "Successfully sent all mail!";
		setTimeout(function(){location.href="/?s=Bazaar&ss=mm&filter=sent";},2000);
	}
	_mm.status = 0;
	_mm.reset_queue();
};

_mm.next = function(v) {
	var current = _mm.current;

	_mm.msg.textContent = v + " ("+(_mm.index+1)+"/"+_mm.queue.length+")";

	if(current.sendBtn) {
		if(v === "sent") {
			current.sendBtn.textContent = "sent";
		} else if(v.substr(0,5) === "fail:") {
			current.sendBtn.textContent = "fail";
		}
	}

	if(v.substr(0,5) === "fail:") {
		_mm.unsent++;
		if(v === "fail:invalid recipient") {
			if(_mm.invalids.indexOf(current.to) === -1) {
				_mm.invalids.push(current.to);
			}
		}
	}
	if(v==="sent" || v.substr(0,5) === "fail:") {
		_mm.index++;
		if(_mm.index<_mm.queue.length) {
			_mm.attach(_mm.queue[_mm.index]);

		} else {
			_mm.discard();
			_mm.finish();
		}
	}
};

_mm.attach = function(current) {
	_mm.current = current;
	current.to = current.to || _mm.to;

	if(!current.count) {
		_mm.next("fail:no item");
		return;
	} else if(!current.to) {
		_mm.next("fail:no recipient");
		return;
	} else if(_mm.invalids.indexOf(current.to)!==-1) {
		_mm.next("fail:invalid recipient");
		return;
	}

	_mm.next("attach");

	var post =
		"action=attach_add"+
		"&message_body="+
		"&message_subject="+
		"&message_to_name="+
		"&postkey="+_mm.postkey;

	if(current.type === "item") {
		post += "&select_count="+current.count+
				"&select_item="+current.id+
				"&select_pane=item";

	} else if(current.type === "equip") {
		post += "&select_count=1"+
				"&select_item="+current.id+
				"&select_pane=equip";

	} else if(current.type === "credits") {
		post += "&credhath_count="+current.count+
				"&select_count="+current.count+
				"&select_item=1"+
				"&select_pane=credhath";

	} else if(current.type === "hath") {
		post += "&credhath_count="+current.count+
				"&select_count="+current.count+
				"&select_item=2"+
				"&select_pane=credhath";

	} else {
		_mm.next("fail:invalid type");
		return;
	}

	ajax(_mm.url,post,
		function(r){ // success
			if(r.responseText.match(/<p class="emsg">(.+?)<\/p>/)) {
				_mm.next("fail:"+RegExp.$1);
				return;
			}

			if(current.cod) {
				_mm.cod();
			} else {
				_mm.send();
			}
		},
		function(r){ // failed
			_mm.next("fail:attach");
		}
	);
};

_mm.cod = function() {
	_mm.next("cod");

	var current = _mm.current;
	var post =
		"action=attach_cod"+
		"&action_value="+current.cod+
		"&message_body="+
		"&message_subject="+
		"&message_to_name="+
		"&postkey="+_mm.postkey;

	ajax(_mm.url,post,
		function(){
			_mm.send();
		},
		function(){
			_mm.next("fail:cod");
		}
	);
};

_mm.send = function() {
	_mm.next("send");

	var current = _mm.current,
		to = current.to,
		subject = (_mm.subject || (current.type==="equip"?"{$name}" : (current.type==="credits"||current.type==="hath")? "{$count} {$name}" : "{$count}x {$name}"))
			.replace(/\{\$(name|count|price|cod|link|level)\}/g,function(s,t){return ({name:current.name,count:current.count.toLocaleString(),price:current.price.toLocaleString(),cod:current.cod.toLocaleString(),link:current.key?"http://hentaiverse.org/pages/showequip.php?eid="+current.id+"&key="+current.key:"",level:current.bound})[t];}),
		body = (_mm.body || (current.type==="equip"?"{$link}" : current.cod?"CoD: {$count}x {$price}c = {$cod} Credits" : ""))
			.replace(/\{\$(name|count|price|cod|link|level)\}/g,function(s,t){return ({name:current.name,count:current.count.toLocaleString(),price:current.price.toLocaleString(),cod:current.cod.toLocaleString(),link:current.key?"http://hentaiverse.org/pages/showequip.php?eid="+current.id+"&key="+current.key:"",level:current.bound})[t];});

	var post =
		"action=send"+
		"&message_to_name="+encodeURIComponent(to)+
		"&message_subject="+encodeURIComponent(subject)+
		"&message_body="+encodeURIComponent(body)+
		"&postkey="+_mm.postkey;

	ajax(_mm.url,post,
		function(r){
			var html = r.responseText;
			if(html.indexOf('<img src="/y/mooglemail/writenew.png"')!==-1) {
				_mm.next("sent");

			} else {
				if(html.indexOf('<p class="emsg">You must at minimum specify a recipient and subject, kupo!</p>')!==-1) {
					_mm.next("fail:invalid recipient");

				} else {
					_mm.next("fail:unknown");

				}
			}
		},
		function(r){
			_mm.next("fail:send");
		}
	);
};

_mm.discard = function() {
	var post =
		"action=discard"+
		"&message_body="+
		"&message_subject="+
		"&message_to_name="+
		"&postkey="+_mm.postkey;

	ajax(_mm.url,post);
};

_mm.filter = function(list,search,keep) {
	search = search.trim();
	if(list.key === search) {
		return;
	}

	list.key = search;
	if(!keep) {
		list.input.value = search;
	}
	if(!search) {
		list.forEach(function(item){
			item.filtered = true;
			item.dom.classList.remove("hvut-hide");
		});
		return;
	}

	search = search.toLowerCase().split(";").filter(function(value){return value.trim();}).map(function(value){return value.trim().split(/\s+/);});

	list.forEach(function(item){
		var name = item.name.toLowerCase().replace(/ /g,"_");
		item.filtered = item.checkbox.checked || 
						search.some(function(value){
							return value.every(function(v){
								return name.indexOf(v)!==-1;
							});
						});
		item.dom.classList[item.filtered?"remove":"add"]("hvut-hide");
	});
};


// MM: Items
_mm.calc_items = function(item,mode,value) {
	var count,price,cod;

	if(mode==="count") {
		if(value[0]==="+" || value[0]==="-") {
			value = item.count + Number(value);
		}
		if(value==="max" || value>item.max) {
			count = item.max;
			item.countInput.classList.add("hvut-max");
		} else {
			count = parseInt(value,10) || 0;
			item.countInput.classList.remove("hvut-max");
		}

		price = item.price;
		cod = parseInt(count*price);

	} else {
		count = item.count;

		if(mode==="price") {
			price = Number(value);
			cod = parseInt(count*price);

		} else if(mode==="cod") {
			cod = parseInt(value);
			price = count ? Math.round((cod/count)*10)/10 : 0;
		}
	}

	item.countInput.value = (item.count = count) || "";
	item.priceInput.value = (item.price = price) || "";
	item.codInput.value = (item.cod = cod) || "";

	return true;
};

_mm.get_items = function(callback) {
	return _mm.items.filter(function(item) {
		if(item.filtered && item.checkbox.checked) {
			if(callback) {
				callback(item);
			}
			if(item.count) {
				return true;
			}
		}
	});
};

_mm.send_items = function() {
	if(!$id("mailform").elements["message_to_name"].value.trim()) {
		_mm.msg.textContent = "No recipient";
		return;
	}
	_mm.send_queue(_mm.get_items());
};

_mm.preset_items = function(p) {
	var preset = _mm.preset[p];
	_mm.items.key = "preset:\n"+p;
	_mm.items.forEach(function(item){
		if(preset.hasOwnProperty(item.name)) {
			item.filtered = true;
			item.dom.classList.remove("hvut-hide");
			item.checkbox.checked = true;
			if(preset[item.name]) {
				_mm.calc_items(item,"price",preset[item.name]);
			}

		} else {
		//} else if(!item.checkbox.checked) {
			item.filtered = false;
			item.dom.classList.add("hvut-hide");
		}

	});
};


_mm.items = [];
_mm.items.key = "";
_mm.item_btn = $element("div",$id("pane_item"),[".hvut-btns"]);
$id("pane_item").firstElementChild.innerHTML = "";

_mm.items.input = $element("input",_mm.item_btn,{type:"text",placeholder:"keyword; keyword; keyword"},{keypress:function(e){e.stopPropagation();},keyup:function(e){if(e.keyCode===27){_mm.filter(_mm.items,"");}else{_mm.filter(_mm.items,_mm.items.input.value,true);}}});

$element("input",_mm.item_btn,{type:"button",value:"Reset"},function(){_mm.filter(_mm.items,"");});
_mm.items.checkAll = $element("input",_mm.item_btn,{type:"checkbox"},function(){_mm.items.forEach(function(item){if(item.filtered){item.checkbox.checked=_mm.items.checkAll.checked;}});});

$element("input",_mm.item_btn,{type:"text",placeholder:"count",style:"width:50px;text-align:right;margin-left:20px"},{keyup:function(){var count=parseInt(this.value);if(count!==isNaN){_mm.get_items(function(item){_mm.calc_items(item,"count",count);});}}});
$element("input",_mm.item_btn,{type:"button",value:"+100"},function(){_mm.get_items(function(item){_mm.calc_items(item,"count","+100");});});
$element("input",_mm.item_btn,{type:"button",value:"+1k"},function(){_mm.get_items(function(item){_mm.calc_items(item,"count","+1000");});});
$element("input",_mm.item_btn,{type:"button",value:"+10k"},function(){_mm.get_items(function(item){_mm.calc_items(item,"count","+10000");});});
$element("input",_mm.item_btn,{type:"button",value:"All"},function(){_mm.get_items(function(item){_mm.calc_items(item,"count","max");});});
$element("input",_mm.item_btn,{type:"button",value:"0"},function(){_mm.get_items(function(item){_mm.calc_items(item,"count","");});});

$element("input",_mm.item_btn,{type:"button",value:"Send",style:"position:absolute;top:-25px;left:475px;font-weight:bold"},function(){_mm.send_items();});
$element("br",_mm.item_btn);

for(var _p in _mm.preset) {
	$element("input",_mm.item_btn,{type:"button",value:_p},(function(p){return function(){_mm.preset_items(p);};})(_p));
}
_p = null;

$qsa("#item > table > tbody > tr").forEach(function(tr){
	var item = {
		type : "item",
		name : tr.cells[0].textContent.trim(),
		id : tr.cells[0].firstElementChild.id.match(/^(\d+)item$/) && RegExp.$1,
		max : Number(tr.cells[1].textContent.trim()),
		count : 0,
		price : 0,
		cod : 0,
		filtered : true,
		dom : tr
	};
	_mm.items.push(item);

	var sub = $element("td",null,[".hvut-sub"]);
	item.checkbox = $element("input",sub,{type:"checkbox"});
	item.countInput = $element("input",sub,{type:"text",placeholder:"count",pattern:"\\d*",className:"hvut-count"},{change:function(){_mm.calc_items(item,"count",item.countInput.value);}});
	$element("input",sub,{type:"button",value:"all"},function(){_mm.calc_items(item,"count","max");});
	item.priceInput = $element("input",sub,{type:"text",placeholder:"price",pattern:"\\d*(\\.\\d+)?",className:"hvut-price"},{change:function(){_mm.calc_items(item,"price",item.priceInput.value);}});
	item.codInput = $element("input",sub,{type:"text",placeholder:"CoD",pattern:"\\d*",className:"hvut-cod",value:""},{change:function(){_mm.calc_items(item,"cod",item.codInput.value);}});
	item.sendBtn = $element("input",sub,{type:"button",value:"send"},function(){_mm.send_queue(item);});

	tr.appendChild(sub);
});

$id("leftpane").children[1].firstElementChild.click();


// MM: equip
_mm.calc_equip = function(item,mode,value) {
	var cod;

	if(mode==="cod") {
		cod = parseInt(value);
	} else {
		cod = 0;
	}

	item.price = cod;
	item.codInput.value = (item.cod = cod) || "";

	return true;
};

_mm.get_equip = function(callback) {
	return _mm.equip.filter(function(item) {
		if(item.filtered && item.checkbox.checked && !item.lockBtn.classList.contains("il") && !item.lockBtn.classList.contains("ilp")) {
			if(callback) {
				callback(item);
			}
			return true;
		}
	});
};

_mm.send_equip = function() {
	if(!$id("mailform").elements["message_to_name"].value.trim()) {
		_mm.msg.textContent = "No recipient";
		return;
	}
	_mm.send_queue(_mm.get_equip());
};

_mm.equip = [];
_mm.equip.key = "";

_mm.equip_btn = $element("div",$id("pane_equip"),[".hvut-btns"]);
$id("pane_equip").firstElementChild.innerHTML = "";

_mm.equip.input = $element("input",_mm.equip_btn,{type:"text",placeholder:"keyword; keyword; keyword"},{keypress:function(e){e.stopPropagation();},keyup:function(e){if(e.keyCode===27){_mm.filter(_mm.equip,"");}else{_mm.filter(_mm.equip,_mm.equip.input.value,true);}}});

$element("input",_mm.equip_btn,{type:"button",value:"Reset"},function(){_mm.filter(_mm.equip,"");});
_mm.equip.checkAll = $element("input",_mm.equip_btn,{type:"checkbox"},function(){_mm.equip.forEach(function(item){if(item.filtered){item.checkbox.checked=_mm.equip.checkAll.checked;}});});
$element("input",_mm.equip_btn,{type:"button",value:"Send",style:"position:absolute;top:-25px;left:475px;font-weight:bold"},function(){_mm.send_equip();});

$qsa("#equip > div").forEach(function(div){
	var d = equip_parser.div(div.children[1]);
	var item = {
		type : "equip",
		name : d.name,
		id : d.eid,
		key : d.key,
		bound : d.bound,
		count : 1,
		price : 0,
		cod : 0,
		filtered : true,
		dom : div,
		lockBtn : div.firstElementChild
	};
	_mm.equip.push(item);

	var sub = $element("div",null,[".hvut-sub hvut-sub-equip"]);
	item.checkbox = $element("input",sub,{type:"checkbox"});
	item.codInput = $element("input",sub,{type:"text",placeholder:"CoD",pattern:"\\d*",className:"hvut-cod",value:""},{change:function(){_mm.calc_equip(item,"cod",item.codInput.value);}});
	item.sendBtn = $element("input",sub,{type:"button",value:"send"},function(){_mm.send_queue(item);});

	div.appendChild(sub);
});


// MM: Credits / Hath
_mm.validate_credits = function() {
	var reg = /^([1-9](?:[0-9]+|[0-9]{0,2}(?:,[0-9]{3})+)?(?:\.[0-9]+)?)\s*(k|m|c|h)?$/i,
		exec;

	if( (exec=reg.exec(_mm.credits_input.value.trim())) ) {
		var unit = exec[2] && exec[2].toLowerCase();
		_mm.credits_count = parseInt(exec[1].replace(/,/g,"") * (unit==="k"?1000 : unit==="m"?1000000 : 1));
		_mm.credits_type = unit==="h" ? "hath" : "credits";
		_mm.credits_input.classList.remove("hvut-invalid");

	} else {
		_mm.credits_count = 0;
		_mm.credits_type = null;
		_mm.credits_input.classList.add("hvut-invalid");
	}
};

_mm.send_credits = function(text) {
	var queue = [],
		reg = /^(.+?);(?:\s*([1-9](?:[0-9]+|[0-9]{0,2}(?:,[0-9]{3})+)?(?:\.[0-9]+)?)\s*(k|m|c|h)?)?$/i,
		exec,
		invalids = [];

	_mm.validate_credits();

	text.trim().split("\n").forEach(function(t,i){
		if( !(t=t.trim()) ) {
			return;
		}
		if( !(exec=reg.exec(t)) ) {
			invalids.push({text:t,line:i});
			return;
		}

		var to = exec[1].trim(),
			unit = exec[3] && exec[3].toLowerCase(),
			count = !exec[2] ? _mm.credits_count : parseInt(exec[2].replace(/,/g,"") * (unit==="k"?1000 : unit==="m"?1000000 : 1)),
			type = !exec[2] ? _mm.credits_type : unit==="h" ? "hath" : "credits",
			name = type==="hath"?"Hath" : "Credits";

		if(!to || !count || !type) {
			invalids.push({text:t,line:i});
			return;
		}
		queue.push({type:type,name:name,to:to,count:count});
	});

	if(invalids.length) {
		alert(
			"! Invalid lines\n\n" +
			invalids.map(function(t){
				return "[line "+t.line+"] "+t.text;
			}).join("\n")
		);
		return;
	}

	_mm.send_queue(queue);
};

_mm.credits = [];

_mm.credits_btn = $element("div",$id("pane_credhath"),[".hvut-btns"]);
$id("pane_credhath").firstElementChild.innerHTML = "";
$id("pane_credhath").children[1].style.paddingTop = "10px";
$id("pane_credhath").children[1].style.height = "120px";

$element("input",_mm.credits_btn,{type:"button",value:"Multi Credits/Hath Sender"},function(){_mm.credits_div.classList.toggle("hvut-hide");});

_mm.credits_div = $element("div",[$id("pane_credhath"),$id("pane_credhath").children[1]],{className:"hvut-hide",style:"clear:both;margin-top:20px;height:280px"});

_mm.credits_input = $element("input",_mm.credits_div,{placeholder:"550k / 12.5m / 30 H",style:"width:150px;text-align:center"},{focus:function(){_mm.validate_credits();},blur:function(){_mm.validate_credits();},change:function(){_mm.validate_credits();},keyup:function(){_mm.validate_credits();}});
$element("input",_mm.credits_div,{type:"button",value:"Send"},function(){_mm.send_credits(_mm.credits_text.value);});
$element("br",_mm.credits_div);
_mm.credits_text = $element("textarea",_mm.credits_div,{style:"width:300px;height:240px"});


// MM: data
} else {

GM_addStyle(
	".hvut-div {overflow:auto; padding:0 !important; height:516px !important}" +
	".hvut-div > .hvut-list {width:1030px; margin:15px 10px; padding:0; list-style:none; text-align:left; font-size:10pt; line-height:22px; white-space:nowrap}" +

	".hvut-result {position:absolute; top:100px; left:10px; width:1060px; height:560px; background-color:rgba(255,255,255,.9); border-radius:5px; border:1px solid #930; text-align:left; font-size:10pt}" +
	".hvut-result:empty {display:none}" +
	".hvut-result > .hvut-list {width:1050px; max-height:500px; margin:0 auto; padding:0; list-style:none; overflow:auto; white-space:nowrap; font-size:10pt; line-height:20px}" +

	".hvut-list li {display:flex; border-bottom:1px solid #500}" +
	".hvut-list li.hvut-returned {background-color:#ddd; color:#333}" +
	".hvut-list li.hvut-unread {background-color:#ecb}" +
	".hvut-list li.hvut-nodb {background-color:#ecc}" +
	".hvut-list li.hvut-current {background-color:#cdf}" +
	".hvut-list li.hvut-removed {text-decoration:line-through}" +
	".hvut-list li:hover {background-color:#ded}" +
	".hvut-list li.hvut-header {font-size:12pt; background-color:#db9; border-top:1px solid; border-bottom:3px double; font-weight:bold}" +
	".hvut-list li.hvut-nomail {padding-left:20px; background-color:#fed}" +
	".hvut-list li.hvut-loading {padding-left:20px; color:#c00; background-color:#fdc; border:1px solid}" +
	".hvut-list li > span {padding:0 5px; overflow:hidden; text-overflow:ellipsis}" +
	".hvut-list a {font-weight:bold; text-decoration:none}" +
	".hvut-list .hvut-type {width:50px}" +
	".hvut-list .hvut-name {width:150px}" +
	".hvut-list .hvut-subject {flex:1}" +
	".hvut-list .hvut-attached {width:200px}" +
	".hvut-list .hvut-cod {width:100px; padding-right:10px; text-align:right}" +
	".hvut-list .hvut-sent {width:100px}" +
	".hvut-list .hvut-read {width:100px}" +
	".hvut-list .hvut-link {margin-right:5px; padding:0 3px; border:1px solid; border-radius:3px; color:#930; background-color:rgba(255,255,255,.3); text-decoration:none; font-weight:normal}" +

	".hvut-attach-credits {color:#009}" +
	".hvut-attach-hath {color:#f09}" +
	".hvut-attach-item {color:#090}" +
	".hvut-attach-equip {color:#f00}" +

	".hvut-page {margin-top:10px}" +
	".hvut-page > input {margin:0 3px}" +
	".hvut-page > a {font-size:12pt; margin:0 3px}" +
	".hvut-search {position:absolute; top:10px; left:250px; text-align:left; line-height:20pt}" +
	".hvut-search > * {margin-right:10px}" +

	".hvut-mail {position:absolute; top:150px; left:460px; width:550px; height:450px; background-color:rgba(255,255,255,.9); border-radius:5px; border:1px solid #930; text-align:left; font-size:10pt}" +
	".hvut-mail:empty {display:none}" +
	".hvut-mail div.hvut-loading {margin:20px 30px; color:#c00; font-size:12pt}" +
	".hvut-mail > dl {margin:20px 40px}" +
	".hvut-mail > dl:after {content:''; display:block; clear:both}" +
	".hvut-mail dt {float:left; clear:left; width:60px; margin:5px}" +
	".hvut-mail dd {float:left; font-weight:bold; margin:5px}" +
	".hvut-attach {color:#c00}" +
	".hvut-taken {color:#999}" +
	".hvut-button {margin:20px 40px}" +
	".hvut-button > span {margin:5px; padding:3px 5px; border:1px solid #c96; background-color:#fff; border-radius:3px; color:#930; font-weight:bold; cursor:pointer}" +
	".hvut-button > span:hover {background-color:#dca}" +
	".hvut-text {margin:20px; padding:10px; max-height:230px; border:1px solid #300; overflow:auto}"
);


_mm.db = null;
_mm.version = 1;
_mm.mail = {};
_mm.queue = [];
_mm.current = null;
_mm.filter = loc.filter!=="read" && loc.filter!=="sent" ? "inbox" : loc.filter;
_mm.ul = [];

_mm.db_open = function(callback) {
	var request = indexedDB.open("hvut",_mm.version);
	request.onsuccess = function(e){
		_mm.db = e.target.result;
		if(callback) {
			callback();
		}
	};
	request.onupgradeneeded = function(e){
		var db = e.target.result;
		if(!db.objectStoreNames.contains("mm")) {
			db.createObjectStore("mm", {keyPath:"mid"});
		}
	};
	request.onerror = function(e){
		console.log("open db: error",e);
	};
};

_mm.db_conn = function(mode,oncomplete) {
	var transaction = _mm.db.transaction("mm",mode||"readonly");
	if(oncomplete) {
		transaction.oncomplete = oncomplete;
	}
	transaction.onerror = function(e){
		console.log("transaction: error",e);
	};
	return transaction.objectStore("mm");
};

_mm.db_update = function() {
	var queue = _mm.queue;
	if(!queue.length) {
		return;
	}

	if(queue.some(function(mid){if(!_mm.mail[mid].loaded){return true;}})) {
		return;
	}

	var conn = _mm.db_conn("readwrite");
	queue.forEach(function(mid){
		var mail = _mm.mail[mid],
			data = {
				mid : mid,
				filter : mail.filter,
				name : mail.name,
				subject : mail.subject,
				text : mail.text,
				sentdate : mail.sentdate,
				readdate : mail.readdate,
				attach_type : mail.attach_type,
				attach_name : mail.attach_name,
				attach_count : mail.attach_count,
				attach_cod : mail.attach_cod,
				returned : mail.returned
			};

		if(mail.no_db) {
			conn.add(data);
		} else {
			conn.put(data);
		}

	});

	queue.length = 0;
};


_mm.list = function(table,page) {
	var conn = _mm.db_conn(null,function(){if(frag){ul.appendChild(frag);ul.scrollIntoView();}}),
		rows = table.rows,
		tr,cells,ul,li;

	tr = rows[0];
	cells = tr.cells;

	ul = _mm.ul[page];
	ul.innerHTML = "";

	li = $element("li",ul,[".hvut-header"]);
	$element("span",li,[" "+(_mm.filter==="sent"?"To":"From"),".hvut-name"]);
	$element("span",li,[" "+page+" Page",".hvut-subject"]);
	$element("span",li,[" Attachment",".hvut-attached"]);
	$element("span",li,[" CoD",".hvut-cod"]);
	$element("span",li,[" Sent",".hvut-sent"]);
	$element("span",li,[" Read",".hvut-read"]);

	if(page === 0) {
		_mm.newer_button.disabled = true;
	}

	if(rows.length < 21) {
		_mm.page_older = false;
		_mm.older_button.disabled = true;

		if(rows[1].cells.length!==4 && rows[1].cells[0].textContent.trim()==="No New Mail") {
			$element("li",_mm.ul[page],[" No New Mail",".hvut-nomail"]);
			return;
		}
	}

	var frag=$element(),
		i,l,mid,
		reg_link = /filter=(\w+)&mid=(\d+)/,
		reg_date = /(\d+)-(\d+)-(\d+) (\d+):(\d+)/;

	for(i=1,l=rows.length; i<l; i++) {
		tr = rows[i];
		cells = tr.cells;
		mid = reg_link.exec(tr.getAttribute("onclick"))[2];

		if(_mm.mail[mid]) {
			continue;
		}

		(function(){
			var mail = _mm.mail[mid] = {
				li : $element("li",frag),
				mid : mid,
				filter : _mm.filter,
				name : cells[0].textContent,
				subject : cells[1].textContent,
				sentdate : cells[2].textContent.trim().match(reg_date) ? Date.UTC(RegExp.$1,RegExp.$2-1,RegExp.$3,RegExp.$4,RegExp.$5) : 0,
				readdate : cells[3].textContent.trim().match(reg_date) ? Date.UTC(RegExp.$1,RegExp.$2-1,RegExp.$3,RegExp.$4,RegExp.$5) : 0
			};

			conn.get(mid).onsuccess = function(e) {
				var data = e.target.result;
				if(!data) {
					data = {};
					mail.no_db = true;
				}

				var link = "/?s=Bazaar&ss=mm&filter="+mail.filter+"&mid="+mail.mid+"&page="+page;

				$element("span",mail.li,[".hvut-name"]);

				var span = $element("span",mail.li,[".hvut-subject"]);
				$element("a",span,{href:link,textContent:"↗",target:"_blank",className:"hvut-link"});
				$element("a",span,{href:link},function(e){e.preventDefault();_mm.load_mail(mail.mid,"view");});

				$element("span",mail.li,[".hvut-attached"]);
				$element("span",mail.li,[".hvut-cod"]);
				$element("span",mail.li,[".hvut-sent"]);
				$element("span",mail.li,[".hvut-read"]);

				if(data.no_db || data.filter!==mail.filter || data.sentdate!==mail.sentdate || data.readdate!==mail.readdate) {
					if(mail.filter !== "inbox") {
						_mm.load_mail(mail.mid,"list");
					}

				} else {
					mail.name = data.name;
					mail.subject = data.subject;
					mail.attach_type = data.attach_type;
					mail.attach_name = data.attach_name;
					mail.attach_count = data.attach_count;
					mail.attach_cod = data.attach_cod;
					mail.returned = data.returned;
					mail.no_db = data.no_db;
				}

				_mm.mod_li(mail.mid);
			};
		})();
	}

};

_mm.read_list = function(p) {
	var page;
	if(p === "newer") {
		if(_mm.page_newer < 1) {
			return;
		}
		page = --_mm.page_newer;

	} else if(p === "older") {
		if(_mm.page_older === false) {
			return;
		}
		page = ++_mm.page_older;

	} else {
		return;
	}

	_mm.ul[page] = $element("ul",[_mm.list_div,_mm.ul[page+1]],[".hvut-list"]);
	$element("li",_mm.ul[page],[" Loading...",".hvut-loading"]);
	_mm.ul[page].scrollIntoView();
	_mm.load_list(page);
};

_mm.load_list = function(page) {
	ajax("/?s=Bazaar&ss=mm&filter="+_mm.filter+"&page="+page,null,
		function(r){
			var html = r.responseText,
				s = html.indexOf("<table",html.indexOf('<div id="mainpane">')),
				e = html.indexOf("</table>",s),
				table = $element("div",null,["/"+html.substring(s,e)+"</table>"]).firstChild;

			_mm.list(table,page);
		},
		function(){_mm.load_list(page);}
	);
};

_mm.mod_li = function(mid) {
	var mail = _mm.mail[mid],
		li = mail.li;

	if(!li) {
		return;
	}

	if(mail.filter !== _mm.filter) {
		li.classList.add("hvut-removed");
	}
	if(mail.returned) {
		li.classList.add("hvut-returned");
	}
	li.classList[mail.no_db?"add":"remove"]("hvut-nodb");

	li.classList[mail.readdate?"remove":"add"]("hvut-unread");

	li.children[0].textContent = mail.name;
	li.children[1].children[1].textContent = mail.subject;
	if(mail.attach_type) {
		li.children[2].classList.add("hvut-attach-"+mail.attach_type);
		li.children[2].textContent = mail.attach_type==="equip"?("["+mail.attach_name+"]") : mail.attach_count.toLocaleString() + (mail.attach_type==="credits"?" Credits" : mail.attach_type==="hath"?" Hath" : "x "+mail.attach_name);
	}
	li.children[3].textContent = mail.attach_cod ? mail.attach_cod.toLocaleString() : "";
	li.children[4].textContent = date_format(new Date(mail.sentdate));
	li.children[5].textContent = mail.readdate ? date_format(new Date(mail.readdate)) : "Never";
};

_mm.load_mail = function(mid,flag,post) {
	if(flag === "view") {
		var mail = _mm.mail[mid],
			current = _mm.mail[_mm.current] || {};

		if(current.li) {
			current.li.classList.remove("hvut-current");
		}
		if(current.result_li) {
			current.result_li.classList.remove("hvut-current");
		}

		if(mail.li) {
			mail.li.classList.add("hvut-current");
		}
		if(mail.result_li) {
			mail.result_li.classList.add("hvut-current");
		}

		_mm.current = mid;
		_mm.mail_div.innerHTML = "";
		$element("div",_mm.mail_div,[" Loading...",".hvut-loading"]);

	}

	_mm.queue.push(mid);

	ajax("/?s=Bazaar&ss=mm&mid="+mid,post,
		_mm.read_mail,
		function(){_mm.load_mail(mid,flag,post);}
	);
};

_mm.read_mail = function(r) {
	var mid = r.finalUrl.match(/&mid=(\d+)/)[1],
		html = r.responseText,
		s = html.indexOf('<form id="mailform"'),
		e = html.indexOf("</form>",s),
		form,attach;

	if(s!==-1 && html.indexOf('<p class="emsg">You cannot read that, kupo!</p>')===-1) {
		form = $element("div",null,["/"+html.substring(s,e)+"</form>"]).firstChild;
		attach = html.match(/<script type="text\/javascript">\nvar send_cost = (\d+);\nvar attach_id = (\d+);\nvar attach_count = (\d+);\nvar attach_name = "(.*)";\nvar attach_cod = (\d+);\nvar mail_state = (\d+);\n<\/script>/);
		attach = {id:Number(attach[2]),count:Number(attach[3]),name:attach[4],cod:Number(attach[5])};
	}

	if(!form) {
		if(html.indexOf('<div id="togpane_log"') !== -1) {
			return;
		}

		_mm.db_conn("readwrite").delete(mid);
		return;
	}

	var table = $qs("#leftpane > table",form),
		to = table.rows[0].cells[1].textContent,
		from = table.rows[1].cells[1].textContent,
		subject = table.rows[2].cells[1].textContent,
		body = $qs("#leftpane > div",form).innerHTML,
		text = body.replace(/<br( *\/)?>/g,"\n").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&"),
		postkey = $qs("#postkey",form).value;

	var buttons = form.lastElementChild,
		can_take = !!$qs("img[src*='takeattacheditem.png']",buttons),
		can_return = !!$qs("img[src*='returnmail.png']",buttons),
		can_reply = !!$qs("img[src*='reply.png']",buttons),
		can_recall = !!$qs("img[src*='recallmail.png']",buttons),
		returned = from === "MoogleMail";

	var exec = text.match(/(?:\n\nThis mail was sent to (.+), but was returned, kupo!)?(?:\n\nAttached item removed: (?:([0-9,]+)(?:x)? )?(.+) \(type=[chie] id=(\d+), CoD was (\d+)C\))?$/),
		filter,name;

	if(can_take) {
		filter = "inbox";
		name = returned ? exec[1] : from;
	} else if(can_reply) {
		filter = "read";
		name = from;
	} else if(returned) {
		filter = "read";
		name = exec[1];
	} else {
		filter = "sent";
		name = to;
	}

	if(can_take || can_recall) {

	} else if(exec[3]) {
		attach = {id:Number(exec[4]),count:Number((exec[2]||"1").replace(/\D/g,"")),name:exec[3],cod:Number(exec[5])};
	}

	var mail = _mm.mail[mid];
	mail.loaded = true;
	mail.no_db = false;
	mail.filter = filter;
	mail.name = name;
	mail.subject = subject;
	mail.text = text;
	mail.returned = returned;

	if(attach.id) {
		if(attach.id === 1) {
			mail.attach_type = "credits";
			mail.attach_name = "Credits";
			mail.attach_count = attach.count;
		} else if(attach.id === 2) {
			mail.attach_type = "hath";
			mail.attach_name = "Hath";
			mail.attach_count = attach.count;
		} else if(attach.count===1 && attach.name.search(/^(?:Flimsy|Crude|Fair|Average|Fine|Superior|Exquisite|Magnificent|Legendary|Peerless) /)===0) {
			mail.attach_type = "equip";
			mail.attach_name = attach.name;
		} else {
			mail.attach_type = "item";
			mail.attach_name = attach.name;
			mail.attach_count = attach.count;
		}

		if(attach.cod) {
			mail.attach_cod = attach.cod;
		}
	}

	_mm.mod_li(mid);
	_mm.db_update();

	if(mid === _mm.current) {
		var div = _mm.mail_div;
		div.innerHTML = "";

		var dl = $element("dl",div);

		$element("dt",dl,returned?"Returned" : filter==="sent"?"To": "From");
		$element("dd",dl,name);

		$element("dt",dl,"Subject");
		$element("dd",dl,subject);

		if(attach.id) {
			var taken = can_take||can_return||can_recall ? ".hvut-attach" : ".hvut-taken";
			$element("dt",dl,[" Attached",taken]);
			$element("dd",dl,[" "+(!mail.attach_type?"" : mail.attach_type==="equip"?("["+mail.attach_name+"]") : mail.attach_count.toLocaleString() + (mail.attach_type==="credits"?" Credits" : mail.attach_type==="hath"?" Hath" : "x "+mail.attach_name)),taken]);

			if(mail.attach_cod) {
				$element("dt",dl,[" CoD",taken]);
				$element("dd",dl,[" "+mail.attach_cod.toLocaleString()+" Credits"+(mail.attach_count>1?" ("+mail.attach_count.toLocaleString()+"x "+(Math.round(mail.attach_cod*10/mail.attach_count)/10).toLocaleString()+")":""),taken]);
			}
		}

		var button = $element("div",div,[".hvut-button"]);

		$element("span",button,"Close",function(){div.innerHTML="";});

		if(can_reply) {
			$element("span",button,"Reply",function(){window.open("/?s=Bazaar&ss=mm&filter=new&reply="+mid,"_blank");});
		}
		if(can_take) {
			$element("span",button,"Take Item",function(){if(!mail.attach_cod || returned || confirm("Removing this attachment will deduct "+mail.attach_cod.toLocaleString()+" credits from your account. Are you sure?")){_mm.load_mail(mid,"view","action=attach_remove&postkey="+postkey);}});
		}
		if(can_return) {
			$element("span",button,"Return Mail",function(){_mm.load_mail(mid,"view","action=return_message&postkey="+postkey);});
		}
		if(can_recall) {
			$element("span",button,"Recall",function(){_mm.load_mail(mid,"view","action=return_message&postkey="+postkey);});
		}

		$element("div",div,["/"+body,".hvut-text"]);
	}
};

_mm.search = function() {
	_mm.result_div.innerHTML = "";

	var filter = _mm.search_filter.value.trim().toLowerCase(),
		name = _mm.search_name.value.trim().toLowerCase(),
		subject = _mm.search_subject.value.trim().toLowerCase(),
		text = _mm.search_text.value.trim().toLowerCase(),
		attach_name = _mm.search_attach.value.trim().toLowerCase(),
		attach_cod = _mm.search_cod.value.replace(/\s/g,"").toLowerCase(),
		exec,
		min = 0,
		max = 0;

	if( (exec=attach_cod.match(/^([0-9.]+)(k|m)?$/)) ) {
		attach_cod = exec[1] * (exec[2]==="k"?1000 : exec[2]==="m"?1000000 : 1);
	} else {
		if( (exec=attach_cod.match(/([0-9.]+)(k|m)?~/)) ) {
			min = exec[1] * (exec[2]==="k"?1000 : exec[2]==="m"?1000000 : 1);
		}
		if( (exec=attach_cod.match(/~([0-9.]+)(k|m)?/)) ) {
			max = exec[1] * (exec[2]==="k"?1000 : exec[2]==="m"?1000000 : 1);
		}
		attach_cod = 0;
	}

	var result = [];

	_mm.db_conn().openCursor().onsuccess = function(e) {
		var cursor = e.target.result;
		if(cursor) {
			var data = cursor.value;
			if(!_mm.mail[data.mid]) {
				_mm.mail[data.mid] = data;
			}
			if(!data.attach_cod) {
				data.attach_cod = 0;
			}

			if(filter!=="all" && data.filter!==filter) {
			} else if(name && data.name.toLowerCase().indexOf(name)===-1) {
			} else if(subject && data.subject.toLowerCase().indexOf(subject)===-1) {
			} else if(text && data.text.toLowerCase().indexOf(text)===-1) {
			} else if(attach_name && (!data.attach_name || data.attach_name.toLowerCase().indexOf(attach_name)===-1)) {
			} else if(attach_cod && data.attach_cod!==attach_cod) {
			} else if(min && data.attach_cod<min) {
			} else if(max && data.attach_cod>max) {
			} else {
				result.push(data);
			}
			cursor.continue();

		} else {
			var div = _mm.result_div,
				button = $element("div",div,[".hvut-button"]);
			$element("span",button,"Found "+result.length+" mail");
			$element("span",button,"Close",function(){div.innerHTML="";});

			if(!result.length) {
				return;
			}

			result.sort(function(a,b){return b.mid-a.mid;});

			var ul = $element("ul",null,[".hvut-list"]);
			result.forEach(function(data){
				var li = _mm.mail[data.mid].result_li = $element("li",ul,[data.readdate?"":".hvut-unread"]);
					if(data.returned) {
					li.classList.add("hvut-returned");
				}
				var link = "/?s=Bazaar&ss=mm&filter="+data.filter+"&mid="+data.mid;

				$element("span",li,[" "+({"sent":"To","read":"From","inbox":"Inbox"})[data.filter],".hvut-type"]);
				$element("span",li,[" "+data.name,".hvut-name"]);

				var subject = $element("span",li,[".hvut-subject"]);
				$element("a",subject,{textContent:"↗",href:link,target:"_blank",className:"hvut-link"});
				$element("a",subject,{textContent:data.subject,href:link},function(e){e.preventDefault();_mm.load_mail(data.mid,"view");});

				var attach = $element("span",li,[".hvut-attached"]);
				if(data.attach_type) {
					attach.classList.add("hvut-attach-"+data.attach_type);
					attach.textContent = data.attach_type==="equip"?("["+data.attach_name+"]") : data.attach_count.toLocaleString() + (data.attach_type==="credits"?" Credits" : data.attach_type==="hath"?" Hath" : "x "+data.attach_name);
				}

				$element("span",li,[data.attach_cod?" "+data.attach_cod.toLocaleString():"",".hvut-cod"]);
				$element("span",li,[" "+date_format(data.sentdate),".hvut-sent"]);
				$element("span",li,[" "+(data.readdate ? date_format(data.readdate) : "Never"),".hvut-read"]);
			});

			div.appendChild(ul);
		}
	};
};


// MM: read
if(loc.mid) {

	if($qs(".emsg")) {
		_mm.db_open(function(){_mm.db_conn("readwrite").delete(loc.mid);});

	} else {
		if(unsafeWindow.MAIN_URL) {
			_mm.attach_data = {id:unsafeWindow.attach_id,name:unsafeWindow.attach_name,count:unsafeWindow.attach_count,cod:unsafeWindow.attach_cod};

		} else { // for Chrome that doesn't support unsafeWindow
			unsafe_input = $element("input",document.body,{style:"position:absolute;top:0;left:0;width:0;height:0"});
			unsafe_input.setAttribute("onfocus","this.value=JSON.stringify({id:attach_id,name:attach_name,count:attach_count,cod:attach_cod});");
			unsafe_input.focus();
			_mm.attach_data = JSON.parse(unsafe_input.value);
			unsafe_input.remove();
		}

		if(_mm.attach_data.cod && _mm.attach_data.count!==1) {
			$qsa("#leftpane + div > div")[2].firstElementChild.firstElementChild.textContent += " ("+_mm.attach_data.count.toLocaleString()+"x "+(Math.round(_mm.attach_data.cod*10/_mm.attach_data.count)/10).toLocaleString()+" credits)";
		}

		$qs("img[src='/y/mooglemail/closemail.png']").parentNode.href += "&page=" + (loc.page||"0");

	}


// MM: list
} else {

	var mainpane_ = $id("mainpane").firstElementChild;
	mainpane_.children[0].style.visibility = "hidden";
	mainpane_.children[1].style.visibility = "hidden";
	mainpane_.children[4].remove();

	_mm.list_div = mainpane_.children[3];
	_mm.list_div.classList.add("hvut-div");

	_mm.init_table = _mm.list_div.firstElementChild;
	_mm.init_table.remove();

	_mm.page_div = $element("div",mainpane_,[".hvut-page"]);
	_mm.page_current = _mm.page_newer = _mm.page_older = Number(loc.page) || 0;

	_mm.newer_button = $element("input",_mm.page_div,{type:"button",value:"Read Newer"},function(){_mm.read_list("newer");});
	_mm.older_button = $element("input",_mm.page_div,{type:"button",value:"Read Older"},function(){_mm.read_list("older");});

	_mm.page_input = $element("input",_mm.page_div,{value:_mm.page_current,style:"margin-left:100px;width:30px;text-align:center"});
	$element("input",_mm.page_div,{type:"button",value:"Go",style:"margin-right:20px"},function(){location.href="/?s=Bazaar&ss=mm&filter="+_mm.filter+"&page="+_mm.page_input.value;});

	_mm.newer_link = $element("a",_mm.page_div,{textContent:"Newer",href:_mm.page_current!==0?"/?s=Bazaar&ss=mm&filter="+_mm.filter+"&page="+(_mm.page_current-1):"#"});
	_mm.older_link = $element("a",_mm.page_div,{textContent:"Older",href:_mm.init_table.rows.length===21?"/?s=Bazaar&ss=mm&filter="+_mm.filter+"&page="+(_mm.page_current+1):"#"});


	_mm.search_div = $element("div",mainpane_,[".hvut-search"]);
	_mm.search_filter = $element("select",_mm.search_div,{innerHTML:"<option value='inbox'>Inbox</option><option value='read'>Read</option><option value='sent'>Sent</option><option value='all'>All</option>",style:"width:70px"});
	_mm.search_filter.value = _mm.filter;

	_mm.search_name = $element("input",_mm.search_div,{placeholder:"User",style:"width:120px"},{keypress:function(e){if(e.keyCode===13){_mm.search();}}});
	_mm.search_subject = $element("input",_mm.search_div,{placeholder:"Subject",style:"width:280px"},{keypress:function(e){if(e.keyCode===13){_mm.search();}}});
	$element("br",_mm.search_div);
	_mm.search_text = $element("input",_mm.search_div,{placeholder:"Text",style:"width:200px"},{keypress:function(e){if(e.keyCode===13){_mm.search();}}});
	_mm.search_attach = $element("input",_mm.search_div,{placeholder:"Attachment",style:"width:120px"},{keypress:function(e){if(e.keyCode===13){_mm.search();}}});
	_mm.search_cod = $element("input",_mm.search_div,{placeholder:"CoD",style:"width:70px"},{keypress:function(e){if(e.keyCode===13){_mm.search();}}});
	$element("input",_mm.search_div,{type:"button",value:"Search"},function(){_mm.search();});

	$element("input",_mm.search_div,{type:"button",value:"Clear Records",style:"position:absolute;top:0;right:-250px"},function(){_mm.db_conn("readwrite",function(){location.href=location.href;}).clear();});

	_mm.result_div = $element("div",mainpane_,[".hvut-result"]);
	_mm.mail_div = $element("div",mainpane_,[".hvut-mail"]);
	_mm.ul[_mm.page_current] = $element("ul",_mm.list_div,[".hvut-list"]);

	_mm.db_open(function(){_mm.list(_mm.init_table,_mm.page_current);});
}

}


// Battle
} else if(loc.s==="Battle") {

// Check Difficulty, Equipment and Stamina
_battle.check = function(tags) {
	if(!tags) {
		return;
	}
	var check = settings.battle[_battle.type],
		warn = [];

	if(!check) {
		return;
	}

	if(check.difficulty && (check.difficulty !== player.difficulty)) {
		warn.push("Your Difficulty is ["+player.difficulty+"]");
	}
	if(check.equip && (check.equip != equip.value.current[0])) {
		warn.push("Your Equipment Set is ["+(equip.value.list[equip.value.current[0]]||("Set "+equip.value.current[0]))+"]");
	}
	if(check.stamina && (check.stamina > player.stamina)) {
		warn.push("Your Stamina is too low");
	}

	if(warn.length) {
		var str = warn.join("\n");
		tags.forEach(function(t){
			var s = $element("span",[t.parentNode,t]);
			s.addEventListener("click",function(e){if(!confirm("Caution!\n\n"+str+"\n\nContinue?")){e.stopPropagation();}},true);
			s.appendChild(t);
			//t.setAttribute("onclick","if(!confirm('"+str+"\\n\\nContinue?')){return false;}"+t.getAttribute("onclick"));
		});
	}
};

if(settings.battle.check && loc.ss) {

_battle.type = ({"ar":"Arena","rb":"Ring of Blood","gr":"Grindfest","iw":"Item World"})[loc.ss];

_battle.check(
	_battle.type==="Arena" || _battle.type==="Ring of Blood" ? $qsa("img[src='/y/arena/startchallenge.png']") :
	_battle.type==="Grindfest" ? $qsa("img[src='/y/grindfest/startgrindfest.png']") :
	_battle.type==="Item World" ? [$id("accept_button").parentNode] :
	null
);

}


if(settings.arena && loc.ss==="ar") {

GM_addStyle(
	".hvut-arena > tbody > tr > td {height:auto !important}" +
	".hvut-arena > tbody > tr > td img {margin:2px 0 !important; vertical-align:middle}"
);

$id("mainpane").firstElementChild.remove();

_ar.table = $id("arenaform").nextElementSibling;
_ar.table.classList.add("hvut-arena");
$element("thead",[_ar.table,0]).appendChild(_ar.table.rows[0]);

_ar.page = (loc.page||1)<2 ? 1 : 2;

ajax("/?s=Battle&ss=ar&page="+(_ar.page===1?2:1),null,function(r){
	var html = r.responseText,
		table = $element("table",null,["/"+html.substring(html.indexOf("<tr",html.indexOf('<form id="arenaform"')),html.indexOf("</table>",html.indexOf('<form id="arenaform"')))]);

	if(settings.battle.check) {
		_battle.check($qsa("img[src='/y/arena/startchallenge.png']",table));
	}

	table.rows[0].remove();
	_ar.table.insertBefore(table.tBodies[0],_ar.page===1?null:_ar.table.tBodies[0]);

},function(){alert("Failed to load page 2.");});

}


if(settings.itemWorld && loc.ss==="iw") {

GM_addStyle(
	"#item_pane > div {width:auto !important}" +
	".hvut-sub {clear:left; margin-bottom:10px; margin-left:20px; white-space:nowrap}" +
	".hvut-level {color:#00f; font-weight:bold}" +
	".hvut-up {color:#f0f}" +
	".hvut-btns {position:absolute; top:0px; left:30px; white-space:nowrap; text-align:left; z-index:8888}" +
	".hvut-pxp {margin-left:3px}" +
	".hvut-gain {color:#090; margin:0 5px; cursor:pointer}" +
	".hvut-calc {}" +
	".hvut-reforge {color:#c00; font-weight:bold; margin-left:10px; cursor:pointer}" +
	".hvut-potency {}" +
	".hvut-potency > span {margin-left:5px}"
);

$id("shopform").previousElementSibling.remove();

_iw.calcLv1PXP = function(level,nextPXP) {
	function sign(x) {return Number(x > 0) - Number(x < 0);}//
	function calcPXP(level,lv1PXP) {return lv1PXP * Math.pow(1 + lv1PXP / 1000,level - 1);}

	if (level === 0) return nextPXP - 0.5;
	level++;
	var prevLv1PXP = 300,
		step = 32,
		lv1PXP, diff, //difference
		prevDiff = nextPXP - calcPXP(level,prevLv1PXP);
	while (Math.abs(prevDiff) >= 0.1) { //error margin
		lv1PXP = prevLv1PXP + step * sign(prevDiff);
		diff = nextPXP - calcPXP(level,lv1PXP);
		if (Math.abs(diff) > Math.abs(prevDiff)) step /= 2;
		else {
			if (sign(diff) !== sign(prevDiff)) step /= 2;
			prevLv1PXP = lv1PXP;
			prevDiff = diff;
		}
	}
	return lv1PXP;
};

_iw.calcPXP = function(equip,round) {
	round = parseInt(round);
	if(!round) {
		round = equip.round;
	}

	var get = Math.ceil(round * ({"Normal":2,"Hard":3,"Nightmare":4,"Hell":6,"Nintendo":10,"IWBTH":16,"PFUDOR":16})[player.difficulty]);
	if(equip.soulbound) {
		get *= 2;
	}

	var level = equip.level,
		pxp2 = equip.pxp2,
		pxp1 = equip.pxp1 + get;

	while(level<10 && pxp1 >= pxp2) {
		level++;
		pxp1 -= pxp2;
		pxp2 = Math.ceil(equip.pxp * Math.pow(1 + equip.pxp / 1000,level));
	}

	equip.calc_span.innerHTML = "";
	$element("span",equip.calc_span,[" +"+get+" ("+round+") =",".hvut-gain"],function(){_iw.calcPXP(equip,prompt("Enter the number of Rounds"));});
	$element("span",equip.calc_span,[" Level "+level,".hvut-level"+(level!==equip.level?" hvut-up":"")]);
	$element("span",equip.calc_span,[" "+(level<10?"("+pxp1+ " / "+pxp2+")":"MAX"),".hvut-pxp"]);
};

_iw.reforge = function(equip) {
	if(!confirm("["+equip.name+"]\n\nAre you sure you want to reforge this item?\n\nThis will remove all potencies and reset its level to zero.")) {
		return;
	}

	ajax("/?s=Forge&ss=fo&filter="+loc.filter,"select_item="+equip.eid,
		function(r){
			var html = r.responseText,
				emsg = /<p class="emsg">(.+?)<\/p>/.exec(html);

			if(emsg) {
				alert(emsg[1]);
			}
			location.href = location.href;
		},
		function(){
			alert("Error!");
			location.href = location.href;
		}
	);
};

_iw.show_potency = function(equip) {
	if(equip.checked) {
		return;
	}
	equip.checked = true;

	equip.pxp = _iw.calcLv1PXP(equip.level,equip.pxp2);
	equip.round = Math.round(Math.pow((equip.pxp-100)/250,3)*75);
	if(equip.name.split(" ")[0]==="Peerless" || equip.round > 100) {
		equip.round = 100;
	} else if(equip.round < 10) {
		equip.round = 10;
	}

	equip.calc_span = $element("span",equip.sub,[".hvut-calc"]);
	_iw.calcPXP(equip);

	if(!equip.level) {
		return;
	}

	ajax("/pages/showequip.php?eid="+equip.eid+"&key="+equip.key,null,
		function(r){
			var html = r.responseText,
				s = html.indexOf("<div"),
				e = html.indexOf("</body"),
				div = $element("div",null,["/"+html.substring(s,e)]);

			$element("span",equip.sub,[" Reforge",".hvut-reforge"],function(){_iw.reforge(equip);});
			var potency_span = $element("span",equip.sub,[".hvut-potency"]);
			$qsa("span.ep",div).forEach(function(p){
				$element("span",potency_span,[" "+p.textContent]);
			});
		}
	);
};

$qsa("#item_pane .eqdp").forEach(function(div){
	var equip = equip_parser.div(div);
	equip.div = div;
	equip.sub = $element("div",div.parentNode,[".hvut-sub"]);

	div.addEventListener("click",function(){setValue("iw_latest",equip.eid);_iw.show_potency(equip);});

	$element("span",equip.sub,[" Level "+equip.level,(equip.level?".hvut-level":"")]);
	$element("span",equip.sub,[" ("+equip.pxp1+" / "+equip.pxp2+")",".hvut-pxp"]);
});

_iw.latest = getValue("iw_latest");
if($id(_iw.latest+"item_pane")) {
	$id(_iw.latest+"item_pane").parentNode.style.cssText = "background-color:#ffc;border:1px solid";
	$id("item_pane").insertBefore($id(_iw.latest+"item_pane").parentNode,$id("item_pane").firstChild);
}

//**************************//
//== START == new logic search equip
//**************************//
_iw.filterx = function(list,search,keep) {
	search = search.trim();
	if(list.key === search) {
		return;
	}

	list.key = search;
	if(!keep) {
		list.input.value = search;
	}
	if(!search) {
		list.forEach(function(item){
			item.filtered = true;
			if(item.dom) item.dom.classList.remove("hvut-hide");
		});
		return;
	}

	search = search.toLowerCase().split(";").filter(function(value){return value.trim();}).map(function(value){return value.trim().split(/\s+/);});

	list.forEach(function(item){
		var name = item.name.toLowerCase().replace(/ /g,"_");
		item.filtered = search.some(function(value){
							return value.every(function(v){
								return name.indexOf(v)!==-1;
							});
						});
		if(item.dom) item.dom.classList[item.filtered?"remove":"add"]("hvut-hide");
		
	});
};


_iw.equip = [];

_iw.equip.key = "";
_iw.equip_btn = $element("div",$id("leftpane"),[".hvut-btns"]);

_iw.equip.input = $element("input",_iw.equip_btn,{type:"text",placeholder:"keyword; keyword; keyword"},{keypress:function(e){e.stopPropagation();},keyup:function(e){if(e.keyCode===27){_iw.filterx(_iw.equip,"");}else{_iw.filterx(_iw.equip,_iw.equip.input.value,true);}}});
$element("input",_iw.equip_btn,{type:"button",value:"Reset"},function(){_iw.filterx(_iw.equip,"");});



$qsa("#item_pane > div").forEach(function(div){
	var d = equip_parser.div(div.children[1]);
	var item = {
		type : "equip",
		name : d.name,
		id : d.eid,
		key : d.key,
		count : 1,
		price : 0,
		cod : 0,
		filtered : true,
		dom : div,
		lockBtn : div.firstElementChild
	};
	_iw.equip.push(item);

	//var sub = $element("div",null,[".hvut-sub hvut-sub-equip"]);
	//item.checkbox = $element("input",sub,{type:"checkbox"});
	//item.codInput = $element("input",sub,{type:"text",placeholder:"CoD",pattern:"\\d*",className:"hvut-cod",value:""},{change:function(){_mm.calc_equip(item,"cod",item.codInput.value);}});
	//item.sendBtn = $element("input",sub,{type:"button",value:"send"},function(){_mm.send_queue(item);});

	//div.appendChild(sub);
});


$qsa("#item_pane > div").forEach(function(div){
	var eq = equip_parser.div($qs(".eqdp",div));

	var e = equip_parser.name(eq.real_name || eq.name);
	e.div = div;
	_iw.equip.push(e);
});
//**************************//
//== END == new logic search equip
//**************************//

}


// Check Enchantment and Condition
if(settings.enchant) {

GM_addStyle(
	".stuffbox {position:relative}" +
	".hvut-battle {position:absolute; bottom:0; left:"+(loc.ss==="iw"?"550":"150")+"px; width:500px; z-index:1000}" +

	".hvut-all {padding:2px 5px 2px 85px; background-color:#600; color:#fff; font-size:9pt; text-align:left}" +
	".hvut-all > span {display:inline-block; margin-left:5px}" +

	".hvut-equip {margin:0; padding:0; list-style:none; background-color:#fff; font-size:10pt}" +
	".hvut-equip > li {border-top:1px solid}" +
	".hvut-equip > li.hvut-hover {background-color:#fe9}" +
	".hvut-equip > li:after {content:''; display:block; clear:left}" +
	".hvut-part {float:left; width:120px; font-weight:bold}" +
	".hvut-repair {display:none; float:left; width:120px; font-size:8pt; line-height:11pt; white-space:nowrap; color:#00f}" +
	".hvut-noscrap {color:#f00}" +
	".hvut-equip > li:hover > .hvut-part {display:none}" +
	".hvut-equip > li:hover > .hvut-repair {display:block}" +
	".hvut-name {float:left; width:380px; font-weight:bold; text-decoration:none}" +
	".hvut-cdt {float:left; width:120px; clear:left; font-size:8pt; cursor:pointer}" +
	".hvut-cdt:hover {text-decoration:underline}" +
	".hvut-repair1 {font-weight:bold; color:#fff; background-color:#f00}" +
	".hvut-repair2 {font-weight:bold; color:#00f; background-color:transparent}" +
	".hvut-repair3 {font-weight:bold; color:#090; background-color:transparent}" +
	".hvut-repair4 {font-weight:normal; color:#000; background-color:transparent}" +
	".hvut-enchanted {float:left; width:380px; font-size:8pt}" +
	".hvut-enchanted > span {display:inline-block; margin:0 5px; color:#f00}" +

	".hvut-enchant {position:absolute; display:flex; flex-direction:column; justify-content:center; right:-180px; bottom:0; width:170px; height:170px; margin:0; padding:5px; list-style:none; font-size:9pt; background-color:#fff; text-align:left; white-space:nowrap}" +
	".hvut-enchant > li {margin:2px 0; overflow:hidden; text-overflow:ellipsis}" +
	".hvut-count {float:left; width:30px; color:#000; text-align:right}" +
	".hvut-imbue {margin-left:3px; color:#06f; cursor:pointer}" +
	".hvut-shard {margin-left:3px; color:#00f; cursor:pointer}" +
	".hvut-imbue:hover, .hvut-shard:hover {color:#c00; text-decoration:underline}" +
	".hvut-eqname {position:absolute; bottom:100%; left:0; width:100%; margin:0 !important; padding:5px; box-sizing:border-box; background-color:#fe9; font-weight:bold; text-align:center; white-space:normal}" +
	".hvut-eqname > span {display:block; margin-top:3px; font-weight:normal}" +

	".hvut-min > * {display:none}" +
	".hvut-btn {display:block !important; color:#fff; background-color:#600; cursor:pointer}"
);

var vChkRateRP = 101;

_battle.load_equip = function(eq) {
	eq.cSpan.textContent = "Loading";
	eq.eSpan.innerHTML = "";

	ajax("/pages/showequip.php?eid="+eq.eid+"&key="+eq.key,null,
		function(r){
			var html = r.responseText,
				s = html.indexOf("<div"),
				e = html.indexOf("</body"),
				div = $element("div",null,["/"+html.substring(s,e)]);

			_battle.parse_equip(eq,div);

			

			if(vChkRateRP < 80){
				if(_battle.div.classList.length > 1){
					_battle.div.classList.toggle("hvut-min");
				}
			}

			//console.log('vChkRateRP:'+vChkRateRP);
		},
		function(){
			_battle.equip_fail(eq);
		}
	);
};

_battle.parse_equip = function(eq,div) {
	var _div = $qs("#equipment",div);
	if(!_div) {
		eq.cSpan.textContent = "-";
		eq.eSpan.textContent = "Invalid equipment: Visit Equipment page.";
		return;
	}

	var e1 = $qsa(".e1",div),
		ee = $qsa(".ee",div);

	var realname = eq.realname = _div.previousElementSibling.textContent.trim().replace(/\B(?=[A-Z])/g," ").replace(/\b(?:The|Of)\b/g,function(s){return s.toLowerCase();}),
		quality = eq.quality = realname.split(" ")[0];

	var exec = /Condition: (\d+) \/ (\d+) \((\d+)%\)/.exec(e1[1].textContent),
		cdt = eq.cdt = exec[1]*100/exec[2],
		cn = cdt<52?"hvut-repair1" : cdt<60?"hvut-repair2" : cdt<75?"hvut-repair3" : "hvut-repair4";

	eq.cSpan.textContent = exec[1]+" / "+exec[2]+" ("+cdt.toFixed(1)+"%)";
	//console.log('cdt.toFixed(1):'+cdt.toFixed(1)+' < '+vChkRateRP);
	if(cdt.toFixed(1) < vChkRateRP){
		vChkRateRP = cdt.toFixed(1);
	}
	eq.cSpan.classList.add(cn);

	_battle.update_repair(eq);

	eq.eSpan.innerHTML = "";
	ee.forEach(function(e){
		$element("span",eq.eSpan,e.textContent);
	});
	if(!ee.length) {
		eq.eSpan.textContent = "No Enchantments";
	}
};

_battle.equip_fail = function(eq) {
	eq.cSpan.textContent = "Failed";
	eq.eSpan.innerHTML = "";
};

_battle.view_equip = function(eq) {
	if(!eq) {
		return;
	}
	if(_battle.current) {
		_battle.current.li.classList.remove("hvut-hover");
	}

	_battle.current = eq;
	eq.li.classList.add("hvut-hover");

	_battle.update_repair(eq);

	_battle.enchant_ul.innerHTML = "";
	var li = $element("li",_battle.enchant_ul,[" "+eq.name,".hvut-eqname"]),
		real_name = equip_parser.real_names[eq.eid];
	if(real_name && real_name !== eq.name) {
		$element("span",li,"[ "+real_name+" ]");
	}

	var m,mat,c,
		type = (eq.category==="One-handed Weapon" || eq.category==="Two-handed Weapon" || eq.category==="Staff") ? "weapon" : "armor";
	for(m in _battle.enchantment) {
		mat = _battle.enchantment[m];
		if(mat[type] && _battle.inventory[m]) {

			c = (type==="weapon" && m.indexOf("Infusion of ")===0) ? settings.enchant_weapon : settings.enchant_armor;

			if(c) {
				li = $element("li",_battle.enchant_ul);
				$element("span",li,[" "+_battle.inventory[m],".hvut-count"]);

				if(c > 1) {
					$element("span",li,[" [+"+c+"]",".hvut-imbue"],(function(s,c){return function(){_battle.enchant(eq,s,c);};})(mat[type],c));
				}

				$element("span",li,[" "+mat.effect,".hvut-shard"],(function(s){return function(){_battle.enchant(eq,s,1);};})(mat[type]));
			}
		}
	}
};

_battle.enchant = function(eq,shard,count) {
	eq.cSpan.textContent = "Loading";
	eq.eSpan.innerHTML = "";

	var c = count;
	while(count--) {
		ajax("/?s=Forge&ss=en","select_item="+eq.eid+"&enchantment="+shard,
			function(r){
				var html = r.responseText,
					s = html.indexOf("<div",html.indexOf('<div id="leftpane"')),
					e = html.indexOf("</div><!-- /leftpane -->"),
					div = $element("div",null,["/"+html.substring(s,e)]);

				_battle.parse_equip(eq,div);
				//<p class="emsg">Item not found.</p>
				//<p class="emsg">Cannot enchant item</p>

				if(!--c) {
					_battle.load_inventory();
				}
			},
			function(){_battle.equip_fail(eq);}
		);
	}
};

_battle.repair = function(eq) {
	if(eq && eq.cdt===100) {
		return;
	}
	ajax("/?s=Forge&ss=re", eq==="all"?"repair_all=1" : eq?"select_item="+eq.eid : null,
		function(r){
			var html = r.responseText,
				s = html.indexOf("<table><div"),
				e = html.indexOf("</table>",s),
				div = $element("div",null,["/"+html.substring(s+7,e)]),
				reg = /forge\.set_forge_cost\((\d+), 'Requires: (\d+)x (.+?)(?:, (\d+)x Energy Cell)?'/,
				reg_all = /(\d+)x (Scrap (?:Cloth|Leather|Metal|Wood)|Energy Cell)/g,
				exec,
				s = html.indexOf('<form id="repairall"'),
				e = html.indexOf("<script",s),
				all = $element("div",null,["/<div>"+html.substring(s,e)]).textContent.trim().substr(10),
				error;

			if(html.indexOf('<p class="emsg">Insufficient materials.</p>') !== -1) {
				alert("Insufficient materials.");
			}

			$qsa(".eqdp",div).forEach(function(d){
				exec = reg.exec(d.getAttribute("onclick"));
				var matched = false;
				equip.value.current.some(function(eq,i){
					if(i === 0) {
						return false;
					}
					if(eq.eid == exec[1]) {
						matched = true;
						eq.scrapRequire = Number(exec[2]);
						eq.scrapType = exec[3];
						eq.ecRequire = Number(exec[4]||0);
						_battle.update_repair(eq);
						return true;
					}
				});
				if(!matched) {
					error = true;
				}
			});

			if(all === "Everything is fully repaired.") {
				_battle.all = null;
			} else {
				_battle.all = {};
				while( exec=reg_all.exec(all) ) {
					_battle.all[exec[2]] = Number(exec[1]);
				}
			}

			if(error) {
				alert("Invalid Equipment Set.\n\nVisit Equipment Page and Check.");
			}

			if(eq === "all") {
				equip.value.current.forEach(function(eq,i){
					if(i === 0) {
						return;
					}
					_battle.load_equip(eq);
				});

			} else if(eq) {
				_battle.load_equip(eq);
			}

			_battle.load_inventory();
		},
		function(){if(eq){_battle.equip_fail(eq);}else{_battle.repair();}}
	);
};

_battle.update_repair = function(eq) {
	var scrap = _battle.inventory[eq.scrapType],
		ec = _battle.inventory["Energy Cell"];

	if(eq.cdt === 100) {
		eq.scrapRequire = 0;
		eq.rSpan.textContent = "100%";
	} else if(eq.scrapType) {
		eq.rSpan.textContent = eq.scrapType.replace("crap ",".") + " ("+eq.scrapRequire+")" + (eq.ecRequire?", E.Cell ("+eq.ecRequire+")":"");
	} else {
		eq.rSpan.textContent = "Loading...";
	}

	if(eq.scrapRequire > scrap) {
		eq.rSpan.classList.add("hvut-noscrap");
	}
};

_battle.load_inventory = function() {
	ajax("?s=Character&ss=in",null,
		function(r){
			var html = r.responseText,
				s = html.indexOf("<tr",html.indexOf('<div id="inv_item"')),
				e = html.indexOf("</table",s);
			var frag = $element(),
				table = $element("table",frag,["/"+html.substring(s,e)]);

			$qsa("tr",frag).forEach(function(tr){
				_battle.inventory[ tr.cells[0].textContent.trim() ] = Number(tr.cells[1].textContent);
			});

			if(_battle.all) {
				_battle.repair_div.innerHTML = "";
				$element("span",_battle.repair_div,{textContent:"[ Repair all ]",style:"width:80px;margin-left:-80px;font-weight:bold;text-align:center;cursor:pointer"},function(){_battle.repair("all");});
				for(var m in _battle.all) {
					$element("span",_battle.repair_div,m+" ("+_battle.all[m]+" / "+_battle.inventory[m]+")");
				}

			} else {
				_battle.repair_div.innerHTML = "Everything is fully repaired.";
			}

			_battle.enchant_ul.innerHTML = "<li class='hvut-eqname'>Enchantments</li>";
			_battle.view_equip(_battle.current);
		},
		function(){
			_battle.load_inventory();
		}
	);
};

_battle.enchantment = {
	"Voidseeker Shard":{effect:"Voidseeker's Blessing",weapon:"vseek"},
	"Aether Shard":{effect:"Suffused Aether",weapon:"ether"},
	"Featherweight Shard":{effect:"Featherweight Charm",weapon:"feath",armor:"feath"},
	"Infusion of Flames":{effect:"Infused Flames",weapon:"sfire",armor:"pfire"},
	"Infusion of Frost":{effect:"Infused Frost",weapon:"scold",armor:"pcold"},
	"Infusion of Lightning":{effect:"Infused Lightning",weapon:"selec",armor:"pelec"},
	"Infusion of Storms":{effect:"Infused Storm",weapon:"swind",armor:"pwind"},
	"Infusion of Divinity":{effect:"Infused Divinity",weapon:"sholy",armor:"pholy"},
	"Infusion of Darkness":{effect:"Infused Darkness",weapon:"sdark",armor:"pdark"},
};

_battle.inventory = {};

var vStyleOC = [".hvut-battle"];
var vOCcheck = {'chk':'false'};

if(getValue("openclose",{})){

	vOCcheck = getValue("openclose",{});
	//if(vOCcheck.chk === 'true') vStyleOC = [".hvut-battle",".hvut-min"];

}else{
	setValue("openclose",vOCcheck);
}



_battle.div = $element("div",$qs(".stuffbox"), vStyleOC);
_battle.repair_div = $element("div",_battle.div,[" Loading...",".hvut-all"]);
_battle.equip_ul = $element("ul",_battle.div,[".hvut-equip"]);
_battle.enchant_ul = $element("ul",_battle.div,[".hvut-enchant"]);
$element("div",_battle.div,[".hvut-btn"," OPEN / CLOSE"],function(){_battle.div.classList.toggle("hvut-min"); if(vOCcheck.chk === 'true'){setValue("openclose",{'chk':'false'});}else{setValue("openclose",{'chk':'true'});} vOCcheck = getValue("openclose",{});  });

if(vOCcheck.chk === 'true') _battle.div.classList.toggle("hvut-min");

equip.value.current.forEach(function(eq,i){
	if(i === 0) {
		return;
	}

	var li = eq.li = $element("li",_battle.equip_ul,null,{mouseenter:function(){_battle.view_equip(eq);}});
	eq.pSpan = $element("span",li,[".hvut-part"," "+eq.part]);
	eq.rSpan = $element("span",li,[".hvut-repair hvut-none"]);
	$element("a",li,{textContent:eq.name,className:"hvut-name",target:"hvut-equip",href:"/pages/showequip.php?eid="+eq.eid+"&key="+eq.key});
	eq.cSpan = $element("span",li,[".hvut-cdt"],function(){_battle.repair(eq);});
	eq.eSpan = $element("span",li,[".hvut-enchanted"]);

	_battle.load_equip(eq);
});



_battle.view_equip(equip.value.current[1]);

_battle.repair();

}


// minimize
if(settings.minimize) {

GM_addStyle(
	".hvut-enchant {width:140px; right:auto; left:-150px}" +
	".hvut-name, .hvut-enchanted {text-align:left}" + (
	loc.ss==="ar"?
		".hvut-arena {width:300px !important; margin:20px !important}" +
		".hvut-arena > thead {display:none}" +
		".hvut-arena td:nth-child(1), .hvut-arena td:nth-child(2), .hvut-arena td:nth-child(5), .hvut-arena td:nth-child(6) {display:none}" :
	loc.ss==="rb"?
		"#mainpane > div:first-child {margin:20px -80px !important}" +
		"#mainpane > table {width:300px !important; margin:20px !important}" +
		"#mainpane > table tr:first-child {display:none}" +
		"#mainpane > table td:nth-child(1), #mainpane > table td:nth-child(2), #mainpane > table td:nth-child(4), #mainpane > table td:nth-child(5), #mainpane > table td:nth-child(7) {display:none}" :
	loc.ss==="gr"?
		"#arenaform {position:absolute; top:200px; left:200px}" :
	loc.ss==="iw"?
		"#shopform {position:absolute; top:-40px; left:-600px}" +
		"#mainpane > div:first-child > div:first-child {width:300px !important; margin:2px !important}" +
		"#mainpane > div:first-child > div:first-child > div {width:60px !important; overflow:hidden}" +
		".hvut-battle {left:150px}" :
	"")
);

_battle.div.classList.toggle("hvut-min");

}


// Forge Upgrade
} else if(settings.upgrade && loc.s==="Forge" && loc.ss==="up" && $id("equipment")) {

_up.mat = {
"Legendary":[
[0,6,0,"Robust"],[0,6,0,"Robust"],[0,6,0,"Robust"],[0,6,0,"Robust"],[0,6,0,"Robust"],
[0,5,1,"Robust"],[0,5,1,"Robust"],[0,5,1,"Robust"],[0,4,2,"Robust"],[0,4,2,"Robust"],
[0,4,2,"Robust"],[0,4,2,"Robust"],[0,3,3,"Robust"],[0,3,3,"Vibrant"],[0,3,3,"Vibrant"],
[0,3,3,"Vibrant"],[0,2,4,"Vibrant"],[0,2,4,"Vibrant"],[0,2,4,"Vibrant"],[0,2,4,"Vibrant"],
[0,1,5,"Vibrant"],[0,1,5,"Vibrant"],[0,1,5,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],
[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],
[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],
[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],
[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],
[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"],[0,0,6,"Coruscating"]
],
"Legendary_100":{12:8,20:12,28:17,36:21,42:23
},
"Magnificent":[
[2,4,0,"Regular"],[2,4,0,"Regular"],[2,4,0,"Regular"],[2,4,0,"Regular"],[2,4,0,"Regular"],
[1,5,0,"Regular"],[1,5,0,"Regular"],[1,5,0,"Regular"],[0,6,0,"Regular"],[0,6,0,"Regular"],
[0,6,0,"Regular"],[0,6,0,"Regular"],[0,6,0,"Regular"],[0,6,0,"Robust"],[0,6,0,"Robust"],
[0,5,1,"Robust"],[0,5,1,"Robust"],[0,5,1,"Robust"],[0,4,2,"Robust"],[0,4,2,"Robust"],
[0,4,2,"Robust"],[0,4,2,"Robust"],[0,3,3,"Robust"],[0,3,3,"Robust"],[0,3,3,"Robust"],
[0,3,3,"Vibrant"],[0,2,4,"Vibrant"],[0,2,4,"Vibrant"],[0,2,4,"Vibrant"],[0,2,4,"Vibrant"],
[0,1,5,"Vibrant"],[0,1,5,"Vibrant"],[0,1,5,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],
[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],
[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],
[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"],[0,0,6,"Vibrant"]
],
"Magnificent_100":{12:8,26:16,32:18,40:22,48:27,56:31,62:33
},
"Exquisite":[
[4,2,0,"Diluted"],[4,2,0,"Diluted"],[4,2,0,"Diluted"],[4,2,0,"Diluted"],[4,2,0,"Diluted"],
[3,3,0,"Diluted"],[3,3,0,"Diluted"],[3,3,0,"Diluted"],[2,4,0,"Diluted"],[2,4,0,"Diluted"],
[2,4,0,"Diluted"],[2,4,0,"Diluted"],[1,5,0,"Diluted"],[1,5,0,"Regular"],[1,5,0,"Regular"],
[1,5,0,"Regular"],[0,6,0,"Regular"],[0,6,0,"Regular"],[0,6,0,"Regular"],[0,6,0,"Regular"],
[0,6,0,"Regular"],[0,6,0,"Regular"],[0,5,1,"Regular"],[0,5,1,"Regular"],[0,5,1,"Regular"],
[0,5,1,"Robust"],[0,4,2,"Robust"],[0,4,2,"Robust"],[0,4,2,"Robust"],[0,4,2,"Robust"],
[0,3,3,"Robust"],[0,3,3,"Robust"],[0,3,3,"Robust"],[0,2,4,"Robust"],[0,2,4,"Robust"],
[0,2,4,"Robust"],[0,2,4,"Robust"],[0,1,5,"Robust"],[0,1,5,"Robust"],[0,1,5,"Robust"],
[0,1,5,"Robust"],[0,0,6,"Robust"],[0,0,6,"Robust"],[0,0,6,"Robust"],[0,0,6,"Robust"],
[0,0,6,"Robust"],[0,0,6,"Robust"],[0,0,6,"Robust"],[0,0,6,"Robust"],[0,0,6,"Robust"]
],
"Exquisite_100":{
},
"Superior":[
[6,0,0,"Wispy"],[6,0,0,"Wispy"],[6,0,0,"Wispy"],[6,0,0,"Wispy"],[6,0,0,"Wispy"],
[5,1,0,"Wispy"],[5,1,0,"Wispy"],[5,1,0,"Wispy"],[4,2,0,"Wispy"],[4,2,0,"Wispy"],
[4,2,0,"Wispy"],[4,2,0,"Wispy"],[3,3,0,"Wispy"],[3,3,0,"Diluted"],[3,3,0,"Diluted"],
[3,3,0,"Diluted"],[2,4,0,"Diluted"],[2,4,0,"Diluted"],[2,4,0,"Diluted"],[2,4,0,"Diluted"],
[1,5,0,"Diluted"],[1,5,0,"Diluted"],[1,5,0,"Diluted"],[0,6,0,"Diluted"],[0,6,0,"Diluted"],
[0,6,0,"Regular"],[0,6,0,"Regular"],[0,6,0,"Regular"],[0,6,0,"Regular"],[0,6,0,"Regular"],
[0,5,1,"Regular"],[0,5,1,"Regular"],[0,5,1,"Regular"],[0,4,2,"Regular"],[0,4,2,"Regular"],
[0,4,2,"Regular"],[0,4,2,"Regular"],[0,3,3,"Regular"],[0,3,3,"Regular"],[0,3,3,"Regular"],
[0,3,3,"Regular"],[0,2,4,"Regular"],[0,2,4,"Regular"],[0,2,4,"Regular"],[0,2,4,"Regular"],
[0,1,5,"Regular"],[0,1,5,"Regular"],[0,1,5,"Regular"],[0,0,6,"Regular"],[0,0,6,"Regular"]
],
"Superior_100":{
}
};

_up.binding = {
"Physical Damage":"Slaughter",
"Physical Hit Chance":"Balance",
"Magical Damage":"Destruction",
"Magical Hit Chance":"Focus",
"Physical Defense":"Protection",
"Evade Chance":"the Fleet",
"Block Chance":"the Barrier",
"Parry Chance":"the Nimble",
"Elemental Proficiency":"the Elementalist",
"Divine Proficiency":"the Heaven-sent",
"Forbidden Proficiency":"the Demon-fiend",
"Deprecating Proficiency":"the Curse-weaver",
"Supportive Proficiency":"the Earth-walker",
"Fire Spell Damage":"Surtr",
"Cold Spell Damage":"Niflheim",
"Elec Spell Damage":"Mjolnir",
"Wind Spell Damage":"Freyr",
"Holy Spell Damage":"Heimdall",
"Dark Spell Damage":"Fenrir",
"Crushing Mitigation":"Dampening",
"Slashing Mitigation":"Stoneskin",
"Piercing Mitigation":"Deflection",
"Fire Mitigation":"the Fire-eater",
"Cold Mitigation":"the Frost-born",
"Elec Mitigation":"the Thunder-child",
"Wind Mitigation":"the Wind-waker",
"Holy Mitigation":"the Thrice-blessed",
"Dark Mitigation":"the Spirit-ward",
"Strength Bonus":"the Ox",
"Dexterity Bonus":"the Raccoon",
"Agility Bonus":"the Cheetah",
"Endurance Bonus":"the Turtle",
"Intelligence Bonus":"the Fox",
"Wisdom Bonus":"the Owl",
"Magical Defense":"Warding",
"Resist Chance":"Negation",
"Physical Crit Chance":"Isaac",
"Magical Crit Chance":"Friendship",
};

GM_addStyle(
	".hvut-up-div {position:absolute; top:150px; left:400px; width:200px; border-top:3px double}" +
	".hvut-up-ul {margin:0; padding:0; list-style:none; font-size:10pt; text-align:right}" +
	".hvut-up-input {width:50px}" +
	".hvut-up-sub {display:none; position:absolute; top:0; left:400px; width:200px}" +
	".hvut-up-table tr:hover {background-color:#ff9}" +
	".hvut-up-table tr:hover .hvut-up-sub {display:block}" +
	".hvut-up-ul > li:after {content:''; display:block; clear:both}" +
	".hvut-up-name {float:left; width:120px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}" +
	".hvut-up-count {float:left; width:35px; margin:0 2px}" +
	".hvut-up-stock {float:left; width:40px}" +
	".hvut-up-nostock {color:#c00}"
);

_up.inventory = {};
ajax("?s=Character&ss=in",null,
	function(r){
		var html = r.responseText,
			s = html.indexOf("<tr",html.indexOf('<div id="inv_item"')),
			e = html.indexOf("</table",s);
		var frag = $element(),
			table = $element("table",frag,["/"+html.substring(s,e)]);

		$qsa("tr",frag).forEach(function(tr){
			_up.inventory[ tr.cells[0].textContent.trim() ] = Number(tr.cells[1].textContent);
		});
	}
);


_up.max = 0;
_up.data = {};
_up.pane = $id("rightpane").children[1];
_up.table = _up.pane.firstElementChild;
_up.div = $element("div",_up.pane,[".hvut-up-div"]);
_up.button = $element("input",_up.div,{type:"button",value:"Upgrade ALL",style:"margin:5px auto"},function(){_up.upgrade();});
_up.ul = $element("ul",_up.div,[".hvut-up-ul"]);

$id("leftpane").style.width = "450px";
$qs("a[href*='?s=Forge&ss=up&filter=']").parentNode.style.cssText = "width:450px;margin:10px";

_up.pane.style.position = "relative";
_up.pane.style.width = "400px";
_up.table.style.borderSpacing = "0";
_up.table.classList.add("hvut-up-table");

$qsa("tr",_up.table).forEach(function(tr){
	var match = tr.textContent.trim().match(/(.+)\s+(\d+)\s+\/\s+(\d+)$/),
		name = match[1],
		data = _up.data[name] = {current:Number(match[2])};

	data.td = $element("td",tr);
	data.input = $element("input",data.td,{type:"number",className:"hvut-up-input",value:data.current,min:data.current},{change:function(){_up.calc(name);}});
	data.ul = $element("ul",data.td,[".hvut-up-sub hvut-up-ul"]);

	if(_up.max < data.current) {
		_up.max = data.current;
	}

	data.id = tr.getAttribute("onmouseout").search(/'costpane_(\w+)'/) && RegExp.$1;
	data.max = (name==="Physical Damage" || name==="Magical Damage") ? 100 : 50;
	data.input.max = data.max;

	tr.cells[0].style.width = "150px";

	var costpane = $id("costpane_"+data.id).children[1];
	if(costpane) {
		$qsa("tr",costpane).forEach(function(tr_){
			var exec = /^(?:(.+) Catalyst|Binding of (.+)|(?:High|Mid|Low)-Grade (.+)|(Crystallized Phazon|Shade Fragment|Repurposed Actuator|Defense Matrix Modulator))  x$/.exec(tr_.cells[0].textContent.trim());

			if(exec[1]) {
				var tier_check;
				if(data.max === 100) {
					tier_check = data.current<25 ? {"Wispy":"Superior","Diluted":"Exquisite","Regular":"Magnificent","Robust":"Legendary"} : data.current<50 ? {"Diluted":"Superior","Regular":"Exquisite","Robust":"Magnificent","Vibrant":"Legendary"} : {"Regular":"Superior","Robust":"Exquisite","Vibrant":"Magnificent","Coruscating":"Legendary"};
				} else {
					tier_check = data.current<13 ? {"Wispy":"Superior","Diluted":"Exquisite","Regular":"Magnificent","Robust":"Legendary"} : data.current<25 ? {"Diluted":"Superior","Regular":"Exquisite","Robust":"Magnificent","Vibrant":"Legendary"} : {"Regular":"Superior","Robust":"Exquisite","Vibrant":"Magnificent","Coruscating":"Legendary"};
				}
				_up.tier = tier_check[exec[1]];
			}

			if(exec[3]) {
				_up.type = exec[3];
			}
			if(exec[4]) {
				_up.rare = exec[4];
			}
		});
	}

});


_up.calc = function(name) {
	var data,catal,li,item,count,stock;

	if(name) {
		data = _up.data[name];
		data.catalyst = {"Wispy":0,"Diluted":0,"Regular":0,"Robust":0,"Vibrant":0,"Coruscating":0};
		data.mat = [0,0,0];
		data.ul.innerHTML = "";

		var _mat = _up.mat[_up.tier];

		if(data.input.value && data.input.validity.valid) {
			data.valid = true;

			var lv = data.to = parseInt(data.input.value),
				lvi;

			data.binding = lv>5 ? lv-Math.max(5,data.current) : 0;

			while(lv > data.current) {
				if(data.max === 100) {
					lvi = ( _up.mat[_up.tier+"_100"][lv] || Math.min( Math.ceil((lv-5)/2) +5, 50 ) ) - 1;
					data.catalyst[_mat[ lv>50?25 : lv>25?13 : 0 ][3]]++;

				} else {
					lvi = lv - 1;
					data.catalyst[_mat[lvi][3]]++;
				}

				data.mat[0] += _mat[lvi][0];
				data.mat[1] += _mat[lvi][1];
				data.mat[2] += _mat[lvi][2];

				lv--;
			}

			for(catal in data.catalyst) {
				if(data.catalyst[catal]) {
					item = catal + " Catalyst";
					count = data.catalyst[catal];
					stock = _up.inventory[item] || 0;
					li = $element("li",data.ul,count>stock?[".hvut-up-nostock"]:null);
					$element("span",li,[" "+item,".hvut-up-name"]);
					$element("span",li,[" "+count,".hvut-up-count"]);
					$element("span",li,[" ("+stock+")",".hvut-up-stock"]);
				}
			}

			["Low","Mid","High"].forEach(function(g,i){
				if(data.mat[i]) {
					item = g + "-Grade " + _up.type;
					count = data.mat[i];
					stock = _up.inventory[item] || 0;
					li = $element("li",data.ul,count>stock?[".hvut-up-nostock"]:null);
					$element("span",li,[" "+item,".hvut-up-name"]);
					$element("span",li,[" "+count,".hvut-up-count"]);
					$element("span",li,[" ("+stock+")",".hvut-up-stock"]);
				}
			});

			if(_up.rare && data.to>_up.max) {
				count = data.to - _up.max;
				stock = _up.inventory[_up.rare] || 0;
				li = $element("li",data.ul,count>stock?[".hvut-up-nostock"]:null);
				$element("span",li,[" "+_up.rare,".hvut-up-name"]);
				$element("span",li,[" "+count,".hvut-up-count"]);
				$element("span",li,[" ("+stock+")",".hvut-up-stock"]);
			}

			if(data.binding) {
				item = "Binding of " + _up.binding[name];
				count = data.binding;
				stock = _up.inventory[item] || 0;
				li = $element("li",data.ul,count>stock?[".hvut-up-nostock"]:null);
				$element("span",li,[" B. "+_up.binding[name],".hvut-up-name"]);
				$element("span",li,[" "+count,".hvut-up-count"]);
				$element("span",li,[" ("+stock+")",".hvut-up-stock"]);
			}

		} else {
			data.valid = false;
		}
	}

	var catalyst = {"Wispy":0,"Diluted":0,"Regular":0,"Robust":0,"Vibrant":0,"Coruscating":0},
		mat = [0,0,0],
		max = 0,
		binding = {};

	for(name in _up.data) {
		data = _up.data[name];
		if(!data.valid) {
			continue;
		}

		for(catal in catalyst) {
			catalyst[catal] += data.catalyst[catal];
		}

		mat[0] += data.mat[0];
		mat[1] += data.mat[1];
		mat[2] += data.mat[2];

		if(data.binding) {
			binding[_up.binding[name]] = data.binding;
		}

		if(max < data.to) {
			max = data.to;
		}
	}

	_up.ul.innerHTML = "";

	for(catal in catalyst) {
		if(catalyst[catal]) {
			item = catal + " Catalyst";
			count = catalyst[catal];
			stock = _up.inventory[item] || 0;
			li = $element("li",_up.ul,count>stock?[".hvut-up-nostock"]:null);
			$element("span",li,[" "+item,".hvut-up-name"]);
			$element("span",li,[" "+count,".hvut-up-count"]);
			$element("span",li,[" ("+stock+")",".hvut-up-stock"]);
		}
	}

	["Low","Mid","High"].forEach(function(g,i){
		if(mat[i]) {
			item = g + "-Grade " + _up.type;
			count = mat[i];
			stock = _up.inventory[item] || 0;
			li = $element("li",_up.ul,count>stock?[".hvut-up-nostock"]:null);
			$element("span",li,[" "+item,".hvut-up-name"]);
			$element("span",li,[" "+count,".hvut-up-count"]);
			$element("span",li,[" ("+stock+")",".hvut-up-stock"]);
		}
	});

	if(_up.rare && max>_up.max) {
		count = max - _up.max;
		stock = _up.inventory[_up.rare] || 0;
		li = $element("li",_up.ul,count>stock?[".hvut-up-nostock"]:null);
		$element("span",li,[" "+_up.rare,".hvut-up-name"]);
		$element("span",li,[" "+count,".hvut-up-count"]);
		$element("span",li,[" ("+stock+")",".hvut-up-stock"]);
	}

	for(name in binding) {
		item = "Binding of " + name;
		count = binding[name];
		stock = _up.inventory[item] || 0;
		li = $element("li",_up.ul,count>stock?[".hvut-up-nostock"]:null);
		$element("span",li,[" B. "+name,".hvut-up-name"]);
		$element("span",li,[" "+count,".hvut-up-count"]);
		$element("span",li,[" ("+stock+")",".hvut-up-stock"]);
	}

};

_up.upgrade = function() {
	_up.calc();

	var eid = $qs("input[name='select_item']").value,
		current,
		total = 0,
		done = 0;

	for(name in _up.data) {
		data = _up.data[name];
		if(!data.valid) {
			continue;
		}

		total += (data.to - data.current);

		for(current=data.current;current<data.to;current++) {
			ajax(location.href,"select_item="+eid+"&upgrade_stat="+data.id,function(r){_up.button.value=++done+" / "+total;if(done===total){alert("Completed!\n\nReload the page.");}},function(r){});
		}
	}

	_up.button.value = "0 / " + total;
};

}


// Sub Iframe
if(loc.hvut) {
	if(loc.hvut==="difficulty" && loc.s==="Character" && loc.ss==="se") {
		var difflevel = $qsa("input[name=difflevel]")[loc.difficulty];
		if(difflevel) {
			difflevel.checked = true;
			difflevel.form.action = "/?s=Character&ss=se&&hvut=reload";
			$qs("input[name=submit]",difflevel.form).click();
			return;
		}
	}

	if(loc.hvut==="reload" && window!==window.parent) {
		window.parent.location.href = window.parent.location.href;
		return;
	}
}
