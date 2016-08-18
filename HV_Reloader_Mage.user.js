// ==UserScript==
// @name        HV Reloader Mage
// @namespace   HVRLD3
// @author      nihilvoid, Dan31, FabulousCupcake, ??
// @run-at      document-end
// @include     /^https?:\/\/(alt|www)?\.?hentaiverse\.org.*$/
// @version     1.3.3.7
// @updateURL       https://github.com/suvidev/hv/raw/master/HV_Reloader_Mage.user.js
// @downloadURL     https://github.com/suvidev/hv/raw/master/HV_Reloader_Mage.user.js
// @grant       none
// ==/UserScript==

// Vanilla Reloader:
// http://forums.e-hentai.org/index.php?s=&showtopic=65126&view=findpost&p=4259841

// Select a custom font in your settings:
// http://hentaiverse.org/?s=Character&ss=se

// Todo List:
// - Hoverplay instead of mousemelee+defaultaction
// - Fix round counter display at end of game
// - Fix no buff blinking

// Credits and Sources
// ------------------------
// Original reloader idea   : nihilvoid
// Reloader maintainer      : Dan31
// No Blinking              : HV Stat
// HV Counter Plus          : OMP, Superlatanium
// HV State HP              : tatarime

/* ======================================== *\
 * ============= CONFIGURATION ============ *
\* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
var settings = {
	godAuto: true,				// God Mode
	showUsePotion: true,		// Show use poton
	enableCheckPony: true,		// enable check alert pony
    hideWelcome: true,          // Hide the "Welcome to the Hentaiverse" image/logo
    noBlinking: true,           // Disable buff/debuff blinking
    effectDurations: true,      // Show buff/debuff durations
    gemIcon: true,              // Show gem/powerup, click on icon to use
    roundCounter: true,         // Show current round and rounds remaining
    hvStateHP: true,            // Show enemy HP value
    fluidHPBar: true,           // Shorten HP Bar width to easily see which monster has the most HP

    defaultAction: 0,           // Change the default action to a T1 spell
    // |     0     |      1      |   2    |     3      |  4   |   5   |     6      |
    // | No Change | Fiery Blast | Freeze | Shockblast | Gale | Smite | Corruption |

    mouseMelee: false,           // MouseMelee ( hover on enemies to attack )
    minHP: 0.35,                // Stop if hp is below this threshold
    minMP: 0.2 ,                // Stop if mp ...
    minSP: 0.3,                 // Stop if sp ...
    stopWhenChanneling: false,   // Stop if you have channeling buff
    chromeFix: true,            // Fix MM things on chrome by manually tracking cursor movement

    battleLog: true,            // Show battle log

    skipToNextRound: false,      // Auto-advance to next round
    popupTime: 0,               // after `popupTime`ms

    counterPlus: true,          // HV-Counter-Plus ; log and show turn/speed/time/exp/credits
    counterPlusSave: true       // Store additional datas for Income Summary by Superlatanium
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *\
 * =========== CONFIGURATION END ========== *
\* ======================================== */



var GBGM_KEY = "HGM_";

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

function checkHaveOverchanrge(){
	try {
		if ( 'Overcharge' === document.body.children[4].children[0].children[7].textContent) {
			return true;
		}
	}catch(e) {
		return false;
	}

}


function genAfterTurn() {

    var afterTT = 'Rounds: '+localStorage.getItem('lastData_rounds')+', Turn: '+localStorage.getItem('lastData_turn')+', Time: '+localStorage.getItem('lastData_time')+', Exp: '+localStorage.getItem('lastData_exp')+', Credit: '+localStorage.getItem('lastData_credit');
    var divPSX = document.createElement("DIV");
    var lbPS = document.createElement("LABEL");


    divPSX.style.position = 'fixed';
    divPSX.style.bottom = '5px';
    divPSX.style.left = '66px';
    divPSX.style.zIndex = '111';
    divPSX.style.backgroundColor = '#E0D8C1';
    divPSX.style.boxShadow = '-1px -1px 9px #888888';

    divPSX.id = 'divPSX';

    lbPS.appendChild(document.createTextNode(afterTT));

    divPSX.appendChild(lbPS);

    document.body.appendChild(divPSX);

    console.log(afterTT);
}

/* ======================================== *\
 * ============= INITIAL LOAD ============= *
\* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// Stuffs to be ran on page load

function initialPageLoad() {
    // Hoverplay fix for Chrome
    // Constantly track cursor position to allow chrome to keep hitting a monster when hovering on one.
    // You'd have to keep moving your cursor without this fix
    if ( settings.mouseMelee && settings.chromeFix ) {

        // Get cursor position from the last round
        curX = localStorage.getItem('curX');
        curY = localStorage.getItem('curY');
        localStorage.removeItem('curX');
        localStorage.removeItem('curY');

        // Update curX and curY whenever cursor moves
        if (window.Event) document.captureEvents(Event.MOUSEMOVE);
        document.onmousemove = function(e) {
            curX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            curY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        };
    }

    // Change page title to "HV"
    document.title = 'HV';

    // Insert stylesheet for Round Counter and Effect Duration
    var sheet = document.createElement('style');
    sheet.innerHTML = '#round{position:absolute;left:1080px;top:15px;width:120px;font-size:20px;font-weight:bold;z-index:10;text-align:right}.duration{width:30px;display:inline-block;text-align:center;position:relative;margin-left:-30px;top:-4px}.duration>div{background:white;border:1px solid black;padding:0 2px;display:inline-block;min-width:8px;font-weight:bold;height:13px}.hvhp{width:inherit;display:block;position:absolute;top:0;text-align:center;font-weight:bold;color:#ff0;font-size:10px;z-index:999;white-space:nowrap;text-shadow:-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000}.chbd>img{height:12px;}';

    // Hide Battle Log
    if (!settings.battleLog) sheet.innerHTML += '#togpane_log {display: none}';

    // Hide Welcome Logo
    if (settings.hideWelcome) { sheet.innerHTML += 'img.cw{display: none}.cbl:nth-of-type(1){padding-top:114px}'; }
    document.head.appendChild(sheet);

    /* ============== NO BLINKING ============= */
    if (settings.noBlinking) {
    (function(){
        window.addEventListener('beforescriptexecute', function(e) {
            if (/battle\.set_infopane\("Battle Time"\)/.test(e.target.innerHTML)) {
                e.preventDefault();
                window.removeEventListener(e.type, arguments.callee, true);
            }
        }, true);
    })();
    }
    /* ============ NO BLINKING END =========== */

    /* ============= ROUND COUNTER ============ */
    if (settings.roundCounter) {
        (function(){
        var logs = document.querySelector('#togpane_log tr:nth-last-child(2)').textContent;
        if (/Round/.test(logs)) {
            var round = logs.match(/Round ([\d\s\/]+)/)[1];
            localStorage.setItem('rounds', round);
        } else {
            var round = localStorage.getItem('rounds') || undefined;
        }

        if (round !== undefined) {
            var x = document.getElementById('mainpane').appendChild(document.createElement('div'));
            x.id = 'round';
            x.innerHTML = round;
            var final = round.split('/');
            switch (final[1] - final[0]) {
                case 0:
                    x.style.color = '#ff0000';
                    break;
                case 1:
                    x.style.color = '#ffcc99';
                    break;
            }
        }
        })();
    }
    /* =========== ROUND COUNTER END ========== */

}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *\
 * =========== INITIAL LOAD END =========== *
\* ======================================== */



