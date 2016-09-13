// ==UserScript==
// @name         THV Difficulty change
// @namespace    ??-??
// @updateURL       https://github.com/suvidev/hv/raw/master/THV_Difficulty_change.user.js
// @downloadURL     https://github.com/suvidev/hv/raw/master/THV_Difficulty_change.user.js
// @version      0.1
// @description  ??-??
// @author       ??-??
// @match        http://hentaiverse.org/*
// @grant        none
// ==/UserScript==

(function() {


    var GBGM_KEY = "THDC_";

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function GM_delValue(vKeyv){
        localStorage.removeItem(GBGM_KEY+vKeyv);
    }

    function GM_setValue(vKeyv, vValuev){
        localStorage.setItem(GBGM_KEY+vKeyv, vValuev);
    }

    function GM_getValue(vKeyv){

        var vlu = localStorage.getItem(GBGM_KEY+vKeyv);

        if(vlu === 'true'){
            return true;
        }else if(vlu === 'false'){
            return false;
        }else if(isNumber(vlu)){
            return parseFloat(vlu);
        }else if(vlu === 'null'){
            return null;
        }

        return vlu;
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
    }



    if(!document.getElementById('togpane_log')){
        if( ((location.href + "").indexOf('pages/showequip') === -1) ){

            if (document.getElementById('riddleform') || document.getElementById('equipment') || document.querySelector('img[src $= "derpy.gif"]')) return;

            var topCllBotm = -1;
            function newDivCll(cllIndx, cllId, cllTxtName, cllBotm){
                var divPS = document.createElement("DIV");
                var lbPS = document.createElement("LABEL");
                lbPS.style.cursor = 'pointer';

                lbPS.addEventListener('click', function() {

                    GM_setValue("cllaxezor", true);
                    var vvllurl = 'http://hentaiverse.org/?s=Battle&ss=ar&page=2';

                    if( (location.href + "") == 'http://hentaiverse.org/?s=Battle&ss=rb' || (location.href + "") == 'http://hentaiverse.org/?s=Battle&ss=iw' || (location.href + "") == 'http://hentaiverse.org/?s=Battle&ss=gr'){
                        vvllurl = window.location.href+'';
                    }

                    GM_setValue("cllurl", vvllurl);
                    window.location.href = 'http://hentaiverse.org/?s=Character&ss=se&cll='+cllIndx;

                });

                if( topCllBotm < parseFloat(cllBotm) ){
                    topCllBotm = parseFloat(cllBotm) ;
                }

                divPS.style.position = 'fixed';
                divPS.style.bottom = cllBotm+'px';
                divPS.style.right = '15px';
                if(document.querySelectorAll('table.cit').length > 0){
                    if(document.querySelectorAll('table.cit')[1].querySelectorAll('div.fd4').length > 0){
                        if(document.querySelectorAll('table.cit')[1].querySelectorAll('div.fd4')[1].textContent === cllTxtName){
                            divPS.style.backgroundColor = '#2AFF7F';
                        }
                    }
                }

                divPS.style.boxShadow = '-1px -1px 9px #888888';
                divPS.id=''+cllId;

                lbPS.appendChild(document.createTextNode(''+cllTxtName));
                divPS.appendChild(lbPS);

                document.body.appendChild(divPS);
            }

            newDivCll(6,'divPFUDOR','PFUDOR','28');
            newDivCll(5,'divIWBTH','IWBTH','48');
            newDivCll(4,'divNintendo','Nintendo','68');
            newDivCll(3,'divHell','Hell','88');
            newDivCll(2,'divNM','Nightmare','108');
            newDivCll(1,'divHard','Hard','128');
            newDivCll(0,'divNormal','Normal','148');

            var setdelayx = true;
            if(GM_getValue("cllaxezor")){


                var ggkey = '';
                var rdioIndex = 4;

                if ((location.href + "").indexOf('cll=') !== -1) {
                    ggkey = getQueryVariable('cll');
                }
                var rdioIndex = -1;
                try {
                    rdioIndex = parseInt(ggkey);
                } catch (e) {
                    console.log(e);
                }

                if( rdioIndex >=0 || rdioIndex <=6 ){

                    //var rdioIndex2 = getQueryVariable('rindexr');

                    if(document.querySelector('input.stdbtn')){
                        if(document.querySelector('input.stdbtn').value.indexOf('Apply') !== -1){

                            if(document.getElementsByName('difflevel').length > 0){
                                document.getElementsByName('difflevel')[rdioIndex].checked = true;

                                setTimeout(function(){
                                    document.getElementsByName('difflevel')[rdioIndex].checked = true;
                                },1000);

                                setTimeout(function(){
                                    document.getElementsByName('difflevel')[rdioIndex].checked = true;
                                },2000);

                                GM_setValue("cllaxezor", false);
                                GM_setValue("cllurlgogo",true);
                                setdelayx = false;
                                document.querySelector('input.stdbtn').click();
                            }
                        }
                    }
                }

            }

            if(GM_getValue("cllurlgogo") && setdelayx){
                GM_setValue("cllurlgogo",false);
                window.location.href = GM_getValue("cllurl");
            }



            var divPSX = document.createElement("DIV");
            var lbPSX = document.createElement("LABEL");
            lbPSX.style.cursor = 'pointer';

            lbPSX.addEventListener('click', function() {
                window.location.href = 'http://hentaiverse.org/?s=Battle&ss=ar&page=2';
            });

            divPSX.style.backgroundColor = '#FFDDA9';
            divPSX.style.position = 'fixed';
            divPSX.style.bottom = (topCllBotm+35)+'px';
            divPSX.style.right = '15px';
            divPSX.style.boxShadow = '-1px -1px 9px #888888';
            divPSX.id='arnID';

            lbPSX.appendChild(document.createTextNode('Arena-[P2]'));

            divPSX.appendChild(lbPSX);

            document.body.appendChild(divPSX);

        }
    }

})();
