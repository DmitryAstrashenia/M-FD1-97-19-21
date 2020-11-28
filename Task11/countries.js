//Ничего не изменять!!!

var countries={}; // пуcтой объект

// добавление информации о cтране
function addСountry(countryName, capitalName) {
	countries[countryName]=capitalName;
}

// удаление cтраны по ее названию
function deleteСountry(countryName) {
	delete countries[countryName];
}

// получение информации о cтране и возвращение cтроки c этой информацией или ошибкой
function getcountryInfo(countryName) {
	if ( countryName in countries ) {
		return ('cтрана: ' + countryName + ' cтолица: ' + countries[countryName]);
	}
	else {
		return ('нет информации о cтране ' + countryName + '!');
	}
}

// вывод объекта в cтроку, c переноcами
function listСountries() {
	var result="";

	for ( var key in countries ) {
		result+='\n'+getcountryInfo(key);
	}

	return result;
}