/* ======================================== *\
 * ============ ON PAGE RELOAD ============ *
\* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// Stuffs to be executed after the xhr request is sent
// and the page is loaded with new content.

function OnPageReload() {
    // Reinitialize the battle manager
    window.battle = new window.Battle();
    window.battle.clear_infopane();

    // TODO: Anything that needs to trigger when a new battle page starts should go here
    //  i.e. Stat tracking, log parsing, battle-UI changes, etc.

    /* ============ DEFAULT ACTION ============ */
    function changeDefault(id) {
        var caller = document.getElementById(id.toString());
        window.battle.lock_action(caller, 1, 'magic', id);
        window.battle.set_hostile_subattack(id);
    }
    switch (settings.defaultAction) {
        //Default (Attack)
        case 0:
            break;
        case 1:
            //Fiery Blast
            changeDefault(111);
            break;
        case 2:
            //Freeze
            changeDefault(121);
            break;
        case 3:
            //Shockblast
            changeDefault(131);
            break;
        case 4:
            //Gale
            changeDefault(141);
            break;
        case 5:
            //Smite
            changeDefault(151);
            break;
        case 6:
            //Corruption
            changeDefault(161);
            break;
    }
    /* ========== DEFAULT ACTION END ========== */

    /* ============ HV COUNTER PLUS =========== */
    if (settings.counterPlus) {
        (function(){
        var record = (localStorage.record) ?
            JSON.parse(localStorage.record) :
            {'turns': 0, 'time': 0, 'EXP': 0, 'Credits': 0, 'rounds': 0 };

        var pop = document.getElementsByClassName('btcp')[0];

        function set() {
            record.rounds++;
            localStorage.setItem('record', JSON.stringify(record));
        }

        function build(item, point) {
            record[item] = ( parseInt(record[item]) || 0 ) + parseInt(point);
            // parseInt(null) is NaN, add `NaN || 0` so it becomes 0.
        }

        if (!record.time) {
            build('time', Date.now());
            set();
        }

        // If there's a popup...
        if (pop) {

            // Fetch amount of turns taken to complete the round
            var target, label, i = 0,
                textC = document.querySelectorAll('#togpane_log .t3b'),
                turn = document.querySelector('#togpane_log .t1').textContent;
                build('turns', turn);

            // And find for credit drops
            while (i < textC.length) {
                target = textC[i].textContent;
                if (/Victorious.$|Fleeing.$/.test(target)) break; // stop at end
                label = target.match(/(\d+) ([EC]\w+).$/);
                if (label) build(label[2], label[1]);
                i++;
            }

            // If there's an image in the popup ( the continue button; signifying "not game end" )...
            if (pop.getElementsByTagName('img')[0]) {
                // Save it to storage and we're done
                set();
            } else {
                // No image! It's game end! Display the stats and then burn it.
                var num = 0,
                    runTime = Math.floor((Date.now() - record.time) / 1000),
                    text = pop.getElementsByClassName('fd4'),
                    len = text.length,
                    result = pop.appendChild(document.createElement('div'));
                result.style.cssText = 'font-size:15px;font-weight:bold;margin-top:15px;';
                for (i = 0; i < len; i++) text[i].firstChild.style.marginTop = '-4px';
                pop.style.top = '23px';
                if (len > 2) pop.style.height = len > 3 ? '190px' : '170px';

                for (var key in record) {
                    var div = result.appendChild(document.createElement('div'));
                    div.style.cssText = 'display:inline-block;margin-bottom:7px;';
                    div.style.marginRight = '7px';
                    div.style.marginLeft = '7px';
                    if (key == 'time') {
                        var hour = ('0' + Math.floor(runTime / 3600) % 100).slice(-2),
                            min = ('0' + Math.floor(runTime / 60) % 60).slice(-2),
                            sec = ('0' + runTime % 60).slice(-2);
                        div.textContent = (hour !== 0 ? hour + ' h ' : '') + (min !== 0 ? min + ' m ' : '') + sec + ' s';
                        result.appendChild(document.createElement('br'));
                    } else {
                        var total = record[key] + '';
                        while (total != (total = total.replace(/^(\d+)(\d{3})/, '$1,$2')));
                        div.textContent = total + ' ' + key.toLowerCase();
                        if (!num) div.textContent += ' (' + ((Math.floor((record[key] / runTime) * 1000)) / 1000).toFixed(2) + ' t/s)';
                    }
                    num++;
                }

				try {
					localStorage.setItem('lastData_turn',result.querySelectorAll('div')[0].textContent);
					localStorage.setItem('lastData_time',result.querySelectorAll('div')[1].textContent);
					localStorage.setItem('lastData_exp',result.querySelectorAll('div')[2].textContent);
					localStorage.setItem('lastData_credit',result.querySelectorAll('div')[3].textContent);

					localStorage.setItem('lastData_rounds',record.rounds);
				}
				catch(err) {
					//
				}

                // Counter Plus Save for _Income Summary_ by superlatanium
                if ( settings.counterPlusSave ) {
                    var cpsLogs = (localStorage.counterPlusSaveLogs) ?
                        JSON.parse(localStorage.counterPlusSaveLogs) :
                        [];

                    cpsLogs.push({
                        rounds: record.rounds,
                        turns: record.turns,
                        runTime: runTime,
                        timestamp: Date.now()
                    });

                    localStorage.counterPlusSaveLogs = JSON.stringify(cpsLogs);
                }
            }
        }
        })();
    }
    /* ========== HV COUNTER PLUS END ========= */

	/* ============= SHOW USE POTION ============ */
    if (settings.showUsePotion) {
        (function(){
        
    var POTION_LIST = ['Draught','Potion','Elixir','Gem'];

    function clearCurrentLastTrack(){

        GM_setValue('HealthDraught', 0);
        GM_setValue('ManaDraught', 0);
        GM_setValue('SpiritDraught', 0);
        GM_setValue('HealthPotion', 0);
        GM_setValue('ManaPotion', 0);
        GM_setValue('SpiritPotion', 0);
        GM_setValue('HealthElixir', 0);
        GM_setValue('ManaElixir', 0);
        GM_setValue('SpiritElixir', 0);
        GM_setValue('LastElixir', 0);
        GM_setValue('Gem', 0);

    }

    function trackUsePotion(){

        var lastIdTrack = GM_getValue('lastIdTrack')+'';
        var chkCurrent = document.getElementById("togpane_log").querySelector("tr:nth-child(2) td.t1").textContent+'';

        if(chkCurrent === '0'){
            lastIdTrack = '0';
            //clearCurrentLastTrack();
        }

        if (lastIdTrack !== chkCurrent) {
            var positionLabel = document.getElementById("togpane_log").querySelector("tr:nth-child(1) td.t2").textContent;
            var arrayValue = document.getElementById("togpane_log").querySelector("tr:nth-child("+positionLabel+")").textContent.match(/You use ([A-Za-z0-9_ ]*) ([A-Za-z0-9_ ]*)/);

            if(arrayValue){
                if(arrayValue.length === 3){
                    if(POTION_LIST.indexOf(arrayValue[2]) !== -1){
                        var typePotion = arrayValue[1]+arrayValue[2];
                        if('Gem' === arrayValue[2]){
                            typePotion = arrayValue[2];
                        }

                        if(GM_getValue(typePotion)){
                            GM_setValue(typePotion, (GM_getValue(typePotion)+1));
                        }else{
                            GM_setValue(typePotion, 1);
                        }
                    }
                }
            }

            GM_setValue('lastIdTrack', chkCurrent+'');
        }

    }



    function genSHowUsePotion(){
        var aDIUseR = document.createElement('DIV');
        aDIUseR.style.position = "absolute";
        aDIUseR.style.top = "32px";
        aDIUseR.style.left = "540px";
        aDIUseR.style.backgroundColor = '#EDEBDF';
        aDIUseR.style.opacity = '0.9';
        aDIUseR.style.width = '460px';
        aDIUseR.style.height = '14px';

        var lbIU = document.createElement("LABEL");
        lbIU.style.color = '#5C0D11';
        lbIU.style.fontFamily = "'Verdana','sans-serif'";
        var ttMMD = 'H-[ D(' + GM_getValue('HealthDraught') + ') P(' + GM_getValue('HealthPotion') + ') E(' + GM_getValue('HealthElixir') + ') ]'+ ' - ' + 'M-[ D(' + GM_getValue('ManaDraught') + ') P(' + GM_getValue('ManaPotion') + ') E(' + GM_getValue('ManaElixir') + ') ]' + ' - ' + 'S-[ D(' + GM_getValue('SpiritDraught') + ') P(' + GM_getValue('SpiritPotion') + ') E(' + GM_getValue('SpiritElixir') + ') ] L('+GM_getValue('LastElixir')+') G('+GM_getValue('Gem')+')'; // | Swif('+vSwift+')
        var tnIU = document.createTextNode(ttMMD);

        //if (!/random encounter/.test(document.getElementById("togpane_log").querySelector("tr:nth-last-child(2)").textContent)) {
        if ((location.href + "").indexOf('s=Battle&ss=ba&encounter=') === -1) {
            GM_setValue("lastPotionsUse", ttMMD);
        }
        //}

        lbIU.appendChild(tnIU);
        aDIUseR.appendChild(lbIU);
        document.body.appendChild(aDIUseR);

    }


    if (document.getElementById('riddleform') || document.getElementById('equipment') || document.querySelector('img[src $= "derpy.gif"]')){
        trackUsePotion();
        genSHowUsePotion();   
    }else if (!document.getElementById('quickbar') && !document.querySelector('#riddleform div img[src*="riddlemaster.php"]') && !checkHaveOverchanrge()) {

        var divPS = document.createElement("DIV");
        var lbPS = document.createElement("LABEL");


        divPS.style.position = 'fixed';
        divPS.style.bottom = '5px';
        divPS.style.right = '15px';
        divPS.style.backgroundColor = '#E0D8C1';
        divPS.style.boxShadow = '-1px -1px 9px #888888';

        divPS.id = 'divPS';

        lbPS.appendChild(document.createTextNode(GM_getValue("lastPotionsUse") + ''));

        divPS.appendChild(lbPS);

        document.body.appendChild(divPS);
        if(!checkHaveOverchanrge()){
            clearCurrentLastTrack();
        }

    }else{
        trackUsePotion();
        genSHowUsePotion();
    }



        })();
    }
    /* =========== SHOW USE POTION END ========== */


    /* ============= BUFF DURATION ============ */
    if (settings.effectDurations) {
        (function(){
        var targets = document.querySelectorAll('img[onmouseover^="battle.set_infopane_effect"]'),
            i = targets.length;
        while (i--) {
            var duration = targets[i].getAttribute('onmouseover').match(/, ([-\d]+)\)/);
            if (!duration || duration < 0) duration = '-';
            else duration = duration[1];
            var div = targets[i].parentNode.insertBefore(document.createElement('div'), targets[i].nextSibling);
            div.appendChild(document.createElement('div')).innerHTML = duration;
            div.className = 'duration';
        }
        })();
    }
    /* =========== BUFF DURATION END ========== */

    /* =============== SHOW GEMS ============== */
    if (settings.gemIcon) {
        (function(){
        var gem = document.getElementById('ikey_p');
        var gem_icon = document.getElementById("gem_icon");
        if (gem && !gem_icon) {
            var icon;
            switch (gem.getAttribute('onmouseover').match(/'([^\s]+) Gem/)[1]) {
                case 'Mystic':
                    icon = 'channeling.png';
                    break;
                case 'Health':
                    icon = 'healthpot.png';
                    break;
                case 'Mana':
                    icon = 'manapot.png';
                    break;
                case 'Spirit':
                    icon = 'spiritpot.png';
                    break;
            }

            gem_icon = document.querySelector('.btp').appendChild(document.createElement('img'));
            //gem_icon.src = 'https://raw.github.com/greentea039/HVSTAT/5a7a1e09b8847394faacf0d4b1321d51cb96816f/css/images/' + icon;
            //gem_icon.src = icon;
            gem_icon.src = 'http://ehgt.org/v/e/' + icon;
            gem_icon.style.cssText = 'border: 1px solid black; position: absolute; float: right; right: 6px; top: 8px;';
            gem_icon.onclick = function() {
                window.battle.lock_action(gem, 1, 'items', 'ikey_p');
                window.battle.set_friendly_subattack('999');
                window.battle.touch_and_go();
                gem.remove();
                gem_icon.remove();
            };
            gem_icon.id = "gem_icon";
        } else if (!gem && gem_icon) {
            gem_icon.remove();
        }
        })();
    }
    /* ============= SHOW GEMS END ============ */

    /* ============== MOUSE MELEE ============= */
    if (settings.mouseMelee) {
        (function(){

        function getMonsterUnderCursor() {
            var el = document.elementFromPoint(curX, curY);
            var result = false;

            // Check `el` and iteratively its parents until we hit body or found monster
            while(!result) {
                if(el.nodeName.toLowerCase() === 'body') break;
                result = ( el.id.match('mkey') ? el : false );
                el = el.parentElement;
            }

            return result;
        }

        function NoHoverClick() {
            var bars = document.getElementsByClassName("cwb2");
            var hp = bars[0].width / 120;
            var mp = bars[1].width / 120;
            var sp = bars[2].width / 120;
            //var oc = bars[3].width/120;
            var low_hp = (hp < settings.minHP);
            var low_mp = (mp < settings.minMP);
            var low_sp = (sp < settings.minSP);
            //var oc_full = (oc == 1);
            var bar_backs = document.getElementsByClassName("cwbdv");
            if (low_hp) bar_backs[0].setAttribute("style", "background-color:purple");
            if (low_mp) bar_backs[1].setAttribute("style", "background-color:purple");
            if (low_sp) bar_backs[2].setAttribute("style", "background-color:purple");
            var is_channeling = function() {
                if (!settings.stopWhenChanneling) return false;
                var status_icons = document.querySelectorAll('img[onmouseover^="battle.set_infopane_effect"]');
                for (var i = 0, len = status_icons.length; i < len; i++) {
                    if (/\bchanneling\b/i.test(status_icons[i].onmouseover.toString())) {
                        //var img = document.querySelector('.btp').appendChild(document.createElement('img'));
                        //img.src = "http://ehgt.org/v/e/channeling.png";
                        //img.style.cssText = 'border: 3px solid cyan; margin-right:2px; margin-left:2px;';
                        return true;
                    }
                }
                return false;
            };
            //return (low_hp || low_mp || low_sp || oc_full || is_channeling);
            return (low_hp || low_mp || low_sp || is_channeling());
        }

        var mpane = document.getElementById('monsterpane');
        if (mpane && !NoHoverClick()) {
            // Check if cursor is hovering on a monster
            if ( settings.chromeFix ) {
                var monster = getMonsterUnderCursor();
                if ( monster && monster.onclick !== null ) {
                    monster.click();
                    return;
                }
            }

            // Add hover event listeners
            var m = mpane.getElementsByClassName("btm1");
            for (var i = 0; i < m.length; i++) {
                if (m[i].hasAttribute('onclick')) {
                    m[i].setAttribute('onmouseover', m[i].getAttribute('onclick'));
                }
            }
        }
    })();
    }
    /* ============ MOUSE MELEE END =========== */

    /* ============== HV STATE HP ============= */
    if(settings.hvStateHP) {
        (function(){

            function writeHP(index, value) {
                var targ        = document.querySelectorAll('.btm5:first-child')[index];
                if ( targ.children[0].nodeName == 'IMG' ) return;                                // Skip if dead
                var realHPperc  = targ.children[0].children[0].width/120;
                var realHP      = Math.round( realHPperc * value );
                var maxHP       = value;
                var el = document.createElement('span');
                el.classList.add('hvhp');
                el.innerHTML = `${realHP} / ${maxHP}`;

                targ.appendChild(el);
            }
            function changeHPBarWidth(index, value, maxvalue) {
                var targ = document.querySelectorAll('.btm5:first-child')[index];
                if ( targ.children[0].nodeName == 'IMG' ) return;                                // Skip if dead
                var realwidth   = targ.children[0].children[0].width;
                var maxwidth    = 120;
                realwidth   = Math.round(realwidth * value/maxvalue);
                maxwidth    = Math.round( maxwidth * value/maxvalue);

                targ.style.width = `${maxwidth}px`;
                targ.children[0].style.width = `${maxwidth}px`;
                targ.children[0].children[0].style.width = `${realwidth}px`;
                targ.children[0].children[1].style.width = `${maxwidth}px`;
            }
            function fetchMonsterHPs() {
                var i = 0;
                var hpList = '';

                while(true) {
                    index = 3 + i;
                    var log = document.querySelector(`#togpane_log tr:nth-last-child(${index})`);
                    if ( log && /Spawned Monster/.test(log.textContent) ) {
                        var hp = log.textContent.match(/HP=(\d+)/)[1];
                        hpList += `${hp};`;
                    } else {
                        break;
                    }
                    i += 1;
                }

                if (hpList) localStorage.setItem('hpList', hpList);
            }
            function isBattleStart() {
                var log = document.querySelector('#togpane_log tr:nth-last-child(1)').textContent;
                if ( /Battle Start!/.test(log) ) return true;
                return false;
            }

            // Get list of monster HP
            if ( isBattleStart() ) fetchMonsterHPs();
            var hpList = localStorage.getItem('hpList');
            if( typeof hpList == "undefined" ) return;
            hpList = hpList.split(';');

            // Write HP to each monster
            for(var i = 0; i<hpList.length-1; i+=1) {
                writeHP(i, hpList[i]);
            }

            // Fluid HP bar
            if(settings.fluidHPBar) {
                var maxHP = Math.max.apply(null, hpList);
                for(var i = 0; i<hpList.length-1; i+=1) {
                    changeHPBarWidth(i, hpList[i], maxHP);
                }
            }

        })();
    }
    /* ============ HV STATE HP END =========== */


	/* ============== GOD AUTO ============= */
    if (settings.godAuto) {
        (function(){

    // Your code here...
    
var difficulty = 'PFUDOR';
var enableUseImperil = true;

if(document.querySelectorAll('table.cit').length > 0){
	if(document.querySelectorAll('table.cit')[1].querySelectorAll('div.fd4').length > 0){
		difficulty = document.querySelectorAll('table.cit')[1].querySelectorAll('div.fd4')[1].textContent;
	}
}
    
var enableAutoJoinGrindfest = false;

var stmnMain = 73;
var stmnMin = 50;
var enableSkipSTMN = false;

var CHK_AUTO_GRIPF = 92;

var SKIP_BEEP_BATTLE_DONE = false;

var MAGE_TYPE_ELEMENTAL = true;
var MAGE_TYPE_HOLY = true;
var MAGE_TYPE_DARK = true;

var MAGE_SPELL_COLD = ['freeze','blizzard','fimbulvetr'];
var MAGE_SPELL_WIND = ['gale','downburst','storms of njord'];
var MAGE_SPELL_ELEC = ['shockblast','chained lightning','wrath of thor'];
var MAGE_SPELL_FIRE = ['fiery blast','inferno','flames of loki'];
var MAGE_SPELL_DARK = ['corruption','disintegrate','ragnarok'];
var MAGE_SPELL_HOLY = ['smite','banishment','paradise lost'];


var spellsEx = [
    'fiery blast',	111,
    'inferno',		112,
    'flames of loki',	113,
    'freeze',		121,
    'blizzard',		122,
    'fimbulvetr',	123,
    'shockblast',	131,
    'chained lightning', 132,
    'wrath of thor',	133,
    'gale',		141,
    'downburst',	142,
    'storms of njord',	143,
    'smite',		151,
    'banishment',	152,
    'paradise lost',	153,
    'corruption',	161,
    'disintegrate',	162,
    'ragnarok',		163,
    'drain',		211,
    'weaken',		212,
    'imperil',		213,
    'slow',		221,
    'sleep',		222,
    'confuse',		223,
    'blind',		231,
    'silence',		232,
    'magnet',		233,
    'cure',		311,
    'regen',		312,
    'full cure',	313,
    'protection',	411,
    'hastened',		412,
    'shadow veil',	413,
    'absorbing ward',	421,
    'spark of life',	422,
    'spirit shield',	423,
    'heartseeker',	431,
    'arcane focus',	432,
    'flee',		1001,
    'scan',		1011,
    'skyward sword',	2101,
    'shield bash',	2201,
    'vital strike',	2202,
    'merciful blow',	2203,
    'great cleave',	2301,
    'rending blow',	2302,
    'shatter strike',	2303,
    'iris strike',	2401,
    'backstab',		2402,
    'frenzied blows',	2403,
    'concussive strike', 2501
];

var spellsEffect = [
    'stun',	'Stunned',
    'fiery blast',		'Searing Skin',
    'inferno',		'Searing Skin',
    'flames of loki',		'Searing Skin',
    'freeze',		'Freezing Limbs',
    'blizzard',		'Freezing Limbs',
    'fimbulvetr',		'Freezing Limbs',
    'shockblast',		'Deep Burns',
    'chained lightning',		'Deep Burns',
    'wrath of thor',		'Deep Burns',
    'gale',		'Turbulent Air',
    'downburst',		'Turbulent Air',
    'storms of njord',		'Turbulent Air',
    'smite',		'Breached Defense',
    'banishment',		'Breached Defense',
    'paradise lost',		'Breached Defense',
    'corruption',		'Blunted Attack',
    'disintegrate',		'Blunted Attack',
    'ragnarok',		'Blunted Attack',
    'e-theft_holy',		'Burning Soul',
    'e-theft_dark',		'Ripened Soul',
    'drain-v',		'Vital Theft',
    'drain-e',		'Ether Theft',
    'drain-s',		'Spirit Theft',
    'slow',		'Slowed',
    'weaken',		'Weakened',
    'sleep',		'Asleep',
    'confuse',		'Confused',
    'imperil',		'Imperiled',
    'blind',		'Blinded',
    'silence',		'Silenced',
    'magnet',		'Magically Snared'
];

var bossHaveHealSkill = ['Yggdrasil'];

var bossNameEff = [
    'Manbearpig',	'FIRE',
    'White Bunneh',	'COLD',
    'Mithra',		'HOLY',
    'Dalek',		'ELEC',
    'Konata',		'WIND',
    'Mikuru Asahina','HOLY,DARK',
    'Ryouko Asakura','HOLY,DARK',
    'Yuki Nagato',	'HOLY,DARK',
    'Skuld',		'ELEC',
    'Urd',			'COLD',
    'Verdandi',		'WIND',
    'Yggdrasil',	'FIRE',
    'Rhaegal',		'COLD',
    'Viserion',		'COLD',
    'Drogon',		'HOLY',
    'Invisible Pink Unicorn','DARK',
    'Flying Spaghetti Monster','HOLY',
    'Real Life',	'FIRE,COLD,ELEC,WIND,HOLY,DARK'
];

var MODE_FIGHTING = "BG";
var STYLE = 'mage'; //current valid entries are 'mage', 'twohand', and 'dual', though dual also works for sword/board and really means single target physical attacks

if (document.getElementById('2501')) {
    MODE_FIGHTING = "ST"; //Mage
    STYLE = 'mage';
} else if (document.getElementById('2201')) {
    MODE_FIGHTING = "1H"; //1H
    STYLE = 'dual';
} else if (document.getElementById('2301')) {
    MODE_FIGHTING = "2H"; //2H
    STYLE = 'twohand';
} else if (document.getElementById('2401')) {
    MODE_FIGHTING = "DW"; //DW
    STYLE = 'dual';
} else if (document.getElementById('2101')) {
    MODE_FIGHTING = "NT"; //Niten
    STYLE = 'dual';
}

var isSOL = false;

if (document.querySelector(".cwb2[src='/y/s/barsilver.png']")) {
    isSOL = true;
}

if(GM_getValue("enableSkipSTMN") !== null){
    enableSkipSTMN = GM_getValue("enableSkipSTMN");
}

///////////////////////////////////////////////////////////////////////
// AI - that which actually decides what to do for a given situation //
///////////////////////////////////////////////////////////////////////
function AI() {

    ///////////////////////////////////////////////////////////////////////
    // DEFINITIONS POINT - should be filled in to tell the ai how to act //
    ///////////////////////////////////////////////////////////////////////
    var CURE_HP_CUTOFF = 55;

    var ENABLE_HP_POTION = true; // true , false
    var HP_ITEM_D_CUTOFF = 45;
    var HP_ITEM_P_CUTOFF = 35;
    var HP_ITEM_E_CUTOFF = 25;

    if(isSOL){
        HP_ITEM_E_CUTOFF = 10;
    }

    var ENABLE_MP_POTION = true;
    var MP_ITEM_D_CUTOFF = 75;
    var MP_ITEM_P_CUTOFF = 32;
    var MP_ITEM_E_CUTOFF = 15;

    var ENABLE_SP_POTION = true;
    var SP_ITEM_D_CUTOFF = 55;
    var SP_ITEM_P_CUTOFF = 32;
    var SP_ITEM_E_CUTOFF = 5;

    var ENABLE_FLEE = false;
    var MP_CHK_FLEE = 22;  // MP < less than ?
    var HP_CHK_FLEE = 40;  // and HP > more than ? exit fight.

    if ((location.href + "").indexOf('s=Battle&ss=gr') !== -1 && enableAutoJoinGrindfest) {
        MP_CHK_FLEE = 10;
        HP_CHK_FLEE = 40;
        ENABLE_FLEE = true;
        SKIP_BEEP_BATTLE_DONE = true;
        ENABLE_HP_POTION = false;
        ENABLE_MP_POTION = false;
    }

    if(ENABLE_MP_POTION){
        MP_CHK_FLEE = 6;
    }

    if(ENABLE_HP_POTION){
        HP_CHK_FLEE = 45;
    }

    var FORCE_USE_SPELL_MONSTER = false;
    if ((location.href + "").indexOf('s=Battle&ss=ba&encounter=') !== -1) {
        FORCE_USE_SPELL_MONSTER = true;
    }

    //==== SPELL SKILL =====

    var MAINTAIN_BUFFS = ['regen','arcane focus'];//['hastened','protection','spark of life','spirit shield','regen'];

    if(getMaxSelfMana() > 500){
        //MAINTAIN_BUFFS.push('spark of life');
        //MAINTAIN_BUFFS.push('spirit shield');
    }

    var MAINTAIN_CHANNELING_BUFFS = ['hastened','protection','spark of life','regen','spirit shield','absorbing ward'];

    //customize above settings per style!
    if (STYLE=='mage') {
        MAINTAIN_CHANNELING_BUFFS.push('arcane focus');
    }else{
        MAINTAIN_CHANNELING_BUFFS.push('heartseeker');
    }

    MAINTAIN_CHANNELING_BUFFS.push('shadow veil');

    if(getSelfHealth() < 60){
        MAINTAIN_CHANNELING_BUFFS.push('full cure');
        MAINTAIN_CHANNELING_BUFFS.push('cure');
    }

    var MAIN_SPELL_MONSTER = ['imperil'];//['weaken','slow'];

    var DEFEND_FOR_HP = true; //true,false
    var FOCUS_FOR_MP = true;
    var HP_DEFEND_CUTOFF = 90;
    var MP_FOCUS_CUTOFF = 95;

    if(GM_getValue('ROUND_GEM') === null){
        GM_setValue('ROUND_GEM',0);
    }
    var ROUND_GEM = GM_getValue('ROUND_GEM');

    //given that we want to (physical) attack something, pick what to attack
    //current form: looks for groups of size five, then four, ... then chooses the middle one (ie 2h style)
    function chooseTarget(force2H) {
        if (STYLE=='twohand' || force2H) {
            // CHOOSE MONSTER IN LARGEST GROUP (all groups at or larger than 5 are treated the same)
            for (var i=5;i>=1;i--) {
                var n = 0;
                for (var j=1;j<=getNumMonsters();j++) {
                    if (!isMonDead(j)) {
                        n++;
                    }else{
                        n=0;
                    }
                    if (n==i) {
                        return j-Math.floor((n-1)/2);
                    }
                }
            }
            return null;
        }
        if (STYLE=='dual'||STYLE=='mage'){
            //CHOOSE MONSTER WITH HIGHEST MANA
            var m = 0;
            var x = 0;
            for (var i2=1;i2<=getNumMonsters();i2++) {
                if (!isMonDead(i2)) {
                    if (m < getMonMana(i2)) {
                        x = i2;
                        m = getMonMana(i2);
                    }
                }
            }
            return x;
        }
    }

    //select boss max Mana  or  Have heal skill first.
    function chooseTargetBoss(){
        var monArray = document.getElementById('monsterpane').querySelectorAll('div[id^="mkey_"][onclick*="battle"] div.btm2[style^="background"]');

        //document.getElementById('monsterpane').querySelectorAll('div[id^="mkey_"][onclick*="battle"] div.btm2[style^="background"]')[0].parentNode

        var m = 0;
        var x = -1;
        var textComclick;
        for (var i2=1;i2<=monArray.length;i2++) {

            if(bossHaveHealSkill.indexOf(monArray[(i2-1)].parentNode.querySelector('div.btm3').textContent) !== -1){

                textComclick = monArray[(i2-1)].parentNode.getAttribute('onclick');

                if(textComclick.indexOf('commit_target(') !== -1){
                    x = textComclick.substring(textComclick.indexOf('commit_target(')+14, (textComclick.length-1));
                }

                break;
            }else if (m < (monArray[(i2-1)].parentNode.children[2].children[1].children[0].firstElementChild.width*5/6) ) {
                //x = i2;
                //x = monArray[(i2-1)].parentNode.id.substring(5);
                textComclick = monArray[(i2-1)].parentNode.getAttribute('onclick');

                if(textComclick.indexOf('commit_target(') !== -1){
                    x = textComclick.substring(textComclick.indexOf('commit_target(')+14, (textComclick.length-1));
                }

                m = monArray[(i2-1)].parentNode.children[2].children[1].children[0].firstElementChild.width*5/6;
            }
        }

        return parseInt(x);

    }

    function chooseTargetBossMaxHP(){
        var monArray = document.getElementById('monsterpane').querySelectorAll('div[id^="mkey_"][onclick*="battle"] div.btm2[style^="background"]');
        var m = 101;
        var x = -1;
        for (var i2=1;i2<=monArray.length;i2++) {
            if (m > (monArray[(i2-1)].parentNode.children[2].children[0].children[0].firstElementChild.width*5/6) ) {
                //x = i2;
                //x = monArray[(i2-1)].parentNode.id.substring(5);
                var textComclick = monArray[(i2-1)].parentNode.getAttribute('onclick');

                if(textComclick.indexOf('commit_target(') !== -1){
                    x = textComclick.substring(textComclick.indexOf('commit_target(')+14, (textComclick.length-1));
                }

                m = monArray[(i2-1)].parentNode.children[2].children[0].children[0].firstElementChild.width*5/6;
            }
        }

        return parseInt(x);

    }

    function getMonsterWithConditionHPMP(vHPMin, vHPMax, vMPMin, vMPMax){
        var monArray = document.getElementById('monsterpane').querySelectorAll('div[id^="mkey_"][onclick*="battle"]');
        var x = -1;
        for (var i2=1;i2<=monArray.length;i2++) {
            var monHP = monArray[(i2-1)].children[2].children[0].children[0].firstElementChild.width*5/6;
            var monMP = monArray[(i2-1)].children[2].children[1].children[0].firstElementChild.width*5/6;
            if ( (monHP < vHPMax && monHP > vHPMin) && (monMP < vMPMax && monMP > vMPMin)  ) {
                //x = i2;
                //x = monArray[(i2-1)].parentNode.id.substring(5);
                var textComclick = monArray[(i2-1)].getAttribute('onclick');

                if(textComclick.indexOf('commit_target(') !== -1){
                    x = textComclick.substring(textComclick.indexOf('commit_target(')+14, (textComclick.length-1));
                }

                break;
            }
        }

        return parseInt(x);

    }

    function getMonsterWithEff(effImgName, vHPMin, vHPMax, vMPMin, vMPMax){
        //blind
        var monArray = document.getElementById('monsterpane').querySelectorAll('div[id^="mkey_"][onclick*="battle"] img[src$="'+effImgName+'.png"]');

        var x = -1;
        for (var i2=1;i2<=monArray.length;i2++) {

            if(monArray[(i2-1)].parentNode.parentNode.querySelector('div.btm2[style^="background"]')){
                vHPMin = 7;
            }

            var monHP = monArray[(i2-1)].parentNode.parentNode.children[2].children[0].children[0].firstElementChild.width*5/6;
            var monMP = monArray[(i2-1)].parentNode.parentNode.children[2].children[1].children[0].firstElementChild.width*5/6;
            if ( (monHP < vHPMax && monHP > vHPMin) && (monMP < vMPMax && monMP > vMPMin)  ) {
                //x = i2;
                //x = monArray[(i2-1)].parentNode.id.substring(5);
                var textComclick = monArray[(i2-1)].parentNode.parentNode.getAttribute('onclick');

                if(textComclick.indexOf('commit_target(') !== -1){
                    x = textComclick.substring(textComclick.indexOf('commit_target(')+14, (textComclick.length-1));
                }

                break;
            }
        }

        return parseInt(x);

    }

    function getMonsterName(idMon){
        //if(document.getElementById('mkey_'+idMon)){
        //    return document.getElementById('mkey_'+idMon).querySelector('div.btm3').textContent;
        //}

        if(document.querySelector('div[id^="mkey_"][onclick*="battle.commit_target('+idMon+')"]')){
            return document.querySelector('div[id^="mkey_"][onclick*="battle.commit_target('+idMon+')"] div.btm3').textContent;
        }

    }

    function getMonsterChkManaOvercharge(){

        var spellSize = 0;
        spellSize = 4-Math.floor((getSelfMana()+getSelfOvercharge())/66);
        for (var i=4;i>=spellSize;i--) {
            var n = 0;
            for (var j=1;j<=getNumMonsters();j++) {
                if (!isMonDead(j)) {
                    n++;
                }else{
                    n=0;
                }
                if (n==i) {
                    return j-Math.floor((n-1)/2);
                }
            }
        }

        return -1;

    }

    function getMonsterGroupFive(){

        for (var i=5;i>=1;i--) {
            var n = 0;
            for (var j=1;j<=getNumMonsters();j++) {
                if (!isMonDead(j)) {
                    n++;
                }else{
                    n=0;
                }
                if (n==i) {
                    return j-Math.floor((n-1)/2);
                }
            }
        }

        return -1;

    }

    function chooseTargetForMAGE(){

        var indexMon = getMonsterChkManaOvercharge();

        if( indexMon > -1){
            return indexMon;
        }else{
            indexMon = getMonsterGroupFive();
            if( indexMon > -1){
                return indexMon;
            }else{
                return chooseTarget(false);
            }
        }

    }

    function selectSpellWithMonEff(idMon){

        var SPELL = [];
        var i=0;
        if(MAGE_TYPE_ELEMENTAL){
            for(i=0;i<MAGE_SPELL_COLD.length;i++){
                SPELL.push(MAGE_SPELL_COLD[i]);
            }
            if(isMonEffect(idMon,'Searing Skin')){
                return SPELL;
            }

            for(i=0;i<MAGE_SPELL_WIND.length;i++){
                SPELL.push(MAGE_SPELL_WIND[i]);
            }
            if(isMonEffect(idMon,'Freezing Limbs')){
                SPELL = [];
                for(i=0;i<MAGE_SPELL_WIND.length;i++){
                    SPELL.push(MAGE_SPELL_WIND[i]);
                }
                return SPELL;
            }

            for(i=0;i<MAGE_SPELL_ELEC.length;i++){
                SPELL.push(MAGE_SPELL_ELEC[i]);
            }
            if(isMonEffect(idMon,'Turbulent Air')){
                SPELL = [];
                for(i=0;i<MAGE_SPELL_ELEC.length;i++){
                    SPELL.push(MAGE_SPELL_ELEC[i]);
                }
                return SPELL;
            }

            for(i=0;i<MAGE_SPELL_FIRE.length;i++){
                SPELL.push(MAGE_SPELL_FIRE[i]);
            }
            if(isMonEffect(idMon,'Deep Burns')){
                SPELL = [];
                for(i=0;i<MAGE_SPELL_FIRE.length;i++){
                    SPELL.push(MAGE_SPELL_FIRE[i]);
                }
                return SPELL;
            }

        }

        if(MAGE_TYPE_HOLY){
            for(i=0;i<MAGE_SPELL_HOLY.length;i++){
                SPELL.push(MAGE_SPELL_HOLY[i]);
            }

            if(isMonEffect(idMon,'Blunted Attack')){
                return SPELL;
            }
        }

        if(MAGE_TYPE_DARK){
            for(i=0;i<MAGE_SPELL_DARK.length;i++){
                SPELL.push(MAGE_SPELL_DARK[i]);
            }

            if(isMonEffect(idMon,'Breached Defense')){
                return SPELL;
            }
        }

        return SPELL;

    }

    function useSkilllToMonster(vNameSkill){

        var nx = spellsEx.indexOf(vNameSkill.toLowerCase());
        if(document.getElementById(''+spellsEx[nx+1])){
            if(!document.getElementById(''+spellsEx[nx+1]).getAttribute('onclick')){
                return false;
            }
        }else{
            return false;
        }

        for (var i=5;i>=1;i--) {
            var n = 0;
            for (var j=1;j<=getNumMonsters();j++) {
                if (!isMonDead(j)) {
                    n++;
                }else{
                    n=0;
                }
                if (n==i) {
                    if(castSpell(vNameSkill,j-Math.floor((n-1)/2))){
                        return true;
                    }
                }
            }
        }

        return  false;

    }

    function useSpellToMonster(vNameSpell){

        var nx = spellsEx.indexOf(vNameSpell.toLowerCase());
        if(document.getElementById(''+spellsEx[nx+1])){
            if(!document.getElementById(''+spellsEx[nx+1]).getAttribute('onclick')){
                return false;
            }
        }else{
            return false;
        }

        for (var i=5;i>=1;i--) {
            var n = 0;
            for (var j=1;j<=getNumMonsters();j++) {
                if (!isMonDead(j) && isMonEffect(j,spellsEffect[(spellsEffect.indexOf(vNameSpell)+1)])) {
                    n++;
                }else{
                    n=0;
                }
                if (n==i) {
                    if(castSpell(vNameSpell,j-Math.floor((n-1)/2))){
                        return true;
                    }
                }
            }
        }

        return  false;

    }


    function useSpellEffToMonster(vNameSpell){

        var nx = spellsEx.indexOf(vNameSpell.toLowerCase());
        if(document.getElementById(''+spellsEx[nx+1])){
            if(!document.getElementById(''+spellsEx[nx+1]).getAttribute('onclick')){
                return false;
            }
        }else{
            return false;
        }

        for (var i=5;i>=1;i--) {
            var n = 0;
            for (var j=1;j<=getNumMonsters();j++) {
                if (!isMonDead(j) && !isMonEffect(j,spellsEffect[(spellsEffect.indexOf(vNameSpell)+1)])) {
                    n++;
                }else{
                    n=0;
                }
                if (n==i) {
                    if(castSpell(vNameSpell,(j-Math.floor((n-1)/2)))){
                        return true;
                    }
                }
            }
        }

        return  false;

    }

    //given we want to attack something, choose how we attack it and lock that action
    function bAttack(t) {

	if(difficulty === 'PFUDOR' && enableUseImperil){

		for (var sb in MAIN_SPELL_MONSTER) {
			var tb = MAIN_SPELL_MONSTER[sb];
			console.log('decided to cast ' + tb);
			if(useSpellEffToMonster(tb)){
				return;
			}
		}

	}

	if (STYLE=='mage') {
            //Magic

            //Fight boss
            var bossId = chooseTargetBoss();
            var monForMage = chooseTargetForMAGE();
            var spell_list = ['ragnarok', 'disintegrate', 'corruption'];// selectSpellWithMonEff(monForMage);
          
            //Fight normal

            for(var s=0;s<(spell_list.length*5);s++){
                var iRdSpell = getRandomInt(0,(spell_list.length-1));
                if(castSpell(spell_list[iRdSpell],monForMage)){
                    return;
                }
            }

            for(var sz=0;sz<spell_list.length;sz++){
                if(castSpell(spell_list[sz],monForMage)){
                    return;
                }
            }

            attack(chooseTarget(false));
            return;
        }
    }

    /////////////////////////////////////////////////////////
    // ACTIONS POINT - wherein the ai actually does things //
    /////////////////////////////////////////////////////////

    //make sure there's no pony to ban us
    //beep if there is
    if (checkPony()) {
        //http://www.soundsnap.com/audio/play/17604
        a = new Audio('http://www.soundsnap.com/themes/soundsnap2/assets/mp3/please-refresh.mp3');
        a.play();
        return;
    }else{
    }

    //do we need to continue?
    if (checkContinue()) {
        cont();
        return;
    }else{
    }

    //manage channeling buff efficently
    //will first see if anything is missing
    //then will check if there are any maintain buffs with under 20 left & cast the one with least time
    //otherwise will cast haste
    if (checkForBuff('channeling') || getSelfMana() > 80) {
        for (var s in MAINTAIN_CHANNELING_BUFFS) {
            var t = MAINTAIN_CHANNELING_BUFFS[s];
            if (!(checkForBuff(t))) {
                console.log('decided to cast ' + t);
                if(castSpell(t,0)){
                    return;
                }
            }
        }
        for (var s2 in getBuffs()) {
            var t2 = getBuffs()[s2];
            /*
	    if (getBuffDuration(s) > 8){
		//console.log(t+' duration > 20');
                //console.log('decided to cast haste');
                //if(castSpell('haste',0)){
                //    return;
                //}
            }else{
	    */
            if (getBuffDuration(s2) < 20){
                if (MAINTAIN_CHANNELING_BUFFS.indexOf(t2)!=-1) {
                    console.log('decided to cast ' + t2);
                    if(castSpell(t2,0)){
                        return;
                    }
                }
            }
        }
    }else{
        if (getGem() == 'mystic') {
            useGem();
            return;
        }
    }



    //check for use mana potion
    if(ENABLE_MP_POTION){
        if (getSelfMana() < MP_ITEM_P_CUTOFF) {
            console.log('decided to drink mana pot');
            if (getGem()=='mana') {
                useGem();
                return;
            }else{
                var indexItem = nextItem('Mana Potion');
                if(indexItem !== -1){
                    useItem(indexItem);
                    return;
                }
            }

            if (getSelfMana() < MP_ITEM_E_CUTOFF) {
                var indexItem2 = nextItem('Mana Elixir');
                if(indexItem2 !== -1){
                    useItem(indexItem2);
                    return;
                }
            }


        }else if (getSelfMana() < MP_ITEM_D_CUTOFF) {
            if (getGem()=='mana' && getSelfMana() < 70 && ROUND_GEM > 12) {
                useGem();
                return;
            }else if(getGem()=='mana'){
                GM_setValue('ROUND_GEM',(ROUND_GEM+1));
            }else if(getBuffs().indexOf('replenishment') === -1){
                var indexItem3 = nextItem('Mana Draught');
                if(indexItem3 !== -1){
                    useItem(indexItem3);
                    return;
                }
            }
        }
    }else if (getSelfMana() < MP_ITEM_D_CUTOFF){
        if (getGem()=='mana' && getSelfMana() < 70 && ROUND_GEM > 12) {
            useGem();
            return;
        }else if(getGem()=='mana'){
            GM_setValue('ROUND_GEM',(ROUND_GEM+1));
        }else if(getBuffs().indexOf('replenishment') === -1){
            var indexItem3x = nextItem('Mana Draught');
            if(indexItem3x !== -1){
                useItem(indexItem3x);
                return;
            }
        }
    }

    //check for use health potion
    if (getSelfHealth() < CURE_HP_CUTOFF) {
        console.log('decided to cast cure');
        if (getGem()=='health') {
            useGem();
            return;
        }else{

            if(castSpell('cure',0)){
                return;
            }else if(getSelfHealth() < 40){
                if(castSpell('full cure',0)){
                    return;
                }
            }
        }
    }

    if(ENABLE_HP_POTION){
        if (getSelfHealth() < HP_ITEM_P_CUTOFF) {
            var indexItem4 = nextItem('Health Potion');
            if(indexItem4 !== -1){
                useItem(indexItem4);
                return;
            }

            if (getSelfHealth() < HP_ITEM_E_CUTOFF) {
                var indexItem5 = nextItem('Health Elixir');
                if(indexItem5 !== -1){
                    useItem(indexItem5);
                    return;
                }
            }


        }else if (getSelfHealth() < HP_ITEM_D_CUTOFF) {
            if (getGem()=='health' && getSelfHealth() < 65 && ROUND_GEM > 12) {
                useGem();
                return;
            }else if(getGem()=='health'){
                GM_setValue('ROUND_GEM',(ROUND_GEM+1));
            }else if(getBuffs().indexOf('regeneration') === -1){
                var indexItem6 = nextItem('Health Draught');
                if(indexItem6 !== -1){
                    useItem(indexItem6);
                    return;
                }
            }
        }
    }else if(getSelfHealth() < HP_ITEM_D_CUTOFF){
        if (getGem()=='health' && getSelfHealth() < 65 && ROUND_GEM > 12) {
            useGem();
            return;
        }else if(getGem()=='health'){
            GM_setValue('ROUND_GEM',(ROUND_GEM+1));
        }else if(getBuffs().indexOf('regeneration') === -1){
            var indexItem6x = nextItem('Health Draught');
            if(indexItem6x !== -1){
                useItem(indexItem6x);
                return;
            }
        }
    }

    //check for use spirit potion
    if(ENABLE_SP_POTION){
        if (getSelfSpirit() < SP_ITEM_P_CUTOFF) {
            console.log('decided to drink spirit pot');
            if (getGem()=='spirit') {
                useGem();
                return;
            }else{
                var indexItem7 = nextItem('Spirit Potion');
                if(indexItem7 !== -1){
                    useItem(indexItem7);
                    return;
                }
            }

            if (getSelfSpirit() < SP_ITEM_E_CUTOFF) {
                var indexItem8 = nextItem('Spirit Elixir');
                if(indexItem8 !== -1){
                    useItem(indexItem8);
                    return;
                }
            }


        }else if (getSelfSpirit() < SP_ITEM_D_CUTOFF) {
            if (getGem()=='spirit' && getSelfSpirit() < 75 && ROUND_GEM > 12) {
                useGem();
                return;
            }else if(getGem()=='spirit'){
                GM_setValue('ROUND_GEM',(ROUND_GEM+1));
            }else if(getBuffs().indexOf('refreshment') === -1){
                var indexItem9 = nextItem('Spirit Draught');
                if(indexItem9 !== -1){
                    useItem(indexItem9);
                    return;
                }
            }
        }
    }else if (getSelfSpirit() < SP_ITEM_D_CUTOFF){
        if (getGem()=='spirit' && getSelfSpirit() < 75 && ROUND_GEM > 12) {
            useGem();
            return;
        }else if(getGem()=='spirit'){
            GM_setValue('ROUND_GEM',(ROUND_GEM+1));
        }else if(getBuffs().indexOf('refreshment') === -1){
            var indexItem9x = nextItem('Spirit Draught');
            if(indexItem9x !== -1){
                useItem(indexItem9x);
                return;
            }
        }
    }


    if(getSelfHealth() < 15 && !isSOL){
        actionBeep(false,false);
        return;
    }


    if( getSelfMana() < MP_CHK_FLEE && getSelfHealth() > HP_CHK_FLEE && !isSOL && ENABLE_FLEE){
        if(castSpell('flee',0)){
            return;
        }
    }


    //check overcharge conditions
    if ((getNumMonsters()-getNumMonstersDead() == 1) && (getSelfOvercharge() > 25) && (getNumBossMonsterAlive() == 0)) {
        if ((DEFEND_FOR_HP) && (getSelfHealth() < HP_DEFEND_CUTOFF)) {
            console.log('decided to defend');
            defend();
            return;
        }
        if ((FOCUS_FOR_MP) && (getSelfMana() < MP_FOCUS_CUTOFF)) {
            console.log('decided to focus');
            focus();
            return;
        }
    }

    //make sure all asked for buffs are up and running
    for (var s3 in MAINTAIN_BUFFS) {
        var t3 = MAINTAIN_BUFFS[s3];
        if (!(checkForBuff(t3))) {
            if (getGem() == 'mystic') {
                useGem();
                return;
            }else{
                console.log('decided to cast ' + t3);
                if(castSpell(t3,0)){
                    return;
                }
            }
        }
    }

    //get rid of spirit gems
    if (getGem()=='spirit') {
        useGem();
        return;
    }

    //attack something
    console.log('decided to attack');
    bAttack();
}

////////////////////////////////////////////////////////////
// BASE FUNCTIONS - that which talks to the page directly //
////////////////////////////////////////////////////////////

//Casts spell by name - case independent! ie castSpell('cure') would cast cure
//If hostile spell, needs to target(n) whichever monster you're attacking after
function fillForm(a,b,c,d) {
    document.getElementById('battleform').children[0].value = a;
    document.getElementById('battleform').children[1].value = b;
    document.getElementById('battleform').children[2].value = c;
    document.getElementById('battleform').children[3].value = d;
    console.log('console 0:' +a);
    console.log('console 1:' +b);
    console.log('console 2:' +c);
    console.log('console 3:' +d);
    document.getElementById('battleform').submit();
}

function castSpell(spellName, target) {
    var n = spellsEx.indexOf(spellName.toLowerCase());
    var vChk = false;
    //document.getElementById('311').style.opacity
    if(document.getElementById(''+spellsEx[n+1])){
        if(document.getElementById(''+spellsEx[n+1]).getAttribute('onclick')){
            fillForm(1,'magic',target,spellsEx[n+1]);
            vChk = true;
        }
    }

    return vChk;
}

//Will try to continue after beating a round, and will cause an error if not in a battle.
//If there is a battle but it's not over, will do absolutely nothing
function cont() {
    var ccon = document.getElementById("ckey_continue");
    if (ccon) {
        var oc = ccon.getAttribute("onclick");
        if (oc === "battle.battle_continue()") {
            setTimeout(function() {
                ccon.click();
            }, (0.5*1000));
            //ccon.click();
        } else {
            actionBeep(false,true);
            setTimeout(function() {
                ccon.click();
            }, (3*60*1000));
        }
    }else{

        if(document.querySelector('#mainpane div.fd4 div')){
            if(document.querySelector('#mainpane div.fd4 div').textContent === 'You are victorious!'){
                if ((location.href + "").indexOf('s=Battle&ss=ba&encounter=') !== -1) {
                    console.log('Close on 5 min');
                    setTimeout(function() {
                        window.close();
                    }, (5*60*1000));
                }
            }
        }
    }
    //fillForm(1,0,0,0);
}

//turns spirit stance on or off
function toggleSpirit() {
    fillForm(1,'spirit',0,0);
}

//focuses for a turn
function focus() {
    fillForm(1,'focus',0,0);
}

//defends for a turn
function defend() {
    fillForm(1,'defend',0,0);
}

//locks attack, in case something else is locked but you need to switch back to normal attack
function attack(target) {
    fillForm(1,'attack',target,0);
}

//returns position of next unused item
//holy crap this is hacky
function nextItem(vNameItem) {
    var hvChk = -1;
    for (var i=1;i<=15;i++) {
        if (document.getElementById('ikey_'+i) !== null) {
            if(document.getElementById('ikey_'+i).childNodes[0].childNodes[0].textContent === vNameItem){
                hvChk =  i;
                break;
            }
        }
    }
    return hvChk;
}

//uses the item at position n
//will waste a turn if called with a bad n
function useItem(n) {
    fillForm(1,'items',0,n);
}

//uses whatever gem is currently in inventory
//If no gem, wastes a turn
function useGem() {
    GM_setValue('ROUND_GEM',0);
    fillForm(1,'items',0,999);
}

//returns a string of whatever gem is in the inventory, in the form of "health gem" or "mystic gem", etc
function getGem() {
    try {
        return document.getElementById('ikey_p').onmouseover.toString().split("'")[1].split(' ')[0].toLowerCase();
    }catch(e){
        return 'none';
    }
}

//gets the name of the buff at position n (starts at 0) in the buff bar
function getBuffAt(n) {
    try {
        //var ret = document.getElementById('mainpane').children[1].children[0].children[n].attributes.item(1).firstChild.data.split("'")[1];
        //var ret = document.getElementById('mainpane').children[1].children[0].children[n].attributes.item(1).value.split("'")[1];
        var ret = document.getElementById('mainpane').children[1].children[0].children[n].getAttribute('onmouseover').split("'")[1];
        if (ret !== undefined){
            return ret;
        }else{
            return 'none';
        }
    }catch(e) {
        return 'undefined';
    }
}

//gets the number of buffs currently in the buff bar
function getBuffLength() {
    return document.getElementById('mainpane').children[1].children[0].children.length;
}

//gets the remaining duration (as displayed by the tooltip) of the buff at the given position
function getBuffDuration(n) {
    try {
        //return document.getElementById('mainpane').children[1].children[0].children[n].attributes.item(1).value.split(',')[3].split(' ')[1].split(')')[0];
        var duration = document.getElementById('mainpane').children[1].children[0].children[n].getAttribute('onmouseover').split(',')[2].split(' ')[1].split(')')[0];

        if(isNaN(parseInt(duration))){
            duration = 0;
        }else{
            duration = parseInt(duration);
        }

        return duration;
    }catch(e) {
        return 0;
    }
}

//checks if there is a pony present, via checking if the box for monsters exists
//Will also trigger if the character dies, though only after a continue()
function checkPony() {
    var rtChk = false;
    try {
        if(document.querySelector('#riddleform div img[src*="riddlemaster.php"]')){
            //document.getElementById('monsterpane').toString();
            rtChk = true;
        }
    }catch(e){
        // return true;
    }
    return rtChk;
}

//checks if there is a continue box ready to be pushed
//this includes continue, victory, death, etc - anything that appears in the continue box area
function checkContinue() {
    try {

        if(!document.getElementById('ckey_continue')){
            if(document.querySelector('#mainpane div.fd4 div')){
                if(document.querySelector('#mainpane div.fd4 div').textContent === 'You are victorious!'){
                    return true;
                }
            }
        }

        document.getElementById('ckey_continue').toString();
        return true;
    }catch(e) {
        if (e.name=='ReferenceError') {
            return false;
        }
    }
}

//gets the number of monsters - alive or dead
function getNumMonsters() {
    return document.getElementById('monsterpane').children.length-2;
}

function getNumMonstersAlive(){
    return document.getElementById('monsterpane').querySelectorAll('div[id^="mkey_"][onclick*="battle"]').length;
}

function getNumMonstersDead(){
    return document.getElementById('monsterpane').querySelectorAll('div[id^="mkey_"][style*="opacity"]').length;
}

function getNumBossMonsterAlive(){
    return document.getElementById('monsterpane').querySelectorAll('div[id^="mkey_"][onclick*="battle"] div.btm2[style^="background"]').length;

}

//tells if monster at n is dead or not
function isMonDead(n) {
    n--;
    try {
        if (document.getElementById('monsterpane').children[2+n].children[2].children[0].children[0].src.indexOf('dead')==31) {
            return true;
        }
    }catch(e) {
        return false;
    }
}

//verifay monster has been effect.
function isMonEffect(n,txt) {
    n--;
    try {

        var monEffArray =  document.getElementById('monsterpane').children[2+n].querySelectorAll('img[onmouseover*="_effect"]');

        for(var i=0;i<monEffArray.length;i++){
            if( txt === monEffArray[i].getAttribute('onmouseover').split("'")[1]){
                return true;
            }
        }

    }catch(e) {
        return false;
    }
}

//estimates monster health as a percent - ie, 88.2, 12.3, etc
function getMonHealth(n) {
    return document.getElementById('monsterpane').children[n+1].children[2].children[0].children[0].firstElementChild.width*5/6;
}

//estimates monster mana as a percent - same as health
function getMonMana(n) {
    return document.getElementById('monsterpane').children[n+1].children[2].children[1].children[0].firstElementChild.width*5/6;
}

//estimates monster spirit as a percent - same as health
//error if the monster doesn't have spirit
function getMonSpirit(n) {
    return document.getElementById('monsterpane').children[n+1].children[2].children[2].children[0].firstElementChild.width*5/6;
}

//gets the character's current health as a rough percent
//not the specific number, just an estimate based on the green bar
function getSelfHealth() {
    return document.body.children[4].children[0].children[2].children[0].width*5/6;
}

//gets the character's mana, same as health
function getSelfMana() {
    return document.body.children[4].children[0].children[4].children[0].width*5/6;
}

function getMaxSelfMana(){
    return document.body.children[4].children[0].children[4].querySelector('div.fd2 div').textContent.split(' ')[2];
}

//gets the character's spirit, same as health
function getSelfSpirit() {
    return document.body.children[4].children[0].children[6].children[0].width*5/6;
}
//gets the character's overcharge as a percent of 250, same as health - ie, returning 50 would mean 125%
//should be accurate to about 2%
function getSelfOvercharge() {
    return document.body.children[4].children[0].children[8].children[0].width*5/6;
}

/////////////////////////////////////////////////////////////////////////////
// META FUNCTIONS - that which combines base functions in interesting ways //
/////////////////////////////////////////////////////////////////////////////

//returns a list of all buffs on the bar
//normalizes to all lowercase, for consistency
function getBuffs() {
    var r = [];
    for (var i = 0; i < getBuffLength(); i++) {
        r[i]=getBuffAt(i).toLowerCase();
    }
    return r;
}

//checks if a specific buff is in the list - needs to be the exact name given by getBuffAt()
function checkForBuff(n) {
    if (getBuffs().indexOf(n.toLowerCase()) != -1) {
        return true;
    }else{
        return false;
    }
}

//gets number of dead monsters
function getNumDead() {
    var c = 0;
    for (var i = 1; i<=getNumMonsters();i++) {
        if (isMonDead(i)) {
            c++;
        }
    }
    return c;
}

function chkHaveInJSON(logs, vValueID){
    var chkHave = true;
    for (var i = 0; i < logs.length; i++) {
        if (logs[i].v === vValueID) {
            chkHave = false;
            break;
        }
    }

    return chkHave;
}

function getQueryVariableEX(variable, vHref) {
    var query = vHref.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addShortcutAnswer(){


    shortcut = {
        'all_shortcuts': {},
        'add': function(shortcut_combination, callback, opt) {
            var default_options = {
                'type': 'keydown',
                'propagate': false,
                'disable_in_input': false,
                'target': document,
                'keycode': false
            }
            if (!opt) opt = default_options;
            else {
                for (var dfo in default_options) {
                    if (typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
                }
            }

            var ele = opt.target;
            if (typeof opt.target == 'string') ele = docGID(opt.target);
            var ths = this;
            shortcut_combination = shortcut_combination.toLowerCase();

            var func = function(e) {
                e = e || window.event;

                if (opt['disable_in_input']) {
                    var element;
                    if (e.target) element = e.target;
                    else if (e.srcElement) element = e.srcElement;
                    if (element.nodeType == 3) element = element.parentNode;

                    if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
                }

                if (e.keyCode) code = e.keyCode;
                else if (e.which) code = e.which;
                var character = String.fromCharCode(code).toLowerCase();

                if (code == 188) character = ",";
                if (code == 190) character = ".";

                var keys = shortcut_combination.split("+");
                var kp = 0;
                var shift_nums = {
                    "`": "~",
                    "1": "!",
                    "2": "@",
                    "3": "#",
                    "4": "$",
                    "5": "%",
                    "6": "^",
                    "7": "&",
                    "8": "*",
                    "9": "(",
                    "0": ")",
                    "-": "_",
                    "=": "+",
                    ";": ":",
                    "'": "\"",
                    ",": "<",
                    ".": ">",
                    "/": "?",
                    "\\": "|"
                }
                //Special Keys - and their codes
                var special_keys = {
                    'esc': 27,
                    'escape': 27,
                    'tab': 9,
                    'space': 32,
                    'return': 13,
                    'enter': 13,
                    'backspace': 8,

                    'scrolllock': 145,
                    'scroll_lock': 145,
                    'scroll': 145,
                    'capslock': 20,
                    'caps_lock': 20,
                    'caps': 20,
                    'numlock': 144,
                    'num_lock': 144,
                    'num': 144,

                    'pause': 19,
                    'break': 19,

                    'insert': 45,
                    'home': 36,
                    'delete': 46,
                    'end': 35,

                    'pageup': 33,
                    'page_up': 33,
                    'pu': 33,

                    'pagedown': 34,
                    'page_down': 34,
                    'pd': 34,

                    'left': 37,
                    'up': 38,
                    'right': 39,
                    'down': 40,

                    'f1': 112,
                    'f2': 113,
                    'f3': 114,
                    'f4': 115,
                    'f5': 116,
                    'f6': 117,
                    'f7': 118,
                    'f8': 119,
                    'f9': 120,
                    'f10': 121,
                    'f11': 122,
                    'f12': 123
                }

                var modifiers = {
                    shift: {
                        wanted: false,
                        pressed: false
                    },
                    ctrl: {
                        wanted: false,
                        pressed: false
                    },
                    alt: {
                        wanted: false,
                        pressed: false
                    },
                    meta: {
                        wanted: false,
                        pressed: false
                    } //Meta is Mac specific
                };

                if (e.ctrlKey) modifiers.ctrl.pressed = true;
                if (e.shiftKey) modifiers.shift.pressed = true;
                if (e.altKey) modifiers.alt.pressed = true;
                if (e.metaKey) modifiers.meta.pressed = true;

                for (var i = 0; k = keys[i], i < keys.length; i++) {
                    //Modifiers
                    if (k == 'ctrl' || k == 'control') {
                        kp++;
                        modifiers.ctrl.wanted = true;

                    } else if (k == 'shift') {
                        kp++;
                        modifiers.shift.wanted = true;

                    } else if (k == 'alt') {
                        kp++;
                        modifiers.alt.wanted = true;
                    } else if (k == 'meta') {
                        kp++;
                        modifiers.meta.wanted = true;
                    } else if (k.length > 1) { //If it is a special key
                        if (special_keys[k] == code) kp++;

                    } else if (opt['keycode']) {
                        if (opt['keycode'] == code) kp++;

                    } else { //The special keys did not match
                        if (character == k) kp++;
                        else {
                            if (shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                                character = shift_nums[character];
                                if (character == k) kp++;
                            }
                        }
                    }
                }

                if (kp == keys.length &&
                    modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
                    modifiers.shift.pressed == modifiers.shift.wanted &&
                    modifiers.alt.pressed == modifiers.alt.wanted &&
                    modifiers.meta.pressed == modifiers.meta.wanted) {
                    callback(e);

                    if (!opt['propagate']) { //Stop the event
                        //e.cancelBubble is supported by IE - this will kill the bubbling process.
                        e.cancelBubble = true;
                        e.returnValue = false;

                        //e.stopPropagation works in Firefox.
                        if (e.stopPropagation) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        return false;
                    }
                }
            }
            this.all_shortcuts[shortcut_combination] = {
                'callback': func,
                'target': ele,
                'event': opt['type']
            };
            //Attach the function with the event
            if (ele.addEventListener) ele.addEventListener(opt['type'], func, false);
            else if (ele.attachEvent) ele.attachEvent('on' + opt['type'], func);
            else ele['on' + opt['type']] = func;
        },

        //Remove the shortcut - just specify the shortcut and I will remove the binding
        'remove': function(shortcut_combination) {
            shortcut_combination = shortcut_combination.toLowerCase();
            var binding = this.all_shortcuts[shortcut_combination];
            delete(this.all_shortcuts[shortcut_combination])
            if (!binding) return;
            var type = binding['event'];
            var ele = binding['target'];
            var callback = binding['callback'];

            if (ele.detachEvent) ele.detachEvent('on' + type, callback);
            else if (ele.removeEventListener) ele.removeEventListener(type, callback, false);
            else ele['on' + type] = false;
        }
    }

    var ponyV = 'xxxx';

    try {
        if(document.querySelector('#riddleform div img[src*="riddlemaster.php"]')){
            var vHrefEX = document.querySelector('#riddleform div img[src*="riddlemaster.php"]').src;

            if(vHrefEX.indexOf('?') !== -1 ){
                vHrefEX = vHrefEX.substring(vHrefEX.indexOf('?'));
                ponyV = getQueryVariableEX('v',vHrefEX);
            }
        }

    }catch(err) {
        console.log(err.message+'');
    }





    shortcut.add("Alt+A", function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'A'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "A";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }

    });


    shortcut.add("Alt+B", function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'B'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "B";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }

    });


    shortcut.add("Alt+C", function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'C'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "C";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }

    });


}


