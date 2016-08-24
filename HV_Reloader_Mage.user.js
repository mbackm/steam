// ==UserScript==
// @name        HV Reloader Mage
// @namespace   HVRLD3
// @author      nihilvoid, Dan31, FabulousCupcake, ??
// @run-at      document-end
// @include     /^https?:\/\/(alt|www)?\.?hentaiverse\.org.*$/
// @version     1.3.3.38
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
// BOT						: ?? bAttack(t)

/* ======================================== *\
 * ============= CONFIGURATION ============ *
\* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
var settings = {
	godAuto: true,				// God Mode
	showUsePotion: true,		// Show use potion
	spellControl: true,			// Spell Control - use Scroll or normal buff
	showStopStartButton: true,	// Show Stop Start button
	showBarListBattleItems: true,	// Show list battle items
	enableCheckPony: true,		// enable check alert pony
	enableOfflineSong: true,	// enable offline song
	enablePopupAlert: true,		// enable popup alert
	enableGFslowGEM: true,		// enable Grindfest use GEM slow
    hideWelcome: true,          // Hide the "Welcome to the Hentaiverse" image/logo
    noBlinking: true,           // Disable buff/debuff blinking
    effectDurations: true,      // Show buff/debuff durations
    gemIcon: true,              // Show gem/powerup, click on icon to use
    roundCounter: true,         // Show current round and rounds remaining
    hvStateHP: false,            // Show enemy HP value
    fluidHPBar: false,           // Shorten HP Bar width to easily see which monster has the most HP

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
    counterPlusSave: false       // Store additional datas for Income Summary by Superlatanium
};

var currentSong = '';

if(settings.enableOfflineSong && localStorage.getItem('songPath')){
	currentSong = localStorage.getItem('songPath');
}

if(!localStorage.getItem('songPath')){
    localStorage.setItem("songPath","data:audio/mp3;base64,//uwYAAAB7EAPCAAAAAAAAlwAAABATAJGIewACAAACXAAAAEJBIAAAMBaJgB//vq//xv////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////tAAAAAII2AcrSPplV+cWd0J/x6Y5FCJ1CFvoKIubNMV3oJ9L4nkH1f//8v3o/sv12FGM0brRrcojUv/0//V/6f//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAO1ATHQeMIkAAACXAAAAEObLUbDAxrSAAAJcAAAAT///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////pqZX/ygjdxZVNrO698f7Vt7AlFmW5Mdc6ZnrDP/m5o//e5Fd9XOLUQy/P+TnCRLFGnZov/rUv07bG5zjqRjfIZAQ4XjgCI+ekZUgcfRUy++3DBf2/kPGOD8+QUL3/X//mC7Tvtfys3+n/Xzr/53/d3mO2wn6an/z6kWfCRScWfdf9i+N7KZwvcgNaByCJMlgvfWzylXXhmxr9f98/dnf7j9oh7rOTyHNS41T3646EHhu7HEynETcm7kudRdye3dnnnXSkTknGJ48aICk3H8izG3IE1JkRY7mPQ6mu+d8yH5ND6XOmND9rTJ6N6To02Hc3IPdRT3vyb05ooGrCnfG/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAA1IbEbDRhtyAAAJcAAAARSZoR2MDM2IAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8pxtJJVVVRjMt4xljTt3lF2Pz1JXiPzeIMWwioNBKu8VAQk1dGECBYYSaI5BmD9BBw5/8KtB5k4xVRb3Vtq2asl5zJi/eq+RaGshCbYekogV25u0Te1t5Pzx8wnlxHs7nvkSZsU5zXjHsavYILrDukzk6PZGlX20snE7uvGW3zHYHtPUIPPhFxwt+h2GcxP7Pk3tpCnc3jCEZIQuczeR2NtNTJJZwbZlv/Fky8CofSSxdJ9oeN6jei/P+NhQNp1p/5JsG3lBSTvis06o4zFBLbaalLabXSzMk+ffsOnKDEbi6hG8s41Odw9BF9RLIYMqSlC1zZlmqzaZpbYMgoqKgej2LMhAtIinROyDWlq4CgyCOdMj9gRKZMaVmmI19xCCitRj/E4Mt/RxuJoOXBya0apZ9ymhRFKslru2xk7SN27yX/RxsS+PHv/JbIe77Gvtyc2tJUOyU2fCPtvNYu3TX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcADB6PRkMJM3IAAAlwAAABGUY5HYylLcgAACXAAAAE///////////////////////////////////////////////////////////////////////8iSNJNVVVRqTAdgOZZ4NKuiIwVhk5HwpZR9ib79ZlzRhckEGWkuSpJuxvtSZjkplkb1EsTMGStzVZRssUvc9N84iPTWhJQ82jWko+r2a2tOLvbnrbZiKF38MyU1C/UZKVBM7dTkh2NnZrKTmhQP8NCMBxqLck6/JF215ldrVnYvKbC9viiNZOSSFGoinKT8MSbVrzYalBtSVHzzWLJSLO2vSvrMvPv2vGEIvnGUsiypCV7GodBr/GN3asthCGZKrqNVLdrG/WdRB6dgN4iHdnfW2RxwiWC4g4awQM+KALfsOQm0DBFU3Vp6RMKndsteMTI+YEgjvwGyxKX/Mj6HK7AlbhmC3oeenXzNoqxor3dpWIitsg1l8Lk97Fk8UCuzZXtoQ6lJ9IPByMKIHrL+V9AwoiPF0lXNCf2ifwyjREgqkJdVSDIgTJWgXBvE4yvF4xdj0DZVqQ+fJGSlxN2gbZIri6EBU0uu2oYjBAiJmkD1GPh5ElKD6koUf9zvbxv97vaz/lP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAK9mlLewxLeAAACXAAAAEd5j0bLDEtyAAAJcAAAAT//////////////////////G6+uqqqIlRMw8pL0RS1gSipZXOO+/b+D+B05Qjp8wOTE+s6IA8E8CsK9IkJFKrlig7aVn5+4VnYfdRr7QLFBm3xpLJbP3GjJYAkOUYmKDRLM5AdJBFRIQ22yWMFCpHZ4XPRJSU6aVJ4TKKDmtFVgiULjy61FhORPYULFUKEou9glFQoOkJheokD1zQgKNj5loULHz7mT0V4CpGjQonSMigVrIXIg0OkLQrtJAk0hQ8VTNrEBxaTZ0UDkli60oR2Gz2UFoZOcEclLumJaba2GXJmCStps04vtqvI0l9UQ2lC025ryam0zOoy7DepbJVCAlkbkdUoCG1bkD0ylN5wUBI1R/2wOsmhdvzEI+D3Ot6PgvLDISAt6aftUjFZ4/w4wc9CYTBLiduZo065hx3aga19VQ/7tjJNEfy+wfSqolaEIplwruwKnFzBJwYrCK0tONEk/ehYpYxRQlRcc5V4S7WMixQ7PU5y6W4TH0n8PywxbSOLT0pwoS8qL9SorkaJm+LKPFxIhFSqG0pjeWKz48LxIHFDI+sr3zosGS05XrYkY9KH0FaKWl6Zv3EFo3U2uXT1Y+eUrT+6+XrHO1tNemHPpHnT3vxzacbpFNKf36onn/7Jvv0z2vx5JzmblOoxPP+v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAsyj0fjD2N4AAAJcAAAARz5oyusPS2gAAAlwAAABP///////////////////////////////8L/7//62yNuAtFQSnLwoVRSAQ8CmLo50zXH1mkSTVtblgnyGLtTm8VZd29MKIvJLlWuVOwptYfTqPv7q/SFK2zcuYrgztsYDRgiJz5MDouI2jSMUDCiAuOqqL6KxOGEUpnwdXBSY4XDQpA0SOKyDDSBGQMCgPCAkFQ+shGFVEYqNGBEm2DYhE0Wi1bSZIGyq6ZOjPVEw4oqF5ClCy2MCSLgJDxG4eZTGlhCRU20fIyQKsoV1jbRAwmIUQfIx8mJGBKISMkQkhDRKFwcISglIx0QLiOsSvGmWHN4YL11wiuSGTj/eUJFEhkUiIh3d322tklBz3hCipSmQmPJw3JIBe7OGEyly3uU6XPVIrtJKJgfnOqWZ0ujJOZySRAHKQz4qOTrmvm7PETTm5NbPFU6+aTMDg4sjSVjSg4l4qlsl2UoRMIR1Q0HgwNFhcOzIdLKlx6HxbHAeVxDNlQdrhJK50hKSMWvKxXo+kJJJTI4DlqoNScaNE6gZujiZE8Z3O1WxnjasmAaJpMTvsJhB8/K5qPZUHsgjwe8fE41SlNYTXRJJRHJONmgN3XxxqVC7CuJycfjsiXF5WP/KoVUJwgHhgZpTVkunES8KwUTFvaYPENwppSEsg++Nb1SD0////////////////////////////////////////////////////////////////////////////////////////////////////////////////+JxDu7u77b//uwYKcACjloy3sPY2gAAAlwAAABINWlLew97eAAACXAAAAEWySmEqrjIOCUQ2VumD0zDp09FLIOelOIEvpv3cnIl6tUiAnXSOci7rpYPJWpNjb2cvTAtIa4JI7GFiQ1fXarbUOF8WiLPzfSa4MiA2wYySb2JJNywuzpVZ3tpRJI5FhvSSGnq7sWZlFzJgu21xZkPNYuAkp5GQ+PxC8G/4SUaVIok60P1ajkNQ9D06uTAPxmcLnzBYT/RrHBRjAnGxuQk6Faj3pkNx0WYzvTiZQg62BvQpVXOxOTnmZDccjdDgR1M4LbEfENzJ6xN6GoWfyOZF2dz5wcl0bzWr04xsK5ftB/vU7Z4xpZr60uWRwvViAefQqpgZaA0vgNxJFYoiBUIF////6VjJS4OHSQ2QZDGAoCqlNvpUwaHgcDVfGExiY7D5ABFyGFhQBg6ZkqPB24lAEy6cBDgcFJjZlChUDl7kkR4AmG9ZZtdaZ5mEwEJmFGGXLArwcF6ZCgaQqRRygahUVhDLDguTMGMNs4MElOGtDBZCUNsmRuMihMNWOoQLtAZoZM6jVNmFKhAoxwAwKEHZHZgCqAQAXwRCNYwRrgKcxUyZIsgYRhck4lkwUixwYiVNMUxmEAKLyRSHEvMXJAohwCAIODjHDME0QIEEZ1gmEMiIDTyskMAdiNoIxIdiJkjlQJIBmYQIFxS+yXKvgAIBgEOosOkO18cIKHDVJMBYtSgiR5Q1HQAAGDszEAa2g4XfCwBIIghSCcVbCcqEoWQSvct+G/SQAoaHRQVs7M0dRYd7FTyKGFF0u3cooGZortDBuL4NldJhSwqtbeOvL/+7BgpwAMH2vMy5rLeAAACXAAAAEh5aNXrD8NsAAAJcAAAATYU9jL2Hug0teCnawTEWPNMgFs66HbaxAdNG24PtIe7uY38D5kIhxZ1RMIiimk0oT7H19+u1JKbTbkbaSKUEaTctCGZLmoUjsggzRo9KmqNwKE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////1VvlJcaKchgggx6+MLjhL8Co0PAzprgkj2MxnUOzfIdVIOgxSJK/rM4WkZUAl+ZYMFwbyIEFXkkceGGPMAp4BCIsYBA0vWBSwccBQwHL4+5ij5fiaT7XmvRRaRwTg9UCsZqoQ8zHjx4tIp7MKgwsZV0hZzgHw8BCjwJaS8WomoRguQbLcI61l0O4+UyWTcSp4PldiTOIYKqPKVqXTGbKGGwdJ3mShQWTQQ0yibOJSp0vL9TIhOl/OZgKcvrI+aXsVvoPduM46WM8o6ahLEiqkaLOVHGAstcaEsQX1ds2pcOWvnPki6xCrmWDiNqW7NFfRWSRzjuOHKNsEH+kBNIpyoSWSn8Y2MR1HqSDm2O1lVXrTUYwiWvlbrElyw8wJvFFZcnoiGIJzLFM5UWeNFY0BTqfOUssuEAK7W6yVIJ9wEIYJiO7MxUFCSoAg8nOpqyB1n/jbbvI6kjn52WS6zf3Zwm5BZs4atc/J5Yww/it8fTKYAFkq/AVo499RnMTZc2ZQV513N8wKBGAwO/TiTVHM3I5H3xZ48Ehl0OyJr0ggGejk7jK4u+S7IsiGztVyFL3xmrJKSPy93H0Zg8Dpum1qtHaWaopiR0MsjEvjctde87E81+Qtkl1DPZVc7VJIM7dujs7prVjHuP3OVa1SljspjMurAOwb//////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAqAZVVTWcNuAAAJcAAAAR/Bm1NNZw2YAAAlwAAABP//Aa/UlSS26gINIjADiAzxeCC91xWOgaVZn4QxuG3ie+CUKlgk65lfkWLrJKiH5gpoak2wN+VYZXZF8OlKVLKAU7oh6COwfG5LEG4hYFewyBCV4yzKB6rpSRu+LmUDjRVsUslOFvCmlOUv7K9wJUYE5jIUkBg4KOKqBghEFPuZhMtctwrLdWsPo77KYaVhXy4zhSFev42IZpH0ddjbew9I5dFrN3KW9oIbdhKtjYMAkoFxqAxmVzsjiVDH3ceRf9ti+3Jo4lKLs7qiluWU3XilSL1Z6pEZXNUmOrU5ZqZR2VwRDFzKmhizL5dem6e/IKGNRiCYm3Bw4KfSW0NzaqIklSRokptJOsqAjCcsLCMCOdB1JIq22OWWwxUcAYOYS58SaHLV2dQRTjrQlDrWSeDGjByacFRhtVbBzqKh0AYg6geWwGiQBbFCkxEUKCIaBRhrgwEdgMDv6uWf1Aqhr6Rt7n2fuvH/v2M4QKBYvFmt7giUuFGAwaRIA6G2GUykkCL3AMiLpZVWx/XMoXYsQQ9t2HH1Wa7qgj8MGkUd7N4U0QmcZ23Irte/Um88MYnDztyTqtUGQn5RWlvxiVXL03O3VcyFsUunrEMw79LuimY1qL2n9ydOM1Hmpqtyzche2kxlkDfSqEvtbporMxi+/VSUVYlNTcCTLZ4cgyGGtyN9b8amM6+X//////////////////////////////////////////////////////////////////////////////////////////+CCnG0//uwYKcAClFo1et6w2wAAAlwAAABIH2jVa3nLbAAACXAAAAEQCyinJ5AIT9pgAKIC6KkoBOrKhcTbMvlNR0WCUjqU7D3VXe9rcU8Fhy1iSwMZUKIiESgsoLNgVIihhYks7Q0kywHHl3TOnIk1MFCHlHgH1UEwjFqSyZaMdf1oz6vo4UVeZ9YEnorFYK7e7Ecmxx1NEiGbkNgGMWa0iQhtwCpRmnrlRBfpVaQNOZDTu65auWmSddjc1wOy61LLJTbkcA3Z6H/np2goZNEqeOxhm7GV2OCoNNu/dfOIxjly/VqR+BeR+IYvJGJiKwJhbi8dt08ThmD40/kEupMQNIMsrdydjlJfjFHVpc62FN8rvZzt3PVNLKWUQLNO3FJfljD38vYVSSXJIyCoknKqqSYDLQSoANtdsov3mnqFtJijsIk6UrpFtRckFoWWpsKoFpYJCoK+DRch4kGSzSOGy6MFH0oYStMcXrjj4swIDzAcRGL/vULBMETeW4z5p86UG21CKdJ3CA4rYg+acGeVVlaq9SAJO8cPSlMSIAohb4XBB0hbkfQFCRfhfY1o86g1K3S3QNvE3WokyWHo9to3FDR7Xk7UqyaVzlPKaarjcn9VuUkvm0IGciwCqpQS/a8ZWsuS12n5wNIIAlkcZBNwFHrMNSujryWen/hqMR65BVh/4dlMgdydp6GxLY/AMEwDZfmE0cuhq5qmo6OjrSWmfu068kh9/KzT22b+XQupGrFPd//////////////////////////////////////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NfxQJmCEcHQhUrUHIomTtaUxYwodei0JgGcryCA3rhl/npsuHDLlR6XwC/F+lv09qHXUlbvRCQv5S0EM0O4ajWUJp6GW2ZFXsV52pLqk5fr8pJTDclnjnV////////////////////////5rUkkkSbabvhD/+7Bgk4AI72jVafjDYAAACXAAAAEhIaVVp78NwAAAJcAAAATsRQwCfjqPGsWGb6XOR4rmBhjKYjY8h0ljNJdobIolacYJgaSeAtiMBAh/DBMonwsQnp0iFDrVAu6uRgQIu5/uZ4FQznGhRbiAmSK8CqPzapAhKYwqahlksLpZpnbWn2YLByyoYXM19gKvHgbCqCF1X1bKv2UMjd0tEDjK0slchHUtrfcpRdSCWzbqLF+1NgveVIHD4VFSACYylpFhD1J1JhlbvQMxZirE3nGROujQnjEpqHYZ7SPq/C9Wkw0/aKLuP013ritq60RwdK1Ek0olRz3MHai1FPui5s1ILtivDUPyrOij8VtwbhDMunLlqSVJHDeUpma1+W4XOzUblvvSNjrllbbiZM8NAQ2PQUhIBMePDHiAwIADgRbSY7RICaRDEYXQyBJYv+BXr2Srpm2i0ZbkrW1tuajkMgYwXAawF3kSIdT5SxXTALFY0upirbo8xe7AFApKMNsxpkS+mVu1FJSsE2Z28FcR6JtrXnYAUua9TM9pE5S/MuWq6I0t6ZQsE46rGFQQqtJ4467pV0FmAuGxJlahiQy237kTc3anlItZgVMYtc2N5EtWUslZqX2CBNSkcbTdaw1tiEPL2nXUgps1C+jvUNC/LsRpukNQ0868WKRXFvpazKNXX5vQFVd53XJppmmdWZpH+turHq7ToZcmgebkZgKBn3hlyZxnUia1jNQukhqKvy4UDwLzCOOtNVpVG///////////////////////////////////////////////////8klJpxptpEuRALdhkShIOilMQf/7sGCnAAncaNTreMNoAAAJcAAAASJNo1etZw2wAAAlwAAABOCwFZIknW0qVP8INkAEvFxAQmcbeYYSZaKKI1+ADTGWMxkzlAYULTs/SGc5mrRmjQW/7XCzzJjFCUsYgy1PGWvNPuwmqxxyVuJ8s9kzWaBzn+kEBOO8DA1DVwqBQp4XUiC2mvrcuQTqGXUdZyF5PswlnL6tYW7GJjsoyaXLKFtXvSeaunKhNeQrKxGSsOGiEqFNZbHm7RyHY2slMxTKDHlLzLPZzT0jOb7lWoDVhcBl16UOE80b3OZS5bilUNzkdYK20LhUPU7euEoM1+QLGgOD3bybpHnJfZq7KZfWtWonDOESux6CpVnT170Vq5X5TRS2lldhwrUbdWYufR288apVVpm3G0nVfGAVwsHGMJxz4EYQ0MGGAkeBqj/IaMXGQFuZl16CUy8cxYgygpFIuDQJvyBAWUCFZGhOTKC8qhKr4ql8gIeMOGIDwEVIALWVvMxUjCH1bV1nDZsgHZcoMhJTecFlkTaBHpA4028jMXQpnplDjPg7sQdaDWDOM4UMNlZzTMOWDTpm29kczDLxNagZ2rONeXOElc2MLnFYYhIL9ARBMEFBqVk56qKfYjFImkg0aUhEj4ETGUPYM+dhxG5Ubdn1pb7vSeltyN82M14Jr08hhctlTjxNqTA4dZBSsQi0IfT5LetUjcXkna1NXlNiVSm1ck0Uhq1M4yKapoZitNPwXNyHkGX5ZdpYfiNmc94pfqA4vh///////////////////////////////////////////////////+qyq7ckjTqwAhjjJgwwDIEi//uwYKcACeto1VN6y2wAAAlwAAABIg2jV03jDbAAACXAAAAE4FQSBoNFk12gSwoB25r2GQdK4gSkUlGsVI5l6gSaZcJz0mnicl0Lq6EFl0tkZixtqiNYjETiLbQe0qSwwzhdzZkQomDhJ/CRmMrCxmvnHm7PbAUbfGIyydlMPP+/NFCpK7UVfKVvW+ziOW3kbhMkXq1HN2GuYrOclnLvr1jz6wYypYr1iAKK5gyAQnNwYAxyH0B5gsIpOXpASyFCCRE5iDXmgK1Uj9W52UTUxJ7taZp4IiL+QwwSUMEn0B7uNCZJJ29eJikCIlrnQvupJx+BqsqdCgcCNyivKonNu5i1zUOTWESlkpuSerWsXJqpP50tFRU0zGLeq1iat09uzGaKdASSUSo242ko00xkCDuE30xMwEDnjtRcBAqHeNKqJ5KUF7yAGa2d2DJk+UArel7SwMiCmLDSiy4mfzSgcFKueSjlTJHjb1lbLVHnSWAeCH2xsmf1wn5astRzIHpmiQAthiSsDBGO1GVrEikCxiCIx1z3ffd9IFapK7bfuwr19F+twZLKG4vm1yCHkwdFtm7uW97m4PS4bTX+QofhgD6vqr0qlThQAxOGFY/YggLfJN930t090w2IMMZI1zUHS97HEZurGxJmzTn1aWy1PVkzKmxO1EmnMicZlT0/KlVIAaU7zoPw0vGWxWMuJJqWC2CR6OP/PP/DWcFW4/yvLKSWS6livJNucpJvGV/DHMr9TeFLv/////////////AWqtptolRfoUumQJgASKGjHgE72upovMtKSsRS9TAITJXA4CbiXTYnHZixxUa0xYZVAoT/+7BgpwAI1GhU63jDbAAACXAAAAEmZaNRTWMNsAAAJcAAAATL1EhEdIIElDFmE4wVlSmaijVnzbi1eAU5VzpjpuIIWTOwwBuKYiQiIBfhFACKgR6IfdEwATnZkXYVkbKkmIEAURfhWwIOXslqKiJptDfFgVmarPYIvePO/EU9E+H2YJH2QxFXL+MebZpTAmJLAUrOHiXZkhgw8wldZTVegO2wEznHAI4oI3KSBTHLMLAGo0fBhHBQ6Kkok9U65mFImNcfduSOEOoS1h2twdTNqgDX/DyXhd9BArCyNryVKP73q+Wgl+xN624IoNzBzC3izEBJZtibJi4DeMAVXVWUsUcL0S73qbsnSiu/AqVAGuRWB3DCNQdmcNwcWAly1jqkb5c4BUlzcsl0rl4/wCwaZOTGHUcDeeTxtRKkRBrl6ExN8dghTC1HIcJeyYLQCeBnCrBOPxMB+lzBzFhNEkwabMXw9VYMI8GIuQxCMkY2tHgkgWEQjAvDQIKFWI4PASUOUFpI1O4nF5TDC+3io5Ay56UU4LW2wxTBAKXjZan3E30Wg5a5xGF5h0KP6wcFMPV/BD8MCRQlchZKsEWokSrUzYFX+GPexRGfWcX7ZoanHIQhKlgoEocX8UgQIBZFIAgBaxYdNRhwsJ41MQEsSWvCGDKVpCV4QMu4hA15wEf1L4NWCRweFI9O6lTlb9h7KH5aMmg+LoBUweBdosBG1HNiSpERC/dhlTRnSaLEV7vwrY7LDxka1mSNGYY/xbORp/PvKlyqxQwyB6EiNKQ5KP///5H5VKbbTcJqZwboI0fxLTtNI5Fa1qyCkyZEIKgOUoBfjv/7sGCnAAloaVVp78N4AAAJcAAAASQVvU1Hvw3AAAAlwAAABKRuh6UUohJD8F0LuLsT83y/MBPBS2FpNEm5exADfXgj7mYeFcfqoJUojALCOBWHYJEcxoEoNIr0OUbUoRD7VIHg15XPcZUz0KsmWaOwtpl6+nGiMnVY6kBU1Mz1VdZzPU628ii8HIVvuqZyxpz2x9R1rCyHrRmd11Ges6zB6BwC8GJEpVWh60fVRjWFsLoZ0TAY88KXENsrY2o8piw5G9gcCt4s+LzjGl2JaMBae3sfZg4Sp0iITBMXclwIClDpQS7S/3Eh904FZFFGKSZXLoOu6TOF4z1LJoWhzfNoEvgR4mqv+ymHGdwa+1O1ykd6A2c1+97+t587njqwSQ2ZX0hVqVSm203A/gmTfMFCSfvi/q2I3TLogoYRnCzCEEiU6GkhYhFwVhdhdQFgykYCxikpEddDDD6K4OMlZ6kmJkOhDSxGQdzMaJ5F8NgdacZjTNHa9FKR3isTjXHbZ3CIk4clqvWruAWsq1KxuHBjtOW4qgEUSDc2Rxumn1QL4fxvFSQU9L9w7CIbsP4ylwWxtmXmh9G3WiLPlVJc26g6vmfQ2osSKLMryVtQFCECRrI0IACVTVbqJz/lyG4l7lKUSmIOO/rjtSae3sCMlcGQLPYakdL3EeW9cUXZ29MNKavu/bwOk+cDciCnbL2QLCs2fFtXbcp94xK3gStvyh9Gkrxj040CDpA2KXvRLqOvO55y6RTyjYLpNiEXaXf////p////////////////////////////////////8opQklJNtpyjfOEnZx6KI/pmk/3r//uwYKcACcxo09Hvw2AAAAlwAAABIomlUae/DcgAACXAAAAEe+oK6rhymmIu5k2RQsgKRXjAN1FF5RRmlyGIPsFmYhBWIlBpoFkMgeTIGoEsR7tQGk9N0m74/VUgVGxiPhbj+IAQpOD5lCmErbZ9o4strF1nTJXbRsTkgZocPpjyiC4PZLK5c5UjkcWbnDjC6BtodXQ8zuOUwBhdleTrwXD6rE6kWpGv1dUMO8mS0Z5FsDDWJjIFrpot+rMlAjkylqzvSd/WTRt277IWWtgWJP1mP4t2d1Vdsimb8rtd9W5IdUEXQqZYvFgzJ29lzb13ulEYhp+npc2WO6tZ/XrZVF4cbM70NSyJQ5xK964Qyx9ZU9Mqg61Xg2Vy65HMxID8bk1uaAY1EUkU0kAoPA8R6DnJcnBMGRCpRS2xSnyW9XS7W7CBSZyRMsjaik6ypdPHLaNFF/6aUpfJIcYM2Fv35U2iSukqXmb5mCk2VvVAVhmM25tSnTUQn4kosc47AWopAhxoDfEwJcnC0OdAkzGALAEaZW1AAmlCIcWIrxYzDmSxWniEEJiOALkvNSTphQi0GENwXcCbO4iy6Kc6DgCrPNPHsUBMjhUpPAJRXEnT5+BhhZD0jHQ09FKjkKgOLPMZZ4FmNdlABjeeIqxczPUI4jnLel1UjkioXYsSn6lVLSd7SdMA/SU0UinLArk4eCgXTKuZ2AvSHKmA5sSrRJqG4YTyIwl2YIi5dKq7ITvjzzK//////////////////////////////////////////////////////////////ym5Ym43I0k8HwLESYdxKFCXhwL/+7BgpwAJ2GjU6fh7agAACXAAAAEiXaNVp78NoAAAJcAAAAR+ThimVShJ6iDmEwKkCQOZLj7R5JS4ilCcCWLaBIsAPoetuJwOAdSjLJgOJVCCHUDGGMQEtzSPU4HUa7U5jEbNRm8CpgX1zrsghqysrL3Jp2IqeVO4afDk8eONonN7eVQeWwm5E2VP1Ov4xKSuSpKNrRVViTJmqkyET3fdd5o0lnBTFmrIYuqr1zW6ocm+QBjgE+FVVuv+BDkTkOpEB+0blfg4qUbcWxug6CuoKlycC85W8aPiklzKbPC0uO0jMJCr59pG5sYf9vX1h1iUPTsejUFySsyt5WiMzjNE9zOmI33SfaRRKDXsht/4lDsVf2lxl3Jrj6w5UxiEjoK1Wu8eFr6uqUHcYcMOKgDKJcViz6IaaakGXJcRlsC8iqJOVmC/GCqnemULCPwyYVCRbR2WosA76VTEVoKXO+TARDUg9LyP1DpeFoCQStpIFgtPBK0mNRU408Qo8zkUh7iqLpYE6K+UsBTHGXEcL5tLip0YiCbF+OJhZA6mZDTeUqpLcVyyeJ4lmOxMmuSI8hplgbCyL8f5vmCEZJi0K4/EaOoWoV49y/QzSJ0hhJx6cium4RlDTAQ4T0K26gu4qNdnMTpOivISLFctxRk4UY4nAuQjS2kC5DmVZ6k2U5uoFQuBxNiiJKhrcfquciRMw9SG7QlJxVAuWRzZT9OgnSHOKyxqxMI6ZRKraeURlNLJ//////////////////////////////////////////5KJcSbbkbadHREqQRuRmZMKGDzZnTQHTDSBGBsxMQGDABo1f/7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zVblAmDV5U4tpOVdLIkUm3Xa0HCHsk5mhF1V+3INlZgCnYXiRWTCUyeZcq6oGUxXSxFyWGy1aLc1eu82EtSnwaXBEgo050OLAScHtBoF/NjWq9T6OCBBqwuCXJLsomouBgUMlrTTjS7N7Y1dh2MyymlzcWo50ruyJyaKrKovelL1P9HVoySXNKgZiUpV67zAYpD1FPVYLpHqgaNxF+VbnidNwI1TwXOv480S2AU22451KrhuC3CjSZLC9rTgYLFdws3qdzfH8IEvgNJOGpFrO1cQllJ8XQ9S4kxOJRF4XrGsfJ7lxNM5cKx6TLYIc6mg/gsJC/kAN2XO+rjKHPxBLAnKXIlS9K7WsM9TUX2ypg0OQRUjRaV1GvLlUpfFvpI/r/U87MUjhTDpqfTRQvgV02auC11SmUzTOFKoKk8ejNO3sEukxLKVxFQEwBCgVfuVI3EaVD117VKliuBImIwLHFhmpRNpUF0T7Qa4LDYxnN4vq/PK7+xxxqB3qGtLpqVQ9MuEtIGgRqWBMA1QQ82JE17FAnKrTSmTrMxYlE39ZEX+c+DXJcV/pHUYc05cqgskfqGYA///////////////////////////////////////////////////////////////////////////////////////////wU7/+7BgpwAKYmjSYe/DbAAACXAAAAEgLaNDh+MNsAAAJcAAAARJJJ9UthkhNiuNC6KwTImp7sicQ8WFsMJ7nJkbbzQtNqrSJJJWgw5SvrDT7PxjAL1uguiKuY/KQKLDwKPtNlL2UtOvAUOtBmrKFSJ/u457lOzDUtbSw8bKE21WJCJdvWr8zCQ1DANbaA7QsOAYYlCVYNEWSTsXOpgux+WeNbsxNERW1uCYs4mw3dQ53m6SlrsRSoY3HZNF3mjz+P9GotL47Rve2eU2mitSVucFVZoNlq0shdSIvrZnoDcK3J5tdMHyipORvViHsoQ3tLBEIuwxQOlJIlPUlLLYKiMqi8Rhm1uO1Y5KaLlLZjtNMRqXx6bo7kdq3qSZyvynOX09uki4Bckskn/VWLGGsHLQySlMo5nMmj9XFwJ6SqBHmQ0sY+nyvZk+hUBcKg60OWVWuEoh5/KE8HE5hfnOdrVEQ9pjsxyEubHyGCBDm25qkr0OWz3XKUNYtyOTwxjFAvuB+PlWPyIYSsOw/IRPy3GmSw3YblbKTRLJIpBNXpwjAK6UlEBcEhWlhPORqNzGQU/xFF0ttjkqoDEO1ChJyfmowKZoRSkfLx7qFN4V1Uajz+P7TOztrzMa+1jDLWMzvmqNEs/0pKK6z+N4cNd1Z3GXbnAZ4mo0SDPlru4St7/Ekm+3w4rz////////////////////////////////////////////////////////////////////////////////////////////////////wXJLbJ/1Vl7V6zqaBbkeHS/N0czgFxoEQqgGuBU1cxuugf/7sGCnAAliaNJh73tsAAAJcAAAASQ1o0uM5w2wAAAlwAAABAwtYRKmE4aQZv1smAo6DACAn0Hgwx4WTIc2MOJI0PSZCLrrHRUTkKIo0xU6/59CeEBLFfpeAjFchwGUkSkRUK2cII1bHBR8o06HARMRXBEByqA9pxkkF1rqZSTCA1C3avyEBelYyxS2bcoDlsUlrM4uzIuQFxrSVlGp3k+Eh0BDS00maJjpGN0MK0I3/VqCGO8AiCoVWhw0uAVcDMXen4r1vlby7ABOoAwsRAVDLqR3lHWTRl8IZiklddrb1St3Kdr9mhoMX7bpJZPKaN5H3emAHlidE1uGKKjk9SVzUbsUs1ZnaaWVZjfa9eFRifmqtaZjcMP5LZqQP3WicxEZM/4ppyOONtpJOGTEmVRnXbgEAcKkawso+kWuuXuGy1+mbP7K3DfYxjASwCgCAZ3L31zak6MWfqSReHZY6ah5ZxdDQmxsJi7uTMRabCqWI3c5JFmW5O3Rbl0UfdnL8tap3Cba3GluIPT8ZpPdGMaWk15pUaXctZ76juQE70cpZrN263XiZ51pi8y2bLVLmRwK7uL7RyWMOa9D0EwIyZrMhcBlbNo4wBWtz3oV1ni4z1NkbA4TgZR9685VSR2ljcipJfKs9yG7KYrPRGTUsUftvnbj7hX5bQtNpZVS4149IozNynkutarYfeq1rtJKZyfq8t3JLDuu0tipYrYf///////////////////////////////////1KtKqrElttttuO2m/z5m7IMmN0JGx0CnE7am7V2mSgxAUCjFoCzAoAjI0OjBgDTAUBTBoHE6EJRiE//uwYKcACKNn1O1rAA4AAAlwoAABJzGZS1ndgBAAACXDAAAAEpgUIplS4EKJiTEYMCmKq4tQlYGgGLghgmXQa6XGT1LUgoLMXFxUGVVEAKOBQVCQUDmNCxxCyEJIISAcgLXhh4m7lr2D1nLjY0GLqa9ZXkjXKow98llYsA2oEtYzRgIC/z7UuUldhhRMAoaIAUdl88oQaDRhLqCEsYZbiFSghBWkQMn+JBKcTyymIzECSZ0ysBdKNOJDFhwGuw6BQRkatr4S+hZ0xlgr5xpE9Vdh0Vkc7hatoQDgKlWnsy9pNNQ2InD6cqaojAi6rLe3edpX9kE8we3ygnZXcwjz6Q3Gai92YTVjGVXqaGcrkupoJrqGAIJhyGIvKaV/Zl9Z+/cwqFV+vSbkbcRlH+Dj8CPxLQ1XlnplI/Q68SqKAFjSeS5V0pvJUAkJ6mvRkZeFpjEn3Z08LTVpNnLmiIAt40DCg0IUhn/ZypUu9ehbJGltXBkzWpG/scdZ4nmYa2B14wsabjEVpu9j0NRqBa7/Rq5Eo9Mw7NS6HnrLKuAQDNB2aN3aRCbUbcF0F1O2prHIOZdKYCcqtqVSO5WxlUNSuWzTnOE2FmDHlSvokU+coXK+UDOi9i7kZVYCySfw8JQFhDNnZltSmw+kmrstppdKZ6Uzr/S7+yl9ndiUvjM1bjtS3GuzuV/eOV3W6W/3n4Xu7wqfVv52cuWgoJJEP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwALYmTV12cADgAACXDgAAEcLaNTrD3tsAAAJcAAAAT////////////////////////////////////////CSust0l1sksmN5gCZuKCqvUmXmTKd1lC4Guwc98M6hpCmC0AA4XwIixXH8qic5JUt6RJzjNEEGgolYoEahkqkBNBqRGlGTZ+VKvQhdVIEmmc6hMkg6OszHhT0H8hx5pxVoSYZ4FxPlOGhM6bGlBFoaS5NdCSsTk1nrm2opJqxDlQeidVq4okD3VaxHT1o7PBbWJxqXyRxeuK+w40mGpzdRWJ+5pFWJXakjeRMMr+rqlIr99SJG3GljSNyE1q4O7vGFdzPrxppnNUt1Xa3ttjvoERjVh1eO9Yl9SSq5XPs3v4QKTt1u9u1skq+TAkMSjLEEZ0vazD0+pG0qELXjsD06cLI4sA3MFYDBLLmxqsi7rMujMX2wV+0qJi24sZfm5JX6IURxHFmahVuPLzkrcl0mKaDfsvivJWj2N8Yp3SNzGIs2mWfzahy6Up2mgwM0SAShYVNTJVCHYQ1EOSo3HTB8q1Uqt5Q/VLHhsziqstMNnkkOtqS75XxWWMlGR09gLp44uMVqandH9XcKBqWI8Y4lZbKvTDVVt0eJHVlYPo+YNO3J24sngRJYEbwXzdq64Vzy7XeVWsFobtt0poTpzV79DP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAuyaNTrGHtsAAAJcAAAARr5ozvsZY2gAAAlwAAABP/////////////////////////////////////////////////////AABXZmePv9rbmml4BpaICfaHJJvBX0am4cp1UpC1lmKtpflbomKxFmEucOQtZZ7AzfuFDK8HZBUL+GOOou5ULkUen4U0Jf5QM8bLGdM8Tik8jfQcT6MHDR8gg3baiGo4sTRT4HD8yQSuX2ceJokDEweM5MS2U8yrqVeVmiU7CWjcutsx7GquqSwL2ntbaOD40O4F5VRrUxOTH6Ne6dWYqlc46kvRGmnjS1TTFK8/XrkNUdxQKcScus/WjsrVIkQpi8Zm6WCLKXqVnoC2foDx21GkxXCvbd+kolyOSNxpklkRyzSIAgC+5ExLqJOl7IcIZbmodk/SmC7F8DT4dbo3ikrk3dqsdmJ6UrqbM8CARzmrx5rMWjTzq9cV3ZtiDlMOgdrTsrykb55WLliV4WYekcvOT4ljugiefOI/PchaUjqfOuiECRIHZSJJYHYwTikBLhx6o7Xq+xSfq9YptzksH6ix09VrL8vUqXz09TuVYmI14/uQFjvKubgUmR4ij15W7CYlK3wPPVSsFheS9H0qtl4wBqqH8zNztfpeK52jQU5mTC2qWPGxIENeQD5iBXP9H////////////////////////////////////kou17abe2SU4uJN1RwwPMBEzKzM0MLMRA0160Plk0f4YRULKOJLXHMEONEwOY8N9ENggMwSMwYMsOMQAL1wQwxQByJbJ1kIOGDAmdOmfPmXKgoetIwwoxxQy//uwYKcAB6FpT2sYY3wAAAlwAAABKzGlPa3rLeAAACXAAAAEQ4yY8x40HD2lAAMYYYYwYYQI0EwAw0CA0CQ0yo1zQ2jQ2CYzRAyQoyZEBC3mdOPsrLvgIMBDl6GygUEzTTXdOGM4XzZTMsUHEPaudAOwdogICMgoyhAce4QMCMYo0EjUSM4YtYrh+5VAlmu5b9yf4YgBlDDIQnuYJpnrmumbSRnFBAjWQSCY45hhgoNX7I0V1B3vTQMIozkDUSNAgzQUc3eXIXcQUbSDUx0HEVFBIcgNKtB8uWj+nQziivSDGG2lqnQcQcTAYhJVh1TpjtffiNuW67lyOxDEorP4zhhjiadtc7E1iNcuu2w9nbjwffj7vw3G5XXh+G5XELHhcH/qQASo2031Mtk5JzlEz6wqYKXqmLogq0CiiEctfLGgU8ogBsUpybxiIGFVa1FKUaDis5GFppbIWBUkuMbwwaelGmsoo1BZaIa1SwKAkGWs7f1u7t2o00pnImJNXE5iiL8S4bxMVzAcIOXCKu2CzNCzBXyhDvEcFWWJjJ+MM021CzEJKbraoyHi1CxBXC4l9Urk2LRbjeOY/VC41clcfC87eGwNA9lU2IafpwqJ+nSUkFFxHCSVQwWFOssNaTy6YnrYiiVE6USrmULEtKpmdm8fh/KbaYXjiJ0ommG2syXaW9SqVEtbtYcYbk+ZnLbanjSLkdSujx6vWaFa+KWtJiN/////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAKdWjUYzl7bAAACXAAAAEf7aNXTOMNsAAAJcAAAAT6v3/pNppOHaKZyA4QbAiEhMVdqJoOLMVUMFfRZz5QQ/UHMwfB3WxomqbKmVemSXHaIqqnI9auC8q/FLwso0JKyr2a60mKKmaEkiXbIFK5ddhroMQl0OMOgthXrNd2LrEp5uHr/1b8tm71y7TVmcrPX2w5roAyxJADDCu1cL6TFLOMUaEqtXfpqUNxp5I1SSbN23YaQ9lSy2KYbSNSaLOTZeV1Php0o/Tw9ZfG3SRWdn71HBLy8fKkhLmVZLnIJRDEVu9uModmPt2kr+u2wZoTSIJhxfTA3ql7OXJiMLjL6vNL4k6kii8qkkESigxx+HaS3b/VrlblW/a5ljewt73YJKScbRKaaTgYAkMEAoQwczUzEQKr4ugnsKA7mSl0nkuMJWF+SLMTw90Q8IoIAMY5WYcIh5cBhj+bhhBwgSKvH42NjbHRIVgp4jYWsY+4irVEkMxGdh5TKZi0Yfh94lGaa5W7qas/DzQGlNN0MBLkoB0RRYhf1MlKBCemetl/kvQzYqBhTNmgu62Z0HyhUhaPDsPyqLbg+gxm8n/dqmnX+lOpY/XMY3+EOP04zpv9AcVejBskniUTqWqrkyGijtWGWstiX/OQ4/FSQNTYYu1gDuM9hxxYxP5RuYlVFDd9+4MlNHGY7SRS3y7qXxSlv16fDVy/nvP/1lhjf1/////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAqXaNXrb8NsAAAJcAAAAR9do1dNYe2wAAAlwAAABP/////+q3/6KaSSgQBM7fE4pAfCH4iuBhQtm3NOpk6XcEPlZZpDtV/lhIVDa+4AciOKNo0QyzfNrq/mfOsW/c9CIvs/qp4EcGovQtQclijQwUcb5fDmtziqFHgLejjwYClRJCEilmJukZrJ57Agpg0AdoLERF8LYSYLpSCznQEgLeToNsIgJgNsH8EkLNUiGjcT6gSJY0AuSXHojGhaalyf6EKRRJVoVqlZGFicFe7TzQnWUvreWxGj4blHIr25xiwJNQ6MNW5CsKpDm5Jrs/HA/3pTaSrAzqdxcKr0RUoahZYjoOFcJxWIdhc5bFmV6hK5Y2ykN656jOc7BW3gtVQlFONxolppOQ2ScQ6qhxP2HN37KIj7lAIZCum3AiFCgxoDW4FUdail/RstQqBDA0ydtpac8dwU0CCi/LxLCg0syQjCYNMIEELFUro404S0HJQYfFLfNnkqoZmU21svyyCCGpwGyWYjNPqc7Ws9xms6OQMxftW58mVq8QDqkWIHPYEHAEIXnLXipg4Aiiv9ECaYeux2mWPjI28icPO5Bs5F8H9htsjsMzdOG6exXuVKPUM1KeRSGM2oIm2Zv+3eMTlvt3PCfzlmu417eUFySIOHPNYn3ufl0pZAcAyy0/WD6zUN4yGvA0Qf2Jyu3CbMPTUToYp9FHaaCJXDcUg6KSGX2pzlvO8t//////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACpdn1utZw24AAAlwAAABH2WbWU1jDbgAACXAAAAE//////6q/yglppOS4QZy6IWKB7swnUOIuilG3VM8YAKMraYogXVhx7WYydKS5Db2DAVOQVEmejs3hIN+0MHiBS1bj/WqHFU+KmY6CWsjNr1VzYpiAQO2t2SsqlY6R2Ee4fXpdfaCnqxh+3Rb1hf/Cw/blNMUtVHGlak9nhVMugDFQ3QqaBUYo6ysSKMNsmcRssslNd9azjSyWxOjxhMviT6Slpc4zOUSzK5ndlvy2vcgiRvW8r+PdDj39pZvUET0bkVBVdukdR/3WkzhSGG9tMkTU6RvZyhl85Pu/SSa7OZ8oKfcCdfuV0ccvVcMZHUpoMwgnGJZ0+GqSU16CxXLxwaqlACTSUskDW0WBxHnEU+D6AibqdriZ839AxxsNpsTFINW+m9ZbqvxZYlOIyAPHAQsgtkmDFQl5iJ8tmIj18J7BBd0WIRlSzERqLSISiCwMGMya+2Fx2qo0S2LPtDcRfjcUxv3Lu+br1oRHXuWCe2GXeTJSIa0HDZMJAXayZCUpUIQFty+owRhhfNd61HaeuGWYShr9uQyWZlLkUj9yKIylvoZn8LP6+tcmKSRz0OvCz5mTAWkPXHYhyeylMppY/DFJF41HX1gKC4hAD726TkuvU1BH5LcpLec7HIdkrdn0euPuBNRirDUciMNwRMS/Uij0O07/QVEYbfWJwRQRO7fq437H//////////////////////////////////////////////////////////////////////////////////g7dKAEkUpdIDllif/+7BgpwAKE2jV01nDbAAACXAAAAEhcaNVTeXtsAAAJcAAAAQwPTxRBOGNB0NJhaGXwiA8NtyRVqskiSsOalEELfiKRrxmA4PBGf0REAEl4UuUagbECpTL+FsTCbKAxkpr7hDyhgDi2pmHj04JAT5QxXwvJh8SAH7wxUSMBJD/U7SyL8rBZ9jMdMJAoyWhgBzEjEqXoVg/XMdhJxNwmCkBqhwiTCFAyRbyGIgk6dLszJNRuOFcwN0kd4rYZAi2EhOQ3SdqK2tNryE4J3KYHGSsNAKgNB4m24t5fy4HIgp1EnFyvox8WJCSFHQnUWoHy06MlUK2V4j0shh4sw4XzAdZYzkPpqOY3j8TJ/qyy02G6ejawuCiNNULKvSrOrmpdzMD9yvIVW/UEpMpSGhSGEOBGrCdxKJDwjWVhM2a3FSUCY0sXXGR0B1Gvq0s9kcFKvHQBLOJD2AiBLuUA8myIQCqaCKsu+aiCyjHEQJFh1Y4CLJkR4kMbCpCoQsGoAtpSyMOdNQ/2M08or2bWVTvO403y6BFSsGWCmINQfrRRaJdR4lxtKSVQkF+2ijxQzaCJljY4EcqEUtSzI5ddzl9+Zm4x7tNIbqpoylucotz85rlN2elsZj0ocNpcLl0pktJYf58HBnKGQxWVyqRQO6kjk0zUjEitRmh32lq01SnvRWAGszr8Rtxqj12ZHFYNsRCRS6WyvcvkEy71Sr8gpJbdmp+vZ4z//////////////////////////////////////////////////////////////////////////////////////////////6q/9ElppOxof/7sGCnAAovZ1ZTWcNuAAAJcAAAASD5o1tM6w2wAAAlwAAABALgfwLXmxE0wUNyVVvKbS5q75KPzq2Z56E8IZFgkRZA+iCZJQ0iQwQYwoFZgURu+CCIsbBMAxg4VGAJ+CQANCqBiwUZEmOFA0SETSYEARDWFBkuC7sqiIQRmr+RV6HQg+dlVympMebwx3auu2/DAYIYRD6lMAUbNlkNDU0QNa+t5bpeF0k+F1KqPqw92lySHGQ1ZZL4tRPJcaRHlzOyjPQvUqxbbbRp+9b1ruWVHVj9qkoqXKvPRqN6oowseUvXF4RFm6RmEvnLo7TSailFacm6nZqIQ/JpLJmLvbOuA1GGqOJw7Kp6xJKWV0crlNh9M6SPv/EZXbp7Odbr9yqpftBVb9SSminJSXkFsEsgc8GgYAMXEpYjtL2ixVWVzGetpEVqRpCXEi4fGf2U/7wNVExxG0SCBQGaIUpqZBAIhRpLpnQrBBYWi4ClZeYHHwqQMUYLSAaMwgeBLUT3bREGMog1ITbHTrGoWS2O4ay+iupEJLcDADqC0D7Hwln5bjTTanQo2SdthMBDg0EArBXRbDgV6qRKjbW9Qq+rxydMawkTxJiTAb4akJehhBy9HmqsxaQdNcyRksqbKFuQLMdCqOxIEbL8aZpRx1I4ijbJEnjuV6SmYmGU+2pyepeAxq0ukqKgoY4w1mItNTG2v4EFrhxbNCw6V7IyMERcw6vqOcaPl5////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACudo1lN6e2wAAAlwAAABHhmjV03l7bAAACXAAAAE///////////////////+KV9IASRTkyVRIwYfEYMdqrlAeKBcXh8oAmqvc6I0CQyhJplp5QyvdfMeZiCiGoI0kAgDOB1F1CBQ5OVB4gPL8BVZPgZAft6C6dseKlQKRR7StZ2yHbKYg7wsaqS7gmF0nnr11/fdJNRWDJ9JYV0g6Et52F/Wmc3VUWBJKkhZMnEfA0iEELL6ljQVqqXbGxxJUYzp7ZnLhDC5G4KuUZq8E4EaMhqbXzBmDb4koza1AmgKWGf8Y3CHzk3XY3mUuyVEXMREvIRkxjpgrzOuIW76Zncr5neytjmjW21VJqbNJ4MG06iY2yNAfR3Gr1eviDpY2FRu1JLkl2ZyXCAZuiWd1TRxDgx5uqWb0q0RhAHeU6izVU+3bLAEtXzbVuUgk8HcIonkjDS/1+EKBMVDoeqyAxSXzEYj+ITUm0CxKdewCGaBLHnbq6ll3odfi3nLICp8qXvf3lNV7WM8151HCa2vFaXI1OtmanAMUY0tuJQLTpZqWQ+1FZKkpIpbmxio9VHjB1yGqeC6kWd2NMfgku7K1U0HBwjwutGpDF8K1PM9/P6vyq9NQPAcFXl9MsXg19mb6OovV32IPG9MSljuyd7pZE5RNZ9ys2c8ZH36lLL8qk3csVez2OHZRL5TNSB8qaS4ROj3OahuajWFiMf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAK8WjVU3nDZAAACXAAAAEd/aNXTeMNsAAAJcAAAAT/////////////////////ij/SCU0k5WKgKMmycp1reLBo6AYcVdgmP1HVv19NPlLBqqqeO0z2xIdX+M/V/An1t2RZjpHETLTCIPAOHEhZF42RhAU+yB4e9Skaq/yypa0l3JarypFsa+E1nnlz/mZ6agaeszTsrsa2nU0lxZxw7EqgembrB7IofuKXvSni5C2mOpeqwPYkRBDbwy2OGn2fyPOsy1KlvlMi94UGCRvGrhs8lWJH4tHaCxzm+8z3le+YtW53keZzEqWNui9krjFC/09IpNMT3KtDLam7dqr3ndU17uVNN5XqWznhljh9+myq4RC5T3r0s3TVKtupb1fxJJUbRJKltu08jwcgIuCeQijTGOBDUWEF2H4RMgd6SgDyTOmlgZ9bLn3XajgjAbwmYGl1hkc+oJ39EELgNNHnXRS5i1Vz32SzT9Mo59lKrFBDtC7tiIMchmBIy5NqtbpbNuJWXZa/JYXPrweR9EhVWpELRQFpEuSmAglEAiE4qAKaAQEMKYuOhCAYTHHqEUC4hCIlTTqbwIyHUZaxkylkLM4GnUhlzOmzdQxHJZ83i4tnG9zGru7jzDuX2eZ3r8ul8AwxBTjZw1Vdm1jWvTmMotwmhl0auyivcvZY55Y6/WOWGefbdW9hveU9araqy27+dmp97trKzr/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAArKaNVrectkAAAJcAAAAR6Zo1VN4w2wAAAlwAAABP//////////////1a/1CTbTca6KixtY60g6vIGg5QpQRrjAV0J1ReupdGVqxthScayU9LDEW4EBWKhUAcaHWjO+jbEAsllkiLhOgDQK1SVDK8kC2oFQPAWe48BLSeSBmmRlWVa8MJyMocNy6GG7T+NpEXva9SQ/AC8mDWGvugXeSCXepxKX1Vy0JlrSl/KXJWtJfUvaraBuqA07NoYi+4rTTL6y12ou/sC/D02/rWaCHpTIVNnweeA2mzMblstuZ5VLtupXo5bTWNOVHqGgd5wcJmVWqbPO3dsz16NUVPO9u2a9XeNvd7C7Zxvbudww7rWH8w729hX5jb5vdJlb+x0kqXWSNyWySxAKkj/QAHOAl/B4Zkq5V4whyWcFlUJr+w43d2mTuCmJAy7gEIBaS9bqnSoLaaU/kMkK2x20BuFiBo0/T0caCjyFQEQlSstvl3kFoYCqDCfobEOZpN00nJhZaLZ6kFWXFQEyOp+T0WG70do6aqZPKd0tnahJmF6ZnoKU7C5GyvskZrhKaE5OK5YU7hDlPM2woTnDVado+fWgp1kSSuc4sR9DdNSucnF816bG6BCcnl9ye2om6SSUfOckPMB5WI/b2JszDZvEk3FZLwaONG6RW328gVjPrS4lgPYs8Jw//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////KTt2trkusk3//uwYKcACi5o1es4e2wAAAlwAAABIP2jXaxjTbAAACXAAAAElhpdhwCyU6oxDqpr79RyVRLGV0Det1fdwGHLPXK+pAll85BqbLE3viUFvEXMMYzG0eGwpdjIy7640/zMZfrPIxD8aiie6o25GaMBghFRUhgiBlBRfBFRK9hDHWRHEmGyLGYUGyZGoJCwcxak1pMwY8zZMuOv8ECjJBEw0x0BYKBoJzCg1L051nsjhdmUNMaQziCXvgZdkMtfkcOZxClhirWltHLJXWjEw7c/DfaSV00Ujbtv3Nw/3vLEPw3LqJc8ij8uvZyutZiH16fVPT7r01m3cqyyz3DPL92a33uy+5YvTk1Go7GHQhipGH8zzzpY1hHqKGJ6GYjE4fknJ65U6AFJLY2k0m3JPIek0ZhCWqFuK/H9sxSFrQXStd1IVIYJiqbslcFXJdN1V4OvMrBMLYtLRgCYAIEKzQkxYmAQYtiLwGCdApCGTgSfB00xJswIAcNhRgZQGDEBpjZmwBkJSAxCEeNl9Cgm+piAjPW4R5jKhhlzqYKFbNkcwSLMrDAWsx7EaZgQYJACoeMwKNW1OG7LJgEUGMC7xjnBrgRhjQ0KMECDAAiAukh3QRF0Q5GZRoBSYJAGMFAgYYc6YpgGISEEAoZkBSqgIAg4mWTMMKaaZlKapAEPAoQM4WMUKUpQfRrfNOdkqeiaqgSthadQtayKyfJUJDAkLCBAIDgDnUyCiAwGEDGDTGgzBnwCHMeDnSECmyIRMuCwYtqsMYIYgSScEgIkDMGBaYs9D0xoEve5rX3bXW6iz2kOw5bLHjfuOV5RmpQwR1mmMAaA8Dz/+7BgpwAK4GjVaxrTbAAACXAAAAEjmaNPrGsNgAAAJcAAAASYQxBeeTpz9u/Qy6zhLCBNbo2SUlLvElbVMWAIcV7B3AUczQGHDg0EyFKbKVhf8LBk9XdyaAsglArqFCQhArOZXAsDRdW9OZYdf6fJbUQgTJJTloyzyKRijxbwvqmaJBUcmUpjiMECgiPTpoqh3RkZnUdgJjI6IJTm1G2PIkL5TELhFxRow3ArAzIIsBEofCAasiISHcDAUHTX6mC/EhaiqNOZpmMXh53K7/p4ssZs/K1mzKrNODApnLKX2wRMJS22wN1ba4lcoqN1SRb1erQ6SBIYgdqFJbgSHIUy6NuW+7pRNrHIkvlmLT0xcm3bRuDzR+FOy9Vx6YMjs+7WMumY+/8ggOPMcdBxWWSBnF1qN2++sLls5S1/gW3KLdaxNyyzO1L+Fizndq/nYFHJLmkCSVbuUqFELcQFJyQyEjVI3o2BD1leu3ojEmKy9RtFYmcye+3kgVtkq0S8ztoONaMBBCtKo7VEnJyD2CzydBdpYQRno0iBSiR0GtcHj8DCiQoBS0izXy1siQDsKZYoGg0uiYVNWf1PJ1C1Ssaty5S9khxd9LRTFuKkpPXm5RA8jlqzo89S+l3pNL3Ui/7UHaddsi9V3vKy5vKKV3mzQyyqccKlZnF2qOHHJ1w2MO488SkLiWKth+YIjMiZc47zLz6/7kyqHaTkamK8YxiWE5LZPOw3H4rKX/xfmdnn6gCglsUeGGrNZ+qTlPuG6e1fpZ/D93Yxzd3C7bhN//////////////////////////////////////////+Uk24kif/7sGCRgAjxZtRp+MNiAAAJcAAAASCdo1On4w2QAAAlwAAABCUm5RjqIGwMETM6x/nWchywzijQtS5rDv/FYIYCrlEJ2HmXeta9QzbLVhRlBE1CcrnAEPUPWsuYsLDQl9BRqhjAkOJqC3zTHdYUy1wmuNaTSgRdyl2TDn8Qkv9GFGVhRpKa4sZWFBIHKhZmW6AQZRtTVaZZlCxpbR06GlrggKBojDuo5EZGr972JJQKU6fl4UTXyZQ67aus28eksAyiURdnUGu7BcMwLbnJmGJazNokF9U88k69zjYUjhX32omnSJlUFtGlVPLKSUVp7UbtubHrDlQ77SpFB1imexuS41uvK80+9DrY0r1T1Wlh23dl1qGrMR1DO6Wnps8LvLkp/d4lFuRtklElKIYiQY06oeSnNYiV5bGmFsbhiTPNFGn7gB/27w07kpBIgVMPM4vfTN+rhRVL1pqAlgiho8qzRqBecMRM5EAPnEWTMM9QFoDU3FBoGpH0WGSOLsrULfJXkxEW0vE0wEVTldqGvZSpbJlVkq3vf1kqxX5qUT0uClU97dmXP8wFOlzZqw16/Kb1ZYaJomsDLivI7cCOU/VqI7h5dUjdl8p2JUr9X2lRd1YfjqsD9qNKXRxB6RS6NqYxFVZM6GqSTxWcfaA3ai03AU/Zl2cedWLUkea9L35ymtRp/pHFrL0Lqn5HddGSNyb9iLqRJ2ZdKqkvobFJGZVaty7d3HcZpLFmfr2a+MrjNb////////////////////////////////////////////////////////////////////////////////////////uwYKcACz5o0+tZw2wAAAlwAAABHMGfTYfjDbgAACXAAAAE//////////////////////////////////ySpJJJ13dvwCUBxA3HmF+MVmQavQ1aOpDMR27SxFpsQb9XNKYDqBJiw+0xW6PxJrLXUk22ZZTS5LlW5l7M2fLuZTKXaZsv+CF1PbRdvwS9jSm+ZkuqdZ+4LJHnqsufmQP41yuzyJWUu4YpIFGj2V6RCAY00utA0CynVSHpW/r9YwGziCJTOxKG7dHMv/JpHIrj3QzYqRFd2UAo3KrQ81FAa0BYZfTEkUw4qXzA2HwQ30MwxPxeX6mu0P2sfufjuzlnzCrvDDfaLVbuV3Grr+VKbXLl7PWeqn81yvu73LVTVrKrvedcDCU5W42Umm24wRSLNXtMJjGyUu9CaaLRuMuqyVlcNRx323k7T5cmk1NsbDXen2YRth6rX4sKgWPXauCnl+WCoAUs3LCBPk1hTakaLE1uxl1lLs5W4XYeUlahilReZSeLcOomrMX8hI+TQbwQJoqgtpTOBcR5s5ChcziPbTgunB+ZMdTHsNROxIiiSEZdPXqrnOpWMz4uN3FXZWGKMpMvmaOOFDEOZLLpdPU0h72IrmlyVEeLGg5esEe8eeSk0PMfE7XEarzUcWrUTc/ngRHBE7rWrHGhxrwMRIWGvD2J+3vXzhHXF4H3X/drs6Nv+PEf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAKgWlN6xh7eAAACXAAAAEfuaM5rOXtoAAAJcAAAAT//5RlrUkJMbbcYCl8ApCreZ6YKQAZhhnnCaSEmaKuZhjOIcZGzugLVpFqoGYYWlN98xzjieLUnA8X5MUsIHlRZBQEQorHMsFCIuQuRiap3HTQWqg4+TlrjlliH4Zjb9qlUKwhpY0ifCbenSwIaeBKUJJaTU/3hkqk0gu04ahum4eajUpYIbGdcWhpp5dIQXcsaQG4bhLDpHroaBkF/N9UkvX0gqWAu5zJ0u5zJo2C6nEaJUDhEAUcFLIFVTKNVs93DENzgt0V8+u5WpG3lsjPp2CJDeTOo8CDBzHreLdgiXntLS1ICuxncsd9BmWbutxJ74zpxljRvCi379X0///QYCbkaRT1slxLkw4L1nJIVcZwgYARUcMDgt2Tqh+jZCsKyJY0OQ0lUy8KBQMOKFBS0Kt6QsCN+u5qY4dAkAQOCYQF80qXJbGqYWGIAyFPlaq+lzQy7rywFOivF6LYnSaGAioh1I+ZwwrT9TmYM6qcC+oYJsO0WlOkFZjmVTCyqlHKFWF2QolJNSMBVD5EaJmJ64C3KM5VS2GiqFE7a22RcRjkO6EhMFIFQxi0jDOVJLVYClopsT69bWzDtuJR+zQsz2q4rSvbX2m1wcJ6vIGo1KyTzNzuC6jarAnf5rb0puHFxGpq8eDWZP0n///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAtDZdFrGHtqAAAJcAAAARy1n1es4e24AAAlwAAABP//////////////////////////////////6BTckSKcbScUdNSJv0pwMcY7ZdovrL0y08mVypuUVRUnnlvJgJXIoypibwmc8rLoNgoYFW+sGy9TlYClSHZ/Fkt3RXu6KiiIBVLBa62BuBH0rGmNSBziHCxsg6iWKhDFGxOKvxuWdzv5GRsbTLCNkzFpPBzgzTQ1DGT5zKA30OYynIAPwh5L10JwLhFS0cuaEJmDdcx1qCbRzMjchCdFEe8ZTGUtGkyRkuwo6jnBkkrSHXEXeIMPDlEsyLaZmkUC47Kp4J2NjQ/XPj2w3xnC8kCsGPnMj+DXOH8fMKLAjWpHxjyVfdUkluRpJONpuzZC4AwyoSiUIBx4RMVEBm6/nYSEbVjETddY1G0+GUAVhnilRgAMfLTvE77cBEMXVMYQR1hkAwYVRC9KNxCGrUjOzkqAhDRgBBAamKl7PS7CaAQAmWWbDIpNh4SQCOKVjN4Kq2KPWOFvLt+pjyBmX2Wzs3l929hdlEflUmfalaAmEhxfIu2j7PuK5rdW/aez59nMfVmEixfZqsv5Al6YZY9ag6eUOtcifX8rTrAm6upMwzLLFnGvcv71Qfeyzwt53ZdjNUrkt/QxByHLi+b6N0hiP9tS6NymeiL8R595W8jkWMYbo5VLMrVLaq2cJvVfOvG71BavT0rp73////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACuVo1us5w2wAAAlwAAABHi2bWU1jDbgAACXAAAAE///////////////////6rf6gltpOPqOIA/OMoVIBUqJQXwDKqVakWBL9Ygp9edqVOU863UjKWKsuQfL/Agz8r9YuX/hoeM3hbZx013vLXPwIBNcHmPaEGzaJKoTVlcAuVQEKUxU01bZTvU9llllzmrWs+W9/WaKhJlbEmfwTJ2l0MXkjkP+0RYjQadPtnqpVYl8YuK+xedc77JgJEU08lgoA8zMWtJfq0rFdB2GerOazAkhlr0ySnqwDMwVVtQnUjsTG52teu4YV62UzSWoejLgRqGWjLzf1+6Z+XZs33+wl0p/D5nbz1I5Gq09P2qGK8pandYdvd3hdv4/VyuZOBSSUpIyC42k60ox1o7ogOOs6MgbZIKB1CS0jjMdSsLpLvZMgnhliCKK5KVVRAUwkUEkqy9KZNaKM6TRashNTpf5zlkuK6bLVMmnF3hqha1AxlzEIeh9W1nK0hEi/E3SJ/tqvYbzb04atjMt8RYnWG8NTDBZMYmC4ep1Z6tYZB3BajSLgGk/X0QQY7mI3Q5WxZIKNo9jpEgK9ojnPMjIQtjMIiPhpNDO3skZhXWqOEbsv148BhcJ52Ca8lqvWZWmYgzEaUJRaYvWGlb6cXCKxJJZXKoVqueorLLHePV6NA3iFEn3TW3ObNmpsjYXaz/////////////////////////////////////////////////////////////////////////////////////////////////////////kkpyWRyWRuVsAhiFhDCw6iASf/+7BgpwAJ3WjWa1h7bAAACXAAAAEiQaNZrb8NsAAAJcAAAARUQugAmDUV2KM6lTLkSX0KlHEwWkYihZhDgDIx0IJaHtICHiFE3QSlOJVF/H6PEWUBhI2AWhNHqaSCM8uqpTtWhpy6oy6TfwbHIfeZ4Za60T5FoNlsOySLQzIZprtOvUUEPSL5MzY++rbSen3GH4ZEsYs8XSIjq3KeeS66sFNflrvLekEVb1gTZ24F8m2fNFlgFEy1pkDsFaUwZ1mxtoypssCNKmYEazGHmcGMRZ/aCRMCdtprpQ+7sefNrMdkM1G3dpoU5LdnyhpuryNeg17WHQG3ymsEPcy1lTvtdeKHHaksgjUTkzhSuNPrKHehmKP9EbDyx6TurDE8/sxD8uiIJLcltstsjkrwgsYpUAzooGTCIEkgktGSiwLkt6u2TDhbwzUkrTIhnYWAjIuxfUWI2JUvYcx/nmTc3V4YRdAySbHkEmRhkJ0gydHqEkbxCyMDFbVdRLFsRigRq5SSSuimpmfnofqUaDnDjEuYpzqBVmqAegjJYk8hDIpyxmgLglFKSUV1XmgoE63xFbKeKdUBy0VR+OKVNRDVYaKBEPDAAQT/DQJiaR+l9F3T7CrkMQzGn7i01e1fMz5TrtWwYDirb4eNjNaG3wqN0PFp9w5WePaRzZdyebucG1IjPK10dWjxsRrRIW8eZ9Dxi0lv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAsAaNZrL3tsAAAJcAAAAR3Bo1OsPe2wAAAlwAAABP///////////////////////wSm5JI5I225BJo+CCtxXixxy0u4EbEsyEtEYe09thHUTtHowkZdYhBR6WFNh/iTnMrTAJ2zdgVAmJQmYXycsR9nqPcb0ACZDvM4rTcJ0B2OYkR6Obghqdho1XxE10LbWsWMSMmgkA+Azgn3ZPEYIygCbrtyPASiEmYnUSqVItIJTK8bkgt5DjYXBFkLMp2R5vHmo4rAXchSrCTjyLoPkR0E2Qc5hFyeB+KZakiSt7Nt/iJvaktJmNGnfSvHiscNXruDd5uBAiMqxDV7dndqR/jES7x7DT7cbkVXqhGsaHq9VvHCCyObkxw15zY47yQEqSWSOSNtu0yHz0oaFqJerxrJvpDYQRKgOYGv1lzSzBDFpDUEPLQ7EUTQvQwEkStcIpDx8K7aEKRaQ14rjdVBcSfFxjJMzB9iCPQHIPBeoYTY4RLRX+3FaUVbPpo0VRktTSEHWC0KYKhYgDCcRcSZc3S7FWXZJqhTQEaez2I2Hk1xEmsJ1kSSuWE7FVqELJ+MBfDMOgxzleEiOoNUjzlem4qoymhOE0d94szE1xGqCzxVcxwHJ7Cj2jWpqlqbzNSLJHYGlWsq0xt8V89s2xYyoRD8dI0GYoCUixE/WSTl9QpjUxwNxzp0v5Un+aZPyGhUElsJBINmQyGQyLVbP+GWrpi4oDD0y+LM+CjKAFVQEhphF0fmvAkDBQIvQgCzJi43hiREBwcHAc7xgcMRiEWw0ApEB4cH5hiBqEg5ocQ5hIMxOHQQj+YDAaAQTS7M//uwYKcAB4lo1e1l4AwAAAlwoAABP94XRbm+gBAAACXDAAAABQDQwbuaWF0YehcFBEMmBmFgmDgoLACgYAkBYVCYQgAIgUDASMTiKMiBYMUx7NBgCMDQUXqk2YDgFCAcEbGEzGtomiECi/5gaFZjgAhKDJi+IZhMGJh+GqMbAwcC7vgIA0DzA4CWvrlWkoeiiykHBEYWgOYNh2YbgKDQDAQJGEwHCgEmG4UmDoKp1p3pxq4LVroCAAHgMU3MBgLMDgWDgDJQCDBnMHA2BABhwSGIwgGF4kkwOmMwqGDYVmBIAxpdgBAdCUYFAcYVgqRAki4AgEEQApsvosGEAOjml6FwHGgLbsYrCkY8BOZJhuYYiEYfDSNHMYOi4YDDKYShQYUg4YRh6Yxh2YSgSCgPMFwZCBXQCmAoLgYG2rFt3iZOBgnkjIC15MAi1EgIKDAQAwGigCmAwBllA4CzGQejDUDzGUADJwUjFABAwjwwdAoFYADwwDC0waCcEAEYVhuDgMEADjwIGBoJmDoKgADDDkHQECaJkNq1PMh+XSa4zton///////////////////3f63hrP///1v9f////////z8bAEWj6VEqWTcbTmgxeS1Ekpa1EOPADRoYjjztgj76v62rXoJXK0CeoFHk32SL2daBaZyoafELiR9h16lYpVIPqyu5Rttpwp6xHYqy13IcjrNZ+fidPBc5EozLX1pauc5N8gqclEpbKyN96G9IYu29e/DsJxl0bmKtE6dzB5H+jMakt6QR1nrjNyXzhRymbfGlgWO8XS+VE/jiQljjhRx+X/eGHaSBZCzCSP/DU+02Zgn/+7BgVgAHO2TW12MACAAACXDgAAEdEYNbLT3tsAAAJcAAAASQTb/UVl/4s7MVqzz626XOrWm4xEKdyHTfh/3FkbuxiVTUjpJfO087ZjUtllNV1u7lRZTOsLNTdu90bWqt9dfS3B5iox0jSOZmExlCRUBCwRdDrrHfF44Hf4hAixODTXaDEqQkUwXxmkhS6YOEthwGiJqIwqiUiTKtFs6JLGZhJThY2QXMtrQnRNijDVLsgotLiuSEo1TlMmhCksrtxd50xTqZfSrWSVlRz4uS7ShfTRZBlpFKFtK1QkAJsQlKpM1zuXZanKOsbsGMeIZo4TkPI3U6imBPqMgpd4RXoINUcJSIWGqfqdOlhbnhrUVTmulEzLkfRBjiUz8uJi9rUyYT7A7c7LuHFmnerL1hP1lVVUOUSeVyuntSerFPmLRipuFysQxGEB5sptolSYJXoDRBmE4IwEwk6NEDVkJEozucBQECkpnpWIDcfuHtA80Ukdk+nIS+dBNJoiDUwketxI9qL7s0VnW6wpUaHZCoQmULFTRYtU5Ld5Iwd2W4uCoqt1Rxs8efN4Hff6F0kVlMovtyhVTdNJIPpPqT0ZrWauMtgVqEiGgMvY03tO/NNT8juondbyBmGNHXJKIMlrx6dO6zdkJCVgidsbWCaeo4zdoDfrpymGlQMu7rXnXhiH4GvQqmnr9rGVWYdf2WxmM0r8xWJQu0yt6Gpypd7sK5dmMU1a3Yv43qaAoan8r38tWbNnC5LsKsFxiAbcFzPJHL8cN3qtJlhS8s///////////////////////////////////////////////////////7sGCVAAodaNTTeMNsAAAJcAAAARzJo1WtPe2wAAAlwAAABP/////////////////////////////////5JBSUkblkbcUwM3INUwBXMIZnAciQWHFDUwmFrxX44SRRlANyjAnTaHwiy8D4T0YdyAFxSgsIuo9IMEGyA4hIhcgjwGYG8EGNJywqtIcikUJoNkCXDYDnbEYoW40tNaedafQGeC3srlhabz/Xa+hkFSOSl5+CTiOhqQqQuUdtDmZsfNkONFXTEVSWSOVOjbotTx2FVLYM4DMQkgoXo4QkItoN0I6N0hQmw8kOVxpSzMTDSs0WLFpGjeO/tCvMxNsXKtVsWmYEVQxb31XGNZZbbrqLSNv2tbfkrbcviQYsCsPO6W1F94YAJJySOSyNuNxMvkS1A0jBi/RbZnKqqm0RUTC5y2G9XGrxNGFlpmAP+3zKFSqyrMVuhlYNnCfLS2dK2QHHH6cuq1xrjnveziPSRb6ezNB2a2TFIvInsxrCFtbjD2MsqT8srw5esamqKWQzB0mtu0+zO5XEIfn24yBbgcprzMYoy9qcrgebu34ci+U9EKVlMPJzPxWrXanJU/kMw26kIlNqVsLduVOEwOR08ilGF/LC9Yu40k7jZv17GVyc7Um8Ld3We6e1Zwyub3WrflWs1autVf729O2d8pKle/zOtS6+vlW1Fbd7tytVx5b///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACu5o1Os4w2wAAAlwAAABHf2jVa0/DbAAACXAAAAE/////////////////////JKbkkkksjbr3GsnjoAu+1sDHko6WNJewEraNBXdSADZS5wFyOo1TTM5JJsWhhFoQZHoEEolxCyWhfGQX5Tn0xOSYjyMU78/CmOsCyG2GEIODBLpRjFCOyiPSM5lT9z0IfeYkMbkEGSlQeHGuzzeNlcZw3UbRM5g7eqoKAsfWBvRh549IXmfaT/Gp+VxDcehqq7UGX7M3L8YFYzEWVyxrMGvo9DhQq5BGTzU0RocsM8LGqk7U+1bs4ZY0tf7/fyz+zfwyu2PrWLN6xasT1iJ38aWtblVJLdzEqlcdualkPU2E7G5+axpLFHKqlaAZqC5YCS5LbbdbLJK7AB8ygu8KggNXLPxKAhfAa0GYQMwZRRIkRhVQgtQ/BBIvpAWQja08b/t5DjUGMwW8TRKVyG3hnCYY+15yJRGaRgSplO0rV0LSTxGAArBAw0TcOq8ZqhvYTyJuNBkWjNRpZFAmT3qJCJ2W4dApJoqc6xNTHL7IyKyZD6HJthUk5L25gZUNbHydqqWtTopVKJforiZKFLNLtRHknlaXiEq7QFcsYW3sHT6DCmiT1cHlm+Z/BfWfePJrDZZP4jY05Xu5K5kx8t/jVkb30eHNWnePq0kpeE3zMNoy6lf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwALeWjV6xh7bAAACXAAAAEb2aNPrGHtsAAAJcAAAAT///////////////////////////////////////////+Uk5bbbbbW5G4jCR0QhGzwCnXFHVVWbMJUBS4U5fGHAKh+3YeiaZDSo3JnUT+uOqVrsCu08ymDZ4AcTGjuu7L/f3KX4367u0s+pktK4cyiN8cJ0tUfb5VQHhmZL0rpEgqyUhISClQCqV5PSxmiDNhDCQo21esqJHIS+UybXbf3t08tyuER9GhSSslm2G2SKjGYmGKe7a+eRWBWWZ53FrrPSbGZJIjmdCDVijc0OLFBhnC2KBsTh/L6hnnOZmPBzVjnHdt0KHFddzcNTU1tT3vChsm9NjFqH5sSWw1tmn7cBLbksktsjbiAOLJMAEKawQB636flYlKysYEWdOuSAoNNDEiRk2CgwkBEgQGAKopzIULnWSr5UjI1NkcAaBUCMQCL7GeIDIUQRD0PjL8z8sTJLgshOYkCqk268DIjcYj7dDyWDmRDaFCFEb5oRIRAoONEHnpkSIgPGMEmiCm3Bm6nGKYnBFg4QZVSHK2mmYYB1AyqMy40xIFhSlKI4EBEIQviX6MgOUi6ZZNGZWEIGGBJkwpOAs+XLBoEwoVPNrbpLlMSNQ2VpLbiIMXxMwQSNLXsnEAIFCIcLcLNMEES9L1l9EeTCiQ4G8EtVnTOMUMFAJMKMUIHAJiwK9mhAAUNCHvBAZJlCtQB6Vg1vtQQFqHK0rPAgBN1IFGtIRn7OlSRCKuWDQKF6XjC2rwlTd16d9FNHRafFWHtyc1ibd3+hl15hgbjMElcEyeDXLdB/P/7sGCnAArwaNRrGtNsAAAJcAAAASLNo1uMvw2wAAAlwAAABLr7zy74lDMxDkfe52JmZfskuNJt1V1ZjcmAGg+jCnxGAi1tjbpLcMbb6SNYRMcB0IUkB/nyS4RcTw5DEUxvmwfMc86vG80XEdhKy6k3KZOqM5BSEBU+SvIUQtxUIpS4FZIER3TzZ+tJG9G9WZI9zF9IwqSZ6hMTiTnNgFbHrUSmlNWsDQTvkHPPd1Uh1aBUIWMBVtfFVjW0REGQJoZChmDAkwk34MGlNXZ2u9CeHESYR2NwkRokW8eVrMqThViUsGVhwodTadxljqMqS1ZejeXfWOrhr7roCF+NkVZZZeuxym7tPe99UumKrnjbps3eFwpZVTricNO5BUmuRHlyWtbpnTgmN1Ka/CJPI4BjecbzoO1IcgOVwVOR/HOmuz9A/kUxtS+5X6AIpNuSyRJtzAD4NYa54DKSIF4elfH0oCxRDqGMbxrsiOE2HqOeAhShLEtIUW4V5ImYSmAn10cOohfly7JYeaYJyypNgTr8uehOEWpHJ5k2RhqfZH1CfjDzL+ClO5fTgZJdVGFaaxWBaRkwAbRdWMxBmFeTBLx6kANQqCXE5AvJohJpC5uR2kpnXkA6R1RdysBPGGNweo6h4pgxG4Z5wnOYCAJsSUdRcCxxyTuiWkaH6qFpEL0DR8qZ61os9kKJKV63c3nqkPRIw1StLSIbm5CrHrlfXC27OJXp5a22Mjd4EduS80OOyrWYGW102MUOOp3DMTMJ5/////////////////////////////////////////////////////////////////////uwYJOACVVo1enve2gAAAlwAAABH4WjU6e/DaAAACXAAAAE////+YS4lJJIk0pgkJMDmH0hgSMPxVl9WzpVrw+RPA8o50MA0VglLuMdZci6n4xNz1RaMsvjQk2lDXpwmgYAlVMQRzhJVXFhYFhUt2NDFZUprhJGTs2UcgxtVTigqRf6xlH4Cm3YcCfh5ZqWqc76NDT1LxInNecZiT2y1+27S1nUPM6b1iNdzWBQXRP8qjDrGVG1ZGlPJA8VcVochVgcFpcbhpxIb1QrD0V1xm4tyYSv9wmtOTyH7rWHnnlsX2rNhZ405+mfS2Gnek7rR7OSV4hB9xxJrboRG7hVbLEN6f6WS7N34znnelUEVoLl0Vh2luzchl1yXalHZdcytTVLdCa/7qlF5SFAxziiFjIGuuSyhk8HOpK5bE3cEKIQJoHWqRcGBsS1zVPEO8pEJQlOIajp0c0VQt8blGJUCPFI1KZBn48Nc+k8gWkxdlr8KOrkaensQjeSCxZiuxGN8kua6kWEEw1+NWe16mBSN52UuozpY7swfcnn2dhXUie97HiZ+7snZ1F1bG/eF/HSfl/2uuazl3YCinH11Sydp66HdUFftbTkshhlfTxtZij8P8vtOlqz8Om4LWc+Q9F52FUEnzeWVQmWXq1avLb8EvvSyqYp60aluczOQ9Ko1K6lqbl8gjMO08agKHqSplWjWpmnygmB+UnN4414nMXv////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAKmGjVS0/DbAAACXAAAAEfYaNVTOXtsAAAJcAAAAT//////wa+7aSJJUmhS4i5UEOIIIUMwJ0m1oEjJ9ciwrQJ9xWzpuFqF9GcovSLP41xTR03/cBkgicM4YyIjkGVXBzdOpm+6KagaANg7X2mUkVijvLAyhOpcsPi9O43zFE2Q9ZOtGk7LGhhMmAbrEJceSoSKlG8iUIO45xVDBI0tpxQqtPq5xcjqWUa9c3cjkcquLsqFWoCtPJEvbE9SiHI0tiOJceW1s7sGWTpD20/ULPlVqRWr5vSKDTzczc9eopQKx0lV9nyeSlUbuNAUijO83VSoX0djtVqqm1knTArHNxQS+r0JZlcrcNyhgJ19LSd/HZFypoCwq1XMo3JgQxeAKqtbpbZCF5BizYyEOO1YMrPxPZ7obag0aU0y36ZkUqUHbVYY0gxgAyDyJsx3S+JxIF/By0eCMvUojMXMiHa4EJtHTiWSADEfTIeFhF1t4uZSx6GV2V3w24IxipKZXn5EOionx9kxJawnQI8TcyTjXlc5kJPI+akrDVnepZCUCuHMcqvFcetrOebNPKqH6WSZgPi2D6uQpWLCy1rlJnrgtqnT5b2RygSKVhjOR3nyJyW0v5tSl7XKXVrdWZ9OhJ+L7A32Vb1xTyfnfuCe23KdioxatBxWmt1pjG94/gw4OsxPnMSuI+dzezluHaekByh///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAArBaNTLWXtsAAAJcAAAAR69o1dN4w2wAAAlwAAABP////////////+Lf/IKbaTlxBMEtYFCTXV5+0UF/txbZuKtMNLf4yiq2WXoyvlKIZaUY0NsSkCGFUQ0R9xraKJmwlyhRwYA4YgGyh9BLqBw6saKkqxZhCzHWTrsP47SZ07lD8dwp6fdnPszM2HwdTGKT0/Dj4P2piqkrERWX6ZGEAxhZeJgxyQji8tVYVQpzo/KFB4AjN9rT8uBA7RVUHxXE7DywpI9ZixFyyFmkvgmEXK8TtTLMp1qDU07c1V1YXba1UhmbkUsjD/ug3WBn673v2Jy/bsVOVolNY0kut2sruVS/azxw/DDPLPfLuP3csdVrO8t3quWsM5uvIbGNrEElONokuW27SgdHzZTJHU5IxVAXmkCj9+WN7BrGLMPzq+bLGYEeJqUyjy/wyNMCFRBlBGrp+wZC2cuEnUhy6vlfjWh4eHREQwdRxb8OJ4101pl6YyW5cpqlqUzmpPTTVjedmtSOPPVad9aaAmppEpQsLL4IVFrlB4+HXX4UdYIjBCmxLJITuVKmDr2V27qxYYcKBUOMd9x7MTjrEINoW5NJaZL4tYpaOtMZv1BizVVksnVWrB8Re96JXJYciMLmm8X1D0rh3C/fp4HqymrGv5La3J+tv5RZpt3O2+Y2sMcc/3ez3y1nWxq518pTIMs62qlzeeU1nX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACsJo1Wt5w2QAAAlwAAABHrWjVazjDZAAACXAAAAE/////////////8AFySMlSW3bSocdE5IAF74eQ5zi6Za1R56Fgubq0+DuJava/MudxHJbVHJRCgtkKvZq1ADWT2AA4CRzhhDq2rLYGCwi4ZrANKUOXi0xKlkrLH2SPSKeB/pJuvQz+VFztJO/ArT3hwnZ+khpiDfvojcXAEYUuC4I0cdESpQFlZUMmxsMVoolbFnq6blBTbRKB4dcF6ZBAstxqxJ2rlWQ2ZbK3Jo4lQVsm4tgaUqN+C/rPowxaCVKG9XMwWB3cWW8UWbNDdSlrdpp+Scl2eeX5XJircqRuxGfuWKtzusMt57rWcuY9+7d3Xwq1prC3Wwt/KbNzOYyrAAXLJESm225kmSR+BYMywoymlxlVt24FwljgvxKHQhTz0bTq8NMgXdCVK4GBpH+jj3rEQ0ReT7bd578bdpzkGkuiADEmkRKVU2WdeHFkQI2W1P2MOy79dmpTKI03leXSd49tu+rF3LChGsDhGaRArMPFJyDSXTZ6oawll7VXegeLvzII5LXNiD0ShmEAz0TZC2dPWae+U0r5O1G4YoIzTdrvA+ZfR+6Wlf9SMfceGl05sNZ7LIBWHazuMxWzlZw7al+pXK5XuXVLNzCxOYcqf3Hte/hjj3dv9Y3q/fpJdS44dpJylrZ26bO9Xxs8///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAK3mjU6zjDbAAACXAAAAEeSaNPrD8NsAAAJcAAAAT//////////////////IBckjIUjbbjhKCjhzJlCanymK6rSaOgcF2W9ck3XrdVQoSJ6dqdJCdKyiAHYHMIULkN4DSSytuZJokpJyLaTEQkRkLgWlcHMS4nRKjSTZdwIMzLA1X5jMZp8r/z9rsVidRqDcpU3zxQ/LtZRBuEdlLJU5WGoAUEpiOARFmkhlhl1KBMSZ04z8uDRUlqal9NbksRkLgstVzYnK8qZ006BoKg+e7a5KYJhEMxOKrthKplVoeXM1p1prOXy+rDO7G6uclnr8anrWrtqW0lNbuSmvr9blOFetKa2eOdq9RTmdNTUmVJyXV8buWG87lS5jdpqOrVJLu2tslsrbkoBKjjRCcni0FMCkblJZqG5ZE5C5Etl7/xKVLmXFddF9V8NdLwAVZUeyJTcOqgJjLupvVX9kEZRpCy0OLwRqPPNA1VTiLw5BBVqFe2+Zss0eAz3kjsZYW5U4omIyiamVFIQdx1kUW8djsByIwHCNor0WW2eprKeJRynixGaC6jS4kvdznUKdjx2eO11s9gw1xpuWIUNxSLLEfaXrsLlAjzO5nmm6Hp3Eb3sK/kn1Ho2Whwq3ccRo7k0wV3Hg4vJA8O7Cs3jywXz57O5MUaG3rlv1Lj///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAt2aNNrGHtsAAAJcAAAARvlo0Gsve2wAAAlwAAABP///////////////////////////////////////////JKkssacjaSZYAWsZ05ESICZaji9r+1Ik6TcFrr/cTHclIMBVj7EaYrqIkSRaQPxfVIRANUVojMMuUU4UJP8oHYfAOVGLgm00JWKRRsqna7RHrxEw8c/LLtfZG9SMs1Xi5OBSHy/VSHnSrVY9E2UxvZhnoa1Htbv3s7Om0RZ1Bb9QHBhVL9LsrtterudCHHaMjxj+T7+VcuDNEXZypC0iaUTfS6vewWByeMsBSOCqdL2nsq6qoGFxVEBQz0isC/FVasiJDKptmOhTa8YKx6M6sgK9smOtRQoD+JM1HEn26oRFHeIiGu/2tvYyOjOtQ85dZ/1Z35V4/DZr+UgVslVpkM43JTzY4Aj71Q0+zTQYNMpOweKsMy5Glr78PC8lO6zCioOB0mH4jcy78MRqtSyh6nViceik5jFH2oZl+bt2FmcHsOPp6xv2KZvSzXrauOFpmNimzuWXh7nC8UERqnbpFC9hx2fbJFZH9cx3DbQ6Tz7CSgNjG/k1ASbZpUtmWeOftFy1qZRItiQ58jmGaLO8vHVqsuxJNvUz1pZHr1wKxZSFnxxM7o6nhpnY1rKludEOGsm9RTF9VCuay9I2fZ2NZ0ODGtIf/v///0f//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAC+tpTnsYe3gAAAlwAAABGhGjO41hjbAAACXAAAAE///////////////////////////////////////////////////////////////gFSSSP/pWRecE4jACg7UPFooqposPE2Ryx9YAa3C09JXD1xdLVos5T1WMVKHwbAHBXcHzS4BSYaXbC4xNOSqki+uDCdmLtHBm5Dc6RzFLdP684SsIzZaprHGVUnvkiA7SSUyYNJ2sZWXcSHssHutDq009AmNGIEh6WjL0zziZwqHBdOVb65akbbhjqWX4MtaxInuhM5LCpcW4DtKrsyqu58csmbCo/QVLB0wgo2V7Jqw0gee0RnzTxDVUrVYfHrqEbri+JKUsG5WcQ1K1Jp//0kXNtttbrZJKr0gBKYJcGRzREMz5Ph9IPp7kDyiPQ+GB9ZXr9iVo6CrQXA/BbjgL2KkxQNJJnoYyKU6mNEZJcjKbEEdcZyPxSH2pFa9uomlt3tyvWYv6vW0MWoDGkFQ3xFWojofQH8eBC3RWNbU9xV5nMIlDg4uFltlS5yoaqn6Wiq1tRzYu12oWzbzbgoGJ4n2OZOHX2Z23JJqa1PYwVq5Ztr1fXKdetilhNSQVjCdScgJx4oEPhOletpajK2NBTv0cOFvXBzsZY2SOwx15hcWxPtrDOuIU8dFs71So16uleoP////////////////////////////ILu22stsjbjtJLk1F6w4OlIZIYFRJyTpnY4bePV+NgxP3rMXgOMXDAWE2s1MFPTIzo56qNWOTk5EzU0N2YAQlmakI6SgZPMGHh4oMVIxIzMICi4JiISD/+7BgpwAHumjTay97bAAACXAAAAEq2aNLrW9NsAAAJcAAAATRUzsBMaQDNAIxUdEYoZULA0lAxmZCbiyWYwRAAJMfDxENGSARg5KRG5kJeGJjPIAYZNabCy42RYCoTQgTFnxY8ZAYFV5v0JgnxykwjVmzFmNYgaWY5MJKTWuwdCNQkCxM0IkGoTVjwoYNAKGQYsLAgoHEIZZ/AwAAKIIS25FoGAt+puwJAIvRU7AlqPu9ReOTq4bCzdGxHBPdOt032WI6K62eKQceLJzqfTAeNE9h8+wtl8ffSCHcncohDcvjc26D6NkgidvYzfKNr91/4nXfR5pBSQzt3JXalFPT6b+GJqmj8LrRCpWhFFXxm69eSyGkp+xOJQ1MU8uiW5+K16Cllr/tJNpNxnQNXnGFBUubMWKCjTDr5dCSP2X4Uqe1MCs2BAWqgBDAUIacqhbsvRWcy9FluNaWEag87XwqK6jI36qxJ5Yg3iZaJLv2JfL7EjoIzVYHAT7QDB2MKeufgWKq3lHAotPRM+HWEJToiBCi3MXaKhQpen3Hl6Q+7Tpxa1agO3Nw1ATLIbxct8E95U1OWyqIyCI0FJSO9BdZp8WirZVruOrpO9IpQ9JZlKX6FD7pWIPrCs+YGpg6rT2SuNFXorVKSfvSKzfqS+csxuHoJeuLqAPZDsLlFyWS2/N2I5jLLFTGvctVZiYd+fzjD6Ql25dR8qXaeeyjHblS/lR1NEiv//////////////////////////////////////////////////////////////////////////////////////////+q1/bTjaTi4P/7sGCnAAoxZtTTWcNuAAAJcAAAASD9nVdNaw24AAAlwAAABDE0wVREecevmfgA6onO8AkGkKnKyGBuAPBGErlJRAQcAr8wqssFl6J9w4nvDKhT7O2jMAkgEclCMxWo1otoKEaZC/HPeNTtw0J7RwEAZa49hl8FOxjHG4NglLA6SZkVHFWx93EpumuRi/hlEL7ClzvMr8UEMnX85JcNC9lwUBAS7QyQMAFSkQjkJisLhuSPpMU0UduglsUdOXN6xt9kSEE6SSYZfBc8LoH/dCpWYPQxp5I84kThUYr1b+qmW8JXZh+WR/kprzE1XpaSGqeVPDYhpyo/EW7TM9GJuHnjjUpl1BLJqVT8ssuFL43bivOU0MvLLpdSz1NWvS+X8tcnKCRUuqyVG0nFAyxFjQwZ4WGQghhjuLAN92CYFWFUwVUk7bvIzlVNP0VKLFFKF9Wkua1FPJE1u6wCjjJ2nJQC0QcZji1lLoEYCtmOFQz/gkT3QHRQ7QyqYvwwqMEpV6QuTCY3JYzMV5nHdTtWxlf3nTR+ni8JdxLZUyvS1KRhVMWqQBhihIUoYDBrDEOE+3FsrxyGnn4lehmxPxliNV2n2bE3Frpb1VUIE0Z1Y63nXGd2ca85V+lcyEWqV+5fZ3hYvVc5HhMx17bUippi3KrEdgGgnotzdx9p/kMwHDcvdGmqup8YmpXTW7shprtyTUlXmrE9lOUVS9XxqaywsV4///////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACo1n1dN4w24AAAlwAAABH4WjV6zh7bAAACXAAAAE////+SSnE3EnJG3Ikbk480Bqy1R1nI7tmZEwVQyMl2WtsPgq4kSSJHgJUhHUeJc9LsvRAcPuM8SsKyK5fYFOdxrzVVcqZKZg4L6WlVlLrssjUy/McgZrS0IxlAKRHbYoLysNTPJ0KeQHrHlvszURBzAGwCENoNwCsEUBCIeuESTE5XQwQuBdkmcUyVjNjbDoqUUuE6pWsW0XEIEGKLUZhK2VIKVsZG0XEP1cMxciUOTLKZLxwV5zHQd6+sxojkXxlNOKhjIdG3yyu2uiSnOhSljVSkRiJbzAqQhWjPKJUkrXSgVjfBYGRPpZsbW5XsasaurUy5oe5PXykgsbG4qNyACXI5JJJI25BhUsc5WZVFlSlNVnMy+cAI5PyrE5Kj1MItl1SBIk1wblxlK/YKtOS9UDmtxa4BKYPSyuVNNSpQddxfMMtOkVeLSu7Fn9iUaGmU5wOa4fKePh3uEupoERrZHkZkQyRh2gy+DnL7FKwtwI0ArE2ZG5yVqwXl8aLqTvGZlwo4tEORbK3qIv7ihx+EyZy4mEW80WYvZbyHFxQSuLwpCmCEocB8AnCXHyN0p45DGxYNypPz+5+tldL7eht3p0HsXpu28REVWrY9Z2lCoUOP1hTjxHxkIwXM6FSdpvFvV5gnM2JJVCkjgOM/zlWB9K8uppwWwWuOm/////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwALBGjVazh7bAAACXAAAAEdqaNZrD3tsAAAJcAAAAT////////////////////////yU5JLbJLI25DJzOjAEBRtTJaDA7rT0Dswh9p0FJsolIAIECAhA7jiHUpR/QMlY5j9Gyi4wVzMmU+ljqeKZAJpQxW7DnLdcM7OfJuDAWnI9mHa/NJJLRR3TbGeBuF4IIhhyQF09OtIPTQUCxVitl47fwEdBV0SJpofV26Z00hK01nPFU5fbqp4i4KKNEbiTHjGHxYWBLn0pSDIcdilIe4h6Tpey4oWq2B6bzCfCTYorYzR1ZFbGtTNp3LDOaiKmYFE4uCcgkoU5oPFPCY1ytoXdiVD7SFsUx+tBbzmPU9mQjixIM9SCB3HiOE8h6HIAKjbcjcjaSb+GZ6saEaacDsGs2Iczf+G3cbpaY2/5Sn0jy9plUD4lLmimcM8fYuTEdBKHFukWk+n2TaGOJoIaf8RkkdIanxKBeHSnD8LuQfCVyr0e4r6pbYCoONqV8eVZTKOXW2w5EIbUUmkPoxKTTAo1MwPsxX7zvGxlo4qBIpZgNNClhpeIBcJ1FKRjJ2biLLu4FvOhCT8YS6BgBgExKwXM6BJ1IpUKG4oV40VMMR6qEY0sqLhNrnHcFOXw62KGnUPPFhTLEukqXpequbwNqxcpaEnUWrWSRFLgmZOI5UJZvVUSVClCxvz8bi+Qv/////////////////////////////////////////////////////////////ymgEW0WjIZHZNZLLbvjCJcCAuYjY5jI5HGNQbqNCda9EiaEHChoCwjqOeQAFv2smYDf/7sGCnAAjkaNVtYeAMAAAJcKAAASYlmUm5zAAAAAAlwwAAANxVY1QZOdUp9wO1BOxVQBHLZmYBEiNyhl7LxoBiCoTQRgIQjhPQI2Fdbp0bJ4KVMnSzphzrPqhc3VvqqqSzEc2TlunlUuV086lTLF4yRlzPmXQ62yqj7vapgyNQ9PZYJQdRZTNE1hb5K4gJrLNHSaBKoqrYpZD7UWNxtz5tpjLV6pyvY0ld0eXU3WAnZbxQVgixjkCRJms+VbI24R5usjspxP8KmYhPu9TyKUxeDB0CKyKrMUwWBOS0p+2VPOzeSt0a62jfROkhcxNr6nJNefVlElaux90VNW5LGj8UjsTgeQKYvGjirdKGJPTBlK7roy12pU6zqX1K9dCjrbP+4NhValgEm0nCqCN+YDUJ025jiB6irIVuDoN7EnIql9SotVkmxQFDpIW+UdS3WGUfTPXI3pZdlxCtsAmQcG1d0WrJdvgquypEhnt+UuamfxTdfHovM5NYUJKUT1Q/WnL97eOtdudr7/62M8+snYZGWGxSQGMZZtljEB5iFLjzkSX+ydZ6byPBdF230ciR5R2PZRKpZxeSclDxln4gv1u6TSljR2iKyrrW5UWOvJYB5YLd9mcVgXc/e5/bmV+xPRO3FbUhqyiURSH5qHZHDEhp85RGY3hal0utVNar4Ut7laX4VqSnpsK+EuuSeGrOc7P1KmdT7/527gB///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAColn1ddrAA4AAAlw4AABH5WjU05nDZAAACXAAAAE////ghKKSpJJczEAnsOBplgFmCQuJndYdAkrK4qFaxFetjuORAyVVC7D1CwQOPFwAdAkWWuEYLdEABfsIaBQgRaDQQEEQhuwCBkkjBPLussex1lixOGIk4ztNoFg3aVhWumMw59852GZ/HeGtXc8McLvL1uPO+2VACpQcHiEY4YCaLbl12uNMflyZlyFpJRKjIkqWYRmC616RyKlryqNV4jEWGrMRSV1pnS3pIv1ZbWlFofdRyoeyiL801NLrmWv/eOHyGrcwuZ3bMzdjs5IJ6bvUH5U3YjZrUf5zFNnjeqZ5ZcmKlHVg6xSP9H9RCfh+WSZ8YU6cuhyb3O9rzlqkFVuZBUTTdgY2hUang+UCbZhFgXTpwEASJs8YwTAUEr9p9SVSC+3tHQD6AcKIEBEpL0xZSxsDnjgF/0I14pfRpb4BCoOmFKJ9kwRVCUP7HVaHQdZNt0Q4U0dr2DFn/jM5BDoLgtRiAKLX4/+973Ks4rDilSMqDxyAASgFKBHgBGUzm4aZQ7TdVDXKVEg6GUJgL/Z9KIhKc8YtVl0XisMMwXepaoUNByiQqpuM2VIVyYfeFb61oaZE/0DZRyDIc5veVJdl/Z2N012k6/eL/UsjduQSikzvVPs4TWd2vb4/liKQRT3o468p1HYahuZhhyozB0y5EQnLU/Nym3nD9PQZbopqjmr3///////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAKc2jWU1rLbAAACXAAAAEf6aNTTeMtkAAAJcAAAATggyKS5JLcp0OvTqGkDRiSqD8gKE6EZeeUKRaIjQQgD+sEqqENxh5DiSMH2AkQ9gAiYCvEkRIgYJwwwiqKEKb7Fh4r+h7Rw6vaOpA0HPatJpSnUdW41V3WURRHBusYeJ60g9MVdOVRivapK/bdSrnzsDLaU2FDwEyZMpRWLfBATWYGjsBxiD3ZlS5Ycd1Ui44nNxejmYvXvWNzMET65lakhovi2RncSbqzSG3Ng5l7ouXT00jt26t+5urSbpZdLXRep238i2ERhh9Wvw6y9wXPiMKkMafuSyerqvc3Zz+/SX5VboLs9ctZTvyymklyHYCiMef+taux6XYY40m+YWrIVW5UlttJxhpvWoGUGbaq2HwFjSgmPggA3RMVia/C+6bioVztQU6ZGLLENSTAjLZYTGkoMhHglOrK1kKVZ4gGAjAE+hGoITAwTRVbUTibjofMlT/agLEpPsRSTcBNVv7CrGLR9y2Su1BrmMSgGQO1HovGZRFpDmyIlEaKh/QN0SEb8DABYSe0VfKlgiG4eZ8p9G5kTSpimrQfWopdT3IZxi6/VO40pov5XLlwC4ccpWVsqZI7U7Ay9pyHnevRbPK9UuW6aatP64fYZtVLt+IWYOj8ejTWnefaFS+s/EXi1JWxpKWtK8Ms9WqXClpsas1X+tcyqz0omcLWe5bnvGmshUP////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAArEZtZTWcNuAAAJcAAAAR6lo1Ltaw2wAAAlwAAABP/////////////0egpJEqQGayaaNCe98iMRmDErlKC7L7PwnTAavl5PYgq/5EBQNJiRn46co0SY81AHKBUSmYVAzPEUXJUk1KyuIEhQgChk/EC2b8qTTb4mFgpCYIQQCEhS1JECCCiHjhsZcNoU03i7LvbmOGf//f/uEsyaeXPR5B0VAg84EemclnAMCUfyCpqXz1Hckc/ychiejdWcu7hxuD0K2tLARy56zVU2hprQAzV1Is8LOq8CxTsTxmIhqkqbuz9P8YoY22R9IzBcLjVS3dzwsbr5f89DcRtzVJSV5zCTXJrvMJ+VYVaHPOvU/5ZzKm3GeZW8K2OXMaW9nNhVWVSSkinFZhSgFAM2IABKCUQIASUXB4Lcu6mcmW35feoozHVugUoVXA7yChfoahS0JgQQDBiA1RSMEoDc2aqrteIhWUiyr15WpXx8ogTGpHuSn3SK1OI+olN9GhNNeJUEScVxMsf53v67+/r9g+Uu+NGZwLGLUI5qOLnmY3q9cxpqt6JxSKV4de6u/VfszXkMDuinVQonOzJkapUypGl+FqpzNlSST0U86UrgJrcVf9+HdppTLoftvT8EvvBzhvI40HQ1AtJAz46jcxCoOkTWXJbFGPgF25W69NOu/jJ7mePeZXZVXrY1qtzOj5PXsuXqLK9vDDV3tmk1//////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACu9o1dN5w2wAAAlwAAABHf2fWU1l7bgAACXAAAAE/////////////////////qq0qUk0U4picPCYgca4qVdaVJl1jEigcwGutxWV5krF9o/CIRggGRIZRJYAlLyQHt8rSCQFUn7bdkipWZvYu1pClYXDKCVSQ3cfWOt+uYaJBQqAthSwCZ4cEjOGqEgOMUSHF5P0/3t6Vg4p7ZrNB8CEXILUSsT4WwT8GWE6kPGlrFgzPYKwoHBhe4gUcpNsK7ZE0xl2JghYVZFB7BRCwEHkBeBii3ga5MzoMQnsM/HjM40et9HkNLLzksxVEuGFmVClYFtDpkukjwgtsEb62JQuMZgjF+lSkV9HtrF6UrHzA+5aP40C96Xri+MXrEvEzFVqWSSSScZUC7plUAKvmgVkTYBmWkIjJ3Pws1iCfSR6wLKg5Q6KFA7iX4DCMAViDgoyKcK3S2DlzOGnS4TF0GobQgfJWikl1G4LlqAhUiv6z9Q3BL/qdQhWgUFJBaCHkOuxU//y//3/63vcWeOBVBY5DsQedMGIbocrGvu/nNOgj7B8uS9jV+7OSqDOMBUog9ei7EpnVQjC40TZmmgt/oS8i64dfeAJXUljXndldDcl++1qKarx594dpo1BcgppmNPDllDbkMr9liakPtAtyibvyx8nXqRGLTtDPVcMblBjIN1v7hzDHOc7U+kpLNarcpI2Cf//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////5JL/+7BgpwAKY2fV01jDbgAACXAAAAEgLaNXrWMNsAAAJcAAAASSTcbkbTdVUO/UERYaTGlSCMkhxVMy4IAwawpmyh0TgZaKS4LGcTBVAVK2QWC+7PktXSrIclgmHNgYk0qHpDDDgNLZLGKWNyuDi6M60qD4MXcs53qSAm5IZLOBozY82XMQ1KmiQBGKksjFjm8vy3G/dFuLBmhs6dZXSlTfQ9MV5+5QWOYR1m0ljchsSaxUpK0nlEbmsIs1pNItUWhX62YvekamCu2GXBft3nPhLyuTD+3LfSVX9wzD9T4OkfIbi/bVLOzleVxGOwzEZyWSuZoJ5/otcuwiVOnG6d+nxuy7uEblcrwicVuxiITdK/kojkpl8it1ZRLZfK5O48ujchf0Fa6uupbHQzyXLuqGkxqdya0KTGYZCnVfuIxtW2EdKcA9IyLehJeEEF4JEfo8g0y8IATSGLguR6lET04i4mWRynOcR8JGX9QK5IH0Iea/Z4R7n+N9ycdOUx+EQIOKMUkFmJujUQbo4xPA5CgLyiDBLEbCZIOWI3E4ts5fFeQc3FhkbScE+FwDUHoWEha8QhlHwdqIL6IWZZ+jIMQvydIWW8m4k6mIQZaBZxZjoMFDCUFsOBQkkPCGcg/CRgx1szBwIEXMArQYhZRDE1d0rBcxzHQeq6u5CLilnOQcW8f5MjuOgvicnOyE3muX9OMyualySI/F+EF4bKCWDvT5bGB25sN1G2vi+Napb//////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAp8aNRLL3tsAAAJcAAAAR/RpU+nvw3gAAAlwAAABP/ykZLJI3I4m6J8TpbF4H8fhTzvlVqFaRk0vIZo4lUHUfaUqb0RBKSOj1SyJeKijgP/ZgKw9nM+H5PYJ/DqaTgMo5S4rURQmGWE8WcTJncEJUKglVBOv7eYE6TvPzAL6QI0+aUNdheb2uJceR2XBcatGIcbyOS9cNh6GuwZKFhpbEa87AzVnCi+LuPtPxuOSQmNEHMUCbu6ZdtO9pU2nYqF1y0MLTjdWGleQdDLdINfihoHlVTgyIyeX0k7DeVaek0M2YGhtxKrqv+0qG5LAEOOnI5uYeSDGgRB/Iu7LaNkgh64vlJLkvqvm9XH6cCdjceYhNwXbf+H34fVy9KE+6hIlVNJ1dC52j+L6QU2S4l+fR8xH0jL2ZuUllCfpaNjAcj86D/nVDxHH9EVJLA6obEfhpF8ZefEcyVphes6uVqTXCshqhMos6EJU54Gg4NaMT6hNuHVZMyEaLt4glWcqpURb0KfolnZL0cEJWVen1Xg7k8dJ/wk+2rS0yPnCdNZVB2n0O4lZBjIPYRNpJCHUBMF3IeG8JCc5Xx0i9PgTYohLF0Y0JgmeykrN8zSDGoxOBjINOpcw3pnk/Pg5FGvF9PNVl0PuIbJC0KJg3Tn4qUdIii5tjmrUg5WywrCFKRwWjGbEDCdNsdSsLjBgw9HoCCYmIJ/d1f/////////////////////////////////////////////////////////////////////////////////////////////////////////////+tdVI0ou//uwYKcACkVpUmHve3gAAAlwAAABIKGhRye/DaAAACXAAAAEX8gZ7C4F4OusA0E4vPGSZk1pDC/rhRRE0nTeShodwSZ/rDxkLofZ8lORJ3REKJqaCfOt6hRco5eVYhhQDjf9/mzw/AUzLoFtUucMx6YaYqo1yNxt9aemicPWYAfmIyl3Y2/sNUEslcbtum2Cnn2eQQ5zvRn5x3ngklG1d0Yen6kCuRp9mwsnT8iLWFOSyKsMMpNDSyZ0YSPdVKhZWSwq+1+wOg8xJr7dF3W2JvC0p/XTmLzlQI2N+oPh2dZQ8cvaW+z2taguXrmeZ5Xfj8AtFt7gdqVPI4afqG4xP3X9jj9zk7Fo2+k3DEpiEThymh+hjcVgbECPbahpulbn+b0fQETG222k22moCHgUipHxcbbFGkuy6UxjTUMXbOxvkQoigVzKcMQ2kOVyibIZzKYli7LkTxiP4yl5Iu1y5GUnk82K882dVro01pugOS4USlfuZfl4Oo6lE+XTKzkqNc5lTDSgxXhOkabZsMaHIlPXVzpLsjgcx5pMhVm15BnUSuYn7IhyXiwyqJVdSnqFatiPGAOohx0iFEEFlDPNY5AvilIcPWqVI1rhlJEXs6cxltiR6EHkwuT/EJLsCKUTkfsI93FUwLTvjJTq6KjBjqznmNwlBdTSLCbZyH+QI7zTMQyk6mEshynOwcLUuEJaqR3I6kVDPraxT8V/0tV/////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAKrWjTaw97aAAACXAAAAEfDaNZtYeAMAAAJcKAAAT/////////+UnJI5G5HG3EsgKk0vVGwRXjxwMjI20UduNVOQ72aiJaEPwkIagOEMNUIKQbhwiTowesnp0DgTSIIIsixiqUaqZiVlmfBzLalKEuSkNAeskwqDJLgpkLPo3E6qmxkbaJBDVLIxKGRsSBzB0i2EqQ0ME51iKXFIlafhnltDUkleklfN8ZHm8XJHqRDjJOlUIcWRfUIHqJUSk4i0HibCHGSSUfQDaK4AXAMRPibGSfyndnKoH1VZAOpIn8cTqE2s22VtjrmdXp2ZejRlcxnKhKYMqCTllfOaSEyUaNbIJ3MiFREOcl050kewWDSuV0SN4jaqGeLJuVOsyemVFAVVJMjSaTkltNSGVOd5LCzcGVw8GkNQnqDPGSYDgYSjMkISz5kCJwBANOFMNTNS9aqaSQ4gIlqqppGmCBZpAoMihhAuDo4BOYOVjBoZI8xVwM3HRgNMfFWFKWAgEEjhFEwlHMlNjFU0yYAUufJItUMvDgCUufF3vBgOXFQYVyuZ31yv1Co6gozJi8rzdhL6srAy+2y9BDF1urTUvZWpe1xFNMNOVxl9vLaBggPEoBDAcBl9mgIiSqvartUSQW+mBGaSYyqPQ0RGVVrvqeaLLW8ZAjiRBS02qOC/6mD9yiYch44W/rtq3M5aDAfHKgd/oChpuw8AOkom0+TwBAjpNzWCZjHIi6z+TUCSydmmWN2hE87ll62WQw8Np837jsBt2uxed+8mbAK2WwT7SWr0M81Nf0Ptbk1NUrfM1Uk3G5HJLLadWxhhRfHQ2QZv/7sGCnAAnLZlHWd2AEAAAJcMAAACWNm09ZzQAQAAAlwwAAAHmptQNGCUgY4ByEZggDvGLAqJMATwQxbRW9jxdNgDSUTYmzd70lhAaM1dPDmPPmYSATZg04OUGjJgkqAh5oQQiCmcXjwBEdWxSLWS+DFUK2hrouMOUGT1S5d5SEshxl6qIUBp2MvjS7nplzjRiCUVWQJZuPNwmVF9QsDWEVuV2AQRMdLiuMpUCRRgBYY5QcgRuax3aZkWkZMpbakb+F/Ii06YfplUan4YS6aczlAPWVG1h23TUcJhqK6z3ZWBbNCHNWtDtBjHKeJu+9zGH2ht/JQ2rIYKaEw+nZfFX2kMhpn7wlDV1UHdsJfIms6SKYi7wVAJ8ojqDsQXE/1K7sqrPjnarS2ZgGZ5TR6idiLwb8/ukl1Lcnq3QlSS2xpyyRyplHKMCSEUkamtqlZ20l5ZyD2suM80YeeWPWt5c8tgNxX5V5KadrRaoCgNJAcJwn+gavHXecZezfJhPfuAWIuTuKxpmUDv9GVZHOYkla0VrqCrWUxmtOVAMCvs8tmBJc/tJnnZmakOWqOZzmaG5Ku0L+uLB1E/1ujdp9bUH07XlVkaneZMsViKRK5S6pgKang5IACkMptbkk1TurEqWGXSbrAvYZsPrFKt+Zwp5bnS4Rhxn6izrPtTyLCM1ZZH+3pXErNjk5Fp6boJHZlViYsXtyGejs5fv3KkYl3ZHnja1VynL0twwzsRq9cv50Vn////////////////////////////////////////////////////////////////////////////////////////uwYJsACwJo1e9nAAwAAAlw4AABGrmjUaw97bAAACXAAAAE////////////////////////////////////////////////////////ylLbrI5bK24raYjp4M1ViS4auzqFP0155oAiTzHmZ5wOcAQlrVSXO4Xc3WsNETUyRQqI/x+khJ0S4fSKHFKgHByG6hwwsI45S7FuPUr1CfCLdHwSZdFEcpmI5OqZpYVwX6RTnLV+iTwS6lLmJqhCgRq/BKk4VYr24+Dhbj/Hyu6x3l5nd9SUYmbG13FXDE8w4sbler97SG23pGrHxiE+VsrblWtd92iQXs9ZsQIUjrcSA4xIklWGLJa2IrXZl8zyBSHjVoF75xWDA0w4f4fx4E0KjytaxgAkZ4dmW//fa4ZgNwywUQYYcxJUAgTSVJuJI7kJpW/jMHw0gy7r7zjEFDVPNyTOd9u6XwgKns16RL0cZS1l0TgJTWIOlGHUfaJy+QRC3AVeDZudJ2Aukyd1jRWWJRPycxFLMpnCRkgwXR+n6VBvSniXhRJlehqFQlwmZjEZlKpEcf0JkdZnmiRGpDVyYROiUnMn0JTSOVzo+YJuladiifkFgl6Wkcg3rkfzIp06xV2rrNS5nhwmed5LNuJAYHeqxGTxtvnrixWa2OPmT0rSmYb2s1n+4MOA4vXNwkevprVmjQ//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAMAmjPefh7aAAACXAAAAEZtaM7h72NsAAAJcAAAAT//////////////////////////////////////////////////////////////////8AJuRt39KxZgqixgvZxThutJ4XVpbx4DLYzdDAbMFzJuSU3koDOKg7rgpwTQ6RgoovCvVZltxIT1EsOw7T/PFQc5ltuTLLBaIZAWCHUqk84fOywyfD3Qrjc2Qn7xlJNZSroR1DRWKrRqnNCz65loeXvRNxkF+IyUNsqY/cWc0lhNT6pZPWyeuJTjyhbx25Egx8vVuk58vHi08Q2DpChkuP0uvw/WHB2hPDyotarWsONvPPqljKSE6edlBbMTM5M3n4E6+A4LapcpoqTqT7SBM2+t2221syBRMEMmhJjbql/zCgRESNMHOQQNerMtKNI9N6SOYKM6RMgkERMKDQErjDYE1TEgQoITVR6FQxhAZpxJmGhgo5GfOM4C6UwYoEpCLKc/addGQhBIgYEO0pfJAJBS9HAxp8wIIWMK7biYcOma9SH5kjmOaEJrkbG5YAIEhJfKS77vJyI+LQMkECOFag0Mb0gMBEIgcaBnzDNGFBZ00VTVXGkjUaMwJSJlAGTeRjg5gx1zLJN2kOiIiDKIISzRNDC3gbmn4lABQTWiOhwSEbQArmySWXQjXicVQsyVVjwgBQhoICIcIGNRAFNozGxEbiRqLERitwkIZLIZo471sfQkOonIyFOuMSZy5VGLDpwuWRjCpYwq09PG5ly407jxwp3M9OA1Vf6wjRVL1oM0XOtTGVvg8qEtpTTS5afFLG1gEfJDUgtL8BAJP/7sGCnAAsUaNJrWstoAAAJcAAAAR3dpVWn4e3oAAAlwAAABIMoU0elMddcuyjEpCwYPwiODF7OgAlNuOJNtJOlESsWwvRshqkWXEzmV8rZlFGsu1I1zSOdmvxf7GHZuCIdsQVHn9o4UooupiDLXbXs1pR1+Fuhx2DyhlyIkwyZrjMXyeWWt2ks+87WZ5aKw77BimuXMxglxyhIzPD+OwUloEyGGf57ErIOnhPke5wEbLKpjsxhgUCRUarTKdY1eqxkMJkJBmNJoSqdMlPNI4DsUDEuzFPtzINKpZA+BkHkbKNNouRzJCBZcM0l3rW1NjfNuJvG7RIFItrSR1fG35GBVvmZpeHoooyOQxpo9Wto9ys1VRRvL6gY2aRTHlVmRzbBhMCv7nLgJSbkkiSajcwyB1ExPECGWg6laoj0X3BPoS3R2MP/G3VdJ6YaoZU0ucaarUnqqtSsydFoiR6q6lQFOyRASrA5SElQxZyPKjTcVlPu1yROBFBDh8iSl4VBKy0JyewkaoJsF+X0wmdHE52pyXrxLiUmazgzR+pFgNYsZeCXD1GSbLAf6Eo0uo+leLqmi+DiMY7kONR8tHgeShSsYqCRl4NUYyALUFyWE/zwMMS0qqW0kMYIbc1VChZLXI6Yx+tTDBjPV0np4zrFswHKJJqZrlits1Wpzl25bcNXjt8FUvU87muyuLLV7Z8+qzvGJhbG1ti2s+o1qqF///////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKUACplo1Wn4e2gAAAlwAAABHt2jWaw97bAAACXAAAAE////////////kluSSNJtNJwgGyJfCpEDI4nI5saZO2eNt+0OBu3PE4r0UXlDxISBq44igYC4k0OFMJETcNSJmK8MQG0IQxlyOkvQCkXMekpht6JyuRPTfQ8sIS0w1yTlCS4oSeoqAijHFJJyiR6SXHMW8TUuA9Z0qIekY45wl5GUmQMWgTxW4JuLoPokBehcwhpNWKCxHEpX7BEJ49YiXGsX8v5ylKNlHmWYTCfg335JicGdAOq7ehhdnM3oFpmbxVa2p1XHU5yyyuLgpmForFZD6iFyXT5nfqGj4+4K73EjHMunb9h0xRIrNLpXPlWtt7Ortzstp8KKHFm1BtCgvQAk3G0SWkSorozWZYcRLGMGSJFG0FBHmSieRIaNMsgpfkoeSBoi0qcaRZaY6CPrvCXk/HLXY3JrD/AQZfkyiMQWLNHlCu5EsOhSuSVUl2hl0EzUsqrsnnFk71ucnrDzoVmsOG0FrUrh21HLzsLaaG6DnMjj6Nl1QO+XjfaUsTYICiPZK1cFy45SSN94di8jh+nfubft6n1gyCX2aLDs27KYjD0Ai71BG+a7MXNzfd2+yujr3tYY4Y4bsynCO5/h3PGmo6aV7t517la3q3e/Ov8upY9ALOI/WjL/PVN1nvsNtAq/nZZpGHcbLKI/Blt/pFGZHS2qlzCpUtf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwALBWjU61jDbAAACXAAAAEdpZ9RLeHtsAAAJcAAAAT////////////////////////4Ct1KyjbYjE4QDJBjYgAAoCoqiywqikLbLXWXaZG6TK32ijp+0eVrzlTW0nlCkjWXswcZIxrknZQoaBMoaJ4KXhQrTw1I6lM9HSG2VUUBSV/oi9pPjULEsmsoQ0zOShuwlLGg2baLzSZAh6uJGhi72OsUsNMfb4TYlC4MQTRFOBkKFWAp4ifc4j1usnmtidMKmUpzKkuTwVRIAhgUMByKEriap86UsS86kGvKOBRwgzebWmyA+sqHisZGBxtGWsvILSzrdLNWa03LuRaSFm18wtzi5MjNHizyR2BheKlvW1RKqGOkrbpsrV613tMsAGqpXZbRRM/FB2kU0gUScWA09T46AedTtoafFG1Sbc6SPYo/A7QJEiAwkeTIUleGEkRVBVJKE00yzxMoXvM1EoOF1Aa2NNGMQx1AMpwXuiCLbAGrSuZevJ38mCwctUQBj6+lOlNWGtpQ43J7szOSlgDWWtqZMuX8mUngkiITjKASoI23JM1ENCMSUs0dOkiBsPqzJhi6Hhiz8Ou8ECv1DDOGkydmiR9REgLlTGBoVqJIMTj0bZ0pg49DFoxal1y3uxEr+X38Nym9lZ7UnbsZlOV3d3so3TSqep9Z1Lle/Wv2+7o6mWXN77Yr5VJHNTkGS6epN7gWvu3Y5nqv379Xf//////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAqTaNRLWcNsAAAJcAAAAR9poVVN5w2wAAAlwAAABP/////qtXSAWmk4oaYRYoXmfVjAzgiddrCEPpUw1izMpxkfE6K7QXxhSjVtVeZFhHeJnEvgOevsmAYalkAQECRqhMVJwEpx5cZESBKqZQOayKrkwm6Oy8MYdCjhyFqFx5dLC08lVlut0oGZ5Tl6eqyOJNfdp5G4NPWtIVwDrpYMhGhgSxdURLFlF+IZLcI2qxEoxEhOFGFh62W4yx9GhWqR0b1ebYK3ZoaiaqjPk91sRe1MtNsv4ntKYtfeu7W1L6tTDHepjCrvVXecWpqKGc61DHLlPTyCWWt43PobdiUZ9t28qteN9wzpNY37FNP0sOXPhu/cxmdcx5b3bucyztARr6QAkknL4OEi4s+bUoAD1aXDxFmDNI8uNrbZlAIeXO2N/2y3FZpMlrLkAUyLPkpJtjUJQgMEIxDq9KczrIAMuSBtiQ+TxUQKChCV6SODQ5tzHwvxKy13NPp6VcNElsSsSm1R9nLsWqMHEIZsKkbwoA14OWrIu8cO6Reot6ABK3FzV9KW0hFsRhZYmkyRPmWMEqMHeOQPFeaLFFiypOJLdqKb0cWo1FnkNQ7uPN0aBEKZ4uy2agaxLKlitK4/TyKrSYVMLUppZ6j3dpLFbLs1SVM8r8vr36aciFmazwpp+nwmMK1jcpl1PSxC5L60spJuhnpuDpvUunbNaV1dY2////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACoJo1VNZw2wAAAlwAAABH7GjUU1nDZAAACXAAAAE///AauQktybZ0gBaKHRxroYfDKkcRTfpKFsSiKiuLzS1bFlkzYW8YVIGYQ+X9jiCiZImQ/hM4WGmhCSicZ7wKKgVBD8mpKgw0COSDSwVRY6XymX00zV6L9tji8r6SMBI0t0kdaxAU9ymy99MHeKoY8vliqm0tbs4CJQofAqZQNLtroL3YBxn7TuR3Rhm2ar4dRl2LYpuEx6NzVV6n/h2lUpxrwEtWWuqmFDcMvEgJtPA0KNMifrtNLoxLZU21h/mYxC3HH9sxOzdhm9hl/36WQVqW5L5rKCr/J+DYal9l+YewwtRm1epZ2pbu9js7bzjMxnal07nEe42vqUeNqrWwCSm5IySm2m6zIQvBiAIBZIMEjFwGPILMTStfBXzur3QxljCXgX6+5fF3odSOb4u9A7W1hAoHBL0LiYua6DVj5kSCagsUbirNTEJiIQGyuhQFirBX8jUGRKOwDfiyYSVyzn6l879zVrPG7FasdLwtjWq6KUMNsUiqfSXrXgQdpRNCMrVicbXi5KDNI6NA9creSPuY3z2O81lpTXnhYU6LxRFsjsvgmk3NCUwVwpG5jE1iOa77WIVSX7OFWbsTdeG60E1r1PyvYr5cx5nn3P/w5lerc/VrKtqHJ36nZZK5Vfu26+qle7F4TNTcxJ7U1V7c3Yr0mdNf7bK////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAKzWfV63jDbgAACXAAAAEeiaNVrGMNsAAAJcAAAAT///////////////gFuSxpJNNNyQgaRGhxgUVExN15YBa01KGog9Vpz3Hy1M1W5TdlmbJndTxam7DaqXoaomkVWVKIpzpesNXC2NNFGVPkt+nmwNXa82LqBoeK8kKaBeU2nBpwEsClUydsQjW0vyWrDxa7GKFDBXjL3ulkLceH9OOq9KpJRkSFyu0f3KiTJJiBJU7jYJiH2YJgVbrX5dbmpDBb5tIdbrxwO/b/0EiY5hEGl00ZdJpzAFb3ulUAROXXIbd+3Vo6CTxqvYpopZvxu1nbwqzm9U8Tf/8Y3P1KSrXoqXGkqW7G+9n895Sic1jnYmPzu75vPfN9w/H7dPyoADbcaS1TXFTBFSCg7XWOtMhToyK1K5dXoV/taaY3RszXnYjEN21GkGU+UZEIlLIIZuXOaY0NSxy2ePqSAksVxqCFvjZp3fMWBQFiyIaEGNanRAmJYmaEAYMAJm6+kWZLo1WjkWaBoBiBCFM2RTSeJkm4DCghnLIAgU1HlSobEwBZM20SgJMAHIARYRlqyrYIgVTCIJURjHAZhXDSW2ZegkGhFoPCu1hKJ6wydEGNcjbhN0jsMNAhuLyxrLvJgqZDgIJLL1BgDdFVgEAhamGwZO2VgUFpz+JUNYYZVjd19H0ibrztC+jkVoQ5bsv24dI+sNwzGvk0Gy+R3aR93XpH3a/i7dqJug8sLguniUos18JRSQPSSCbvxOepNXd56v41Kt+J////////////////////////////////////////////////4RctkaIJBf/7sGCnAAo7Z9VjGstuAAAJcAAAASDRo1On4w2gAAAlwAAABDuF3H0lw6amuc6JQ1yPRLo8gkSO1dwO113YGh1Clo6ywIQlGPBVqVZH1LWFIRJKETGmRuWv1IlpKZkpKV2WmLDpXkL0vj2c1mH3DSTowYAdiEUDiQYI76EghOqslQFEKSk7QEO6AxVFztKvgt/U5oCdKFNwL5sqjCbC5Gocd6xfVTmZQ76e6ZtAwWWN0040jqv48j808ma41xl8kZtNwlf8y+kyxB/X1cdFdQR3IZa+6yjTvZwFJZXEI7TSpK+VuMnI4NuPQA0F+XufSZrvNGohZgeKvq29Iy1wmkW4Ddta8Jic1ZxpI/SUUYqRTK7aq0EUv0Nyrqplhjuas1s8LmAtSNxoklFS7kKJSqybp8iWJtJOcTGytZ2N7lus7z9OK7MhdlYduyp0Y06HAgCEOo8SumeFzR4zzxNm7TGAOSFQLRIVh26JHgQCsj7B2Swo8sqBC1ikRmE200PgQqKwkRZf5ItBKNByMQAp3oqphreUMaswFJpx2OL2RMZI8qQiqyf8vYPGFzSZxGeTiyFgoSu5ebXi6Lc3gi8Ua3platu8oHbq+sPQ66NxVeGl1uHATWZS/TYG40zys3Xqz9p8Vaw4z+PKzB2e3YQzHOs2GYuwZafqKXIFiMcfKmlW67wU0XeiE0M66+MbnoLyh6NSytF4q/ErpJN+EN8xduU35VWlctll6zP5Zz9qxj/////////////////////////////////////////////////////////////+W43I2wUipdxdTpFIJQeRMQc7KhaV//uwYKcACcdo1Gn4y2AAAAlwAAABIp2jUafrLYAAACXAAAAET+zrNE0WmZSrC3BbGxQBNQAmA/DPlwO7YgKSN2ZEuYBCm9aK4BCARrZWWeIgIKQHLMA4MChwyIMqTZ8Am4ohMiTNgsy3Aqq3U0gRcRDinWX/BgRoiGai3BgThp4sxYcARFqNwSshFxPRIcLgpDKKqTgeHlXy9h7t34FYo9zawhy2uNTWm5Ts01OxZ+HjV46zv1FPM0jskSSllM2eWrmfpSvBTuMOM+0MMsk7YoosA2sbXdGXyf9sUepVqNDyfZqTV1B2DzDXoHlT/ujDamDK4jKX4ik5LoZlLw1YcfOA28iL7r9d6D43KrEmlExS0FeSVMZ+n19FE5mdq38MP/tLcEm25IUASVLuJoqx6U8XAthJ3BNoFDk0jBxTtcaxHZVdZWsPL2jyUgGZGg2+7W4zUjiqraDAMuiDtw/OwJDJfwiHDMC8jExQwSSCEhYI4xmXmAHLRlpf9K2BFIyJYMgOFFGhKIKHJP80FRKUkjyhoo5PSF8YWgFKiFTGMLDi9caZupWrE472N0abInaZQ70OOCuNIpssRfiC2QPclmpREZOzCEt+0yCYXdVdBi4k6lg20aCrQn60yG1EHvjTvLFeR6GfqWKzytarVHkcSlm5RTrzamup9GssHYTNNeaA+EPXXYay40top6QuQ6rbuTZjj2wCzugfliECOLTyCipLnamopY3Sxnmc1KZ6rcpavabOrn///////////////////////////////////////////////////rV1IASSk4P4apc7EgK1zRyvaRugz8z/+7BgpwAJv2jT6fnDYAAACXAAAAEiuaNPR+cNkAAAJcAAAAR1NL5FGYHcOGWtOY+q2wuEkNK4rdwsTLxvlAZZl3WoNcdJxmgxAEAmSmNHBAxeJEoYbNtMTJC4wJIMZSVxwiBrEpQUEtsJOMQTCEmGCBoIC4SsIVgpIs2UGFRjpQFpN9JAkchwUXY2XsUOb5PNrkaljqPo3BokCN1jCcDbp5JkuADQPfDL3LELNM7fxJJekfeaPOm0J61KAsF8GUsfbnJmJOwyBUrMFa5faqQRI8YLiDTZ+Gp5xIo0lbKpJQ1JYsYhyvI4edl2ZTM0VBSS+Iy96oEfl54YwS4h9wmuJuyebj0APVL7OL3w1DkAvvF5TB89II/RxmlrSmWzN+l1fm6wGqqUAAFJwdGUBLLQ+3JnycbXZ2TuVFJyUxmfjcN4LJduIt8sqMoUKZPm40Ql8PQdOFpUk4w8L7M7X2puvh7VAhk4GEpJ3xFBuqKqFpZkuEuwynZ85jDRQYiOpkXhbuv9wh0DP03WetfWK2Xb1peqVJPoPJFo4I9KQLTBH27MCXo7bWKdarkKbWXeS6WDBVlplxy70WZE86NqGq5mlNjR1SGct1IfYRTeGGfSLr7S5icUd1qssghEJ02FsxgVtHKsSxh+HWUuK/1pwXohiNwbJq0EyZuMhTmppK/NPcqOGrmQUUP08wspea/5Ouxrbnrxf2C5S3B6I82jN3ahijfm3jTyGWyq1LKavRymP3olL6uH1f//////////////////////////////////////////////////61f1EklNyyEv6GPsRdiclZfnB0BPK//7sGCnAAnDaNLTGMNkAAAJcAAAASKto09MZw2QAAAlwAAABHdnLWKVhsM8YfFWISIaAAyb0KO22lTqsssfpdBfMGBrBPU6Kxnea2tYIVCwYGcFzgiBAGNEAIQuOWfAz4GTZqIK0N4uKvmJJRKrrMU3AwWnRBsyi6QsGqbLwS6YS1hYyZyxHQWmkaKgRfJgLDVm5TKlqXr4xF+XgVob5hy6WSQJAy9mFNbZc0hh0ud7OXxGMAQJbpPVOpQAvkoq3RxUUXCabGlBW1pY6v9iCrVdMxpYFWrRSN/mNxJgCfUedJp0DwmF2GwwxPYxhaT9ySMymii8ALDQathAk8S5ZK5sef9NFlMyrG0CAJFOZ0b+v9ap71mvHYlKodtVrdqbisurZXQlttxJkElFOLUMCSDaCoyc/EzsHBpoI+nGYOImJAiXL4rDtbsLUZY9r7SBsyRj0AyyKUMPK1ieehqkTdmBk91BVItQneR9iMuhgCgSYL6jZWVPIzAGkRyQCs3ARU4S2IQGou5m6ZSvasVgsuKkKkQytTzGHvQykVpvHZWKz4cAhuABlnUJLXo6kU2d+Y1KoUvlQFgqCZPqGW1iTLpfDt5/o67y6mz8fqUwc/DRqBp6HrwuW9rAX4UCe1d0LXdRioEfmStwgiRVM6WCnGpWuu2u17Y1OQ1aVtaDLYRNsNonVpYkxJ/GvXMpPQyq4ns/L7NKyjjhOlGXJjUAwmGu3pVSz1TPudXUvu39SiaoKGTar3ZdLv//////////////////////////////////////////////////////////////////////////8klS//uwYKcAClxo0+t4w2wAAAlwAAABIEmjV61jDbAAACXAAAAEVytuyOSsuIaAaXCqM5phNYMLSgaISYtdAClub7q9Q8lEw5LWELxAIFrTFDBLmLVooobQVLF1MrbxdY28KHTPddBpaS/FrNxWaUUa2hwY21llr6sOgUKDY2jUikg8+qCthOwudI4FVA5bWGtNNZAqNWNerIlNAxSwDA2xKVNzjCmoQB4Hcj9yu2OAmer0YGyRynWn19QZKaGngGxTO9pyIiyX1ltovRqQxFNJG9irTkNJY/83LX5lMhi8JhytVvQxE5p75W6VPBcp3D9JKqLuMxatU1LhNblus8f3nU5bltrlNSwBXxvS2DaG/aypsM8pmvP1rlSlp/lVmxu3YvxyYAQVJG224425DoyLHSgIwliwUxEaBJ1JNnLNZpEZzWGQCsPDFt/iUz/ISlamwuJONOhxQh+1FZGwceaHEC4FK3lZairDDjO0j05rZHOIhRAt0zV4HinB+qEddBwkSJMdSUPhcNhPmJFKFTkiL0qU0dLCtujALisqkQAjgYp2G/K2wkwYJ5m+OEVRaIeSl4fysYk+6cUgnlyyQ2g5kywoSXY8zdUhomTRC5rQmeZ5GhyQ3td4h3cXDLm4wMx3KFAy/2+rHgbhZ/n9oedx81kpbxt6iQviX3tAtW8SuNzxc/LqNa1JN///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAKw2jU63h7bAAACXAAAAEetaNXrWMNsAAAJcAAAAT/////////////6JKkkccllklZSnGJ7iBeGRHYTxjqNVlvqRNiwye4r2oyiZBqn2U6yU70yqTrubxEBfyDdEjI6gqEoQ4EFv/Dz2e7z9ULJWsDSWtpXMHUyVVacthuURh58nZoKR9WILSm5ay5+Z9yIVAjkQ/BcqdJpsBIahYTRy6Y2Ze70QqMvU4Tc14JFF6XCR/bkoHE3SgxaLd2LQJAcYdShgmHYYeWUPIwyBlH4FaRB0LdeVZwzA8trVbNyQW6etnfrS+U341jJrl2XyvLKkuZco+0VPTW5+3etRmbrzUZzwxuUEb1S1K9SV73Wv0+Ny3S53L9JZsZbtd5lqgyICklkblsjjkwKoSMsVCZRVboyVO1nkEz6iSkWwsmYUmu5a9dlyXgLYwSXujjBc1i4qc5o4R4vPOmh78s2hTy8d+DHyICorx9CtIhUzSG4vsmqlziOmCqzwNxRIcqYqKcjdVorC3m8kDAQ5YVZxD9fCamKJmUwGAvhDW0uT9RRhFR8iBpcWQbx1N5M21PK834TfGcWRcLhZQlMRdPn7UTgeLQew+D7R6wstTGxJRms/gMWqPWVutSG4yRJptwoEGPPfE99Rr4pWG2WgYzjVo0e+9beyRW62qO2ym9638eFeFryzhn///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAsJZ9TrWHtuAAAJcAAAAR2Ro1mtYw2wAAAlwAAABP////////////////////////+SXZbrZdrZJZ0hQkaosDSbaxhb6HcWSMri6nTtsbg6ss5saz32ZsoMUapy/LcFXwUkE/67IIcuOqHTplI19glBJ86WdjC1W7O4FksAcNuyi7cHafdckYuW9ui/08+0IiK5ZvCckrYnIXgzcVLSQVHVz2oNZvFh4hdSFszpHLuxRwy+7PlFJM3ySLg1rzLXldaCnlfuEP7G4XCIdttzi0PWYMaHnk1NuLvSyMONL+U1ypN5Z9wwp5mesRqapbneVsqa/TYcm7V29fqZ46rW95/hhLLV79dllnmOcxcp+ajV3C1JMd3K/9xp8OYVPvgkuS223bSySwMIk4aiITIdRZ8u5HlAavRvmFJxsLf1jYielPHKAuozj3OdXJ5D1o/RmkoSwyV8U4hIwRgnscjCpGIgIJofZAhuiKIEJKlhxEwWAWkyGqz1ustygmcjsBSmM0NLDju1G2VLGIfdXtJcSGT1FityVdFWjWJbKIGfVcD8splql0HxK02r5u1LIFheVG38oiUGy7CLRbGozWNPHDLsOfhFqec+J01rnK3LFLdyoZzO/PWty61nQVJi33Gn5UylvM/3dyqU1W7OV5Zlazm90s3atxCtvPkqtVMbWrssyxo79LIq1HYr4f////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAC/to1etPw2wAAAlwAAABGcmjT6w9jbAAACXAAAAE/////////////////////////////////////////////////////////////////+SpJpbZbZG3FtGQR7CcCo8NDL9szMnRJyAVYrw12vG8LcrwHYDMawfIkohpIATRLngZwRpTkJZWq0dXmUUx/M6RbENgELS7x0zFklG80DtA6FCwuOnxdEl5YRjmy5GOjZTFB2yJOPlos1ZjPDs4XtIR4r1EOrR8UybChoBW9YiVlym1QHj505LJupZxGql5ThitZu1RrMhXUTpWFiz1FXmbusOeqOlrOL09XzleyvdWL+sXLLjk9TuMsfhNagOIFiRuUNmFJytHzzr6yj0xYAHLdttbbI24/wVAGGgIiE14s82FprX3agPGMyo5ELYDKVpaifjVOFnQg0UTKqjF0OEwhbjoE8baKVU6iLpSIaUZZoE21gWgnqUOkn5bobiMFjS54sRlqoytRj/coKGom6TVSNb2k8oaFIfSsJKKBP4lUqwjHybywzKaaWC4TPoKl3ElmfLm2YTCwL7RVtjR7MbO3xpqTt07qNGmbnN9eSGsLMW9H8JnxO8g1fSueWzT2PXTI2RMxHbWzZgw6vbM7K70qNPFbI/ixX92a7pg3a7qtZ3/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAK1WjS6w97bAAACXAAAAEeZaU1tYwAIAAAJcKAAAT////////////////5Jd23/2+tklbwRBZaF9IrOunw3NesQkjSIGsY1YnSM1rMxdpwYk9L0QNL3clsva5BFI15XSgL8yt5pXe9MLpMhczdXqaKlaqZNZAgr19mrM2kclj8fbTsvisZm56KQrOM17kuvW7d2kwprOccjVWQ4RKC5bQU1hyolFZqUR2pflkxrOVwZK4Llzwv3asayhEplEplde5L7dWQu7TQ1RWZHap4NnaOK5wZj34hFpJjSv/XpX7nqami0PxCckteklFe/dxlkSl0p+xFYhbswHSxG/A9iivTd+9Ds1V3atVXLkNSpHaa1lQxj/+tBXRHejT3+3aoJMc1sltslsttttut1tGAIX2DQBZ2YiheYGDEgIgBajrHICFGhxrLOiaFgQAZmTApsCQLSba9UtzLvJBMFgoZfi24gxYHAvl+DLaGiMTcJQwPg724u1m1JMeDmvs1MPcGEyDR0TBfGQMgYSAaALCoAcIhqfL1NdcuBkjzGDExMaUgExSwPTI/B3Mq5H5y39k0DuW0waArMDEA8wBgAIWGAGCEAc0yCuDSjFhMOoIMx0ROzH/HTMKkQx4ZA0eRvjKoygeDgF0/FLE+FtvMY1wjBi3iUmNOQCY5Ic5giA5mFSE+YMYAsFvHWxgeCLTOI+qeAoyxSgaZMts5JgvhNGDYF6YrobJhWBNmJiJCYYoHJj3hYmEoEUYDoIsKhqo5nX+jbfQ67C0WkS1ob5zkOSqncuA4qYcwapjhjDgoSIWGPMJIJwOB0MEAEYwTgXjBQP/7sGCnAAyuZlBud8AEAAAJcMAAAB2Nm1e8/AAoAAAlw4AABAkC4BhgIAHVpc8TtOpSwcziczrQVI4pFnomazkRTOZgCMyN+4fbhSRCQKFUTPGUNBd9MVW9Gtw2iNsBgA1N////7dIgWmD/rERJSaRRIAKg4EeQ4vIBwAbluN0gp29QsRzLcpouFZ3n6jUiKoy6Ey151H5i09dwxjCMioocXyzl1GXXHrcFTFwqSdppQ0GCFcLlht+1dBi1ltag0rGBQgWiPDvIT0JJd1Xy40ELolloEfmGWcqMVCIkJRVWgsduEniDfTjQsbSZriI9Si+9D9tNb5QWkhuKTUOSKHXZqP1Ip5uzyLGSSdJYkbehmLcIq8qhqVsFM2WU05ur9PtjMT1WUR2OZ1M8K2NLS1K2X/nje/HHmWVfeVWt/ZVKbOXy+dzlGdXW/w1y7rvNa196/fsfeyaEgCim5IWiUCnMtVMc4ccWNsCWu27+Qy78xDUrnHO5EJdDMKiEPvWk+aINozd204YCdWedJfbJV3qifyRs4m1jyFYyezCHZgFkrUVdOWlopk5B7ctgM4YgN6j2NZSFND0yU/jepTdZS/2UhAXYgtdPWoNPcNYjS20VUSLgxsjU1VnZgp0YFYixFkT9Qy0pK5W23GIdfNXKZNiq8rT3gdOI0s1F3+Wq+ha504FiUWmo3fUNbE3jcXZZLDcem2Gxl/otRxKU2InPv5L78dtzeFaXay+7lHpFnVlEfuWamE3DT3xqAn3ls7lLrOdbPVa1WlU7jTffrSqtKndu1qsps63cu6/////////////////////////ySm5GkUSU//uwYIyACJRo0+tYw2gAAAlwAAABIMmjU61jDbAAACXAAAAEk4ZVIZWmZuY55u4rVwEKguB0hmMRlmrNVb4u0NMloT6Ou5jtOkNCFpIKDwlcNu6abjwko2cDoMpcsOgEbWKoyEyVB1+wQzqmoX+dB0mtgUgRZuUfpX9UpcxQKE0kpiVRrTAmzo3Og6zrZ3milvXASuBg1FJdEEjk2XdZNUxcGAph9km4vAretGTiomSxlaSdS8YS9DCUkWqQtasuak40288XdxdMMxiWKOsGYszloFRQSeXPWclqLMZVHofjk1NtQftlUsbnTOVVcGQQW/kw0+G35lkjo5Y4sRlUv070zInvdmxPSuYmKs1avVrPL+5rCvO01/K9lR/Xvf3+X9RWZAAXJK2m4424zggpN4FIQDHMrThzV67q+VWMNbNQuT76JEsEcJuEPShjIMKHkL0uQ61yGU0UrWSvUy1QJfS1kboWz1vQCpIVejswVE6wKK+bdmsxVkqDzW0NmytJXsyGy2WBHHaziv57aJvoDgVtorVh50V3rEZs/7BVCGFI5NqrpkS63BRBQpd9kS1aRr8Uziq21W0rwS1gKNydTptdgVkrNovJU5Fxjg1eqCu4lEvFgkQComTsiW3AqYqgrUWURVsUPN61mDIlB0BsFn5ynk1iajstltn4eo72PxmW01mmi27E1qDeWZdyX7mrOdm/qrlnN93lPZzn75qpcvWrFW3z////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAK3mjU6zjDbAAACXAAAAEeQaNTp+HtsAAAJcAAAAT//////////////////BckkjkjbabhOQRkDQIMIYM9KuihZ2hD0Cjj1gjCZitWLP7JHLfxZ6EAmUoGkCxJ+IfhqgZ61Zpd9njJWRtafhtGSR+B3igSOrPdxmjADhLeWpBEoTM6iaLSMNFDzhKxjsbBUDmhqNXIQf5xKgx1AnlfI4sL1UbcG05zMbEy7QhmTitOuElEizoY7TiydbMhi+hasW0MMUXNBiYI0RMvwdYyBXC3h7IASwn59nWWItitOtgQhrZjvgKBWqM+IDG5MbEpIbO2IBdqNTtKccD/jJxtV71VwHjHDeOocV+4RGJHN24brMBlzPSLe9oEKsek24j8JV//+/2+++4FIloOU3QWieHpi2jOD9cWbVKfzMol1BgJ9clGyADQWoSycb0SpHBLmGpkcu5mJyXJqE+UBcl2x2WlKXkjQ9Ajwb4N0OgcSHiepCGSw8jLLaejOhKAY1EcR+mikoemY5UsiEEkVAcyvjNrpDjPDBO4nTbpIpxFIsuLB0i4q1UJ5zQlsTz9lU6pQ4l4xVwJsh4mJmkFKovSTLCijGOVmL7EQ5Foa4u1zlZbH8Flbo6duytSif7Vz5cv3CkJjqwWet1qvmykJ7E1iD7woe56R8034ubwpv9VpBpK4///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////5P/7sGCnAApraNFp73toAAAJcAAAASARoz+sZe2gAAAlwAAABJf2ul0kkklX+tVd7hrEcNOpGg1xAgQ4YUQg6Atihk4Sz7Ig4sEBF5Ro9HhW1MMgIRpNoAw1QaMNSHXSIrjeBOk0CFCySxFD2dI+LTauuyGWasrbs2iw8FL8Wm8ySYVBbSHkgOUk4wDpEwL+nkAJuX5GIsxn53LB/opWG+vJVdLlvRTir2JWKfTOpkaaacUJzm8ScYA5R1hqChEbAnCCg6AMYPgSUMsLw3S9l8P48Bbz4NVC5z8VpqE7Mw4STnIrVGkHJQK/c0eO2KFGJ+AsR4UVXxn68yuakerbxZbF9yUDHCmf2c2yK54zd1WK4TYxS00HPzE+IsfEHOp8uM8K76gtuNtpqSXW3MAQqPRKGUJ79oyXPG3M2fKgU6ygxAohAGIAoIlGiQeh0LXpgBhMWIolK3FoSUQ/KdpoU5EYNmXM+hMwANeIOokER866MiPmygBIgZfB2AFBAQCMiXVhM4YNMGAIQScQ+AFRMgM0sM8YRHMlDQwMiYVFhpVAIMYQFBYPBAqUAUZMLG0IgMJtOBgOGDwYLhUHMhGTBBwaAUIggdMtHzDQExQiAL6cqrpNmbqYkXGCjJlJaUCRiJeBjsCi5q7CAFAwAfHiomMTNysBHgBBjGCUDJxgI2YSOhYgMlLTBAUx4FMcGhJzNOGAANGGJxuhoZQqGhGBj40KFJIJRstWYsOGCk5hoMEFpkgcIzszkeMyIQxaUJBIexMxUBMFA2XF6Q4fDAAwMNFA5WgdAREGkQOu8EgaYbTodRMTAhxqS7VjobocwMBl80q3//uwYKcADFVo0eta22gAAAlwAAABHU2bV6y97agAACXAAAAE1eOCjAQdShTNxg4AR/dAEACOCGBcAtYg5OuQ9T5R5wIS8Tgp1zDIH5geZfujlsahECQHLq9M7EOQw5GpWyS5ZY05HHL2am7Sf+5M8aDAUOV088LtPfQTUugJijHUW06YB5K5Pi2ktRgYIjI5Go8k24iOAOQakXi2xlyN5IQy9BunSX2IrVhmOMuyhJiao4SUniQUNShqHEmHczsR+oSj2VbULI+RyDsDZE8DJfmEAHi3ltBsoanCSo94TZqP4t57nE5tEZdLTkh0ZiipkhJYYL0vyHC5EtLiIScrIoDCaWU/ltqTxQtC6qxQXre1uCEoa0WfxI0WVhVqGzPoTExMUbMFOsTEomJiZrG8aRonTNXFoSujRfbF63YXFintv4zBxStYNYvhEwSW3GkU20U5FgsBnDRT7GUphzQQrSrU+6A1diticT/Jjwctt0loMdjSMj6I8P6pWhOXkyJazEmIyBfCQyc6g5a1VtMiA9zXBIqaQAWXKdpj8HYNwZWyp61w+WW6vmESl43GjMKhqR1HhirQEbWSoLNfKBt3cGnVhehf3FbXQZw1KGRJrUCAMFPaDzJEAhriAQjKk41nu89M3VhVBJJqjuPvKoee+WtGgNlKkFxwReYbFHkgmItwb+EyaxYpbdmOtzb2VMqfkdFXZm4sLo7Evwmak/OX7l2tSR2tKucjc1X3MTGrNnKk3ruqt7O/lnZpru7OtV8ZTW1V33C5nYmLf///////////////////////////////////////////////////////+7Bgk4AJf2jVa3jDbAAACXAAAAEe2Z9VrT8NuAAAJcAAAAT///////////4JKbjbScbScmxgwfBuYwMWPpwEqlrzCMKViUcWxNXYQzpwVxIWNQCZkoC3FtO5hFxJc+c1KiiVKIfQLkE8PUOIlxbhxNgNoe4LYOIsSHGlGbDKUpfV0J1pwucgrGFKWUP427BWtQC9UPyxW6Qt3bV36F14Idt3JUy9PZ73gUyUuh2CG7L2jiCZhxlgb7CUl2wEy5/GtOM0pryYzDnBa69LawxAjtSGNQ5FW9flfLAabku5bisBV52rYl1S/ll8NRb32d1+b0pxmr/caa7ytd3M8tTnKW5Wnt7sfSblu8JiivYZXOZY5Y8q2bO68zTValily/df8LDIBBUkbjksjbjuojHRQ+YVCAIIzEoNVc/gsElKVMZG248Bbl6VqFviYDWGmeMhdUNF1Rr4OVrETUgyjyMQXnZzpgKkkUE+EsUV1phc2Rc2ZpEYsy2DE9WCxumnm3mJjsEPOtlCKff9uKRK/XpfxlBe4eUPNiwysv6FxFxGroiq8dJVRoqMQ04qChSxoefVubispZI20neNeLWH0eFA4eE3kobwVMutrEkoXAgaejUa1Habd23fu0ljGaprV2pSXccr9S5hOVrl+Mbz3jDmW6bWFPzmFfPGlxtbvcs7p7NzOa121OWL9NYwpsqterM2KLuFjlL////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAArNaNRrj8NsAAAJcAAAAR6No1GtYy2wAAAlwAAABP//////////////+AEpI3JbHG3U7gQ7EUhRUzbN8hQElkOAI011qWQoRjNRzlgIGtJpOem3bbI06q20bUNgxBhQtmgcGDx0dVkUkVTh+RoUwKrlrzAonG2l0bztcZ1GVpz6tkzugq7zrYXKXGNU6PEigN5HrVikTPZWFW7I4goiiuHiJeDybRioA9DytAWypULBDBstS/bu0t54TTO7JIpDDutswBwdwxE7ll3Hlhdmch+Ys5zmNFOY27diWcta7q/TZ3qXDHsv12mv9zuV/vZc+1jcqXP+bon3kDkSepS7icP0djUOPxQyWDKKWRaPSHb6SecfiG839lDk0s5RYQoAFRySOSNtuLDBwAB11KAyIkjZVALCL0tVLA207L7dIskpIKrwtUChmTIdIXBTyS5ZUWZFi8EJeFTagYLZjWE/EpTBkTsyiMySlqUzEVeOxTjKXafUL679PNrPDLucCFtIsAQVIGQZgshCiSMQxwMww0cElFzF6HXGSre1krE9CTjijFGOg1GBkIAdyCSSFHUeRd0+P0Lkvq0uTvOE2E6q2liUryJAOxkY1TCtEV9oOINmV5iWPLFzPEvm8DxK1s/dZ2wRcv8P22R7AniWpR5a+NPL++4b15TPcnjbW08aj+e+H3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACx1o1Gt4e2wAAAlwAAABHU2jU6y/DbAAACXAAAAE////////////////////////////+AE5JbZbHG3EdSTgw61tGinSAEFmgjCedhMOQAX9vLTwSIySZqE3ARSgBjnaVSLGSKSh5tUG6wnWSkewqoCtfQ0VHXjhTjcaylQZLxPkam+7albAYNhNJjaqTVjCZitpgNEs+Nsmfduz1NIblbDKqwBxRIhKdUIhCqq5ig0Pvs053C7QiEmdBcyvBrc3HnXcKA5lusLktlrDEJZFW6RhUjxYS6G6aLT8lgDF/MpDfzqcz7QWaSP0tmasbld3Wee+Z9t59pOZ8zzq0tvK13G1OV72Nikqdl+WNJUs3Mt61q7fw5j/OY1r9BnnKCS5LbdbbLJK0kVNDgyZzAUDF23glixWnJExljTYqQghiGI2B0OtmQlRHzfQ5mHpD9EjFfFmHc4NxMTXPyRyTiGJlS3JA4oAf4t6iDoKsfw+wUy7K2U1E60sr7EK881T9LmxHUWyROs5Ny+C2ladZ1hJlcBeAbmBlVKENRgsBUnQWrAd0NLF+tsykJP5IphLikjCNsmouQtgJ5QpZnaGtOo1+nbqFwZLwnOk7hBhrtujRoLbh/tw80FnbnkWJHvG7FtkiskJtYmZs+YUNvc9uMerXNeryP9RJ5GyLTThljcZHsu0rLV/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwALQ2jV6297bAAACXAAAAEctaFVrGHtsAAAJcAAAAT//////////////////////////////////+ApJbbrdZZJYkOiUnpZqGz6tGBIFqKbM6YkyKHoKa2iiu51oaaPDrsu6y1W5fIKDHUOyGygUDOlAL/MCo2vUOnJxf2ROUpqz0yBT1LmBlgCBGZRE6VirQk/XSlXdVbSW+o14kZJHO4DBbFQYwr4gAvwxi5j6KFNklRqFk0IWYiRbl2djxCWZSwOcStfOUVncY7ApTwNNPsChfKk0lghxwIg40gwpaa8ByfriaI2unzdWZwu5R5YLZEgNisVWcytkGe2mLVYjdCUjPqLVUyRGdXwtskeZgbNSUxZihtjder5ytesaAy5AKlttskjaSYWCvgDeiJfx6VWyNOxmjNWOyu9PXFdM8uT2IVw/R8p4yleti5H9NOv0ePFSrjmhrnMB4r2BhYpmZVxVSiZCsal5k9UnBTvWqvyEaE9WwTUbzQ9rYz9W9TSuwjJa6I555h8qlhd5yzvGJ4iuvJ+nqM/OUJStSNOsNKj/D7yyXEJfdWgrqlpQYp2TAxrtEvorxGp0YIZ2ZntzI/XueiRtj8cRPIbDy86qvRwIBdefQzUgvIK+jCGcH/qC46s8843Fja1N///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+AS5HJY40iSknH0VogVkKQ6gbJxgIf/7sGCnAAnFaNDrD2NsAAAJcAAAASKlo0G1rQAwAAAlwoAABKNGclmHHwQKMgSARCWv/DQBBmFCmFDg4OzpBAYAElAZ1mejAdyYawMFy5p2pu25s1YCVigY1a0FD1sGABF0FVzCiQULRkN3DN+zNCPT6MAUM8eM8eBRgwpk4UAygZVoNAgIOlfGoclqwiXiQiuHRBoMwocIDp6GNHmLCqxugmInQ4kmqyGVxeL2ngXY/EBoqJgOJ7tsTZfA+mHwq1WfjdPD0MLvYe899wFiLCNpGXIcSd7nTVaSA3cdiMTMTcty3Lzt0NTO3Tw/G5fK4vfqUmsrPcqel3qpSVb9zdJXwnrtDTXe97R9wpJRyvJ8991Xz1b+7Yt1rFavjS6/Ck3VxoiVN+6mZJNxNptt/Y5Yw8gwS0AkaZMGnWFwgMMF5qBlLADFlzBBltu4rx1IGVTsKPuU1Qy0lMXEzGgQy4PAACx0tc7UYIgsxEAJBMcCFgE5odSPC4UgHWKtJH5k4VBSURABYBRRDQLAAOByADEgseIWKiEPFj4DLAGDgALixUYUZGRBxgpKEUZl6uBjQwc1HCA5AiDFgPZjDzQW4zS2lAxBGms0Fl7kr/QmFU6QTApnCoEqsPABALDIIwQmIxEHmdBQiG0u4bhgMAG7McV5JWXkAGkaMgg6CiQ6Y2MGBBQNA1SGRkhIQA4XJgYvoPM4QvhYEBAezpLBWNUwGBGCKbrHtSzYNBzDxYtGYeABwOqdDFnjpQ3WQlLuCoMscMES/w0BW5yGYq/8rgCwyduDBIYinX4+xXl6tKZChE2nip9g77wQuacfSUU1xtiwANPV//uwYKcACz1m0tZrYAAAAAlwwAAAH6mjV72MACAAACXDgAAEUHAFmjgL4brVnolNX3h+//8woIf+WQ0SEFAp2SVNIoEqYEDSuY9M1m4PdIZbIJTIoCiEbprD9v1DVDG72cGsPXq3Fr8EVJXKJtn8PF8VhFaJHRQy/MZeyUQuqzW/PQapQgdDafQAmMKFnAi6gSPhdtOsgWFqKib9ga4E5pDBDTexZ01N2CStHZwI+yZRh3UAr8POz5tHWrP0+yjKzGaogzbcnecGWRlr8GP4xW7D1mUv1KnDlqOUUiCebDnNQTNaWGRRgWJPrLnChxQa6qWAZ+Otii9l2eT0QbvOSWGIq8zqyKLy2NyiTy19aaPuhRuTNQ3TUtx/pl8qODYrSxmlltBlnMbxlOf0vMsea7d/OQyrk1nunl9Kav/4VEXOsEQHQW2dLx4WGSlpMkcOUS+OulKrMiyjk3Dz1YNbUDXiBgJ9ytrmV3fxcs6LHRJX1DbKnWTEi4EGxIim3Bib+0zlRllheFQMaLLRwoJCksXPLrEQ14JjOUu8SDIWFNabtZbO/ilKctZ3wwDYSAYKCvxp0usL+kq5F/Pgn43NlE09ClruwFKHanoah1xZIy617ltybkzpstKulQZ20TAMYOk8EBo5ooIVF8nna5Iy2SsazlRvUlVRwuSwFEuTc1Vo3s7VkMpnc7FqXZ09z+1O3afGmpo/Lm9emHbFHGc60qhqliNLQZ9yos7N/CX1q8dkN+M7pN5zM/Dv////////////////////////////////////////////////////////////////////////////+7Bgm4AKHWjVyzjDbAAACXAAAAEeaaFTLWHtsAAAJcAAAAT////////////////5P39KrLYUFhCg5SQWGJJsffxsavnJevFhThsdqROERF9HbltGyJ6mCqgLMu2o7LItATxQkDQMwEAatLJHVhp14FYsXzHECwmAtmj1C9TKlyBrKE3VONLQXiMLGXtQC5GkClMkV8vJ0CBF3F3FhTCVMo4h3GUewxjlHKAYlGWw7wjoaJ2BIhFB2M4vnCxOTKP5BqFAqQokLMw/XSEn+LNOqCEqEkq7FyPBrLELuLi5H8pWtOp00VYZUJropp22EijnN1cwGtVK05VNHu9bVblthtyrZV+earye225uvSmMv4HqywNQt3xH3TEKDm8F69e61p7OB6/pqprLUEGoPoF1TtMDCiQ8GlusiAGIzLdZ6H47dht/m9dOQUL8rneRD0IJsp4xpvXaYK3SKoeHVWArBKELGK9BxkRMghGNf8Gt+0GVS6s8U4IUDCBFnoX80Vg1jyFJTZ4rkaQYS+MA6CxIaWEW1lMglyhXZe0aZacAHZBg4SfEKKMOKNDIEoEk0H+pC9N7EpVWo0usIAvxeHM3ECrlAXcRoJGLmMtYUy+p46yHgnhcD0HshhZGsfKOdJ8uyHj1E/EqdxdHc8r+LHb8p9VtajjwWZwOVQqiAojcZXzm1yMLM4UgW9LQM2zaL90tul/Bza8lK7jZo//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAArCZ9RLWXtuAAAJcAAAAR65n1Ot4e24AAAlwAAABP/////////////BBTcaRKSRSkYIGIJKTBmIoiSQNc5fa4F2KDQwx+H2rpUqvT9jClF5kEMPw5CXg4Z61NWwqauQqq/CFLNRdyEhR94H9axPpUQzPh6mXL+kDf0MPS2ErhUKZFiNwR1p5GQXVIO4yLMQ40PF0J+TpSqAg6HK0pRDCEq0GI/LATMWp6ErTQurIlFpGo1Fm65qGcuqgPVVn9cky8WM3kEP48DxSQ+GQ/UcRCFqR0X42EOP4hR6GsZ7IYLYbKOXZjNzLKuduO73iIYwF0sezYpqsCuduSMfF0oXxSkzObCuhWkm3NmJmLdrY4toszlCxWDiEvR4l4t3CkQRf+QSkklKECogeOmWngkchcriY6Bw4hsyFYJibcnXdJnebkQOkI/SpIaLgPOyAKkToaUyx5n4e+kAIV0l4oZHjviXrhsOGo0nUvdJqD3uoI1BFNDaZIycI/WErMNlZ6Z+5IZMi+hATJHvEJ62FSrG49SRDtBChuhtkcK6h5dEeATGUdJOHZ4mMMdkc0LQ9TISGcowbqvC9ToVpSLNH52miaKoevEmcJrnMkBpDGN6Kbh5HiroNJDqOpRLRoqiBFmZZs3P6A6QxOsL1ucYTE3syHKZqY51NHW4EdinhYljOXh2ivlhletUz2tIMO9nKrdDn3Fl3/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACtFo1NN4e2wAAAlwAAABHnmDUS1jDbgAACXAAAAE////////////////gLfyF/XrJM65GrhpIZgg4JIJ7lvknIyGAZekS2WBXhbhg8TIp5m0ANzccOCZispYDArAXdXShxUioQmKWRflvXheiyzcKkLWjglnFtmBJ9KVOU/dSXuMgCSqarFn5gufmo1KINpLL2uM799yYU3Ccc6KOJAzOUj1jQlXSm0yxJW9VBmrYRCZmjpNiYbKIuzx52RMoXutKDHkbO3akadBEbcplq+qr/axl8beFdr/Rp/qB74KldqxJIbm4S0mUyyflV2XV4jK+PDFWku1GYjD09FZ69alNJH7rkQp/oMffK/hjvu97z3/a28sMd/qwReJMg+PLAAU5I422425AZlIpWHGywqJThL6RpStnjHmV5tYlFtlbFU524wZEL1l9VeplJaNyVw0tJUukAXg4phgq1gzpv4/KmgOEOtRxT1VoZsteWy2KM2QTsgTgbJE7sNzFbHKxf+p8/Ox+C3dqPdk6rOI4reQgaAAHoVF+1V0zIOVjJirmHvjs5tI5/3MpcH1g1dzcnITRexQZ3Ie3chDsQ9E2Yw7Oz0NV6laTyO1PX7+pjG9yao5TjM8pa2pvU1O3vp5bOZdv0O8sL/O4XaWVWpbhTWv3TVq+ee7FbOnt5XJuzj9e3ZvZ8t1fq1ce5zfZuX/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwALD2jU61jDbAAACXAAAAEdfaNZrWMNsAAAJcAAAAT//////////////////////////klO22ySS2SVnxhLwXAmoMFgi5KOdCPBlsRJVK0ly9U8r2on0u1yNtIlSOibqbK6H5ZlHEZk4C1670r18MUYApFHhlS5ANdH5kEke1+ndiEPP4hW26wCr3ai9nusr2940WDjMxqTjtsg7GobYA/SWynA9JDwMcOBa3AOZM9ZVclImCrGkPHJe7dVuVO1l/ohGmTy247UATkML4cBFBPVlzaP2wVrE3IIl3KdnoOsXbc9hXt9+3S6t85jqvU/KnsVZZjqrylmN2dZW605nrC5YqV/x7lT/rlSVVtTdJc1La31K28L3K3YlV3P6ty8JKctsjctjkrSTaqTBBgeZBgNPIuhHVvrXXOzRw448r/NiTFcKPQPP2IDsrVlhiAiQsOnowUuuXoNAFosNRzWg1lv0iEUU7W+qr8cmJyCOt3kzmNdSteqidZ+qWfl340e8KWgftlklh6Sv690dZIt9lbd3IaxBqw01IZE/zZ2CFZFjz7+R+5IJRXheEGv+5DuunH/sUMipFh4GeVn0cf6MQdy5brz0uhilsRShdCkpIDjcosX6S3hWuX9T9S9ekEqnJfFqKX36XG7lWpY3Uq26ftJnbpq961Zr55TPJvVnUNTVmjoMJq9Vuz8xKbfLFqrlb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAqwaNZrWMNsAAAJcAAAAR75o1mtYw2wAAAlwAAABP//////////JJkttaUkrktYPAFRwJLRAegBQlujMmXJo5QxKoFcVjFNZgi1DMSe9N2suogEmWsItqMvYoon0mgjuwZo6t8ncdqsURDBAmOKCP887WXeafGYo0xeFxlkS5ZmqfLH8MK0rdqJxCM391blLBjUl8Q6CJFoA5IiAvxaqM7NC+YjWqFPdCW0GxGNROTWGns9ibzvpqH5VFKz6SCMQHSS+21yW34dh9zXgdeGX6QlumhchzZysxwpXDtaeu08UllZ4ZM+03RSynfvsaty2YlUtd+A5qegGal0zST9umpNff72zrCXWqW5YmZmU4VaKgzxyxv0tqN4Zym9XpgAJyyxpORpuTAfEWNgUOYYrOC+LvroDkFtPM0mvAr537EifaJqrTbzO5HnAFSOKOJZ0lavdYJr6LgosBEVTX2nwKpQEi7EU12JxtwfZg0+5zGJfFUehJUsxDC+rhwhb06al53NHcE4qXW1uG5nNAin+WAixXwyDKLfCchigekQLiT5cnqq2F4TpsOUnzEdpvoZMolC/HwZbei00xHO9iGEx/CtMuwtp6g4RKBwsBLj8VUK8KFaK5rcZDnBTjCcVKXVlY4NcYYW9rtphmf1s/pAjT7ZsRavmqlYjmzt0Rwh5tijDS9XcCNHpFyN//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACvRn1Os4e24AAAlwAAABHemjVa1jDbAAACXAAAAE//////////////////////BBUlsackjblsBQSGYLoxIK7SQcEwWt10ZG1KpSt5LKCQOhLmct3tO87Teo3jIw0TpsLZwpg9SNKt6DpxQ+icJmoYkDTQtBmaOyG04pawxwnfWy3BB1FBYyZKmkLldmc5eu09y5HnXoreMN27FvCNw25c8x9kbKVJwCtURhJVl+lvNlmLcCSB0X9gJ/oQpq7jOml0F5/ZuIRSMQdL6S84MrgKJVY7ADtzkXa87GTUXAl1uawlEsz5GbnIzuOTM7FInLZU7nMq9/HOpT3rX7qXtXrln8d0HMMLktua+cvy7G/jy9e5erWN2rV7Vy/hlayCSXLbGk5I3LQGzKEKgnXGPONcKB0MJ70LOILmFM464bxUj/sCfeLTb/ParAvxYq9wiagsLmUh12LDBBWnCQSqGAHxYc8jX0Eb/PbAEVkeUWfyDI2p1SolI8Sl7pq/b1SSipbtz8gjj+Rh+YPj+LqvYIAKMNfBxUvgOQhWgAUoS3GDFCKKHH+eR5INpL01WhyLQE/8ExZnGUORtsEagqMWIYhuSPrDEZgZ7o/H3UyldWAqa5Z/Ct27fqRV3/xypXaaRI4Q8j9zN+xjMyOC3/sapZuetWKeza7L6eVY4TkZq0tm7drVKlSHLFPS0trVTCrUvfhSXPnP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAKzGjV61jDbAAACXAAAAEehaNVrWMNsAAAJcAAAAT///////////////BBckkRTbbbkyZAKFygnPKpuByIc/SsLV2XNmhmOuW/U7FGtOxAq/WMrPcpuCxAKFrq32VOa2qnnzS/LxNiL+3Evis4IKXAL9UKPzlRllsZf51n+ViYOjK+jAodaBGKbHWH0t3tSPdpMLcdn2RMipVzNyXKhSBVCZ0231S+TtYuguyFjrsPhbZfGKdn8Tgiaa5AjEm1YZGH1a7XZdD8pm8Yi4j+Pe6MMtaXLEGnO+y2EOVx/e3pZrXZ2DqlecqX6WUxqfbrRwDSxqth8M3Idep/qel3rV2mt4WqlbChp8Zjk/Zpcsae/redrdq/lnU5f7Urf/LIBDktkaUkjcjwFBj/oPeI3MnL7tlV6n26fGeQBBLMXboInBsBMqsP6yNMURGAWF7oKxF43EBomLptMFaNlBzfKLpIR9xU+Xccd0W6NKdF9Yu5SR6VrVi/rgyJ3JQ8lJnjFspDDENS6lnGZQa6sLeNZChrXkJRgQZSFt37kgKK66SMkLitxZU0B4nPfae7p6YTKoXLl2r/ct4KaX3cKXsvdzsNvtA8CWnom6+qHCzyazqWsqStSyrB/JyeiUDw1K43BEDRqp2ST8q5ItNckUlceKSelp8t63es03yq3lj+de3Y7h3mVvePc8bt3XM8buGNv//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAsUaNVrGMNsAAAJcAAAAR1lo1OsYw2wAAAlwAAABP//////////////////////////8AOS2uNySNuPEIAo+A1QXas1LYvkrU4z/OVGn1XS3rhM6hluygzHpl/aJN48lCVLAlvWrJVFsmuwQ8KXyxmylyUFSqIS8XVhKwrTY84TrR9rLivQoK6CEpnaDrEEJUDrtkT+y2pD0q1UpYlKss4iy2ddJiU4rcCRJFnBqMgGMn02MvcmuXBikPR/Gbncu1Zqm5SymUS2adqRvrZiUi1WtU0/DM5bzqy7url/8t7tVLG565a+l5d33+Va1ilyjVqGaKgno/ErVLym7M3uZ1MN52pRczoJfdsTVq/OWcLO8K1Nq1j9jWd+tjZzzthBv+m+6tu6GbJlZgaTieD0K4geUQ5x22luPI49bwXIlQziKPWmGXbLwK4ikbZGoGpu7+cPsP60hIws4CiI4ORJH0kEba+/9upSR2IO4uRfjqQW48rk3ZuX5zUYlmFyxYlbW2vv3R2Gvv/ASPAEEoAsI/rxoBAQQvAwSWRd337jjlw3q1DjuWGdrHU0dSUv+19l7/xedwdhrCpE5F0RWUuHLJ2ihujo6mFBUxdzO7Pw/nL6Tcpl9iHJypnKJRUnLG8OTNeA4fp7e7nZZf7Z5Wwhufqy/U3lVxqTEtt9s0sqvZX8aezXwx3lOYX9f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACvFo0csYw2wAAAlwAAABHfWjSa1jDbAAACXAAAAE/////////////////////5AKcjbScbSTYGDIIsiMwCDgBQwJQcvZpGoEf9YZuz9xaEX5TBr2VVB13IOAQTNmmPMhUjM0AyBLipCoKuNfqzsqLhL2kE7SSpwn+kduMWKOHUyVFW1REiiw8HtAfqApRuAc84agqM2bVJehuq7r4xNYFW0SCalgQL8tya0xqFR1ayt0KruzE3/lD5SmNS7svgV0n2YkzZwqSbvyKXzlSFuVjLJ6PSiYo7lJQ09LZyynq1NHo9bna07VmKavDNqGqlbKVTUWl1BDV5vKOblMpnecrU+HM+d/uoClVizGvqSq1j3/3lqdpZbW+k5Yld21bGAnJI23I2k4gSUiVCwATzrB5wBiHId+D8VJc6j8Q3H4DmkeFhAYNQ2Wswgqgeld8eXhEIfgfKXRi6760G0pae6481FJFMvA9en4Bvi8bxeCrWHZwnTZJohhZlOfhnomE/NBzTKOSj5DB6zUIeIYSYW0QI4ShFMHewDjOA+zROZRL6kNNCE2mjzdP2kchwtQ+xpIk7CUIesnEQ0rkodSpTrE1wKNz+97+I+i6b40CGpHnV7BEZT/W2ZbU5c0cZCscnFjQt5Eb7nZSBAeKebulJNAYG001OtKhRJQ8T+ZYzg+bYu3bA+ruNC9cvv/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwALjmjTafh7bAAACXAAAAEbiaNRreHtsAAAJcAAAAT///////////////////////////////////////////////4S5bY7JbI24SHAnIGAgy6TAAoFBah7NlzWnPm4BboxJ9W9W1ZXUuc0CQqbx/sqJvWGLhR8IChiUrmkuStF1GvOSyxmSajTpW/DgYXohWjtyFs+M0SpL1AhS5imk+Z1m9cRV3VuhdlXXZYrlZxcBIRiHE4tSGvztk5iskOHEe6eSOECE/Ql0iSsMCdOxFRCVjx2sR3O141IUVkncmy8CO2bcoLtXVtDa75WVI+VLKxPVZXssp8MUh4o2G15b1y6pJH71ym1WA/VyuS8sloTnArG0/xO1zYxiBmPpngVJKktkjlsjbhAJmQosEHLOhClYl/kw0CUpbG6cTbJIWGPrKxggiARXQhZi2rYX5rOfmmOpB44Cj8BRKC19UqSyXsPpQO267iT8C0MM9b2B4PIkqSWLtdIXhXvz+jwl9qjyNsu8PUe3MbBBRa8f6QL6MIH4r2BZTw/B6y2LtgVsBqc6L8BnePzoPgn5Pi8K5CTnPA40XhtcGF3JRims9ewW3rdosDUJ5BrjwbMre7VFMzR9yK+rCwqmC9Z4SGMjBEZ5bd64PWvc9ojbmOp8XeMLPjc8f5a41bz33NbcCeB///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAtvaNRrGHtsAAAJcAAAARv9o0+sYe2wAAAlwAAABP/////////////////////////////////////////+AVLbbZLZG5GNDJkBTEjTYSMms/zK8nKhMXaa2OHHfYFCzMpv082cOPBjw07vRhnaZoYFH90HZn37aZBsQd1LuKQh83/iFDLrdNIZHGJE4M6eh0gWit2oSEKtY1Gra+oyIPBTqBhVCFmQdpzEcVZjnu0Qw1lCOtQIWhVXiThw02oGGJdckzFgH7GIIvm2sq7CbQK7QtvV9JYPu3xMPlZEjR3tKR26E+SqYUK6IMx0MlYjxjvQwnKFD6cSGG+ZzCXM/B+7gQntvG94FWxnYoi5rD2pJoW8VtNr1xitIVLRoNgBS37f7ayxuUxaIWa2FEBQQGhLsI6sDSaT5LXpwrRdxQ4LhEqIhgN9JEoWFiwWDgKG0dY6xgEmG7kEDrzRMEYqDaWj7uCWAp0gJQIKPsxd5lVlrsEvxD8MRmzXjM7TZZWq2rN6vy1alX2ZmUxWCneu1GjNs6TOmnAVQlqApW6TBBUBtMzZqclZitp2pCwN0XrgW691amd1NoDacyHi/zbtabDJLb/OVP2sZTayyzpo7lOw9S01PZwr2qtySxjLeGUfpamGt01WHr03EqS1AMSs3aDWs6WktZ9jPyqkk85Tyq9T00py7V79rOWU+WOGOW8r+61r//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcADPZo0esZw2wAAAlwAAABFd1XSazhjbgAACXAAAAE///////////////////////////////////////////////////////////////////////////////////////////////////////////8JXf7f7ayxyTJUDCoiB4IFZEpFdYiWMmJC9AakSjcJFtdVEcXq9HqtFUioZNLQh13M2ySbyoIoUiJAMF5wu7FK0KXq02VXpXvLVqrF5Xdy33b3cnrbv2rXdrM/GzVOocofCSlNjf0NSrGQdCQap4FKG8UVaxzMXD8ndqWThx9Taa5Say/TLTuTabzlLbPQ3W2XRKXIFPI/pSDH7tnLsLzB4exPIPzCJXzoAt39/sWECXbtbdbY4knKzEpGJjwIWoKPkaaIBIkpwC0y1aeyBrS0zxiJKRHyItMlPMeS27DsrmYCeRNNx25ux2xNI8TDEHUzs1YfmJZK9Rhlcta55jZT4u6zn4zletN6S7CwwepRiTiaTllSmdHbBiJIoTEqlNmsX0lnI9iiWwxU2azW7j7cF8q9FeZvas5HBt92K209jvpCw7/Pvsb/a5fIK5L1OpP5XepuV37OUpebd7eKYCQf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAK5WTP6xhjbgAACXAAAAEeKZ87rOMNuAAAJcAAAAT///////////////////luW23WW2NJNmxhmM1AwJYCCQAEoWcGQEBZewmIWaPCjgdAADs/MACaj2vDKl5lry199/44+kgqtgQCApEVZ+6y8hFYzQDCISDQwFARTvx5UgCAXETgjKX5gMZjGyB60eGGgQCIj5FVKC5CDi6GmQc8Zd9AGj4xBTSKq3l4y7ZdcHDaZep3/deH3ba/I5XTx923/7S+8lt02twPL69u1GLdJ2H8al6gvZ3/3Y59SznlWmZuxYu2reeOVm3R4Syphn2pYpa9+bysar5VM916TlftJUr2q/Oc+vWilWku7r61G8rlPas427FjC1vG/3XLv0gWCJslm0ksjbidjHQhKZaEzMt4iUtwWlmNJlUUxFEx/igAMYAYRJCBS744mU+7G4m1SYepoUFu69tMt8VG2JUK3X4g9MVXqgS/1YmapAokwdL4os9dy8mkjhQgLwUJpBJiREGWS6tGiFG8qEuhxkG8X5bfuzHHurX5dlEXI8k2eBeGJLl6SiZdMpLTnEhO5WQEOoetT8fF6c29oYn6sgrs0WdXwFWstkZ7TSmQlqR8RWsyoV6jQ5ULL5RuLMvt7tq1lxXTxncl9/HS6zIuFIyoZGeRVQ3KuGl67ZTmdJSK6hVXkbEbN3Uy7MhINc7a1QEWuNq+ZKJBTs+VpjaIqhfOCBwcuemkmKtKLNMcuhjAl//////////////////////////////////////////////////////////////////////////////////////7sGCnAAq5aMvrWHtoAAAJcAAAAR7VozWsPe2gAAAlwAAABP///////////5JUtu/u+tlmCoyo5CWz4UO96oWOLuYQy0tgzduiRYDmpwiCIN0FM9RJ+BzE2GKXRDDNPLanDgCvQ1HBDSkAzAF5AgzjqP4b5QoMWA128rXqIIU2GVBV57OaHLEK7Qvsy7LlI8jQWBTszpyatvG5MaZ3VXDMCOoGJE3SqFvG16rKJtqcmy0aZsXNGSAb0rnk6nNC7qokmVGXw0UyimdkRpmEGJop2yC82sqduY0MTysX3CuqTJViQvb5jaVYyobAbtKyRnY0aplchitWz5mVajXoLcZBP1Cp1InFYjThcV47maGZ6tThzHqqEo1NjJc//Tjr+zo7W6wkpySSONpElC0WsLITpQ5tQa2txhyjKKbOH1ZSw5KxWBgCzV8y+BnJkqhjk2Xnfdy2RTUcnm3ahghapsXbUsFkS+Tu1SQFBVBS41JdLYBMH2kkRg2jm4ycGSpCu1hEaJSobYQMLMtkxjlAPjjsRgVZQu9ZlcdguSixDFZVRINmlBWOFgIGNG2yBFIbC7UFVylsgUQMhh6yogYtYUo5ty54RPHgGYT5UUqFTcjIYHM10AujEhhxtYUPISJY0TsCszNBmpiWTapgfmF/BBBD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAC5dozusYS2wAAAlwAAABG12jOYxhjbAAACXAAAAE/////////////////////////////////////////////////gpNtyT/pWa4XsLOoqBYaqitb6tZfZlzW2AsAhomSyikcFjqg7OWWsia40px2z0r9yh/4fYCyR62v24EVw0qESVt2gzFNTY2IfrUrfVjNaJ5iSXHjNZq8wQmnNSJGCErOi8aJF7hO0r2KwhLHNgOkO51GQyz48KIaiVWxLaZVkVaZGB2susMKnR+UWD0nrDIt1eW3HRIvgTRndj1lYcLjzjdhbckk677lsO0cTxww/ZpXqtQVj08SpE5pUkj426U4VRDRGS2O54aNxjmVsRH7UZcsfi///3X/fb/qAW3G5J/0rADsfgNYoyDCQANRcDmHMZZPlgYIwRZiHHyWFDC0RjInh1DLjFxNFIKxRt6aZSmmN5nN5POz4VmozLK5PXNseTKQdErrEsaYXXIsRn9Ds8MC6RbHLpdOTMwRIKuItwHtS6+eLUI1uJVTuEpQLXnS4ZUXOWOT8+qSj5QYII7KDQ/XKkcDjpwcVjXvITx+wiJrhCagVMvPHY9YuXR1NWnjS9jMatfdXIZeO3jJbAaO2cH6JpHEToXESE+88thQhW2qObE5fdxEses//+/0///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwALK2jO4e9jbAAACXAAAAEdFaMzrD2NoAAAJcAAAAT//////////////////////////////+A5pLtrbZZJWLJHoKNzgJRMFGS9kLyud9aQqOAsS/mkcKOSg/TaU5NVtqcz/QxD6pGHBZVBRUIWqFVpqfsMzi1KiG3NrEhJDK+F1CvqlekRD0VUVz9AMSujhZ5NfhxVGcBwS0Md3T0eQcDx5paaJDNOfmSZKJRPQgSpVAPDUSh8XGJyvNnQ2OD5lKO0QoXYcG9zX1y9x0ThLJrxnp6cl4hmBmVSmlk+WnQnHcJVPViIvnKtGmVkg/G5GeTnRJgURj46dlYiHxFtxkYJEND/6lk2PS2WXi2VGqZRvVYXLoYtFc1WL9VKC/vrAUR3Zmh9trbZgaom4GiUAJsHOLxYWx+E/N9EiZoUiEz0dK1xCKRRdgLaM0kL6RGCbty3LJTHohFY5HJRPSagvWp2G4RepNTVXOKzd2jhFqphTQdPyzJSSPJfa92FkYVS/Worc1mWebHD8bbPHhy3Y51uCr9qtuamCOpVa8Uq5hpFcoiJVPk7QnTAxK2CuVQ+zETjKqXeHTgwOTYr+rodmSM/tGvJFxutYDtuU9H1oHYKKrTbTR1RmtkYFwtr79RxmIvBMsMMdsY2mDEL6ulzKyONDoT0qRVkL3srdW70LVqWhDvy3//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAsraU35+Ht4AAAJcAAAAR0NozWn4e2gAAAlwAAABP//////////////////////////////5L2+2/22tkmAnH4Pc2QkB+iHLw9Q3iYkmLMvAhIgICyJzLBtVXdF76up6A5RjF4Bn35iMol9ukmbkpmc6GHJDUl0eiMstT9LLaY8LXbW2Ouqt0VRt8WHVdsEfG2+DPBU8Uv0dhanymcmx3CXD1WJJsiHRTDbNR3erLFkb1e/VsquSMCmGzMJ9LlljKnc8SqUiOVEpM3OemVZcX0NuS91lCm9lasqBhrMyyH+zqTOtOaj0rlhsb1Wf5eFCooSimJ+b0dycoKUPV+Pyqni6LZFc5S9M7KjFy5ZiPm2IijkS37utN7UqezLu6QlTbW7S2yNuoZJwBhIZZ8jkq1h7xP+sMxiRM9bqgwPqZtASzFTNs8zlOjHXZhi890dv3am6HvZ7tFNxOdppXXlNFK52csUfa24t9q1MS/GYlVDCVLIkmuPAvaDOjZYECCpGNcQXx1sFF7Lk3sTY4u0anVHFYmtxVUGOr2eMXOad+yS6mW8sqVcHjMknzckFQr25M3TyvhwW+G3L7MsNm21vZWNQO6t229nky9iulhVRITLmGsvULVrAZK8qXy+4IccrOjVt4ha85HafMiqSqvQ1VlY1QLI+i5XSoRHWxWsCHyF6FmZCLvUNFyLjTZSwlDtdjCn//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAC2VpTGsYe3gAAAlwAAABHCWjNexhjaAAACXAAAAE////////////////////////////////////////+Js7vEPD7bXS3CSVhER3MWZKRpSJS2Kzw4NNR5cgvOuk2PaOqBlLtxRwYcbrMvrUr1Jdel92HJLWuV7VqWZ27VSVy19befJmb0rxG5wcri+2WPlHLlG0Wnywo082K41hQJTycsMnpYOyrYUCKSTFYthrCopQ+iSprLTBmFppAXcEBWRB1U0tccITF4vlF49WGY4olCs4ERRccQaEeuj6QRCSL68wnIJUEwzKKkwViHdZQoFmA/DYtJBriIR4Ly0Gak9Z94tHJifk4RiGgnRyWyibrV56VDhPb93Z6aNbvtp+PALrbrbJI2kmEBaSWilydTtBYg+pi0zGmR2XyZa1UxDRncqKR+acN27kZgeH3XbaD5dFpVDTdaliG6KRyBumb9w1bhyN5w7BrvV6d2bUPQF2KY5Y1pFS4HwlkNQZqTErHMZicIhxmrAg3s0m9YUy6zZirdiUVZPl5yT1xw9sB0T6GBaLZ77aHRRrTZ4dL6nZMKA4px2cfVF+F9CL5MLIloIlnykqHd3ZaLOiWZPmyg2spWOis/XysEs5Tqj4541KZaL3ZZ05K4enNoPOG2U2j6fkSI2xj8nJpOfbZ/qTO5Xs2enZmvTTP+3W/5frzYTr9Sp55GVEB9+Q////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAK9n7KaxhjegAACXAAAAEd3aUtrGGN4AAAJcAAAAT//////////////////////A23329t0jcoBAzEmBdFjI/qwkS7rhw2obBNPdXcFxOjqnfe9uUS+9D0MQPD7uX5h4I1FqWrMTUzhLotYv24VDMZju6GGaObl0Au1OV4Ol8MvpGX/Seww7BE0ymMI3zhclKp8hp4C2SlBceNniujRrVydafrYD4mnZd1UlsZGBOYqkEbxC6ISk1GXEJo5aQWmEqtKp0Sl1FR+WB7F8RQCgrh2+DxgVzAlnBsdJ4xwH5eXSW64VDIpiIP46kZ5cSsK4+rQPlwGT5gtEV8xGw/vjsmJSJUJAzKwcXBv4zZ3EBpezvefvGWijQaScZl7oxACtu12skjaSYGOzQyjh0WmzJSRQuSPXRMQaHA7/HY8sCQSiQJIBCecEK7x6caw04+ZYdJWjcsCcO5whtIlxwmXiM+27AeqSdEsjOkhiiQiMi1dY9aJrzKomLXewqFI9P2S5YS1j1V60vtHrC5esLCwTFhTZdfgXJCqpTKjIrL07y0wslcLUf3fDo+JSz0Rg2l8HhOQjY4Euw6iUtEgqmCOIzVqDJX5JhTp8fPDZIhkqh8rPQnQisfn1iLFx9YwPvmOpbD5YOsaU8MTyro93/86d6vz0czOdP12ZtMzN82ZybZP/a1etTenbbM17LTn/9N6HCS1P7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAq6i0nrDGN6AAAJcAAAAR7aNR+MPY3oAAAlwAAABP///////////8GWSSR9SgJMiGzeZnKTUBJ6hp1lxh+VsUb4M6W2wkJ7n4zk1VC0jioXE0imgm+xLhUOKKdO4asUUeErWyIp1c4tqMhZonotYUNXtq4fVXZ+jUWVFNM7nq6pucLFpTUR5e0I5ll1S0uZOljp6teOlLi84Kv0ULU7fP0oesL0cPR1XnWHUOmZLT4yVRCVHDLzRFfdY1Q9AqQk5wZRFVs7Tna92600brGuqkUF0tXgPDJerssVRulos9JVjODy+GxSOi+ZPlo+M3KnfVisxfKvMx26t67XMtNPv8NXto/+Qf2tze7161Zma3d561/6Lqd/UY1qd3oVgeQm2y2Sf9KyDYcAfLYW9A6srU35f61MyBszoCIFQFHDYeFaFcnFeGSJEvPQ1iGRoqFETLpzFCZ1YnJ0JgklS0TBkqRdilllEKMSMmCZgYaxCuBCJxhYqGXqTofO2JKICZNHONCIdgOEEpjTTzChej7QrlWQs+yKkZYhWOigjIHLxonE6rcTB5xETqLRLMEj8ZKjDYeZRMjiJ8uKZKB8cshFTZUjIVyUbk2qi5IVVe88gdfiwUrGWD/jVZX8vVTj72NT8s93/kbV/qX9f5u5X+fynvlK0tIcmUt3T8q///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcADBaGSOMJS3oAAAlwAAABGWYtGywwzcgAACXAAAAE//////////////////////////////////////////////////////////////////////w+7qqaqiICcAYu40JuCS8ul2MTaTckVMsBsPd7JBvap+cu3aPyrdYdkxcdtKkjWl9p+TKTK1nl+G09B01m1sempJJUUNIYcvjiS3DFI3KpRB3AbGamf+fa8B6JIGAaAV0qJBK8AjQI1EaTBCQIQPIpkiCSZhiVlhLFpwjp5OTyGahOayF0YTSohMjYOMeigKKOOg4LrTLEYOBwSZD0HJ45FHBwYPD1rT1M7U/647QnrO8NpuW9I2zIx/UyfuZLTMR/L5jQ0vKK+12rKApI0239VdApK/QqKNMll62YBd238Y7l7AlZtGsLok1QqbjCZRFVqom7gq1E6wzUd8f4RV2Wera9l/tM23mp4z+/9+yzY00nspfxvSos2aN78xJWZq5l+cx6cGlp7pWkrq3VQtswql49PGS/izYbfl83N89OLWg96fl7RdVdhlzHVh3ZFqRMmPy8/sAGsaoJn8qKvilf5mskW+oceFFi93P5////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAOV2FH4wkzYgAACXAAAAEQYQcbbIxriAAAJcAAAAT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yJJIkr/whdpZ9EpyRTCS0VJVwjw4kGp0N0qWTs7B82xJuae8ci1jNYdpJKRPUUMu1yRlS1D4fDYj0IyZinDtOqfDdS+EGHKstaihmm8vnRixxPgVNETgO2kFTaj89f871DweRRRL9KuWB+vmJCp5e//7+kkp72kriePYdY37vcboStWSKBAIJ3c1oiPJLd8ZEsOtSNPCQtDhYRVpV1tXzs6eWofewWWlT8xQ2rmWbFXGd8eS7s8yWH7fv0I9NpUk9mW1nQohT7RqslNBSwI1HiIsxzziFNo///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAA/8BEYjGEgQRQAJcAAAAQEwCRiEjAAoAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RBAAAAKjoE3QX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z+qK0j/JAcJYy+Iajy+KEsBvpZDF2tigqJyMVh4cJwohbICYSAOJgQVJxgyBgbHwoeFaNuzo+FCp9BdYg1ums3vv5vh5EY3zpQNbPjO3ksZX21h5q993+Imd5f2vTWNMcZWViQ7PNZfx8R38JWUYJj/UwsZ2IREeTH+rjQaS+D0HAizrj/+7BApwAGTABLgAAACAAACXAAAAEYRZEcx6XtiwiyI5j0vbHsce7Y9UdqMETqdbVlVIynW/cznOs9BwGGSdOMLmxp9V/bBEzZnx4ES7+d5imqah3gaeZTlz0aRHA/7iP8Rn9UVpH+SA4Sxl8Q1Hl8UJYDfSyGLtbFBUTkYrDw4ThRC2QEwkAcTAgqTjBkDA2PhQ8K0bdnR8KFT6C6xBrdNZvffzfDyIxvnSga2fGdvJYyvtrDzV77v8RM7y/temsaY4ysrEh2eay/j4jv4SsowTH+phYzsQiI8mP9XGg0l8HoOBFnXHY492x6o7UYInU62rKqRlOt+5nOdZ6DgMMk6cYXNjT6r+2CJmzPjwIl387zFNU1DvA08ynLno0i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M6IiZUgVAQwTUWT+jQOAk4kJQoFmBEJQBEwMiEQABQIIMkQChECAEDBblLHQwIgwwsMCg8IAgx8QBwMBiEwwBTFMJLDEg8wIONlVgCGAkBSjSRd8EgRgIAwAWBGYIoEAgWYBQGLBCKbojIDDSZCyn0CDMKiAsJNIWBCwb1gtZojfAkBDARJUwsDhwtO7jB5Q//uwYKcADAZmUdZ3YAQAAAlwwAAAHi2jT72MADAAACXDgAAEo82dsywKsEMFBWY4BbFgNiLW2K0tMsA7k6js4kDA4KW0AhKJxJr6tyJC1R0LW84da2qMpNyStFONpOKaiMi4UIVjMrPcAE5ukahl74NaXNyyBa35Usoh54mHLycaHEbi4z5tSqrAt6qRZr2Ok+0DXmeqCr4OUxKBe4afZWCpIGc6qxFHlgr4JjLGjbKXGl1mU2d7v1bs7zu8OT0qlTpVtP6vGMQ1Co41h/l1Pq8K6aVlSYrNFlKXWom110Yp2DWkuj1hyxm/X2qZIaZVKmKqVnReZPtkTAp6LP64NmYqS2ltZ1Keemo/DTErTSa/Nz93GIUdyHKSBIZnYJzhx549D9lvJqlj/3O3O0t6eprXJ+3Wi1/HC/d7nKLleN52LNebrfTVawApqW3RqSyNyZigxuGm6mcsp56lr5UDgAcObI63ngYhOx+mj0+z2AS9u34YcsBCuMwfQEIEQgUBChM1ZkFoolvGWMUSVUrWHAw0jHKkyVUPsOfx14hSpZ8tRYUBseZeQ9SueXsjLMyQJrSMqwrY7YolIrjbq1Q0xaEThwbi5qcTVQNxTuTuNGjrZxyHYaiEknQtBqMx0cOQWRCBxm+Seipak8baOLkqpFe+Ya2pGbFeZSIqrZ1EsqQu7iuXJ3ZRog7i7EccKGFO2I9heGm7jxIj7UPXhatM/vNR7Rwf0hsET0i4tiBi24Hff///////////////////////////////////////////////////////////////////////////////////////+7BglIAKUWjUazh7bAAACXAAAAEb1aNRrGHtsAAAJcAAAAT///////////////////////////////////////////+SXJdrHLZZHI8BSHeCESby9kBq5S4rlPyoCpa8s6zp4GnLCs5a4qeKKPwK0SPTS5U5jGBJJrLipHLqwgOKNaXcrdFqSeh5VSNMCSGaPKH2gVrpdTRQlUuMsu4L2NDeOpaNUPvZ5bRrwVedqBN1PMbpdOLwcJ4mrMLsZRrLsuyePtaXpKIS4KUyR+pQT4WJmbS+sWx6VCbwYQR4OZClanlt9AZWFZZHy7SsiFtak1BpNAteE9gz6tPNGpuM+YYMCFEjTwoF4doEaWO8khVYqy0rLBtvWMza8f3rHlq3V3JsASTcjd/dO/hcgDMc1TFfQtxuLK25uuzihcrA/ydDAEeLwQklKoMsbo3IZACMLsXeMOptJSMYnBfC/GosnSiULJqfZOTZHCoTRPLBeEs41jPLXi1vSBrdsxIbt1Gg+eC5JzRBC+IJXnggTWNwewYCJH+VQOQ2lOTgiwkBNULZEoX9m3lXaVjIelFyb6fR9zrQ9ID8RDEtn21Xis7C4vZUul0ZSEqYrjH3EhUrCezP81mxrcPeKTZfyuWW1UuENgYHJWMVU/BOx8vqe8VjVigftdobKpOxXXbMinJ5hiOVEf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAArLaNBjD3tsAAAJcAAAAR6Vo0msvw2wAAAlwAAABP//////////////5LTltkkscbccskIM5kDFHwSca6NLbtxb1u0VlUZmyUIS5srtjEPMlQl4ci+OQ9R7OwUhGUPEZDYBxsKvSbiplIyULgC/XJJi7GMCvSg/RdqarOTtvKjt42cJuVY1spTlapsK2FyWymCW5MIZk/LWq7TYLeVhzvLDhmBIy6UYRkDcIJZJDjdoFjlyOS6u8EOwG7L9vxhKWnLp+Ip9LDw5GW5QG7sk+Q1ojO0T8Va9iieGWwxg+kLlUJtUkglcMSrK1KZmVR7fLFeG5VLpLK4rORmTwDdiEviVqQSP4BygjOeordm/NyzHO1TT9JL5ydm4Jlsbn6UktySyOSNpJrDjxArB4B0heJQJtmwvhDEpvuk7TM0GUtFsJ8TREjCYWI5Uob5Og5i4q0yxxRwwEcfSnci/tyiQwzCFFiQRfQJwjBpCseqxfYFLpyZVxSj5w8aDBa38KK3tbJCu3Rle5HU4qaJZQqcjZNkYJIuYxY06ynW5p9RxFXtzcnq4mi6XTHdCHE/WNnbVChNrOC0u8MuGTS/ndau96Vitk23biYYHmWJuhwIMNth13SOwuN9NivpSMyti7s+jPXetVfOosBkb3z+NLHzRmdNERv2hVQj///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAC2hn0WsPe24AAAlwAAABHBmjPae97aAAACXAAAAE/////////////////////////////////////////wTLttv//vrcWwH0D1OgBagFhEmL+J+MRJIanD3YTALe/wXAesyCFGqnIZiSnQh4QKzaJ+H8LewVN1WSltORGmanHatZCqVpWlzTbapjBhJNocX7HAY2bqnKw+WtRpFMX1iULSmz+lPxvbE2IyLWHohhPylF2dkKHSN8OcnCHpWKhpxGIXNC25Xr7yVVm4hZ/jwVzepobcprr7Yu1ypbNixa9HuG6Wm2NvcnUN45sMkGWFEhR4rc+SbnbDJdrhSauuGZxXm2ZdUcY/u4QKUYXTFzpXEVsfKxuV1X149pr5YvpCS25JJ//VKjUXHhaHoKJsLOm3MGVNydZcELCgsPaBLeagidkqZhSftyYOUHDHhM7HCJxppqbZIDCGY0xGHE4AGxAVAwLFAwLiIWDhGDiIITvBIKmgWrLyK3lsFMy6ilbS2WKbvwy9+HPZo5zNlmOUzVtmssGXSw5VyhqUS5S1w8AlUOFhUdAhIfBoSoWYGJkoMOhoyBKHmIEgXEACLmMIgocmFjwUGyEIMzdQc/GAGAJRxlIMAOzAngzZNMpWDSDMzkkM5ODRhcy0qNAGzPRAFPJkIsZcGmVgQc3GKCpkoEYgQmUixmAmDnIDKIspDy2YcIkTONGoGIjEgMw8QMeCzIwAibzFg8DO4Qamai4gAzKQEeGTHQUmAjGgZQoHCBEBosFYGNAiUaWSXKWSUCRQ0AKBEQIzZOpK1K5IUv0UACPxQCJNpxtBSbX42zUFf/+7BgpwALymjSZWtgDAAACXCgAAEgiZlTuYyAAAAAJcMAAADw630HxmLS2NQLI5C/TT5LA92mhE1ILUkg6mpaOlppDbnpDP2bc3L7tyX1yiWm6k00243JG3G5Hbk1WdgFoVOp5YNQZ0mdPMmC/60mayFgDJIHL7io0ocxqZhQLZdmQhgUBNLizm0ELeKO8huDoXDThsnZZZhNBTv23eKU8MNhm5c0ypCWuP9DEEPa5LEHbZ24jfReMPoqoCS1dCFIm0eteUqdZu1NXcVYZgDhLaTdeNuQMJTTRHaa0N6GBzknVkRRdJY0Ftozp22dUqesOt0eaIMPL1xeFMqYi/EVZpL1EnxeSHL8jkbqOK97eua1FyHKjTLZlYtl3o6nu37yNpPRCxG9XKLUsqOu6ccfi1VcyY5R0U1jYcmmgCBtTsDQ1+W7MfidLYopyL5525f+e7aQVjZSJSSJJToupvEKQaeIIpk8wtzlhmbYDZB1lDNO6y6ZdLp5gb8wrKHHGizaRTO5KHbgJ3mbt7B0nhMMuK6zWG9ry5gcNqYqjZk1mAGxsPJAtRcyUNfLIDgUyhYaL4sUso7QAkYgKOjA2FrkZuClrBN2VAvtQxkbYko20gcYGWnDBzcbFAwwQJAT1bGRLjVpgdXD7wDXjUZQ6LZcqUNNR7SuSGL7ssa2sqXvNLHJaolu2GPF90zWySlwG5wdOQlh7Z6K0ruIS3cBRFb0uu4UsBY1LztxmTwDbiMcpqShik3D/Wszz7SeLO/QRyVRGjv2ZqitY2LVHG6mE1Sb+OV888reen//////////////1G02yW0yUVMOJKkkPM/C2v/7sGCPAAhyaNPvPwAAAAAJcOAAASHtoVGnvy2AAAAlwAAABJNDGdV7iKRmjPXzzVy7i9LJiWZ1cn37guWXRdorpqMhuTJeVefFGtkRYw2UhBIxZjFIQSZ91zx51pe5al6XqiyGKOa04GLKiANWtV6KgcCp4tMNKJgJhIbjWCZwNhMp8wSlDh4QWOTrjTIC25cxTld5bkzSx4Ri0+JOJCrxfaGn8iL8vQ0BnTo3WgoL0kDMwSYUrbOzMwSkCq6fbSygRmpalA58QwJTBEVUrNkuG8bqspO93WSvYmk5MCOclcyVctKst43oik+yCTNkgduddyJdHGv5XY03Z+Gwuw5D8NchL2PrBuMM1JXM09qTU0Bci8fmrc5G/kU5amtV7lg6vLiytNtppEEkuj8QD4iWYlaM20yvZ6vXjLGbKbIETtGq/cLBoMDg2MqmYjDdq9AxVtyJeqg/3apPk/Usl2taQ8QKV332gFr8wgIaey1P9AfdQSIWDNQ+KN6RLDxhwiM1woaxhPchEGIQeCzgG1D8tQLLBLGIKYshGSITGsGMJogb2JrNqjjAgQVqTksRStawuaFSRTJ3nYTDpl2KoKUsyUMBA0f4IZ2XlUwTHQkrLUEZIUAUyZhB7i2oPSJcJ3r0uhlQwvi15gMBO5VX250Jj0XidJG26UkJhFybk7+xyG6WXsoiTXmVShu9A7svjEFTcVmJXDU06L6y6xJIYqTEVeKF7n3apZ6DqW/kCcZf3///////////////////////////////////////////////////+3SxttpIklO2HcJjIXMoEMak/dynun1zLr2F//uwYKcACZxoU+nvw2IAAAlwAAABI0WlT6fjLcgAACXAAAAEthbB35lcSqzNHnbygfsgiETgWBHctL1fRt1h2tyiAX3kbdoEhh31MEyHTTKQmJppGkKF5l2iZSSw7JlpfZRQtKBuTDPDmjFcKqaA0cXDti2YMMUVDp3RFqxYMncYMXuAKKoVGy348MgmgoLjv0agDOSUdci6lqMsbOxthrJX5izRk1YlAz/vXAkqbuzxHZ9mFkRSNxiGu4j2DRmWonT0Fqmb57XTUuZEsGpaw2CHIe+GIqwdgibLMWCO9KXio25VInbgaYmnyduC5A6EskFI3OrH4++0cwdZafw7Dkdl0HYwzWoJVHnkhx+og+kpgWgo4lHpFSXsa1ea8+PLeXXv6HrY2222SiS6PSwExOwfJyMpxubK9N5PrU7ZNFrCOeq6VywrHN4xsbLFZ3JXLS+UZlM05LDoHcdLiojvOlEExVo3hXx0CMGWl54HVsWiAR1HxJIQCmKACmDUoAKhyaHAyZLph3GoMcTIZ2psYGzNzEBGTh44SONlkMHL9o2pFI6qCIEk/WoAgBjieK9QcMjEsiOLDKRSna8w5qjyNzfGWSxmBemZlL6vazZszA3pclpMCAoJmThwQX3cEuUt9YFdruO2/jlQLGIu9MHJYJ8MiU1Z3L4IadHWwvtjNQRSw/F4GiVdr0bfWJQl9IisZmMCOC97Sn4WJhAMMz0knH7qRGBWkyeCH7huExW3GqCcyuyO9R00uwv1Ak89V///////////////////////////////////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7dHUqNBoF2ylarztYaGsauwZ93VljkyXGSQM+rXXpfSayfSA4lIKaTTcc2Zma//////////////////////////////////////////////////3LJJJLGyAlMK+zD2WjNOxaQtmTkf/+7BgpwAJzGlT6fjDcAAACXAAAAEijaVFp78NwAAAJcAAAARDVieHDbmJUK18WqQNFCWpiYqR1E9jaFeZnSYjuKFI0lQYyCZ9lciWE/S4k+J8JR6hbeoAJhaLsMImJSASIKsqCLLIiocQU11hxJuiADpfOsTEUugNqL/JFMTtLdahPMTcFxi10NFpguhHJS9Za9lbxAVnAgMgnfxdyWzS3ehSokb0fU9FFGyJTPk7lwt8o8xJLdX0abk0wuWXFBw10JE2lArTN4do2ssgUueVhjbodo1ZUrmlE3oWo8y0V5sgWcqFv5a6z9sVdJ2WsONUf9lSiqHzpJxsSVRR9ae3zpvDKNuDOsqcOH7sxSrWiUizdJz6aSxytEa0kdJ1ZzqQkmksJdkt1sbJKVyEBvamM5j/Q9XgOA4RB0UXa4zXnPVR4DkCHD/uYV1cZTaaqdQ1SmiQUtqVJ+QRYJWJ4uz2IUJmPo/6Bcok8TcDCOQVwNIL4bqQLcL8hagDZDUiBgGiNEMBowXV4GWjLFyp9LSGSqwAETqEohDBHuCxYKElnKjDyuw7yZJe1irE4CihZYHBUsHHqltMAhlXUdh1gLeQCpBmbRk1pTcbsXWZtHU6aj+PSk+X4i5gSAghQaXBpBDzouC3ssb/UA1GHNaZ02Ni9K+sVYI0ZUimya0QY202cpqz6+6Uap4Ja7Dq8XmbiXdhx31i2YunLCpTDMO4X47FXadlyYdtcnqV2WIy6rLIad6mxppVQQ1086hX//////////////////////////////////+BKzuzw76xAFWoTk4gIFpheJk00nMoUBRL2o8Jmv/7sGCnAAmJaU9rD8NwAAAJcAAAASORozPsYw2gAAAlwAAABEa08zDWHIZGMCl0+xFmTbQVGFUU8UHpXZdKXrZQqQSrYWHLapgw415HVmzWS9qrGbLKMIHHcFIZsKYrsF/kATvpegBaNS5S/qoDG4mUABskAqk8GLJ2IxpKCQo+hJbRiKZRlMkklUXGfeBExmFJhNOpX6QEoawIAWGQZAQOkDDgKLAC2y6lAmeL2mI2vpB5gzvMCYinKgNgJKpb69ZW1EEJCCuY1pQaSshV6icyktir1lU/jAUTd1+1iv6FggJIECYhqRf5MoSEXNLsqCpCqasNVK5T7qat2e5kLBa1WadprT9duymW/lqmlUPWq0azpo1a3qmps+VaXCmtVrXNVeDsCtqgJsJPmX///xHRVkefnG6+2c4zq26woN4trNrgdRfUkijBLIt5qFiQ1qf7rS2dY3n5+9WraDLTev/W2M43W262xv1xnW/64vFtVWJRXb////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAD/xCRrAheuJOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFRBR1BsZWFzZVJlZmVzaDIwMTVfMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIwMTUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/");
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *\
 * =========== CONFIGURATION END ========== *
\* ======================================== */


