// 図鑑説明の囲みを隠しておく
document.getElementById("pokeDscrpt").style.visibility ="hidden";

$(function() {
  $('#bth').on('click', function() {
    // name.jsで処理したポケモンの英語名を変数に入れる
    var pokeNameEng = document.getElementById("pokeName_en").innerHTML;
    document.getElementById("pokeName_en").style.display ="none";//英語名を隠す

    // ポケモンの基本データ用 url
    var url_base = "https://pokeapi.co/api/v2/pokemon/" + pokeNameEng + "/";

    // 図鑑用 url species:種族
    var url_spe = "https://pokeapi.co/api/v2/pokemon-species/" + pokeNameEng + "/";

    //基本データ受け取り base ********
    const request_base = new XMLHttpRequest();
    request_base.open("GET", url_base);
    request_base.send();
    request_base.addEventListener("load", function () {
      var res_base = JSON.parse(this.responseText);

      // id"pokeNumName"要素を取得
      var pokeNumberType = document.querySelector('#pokeNumberType');
      // id"pokeImage"要素を取得
      var pokeImage = document.querySelector('#pokeImage');
      // id"pokeSize"要素を取得
      var pokeSize = document.querySelector('#pokeSize');

      // ポケモンの画像を取得
      var image = '<img src="' + res_base.sprites.other['official-artwork'].front_default + '">';
      pokeImage.innerHTML = image;

      // ポケモンの番号を取得
      var number = String(res_base.id)
      if (number.length == 1) {
        var number = "No.00" + number;
      } else if (number.length == 2) {
        var number = "No.0" + number;
      } else {
        var number = "No." + number;
      }

      // ポケモンの高さと重さを取得
      var height = String((res_base.height / 10).toFixed(1)) + "メートル";
      var weight = String((res_base.weight / 10).toFixed(1)) + "キログラム";
      pokeSize.innerHTML = "高さ：" + height + '　/　 ' + "重さ：" + weight;

      // ポケモンのタイプ、日本語と英語名
      typesList = {
        "normal":"ノーマル","fire":"ほのお","water":"みず","grass":"くさ","electric":"でんき",
        "ice":"こおり","fighting":"かくとう","poison":"どく","ground":"じめん","flying":"ひこう",
        "psychic":"エスパー","bug":"むし","rock":"いわ","ghost":"ゴースト","dragon":"ドラゴン",
        "dark":"あく","steel":"はがね","fairy":"フェアリー"
      }
      
      // ポケモンのタイプを取得 タイプが一つと二つの場合分け
      var pokeTypesArray = res_base.types;
      if (pokeTypesArray.length == 1) {
        var PokeTypes = "タイプ：" + typesList[pokeTypesArray[0].type['name']];
      } else {
        var type1 = typesList[pokeTypesArray[0].type['name']];
        var type2 = typesList[pokeTypesArray[1].type['name']];
        var PokeTypes = "タイプ：" + type1 + "・" + type2
      }
      pokeNumberType.innerHTML = number +'　/　' + PokeTypes;

    });

    //図鑑用データ受け取り species ********
    const request_spe = new XMLHttpRequest();
    request_spe.open("GET", url_spe);
    request_spe.send();
    request_spe.addEventListener("load", function () {
      var res_spe = JSON.parse(this.responseText);

      // id"pokeName"要素を取得
      var pokeName = document.querySelector('#pokeName');
      // id"pokeDscrpt"要素を取得
      var pokeDscrpt = document.querySelector('#pokeDscrpt');
      // 隠していた図鑑説明の囲みを元に戻す
      document.getElementById("pokeDscrpt").style.visibility ="visible"; 

      // ポケモンの日本語名と分類を取得 *************************
      var pokeNameJap = res_spe.names.find((v) => v.language.name == "ja")['name'];
      var pokeGenera = res_spe.genera.find((v) => v.language.name == "ja")['genus'];
      var pokeNameGenera = "【 "+ pokeNameJap +" 】" + '　/　' + pokeGenera
      pokeName.innerHTML = pokeNameGenera;
      
      // 図鑑の説明文データを変数に格納
      var texts = res_spe.flavor_text_entries;

      // バージョンをソードで取得。ソードに出現しない可能性もあるので、別バージョンでも取得。
      let flavorText = texts.filter(function(v) {
        return (v.language.name == "ja") && (v.version.name == "sword");
      });

      // ソードに出現しない可能性もあるので、その場合は別バージョンで取得。
      if (flavorText.length == 0) {
        // バージョンをYで取得し直す.
        flavorText = texts.filter(function(v) {
          return (v.language.name == "ja") && (v.version.name == "sun");
        });
      };
      if (flavorText.length == 0) {
        // バージョンをサンで取得し直す.
        flavorText = texts.filter(function(v) {
          return (v.language.name == "ja") && (v.version.name == "y");
        });
      };
      
      var text = flavorText[0]['flavor_text'];
      pokeDscrpt.innerHTML = "【図鑑説明】<br>" + text

    });
  
  });
});