function addAnswerButton() {

    var newDivOptionsX = document.createElement("div");
    newDivOptionsX.id = "divAnswerClick";
    newDivOptionsX.style.position = "absolute";
    newDivOptionsX.style.top = "40px";
    newDivOptionsX.style.left = "1085px";
    newDivOptionsX.style.cursor = "pointer";

    newDivOptionsX.style.display = "inline-flex";

    //var ponyUid = '911';
    var ponyV = 'xxxx';

    //http://hentaiverse.org/riddlemaster.php?uid=911&v=134cccccc
    try {
        if(document.querySelector('#riddleform div img[src*="riddlemaster.php"]')){
            var vHrefEX = document.querySelector('#riddleform div img[src*="riddlemaster.php"]').src;

            if(vHrefEX.indexOf('?') !== -1 ){
                vHrefEX = vHrefEX.substring(vHrefEX.indexOf('?'));

                //ponyUid = getQueryVariableEX('uid',vHrefEX);
                ponyV = getQueryVariableEX('v',vHrefEX);
            }
        }

    }catch(err) {
        console.log(err.message+'');
    }

    //A
    var btnAnswerA = document.createElement("BUTTON");
    btnAnswerA.id = "btnAnswerAID";
    btnAnswerA.style.background = "#E01F1F";
    btnAnswerA.style.color = "#white";

    var btnSaveTxtNodeA = document.createTextNode("Answer A");
    btnAnswerA.appendChild(btnSaveTxtNodeA);
    btnAnswerA.addEventListener('click', function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'A'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "A";
            // riddlemaster.value = "A";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }

    });

    //B
    var btnAnswerB = document.createElement("BUTTON");
    btnAnswerB.id = "btnAnswerBID";
    btnAnswerB.style.background = "#4AFF22";

    var btnSaveTxtNodeB = document.createTextNode("Answer B");
    btnAnswerB.appendChild(btnSaveTxtNodeB);
    btnAnswerB.addEventListener('click', function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'B'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "B";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }
    });

    //C
    var btnAnswerC = document.createElement("BUTTON");
    btnAnswerC.id = "btnAnswerCID";
    btnAnswerC.style.background = "#EDFF1B";

    var btnSaveTxtNodeC = document.createTextNode("Answer C");
    btnAnswerC.appendChild(btnSaveTxtNodeC);
    btnAnswerC.addEventListener('click', function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'C'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "C";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }
    });

    var lb1 = document.createElement("LABEL");
    lb1.style.width = "5px";
    var lb2 = document.createElement("LABEL");
    lb2.style.width = "5px";
    newDivOptionsX.appendChild(btnAnswerA);
    newDivOptionsX.appendChild(lb1);
    newDivOptionsX.appendChild(btnAnswerB);
    newDivOptionsX.appendChild(lb2);
    newDivOptionsX.appendChild(btnAnswerC);

    document.getElementsByClassName('stuffbox csp')[0].appendChild(newDivOptionsX);


    var vRandomAns = "B";
    var ansRR = ['A', 'B', 'C'];
    var iAns = 0;
    iAns = getRandomInt(0, 99);

    if (iAns >= 0 && iAns <= 25) {
        iAns = 0;
    } else if (iAns >= 26 && iAns <= 75) {
        iAns = 1;
    } else if (iAns >= 66 && iAns <= 99) {
        iAns = 2;
    }

    document.getElementById("riddlemaster").value = ansRR[iAns]; //"B";

    var jsonPony = null;
    var ansPony = '';

    if (GM_getValue('jsonPony') && 'xxxx' !== ponyV){
        jsonPony = JSON.parse(GM_getValue('jsonPony'));

        for (var i = 0; i < jsonPony.length; i++) {
            if (jsonPony[i].v === ponyV) {
                ansPony = jsonPony[i].answer;
                break;
            }
        }

        if(ansPony !== ''){
            document.getElementById("riddlemaster").value = ansPony;
            console.log('PONYYYYYYYYYYYYY ANSWER !!!!!');
        }
    }

    setInterval(function() {

        if (document.getElementById("riddlemaster")) {

            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].click();
        }

    }, 16000);
}

