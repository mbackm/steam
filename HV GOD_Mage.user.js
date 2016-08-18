// ==UserScript==
// @name        HV GOD_Mage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You hoo..lol
// @match        http://hentaiverse.org/*
// @updateURL       https://github.com/suvidev/hv/raw/master/hv_potion_log.user.js
// @downloadURL     https://github.com/suvidev/hv/raw/master/hv_potion_log.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


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


    // Your code here...
    
var difficulty = 'PFUDOR';
var enableUseImperil = true;

if(document.querySelectorAll('table.cit').length > 0){
	if(document.querySelectorAll('table.cit')[1].querySelectorAll('div.fd4').length > 0){
		difficulty = document.querySelectorAll('table.cit')[1].querySelectorAll('div.fd4')[1].textContent;
	}
}
    
var enableAutoJoinGrindfest = false;

var stmnMain = 70;
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
var STYLE = 'dual'; //current valid entries are 'mage', 'twohand', and 'dual', though dual also works for sword/board and really means single target physical attacks
//0=Mage , 1=1H , 2=2H, 3=DW, 4=Niten

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

    if ((location.href + "").indexOf('s=Battle&ss=gr') !== -1) {
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
            }, (1.1*1000));
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

var HVRound = function() {

    var Round = function(cur, max) {
        this.cur = cur;
        this.max = max;
    };
    this.getRound = function() {
        var line = document.getElementById("togpane_log").querySelector("tr:nth-last-child(2)");
        if (/random encounter/.test(line.textContent)) {
            return new Round(1, 1);
        } else {
            var match = line.textContent.match(/Round (\d*?) \/ (\d*)/);
            return (match ? new Round(Number(match[1]), Number(match[2])) : new Round(0, 0));
        }
    };

    this.syncRound = function(round) {
        if (round.max === 0) {
            round = JSON.parse(sessionStorage.HV_round || "{}");
        } else {
            sessionStorage.HV_round = JSON.stringify(round);
        }
        return round;
    };

    this.drawRound = function(round) {
        var info_pane = document.querySelector(".clb");
        var sample_css = info_pane.querySelector(".cit .fd4>div").style.cssText;
        var round_table = info_pane.appendChild(document.createElement("table"));
        round_table.classList.add("cit");
        var round_div = round_table.appendChild(document.createElement("div"));
        round_div.classList.add("fd4");
        //      round_div.style.csstext = "text-align: right; padding-top: 10px; font: 10pt bolder; ";
        round_div.style.cssText = sample_css;
        round_div.style.fontSize = '12pt';
        round_div.style.fontWeight = 'bold';
        round_div.textContent = round.cur + " / " + round.max;

    };


    this.run = function() {
        this.drawRound(this.syncRound(this.getRound()));
    };

};


if (document.getElementById("battleform")){
    new HVRound().run();
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
