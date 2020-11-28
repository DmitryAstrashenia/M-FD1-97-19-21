let goods = JSON.parse(localStorage.getItem('goods'));
let cartOrder = JSON.parse(localStorage.getItem('cartOrder'));

function showCart() {
    let ul = document.querySelector('.cartView');
    ul.innerHTML = '';
    let sum = 0;
    let headerLi = '<li>';
    headerLi += '<div><p>Товар</p></div>';
    headerLi += '<div><p>Количество</p></div>';
    headerLi += '<div><p>Цена</p></div>';
    headerLi += '</li>';
    ul.innerHTML += headerLi;
    for (let key in cartOrder) {
        let li = '<li>';
        li += '<div>';
        li += `<img src='${goods[key]["img"]}'>` + ' ';
        li += `<p>${goods[key]['name']}</p>`;
        li += '</div>';
        li += '<div>';
        li += `<button type='button' name="minus-goods" data="${key}"> - </button>`;
        li += `<p>${cartOrder[key]}шт.</p>`;
        li += `<button type='button' name="plus-goods" data="${key}"> + </button>`;
        li += '</div>';
        li += '<div>';
        li += `<p>${goods[key]['price'] * cartOrder[key]}BYN</p>`;
        li += `<button type='button' name="delete-goods" data="${key}"> x </button>`;
        li += '</div>';
        li += '</li>';
        sum += goods[key]['price'] * cartOrder[key];
        ul.innerHTML += li;
    }
    ul.innerHTML += `<li><p class="total">Итого: ${sum} BYN</p></li>`;
}
showCart();

document.onclick = function(event) {
    if (event.target.attributes.name) {
        if (event.target.attributes.name.value === 'delete-goods') {
            delete cartOrder[event.target.attributes.data.value];
            localStorage.setItem('cartOrder', JSON.stringify(cartOrder));
            showCart();
            console.log(cartOrder);
        } else if (event.target.attributes.name.value === 'plus-goods') {
            cartOrder[event.target.attributes.data.value]++;
            localStorage.setItem('cartOrder', JSON.stringify(cartOrder));
            showCart();
        } else if (event.target.attributes.name.value === 'minus-goods') {
            if (!(cartOrder[event.target.attributes.data.value] - 1)) {
                delete cartOrder[event.target.attributes.data.value];
            } else {
                cartOrder[event.target.attributes.data.value]--;
            }
            localStorage.setItem('cartOrder', JSON.stringify(cartOrder));
            showCart();
        } else if (event.target.attributes.name.value === 'buy') {
            let data = {
                name: document.getElementById('customer-name').value,
                email: document.getElementById('customer-email').value,
                tel: document.getElementById('customer-tel').value,
                cart: emailArr(),
            };

            fetch('../mail/mail.php', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                .then(function(res) {
                    if (res) {
                        alert('Заказ отправлен');
                    } else {
                        alert('Ошибка заказа');
                    }
                })
        }
    }
}

function emailArr() {
    let emailArr = {};
    for (let key in cartOrder) {
        let temp = {};
        temp.name = goods[key]['name'];
        temp.pieces = cartOrder[key];
        temp.price = goods[key]['price'];
        temp.articul = goods[key]['articul'];
        emailArr[key] = temp;
    }
    console.log(emailArr);
    return emailArr;
}

window.addEventListener('storage', function(cartOrder) {
    location.reload();
});