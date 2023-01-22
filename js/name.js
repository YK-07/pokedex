// 検索をクリック後、入力内容の英語名をId('pokename_en')に書く
$(function() {
    $('#bth').on('click', function() {
        var element = document.getElementById('pokename_en');
        element.innerHTML = namelist[$('#pokename').val()]
    });
});

// 各ポケモンの日本語名と英語名
var namelist = {
    "フシギダネ": "bulbasaur",
    "フシギソウ": "ivysaur",
    "フシギバナ": "venusaur",
    "ヒトカゲ": "charmander",
    "リザード": "charmeleon",
    "リザードン": "charizard",
    "ゼニガメ": "squirtle",
    "カメール": "wartortle",
    "カメックス": "blastoise"
};
