<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ИдёмВКино</title>

  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
  <meta name="csrf-token" content="{{{ csrf_token() }}}">
  @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>

<body>
  <header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
  </header>
  
  <main>
    <section class="ticket">
      
      <header class="tichet__check">
        <h2 class="ticket__check-title">Вы выбрали билеты:</h2>
      </header>
      
      <div class="ticket__info-wrapper">
        <p class="ticket__info">На фильм: <span class="ticket__details ticket__title">{{$movie}}</span></p>
        <p class="ticket__info">Места: <span class="ticket__details ticket__chairs">{{$booked}}</span></p>
        <p class="ticket__info id" data-id="{{$hall_id}}">В зале: <span class="ticket__details ticket__hall">{{$hall}}</span></p>
        <p class="ticket__info">Начало сеанса: <span class="ticket__details ticket__start">{{$start}}</span></p>
        <p class="ticket__info">Стоимость: <span class="ticket__details ticket__cost">{{$sum}}</span> рублей</p>

        <button class="acceptin-button" >Получить код бронирования</button>

        <p class="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
        <p class="ticket__hint">Приятного просмотра!</p>
      </div>
    </section>     
  </main>
  
</body>
</html>