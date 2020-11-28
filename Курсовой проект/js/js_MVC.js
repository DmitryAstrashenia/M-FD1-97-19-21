let model = {
    cartOrder: {},
    goods: {},
    update: function() {
        if (JSON.parse(localStorage.getItem('cartOrder'))) {
            this.cartOrder = JSON.parse(localStorage.getItem('cartOrder'));
        }
    },
    getJSON: function(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = function() {

            let status = xhr.status;

            if (status == 200) {
                callback(null, xhr.response);
            } else {
                callback(status);
            }
        };
        xhr.send();
    },
    addToCartOrder: function(element) {
        if (this.cartOrder[element]) {
            this.cartOrder[element]++;
        } else {
            this.cartOrder[element] = 1;
        }
        console.log(this.cartOrder);
        localStorage.setItem('cartOrder', JSON.stringify(this.cartOrder));
    },
    filterGetJSON: function(element) {
        let object = {};
        for (let i = 0; i < element.length; i++) {
            let tempObject = {};
            tempObject['articul'] = element[i]['gsx$articul']['$t'];
            tempObject['name'] = element[i]['gsx$name']['$t'];
            tempObject['img'] = element[i]['gsx$img']['$t'];
            tempObject['price'] = element[i]['gsx$price']['$t'];
            tempObject['comments'] = element[i]['gsx$comments']['$t'];
            tempObject['show'] = element[i]['gsx$show']['$t'];
            object[element[i]['gsx$id']['$t']] = tempObject;
        }
        return object;
    }
}

let view = {
    showGoods: function(data) {
        let out = '';
        for (let i = 0; i < data.length; i++) {
            out += '<div class="preview position">';
            out += `<h5>${data[i]['gsx$name']['$t']}</h5>`;
            out += `<img src='${data[i]['gsx$img']['$t']}'>`;
            out += `<h6>Цена: ${data[i]['gsx$price']['$t']}BYN</h6>`;
            out += `<button type='button' name='add-to-cart' data-id='${data[i]['gsx$id']['$t']}'> Купить</button>`;
            out += '</div>';
        }
        let goods = document.querySelector('.wrapper_preview');
        goods.innerHTML = out;
    }
}

document.onclick = function(event) {
    if (event.target.attributes.name) {
        if (event.target.attributes.name.value === 'add-to-cart') {
            model.addToCartOrder(event.target.attributes['data-id'].value);
        }
    }
}

window.addEventListener('storage', function(cartOrder) {
    location.reload();
});

model.getJSON("https://spreadsheets.google.com/feeds/list/1O-3EId-cgt_W8keu3oAdDINPjUf-QvYzNhwoBiDaNLg/od6/public/values?alt=json", function(err, data) {

    if (err != null) {
        alert('Что - то пошло не так: ' + err);
    } else {
        data = data['feed']['entry'];
        goods = filterGetJSON(data);
        localStorage.setItem('goods', JSON.stringify(goods));
        console.log(data);
        view.showGoods(data);
    }
});