function actionBeep(enableSound,isBattleDone) {
    if(enableSound && !SKIP_BEEP_BATTLE_DONE){
        var a = new Audio('http://www.soundsnap.com/themes/soundsnap2/assets/mp3/please-refresh.mp3');
        a.play();
    }
}

function verifyAnswer(vvSkipvv) {

    if (vvSkipvv) {
        return true;
    }

    if (document.getElementById('monsterpane') !== null) {
        if (document.getElementById('monsterpane').innerHTML.indexOf('Choose the right answer based on the image below.') !== -1) {
            addAnswerButton();
            addShortcutAnswer();
            actionBeep(true,false);
            return false;
        }
    }

    return true;
}

function chkMPforGG(){
    if(enableAutoJoinGrindfest){
        if(getSelfMana() > CHK_AUTO_GRIPF){
            if(document.querySelector('img[src*="/y/grindfest/startgrindfest.png"]')){
                document.querySelector('img[src*="/y/grindfest/startgrindfest.png"]').click();
            }
        }else{
            if(document.querySelector('img[src*="/y/grindfest/startgrindfest.png"]')){
                setTimeout(function() {
                    window.location.href = window.location.href;
                }, (30*1000));
            }
        }
    }
}

function genSkipSTMN() {
    var linkx = document.createElement("a");
    linkx.href = "javascript:void(0)";
    var linkText = document.createTextNode("Skip chk STMN");
    linkx.appendChild(linkText);
    linkx.id = "skstmn";
    linkx.style.position = "absolute";
    linkx.style.top = "8px";
    linkx.style.left = "1110px";
    linkx.style.cursor = "pointer";

    document.getElementsByClassName('stuffbox csp')[0].appendChild(linkx);
    document.getElementById('skstmn').addEventListener('click', function() {
        GM_setValue("enableSkipSTMN", true);
        window.location.href = window.location.href;
    });
}

