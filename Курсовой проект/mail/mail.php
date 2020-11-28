<?php
$data=file_get_contents('php://input');
$data=json_decode($data,true);
// var_dump($data);

// Сообщение
$message .= 'Имя: '.$data['name']."\n";
$message .= 'Email: '.$data['email']."\n";
$message .= 'Телефон: '.$data['tel']."\n";
$summa = 0;
foreach($data['cart'] as $key=>$value){
    $message .='Наименование товара: '.$value['name'].','.' Количество: '.$value['pieces'].'шт.'.','.' Цена: '.$value['price'].'BYN;'."\n";
    $summa +=$value['price']*$value['pieces'];
}
$message .= 'Итого: '.$summa.'BYN';

// Отправляем
$mail=mail($data['email'].','.'admin@dimon713.ru', 'Новая Покупка', $message);
if($mail){
    echo 'yes';
} else {
    echo 'no';
}
?>