var GB_BREAK_AUTO_BOT = true;
var GG_GO_AF_BREAK = false;
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

if(!GM_getValue("botSS")){
	GM_setValue("botSS",false);
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


String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    sheet.innerHTML = '#round{position:absolute;left:1100px;top:15px;width:120px;font-size:20px;font-weight:bold;z-index:10;text-align:right}.duration{width:30px;display:inline-block;text-align:center;position:relative;margin-left:-30px;top:-4px}.duration>div{background:white;border:1px solid black;padding:0 2px;display:inline-block;min-width:8px;font-weight:bold;height:13px}.hvhp{width:inherit;display:block;position:absolute;top:0;text-align:center;font-weight:bold;color:#ff0;font-size:10px;z-index:999;white-space:nowrap;text-shadow:-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000}.chbd>img{height:12px;}';

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


	 /* ========== SPELL Control ============== */
	if (settings.spellControl || settings.showStopStartButton) {
        (function(){
        
	var spellSelect = GM_getValue('spellSelect');
	if(!spellSelect){
		GM_setValue("spellSelect", 3);
	}

	var checkInfusion = GM_getValue('checkInfusion');
	if(!checkInfusion){
		GM_setValue("checkInfusion", false);
	}

	var currentInfusion = GM_getValue('currentInfusion');
	if(!currentInfusion){
		GM_setValue("currentInfusion", "infused flames");
	}

	var meleeMode = GM_getValue('meleeMode');
	if(!meleeMode){
		GM_setValue("meleeMode", false);
	}
	


    function genShowSellControl(){
		if(!document.getElementById('aDIscpcID')){
			var aDIscpc = document.createElement('DIV');
			aDIscpc.id = "aDIscpcID";
			aDIscpc.style.position = "absolute";
			aDIscpc.style.top = "8px";
			//aDIscpc.style.right = "20px";
			aDIscpc.style.left = "1240px";
			aDIscpc.style.backgroundColor = '#E3E0D1';
			aDIscpc.style.opacity = '1';
			aDIscpc.style.width = '80px';

			if (document.getElementById('2501')) {
				aDIscpc.style.height = '150px';
			}else{
				aDIscpc.style.height = '130px';
			}

			/*
			aDIscpc.addEventListener('mouseover', function() {
				//GB_BREAK_AUTO_BOT = false;
			});

			aDIscpc.addEventListener('mouseout', function() {
				//GB_BREAK_AUTO_BOT = true;
				if(GG_GO_AF_BREAK && false){
					var nowHP = document.body.children[4].children[0].children[2].children[0].width*5/6;
					if(nowHP > 15){
						document.getElementById('battleform').submit();
					}
				}
			});
			*/

			if(settings.spellControl){

				// scroll 1
				var iRadio1 = document.createElement("INPUT");
					iRadio1.setAttribute("type", "radio");
					iRadio1.setAttribute("name", "spellCT");
					iRadio1.setAttribute("value", "1");
					if(spellSelect === 1){
						iRadio1.setAttribute("checked", "true");
					}
					iRadio1.addEventListener('change', function() {
						GM_setValue("spellSelect", 1);
					});

				var lbRad1 = document.createElement("LABEL");
					lbRad1.style.color = '#5C0D11';
					lbRad1.style.fontFamily = "'Verdana','sans-serif'";
					lbRad1.setAttribute("title", "swiftness/shadow/protection/absorption/life");
					lbRad1.appendChild(document.createTextNode('SC #1'));

				// scroll 2
				var iRadio2 = document.createElement("INPUT");
					iRadio2.setAttribute("type", "radio");
					iRadio2.setAttribute("name", "spellCT");
					iRadio2.setAttribute("value", "2");
					if(spellSelect === 2){
						iRadio2.setAttribute("checked", "true");
					}
					iRadio2.addEventListener('change', function() {
						GM_setValue("spellSelect", 2);
					});

				var lbRad2 = document.createElement("LABEL");
					lbRad2.style.color = '#5C0D11';
					lbRad2.style.fontFamily = "'Verdana','sans-serif'";
					lbRad2.setAttribute("title", "avatar/gods");
					lbRad2.appendChild(document.createTextNode('SC #2'));

				// normal
				var iRadio3 = document.createElement("INPUT");
					iRadio3.setAttribute("type", "radio");
					iRadio3.setAttribute("name", "spellCT");
					iRadio3.setAttribute("value", "3");
					if(spellSelect === 3){
						iRadio3.setAttribute("checked", "true");
					}
					iRadio3.addEventListener('change', function() {
						GM_setValue("spellSelect", 3);
					});

				var lbRad3 = document.createElement("LABEL");
					lbRad3.style.color = '#5C0D11';
					lbRad3.style.fontFamily = "'Verdana','sans-serif'";
					lbRad3.setAttribute("title", "normal buff");
					lbRad3.appendChild(document.createTextNode('NM #3'));


				var cbInfu = document.createElement("INPUT");
					cbInfu.id = 'cbInfuID';
					cbInfu.setAttribute("type", "checkbox");
					if(checkInfusion){
						cbInfu.setAttribute("checked", "true");
					}
					cbInfu.addEventListener('change', function() {
						GM_setValue("checkInfusion", cbInfu.checked);
					});

				//'infused flames','infused frost','infused lightning','infused storms','infused divinity','infused darkness'
				var selex = document.createElement("select");
					selex.id = 'infSelexID';
					selex.style.width = '60px';
					selex.style.webkitAppearance = 'none';
					selex.style.background = '#ffc8c8';
					selex.setAttribute("title", "infuse list");
					selex.addEventListener('change', function() {
						GM_setValue("currentInfusion", selex.value);
					});

				var option1 = document.createElement("option");
					option1.id = 'opFlames';
					option1.value = 'infused flames';
					if(currentInfusion === 'infused flames'){
						option1.setAttribute("selected", "true");
					}
					option1.appendChild(document.createTextNode('Flames'));

				var option2 = document.createElement("option");
					option2.id = 'opFrost';
					option2.value = 'infused frost';
					if(currentInfusion === 'infused frost'){
						option2.setAttribute("selected", "true");
					}
					option2.appendChild(document.createTextNode('Frost'));

				var option3 = document.createElement("option");
					option3.id = 'opLight';
					option3.value = 'infused lightning';
					if(currentInfusion === 'infused lightning'){
						option3.setAttribute("selected", "true");
					}
					option3.appendChild(document.createTextNode('Light'));

				var option4 = document.createElement("option");
					option4.id = 'opStorms';
					option4.value = 'infused storms';
					if(currentInfusion === 'infused storms'){
						option4.setAttribute("selected", "true");
					}
					option4.appendChild(document.createTextNode('Storms'));

				var option5 = document.createElement("option");
					option5.id = 'opDivinity';
					option5.value = 'infused divinity';
					if(currentInfusion === 'infused divinity'){
						option5.setAttribute("selected", "true");
					}
					option5.appendChild(document.createTextNode('Divinity'));

				var option6 = document.createElement("option");
					option6.id = 'opDarkness';
					option6.value = 'infused darkness';
					if(currentInfusion === 'infused darkness'){
						option6.setAttribute("selected", "true");
					}
					option6.appendChild(document.createTextNode('Darkness'));

				selex.appendChild(option1);
				selex.appendChild(option2);
				selex.appendChild(option3);
				selex.appendChild(option4);
				selex.appendChild(option5);
				selex.appendChild(option6);


				//meleeMode zone
				if (document.getElementById('2501')) {
					var cbMelee = document.createElement("INPUT");
						cbMelee.id = 'cbInfuID';
						cbMelee.setAttribute("type", "checkbox");
						if(meleeMode){
							cbMelee.setAttribute("checked", "true");
						}
						cbMelee.addEventListener('change', function() {
							GM_setValue("meleeMode", cbMelee.checked);
						});

					var lbMelee = document.createElement("LABEL");
					lbMelee.style.color = '#5C0D11';
					lbMelee.style.fontFamily = "'Verdana','sans-serif'";
					lbMelee.setAttribute("title", "avatar/gods");
					lbMelee.appendChild(document.createTextNode('Melee'));
				}



				// table zone
				var ttble = document.createElement("TABLE");

				var tttr1 = document.createElement("TR");
				var tttd11 = document.createElement("TD");
				var tttd12 = document.createElement("TD");
				tttd11.appendChild(iRadio1);
				tttd12.appendChild(lbRad1);
				tttr1.appendChild(tttd11);
				tttr1.appendChild(tttd12);

				var tttr2 = document.createElement("TR");
				var tttd21 = document.createElement("TD");
				var tttd22 = document.createElement("TD");
				tttd21.appendChild(iRadio2);
				tttd22.appendChild(lbRad2);
				tttr2.appendChild(tttd21);
				tttr2.appendChild(tttd22);

				var tttr3 = document.createElement("TR");
				var tttd31 = document.createElement("TD");
				var tttd32 = document.createElement("TD");
				tttd31.appendChild(iRadio3);
				tttd32.appendChild(lbRad3);
				tttr3.appendChild(tttd31);
				tttr3.appendChild(tttd32);

				if (document.getElementById('2501')) {
					var tttr3m = document.createElement("TR");
					var tttd3m1 = document.createElement("TD");
					var tttd3m2 = document.createElement("TD");
					tttd3m1.appendChild(cbMelee);
					tttd3m2.appendChild(lbMelee);
					tttr3m.appendChild(tttd3m1);
					tttr3m.appendChild(tttd3m2);
				}

				var tttr4 = document.createElement("TR");
				var tttd41 = document.createElement("TD");
				var tttd42 = document.createElement("TD");
				tttd41.appendChild(cbInfu);
				tttd42.appendChild(selex);
				tttr4.appendChild(tttd41);
				tttr4.appendChild(tttd42);

				ttble.appendChild(tttr1);
				ttble.appendChild(tttr2);
				ttble.appendChild(tttr3);
				if (document.getElementById('2501')) {
					ttble.appendChild(tttr3m);
				}
				ttble.appendChild(tttr4);

				aDIscpc.appendChild(ttble);
			}

			if(settings.spellControl || settings.showStopStartButton){

				var btnSS = document.createElement("BUTTON");
				btnSS.id = "btnSSid";
				btnSS.style.background = 'rgb(255, 76, 76)';//'#333';
				btnSS.style.fontFamily = 'Tahoma, Geneva, sans-serif';
				btnSS.style.fontSize = '12px';
				btnSS.style.padding = '5px 10px 5px 10px';
				btnSS.style.color = '#fff';
				btnSS.style.fontWeight = 'bold';
				btnSS.style.borderRadius = '6px';
				btnSS.style.boxShadow = '0 1px 3px rgba(0,0,0,0.5)';
				btnSS.style.textShadow = '0 -1px 1px rgba(0,0,0,0.25)';
				btnSS.style.borderBottom = '1px solid rgba(0,0,0,0.25)';
				btnSS.style.cursor = 'pointer';
				btnSS.style.borderLeft = 'none';
				btnSS.style.borderTop = 'none';
				btnSS.style.margin = '10px 0 10px 0';
				btnSS.style.opacity = '0.8';

				if(GM_getValue("botSS")){
					btnSS.appendChild(document.createTextNode("-STOP-"));
					btnSS.style.background = 'rgb(255, 76, 76)';
				}else{
					btnSS.appendChild(document.createTextNode("-START-"));
					btnSS.style.background = 'rgb(86, 195, 51)';
					
				}

				btnSS.addEventListener('click', function() {
					if(GM_getValue("botSS")){
						GM_setValue("botSS", false);
						btnSS.textContent = "-START-";
						btnSS.style.background = 'rgb(86, 195, 51)';
					}else{
						GM_setValue("botSS", true);
						btnSS.textContent = "-STOP-";
						btnSS.style.background = 'rgb(255, 76, 76)';
						window.location.href = window.location.href;
					}
					
				});

				var ccter = document.createElement("CENTER");
				ccter.appendChild(btnSS);

				aDIscpc.appendChild(ccter);
			}			
			

			//document.body.appendChild(aDIscpc);
			document.getElementsByClassName('stuffbox csp')[0].appendChild(aDIscpc);
		}

    }

		if (!document.getElementById('quickbar') && !document.querySelector('#riddleform div img[src*="riddlemaster.php"]') && !checkHaveOverchanrge()) {
			//nothing..
		}else{
			genShowSellControl();   
		}

        })();
    }
	 /* ========== SPELL Control END ========== */



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

	/* ============= SHOW LIST BATTLE ITEMS ============ */
    if (settings.showBarListBattleItems) {
        (function(){
        
			//bar show items
			function getTrItem(item_no){

				var xTrItem = document.createElement("TR");
				var xTdItem = document.createElement("TD");
				var xDivItem ;

				//xDivItem = docGID('ikey_'+item_no).cloneNode(true);

				xDivItem = document.querySelectorAll('div.bti3')[item_no].childNodes[1].cloneNode(true);

				if(xDivItem.onclick !== null){
					xDivItem.style.cursor = "pointer";
				}else{
					xDivItem.style.opacity = "0.4";
				}
				xDivItem.id = "xItems_"+item_no;

				var itPosition = false;
				var isElixir = false;

				var clorI = 'rgb(128, 122, 0)';
				var clorS = 'rgb(6, 138, 27)';

				if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Health Draught"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "D- HP";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "#FF0E1A";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Health Potion"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "[P] HP";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "#FF0E1A";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Health Elixir"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(E) HP";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "#FF0E1A";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
					isElixir = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Mana Draught"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "D- MP";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "#6374FF";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Mana Potion"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "[P] MP";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "#6374FF";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Mana Elixir"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(E) MP";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "#6374FF";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
					isElixir = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Spirit Draught"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "D- SP";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "#B3820A";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Spirit Potion"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "[P] SP";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "#7D5A03";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Spirit Elixir"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(E) SP";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "#7D5A03";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
					isElixir = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Last Elixir"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(LE)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "rgb(210, 113, 16)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
					isElixir = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Energy Drink"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(EG)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = "#5cecf9";
					xDivItem.querySelector('div.fd2').childNodes[0].style.fontWeight = "bolder";
					itPosition = true;
					isElixir = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Infusion of Flames"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(I-Flames)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorI;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Infusion of Frost"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(I-Frost)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorI;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Infusion of Lightning"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(I-Light)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorI;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Infusion of Storms"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(I-Storm)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorI;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Infusion of Divinity"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(I-Divin)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorI;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Infusion of Darkness"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(I-Dark)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorI;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Scroll of Swiftness"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(S-Swift)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorS;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Scroll of Protection"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(S-Prot)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorS;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Scroll of the Avatar"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(S-Avat)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorS;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Scroll of Absorption"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(S-Abs)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorS;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Scroll of Shadows"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(S-Shad)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorS;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Scroll of Life"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(S-Life)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorS;
					itPosition = true;
				}else if(xDivItem.querySelector('div.fd2').childNodes[0].innerHTML === "Scroll of the Gods"){
					xDivItem.querySelector('div.fd2').childNodes[0].innerHTML = "(S-Gods)";
					xDivItem.querySelector('div.fd2').childNodes[0].style.color = clorS;
					itPosition = true;
				}


				xTdItem.style.textAlign = "left";

				var xDivT;
				if(isElixir && xDivItem.style.opacity !== "0.4"){

					xDivT = document.createElement("DIV");
					xDivT.id="vxv";
					xDivT.style.position = "absolute";
					xDivT.style.cursor = "pointer";
					xDivT.style.width = "100%";
					xDivT.style.height = "20px";
					xDivT.style.color = "#E3E0D1";
					xDivT.style.zIndex = "1001";
					var ddTTx = document.createTextNode(".");
					xDivT.appendChild(ddTTx);
					xDivT.addEventListener('click', function() {
						if( confirm('Use Elixir ?') ){
							if( this.parentNode.childNodes[1] ){
								if( this.parentNode.childNodes[1].onclick !== null ){
									this.parentNode.childNodes[1].click();
								}
							}

						}
						return false;
					});

					xTdItem.appendChild(xDivT);

				}else{
					xDivT = xDivItem;
				}

				if(itPosition){
					xTdItem.style.height = "18px";
					xTdItem.appendChild(xDivItem);
				}else{
					xTdItem.style.height = "30px";
					xTdItem.appendChild(xDivItem);
				}

				xTrItem.appendChild(xTdItem);
				return xTrItem;
			}


			if(document.querySelector('#divShowItems')){
				var elem = document.querySelector('#divShowItems');
                elem.parentNode.removeChild(elem);
			}


			var newDivShowItems = document.createElement("div");
			newDivShowItems.id = "divShowItems";
			newDivShowItems.style.position = "absolute";
			if (document.getElementById('2501')) {
				newDivShowItems.style.top = "160px";
			}else{
				newDivShowItems.style.top = "140px";
			}
			newDivShowItems.style.left = "1240px";
			newDivShowItems.style.width = "80pxpx";
			newDivShowItems.style.height = "100%";

			var xTableItems = document.createElement("TABLE");

			for(var wi=1; wi < document.querySelectorAll('div.bti3').length ;wi++){
				if( document.querySelectorAll('div.bti3')[wi] ){
					if( document.querySelectorAll('div.bti3')[wi].childNodes[1]){

						xTableItems.appendChild(getTrItem(wi));
					}
				}
			}

			newDivShowItems.appendChild(xTableItems);

			document.getElementsByClassName('stuffbox csp')[0].appendChild(newDivShowItems);

        })();
    }
    /* =========== SHOW LIST BATTLE ITEMS END ========== */



	/* ============= SHOW USE POTION ============ */
    if (settings.showUsePotion) {
        (function(){
        
    var POTION_LIST = ['Draught','Potion','Elixir','Gem',
					   'Swiftness','Protection','Avatar','Absorption','Shadows','Life','Gods',
					   'Flames','Frost','Lightning','Storms','Divinity','Darkness'];

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

		GM_setValue('ScrollofSwiftness', 0);
		GM_setValue('ScrollofProtection', 0);
		GM_setValue('ScrolloftheAvatar', 0);
		GM_setValue('ScrollofAbsorption', 0);
		GM_setValue('ScrollofShadows', 0);
		GM_setValue('ScrollofLife', 0);
		GM_setValue('ScrolloftheGods', 0);

		GM_setValue('InfusionofFlames', 0);
		GM_setValue('InfusionofFrost', 0);
		GM_setValue('InfusionofLightning', 0);
		GM_setValue('InfusionofStorms', 0);
		GM_setValue('InfusionofDivinity', 0);
		GM_setValue('InfusionofDarkness', 0);
		

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
						typePotion = typePotion.replaceAll(' ','');

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

		var ttMMD = 'H-[ D(' + GM_getValue('HealthDraught') + ') P(' + GM_getValue('HealthPotion') + ') E(' + GM_getValue('HealthElixir') + ') ]'+ ' - ' + 'M-[ D(' + GM_getValue('ManaDraught') + ') P(' + GM_getValue('ManaPotion') + ') E(' + GM_getValue('ManaElixir') + ') ]' + ' - ' + 'S-[ D(' + GM_getValue('SpiritDraught') + ') P(' + GM_getValue('SpiritPotion') + ') E(' + GM_getValue('SpiritElixir') + ') ] L('+GM_getValue('LastElixir')+') G('+GM_getValue('Gem')+')'; // | Swif('+vSwift+')

		var ttSc = 'Sc-[ Swif(' + GM_getValue('ScrollofSwiftness') + ') Pro(' + GM_getValue('ScrollofProtection') + ') Ava(' + GM_getValue('ScrolloftheAvatar') + ') Abs(' + GM_getValue('ScrollofAbsorption') + ') Sha(' + GM_getValue('ScrollofShadows') + ') Life(' + GM_getValue('ScrollofLife') + ') Gods(' + GM_getValue('ScrolloftheGods') + ') ]';
		var ttInf = 'Inf-[ Fl(' + GM_getValue('InfusionofFlames') + ') Fr(' + GM_getValue('InfusionofFrost') + ') Li(' + GM_getValue('InfusionofLightning') + ') St(' + GM_getValue('InfusionofStorms') + ') Di(' + GM_getValue('InfusionofDivinity') + ') Da(' + GM_getValue('InfusionofDarkness') + ') ]';


		if(document.getElementById('shUsPotionID')){
			document.getElementById('shUsPotionID').textContent = ''+ttMMD;
			document.getElementById('shUsPotionID2').textContent = ''+ttSc;
			document.getElementById('shUsPotionID3').textContent = ''+ttInf;
		}else{
			var aDIUseR = document.createElement('DIV');
			aDIUseR.style.position = "absolute";
			aDIUseR.style.top = "8px";
			aDIUseR.style.left = "650px";
			aDIUseR.style.backgroundColor = '#EDEBDF';
			aDIUseR.style.opacity = '0.9';
			aDIUseR.style.width = '460px';
			aDIUseR.style.height = '42px';
			aDIUseR.style.zIndex = '202';

			var lbIU = document.createElement("LABEL");
			lbIU.id = "shUsPotionID";
			lbIU.style.color = '#5C0D11';
			lbIU.style.fontFamily = "'Verdana','sans-serif'";
			lbIU.appendChild(document.createTextNode(ttMMD));

			var lbIU2 = document.createElement("LABEL");
			lbIU2.id = "shUsPotionID2";
			lbIU2.style.color = '#5C0D11';
			lbIU2.style.fontFamily = "'Verdana','sans-serif'";
			lbIU2.appendChild(document.createTextNode(ttSc));

			var lbIU3 = document.createElement("LABEL");
			lbIU3.id = "shUsPotionID3";
			lbIU3.style.color = '#5C0D11';
			lbIU3.style.fontFamily = "'Verdana','sans-serif'";
			lbIU3.appendChild(document.createTextNode(ttInf));


			aDIUseR.appendChild(lbIU);
			aDIUseR.appendChild(document.createElement("BR"));
			aDIUseR.appendChild(lbIU2);
			aDIUseR.appendChild(document.createElement("BR"));
			aDIUseR.appendChild(lbIU3);

			document.body.appendChild(aDIUseR);
		}

		if ((location.href + "").indexOf('s=Battle&ss=ba&encounter=') === -1) {
            GM_setValue("lastPotionsUse", ttMMD);
			GM_setValue("lastPotionsUse1", ttSc);
			GM_setValue("lastPotionsUse2", ttInf);
        }

    }


    if (document.getElementById('riddleform') || document.getElementById('equipment') || document.querySelector('img[src $= "derpy.gif"]')){
        trackUsePotion();
        genSHowUsePotion();   
    }else if (!document.getElementById('quickbar') && !document.querySelector('#riddleform div img[src*="riddlemaster.php"]') && !checkHaveOverchanrge()) {

        var divPS = document.createElement("DIV");

        divPS.style.position = 'fixed';
        divPS.style.bottom = '0px';
        divPS.style.right = '70px';
        divPS.style.backgroundColor = '#E0D8C1';
        divPS.style.boxShadow = '-1px -1px 9px #888888';

        divPS.id = 'divPS';

		var lbPS = document.createElement("LABEL");
        lbPS.appendChild(document.createTextNode(GM_getValue("lastPotionsUse") + ''));

		var lbPS1 = document.createElement("LABEL");
        lbPS1.appendChild(document.createTextNode(GM_getValue("lastPotionsUse1") + ''));

		var lbPS2 = document.createElement("LABEL");
        lbPS2.appendChild(document.createTextNode(GM_getValue("lastPotionsUse2") + ''));

        divPS.appendChild(lbPS);
        divPS.appendChild(lbPS1);
        divPS.appendChild(lbPS2);

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
    if (settings.godAuto  && GM_getValue("botSS")) {
        (function(){

    // Your code here...
    
var difficulty = 'PFUDOR';
var enableUseImperil = true;

if(document.querySelectorAll('table.cit').length > 0){
	if(document.querySelectorAll('table.cit')[1].querySelectorAll('div.fd4').length > 0){
		difficulty = document.querySelectorAll('table.cit')[1].querySelectorAll('div.fd4')[1].textContent;
	}
}

var vHealUseBuff = 35;
var enableAutoJoinGrindfest = false;

var stmnMain = 73;
var stmnMin = 20;
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
    var HP_ITEM_D_CUTOFF = 50;
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
    var SP_ITEM_D_CUTOFF = 75;
    var SP_ITEM_P_CUTOFF = 50;
    var SP_ITEM_E_CUTOFF = 30;

	var ENABALE_LE_POTION = true;

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

    //if(getMaxSelfMana() > 500){
        //MAINTAIN_BUFFS.push('spark of life');
        //MAINTAIN_BUFFS.push('spirit shield');
    //}

    var MAINTAIN_CHANNELING_BUFFS = ['absorbing ward','regen']; //['absorbing ward'];

    //customize above settings per style!
	var	lowerHPAlert = 15;
    if (STYLE=='mage') {
        MAINTAIN_CHANNELING_BUFFS.push('arcane focus');
		//MAINTAIN_CHANNELING_BUFFS.push('absorbing ward');
		lowerHPAlert = 35;
    }else{
        MAINTAIN_CHANNELING_BUFFS.push('heartseeker');
    }

    //MAINTAIN_CHANNELING_BUFFS.push('shadow veil');

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

		if(!isMonDead(1) && !isMonEffect(1,spellsEffect[(spellsEffect.indexOf(vNameSpell)+1)])){
			if(castSpell(vNameSpell,1)){
				return true;
			}
		}

        for (var i=3;i>=1;i--) {
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

		if(difficulty === 'PFUDOR' && enableUseImperil && !GM_getValue('meleeMode')){

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
            //var bossId = chooseTargetBoss();
            var monForMage = chooseTargetForMAGE();
            var spell_list = ['ragnarok', 'disintegrate', 'corruption'];// selectSpellWithMonEff(monForMage);
          
            //Fight normal

			if(!GM_getValue('meleeMode')){
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

	var vUseScroll = false;

	var effScrollList = [
		'hastened',	'Scroll of Swiftness',
		'shadow veil',		'Scroll of Shadows',
		'protection',		'Scroll of Protection',
		'absorbing ward',		'Scroll of Absorption',
		'spark of life',	'Scroll of Life',
		'avatar',	'Scroll of the Avatar',
		'gods',	'Scroll of the Gods'
	];


	if(GM_getValue('spellSelect') < 3 && getSelfHealth() > vHealUseBuff){
		// user scroll


		if(GM_getValue('spellSelect') === 1){
			//-swiftness/shadow/protection/absorption/life
			var listUseEff = ['hastened','shadow veil','protection','absorbing ward','spark of life'];
			
			for(var sc=0;sc<listUseEff.length;sc++){
				var chkIndexScroll = -1;
				var vEffn = listUseEff[sc];
				if(!checkForScrollBuff(vEffn)){

					var nEffn = effScrollList.indexOf(vEffn);
					chkIndexScroll = nextScroll(effScrollList[nEffn+1]);

					if(chkIndexScroll === -1){
						chkIndexScroll = nextItem(effScrollList[nEffn+1]);

						if(chkIndexScroll !== -1){
							useItem(chkIndexScroll);
							return;
						}
					}
					
					if(chkIndexScroll !== -1){
						useItemClick('ikey_s'+chkIndexScroll);
						return;
					}else{
						if(!checkForBuff(vEffn)){
							if(castSpell(vEffn,0)){
								return;
							}
						}
					}
				}
			}
			
		}else if(GM_getValue('spellSelect') === 2){

			//-avatar	[ 'hastened', 'protection' ]
			//-god		[ 'absorbing ward', 'shadow veil', 'spark of life'***? ]
			var listUseEff = ['shadow veil','hastened'];
			var listScrollEff = ['gods','avatar'];
			var doRoundTwo = false;
			for(var sc=0;sc<listUseEff.length;sc++){
				var chkIndexScroll = -1;
				var vEffn = listUseEff[sc];
				var vEffScroll = listScrollEff[sc];
				if(!checkForScrollBuff(vEffn)){

					var nEffn = effScrollList.indexOf(vEffScroll);
					chkIndexScroll = nextScroll(effScrollList[nEffn+1]);

					if(chkIndexScroll === -1){
						chkIndexScroll = nextItem(effScrollList[nEffn+1]);

						if(chkIndexScroll !== -1){
							useItem(chkIndexScroll);
							return;
						}
					}
					
					if(chkIndexScroll !== -1){
						useItemClick('ikey_s'+chkIndexScroll);
						return;
					}else{
						if(vEffn === 'hastened'){
							if(!checkForBuff('protection')){
								if(castSpell('protection',0)){
									return;
								}
							}

							if(!checkForBuff('hastened')){
								if(castSpell('hastened',0)){
									return;
								}
							}
						}else if(vEffn === 'shadow veil'){
							if(!checkForBuff('spark of life')){
								if(castSpell('spark of life',0)){
									return;
								}
							}

							if(!checkForBuff('absorbing ward')){
								if(castSpell('absorbing ward',0)){
									return;
								}
							}

							if(!checkForBuff('shadow veil')){
								if(castSpell('shadow veil',0)){
									return;
								}
							}

						}
					}
				}
			}

			/*
			if(!checkForBuff('spark of life')){
				if(castSpell('spark of life',0)){
					return;
				}
			}

			if(!checkForBuff('absorbing ward')){
				if(castSpell('absorbing ward',0)){
					return;
				}
			}
			*/
			

		}else{
			vUseScroll = true;
		}

		
	}else{
		vUseScroll = true;
	}

	var effInfusionList = [
		'infused flames',	'Infusion of Flames',
		'infused frost',		'Infusion of Frost',
		'infused lightning',		'Infusion of Lightning',
		'infused storms',		'Infusion of Storms',
		'infused divinity',	'Infusion of Divinity',
		'infused darkness',	'Infusion of Darkness'
	];

	//["spirit shield", "spark of life", "shadow veil", "protection", "hastened", "infused flames"]

	if(GM_getValue('checkInfusion') && getSelfHealth() > vHealUseBuff){
		//'Infusion of Flames','Infusion of Frost','Infusion of Lightning','Infusion of Storms','Infusion of Divinity','Infusion of Darkness'
		var listUseInfus = [];//['infused flames','infused frost','infused lightning','infused storms','infused divinity','infused darkness'];
		//GM_getValue('currentInfusion');
		listUseInfus.push(GM_getValue('currentInfusion'));

		for(var ifi=0;ifi<listUseInfus.length;ifi++){
			var chkIndexInfusion = -1;
			var vEffInn = listUseInfus[ifi];
			if(!checkForBuff(vEffInn)){

				var nEffInn = effInfusionList.indexOf(vEffInn);
				chkIndexInfusion = nextInfusion(effInfusionList[nEffInn+1]);

				if(chkIndexInfusion === -1){
					chkIndexInfusion = nextItem(effInfusionList[nEffInn+1]);

					if(chkIndexInfusion !== -1){
						useItem(chkIndexInfusion);
						return;
					}
				}
				
				if(chkIndexInfusion !== -1){
					useItemClick('ikey_n'+chkIndexInfusion);
					return;
				}
			}
		}
	}

	/*
	if(!vUseScroll){
		MAINTAIN_CHANNELING_BUFFS = ['regen','spirit shield'];
		if (STYLE=='mage') {
			MAINTAIN_CHANNELING_BUFFS.push('arcane focus');
		}else{
			MAINTAIN_CHANNELING_BUFFS.push('heartseeker');
		}

		MAINTAIN_CHANNELING_BUFFS.push('full cure');
        MAINTAIN_CHANNELING_BUFFS.push('cure');

	}
	*/

	if ((checkForBuff('channeling')&& (isSOL || getSelfHealth() > vHealUseBuff )) || getSelfMana() > 190 || (getGem()=='mana' && getSelfMana() > 160 )) {
		for (var s in MAINTAIN_CHANNELING_BUFFS) {
			var t = MAINTAIN_CHANNELING_BUFFS[s];
			if (!(checkForBuff(t)) && (effScrollList.indexOf(MAINTAIN_CHANNELING_BUFFS[s]) === -1 || vUseScroll) ) {
				//console.log('decided to cast ' + t);
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
			var gDura = getBuffDuration(s2);
			if (gDura > 0 && gDura < 20){
				if (MAINTAIN_CHANNELING_BUFFS.indexOf(t2)!== -1 && (effScrollList.indexOf(t2) === -1 || vUseScroll)) {
					console.log('decided to cast ' + t2);
					if(castSpell(t2,0)){
						return;
					}
				}
			}
		}
	}else{
		if( isSOL || (getSelfHealth() > vHealUseBuff) ){
			if (getGem() == 'mystic') {
				useGem();
				return;
			}
		}
	}


    //check for use mana potion
    if( ENABLE_MP_POTION && (isSOL || (getSelfHealth() > vHealUseBuff)) ){
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
            if (getGem()=='mana' && getSelfMana() < 70 && ROUND_GEM > 10) {
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
        if (getGem()=='mana' && getSelfMana() < 70 && ROUND_GEM > 10) {
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
            if (getGem()=='health' && getSelfHealth() < 65 && ROUND_GEM > 10) {
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
        if (getGem()=='health' && getSelfHealth() < 65 && ROUND_GEM > 10) {
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
            if (getGem()=='spirit' && getSelfSpirit() < 75 && ROUND_GEM > 10) {
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
        if (getGem()=='spirit' && getSelfSpirit() < 75 && ROUND_GEM > 10) {
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


	// HP GEM // SP GEM 
	if ((location.href + "").indexOf('s=Battle&ss=gr') === -1 && settings.enableGFslowGEM){
		if(getGem()=='health' && getSelfHealth() < 90 && ROUND_GEM > 20){
			useGem();
		}else if(getGem()=='spirit' && ROUND_GEM > 15){
			useGem();
		}else{
			GM_setValue('ROUND_GEM',(ROUND_GEM+1));
		}
	}
	

    if(getSelfHealth() < lowerHPAlert && !isSOL){
		if(ENABALE_LE_POTION){
			var indexItemLE = nextItem('Last Elixir');
            if(indexItemLE !== -1){
                useItem(indexItemLE);
                return;
            }
		}

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
	//MAINTAIN_BUFFS = ['regen','arcane focus']
	//effScrollList.indexOf(MAINTAIN_BUFFS[1])
	//if(vUseScroll){
		for (var s3 in MAINTAIN_BUFFS) {
			var t3 = MAINTAIN_BUFFS[s3];
			if (!(checkForBuff(t3)) && (effScrollList.indexOf(MAINTAIN_BUFFS[s3]) === -1 || vUseScroll)) {
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
	//}
    

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
	GG_GO_AF_BREAK = true;
	if(GB_BREAK_AUTO_BOT){
		document.getElementById('battleform').submit();
	}
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
            //setTimeout(function() {
                ccon.click();
            //}, (0.5*1000));
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

function nextScroll(vNameItem) {
    var hvChk = -1;
    for (var i=1;i<=15;i++) {
        if (document.getElementById('ikey_s'+i) !== null) {
            if(document.getElementById('ikey_s'+i).childNodes[0].childNodes[0].textContent === vNameItem){
                hvChk =  i;
                break;
            }
        }
    }
    return hvChk;
}

function nextInfusion(vNameItem) {
    var hvChk = -1;
    for (var i=1;i<=15;i++) {
        if (document.getElementById('ikey_n'+i) !== null) {
            if(document.getElementById('ikey_n'+i).childNodes[0].childNodes[0].textContent === vNameItem){
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

function useItemClick(n) {
    if(document.getElementById(n)){
		document.getElementById(n).click();
	}
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

function getDescAt(n) {
    try {
        var ret = document.getElementById('mainpane').children[1].children[0].children[n].getAttribute('onmouseover').split("'")[3];
        if (ret !== undefined){
            return ret;
        }else{
            return 'none';
        }
    }catch(e) {
        return 'undefined';
    }
}

function getDescs() {
    var r = [];
    for (var i = 0; i < getBuffLength(); i++) {
        r[i]=getDescAt(i).toLowerCase();
    }
    return r;
}

//gets the remaining duration (as displayed by the tooltip) of the buff at the given position
function getBuffDuration(n) {
    try {
        //return document.getElementById('mainpane').children[1].children[0].children[n].attributes.item(1).value.split(',')[3].split(' ')[1].split(')')[0];
        var duration = document.getElementById('mainpane').children[1].children[0].children[n].getAttribute('onmouseover').split("',")[2].split(' ')[1].split(')')[0];

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

function checkForScrollBuff(n) {
	var vBuffIndex = getBuffs().indexOf(n.toLowerCase());

    if ( vBuffIndex != -1) {
		var descBuff = getDescs()[vBuffIndex];
		if ( descBuff.indexOf('(scroll)') !== -1 ) {
			return true;
		}else{
			return false;
		}
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

function actionBeep(enableSound,isBattleDone) {

	if(isBattleDone && !SKIP_BEEP_BATTLE_DONE){
		var b = new Audio('https://www.freesound.org/data/previews/72/72128_1028972-lq.mp3');
        b.play();
	}

    if(enableSound && !SKIP_BEEP_BATTLE_DONE){
        var a = new Audio('http://www.soundsnap.com/themes/soundsnap2/assets/mp3/please-refresh.mp3');
        a.play();
    }

	if(!enableSound && !isBattleDone){
		//var c = new Audio('https://dl.dropboxusercontent.com/u/10739586/Outkast%20-%20Hey%20Ya!%20(mp3cut.net).mp3');
			//c.loop = "true";
			//c.play()


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

var songURL = 'http://www.soundsnap.com/themes/soundsnap2/assets/mp3/please-refresh.mp3';//"1https://dl.dropboxusercontent.com/u/10739586/Outkast%20-%20Hey%20Ya!%20(mp3cut.net).mp3";
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
			//a = new Audio('http://www.soundsnap.com/themes/soundsnap2/assets/mp3/please-refresh.mp3');
			//a.play();

			if(settings.enableOfflineSong && currentSong !== ''){
				var bs = new Audio(currentSong);
				bs.loop = "true";
				bs.play();
			}else{
				playAudio();
			}

			if(settings.enablePopupAlert){
				window.open('http://danbooru.donmai.us/data/__kagamine_rin_aku_no_musume_vocaloid_evillious_nendaiki_and_vocaloid_drawn_by_chino_machiko__2638ce4e7c84eaa85040bcc3173bf42f.png', '_blank');

				//window.open('https://ehwiki.org/images/5/53/Ponychart.jpg', '_blank');

			}

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

			divPS.style.position = 'fixed';
			divPS.style.bottom = '0px';
			divPS.style.right = '70px';
			divPS.style.backgroundColor = '#E0D8C1';
			divPS.style.boxShadow = '-1px -1px 9px #888888';

			divPS.id = 'divPS';

			var lbPS = document.createElement("LABEL");
			lbPS.appendChild(document.createTextNode(GM_getValue("lastPotionsUse") + ''));
			divPS.appendChild(lbPS);
			
			if(GM_getValue("lastPotionsUse1") !== 'Sc-[ Swif(0) Pro(0) Ava(0) Abs(0) Sha(0) Life(0) Gods(0) ]'){
				var lbPS1 = document.createElement("LABEL");
				lbPS1.appendChild(document.createTextNode(GM_getValue("lastPotionsUse1") + ''));
				divPS.appendChild(document.createElement("BR"));
				divPS.appendChild(lbPS1);
			}

			if(GM_getValue("lastPotionsUse2") !== 'Inf-[ Fl(0) Fr(0) Li(0) St(0) Di(0) Da(0) ]'){
				var lbPS2 = document.createElement("LABEL");
				lbPS2.appendChild(document.createTextNode(GM_getValue("lastPotionsUse2") + ''));
				divPS.appendChild(document.createElement("BR"));
				divPS.appendChild(lbPS2);
			}

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

				GM_setValue('ScrollofSwiftness', 0);
				GM_setValue('ScrollofProtection', 0);
				GM_setValue('ScrolloftheAvatar', 0);
				GM_setValue('ScrollofAbsorption', 0);
				GM_setValue('ScrollofShadows', 0);
				GM_setValue('ScrollofLife', 0);
				GM_setValue('ScrolloftheGods', 0);

				GM_setValue('InfusionofFlames', 0);
				GM_setValue('InfusionofFrost', 0);
				GM_setValue('InfusionofLightning', 0);
				GM_setValue('InfusionofStorms', 0);
				GM_setValue('InfusionofDivinity', 0);
				GM_setValue('InfusionofDarkness', 0);
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