if(enableSkipSTMN){
    stmnMain = stmnMin;
}

var stma = 99;
if (document.querySelector('table.cit div.fd4 div')) {
    stma = parseInt(document.querySelector('table.cit div.fd4 div').textContent.replace('Stamina:', '').trim());
}

if (document.querySelector('img[src="http://ehgt.org/g/derpy.gif"]')) {
    window.location.href = window.location.href;
}

if(verifyAnswer(false)){

    if(document.getElementById('quickbar')){

        if (stma < stmnMain) {
            console.log('break Stamina lower : ' + stmnMain);
            genSkipSTMN();
            return;
        }

        setTimeout(function() {
            window.location.href = window.location.href;
        }, (2*60*1000));

        AI();
    }else{

        GM_setValue("enableSkipSTMN", false);

        if( stma > stmnMain ){
            chkMPforGG();
        }

        if ((location.href + "").indexOf('s=Battle&ss=ba&encounter=') !== -1) {
            if(document.querySelector('img[src*="/y/battle/nocurrentbattle.png"]')){
                setTimeout(function() {
                    window.close();
                }, (5*60*1000));
            }
        }

    }


}


        
    })();
    }
    /* ============ GOD AUTO END =========== */

    /* =========== EXTERNAL SCRIPTS =========== */
    window.dispatchEvent(new CustomEvent('Reloader_reloaded'));
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *\
 * ========== ON PAGE RELOAD END ========== *
