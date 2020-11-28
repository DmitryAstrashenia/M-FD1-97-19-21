document.addEventListener('DOMContentLoaded', setApi);

function setApi() {
    let input = document.getElementById('name_goods');

    let button = document.getElementById('button__name_goods');
    button.addEventListener('click', qwe);

    function qwe() {
        console.log(input.value);
    }
};