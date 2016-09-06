// ==UserScript==
// @name        THV - Battle Stats Ex,Mod by ??-??
// @namespace   tatarime
// @author 		tatarime
// @description show detail of total damage & used item & passed turn counter
// @include     http://hentaiverse.org/*
// @exclude  http://hentaiverse.org/?s=Bazaar*
// @exclude  http://hentaiverse.org/?s=Character&ss=in
// @exclude  http://hentaiverse.org/?s=Character&ss=se
// @exclude  http://hentaiverse.org/?s=Forge*
// @updateURL       https://github.com/suvidev/hv/raw/master/HV_battle_stats.user.js
// @downloadURL     https://github.com/suvidev/hv/raw/master/HV_battle_stats.user.js
// @version  1.1.0.9
// ==/UserScript==

if (window === window.parent){
	
	main();
	var monsterpane = document.getElementById("monsterpane");
	if (monsterpane){
		var mo = new MutationObserver(main);
		mo.observe(monsterpane, {childList: true});
	}
}

function main(){

	var data = {last:0, count:0, total:0, countATK:0, totalATK:0, turn:0, beginTime: Date.now(), lastTime: 0};
	var nglist = /^(Shield Bash|Vital Strike|Merciful Blow|Great Cleave|Rending Blow|Shatter Strike|Iris Strike|Backstab|Frenzied Blows|Skyward Sword|Concussive Strike|FUS RO DAH|Orbital Friendship Cannon)$/;
	
	if (document.getElementById("togpane_log")){
		if(localStorage.getItem("BattleStateExReset") === "true"){
			localStorage.setItem("BattleStateEx", JSON.stringify(data));
		}
	}

	var load = localStorage.getItem("BattleStateEx");
	if (load) data = JSON.parse(load);
	
	var now = Date.now();
	var lastTime = data.lastTime;
	data.lastTime = now;
	
	if (document.getElementById("togpane_log")){
		if (!document.querySelector('#riddleform div img[src*="riddlemaster.php"]')) {
			battle();
			localStorage.setItem("BattleStateExReset", false);
			localStorage.setItem("BattleStateEx", JSON.stringify(data));
			show();
		}
		
	} else if (location.href.indexOf("Battle&ss=ar")!==-1 || location.href.indexOf("Battle&ss=gr") || location.href.indexOf("Battle&ss=rb")!==-1){
		if (!document.querySelector('#riddleform div img[src*="riddlemaster.php"]')) {
			localStorage.setItem("BattleStateExReset", true);
			now = lastTime;
		}
		show();
	}


	function battle(){
		var tr = document.body.querySelectorAll("#togpane_log tr");
		var last = tr[0].children[0].textContent;
		if (last == data.last) return;
		data.last = last;
		
		data.turn++;
		
		for (var i=0; i<tr.length && tr[i].children[0].textContent==last; i++){
			
			// damage
			var d = tr[i].children[2].textContent.match(/you for (\d+) (\w+) damage/);
			if (d){
				var tag = "#" + d[2];
				if (!data[tag]) data[tag] = 0;
				data[tag] += d[1]*1;
				
				data.total += d[1]*1;
				data.count++;
				continue;
			}
			
			// Spilit Shield
			d = tr[i].children[2].textContent.match(/absorbs (\d+)/);
			if (d){
				var t = tr[i-1].children[2].textContent.match(/you for (\d+) (\w+)/);
				if (t){
					var tag = "#" + t[2];
					if (!data[tag]) data[tag] = 0;
					data[tag] += d[1]*1;
					data.total += d[1]*1;
					continue;
				}
			}
			
			// list potion
			d = tr[i].children[2].textContent.match(/You (use|cast) (.+)\./);
			if (d){
				var tag;
				if (nglist.test(d[2])){
					tag = "&"+ d[2];
				}else if (d[1] === "use"){
					tag = "$" + d[2];
				}else if (d[1] === "cast"){
					tag = "&" + d[2];
				}
				
				if (!data[tag]) data[tag] = 0;
				data[tag]++;
				continue;
			}
			

			//								["You crit Memorabilia Of Darksage for 9274 void damage", "You", "crit", "Memorabilia Of Darksage", "9274", "void damage"]
			// attack					   //.match(/you for (\d+) (\w+) damage/);
			d = tr[i].children[2].textContent.match(/([\w\W ]*) (crit|hit|hits|crits) ([\w\W ]*) for (\d*) ([\w\W ]*)/);
			if (d){
				var tagLL = "@";

				switch (d[2]) {
					case "hits":
							if(d[1].startsWith('Your')){
								tagLL = "@" + (d[1].substring(5));
							}else{
								tagLL = "@" + (d[1]);
							}
							break;
					case "crits":
							if(d[1].startsWith('Your')){
								tagLL = "@" + (d[1].substring(5));
							}else{
								tagLL = "@" + (d[1]);
							}
							break;
					case "crit":
							tagLL = "@Crit";
							break;
					case "hit":
							tagLL = "@Hit";
							break;
				}

				var tag = tagLL;//"@" + (d[1]+'_'+d[2]);
				if (!data[tag]) data[tag] = 0;
				data[tag] += d[4]*1;
				
				data.totalATK += d[4]*1;
				data.countATK++;
				continue;
			}

		}
	}


	// display
	function show(){
		
		var div = document.getElementById("battle_stats_ex");
		if (!div){
			div = document.createElement("div");
			div.id = "battle_stats_ex";
			div.style.position = "relative";
			div.style.zIndex = 9999;
			
			var div2 = document.createElement("div");
			//div2.style.position = "relative";
			if (!document.getElementById("togpane_log")){
				div2.style.bottom = "0px";
			}
			div2.style.left = "2px";
			div2.style.backgroundColor = "#edebdf";
			div.appendChild(div2);
			
			/*
			var div3 = document.createElement("div");
			div3.style.position = "absolute";
			div3.style.bottom = "8px";
			div3.style.right = "2px";
			div3.style.backgroundColor = "#edebdf";
			div.appendChild(div3);
			*/
			
			var dmg = document.createElement("div");
			dmg.style.textAlign = "left";
			//dmg.style.paddingTop = "2px";
			dmg.style.paddingBottom = "1.5px";
			//dmg.style.borderBottom = "#fd3c3c solid 1px";
			div2.appendChild(dmg);

			var atk = document.createElement("div");
			atk.style.textAlign = "left";
			atk.style.paddingTop = "2.2px";
			atk.style.paddingBottom = "1.5px";
			//atk.style.borderBottom = "#37b528 solid 1px";
			div2.appendChild(atk);
			
			var item = document.createElement("div");
			item.style.textAlign = "left";
			item.style.paddingTop = "2.2px";
			item.style.paddingBottom = "1.5px";
			//item.style.borderBottom = "#419eff solid 1px";
			div2.appendChild(item);
			
			var skill = document.createElement("div");
			skill.style.textAlign = "left";
			skill.style.paddingTop = "2.2px";
			skill.style.paddingBottom = "1.5px";
			//skill.style.borderBottom = "#ff08ff solid 1px";
			div2.appendChild(skill);
			
			/*var button = document.createElement("input");
			button.type = "button";
			
			button.onclick = function(){
				if(confirm("Reset?")){
					localStorage.removeItem("BattleStateEx");
				}else{
					location.href = location.href;
				}
			}
			div3.appendChild(button);
			*/
			var button = document.createElement("div");
			button.style.textAlign = "left";
			button.style.paddingTop = "2.2px";
			button.style.paddingBottom = "1.5px";
			//button.style.borderBottom = "#a6a900 solid 1px";
			div2.appendChild(button);
			//div3.appendChild(button);
			
			
			if (document.getElementById("togpane_log")){
				document.getElementById('infopane').style.height = '52px';

				var tgLog = document.getElementById("leftpane");
						div.style.position = "relative";
						div.style.width = "669px";
						div.style.height = "110px";
						div.style.clear = "both";
						div.style.textAlign = "justify";
						div.style.overflow = "auto";
						div.style.borderBottom = "2px ridge #5C0D12";
						div.style.paddingTop = "5px";
					tgLog.insertBefore(div, document.getElementById("togpane_log"));
			}else{
				document.body.querySelector(".stuffbox").appendChild(div);
			}
			
		}
		
		var dmg = div.children[0].children[0];
		var atk = div.children[0].children[1];
		var item = div.children[0].children[2];
		var skill = div.children[0].children[3];
		//var button = div.children[1].children[0];
		var button = div.children[0].children[4];
		
		var avg = "Average: " + Math.floor(data.total / data.count) + " / ";
		var str1 = "<b>[Damage]</b> " + avg + extData("#", true, 1);
		dmg.innerHTML = str1;

		var avgAtk = "Average: " + Math.floor(data.totalATK / data.countATK) + " / ";
		var strAtk = "<b>[Attack]</b> " + avgAtk + extData("@", true, 0);
		atk.innerHTML = strAtk;
		
		var str2 = "<b>[Used Item]</b> " + extData("$");
		item.innerHTML = str2;
		
		var str3 = "<b>[Skill & Spell]</b> " + extData("&");
		skill.innerHTML = str3;
		
		// time and round
		var totalTime = (now - data.beginTime) / 1000;
		var hour = Math.floor(totalTime / 3600);
		var min = Math.floor((totalTime-(hour*3600)) / 60);
		var sec = Math.floor((totalTime-(hour*3600)-(min*60)));
		var timeValue = String(hour+100).slice(1) + ":" + String(min+100).slice(1) + ":" + String(sec+100).slice(1);
		var tPers = 0.00;

		tPers = data.turn/( (hour*60*60)+(min*60)+(sec) );
		//button.value = data.turn + " turns\n" + timeValue  + " (" + (1000/(now-lastTime)).toFixed(2) + " t/s)";
		//button.innerHTML = "<b>[Turn]</b> " +data.turn + " turns\n" + timeValue  + " (" + (1000/(now-lastTime)).toFixed(2) + " t/s)";
		button.innerHTML = "<b>[Turn]</b> " +data.turn + " turns\n" + timeValue  + " (" + (tPers).toFixed(2) + " t/s)";
		
	}



	function extData(sign, per, type){
		var ret = "";
		var arr = [];
		
		for (key in data){
			if (key.charAt(0) == sign){
				var d = [];
				d[0] = key, d[1] = data[key], d[2] = "";
				if (per) {
					if(type === 1){
						d[1] = Math.floor(d[1] / data.total * 100) * 1;
					}else{
						d[1] = Math.floor(d[1] / data.totalATK * 100) * 1;
					}
					d[2] = "%";
				}
				arr.push(d);
			}
		}
		arr.sort(func);
		
		for (var i=0; i<arr.length; i++){
			var temp = arr[i][0].slice(1);
			ret += temp.charAt(0).toUpperCase() + temp.slice(1) + ": " + arr[i][1] + arr[i][2];
			if (i < arr.length-1) ret += " / ";
		}
		return ret;
		
		// sort data
		function func(a, b){
			if (a[1] > b[1]) return -1;
			if (a[1] < b[1]) return 1;
			if (a[1] == b[1]) return 0;
		}
	}
}