\* ======================================== */


/* ======================================== *\
 * ===============  C O R E  ============== *
\* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ============= SUBMIT ACTION ============ */
function SubmitAction() {
    // Reload page if end of round detected ( marked by the existence of popup/navbar )
    if (document.querySelector('.btcp') || document.querySelector('#navbar')) {
        window.location.href = window.location.href;
        return;
    }

    // Serialize form data
    var inputs = document.getElementsByTagName("input");
    var serializedForm = "";
    for (var i = 0; i < inputs.length; i++) {
        if (i !== 0)
            serializedForm += "&";
        serializedForm += inputs[i].id + "=" + inputs[i].value;
    }

    // Send XHR
    var r = new XMLHttpRequest();
    r.open("POST", "", true);
    r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    r.responseType = 'document';
    r.onload = function() {
        if (r.status >= 200 && r.status < 400) {
            updatePage(r.response);
        }
    };
    r.send(serializedForm);

    /* ============== UPDATE PAGE ============= */
    function updatePage(data) {
        var existing, newStuff, i;
        var replacements = '.cwbdv, .bte, #ckey_spirit, #ckey_defend, #togpane_magico, #togpane_magict, #togpane_item, #quickbar, #togpane_log';
        var monsterReplacements = '#mkey_0, #mkey_1, #mkey_2, #mkey_3, #mkey_4, #mkey_5, #mkey_6, #mkey_7, #mkey_8, #mkey_9';

        // Replace `replacements` elements on live document with the newly obtained data
        existing = document.querySelectorAll(replacements);
        newStuff = data.querySelectorAll(replacements);
        i = existing.length;
        while (i--) {
            existing[i].parentNode.replaceChild(newStuff[i], existing[i]);
        }

        // Replace `monsterReplacements` elements on live document with the newly obtained data
        // Don't update dead monsters
        existing = document.querySelectorAll(monsterReplacements);
        newStuff = data.querySelectorAll(monsterReplacements);
        i = existing.length;
        while (i--) {
            if (existing[i].hasAttribute("onclick") || newStuff[i].hasAttribute("onclick")) {
                existing[i].parentNode.replaceChild(newStuff[i], existing[i]);
            }
        }

        var popup  = data.getElementsByClassName('btcp');
        var navbar = data.getElementById('navbar');

        var popupLength = popup.length; // this is because popup.length is changed after insertBefore() is called for some reason.
        var navbarExists = !!navbar;

        // If there's navbar/popup in new content, show it
        if (navbarExists) {
            var mainpane = document.getElementById('mainpane');
            mainpane.parentNode.insertBefore(navbar, mainpane);
            window.at_attach("parent_Character", "child_Character", "hover", "y", "pointer");
            window.at_attach("parent_Bazaar", "child_Bazaar", "hover", "y", "pointer");
            window.at_attach("parent_Battle", "child_Battle", "hover", "y", "pointer");
            window.at_attach("parent_Forge", "child_Forge", "hover", "y", "pointer");
        }
        if (popupLength !== 0) {
            // Here we're loading popup to the page regardless of the skipNextRound / popupTime settings
            // even though it is "skipped" and not even visible; slightly increasing load time.
            // This is because OnPageReload() will later call scripts,
            // some of which will require popup in the document ( Counter Plus )
            var parent = document.getElementsByClassName('btt')[0];
            parent.insertBefore(popup[0], parent.firstChild);
        }

        // Run all script modules again
        OnPageReload();


        // Reload page if `skipToNextRound` and it is Round End
        // Round End detection: popup exists and navbar does not
        if ( popupLength !== 0 && !navbarExists ) {
            /*
            if ( settings.mouseMelee ) {
                localStorage.setItem('curX', curX);
                localStorage.setItem('curY', curY);
            }
            */
            // Skip to next round
            if ( settings.skipToNextRound ) {
                if (settings.popupTime === 0) {
                    window.location.href = window.location.href;
                } else {
                    setTimeout(function() {
                        window.location.href = window.location.href;
                    }, settings.popupTime);
                }
            }
        }

        // Remove counter datas on Game End
        // Game End detection: popup and navbar exists
        if ( popupLength !== 0 && navbarExists ) {
            localStorage.removeItem('record');
            localStorage.removeItem('rounds');
        }

    }
    /* ============ UPDATE PAGE END =========== */

}
/* =========== SUBMIT ACTION END ========== */



