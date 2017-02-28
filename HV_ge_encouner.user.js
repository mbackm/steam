// ==UserScript==
// @name         GE encounter Countdown
// @namespace    BB-04
// @version      0.1.45
// @description  Enjoy :)
// @author       BB-04
// @match        http://g.e-hentai.org/g/*
// @match        http://e-hentai.org/*
// @match        https://g.e-hentai.org/g/*
// @match        https://e-hentai.org/*
// @grant        none
// @updateURL       https://github.com/suvidev/hv/raw/master/HV_ge_encouner.user.js
// @downloadURL     https://github.com/suvidev/hv/raw/master/HV_ge_encouner.user.js
// @icon http://g.e-hentai.org/favicon.ico
// ==/UserScript==
//----------------------------------  [1576]   ----------------------------------
// --@--grant    GM_setValue
// --@--grant    GM_getValue

var showImage = false;

//  MID CODE
var GBGM_KEY = "TIME_";
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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


var enableAlertFinish = true;
var openConfirmReload = false;
var keepTime;
var vHaveFigth = false;
var vMinTime = 30.1;//0.04;//30.1;
var vOpenSound = true;
var goAutoFight = false;

var enableNewTabBeep = true;
var isBeepActive = false;
var enableConfReload = false;

//var songURL = "https://dl.dropboxusercontent.com/u/10739586/Outkast%20-%20Hey%20Ya!%20(mp3cut.net).mp3";
var songURL = "https://drive.google.com/uc?export=download&id=0B56AHXc3KN80U3dPRTVBTTRzQ00";
var audio;

function playAudio() {
  if (!audio) {
	 audio = new Audio(songURL);
	 audio.loop = "true";
  }
  audio.play();
}
var songURLPlease = 'http://www.soundsnap.com/themes/soundsnap2/assets/mp3/please-refresh.mp3';
function openNewTabNotification(){
    window.open(songURLPlease,'_blank');   
}

if(!showImage){
    
    if(document.querySelector('#rand img')){
        document.querySelector('#rand img').style.opacity = '0';

        document.querySelector('#rand img').addEventListener('mouseover', function() {
            document.querySelector('#rand img').style.opacity = '1';
        });

        document.querySelector('#rand img').addEventListener('mouseout', function() {
            document.querySelector('#rand img').style.opacity = '0';
        });
    }

    if(document.querySelector('#gd1 img')){
        document.querySelector('#gd1 img').style.opacity = '0';

        document.querySelector('#gd1 img').addEventListener('mouseover', function() {
            document.querySelector('#gd1 img').style.opacity = '1';
        });

        document.querySelector('#gd1 img').addEventListener('mouseout', function() {
            document.querySelector('#gd1 img').style.opacity = '0';
        });
    }



    if(document.querySelector('#gdt')){
        document.querySelector('#gdt').style.opacity = '0';

        document.querySelector('#gdt').addEventListener('mouseover', function() {
            document.querySelector('#gdt').style.opacity = '1';
        });

        document.querySelector('#gdt').addEventListener('mouseout', function() {
            document.querySelector('#gdt').style.opacity = '0';
        });
    }
    
}

if (GM_getValue("firstTime") === null) {
    GM_setValue("alertNowXG", false);
    GM_setValue("firstTime", "done");
    GM_setValue("chkLinkFromReload", false);
    GM_setValue("urlLinkFromReload", "");
    GM_setValue("countReload", 0);
}

var chkLinkFromReload = GM_getValue("chkLinkFromReload");
var urlLinkFromReload = GM_getValue("urlLinkFromReload");
var countReload = GM_getValue("countReload");

if(chkLinkFromReload){

    if((window.location.href+'') === urlLinkFromReload){

        if( countReload < 16 ){

            if(document.getElementById('eventpane')){
                GM_setValue("chkLinkFromReload", false);
                GM_setValue("countReload", 0);
                GM_setValue("urlLinkFromReload", "");
            }else{

                console.log('wait.... reload ( '+countReload+'/16 ) every 2 min.');
                setTimeout(function(){ 
                    GM_setValue("countReload", parseInt(countReload)+1);
                    window.location.href = window.location.href;
                },(2*60000));
            }


        }else{
            GM_setValue("chkLinkFromReload", false);
            GM_setValue("countReload", 0);
            GM_setValue("urlLinkFromReload", "");
        }

    }

}

