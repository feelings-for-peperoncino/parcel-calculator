const priceElements = document.querySelectorAll('.price');
const quantityInputs = document.querySelectorAll('.quantity-input');

priceElements.forEach((priceElement, index) => {
  priceElement.addEventListener('click', () => {
    updateTotal(index);
  });
});

quantityInputs.forEach((quantityInput, index) => {
  quantityInput.addEventListener('click', () => {
    if (quantityInput.value === '0') {
      quantityInput.value = '';
    }
  });

  quantityInput.addEventListener('input', () => {
    updateTotal(index);
  });
});

function updateTotal(index) {
  const priceElement = priceElements[index];
  const quantityElement = quantityInputs[index];
  const totalElement = priceElement.parentElement.querySelector('.total');
  const totalQuantityElement = document.querySelector('.total-quantity');
  const grandTotalElement = document.querySelector('.grand-total');

  const priceValue = parseFloat(priceElement.getAttribute('data-value'));
  const quantity = parseInt(quantityElement.value) || 0;
  const total = priceValue * quantity;

  totalElement.textContent = total === Math.floor(total) ? total + '円' : total.toFixed(2) + '円';

  let totalQuantity = 0;
  quantityInputs.forEach((input) => {
    totalQuantity += parseInt(input.value) || 0;
  });
  totalQuantityElement.textContent = totalQuantity;

  let grandTotal = 0;
  priceElements.forEach((element, i) => {
    grandTotal += parseFloat(element.parentElement.querySelector('.total').textContent);
  });

  grandTotalElement.textContent = grandTotal === Math.floor(grandTotal) ? grandTotal + '円' : grandTotal.toFixed(2) + '円';
}



// 計算ボタンを押した時
// 割引計算ボタンをクリックしたときの処理
// 割引計算ボタンをクリックしたときの処理
document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculateButton");
  const discountInput = document.getElementById("discountInput");
  const priceElements = document.querySelectorAll(".price");
  const originalPrices = Array.from(priceElements).map((priceElement) => parseFloat(priceElement.getAttribute("data-value")));
  const quantityInputs = document.querySelectorAll('.quantity-input');
  const totalElements = document.querySelectorAll('.total'); // 各ゆうパックの合計金額要素

  calculateButton.addEventListener("click", calculateDiscount);

  function calculateDiscount() {
    const discountRate = parseInt(discountInput.value, 10);

    if (discountRate >= 0 && discountRate <= 99) {
      // 合計金額を初期化
      let grandTotal = 0;

      priceElements.forEach((priceElement, index) => {
        const originalPrice = originalPrices[index];
        let discountedPrice = originalPrice;

        // 割引率を適用
        if (discountRate > 0) {
          discountedPrice = Math.floor(discountedPrice * (100 - discountRate) / 100);
        }

        // 割引後の金額を設定
        priceElement.textContent = discountedPrice + "円";
        priceElement.setAttribute("data-value", discountedPrice);

        // 各ゆうパックの数量入力値を取得
        const quantityInput = quantityInputs[index];
        const quantity = parseInt(quantityInput.value) || 0;

        // 各ゆうパックの合計金額を計算
        const total = discountedPrice * quantity;

        // 各ゆうパックの合計金額を表示
        totalElements[index].textContent = total === Math.floor(total) ? total + '円' : total.toFixed(2) + '円';

        // 合計金額に加算
        grandTotal += total;
      });

      // 合計金額を表示
      const grandTotalElement = document.querySelector('.grand-total');
      grandTotalElement.textContent = grandTotal === Math.floor(grandTotal) ? grandTotal + '円' : grandTotal.toFixed(2) + '円';
    } else {
      alert("割引率は0から99の間で入力してください。");
    }
  }
});