/*=================== CHECK PONY ZONE ============*/

function checkPony() {
    var rtChk = false;
    try {
        if(document.querySelector('#riddleform div img[src*="riddlemaster.php"]')){
            //document.getElementById('monsterpane').toString();
            rtChk = true;
        }
    }catch(e){
        // return true;
    }
    return rtChk;
}

function addAnswerImage() {

    var divGodPONY = document.createElement("div");
    divGodPONY.id = "divGodPONYIDIMG";
    divGodPONY.style.position = "absolute";
    divGodPONY.style.top = "400px";
    divGodPONY.style.left = "80px";
    divGodPONY.style.cursor = "move";
    divGodPONY.style.zIndex = "1005";
    divGodPONY.style.background = "#FFFFFF";
    divGodPONY.style.width = "290px";


    var imgAns = document.createElement("IMG");
    imgAns.src = vGodImgUrl;

    divGodPONY.appendChild(imgAns);

    document.getElementsByClassName('stuffbox csp')[0].appendChild(divGodPONY);


    runSetMoveAble();

}



function runSetMoveAble() {

    var load, execute, loadAndExecute;
    load = function(a, b, c) {
        var d;
        d = document.createElement("script"), d.setAttribute("src", a), b !== null && d.addEventListener("load", b), c !== null && d.addEventListener("error", c), document.body.appendChild(d);
        return d;
    }, execute = function(a) {
        var b, c;
        typeof a == "function" ? b = "(" + a + ")();" : b = a, c = document.createElement("script"), c.textContent = b, document.body.appendChild(c);
        return c;
    }, loadAndExecute = function(a, b) {
        return load(a, function() {
            return execute(b);
        })
    };

    loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", function() {

        var load, execute, loadAndExecute;
        load = function(a, b, c) {
            var d;
            d = document.createElement("script"), d.setAttribute("src", a), b !== null && d.addEventListener("load", b), c !== null && d.addEventListener("error", c), document.body.appendChild(d);
            return d;
        }, execute = function(a) {
            var b, c;
            typeof a == "function" ? b = "(" + a + ")();" : b = a, c = document.createElement("script"), c.textContent = b, document.body.appendChild(c);
            return c;
        }, loadAndExecute = function(a, b) {
            return load(a, function() {
                return execute(b);
            })
        };


        loadAndExecute("//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", function() {

            $('#divGodPONYIDIMG').draggable();
        });

    });

}

function chkHaveInJSON(logs, vValueID){
    var chkHave = true;
    for (var i = 0; i < logs.length; i++) {
        if (logs[i].v === vValueID) {
            chkHave = false;
            break;
        }
    }

    return chkHave;
}

function getQueryVariableEX(variable, vHref) {
    var query = vHref.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}



