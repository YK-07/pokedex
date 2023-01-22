$(function() {
  $('#bth').on('click', function() {
    // name.jsで処理したポケモンの英語名を変数に入れる
    var pokeName = document.getElementById("pokename_en").innerHTML;
    //document.getElementById("pokename_en").style.display ="none";//英語名を隠す
    
  });
});

// このAPIは消費型APIです。リソースに対してHTTP GETメソッドのみが利用可能です。
// 成功
const request = new XMLHttpRequest();
request.open("GET", "https://pokeapi.co/api/v2/pokemon/bulbasaur/");
request.send();
request.addEventListener("load", function () {
  console.log(this.responseText);
});