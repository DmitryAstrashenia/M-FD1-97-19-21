let fruits = [];

function addMassive() {
 for (let i = 0; i < 5; i++){
    fruit = prompt ("Введите название разных фруктов", "");
 if (fruit === null || fruit === undefined) {
     break;
   }else if (fruit === "") {
    alert("Пустая строка. Введите название фрукта");
    i--;
    } else {
    fruits [i] = fruit;
   }
   }
}

function deleteMassive() {
  fruits.length = 0;
}

function checkMassive() {
  fruit = prompt ("Введите название фрукта для проверки", "");
  
  if (fruits.includes(fruit)) { 
    let a= "";
    for (let i=0; i<fruits.length; i++) {
    
      if(fruit === fruits [i]) {
        
        a += "["+ i +"] ";
      }
    }
    alert("Такой фрукт уже есть в списке. Его индекс "+a);

  } else {
  alert ("Такого фрукта нет в списке. Добавим его.");
  fruits.push(fruit);
  }
}

function snowMassive() {
    for (let i=0; i<fruits.length; i++) {
        console.log ("fruits [" + i + "]: " + fruits[i]);
    }
}