<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ИдёмВКино</title>
  @vite(['resources/sass/app.scss', 'resources/js/app.js'])
  <meta name="csrf-token" content="{{{ csrf_token() }}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
</head>

<body>
  <header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
  </header>
  
  <main>
    <section class="buying">
      <div class="buying__info">
        <div class="buying__info-description">
          <h2 class="buying__info-title">{{$seance->movie}}</h2>
          <p class="buying__info-start">Начало сеанса: {{$seance->start}}</p>
          <p class="buying__info-hall">Зал {{$seance->hall}}</p>          
        </div>
        <div class="buying__info-hint">
          <p>Тапните дважды,<br>чтобы увеличить</p>
        </div>
      </div>
      <div class="buying-scheme" data-id="{{$hall->id}}">
        <div class="buying-scheme__wrapper">
        @foreach(json_decode($hall->seats) as $row)
            <div class="buying-scheme__row" data-id="{{$loop->index+1}}"> 
            @foreach($row as $seat)
                <span class="buying-scheme__chair buying-scheme__chair_{{$seat}}" data-id="{{$loop->index+1}}"></span>
            @endforeach
            </div> 
          @endforeach
          
        </div>
        <div class="buying-scheme__legend">
          <div class="col">
            <p class="buying-scheme__legend-price"><span class="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span class="buying-scheme__legend-value">{{$hall->standartCosts}} </span>руб)</p>
            <p class="buying-scheme__legend-price"><span class="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span class="buying-scheme__legend-value">{{$hall->vipCosts}} </span>руб)</p>            
          </div>
          <div class="col">
            <p class="buying-scheme__legend-price"><span class="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
            <p class="buying-scheme__legend-price"><span class="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>                    
          </div>
        </div>
      </div>
      <button class="acceptin-button" >Забронировать</button>
    </section>     
  </main>
  
</body>
</html>