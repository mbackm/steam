// ==UserScript==
// @name         HV Show Potion use per round.
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Enjoy :)
// @author       BB-04
// @match        http://hentaiverse.org/*
// @icon           http://g.e-hentai.org/favicon.ico
// @updateURL       https://github.com/axezor/Steam-Next-Queue/raw/master/THV/THV%20Show%20Potion.user.js
// @downloadURL     https://github.com/axezor/Steam-Next-Queue/raw/master/THV/THV%20Show%20Potion.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    var POTION_LIST = ['Draught','Potion','Elixir','Gem'];

    var GBGM_KEY = "SHWIT_";

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

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    function checkHaveOverchanrge(){
        try {
            if ( 'Overcharge' === document.body.children[4].children[0].children[7].textContent) {
                return true;
            }
        }catch(e) {
            return false;
        }

    }



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


    // Your code here...
})();