function addShortcutAnswer(){


    shortcut = {
        'all_shortcuts': {},
        'add': function(shortcut_combination, callback, opt) {
            var default_options = {
                'type': 'keydown',
                'propagate': false,
                'disable_in_input': false,
                'target': document,
                'keycode': false
            }
            if (!opt) opt = default_options;
            else {
                for (var dfo in default_options) {
                    if (typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
                }
            }

            var ele = opt.target;
            if (typeof opt.target == 'string') ele = docGID(opt.target);
            var ths = this;
            shortcut_combination = shortcut_combination.toLowerCase();

            var func = function(e) {
                e = e || window.event;

                if (opt['disable_in_input']) {
                    var element;
                    if (e.target) element = e.target;
                    else if (e.srcElement) element = e.srcElement;
                    if (element.nodeType == 3) element = element.parentNode;

                    if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
                }

                if (e.keyCode) code = e.keyCode;
                else if (e.which) code = e.which;
                var character = String.fromCharCode(code).toLowerCase();

                if (code == 188) character = ",";
                if (code == 190) character = ".";

                var keys = shortcut_combination.split("+");
                var kp = 0;
                var shift_nums = {
                    "`": "~",
                    "1": "!",
                    "2": "@",
                    "3": "#",
                    "4": "$",
                    "5": "%",
                    "6": "^",
                    "7": "&",
                    "8": "*",
                    "9": "(",
                    "0": ")",
                    "-": "_",
                    "=": "+",
                    ";": ":",
                    "'": "\"",
                    ",": "<",
                    ".": ">",
                    "/": "?",
                    "\\": "|"
                }
                //Special Keys - and their codes
                var special_keys = {
                    'esc': 27,
                    'escape': 27,
                    'tab': 9,
                    'space': 32,
                    'return': 13,
                    'enter': 13,
                    'backspace': 8,

                    'scrolllock': 145,
                    'scroll_lock': 145,
                    'scroll': 145,
                    'capslock': 20,
                    'caps_lock': 20,
                    'caps': 20,
                    'numlock': 144,
                    'num_lock': 144,
                    'num': 144,

                    'pause': 19,
                    'break': 19,

                    'insert': 45,
                    'home': 36,
                    'delete': 46,
                    'end': 35,

                    'pageup': 33,
                    'page_up': 33,
                    'pu': 33,

                    'pagedown': 34,
                    'page_down': 34,
                    'pd': 34,

                    'left': 37,
                    'up': 38,
                    'right': 39,
                    'down': 40,

                    'f1': 112,
                    'f2': 113,
                    'f3': 114,
                    'f4': 115,
                    'f5': 116,
                    'f6': 117,
                    'f7': 118,
                    'f8': 119,
                    'f9': 120,
                    'f10': 121,
                    'f11': 122,
                    'f12': 123
                }

                var modifiers = {
                    shift: {
                        wanted: false,
                        pressed: false
                    },
                    ctrl: {
                        wanted: false,
                        pressed: false
                    },
                    alt: {
                        wanted: false,
                        pressed: false
                    },
                    meta: {
                        wanted: false,
                        pressed: false
                    } //Meta is Mac specific
                };

                if (e.ctrlKey) modifiers.ctrl.pressed = true;
                if (e.shiftKey) modifiers.shift.pressed = true;
                if (e.altKey) modifiers.alt.pressed = true;
                if (e.metaKey) modifiers.meta.pressed = true;

                for (var i = 0; k = keys[i], i < keys.length; i++) {
                    //Modifiers
                    if (k == 'ctrl' || k == 'control') {
                        kp++;
                        modifiers.ctrl.wanted = true;

                    } else if (k == 'shift') {
                        kp++;
                        modifiers.shift.wanted = true;

                    } else if (k == 'alt') {
                        kp++;
                        modifiers.alt.wanted = true;
                    } else if (k == 'meta') {
                        kp++;
                        modifiers.meta.wanted = true;
                    } else if (k.length > 1) { //If it is a special key
                        if (special_keys[k] == code) kp++;

                    } else if (opt['keycode']) {
                        if (opt['keycode'] == code) kp++;

                    } else { //The special keys did not match
                        if (character == k) kp++;
                        else {
                            if (shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                                character = shift_nums[character];
                                if (character == k) kp++;
                            }
                        }
                    }
                }

                if (kp == keys.length &&
                    modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
                    modifiers.shift.pressed == modifiers.shift.wanted &&
                    modifiers.alt.pressed == modifiers.alt.wanted &&
                    modifiers.meta.pressed == modifiers.meta.wanted) {
                    callback(e);

                    if (!opt['propagate']) { //Stop the event
                        //e.cancelBubble is supported by IE - this will kill the bubbling process.
                        e.cancelBubble = true;
                        e.returnValue = false;

                        //e.stopPropagation works in Firefox.
                        if (e.stopPropagation) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        return false;
                    }
                }
            }
            this.all_shortcuts[shortcut_combination] = {
                'callback': func,
                'target': ele,
                'event': opt['type']
            };
            //Attach the function with the event
            if (ele.addEventListener) ele.addEventListener(opt['type'], func, false);
            else if (ele.attachEvent) ele.attachEvent('on' + opt['type'], func);
            else ele['on' + opt['type']] = func;
        },

        //Remove the shortcut - just specify the shortcut and I will remove the binding
        'remove': function(shortcut_combination) {
            shortcut_combination = shortcut_combination.toLowerCase();
            var binding = this.all_shortcuts[shortcut_combination];
            delete(this.all_shortcuts[shortcut_combination])
            if (!binding) return;
            var type = binding['event'];
            var ele = binding['target'];
            var callback = binding['callback'];

            if (ele.detachEvent) ele.detachEvent('on' + type, callback);
            else if (ele.removeEventListener) ele.removeEventListener(type, callback, false);
            else ele['on' + type] = false;
        }
    }

    var ponyV = 'xxxx';

    try {
        if(document.querySelector('#riddleform div img[src*="riddlemaster.php"]')){
            var vHrefEX = document.querySelector('#riddleform div img[src*="riddlemaster.php"]').src;

            if(vHrefEX.indexOf('?') !== -1 ){
                vHrefEX = vHrefEX.substring(vHrefEX.indexOf('?'));
                ponyV = getQueryVariableEX('v',vHrefEX);
            }
        }

    }catch(err) {
        console.log(err.message+'');
    }





    shortcut.add("Alt+A", function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'A'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "A";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }

    });


    shortcut.add("Alt+B", function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'B'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "B";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }

    });


    shortcut.add("Alt+C", function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'C'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "C";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }

    });


}


function addAnswerButton() {

    var newDivOptionsX = document.createElement("div");
    newDivOptionsX.id = "divAnswerClick";
    newDivOptionsX.style.position = "absolute";
    newDivOptionsX.style.top = "40px";
    newDivOptionsX.style.left = "1085px";
    newDivOptionsX.style.cursor = "pointer";

    newDivOptionsX.style.display = "inline-flex";

    //var ponyUid = '911';
    var ponyV = 'xxxx';

    //http://hentaiverse.org/riddlemaster.php?uid=911&v=134cccccc
    try {
        if(document.querySelector('#riddleform div img[src*="riddlemaster.php"]')){
            var vHrefEX = document.querySelector('#riddleform div img[src*="riddlemaster.php"]').src;

            if(vHrefEX.indexOf('?') !== -1 ){
                vHrefEX = vHrefEX.substring(vHrefEX.indexOf('?'));

                //ponyUid = getQueryVariableEX('uid',vHrefEX);
                ponyV = getQueryVariableEX('v',vHrefEX);
            }
        }

    }catch(err) {
        console.log(err.message+'');
    }

    //A
    var btnAnswerA = document.createElement("BUTTON");
    btnAnswerA.id = "btnAnswerAID";
    btnAnswerA.style.background = "#E01F1F";
    btnAnswerA.style.color = "#white";

    var btnSaveTxtNodeA = document.createTextNode("Answer A");
    btnAnswerA.appendChild(btnSaveTxtNodeA);
    btnAnswerA.addEventListener('click', function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'A'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "A";
            // riddlemaster.value = "A";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }

    });

    //B
    var btnAnswerB = document.createElement("BUTTON");
    btnAnswerB.id = "btnAnswerBID";
    btnAnswerB.style.background = "#4AFF22";

    var btnSaveTxtNodeB = document.createTextNode("Answer B");
    btnAnswerB.appendChild(btnSaveTxtNodeB);
    btnAnswerB.addEventListener('click', function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'B'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "B";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }
    });

    //C
    var btnAnswerC = document.createElement("BUTTON");
    btnAnswerC.id = "btnAnswerCID";
    btnAnswerC.style.background = "#EDFF1B";

    var btnSaveTxtNodeC = document.createTextNode("Answer C");
    btnAnswerC.appendChild(btnSaveTxtNodeC);
    btnAnswerC.addEventListener('click', function() {

        var jsonPony = null;

        if (GM_getValue('jsonPony')){
            jsonPony = JSON.parse(GM_getValue('jsonPony'));
        }else{
            jsonPony = [];
        }

        if( chkHaveInJSON(jsonPony, ponyV) ){
            jsonPony.push({
                "v" : ponyV,
                "answer" : 'C'
            });

            GM_setValue('jsonPony',JSON.stringify(jsonPony));
        }else{

            var jsonPonySame = 0;

            if (GM_getValue('jsonPonySame')){
                jsonPonySame = GM_getValue('jsonPonySame');
            }

            GM_setValue('jsonPonySame',(jsonPonySame+1));
        }

        if (document.getElementById("riddlemaster")) {
            document.getElementById("riddlemaster").value = "C";
            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].onclick();
        }
    });

    var lb1 = document.createElement("LABEL");
    lb1.style.width = "5px";
    var lb2 = document.createElement("LABEL");
    lb2.style.width = "5px";
    newDivOptionsX.appendChild(btnAnswerA);
    newDivOptionsX.appendChild(lb1);
    newDivOptionsX.appendChild(btnAnswerB);
    newDivOptionsX.appendChild(lb2);
    newDivOptionsX.appendChild(btnAnswerC);

    document.getElementsByClassName('stuffbox csp')[0].appendChild(newDivOptionsX);

    addAnswerImage();

    var vRandomAns = "B";
    var ansRR = ['A', 'B', 'C'];
    var iAns = 0;
    iAns = getRandomInt(0, 99);

    if (iAns >= 0 && iAns <= 25) {
        iAns = 0;
    } else if (iAns >= 26 && iAns <= 75) {
        iAns = 1;
    } else if (iAns >= 66 && iAns <= 99) {
        iAns = 2;
    }

    document.getElementById("riddlemaster").value = ansRR[iAns]; //"B";

    var jsonPony = null;
    var ansPony = '';

    if (GM_getValue('jsonPony') && 'xxxx' !== ponyV){
        jsonPony = JSON.parse(GM_getValue('jsonPony'));

        for (var i = 0; i < jsonPony.length; i++) {
            if (jsonPony[i].v === ponyV) {
                ansPony = jsonPony[i].answer;
                break;
            }
        }

        if(ansPony !== ''){
            document.getElementById("riddlemaster").value = ansPony;
            console.log('PONYYYYYYYYYYYYY ANSWER !!!!!');
        }
    }

    setInterval(function() {

        if (document.getElementById("riddlemaster")) {

            document.querySelectorAll('img[src="/y/battle/answer.png"]')[0].click();
        }

    }, 16000);
}

function actionBeepX(enableSound,isBattleDone) {

    if(enableSound || isBattleDone){
        var a = new Audio('http://www.soundsnap.com/themes/soundsnap2/assets/mp3/please-refresh.mp3');
        a.play();
    }


}

var songURL = "https://dl.dropboxusercontent.com/u/10739586/Outkast%20-%20Hey%20Ya!%20(mp3cut.net).mp3";
var audio;

function playAudio() {
  if (!audio) {
	 audio = new Audio(songURL);
	 audio.loop = "true";
  }
  audio.play();
}

if(settings.enableCheckPony){
	if (checkPony()) {
			//http://www.soundsnap.com/audio/play/17604
			a = new Audio('http://www.soundsnap.com/themes/soundsnap2/assets/mp3/please-refresh.mp3');
			a.play();

			playAudio();

			 if (document.getElementById('monsterpane') !== null) {
				if (document.getElementById('monsterpane').innerHTML.indexOf('Choose the right answer based on the image below.') !== -1) {
					addAnswerButton();
					addShortcutAnswer();
					actionBeepX(true,false);
					return false;
				}
			}

			return;
		}
}


/*=================== CHECK PONY ZONE END ============*/


// Start script if in battle
if ( document.getElementById('togpane_log') ) {

    // Init
    initialPageLoad();
    // External Script Init
    window.dispatchEvent(new CustomEvent('Reloader_page_reloaded'));

    // Replace submit with custom submit
    document.getElementById("battleform").submit = SubmitAction;

    // Run all script modules
    OnPageReload();
}else{

	//show potion
	if (settings.showUsePotion) {
		if (!document.getElementById('quickbar') && !document.querySelector('#riddleform div img[src*="riddlemaster.php"]') && !checkHaveOverchanrge()) {

			var divPS = document.createElement("DIV");
			var lbPS = document.createElement("LABEL");


			divPS.style.position = 'fixed';
			divPS.style.bottom = '5px';
			divPS.style.right = '15px';
			divPS.style.backgroundColor = '#E0D8C1';
			divPS.style.boxShadow = '-1px -1px 9px #888888';

			divPS.id = 'divPS';

			lbPS.appendChild(document.createTextNode(GM_getValue("lastPotionsUse") + ''));

			divPS.appendChild(lbPS);

			document.body.appendChild(divPS);
			
			if(!checkHaveOverchanrge()){
				GM_setValue('HealthDraught', 0);
				GM_setValue('ManaDraught', 0);
				GM_setValue('SpiritDraught', 0);
				GM_setValue('HealthPotion', 0);
				GM_setValue('ManaPotion', 0);
				GM_setValue('SpiritPotion', 0);
				GM_setValue('HealthElixir', 0);
				GM_setValue('ManaElixir', 0);
				GM_setValue('SpiritElixir', 0);
				GM_setValue('LastElixir', 0);
				GM_setValue('Gem', 0);
			}

		}
	}

	//hv counter
	if (settings.counterPlus) {
		genAfterTurn();
	}

	if ((location.href + "").indexOf('s=Battle&ss=ba&encounter=') !== -1) {
		if(document.querySelector('img[src*="/y/battle/nocurrentbattle.png"]')){
			setTimeout(function() {
				window.close();
			}, (5*60*1000));
		}
	}

}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *\
 * ===========  C O R E   E N D  ========== *
\* ======================================== */
