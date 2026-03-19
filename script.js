// ルーレットの中身（リスト）をここで定義するでやんす！
const items = [
  "靖国神社",
  "下北沢",
  "つり堀武蔵野園",
  "吉祥寺",
  "高円寺",
  "神保町",
  "三軒茶屋",
];

const resultDiv = document.getElementById("result");
const spinBtn = document.getElementById("spin-btn");
const actionArea = document.getElementById("action-area");
const retryBtn = document.getElementById("retry-btn");
const shareBtn = document.getElementById("share-btn");

let currentResult = ""; // 引いた結果を覚えておく変数

// ルーレットをまわす処理
function spin() {
  // リストの中からランダムに1つ選ぶ計算
  const randomIndex = Math.floor(Math.random() * items.length);
  currentResult = items[randomIndex];

  // 画面に結果を表示
  resultDiv.textContent = `「${currentResult}」が当たったでやんす！`;

  // ボタンの表示を切り替える（「まわす」を隠して、アクション領域を表示）
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