var startWhenFoundLink = false;
//if ((location.href + "").indexOf('e-hentai.org/s/') === -1 && (location.href + "").indexOf('e-hentai.org/archiver.php') === -1) {
if ((location.href + "").indexOf('e-hentai.org/g/') !== -1 ) {

    var hd1 = document.createElement("INPUT");
    hd1.setAttribute("type", "hidden");
    hd1.id = "hidxtimer1";

    document.body.appendChild(hd1);

    if (GM_getValue("firstTimeT") === null) {
        //  if(true){   
        GM_setValue("keepTime", null);

        GM_setValue("timerIdKeep", 0);
        GM_setValue("timerIdKeep2", 0);

        GM_setValue("countFight", 0);

        GM_setValue("lastReset", 1431622800714);
        GM_setValue("NextReset", 1431709200330);

        GM_setValue("lastFightUrl", "#");
        GM_setValue("lastFightTime", "");

        GM_setValue("chkBeep", true);
        GM_setValue("addCF", true);

        GM_setValue("goAutoFight", false);
        GM_setValue("lastFightTime", "08/07/2015  17:34");
        GM_setValue("firstTimeT", "done");

    }



    //GM_setValue("countFight",10);
    //GM_setValue("lastFightUrl", "#");

    //GM_setValue("countFight", 2);
    //GM_setValue("lastReset", 1431622800714);
    //GM_setValue("NextReset", 1431709200330);

    var d = new Date();
    //console.log(d.getTime());
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    //console.log(d.getTime());
    //console.log(d);

    //d.setHours(0);
    // d.setMinutes(00);
    // d.setSeconds(00);

    //console.log(d);
    //console.log(d.getTime());

    var nd = new Date();
    //console.log(d.getTime());
    nd.setTime(nd.getTime() + nd.getTimezoneOffset() * 60 * 1000);
    //console.log(d.getTime());
    //console.log(d);
    nd.setDate(nd.getDate() + 1);
    nd.setHours(0);
    nd.setMinutes(00);
    nd.setSeconds(00);

    goAutoFight = GM_getValue("goAutoFight");

    var nextReset = GM_getValue("NextReset");

    var nextResetX = parseInt(nextReset);

    //  console.log('d.getTime() = '+d.getTime());
    //    console.log('nd.getTime() = '+nd.getTime());
    //  console.log('nextResetX = '+nextResetX);

    //  console.log('d.getTime new Date = '+new Date(d.getTime()));
    //   console.log('nd.getTime new Date = '+new Date(nd.getTime()));
    //   console.log('nextReset new Date = '+new Date(nextResetX));


    if ( d.getTime() > nextResetX) {
        // if(false){

        console.log('next = ' + nd);
        console.log('next = ' + nd.getTime());
        GM_setValue("countFight", 0);
        GM_setValue("NextReset", nd.getTime());

    }


    //keep url fight

    if (document.getElementById('eventpane')) {

        var xx = eventpane.childNodes[1].innerHTML;

        xx = xx.substring(xx.indexOf('open(') + 6, xx.indexOf("','"));

        xx = xx.replace('amp;', '');
        xx = xx.replace('amp;', '');
        xx = xx.replace('amp;', '');
        xx = xx.replace('amp;', '');

        if( xx === 'Refle' ){
            startWhenFoundLink = true;
            goAutoFight = false;
        }else{
            //localStorage.TIME_lastFightUrl.indexOf(xx)
            
            //if(GM_getValue("lastFightUrl") !== xx){
            if(GM_getValue("lastFightUrl").indexOf(xx) === -1){
                GM_setValue("lastFightUrl", xx+'');

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var hh = today.getHours();
                var mmin = today.getMinutes();

                var yyyy = today.getFullYear();
                if(dd<10){
                    dd='0'+dd
                } 
                if(mm<10){
                    mm='0'+mm
                } 
                var today = dd+'/'+mm+'/'+yyyy+'  '+hh+':'+mmin;

                if(GM_getValue("lastFightTime") !== today){
                    var cFightICX = GM_getValue("countFight");
                    var ccFFxx = parseInt(cFightICX);

                    if (ccFFxx <= 24) {
                        GM_setValue("countFight", (ccFFxx + 1));
                        startWhenFoundLink = true;
                    }
                }

                GM_setValue("lastFightTime", today);

                vHaveFigth = true;   
            }

        }

    } else {
        console.log('wait to fight.');
    }


    /*global window */
    /**
 * @license countdown.js v2.5.2 http://countdownjs.org
 * Copyright (c)2006-2014 Stephen M. McKamey.
 * Licensed under The MIT License.
 */
    /*jshint bitwise:false */

    /**
 * @public
 * @type {Object|null}
 */
    var module;

    /**
 * API entry
 * @public
 * @param {function(Object)|Date|number} start the starting date
 * @param {function(Object)|Date|number} end the ending date
 * @param {number} units the units to populate
 * @return {Object|number}
 */
    var countdown = (

        /**
     * @param {Object} module CommonJS Module
     */
        function(module) {
            /*jshint smarttabs:true */

            'use strict';

            /**
         * @private
         * @const
         * @type {number}
         */
            var MILLISECONDS = 0x001;

            /**
         * @private
         * @const
         * @type {number}
         */
            var SECONDS = 0x002;

            /**
         * @private
         * @const
         * @type {number}
         */
            var MINUTES = 0x004;

            /**
         * @private
         * @const
         * @type {number}
         */
            var HOURS = 0x008;

            /**
         * @private
         * @const
         * @type {number}
         */
            var DAYS = 0x010;

            /**
         * @private
         * @const
         * @type {number}
         */
            var WEEKS = 0x020;

            /**
         * @private
         * @const
         * @type {number}
         */
            var MONTHS = 0x040;

            /**
         * @private
         * @const
         * @type {number}
         */
            var YEARS = 0x080;

            /**
         * @private
         * @const
         * @type {number}
         */
            var DECADES = 0x100;

            /**
         * @private
         * @const
         * @type {number}
         */
            var CENTURIES = 0x200;

            /**
         * @private
         * @const
         * @type {number}
         */
            var MILLENNIA = 0x400;

            /**
         * @private
         * @const
         * @type {number}
         */
            var DEFAULTS = YEARS | MONTHS | DAYS | HOURS | MINUTES | SECONDS;

            /**
         * @private
         * @const
         * @type {number}
         */
            var MILLISECONDS_PER_SECOND = 1000;

            /**
         * @private
         * @const
         * @type {number}
         */
            var SECONDS_PER_MINUTE = 60;

            /**
         * @private
         * @const
         * @type {number}
         */
            var MINUTES_PER_HOUR = 60;

            /**
         * @private
         * @const
         * @type {number}
         */
            var HOURS_PER_DAY = 24;

            /**
         * @private
         * @const
         * @type {number}
         */
            var MILLISECONDS_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;

            /**
         * @private
         * @const
         * @type {number}
         */
            var DAYS_PER_WEEK = 7;

            /**
         * @private
         * @const
         * @type {number}
         */
            var MONTHS_PER_YEAR = 12;

            /**
         * @private
         * @const
         * @type {number}
         */
            var YEARS_PER_DECADE = 10;

            /**
         * @private
         * @const
         * @type {number}
         */
            var DECADES_PER_CENTURY = 10;

            /**
         * @private
         * @const
         * @type {number}
         */
            var CENTURIES_PER_MILLENNIUM = 10;

            /**
         * @private
         * @param {number} x number
         * @return {number}
         */
            var ceil = Math.ceil;

            /**
         * @private
         * @param {number} x number
         * @return {number}
         */
            var floor = Math.floor;

            /**
         * @private
         * @param {Date} ref reference date
         * @param {number} shift number of months to shift
         * @return {number} number of days shifted
         */
            function borrowMonths(ref, shift) {
                var prevTime = ref.getTime();

                // increment month by shift
                ref.setMonth(ref.getMonth() + shift);

                // this is the trickiest since months vary in length
                return Math.round((ref.getTime() - prevTime) / MILLISECONDS_PER_DAY);
            }

            /**
         * @private
         * @param {Date} ref reference date
         * @return {number} number of days
         */
            function daysPerMonth(ref) {
                var a = ref.getTime();

                // increment month by 1
                var b = new Date(a);
                b.setMonth(ref.getMonth() + 1);

                // this is the trickiest since months vary in length
                return Math.round((b.getTime() - a) / MILLISECONDS_PER_DAY);
            }

            /**
         * @private
         * @param {Date} ref reference date
         * @return {number} number of days
         */
            function daysPerYear(ref) {
                var a = ref.getTime();

                // increment year by 1
                var b = new Date(a);
                b.setFullYear(ref.getFullYear() + 1);

                // this is the trickiest since years (periodically) vary in length
                return Math.round((b.getTime() - a) / MILLISECONDS_PER_DAY);
            }

            /**
         * Applies the Timespan to the given date.
         * 
         * @private
         * @param {Timespan} ts
         * @param {Date=} date
         * @return {Date}
         */
            function addToDate(ts, date) {
                date = (date instanceof Date) || ((date !== null) && isFinite(date)) ? new Date(+date) : new Date();
                if (!ts) {
                    return date;
                }

                // if there is a value field, use it directly
                var value = +ts.value || 0;
                if (value) {
                    date.setTime(date.getTime() + value);
                    return date;
                }

                value = +ts.milliseconds || 0;
                if (value) {
                    date.setMilliseconds(date.getMilliseconds() + value);
                }

                value = +ts.seconds || 0;
                if (value) {
                    date.setSeconds(date.getSeconds() + value);
                }

                value = +ts.minutes || 0;
                if (value) {
                    date.setMinutes(date.getMinutes() + value);
                }

                value = +ts.hours || 0;
                if (value) {
                    date.setHours(date.getHours() + value);
                }

                value = +ts.weeks || 0;
                if (value) {
                    value *= DAYS_PER_WEEK;
                }

                value += +ts.days || 0;
                if (value) {
                    date.setDate(date.getDate() + value);
                }

                value = +ts.months || 0;
                if (value) {
                    date.setMonth(date.getMonth() + value);
                }

                value = +ts.millennia || 0;
                if (value) {
                    value *= CENTURIES_PER_MILLENNIUM;
                }

                value += +ts.centuries || 0;
                if (value) {
                    value *= DECADES_PER_CENTURY;
                }

                value += +ts.decades || 0;
                if (value) {
                    value *= YEARS_PER_DECADE;
                }

                value += +ts.years || 0;
                if (value) {
                    date.setFullYear(date.getFullYear() + value);
                }

                return date;
            }

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_MILLISECONDS = 0;

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_SECONDS = 1;

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_MINUTES = 2;

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_HOURS = 3;

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_DAYS = 4;

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_WEEKS = 5;

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_MONTHS = 6;

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_YEARS = 7;

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_DECADES = 8;

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_CENTURIES = 9;

            /**
         * @private
         * @const
         * @type {number}
         */
            var LABEL_MILLENNIA = 10;

            /**
         * @private
         * @type {Array}
         */
            var LABELS_SINGLUAR;

            /**
         * @private
         * @type {Array}
         */
            var LABELS_PLURAL;

            /**
         * @private
         * @type {string}
         */
            var LABEL_LAST;

            /**
         * @private
         * @type {string}
         */
            var LABEL_DELIM;

            /**
         * @private
         * @type {string}
         */
            var LABEL_NOW;

            /**
         * Formats a number as a string
         * 
         * @private
         * @param {number} value
         * @return {string}
         */
            var formatNumber;

            /**
         * @private
         * @param {number} value
         * @param {number} unit unit index into label list
         * @return {string}
         */
            function plurality(value, unit) {
                return formatNumber(value) + ((value === 1) ? LABELS_SINGLUAR[unit] : LABELS_PLURAL[unit]);
            }

            /**
         * Formats the entries with singular or plural labels
         * 
         * @private
         * @param {Timespan} ts
         * @return {Array}
         */
            var formatList;

            /**
         * Timespan representation of a duration of time
         * 
         * @private
         * @this {Timespan}
         * @constructor
         */
            function Timespan() {}

            /**
         * Formats the Timespan as a sentence
         * 
         * @param {string=} emptyLabel the string to use when no values returned
         * @return {string}
         */
            Timespan.prototype.toString = function(emptyLabel) {
                var label = formatList(this);

                var count = label.length;
                if (!count) {
                    return emptyLabel ? '' + emptyLabel : LABEL_NOW;
                }
                if (count === 1) {
                    return label[0];
                }

                var last = LABEL_LAST + label.pop();
                return label.join(LABEL_DELIM) + last;
            };

            /**
         * Formats the Timespan as a sentence in HTML
         * 
         * @param {string=} tag HTML tag name to wrap each value
         * @param {string=} emptyLabel the string to use when no values returned
         * @return {string}
         */
            Timespan.prototype.toHTML = function(tag, emptyLabel) {
                tag = tag || 'span';
                var label = formatList(this);

                var count = label.length;
                if (!count) {
                    emptyLabel = emptyLabel || LABEL_NOW;
                    return emptyLabel ? '<' + tag + '>' + emptyLabel + '</' + tag + '>' : emptyLabel;
                }
                for (var i = 0; i < count; i++) {
                    // wrap each unit in tag
                    label[i] = '<' + tag + '>' + label[i] + '</' + tag + '>';
                }
                if (count === 1) {
                    return label[0];
                }

                var last = LABEL_LAST + label.pop();
                return label.join(LABEL_DELIM) + last;
            };

            /**
         * Applies the Timespan to the given date
         * 
         * @param {Date=} date the date to which the timespan is added.
         * @return {Date}
         */
            Timespan.prototype.addTo = function(date) {
                return addToDate(this, date);
            };

            /**
         * Formats the entries as English labels
         * 
         * @private
         * @param {Timespan} ts
         * @return {Array}
         */
            formatList = function(ts) {
                var list = [];

                var value = ts.millennia;
                if (value) {
                    list.push(plurality(value, LABEL_MILLENNIA));
                }

                value = ts.centuries;
                if (value) {
                    list.push(plurality(value, LABEL_CENTURIES));
                }

                value = ts.decades;
                if (value) {
                    list.push(plurality(value, LABEL_DECADES));
                }

                value = ts.years;
                if (value) {
                    list.push(plurality(value, LABEL_YEARS));
                }

                value = ts.months;
                if (value) {
                    list.push(plurality(value, LABEL_MONTHS));
                }

                value = ts.weeks;
                if (value) {
                    list.push(plurality(value, LABEL_WEEKS));
                }

                value = ts.days;
                if (value) {
                    list.push(plurality(value, LABEL_DAYS));
                }

                value = ts.hours;
                if (value) {
                    list.push(plurality(value, LABEL_HOURS));
                }

                value = ts.minutes;
                if (value) {
                    list.push(plurality(value, LABEL_MINUTES));
                }

                value = ts.seconds;
                if (value) {
                    list.push(plurality(value, LABEL_SECONDS));
                }

                value = ts.milliseconds;
                if (value) {
                    list.push(plurality(value, LABEL_MILLISECONDS));
                }

                return list;
            };

            /**
         * Borrow any underflow units, carry any overflow units
         * 
         * @private
         * @param {Timespan} ts
         * @param {string} toUnit
         */
            function rippleRounded(ts, toUnit) {
                switch (toUnit) {
                    case 'seconds':
                        if (ts.seconds !== SECONDS_PER_MINUTE || isNaN(ts.minutes)) {
                            return;
                        }
                        // ripple seconds up to minutes
                        ts.minutes++;
                        ts.seconds = 0;

                        /* falls through */
                    case 'minutes':
                        if (ts.minutes !== MINUTES_PER_HOUR || isNaN(ts.hours)) {
                            return;
                        }
                        // ripple minutes up to hours
                        ts.hours++;
                        ts.minutes = 0;

                        /* falls through */
                    case 'hours':
                        if (ts.hours !== HOURS_PER_DAY || isNaN(ts.days)) {
                            return;
                        }
                        // ripple hours up to days
                        ts.days++;
                        ts.hours = 0;

                        /* falls through */
                    case 'days':
                        if (ts.days !== DAYS_PER_WEEK || isNaN(ts.weeks)) {
                            return;
                        }
                        // ripple days up to weeks
                        ts.weeks++;
                        ts.days = 0;

                        /* falls through */
                    case 'weeks':
                        if (ts.weeks !== daysPerMonth(ts.refMonth) / DAYS_PER_WEEK || isNaN(ts.months)) {
                            return;
                        }
                        // ripple weeks up to months
                        ts.months++;
                        ts.weeks = 0;

                        /* falls through */
                    case 'months':
                        if (ts.months !== MONTHS_PER_YEAR || isNaN(ts.years)) {
                            return;
                        }
                        // ripple months up to years
                        ts.years++;
                        ts.months = 0;

                        /* falls through */
                    case 'years':
                        if (ts.years !== YEARS_PER_DECADE || isNaN(ts.decades)) {
                            return;
                        }
                        // ripple years up to decades
                        ts.decades++;
                        ts.years = 0;

                        /* falls through */
                    case 'decades':
                        if (ts.decades !== DECADES_PER_CENTURY || isNaN(ts.centuries)) {
                            return;
                        }
                        // ripple decades up to centuries
                        ts.centuries++;
                        ts.decades = 0;

                        /* falls through */
                    case 'centuries':
                        if (ts.centuries !== CENTURIES_PER_MILLENNIUM || isNaN(ts.millennia)) {
                            return;
                        }
                        // ripple centuries up to millennia
                        ts.millennia++;
                        ts.centuries = 0;
                        /* falls through */
                }
            }

            function fraction(ts, frac, fromUnit, toUnit, conversion, digits) {
                if (ts[fromUnit] >= 0) {
                    frac += ts[fromUnit];
                    delete ts[fromUnit];
                }

                frac /= conversion;
                if (frac + 1 <= 1) {
                    // drop if below machine epsilon
                    return 0;
                }

                if (ts[toUnit] >= 0) {
                    // ensure does not have more than specified number of digits
                    ts[toUnit] = +(ts[toUnit] + frac).toFixed(digits);
                    rippleRounded(ts, toUnit);
                    return 0;
                }

                return frac;
            }

            /**
         * Ripple up partial units to next existing
         * 
         * @private
         * @param {Timespan} ts
         * @param {number} digits max number of decimal digits to output
         */
            function fractional(ts, digits) {
                var frac = fraction(ts, 0, 'milliseconds', 'seconds', MILLISECONDS_PER_SECOND, digits);
                if (!frac) {
                    return;
                }

                frac = fraction(ts, frac, 'seconds', 'minutes', SECONDS_PER_MINUTE, digits);
                if (!frac) {
                    return;
                }

                frac = fraction(ts, frac, 'minutes', 'hours', MINUTES_PER_HOUR, digits);
                if (!frac) {
                    return;
                }

                frac = fraction(ts, frac, 'hours', 'days', HOURS_PER_DAY, digits);
                if (!frac) {
                    return;
                }

                frac = fraction(ts, frac, 'days', 'weeks', DAYS_PER_WEEK, digits);
                if (!frac) {
                    return;
                }

                frac = fraction(ts, frac, 'weeks', 'months', daysPerMonth(ts.refMonth) / DAYS_PER_WEEK, digits);
                if (!frac) {
                    return;
                }

                frac = fraction(ts, frac, 'months', 'years', daysPerYear(ts.refMonth) / daysPerMonth(ts.refMonth), digits);
                if (!frac) {
                    return;
                }

                frac = fraction(ts, frac, 'years', 'decades', YEARS_PER_DECADE, digits);
                if (!frac) {
                    return;
                }

                frac = fraction(ts, frac, 'decades', 'centuries', DECADES_PER_CENTURY, digits);
                if (!frac) {
                    return;
                }

                frac = fraction(ts, frac, 'centuries', 'millennia', CENTURIES_PER_MILLENNIUM, digits);
                // should never reach this with remaining fractional value
                if (frac) {
                    throw new Error('Fractional unit overflow');
                }
            }

            /**
         * Borrow any underflow units, carry any overflow units
         * 
         * @private
         * @param {Timespan} ts
         */
            function ripple(ts) {
                var x;

                if (ts.milliseconds < 0) {
                    // ripple seconds down to milliseconds
                    x = ceil(-ts.milliseconds / MILLISECONDS_PER_SECOND);
                    ts.seconds -= x;
                    ts.milliseconds += x * MILLISECONDS_PER_SECOND;

                } else if (ts.milliseconds >= MILLISECONDS_PER_SECOND) {
                    // ripple milliseconds up to seconds
                    ts.seconds += floor(ts.milliseconds / MILLISECONDS_PER_SECOND);
                    ts.milliseconds %= MILLISECONDS_PER_SECOND;
                }

                if (ts.seconds < 0) {
                    // ripple minutes down to seconds
                    x = ceil(-ts.seconds / SECONDS_PER_MINUTE);
                    ts.minutes -= x;
                    ts.seconds += x * SECONDS_PER_MINUTE;
                } else if (ts.seconds >= SECONDS_PER_MINUTE) {
                    // ripple seconds up to minutes
                    ts.minutes += floor(ts.seconds / SECONDS_PER_MINUTE);
                    ts.seconds %= SECONDS_PER_MINUTE;
                }

                if (ts.minutes < 0) {
                    // ripple hours down to minutes
                    x = ceil(-ts.minutes / MINUTES_PER_HOUR);
                    ts.hours -= x;
                    ts.minutes += x * MINUTES_PER_HOUR;

                } else if (ts.minutes >= MINUTES_PER_HOUR) {
                    // ripple minutes up to hours
                    ts.hours += floor(ts.minutes / MINUTES_PER_HOUR);
                    ts.minutes %= MINUTES_PER_HOUR;
                }

                if (ts.hours < 0) {
                    // ripple days down to hours
                    x = ceil(-ts.hours / HOURS_PER_DAY);
                    ts.days -= x;
                    ts.hours += x * HOURS_PER_DAY;

                } else if (ts.hours >= HOURS_PER_DAY) {
                    // ripple hours up to days
                    ts.days += floor(ts.hours / HOURS_PER_DAY);
                    ts.hours %= HOURS_PER_DAY;
                }

                while (ts.days < 0) {
                    // NOTE: never actually seen this loop more than once

                    // ripple months down to days
                    ts.months--;
                    ts.days += borrowMonths(ts.refMonth, 1);
                }

                // weeks is always zero here

                if (ts.days >= DAYS_PER_WEEK) {
                    // ripple days up to weeks
                    ts.weeks += floor(ts.days / DAYS_PER_WEEK);
                    ts.days %= DAYS_PER_WEEK;
                }

                if (ts.months < 0) {
                    // ripple years down to months
                    x = ceil(-ts.months / MONTHS_PER_YEAR);
                    ts.years -= x;
                    ts.months += x * MONTHS_PER_YEAR;

                } else if (ts.months >= MONTHS_PER_YEAR) {
                    // ripple months up to years
                    ts.years += floor(ts.months / MONTHS_PER_YEAR);
                    ts.months %= MONTHS_PER_YEAR;
                }

                // years is always non-negative here
                // decades, centuries and millennia are always zero here

                if (ts.years >= YEARS_PER_DECADE) {
                    // ripple years up to decades
                    ts.decades += floor(ts.years / YEARS_PER_DECADE);
                    ts.years %= YEARS_PER_DECADE;

                    if (ts.decades >= DECADES_PER_CENTURY) {
                        // ripple decades up to centuries
                        ts.centuries += floor(ts.decades / DECADES_PER_CENTURY);
                        ts.decades %= DECADES_PER_CENTURY;

                        if (ts.centuries >= CENTURIES_PER_MILLENNIUM) {
                            // ripple centuries up to millennia
                            ts.millennia += floor(ts.centuries / CENTURIES_PER_MILLENNIUM);
                            ts.centuries %= CENTURIES_PER_MILLENNIUM;
                        }
                    }
                }
            }

            /**
         * Remove any units not requested
         * 
         * @private
         * @param {Timespan} ts
         * @param {number} units the units to populate
         * @param {number} max number of labels to output
         * @param {number} digits max number of decimal digits to output
         */
            function pruneUnits(ts, units, max, digits) {
                var count = 0;

                // Calc from largest unit to smallest to prevent underflow
                if (!(units & MILLENNIA) || (count >= max)) {
                    // ripple millennia down to centuries
                    ts.centuries += ts.millennia * CENTURIES_PER_MILLENNIUM;
                    delete ts.millennia;

                } else if (ts.millennia) {
                    count++;
                }

                if (!(units & CENTURIES) || (count >= max)) {
                    // ripple centuries down to decades
                    ts.decades += ts.centuries * DECADES_PER_CENTURY;
                    delete ts.centuries;

                } else if (ts.centuries) {
                    count++;
                }

                if (!(units & DECADES) || (count >= max)) {
                    // ripple decades down to years
                    ts.years += ts.decades * YEARS_PER_DECADE;
                    delete ts.decades;

                } else if (ts.decades) {
                    count++;
                }

                if (!(units & YEARS) || (count >= max)) {
                    // ripple years down to months
                    ts.months += ts.years * MONTHS_PER_YEAR;
                    delete ts.years;

                } else if (ts.years) {
                    count++;
                }

                if (!(units & MONTHS) || (count >= max)) {
                    // ripple months down to days
                    if (ts.months) {
                        ts.days += borrowMonths(ts.refMonth, ts.months);
                    }
                    delete ts.months;

                    if (ts.days >= DAYS_PER_WEEK) {
                        // ripple day overflow back up to weeks
                        ts.weeks += floor(ts.days / DAYS_PER_WEEK);
                        ts.days %= DAYS_PER_WEEK;
                    }

                } else if (ts.months) {
                    count++;
                }

                if (!(units & WEEKS) || (count >= max)) {
                    // ripple weeks down to days
                    ts.days += ts.weeks * DAYS_PER_WEEK;
                    delete ts.weeks;

                } else if (ts.weeks) {
                    count++;
                }

                if (!(units & DAYS) || (count >= max)) {
                    //ripple days down to hours
                    ts.hours += ts.days * HOURS_PER_DAY;
                    delete ts.days;

                } else if (ts.days) {
                    count++;
                }

                if (!(units & HOURS) || (count >= max)) {
                    // ripple hours down to minutes
                    ts.minutes += ts.hours * MINUTES_PER_HOUR;
                    delete ts.hours;

                } else if (ts.hours) {
                    count++;
                }

                if (!(units & MINUTES) || (count >= max)) {
                    // ripple minutes down to seconds
                    ts.seconds += ts.minutes * SECONDS_PER_MINUTE;
                    delete ts.minutes;

                } else if (ts.minutes) {
                    count++;
                }

                if (!(units & SECONDS) || (count >= max)) {
                    // ripple seconds down to milliseconds
                    ts.milliseconds += ts.seconds * MILLISECONDS_PER_SECOND;
                    delete ts.seconds;

                } else if (ts.seconds) {
                    count++;
                }

                // nothing to ripple milliseconds down to
                // so ripple back up to smallest existing unit as a fractional value
                if (!(units & MILLISECONDS) || (count >= max)) {
                    fractional(ts, digits);
                }
            }

            /**
         * Populates the Timespan object
         * 
         * @private
         * @param {Timespan} ts
         * @param {?Date} start the starting date
         * @param {?Date} end the ending date
         * @param {number} units the units to populate
         * @param {number} max number of labels to output
         * @param {number} digits max number of decimal digits to output
         */
            function populate(ts, start, end, units, max, digits) {
                var now = new Date();

                ts.start = start = start || now;
                ts.end = end = end || now;
                ts.units = units;

                ts.value = end.getTime() - start.getTime();
                if (ts.value < 0) {
                    // swap if reversed
                    var tmp = end;
                    end = start;
                    start = tmp;
                }

                // reference month for determining days in month
                ts.refMonth = new Date(start.getFullYear(), start.getMonth(), 15, 12, 0, 0);
                try {
                    // reset to initial deltas
                    ts.millennia = 0;
                    ts.centuries = 0;
                    ts.decades = 0;
                    ts.years = end.getFullYear() - start.getFullYear();
                    ts.months = end.getMonth() - start.getMonth();
                    ts.weeks = 0;
                    ts.days = end.getDate() - start.getDate();
                    ts.hours = end.getHours() - start.getHours();
                    ts.minutes = end.getMinutes() - start.getMinutes();
                    ts.seconds = end.getSeconds() - start.getSeconds();
                    ts.milliseconds = end.getMilliseconds() - start.getMilliseconds();

                    ripple(ts);
                    pruneUnits(ts, units, max, digits);

                } finally {
                    delete ts.refMonth;
                }

                return ts;
            }

            /**
         * Determine an appropriate refresh rate based upon units
         * 
         * @private
         * @param {number} units the units to populate
         * @return {number} milliseconds to delay
         */
            function getDelay(units) {
                if (units & MILLISECONDS) {
                    // refresh very quickly
                    return MILLISECONDS_PER_SECOND / 30; //30Hz
                }

                if (units & SECONDS) {
                    // refresh every second
                    return MILLISECONDS_PER_SECOND; //1Hz
                }

                if (units & MINUTES) {
                    // refresh every minute
                    return MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
                }

                if (units & HOURS) {
                    // refresh hourly
                    return MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
                }

                if (units & DAYS) {
                    // refresh daily
                    return MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY;
                }

                // refresh the rest weekly
                return MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_WEEK;
            }

            /**
         * API entry point
         * 
         * @public
         * @param {Date|number|Timespan|null|function(Timespan,number)} start the starting date
         * @param {Date|number|Timespan|null|function(Timespan,number)} end the ending date
         * @param {number=} units the units to populate
         * @param {number=} max number of labels to output
         * @param {number=} digits max number of decimal digits to output
         * @return {Timespan|number}
         */
            function countdown(start, end, units, max, digits) {
                var callback;

                // ensure some units or use defaults
                units = +units || DEFAULTS;
                // max must be positive
                max = (max > 0) ? max : NaN;
                // clamp digits to an integer between [0, 20]
                digits = (digits > 0) ? (digits < 20) ? Math.round(digits) : 20 : 0;

                // ensure start date
                var startTS = null;
                if ('function' === typeof start) {
                    callback = start;
                    start = null;

                } else if (!(start instanceof Date)) {
                    if ((start !== null) && isFinite(start)) {
                        start = new Date(+start);
                    } else {
                        if ('object' === typeof startTS) {
                            startTS = /** @type{Timespan} */ (start);
                        }
                        start = null;
                    }
                }

                // ensure end date
                var endTS = null;
                if ('function' === typeof end) {
                    callback = end;
                    end = null;

                } else if (!(end instanceof Date)) {
                    if ((end !== null) && isFinite(end)) {
                        end = new Date(+end);
                    } else {
                        if ('object' === typeof end) {
                            endTS = /** @type{Timespan} */ (end);
                        }
                        end = null;
                    }
                }

                // must wait to interpret timespans until after resolving dates
                if (startTS) {
                    start = addToDate(startTS, end);
                }
                if (endTS) {
                    end = addToDate(endTS, start);
                }

                if (!start && !end) {
                    // used for unit testing
                    return new Timespan();
                }

                if (!callback) {
                    return populate(new Timespan(), /** @type{Date} */ (start), /** @type{Date} */ (end), /** @type{number} */ (units), /** @type{number} */ (max), /** @type{number} */ (digits));
                }

                // base delay off units
                var delay = getDelay(units),
                    timerId,
                    fn = function() {
                        callback(
                            populate(new Timespan(), /** @type{Date} */ (start), /** @type{Date} */ (end), /** @type{number} */ (units), /** @type{number} */ (max), /** @type{number} */ (digits)),
                            timerId
                        );
                    };

                fn();
                return (timerId = setInterval(fn, delay));
            }

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.MILLISECONDS = MILLISECONDS;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.SECONDS = SECONDS;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.MINUTES = MINUTES;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.HOURS = HOURS;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.DAYS = DAYS;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.WEEKS = WEEKS;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.MONTHS = MONTHS;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.YEARS = YEARS;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.DECADES = DECADES;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.CENTURIES = CENTURIES;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.MILLENNIA = MILLENNIA;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.DEFAULTS = DEFAULTS;

            /**
         * @public
         * @const
         * @type {number}
         */
            countdown.ALL = MILLENNIA | CENTURIES | DECADES | YEARS | MONTHS | WEEKS | DAYS | HOURS | MINUTES | SECONDS | MILLISECONDS;

            /**
         * Override the unit labels
         * @public
         * @param {string|Array=} singular a pipe ('|') delimited list of singular unit name overrides
         * @param {string|Array=} plural a pipe ('|') delimited list of plural unit name overrides
         * @param {string=} last a delimiter before the last unit (default: ' and ')
         * @param {string=} delim a delimiter to use between all other units (default: ', ')
         * @param {string=} empty a label to use when all units are zero (default: '')
         * @param {function(number):string=} formatter a function which formats numbers as a string
         */
            countdown.setLabels = function(singular, plural, last, delim, empty, formatter) {
                singular = singular || [];
                if (singular.split) {
                    singular = singular.split('|');
                }
                plural = plural || [];
                if (plural.split) {
                    plural = plural.split('|');
                }

                for (var i = LABEL_MILLISECONDS; i <= LABEL_MILLENNIA; i++) {
                    // override any specified units
                    LABELS_SINGLUAR[i] = singular[i] || LABELS_SINGLUAR[i];
                    LABELS_PLURAL[i] = plural[i] || LABELS_PLURAL[i];
                }

                LABEL_LAST = ('string' === typeof last) ? last : LABEL_LAST;
                LABEL_DELIM = ('string' === typeof delim) ? delim : LABEL_DELIM;
                LABEL_NOW = ('string' === typeof empty) ? empty : LABEL_NOW;
                formatNumber = ('function' === typeof formatter) ? formatter : formatNumber;
            };

            /**
         * Revert to the default unit labels
         * @public
         */
            var resetLabels = countdown.resetLabels = function() {
                LABELS_SINGLUAR = ' millisecond| second| minute| hour| day| week| month| year| decade| century| millennium'.split('|');
                LABELS_PLURAL = ' milliseconds| seconds| minutes| hours| days| weeks| months| years| decades| centuries| millennia'.split('|');
                LABEL_LAST = ' and ';
                LABEL_DELIM = ', ';
                LABEL_NOW = '';
                formatNumber = function(value) {
                    return value;
                };
            };
            resetLabels();
            if (module && module.exports) {
                module.exports = countdown;

            } else if (typeof window.define === 'function' && typeof window.define.amd !== 'undefined') {
                window.define('countdown', [], function() {
                    return countdown;
                });
            }
            return countdown;
        })(module);







    //---[0]------  (1576) ------[END]---///









    var newDivChanneling = document.createElement("div");
    newDivChanneling.id = "divChannelingTHV";
    newDivChanneling.style.position = "absolute";


    newDivChanneling.style.border = "inset";
    newDivChanneling.style.borderColor = "#FFFFFF";//"#27FFC2";
    newDivChanneling.style.height = "160px";
    newDivChanneling.style.cursor = "move";


    //newDivChanneling.style.top = "50px";
    //newDivChanneling.style.width = "268px";
    //newDivChanneling.style.left = "1000px";

    if ((location.href + "").indexOf('g.e-hentai.org/g/') === -1) {

        // newDivChanneling.style.top = "53px";
        newDivChanneling.style.width = "130px";
        //  newDivChanneling.style.left = "1099px";


    } else {

        //  newDivChanneling.style.top = "173px";
        newDivChanneling.style.width = "119px";
        //  newDivChanneling.style.left = "959px";
    }


    newDivChanneling.style.background = "#F5F2F2";
    newDivChanneling.style.zIndex = "1001";

    var ttxt = document.createElement("INPUT");
    ttxt.id = "txtTimerID";
    ttxt.setAttribute("type", "text");
    ttxt.style.display = "none";

    newDivChanneling.appendChild(ttxt);

    document.body.appendChild(newDivChanneling);

    var newDivCountdown = document.createElement("div");
    newDivCountdown.id = "newDivCountdownID";

    //--- btn Run
    // var btnRun = document.createElement("BUTTON");
    var btnRun = document.createElement("IMG");
    btnRun.id = "btnRunId";
    btnRun.style.cursor = "pointer";
    btnRun.style.position = "absolute";
    btnRun.style.left = "46px";
    //btnRun.style.left = "120px";
    btnRun.style.top = "30px";
    btnRun.src = "data:image/png;base64,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";

    //  var btnStartTxtNode = document.createTextNode("Start");
    //  btnRun.appendChild(btnStartTxtNode);
    btnRun.addEventListener('click', function() {

        startCountdownA();

		if(audio) audio.pause();
		
        // btnRunId.disabled = true;
        // btnStopId.disabled = false;
        btnRun.style.display = "none";
        btnStop.style.display = "block";

    });

    btnRun.style.display = "block";

    //--- btn Stop
    //var btnStop = document.createElement("BUTTON");
    var btnStop = document.createElement("IMG");
    btnStop.id = "btnStopId";
    btnStop.style.cursor = "pointer";
    btnStop.style.position = "absolute";
    btnStop.style.left = "46px";
    //btnStop.style.left = "120px";
    btnStop.style.top = "30px";
    btnStop.src = "data:image/png;base64,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";
    //btnStop.disabled = true;

    // var btnStopTxtNode = document.createTextNode("Stop");
    //btnStop.appendChild(btnStopTxtNode);

    btnStop.addEventListener('click', function() {

        stopCountdownA();

		if(audio) audio.pause();

        // btnRunId.disabled = false;
        // btnStopId.disabled = true;
        btnRun.style.display = "block";
        btnStop.style.display = "none";

    });

    btnStop.style.display = "none";

    var newDivShowTimer = document.createElement("div");
    newDivShowTimer.id = "newDivShowTimerID";
    newDivShowTimer.style.height = "16px";
    newDivShowTimer.style.top = "4px";
    newDivShowTimer.style.left = "10px";
    newDivShowTimer.style.position = "absolute";
    newDivShowTimer.style.fontSize = "20px";
    newDivShowTimer.style.width = "100px";
    //newDivShowTimer.style.width = "260px";

    divChannelingTHV.appendChild(newDivCountdown);

    var eleBR = document.createElement("BR");
    var eleBR2 = document.createElement("BR");
    var eleBR3 = document.createElement("BR");

    divChannelingTHV.appendChild(newDivShowTimer);
    divChannelingTHV.appendChild(eleBR);
    divChannelingTHV.appendChild(eleBR2);
    divChannelingTHV.appendChild(eleBR3);
    divChannelingTHV.appendChild(btnRun);

    //var txtSpaceNode = document.createTextNode("   __  ");
    //divChannelingTHV.appendChild(txtSpaceNode);

    divChannelingTHV.appendChild(btnStop);

    //count figth
    var divFCount = document.createElement("DIV");
    divFCount.id = "divFCountId";
    //divFCount.style.cursor = "pointer";
    divFCount.style.position = "absolute";
    divFCount.style.left = "2px";
    //btnStop.style.left = "120px";
    divFCount.style.top = "44px";
    divFCount.style.fontSize = "15px";

    var tnFC = document.createTextNode(GM_getValue("countFight") + "/24");
    divFCount.appendChild(tnFC);
    divChannelingTHV.appendChild(divFCount);
    //show link battle
    var divLinkBattle = document.createElement("DIV");
    divLinkBattle.id = "divLinkBattleId";
    //divFCount.style.cursor = "pointer";
    divLinkBattle.style.position = "absolute";
    divLinkBattle.style.left = "25px";
    //btnStop.style.left = "120px";
    divLinkBattle.style.top = "74px";
    divLinkBattle.style.fontSize = "15px";

    var tnBBTL = document.createTextNode("Last Battle");

    var linkk = document.createElement("a");
    linkk.id = 'lastBtnIdx';
    linkk.href = GM_getValue("lastFightUrl");
    linkk.appendChild(tnBBTL);
    linkk.target = "_blank";
    linkk.style.display = 'none';

    var lbkk = document.createElement("label");
    lbkk.id = 'lbkkId';
    lbkk.appendChild(tnBBTL);
    lbkk.style.textDecoration = 'underline';
    lbkk.style.cursor = 'pointer';

    divLinkBattle.appendChild(lbkk);
    divLinkBattle.appendChild(linkk);

    divChannelingTHV.appendChild(divLinkBattle);

    //show last time battle
    var divTimeBattle = document.createElement("DIV");
    divTimeBattle.id = "divTimeBattleId";
    divTimeBattle.style.position = "absolute";
    divTimeBattle.style.left = "2px";
    divTimeBattle.style.top = "94px";
    divTimeBattle.style.fontSize = "15px";

    var tnBBTTB = document.createTextNode(GM_getValue("lastFightTime"));


    divTimeBattle.appendChild(tnBBTTB);


    divChannelingTHV.appendChild(divTimeBattle);

    //=== Zone set reload ===
    var divZone = document.createElement("DIV");
    divZone.style.position = "absolute";
    divZone.style.width = "120px";
    divZone.style.top = "110px";

    divZone.appendChild(document.createElement("HR"));

    /*
    var divAddHR = document.createElement("HR");
    divAddHR.style.position = "absolute";
    divAddHR.style.width = "120px";
    divAddHR.style.top = "110px";
    */

    var vInputTZ = document.createElement("INPUT");
    vInputTZ.id = 'vinputTZId';
    vInputTZ.value = '10';
    vInputTZ.style.width = '20px';
    vInputTZ.style.marginRight = '5px';

    vInputTZ.addEventListener('mouseover', function() {
        this.select();
    });

    


    //divZone.appendChild(document.createElement("BR"));

    var btnRL = document.createElement("BUTTON");
    btnRL.id = "btnRLId";
    btnRL.style.width = "40px";
    btnRL.style.cursor = "pointer";
    btnRL.style.paddingLeft = "0.8px";
    var btnRLTxtNode = document.createTextNode("[SET]");
    btnRL.appendChild(btnRLTxtNode);

    var TZRLIndex = -1;
    btnRL.addEventListener('click', function() {
        var vTimeRL = document.getElementById('vinputTZId').value;

        if(isNumber(vTimeRL)){

            if( TZRLIndex !== -1){
                clearTimeout(TZRLIndex);
            }

            TZRLIndex =  setTimeout(function() {
                window.location.href = window.location.href;
            }, (vTimeRL*60*1000));

            document.getElementById('vrllbId').textContent = 'Wait reload '+vTimeRL+' min.';
        }

    });


	//reload 30min zone
	var divRL = document.createElement("DIV");
    divRL.id = "div30RLId";
    divRL.style.width = "30px";
	divRL.style.backgroundColor = "#a6ffc5";
    divRL.style.cursor = "pointer";
    divRL.style.paddingLeft = "0.8px";
	divRL.textContent = "LOOP";

    divRL.addEventListener('click', function() {
		
		if(this.textContent === "LOOP"){
			var vITVId =  setInterval(function() {
                var gull = document.getElementById('lastBtnIdx').href+'';
                window.open(gull,'_blank');
            }, (15*60*1000));

			this.textContent = vITVId;
		}else{
			var vLoopID = this.textContent*1;
			this.textContent = "LOOP";

			clearInterval(vLoopID);
		}

    });


	//divZone.appendChild(vInputTZ);
	//divZone.appendChild(btnRL);
    //divZone.appendChild(divRL);

	var vZZTable = document.createElement("TABLE");
	var vZZTR = document.createElement("TR");

	var vZZTD1 = document.createElement("TD");
	var vZZTD2 = document.createElement("TD");
	var vZZTD3 = document.createElement("TD");


	vZZTD1.appendChild(vInputTZ);
	vZZTD2.appendChild(btnRL);

	vZZTD3.appendChild(divRL);
	vZZTD3.style.paddingLeft = "10px";

	vZZTR.appendChild(vZZTD1);
	vZZTR.appendChild(vZZTD2);
	vZZTR.appendChild(vZZTD3);

	vZZTable.appendChild(vZZTR);

	divZone.appendChild(vZZTable);



    var vRLLB = document.createElement("label");
    vRLLB.id = 'vrllbId';
    vRLLB.style.fontWeight = 'bold';
    vRLLB.appendChild(document.createTextNode('Wait reload ? min.'));

    //divZone.appendChild(document.createElement("BR"));
    divZone.appendChild(vRLLB);

    divChannelingTHV.appendChild(divZone);

    //chkeckbox auto fight
    var cbFFx = document.createElement("INPUT");
    cbFFx.id = 'cbauf';
    cbFFx.setAttribute("type", "checkbox");
    cbFFx.style.position = "absolute";
    cbFFx.style.left = "97px";
    cbFFx.style.top = "9px";

    divChannelingTHV.appendChild(cbFFx);

    document.getElementById('cbauf').addEventListener('change', function() {
        GM_setValue("goAutoFight", this.checked); 
    });

    document.getElementById('cbauf').checked = GM_getValue("goAutoFight");

    //--- btn increase
    var btnIncrease = document.createElement("BUTTON");
    btnIncrease.id = "btnIncreaseId";

    btnIncrease.style.position = "absolute";
    btnIncrease.style.left = "100px";
    //btnStop.style.left = "120px";
    btnIncrease.style.top = "34px";
    btnIncrease.style.width = "14px";
    btnIncrease.style.cursor = "pointer";
    btnIncrease.style.paddingLeft = "0.8px";

    btnIncrease.addEventListener('click', function() {

        if (confirm("Increase times to fight!")) {

            var cFightIC = GM_getValue("countFight");

            if (cFightIC >= 24) {
                // alert('Max of a day. 24/24');
                GM_setValue("countFight", 0);
                divFCountId.innerHTML = GM_getValue("countFight") + "/24";
            } else {
                GM_setValue("countFight", (cFightIC + 1));
                divFCountId.innerHTML = GM_getValue("countFight") + "/24";
            }

        }

    });


    var btnIncreaseTxtNode = document.createTextNode("+");
    btnIncrease.appendChild(btnIncreaseTxtNode);


    divChannelingTHV.appendChild(btnIncrease);

    var timerId;

    keepTime = GM_getValue("keepTime");
    //console.log('gxxxxg = '+keepTime);

    var mmkx = -6;

    function parseDate(input) {
        var parts = input.split('-');
        //Date(year, month, day, hours, minutes, seconds, milliseconds)
        // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
        //console.log( parseInt(parts[0])+' _ '+( parseInt(parts[1])-1 )+' _ '+ parseInt(parts[2])+' _ '+  parseInt(parts[3])+' _ '+  parseInt(parts[4])  );

        return new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]), parseInt(parts[3]), parseInt(parts[4]),0,0); // Note: months are 0-based
    }

    function getNextMins(){

        var vLastFightTime = GM_getValue("lastFightTime");
        console.log('=== '+vLastFightTime);

        //08/07/2015  14:27
        //Fri Nov 28 2014 10:19:52 GMT+0100 (CET)
        vLastFightTime = vLastFightTime.replace('  ','/').replace(':','/');
        var gg1 = vLastFightTime.split('/');
        //console.log(gg1);
        var godDateTime = "";
        var dateTimeX = new Date();
        var lastMinFight = 0;
        var nextMin = -2;

        if(gg1.length === 5){

            godDateTime = gg1[2]+'-'+gg1[1]+'-'+gg1[0]+'-'+gg1[3]+'-'+gg1[4];

            dateTimeX = parseDate(godDateTime);
            lastMinFight  = dateTimeX.getMinutes();

            var newDateObj = new Date(parseInt(dateTimeX.getTime()) + parseInt(vMinTime*60000));
            //console.log(' newDateObj = '+newDateObj.getMinutes());
            var dNewDate = new Date();

            if( dNewDate.getTime() < newDateObj.getTime()){

                var diffDate = new Date(parseInt( newDateObj.getTime() - dNewDate.getTime() ));
                //console.log(' diffDate = '+diffDate);
                //console.log(' diffDate.min = '+diffDate.getMinutes());

                nextMin = diffDate.getMinutes();
                //lastMinFight = gg1[4];

            }

        }

        //console.log('nextMin = '+nextMin);

        return nextMin;
    }

    var isCreateBeep = true;
    var snd;
    if(isBeepActive){
        snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    }
    var idGodX = 0;
    function startCountdownA() {

        GM_setValue("chkBeep", true);
        GM_setValue("addCF", true);
        GM_setValue("alertNowXG", true);

        GM_setValue("chkLinkFromReload", false);
        GM_setValue("countReload", 0);
        GM_setValue("urlLinkFromReload", "");

        if(document.getElementById('divElvID')){
            var eddl = document.getElementById('divElvID');
            eddl.parentNode.removeChild(eddl); 
            console.log('remove #1');
            clearInterval(idGodX);
            isCreateBeep = true;
        }

        if(openConfirmReload){
            mmkx = -12;
        }else{
            mmkx = -60;
        }


        // console.log(keepTime);
        //console.log('--> '+ new Date());
        var GGtime = 0;
        GGtime = vMinTime;
        divFCountId.innerHTML = GM_getValue("countFight") + "/24";
        var nextMin = parseInt(getNextMins())+2;
        if(nextMin >= 1 && nextMin < vMinTime){
            //if(nextMin === 29){
            //     nextMin = 30;
            //}
            GGtime = nextMin;
        }

        var newDateStart = new Date();
        //var newDateEnd = new Date(newDateStart.getTime() + 0.05 * 60000);
        var newDateEnd = new Date(newDateStart.getTime() + GGtime * 60000);

        //GM_setValue("keepTime", new Date()); 
        if (keepTime) {
            // console.log('A = '+keepTime);
            newDateEnd = new Date(keepTime);
        } else {
            // console.log('B = '+newDateEnd.getTime());
            GM_setValue("keepTime", newDateEnd.getTime());
        }

        var kk_sec = 60;
        //        var idGodX = 0;

        timerId = countdown(
            newDateEnd,
            function(ts) {

                var resultTxt = ts.toHTML("strong");
                var strMin = "";
                var strSec = "";


                if (resultTxt.indexOf('and') !== -1) {
                    strMin = resultTxt.substring(8, resultTxt.indexOf('min')).trim();
                    strSec = resultTxt.substring(resultTxt.indexOf('and') + 12, resultTxt.indexOf('sec')).trim();

                } else if (resultTxt.indexOf('sec') === -1) {
                    strMin = resultTxt.substring(8, resultTxt.indexOf('min')).trim();
                } else if (resultTxt.indexOf('min') === -1) {
                    strSec = resultTxt.substring(8, resultTxt.indexOf('sec')).trim()
                }

                if (strMin === "") {
                    strMin = "00";
                }

                if (strSec === "") {
                    strSec = "00";
                }

                if (strMin.length === 1) {
                    strMin = "0" + strMin;
                }

                if (strSec.length === 1) {
                    strSec = "0" + strSec;
                }

                var endNow = false;

                if (strMin === "00" && strSec === "00") {
                    endNow = true;
                }
                //  console.log(kk_min);
                if (strMin === "00") {

                    //console.log(kk_sec);
                    //console.log('B'+strMin);
                    if (kk_sec > parseInt(strSec)) {
                        //console.log('C'+strSec);
                        kk_sec = parseInt(strSec);
                    } else {
                        //console.log('D'+strSec);
                        endNow = true;
                    }

                }

                //console.log(strMin+":"+strSec);
                document.getElementById('newDivShowTimerID').innerHTML = "<strong>" + strMin + ":" + strSec + "</strong>";
                document.title = 'EH '+strMin+':'+strSec+' ('+(GM_getValue("goAutoFight")?'AUTO':'-')+')';
                //document.getElementById('newDivShowTimerID').innerHTML = ts.toHTML("strong");

                //if("<strong>1 second</strong>" === document.getElementById('newDivShowTimerID').innerHTML){
                //if("<strong>00:00</strong>" === document.getElementById('newDivShowTimerID').innerHTML){

                if (endNow) {

                    var cFight = GM_getValue("countFight");
                    if (GM_getValue("countFight") < 24) {
                        if(GM_getValue("addCF")){
                            //GM_setValue("countFight", (cFight + 1));
                            GM_setValue("addCF", false);
                        }

                    }
                    stopCountdownA();
                    document.getElementById('newDivShowTimerID').innerHTML = "<strong> End </strong>";

                    // btnRunId.disabled = false;
                    //  btnStopId.disabled = true;

                    btnRun.style.display = "block";
                    btnStop.style.display = "none";

                    if (enableAlertFinish) {

                        var dx = new Date();
                        var hrx = dx.getHours();
                        var mnx = dx.getMinutes();

                        if ((hrx + "").length === 1) {
                            hrx = "0" + hrx;
                        }

                        if ((mnx + "").length === 1) {
                            mnx = "0" + mnx;
                        }

                        //console.log((hrx+"").length);
                        //console.log(mnx);

                        //alert('End Timer  --> ' + hrx + ':' + mnx);
                        //var ddTime = new Date();
                        if(enableNewTabBeep && !GM_getValue("goAutoFight")){
                            //playAudio();
                            openNewTabNotification();
                        }

                        idGodX  = setInterval(function(){

                            if(GM_getValue("chkBeep") && vOpenSound && !GM_getValue("goAutoFight") ){

                                if(isBeepActive){
                                    snd.play();
                                }else{

                                    if(isCreateBeep){
                                        isCreateBeep = false;

                                        var divElv = document.createElement("div");
                                        divElv.id = 'divElvID';
                                        divElv.style.display = 'none';

                                        document.body.appendChild(divElv);

                                        document.getElementById('divElvID').innerHTML = '<video controls="controls" autoplay="" loop=""> <source src="https://drive.google.com/uc?export=download&amp;id=0B56AHXc3KN80U3dPRTVBTTRzQ00" type="video/mp4"> </video>';
                                    }
                                }

                            }

                            if(mmkx === 0 || GM_getValue("goAutoFight")){
                                GM_setValue("chkBeep", false);
                                //alert('vAlert');

                                var alertNowXG = GM_getValue("alertNowXG");
                                GM_setValue("alertNowXG", false);

                                if( alertNowXG || GM_getValue("goAutoFight")){

                                    var resultRLPage = true;

                                    if(enableConfReload || !GM_getValue("goAutoFight")){
                                        if(openConfirmReload){
                                            resultRLPage = confirm('Reload page or not.');
                                        }else{
                                            playAudio();
                                            resultRLPage = false;
                                        }

                                    }

                                    if(resultRLPage){
                                        clearInterval(document.getElementById('hidxtimer1').value);
                                        GM_setValue("chkLinkFromReload", true);
                                        GM_setValue("urlLinkFromReload", window.location.href);
                                        window.location.href = window.location.href;
                                    }else{
                                        if(!isCreateBeep){
                                            var eddl = document.getElementById('divElvID');
                                            eddl.parentNode.removeChild(eddl);
                                            console.log('remove #2');
                                        }

                                        clearInterval(document.getElementById('hidxtimer1').value);
                                    }

                                }else{

                                    if(!isCreateBeep){
                                        var eddl = document.getElementById('divElvID');
                                        eddl.parentNode.removeChild(eddl);
                                        console.log('remove #3');
                                    }

                                    clearInterval(document.getElementById('hidxtimer1').value);

                                }



                            }
                            mmkx++;


                        }, 700);




                        if(document.getElementById('hidxtimer1')){
                            document.getElementById('hidxtimer1').value = ""+idGodX;
                        }


                        setTimeout(function(){
                            clearInterval(idGodX);
                        },70000);


                    }

                    divFCountId.innerHTML = GM_getValue("countFight") + "/24";

                }

                //console.log('x');
            },
            countdown.HOURS | countdown.MINUTES | countdown.SECONDS);




        var timerIdKeep1 = GM_getValue("timerIdKeep");
        if(timerIdKeep1 === 0){
            GM_setValue("timerIdKeep", timerId);
        }else{
            GM_setValue("timerIdKeep2", timerId);
        }

        //console.log('Start'+timerId);

        document.getElementById('txtTimerID').value = timerId;



    }

    function stopCountdownA() {
        //console.log('stop'+timerId);
        
        document.title = (document.title+'').replace('EH','[ STOP ]');

        var timerIdKeepX = GM_getValue("timerIdKeep");

        window.clearInterval(timerIdKeepX);

        GM_setValue("timerIdKeep", 0);

        var timerIdKeepX2 = GM_getValue("timerIdKeep2");

        window.clearInterval(timerIdKeepX2);

        GM_setValue("timerIdKeep2", 0);


        keepTime = null;
        GM_setValue("keepTime", null);
    }


    if(keepTime) {
        //console.log('gxxx2xg');
        var newDx = new Date();
        var newDxKeep = new Date(keepTime);

        if (newDx.getTime() > newDxKeep.getTime()) {

            document.getElementById('newDivShowTimerID').innerHTML = "<strong> End </strong>";


            var hrxk = newDxKeep.getHours();
            var mnxk = newDxKeep.getMinutes();

            if ((hrxk + "").length === 1) {
                hrxk = "0" + hrxk;
            }

            if ((mnxk + "").length === 1) {
                mnxk = "0" + mnxk;
            }

            alert('End Timer  --> ' + hrxk + ':' + mnxk);

            var cFight = GM_getValue("countFight");
            //GM_setValue("countFight", (cFight+1) );

            if (cFight >= 24) {
                //  alert('Max of a day. 24/24');
                divFCountId.innerHTML = GM_getValue("countFight") + "/24";
            } else {
                if (GM_getValue("countFight") < 24) {
                    // GM_setValue("countFight", (cFight + 1));
                }
                divFCountId.innerHTML = GM_getValue("countFight") + "/24";

            }

            stopCountdownA();

            btnRun.style.display = "block";
            btnStop.style.display = "none";

        } else {

            startCountdownA();

            btnRun.style.display = "none";
            btnStop.style.display = "block";

        }

    }

    //disable btn
    var cFightICDS = GM_getValue("countFight");

    // if (cFightICDS >= 24) {
    //     btnIncreaseId.disabled = true;
    // }


    //jQuery

    var load, execute, loadAndExecute;
    load = function(a, b, c) {
        var d;
        d = document.createElement("script"), d.setAttribute("src", a), b != null && d.addEventListener("load", b), c != null && d.addEventListener("error", c), document.body.appendChild(d);
        return d
    }, execute = function(a) {
        var b, c;
        typeof a == "function" ? b = "(" + a + ")();" : b = a, c = document.createElement("script"), c.textContent = b, document.body.appendChild(c);
        return c
    }, loadAndExecute = function(a, b) {
        return load(a, function() {
            return execute(b)
        })
    };

    //loadAndExecute("//code.jquery.com/jquery-1.10.2.js", function() {
    loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", function() {
        //$("#answer-6834930").css("border", ".5em solid black");
        //console.log('asdad')
        //$( '#divChannelingTHV' ).draggable();

        var load, execute, loadAndExecute;
        load = function(a, b, c) {
            var d;
            d = document.createElement("script"), d.setAttribute("src", a), b != null && d.addEventListener("load", b), c != null && d.addEventListener("error", c), document.body.appendChild(d);
            return d
        }, execute = function(a) {
            var b, c;
            typeof a == "function" ? b = "(" + a + ")();" : b = a, c = document.createElement("script"), c.textContent = b, document.body.appendChild(c);
            return c
        }, loadAndExecute = function(a, b) {
            return load(a, function() {
                return execute(b)
            })
        };


        // loadAndExecute("//code.jquery.com/ui/1.11.4/jquery-ui.js", function() {
        loadAndExecute("//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js", function() {
            //$("#answer-6834930").css("border", ".5em solid black");
            //console.log('asdad')
            $('#divChannelingTHV').draggable();
            resizeTimmer();
            //console.log($('#gdc'));

            //console.log($('#divChannelingTHV').position().left);
            //console.log($('#divChannelingTHV').position().top);

            //console.log( $( document ).width());
            // console.log( $( document ).height());

            function resizeTimmer(){

                var vH=50,vW=50;

                vH = $( document ).height();
                vW = $( document ).width();

                if ((location.href + "").indexOf('g.e-hentai.org/g/') === -1) {

                    vH = ( (14/100)*vH );
                    vW = ( (70/100)*vW );

                    //  console.log('vH = '+vH);
                    //    console.log('vH = '+vW);

                    $( '#divChannelingTHV' ).css( "left", vW );
                    $( '#divChannelingTHV' ).css( "top", vH );
                }else{
                    var whh = 70;
                    if($( window ).width() < 950 ){
                        whh = 50;
                    }

                    vH = ( (15/100)*vH );
                    vW = ( (whh/100)*vW );

                    //   console.log('vH = '+vH);
                    //      console.log('vH = '+vW);

                    $( '#divChannelingTHV' ).css( "left", vW );
                    $( '#divChannelingTHV' ).css( "top", vH);
                }


            }


            $(window).resize(function() {

                resizeTimmer();

            }); 



        });

        //console.log($('#gdc'));
    });



    if(vHaveFigth){
        divChannelingTHV.style.top = "244px";
    }


    console.log(GM_getValue("lastFightUrl"));
    console.log(GM_getValue("lastFightTime"));



    if(startWhenFoundLink){
        var ggCF = GM_getValue("countFight");
        if(parseInt(ggCF) <= 24){
            document.getElementById('btnStopId').click();
            document.getElementById('btnRunId').click();

            if(goAutoFight){
                var gurlx1 = document.getElementById('lastBtnIdx').href+'';
                window.open(gurlx1,'_blank');
                if(document.getElementById('eventpane')){
                    document.getElementById('eventpane').style.display = 'none';
                }
            }

            /*
            if(document.getElementById('eventpane')){
                document.getElementById('eventpane').style.display = 'none';
            }

            if(document.getElementById('divLinkBattleId')){
                if(document.getElementById('divLinkBattleId').querySelector('a')){
                    document.getElementById('divLinkBattleId').querySelector('a').click();
                }
            }
            */
        }
    }



    document.getElementById('lbkkId').addEventListener('click', function() { 

        if(document.getElementById('eventpane')){
            document.getElementById('eventpane').style.display = 'none';
        }

        var gurlx2 = document.getElementById('lastBtnIdx').href+'';
        window.open(gurlx2,'_blank');
        //window.open(this.href,'_blank');
    }); 


}


//---[1576]------  (END) ---------///
