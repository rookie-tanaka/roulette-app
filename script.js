// 東京版と横浜版のリストを別々に定義するでやんす！
const tokyoItems = [
  "靖国神社",
  "下北沢",
  "つり堀武蔵野園",
  "吉祥寺",
  "高円寺",
  "神保町",
  "三軒茶屋",
  "西荻窪",
];

const yokohamaItems = [
  "弘明寺商店街",
  "横浜中華街",
  "横浜橋通商店街",
  "根岸森林公園",
  "山下公園",
  "元町公園",
  "六角橋商店街",
];

const foodItems = [
  "近くのご飯屋さん",
  "ネパールカレー",
  "自由",
  "ライフのお惣菜",
];

// 現在使っているリストを入れる変数（最初は東京にしておくでやんす）
let currentItems = tokyoItems;

// （前回からある要素の取得）
const resultDiv = document.getElementById("result");
const spinBtn = document.getElementById("spin-btn");
const actionArea = document.getElementById("action-area");
const retryBtn = document.getElementById("retry-btn");
const shareBtn = document.getElementById("share-btn");

let currentResult = "";

// --- ここからが追加部分でやんす ---
// ラジオボタンの要素をすべて取得するでやんす
const areaRadios = document.querySelectorAll('input[name="area"]');

// ラジオボタンが切り替わったときの処理
areaRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    // 選ばれた値(value)によってリストを差し替えるでやんす
    if (e.target.value === "tokyo") {
      currentItems = tokyoItems;
    } else if(e.target.value == "yokohama"){
      currentItems = yokohamaItems;
    } else {
      currentItems = foodItems;
    }

    // 地域を切り替えたら、前回の結果が出っぱなしはおかしいからリセットするでやんす！
    retry();
  });
});

function spin() {
  // items ではなく currentItems を使うでやんす！
  const randomIndex = Math.floor(Math.random() * currentItems.length);
  currentResult = currentItems[randomIndex];

  resultDiv.textContent = `「${currentResult}」が当たったでやんす！`;

  spinBtn.classList.add("hidden");
  actionArea.classList.remove("hidden");
}

// もう一回まわす処理
function retry() {
  resultDiv.textContent = "結果はここに出るでやんす";

  // ボタンを最初の状態に戻す
  spinBtn.classList.remove("hidden");
  actionArea.classList.add("hidden");
  currentResult = "";
}

// シェアする処理 (Web Share API)
async function shareResult() {
  const shareData = {
    title: "ルーレットの結果",
    text: `今日のルーレットの結果は「${currentResult}」だったでやんす！`,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("シェアをキャンセルしたか、失敗したでやんすね", err);
    }
  } else {
    // パソコンの一部ブラウザなど、非対応の場合の処理
    alert(
      "お使いの環境はシェア機能に対応していないみたいでやんす…。\n結果: " +
        currentResult,
    );
  }
}

// ボタンがクリックされたときの動作を登録
spinBtn.addEventListener("click", spin);
retryBtn.addEventListener("click", retry);
shareBtn.addEventListener("click", shareResult);
