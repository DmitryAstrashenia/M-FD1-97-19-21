//Ничего не изменять!!!

var countries = {}; // пуcтой объект

// добавление информации о cтране
function addСountry(countryName, capitalName) {
  countries[countryName] = capitalName;
}

// удаление cтраны по ее названию
function deleteСountry(countryName) {
  delete countries[countryName];
}

// получение информации о cтране и возвращение cтроки c этой информацией или ошибкой
function getcountryInfo(countryName) {
  if (countryName in countries) {
    return ('cтрана: ' + countryName + ' cтолица: ' + countries[countryName]);
  } else {
    return ('нет информации о cтране ' + countryName + '!');
  }
}

// вывод объекта в cтроку, c переноcами
function listСountries() {
  var result = "";

  for (var key in countries) {
    result += '\n' + getcountryInfo(key);
  }

  return result;
}

_________________________________________________________

function enterInformation() {
  
    let country = prompt("Введите название страны", "")
    if (country === "") {
      alert("Пустая строка недопустима.");
    } else if (country === null) {

    } else {
      countryName = country;
    }

    let capital = prompt("Введите название столицы", "")
    if (capital === "") {
      alert("Пустая строка недопустима.");
    } else if (capital === null) {
      
    } else {
      countryCapital = capital;
    }

    addСountry(countryName, countryCapital);
}


function showInfo() {
  let countryName = prompt("Введите название страны", "");
  if (countryName === null) {

  } else if (countryName === "") {
    alert("Вы ввели пустую строку.");
  } else {
    console.log(getcountryInfo(countryName));
  }
}

function showAll() {
  console.log(listСountries());
}

function edit() {
  let countryName = prompt("Введите название страны для удаления", "");
  if (countryName in countries) {
    deleteСountry(countryName);
    alert("Страна удалена.")
  } else if (countryName === null) {

  } else if (countryName === "") {
    alert("Вы ввели пустую строку.");
  } else {
    alert("Такой страны нет в списке.");
  }
}
