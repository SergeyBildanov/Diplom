<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ИдёмВКино</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
  <meta name="csrf-token" content="{{{ csrf_token() }}}">
  @vite(['resources/sass/app.scss','resources/js/app.js'])
</head>

<body class="admin-index">
<div class="popup add-film-popup">
  <div class="popup__wrapper">
    <div class="popup__container">
      <div class="popup__content">
        <div class="popup__dismiss">
          <img src="{{asset('images/admin/close.png')}}" alt="" class="dismiss-image">
        </div>
        <div class="popup__header">
          <div class="popup__title">Добавить новый фильм</div>
        </div>
      
        <form action="/movie/create" method="POST" class="popup__form add-movie"  enctype="multipart/form-data">
            @csrf
            <label class="conf-step__label-fullsize" for="name">
              <p class="conf-step__paragraph">Наименование фильма</p>
              <input class="conf-step__input" name="name" required>
            </label>
            <label class="conf-step__label-fullsize" for="info">
              <p class="conf-step__paragraph">Описание фильма</p>
              <textarea name="info" id="" class="conf-step__input"></textarea>
            </label>
            <label class="conf-step__label-fullsize" for="poster">
              <p class="conf-step__paragraph">Постер фильма</p>
              <input type="file" class="conf-step__input" name="poster" required>
            </label>
            <label class="conf-step__label-fullsize" for="length">
              <p class="conf-step__paragraph">Длительность фильма</p>
              <input class="conf-step__input" name="length" required>
            </label>
            <label class="conf-step__label-fullsize" for="origin">
              <p class="conf-step__paragraph">Страна производства</p>
              <input class="conf-step__input" name="origin" required>
            </label>
            <fieldset class="conf-step__buttons text-center">
              <input type="reset" value="Отмена" class="conf-step__button conf-step__button-regular">
              <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent">
            </fieldset> 
        </form>
      </div>
    </div>
  </div>
</div>
<div class="popup add-seance-popup">
  <div class="popup__wrapper">
    <div class="popup__container">
      <div class="popup__content">
        <div class="popup__dismiss">
        <img src="{{asset('images/admin/close.png')}}" alt="" class="dismiss-image">
        </div>
        <div class="popup__header">
          <div class="popup__title">Запланировать сеанс</div>
        </div>
      
        <form class="popup__form add-seance">
            @csrf
          <label class="conf-step__label-fullsize" for="films" >
              <p class="conf-step__paragraph">Выберите фильм</p>
              <select name="film" class="conf-step__input">
                <option value="">--Выберите фильм--</option>
                @foreach($movies as $movie)
                  <option value="{{$movie->name}}">{{$movie->name}}</option>
                @endforeach
            </label>
            <label class="conf-step__label-fullsize" for="length">
              <p class="conf-step__paragraph">День сеанса/p>
              <input type="date" class="conf-step__input" name="day" required>
            </label>
            <label class="conf-step__label-fullsize" for="origin">
              <p class="conf-step__paragraph">Начало сеанса</p>
              <input type="time" class="conf-step__input seance-start" name="start" required>
            </label>
            <fieldset class="conf-step__buttons text-center">
              <input type="reset" value="Отмена" class="conf-step__button conf-step__button-regular">
              <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent">
            </fieldset> 
        </form>
      </div>
    </div>
  </div>
</div>
<header class="page-header">
    <h1 class="page-header__title">Идём<span>в</span>кино</h1>
    <span class="page-header__subtitle">Администраторррская</span>
  </header>
  
  <main class="conf-steps">
    <section class="conf-step">
      <header class="conf-step__header conf-step__header_opened">
        <h2 class="conf-step__title">Управление залами</h2>
      </header>
      <div class="conf-step__wrapper">
        <p class="conf-step__paragraph">Доступные залы:</p>
        <ul class="conf-step__list">
          @foreach($notActive as $hall)
            <li >Зал {{$hall->number}}
              <a href="/halls/delete/{{$hall->id}}" class="delete-hall"><button class="conf-step__button conf-step__button-trash"></button></a>
            </li>
          @endforeach
        </ul>
        <form action="/hall/create" method="POST" name="add">
          @csrf
          <button class="conf-step__button conf-step__button-accent add-hall">Создать зал</button>
        </form>
        
      </div>
    </section>
    
    <section class="conf-step">
      <header class="conf-step__header conf-step__header_opened">
        <h2 class="conf-step__title">Конфигурация залов</h2>
      </header>
      <div class="conf-step__wrapper">
        <p class="conf-step__paragraph">Выберите зал для конфигурации:</p>
        <ul class="conf-step__selectors-box">
            @foreach($notActive as $hall)
              <li><input type="radio" class="conf-step__radio conf-seats" name="chairs-hall" value="{{$hall->number}}" data-id="{{$hall->id}}" checked><span class="conf-step__selector">Зал {{$hall->number}}</span></li>
            @endforeach
        </ul>
        <div class="config-wrapper">
        <p class="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
        <div class="config-halls">
          
        </div>
        
        </div>
        
        
        <fieldset class="conf-step__buttons text-center">
          <button class="conf-step__button conf-step__button-regular reset-hall">Отмена</button>
          <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent config-hall">
        </fieldset>                 
      </div>
    </section>
    
    <section class="conf-step">
      <header class="conf-step__header conf-step__header_opened">
        <h2 class="conf-step__title">Конфигурация цен</h2>
      </header>
      <div class="conf-step__wrapper">
        <p class="conf-step__paragraph">Выберите зал для конфигурации:</p>
        <ul class="conf-step__selectors-box">
            @foreach($notActive as $hall)
              <li><input type="radio" class="conf-step__radio conf-costs" name="chairs-hall" data-id="{{$hall->id}}" checked><span class="conf-step__selector">Зал {{$hall->number}}</span></li>
            @endforeach
        </ul>
        <div class="prices-wrapper">
            <p class="conf-step__paragraph">Установите цены для типов кресел:</p>
                  <div class="conf-step__legend">
                    <label class="conf-step__label">Цена, рублей<input type="text" class="conf-step__input standart-cost" placeholder="0" ></label>
                    за <span class="conf-step__chair conf-step__chair_standart"></span> обычные кресла
                  </div>  
                  <div class="conf-step__legend">
                    <label class="conf-step__label">Цена, рублей<input type="text" class="conf-step__input vip-cost" placeholder="0" value="350"></label>
                    за <span class="conf-step__chair conf-step__chair_vip"></span> VIP кресла
                  </div>  
        </div>
        
        
        <fieldset class="conf-step__buttons text-center">
          <button class="conf-step__button conf-step__button-regular">Отмена</button>
          <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent confirm-costs">
        </fieldset>  
      </div> 
    </section>
    
    <section class="conf-step">
      <header class="conf-step__header conf-step__header_opened">
        <h2 class="conf-step__title">Сетка сеансов</h2>
      </header>
      <div class="conf-step__wrapper">
        <p class="conf-step__paragraph">
          <button class="conf-step__button conf-step__button-accent add-film-button">Добавить фильм</button>
        </p>
        <div class="conf-step__movies">
            @foreach($movies as $movie)
              <div class="conf-step__movie">
                <img class="conf-step__movie-poster" alt="poster" src="images/admin/{{$movie->poster}}">
                <h3 class="conf-step__movie-title">{{$movie->name}}</h3>
                <p class="conf-step__movie-duration">{{$movie->length}} минут</p>
              </div>
            @endforeach           
        </div>
        
        <div class="conf-step__seances">
          
        </div>
        
        <fieldset class="conf-step__buttons text-center">
          <button class="conf-step__button conf-step__button-regular reset-seances">Отмена</button>
          <input type="submit" value="Сохранить" class="conf-step__button conf-step__button-accent save-seances">
        </fieldset>  
      </div>
    </section>
    
    <section class="conf-step">
      <header class="conf-step__header conf-step__header_opened">
        <h2 class="conf-step__title">Открыть продажи</h2>
      </header>
      <div class="conf-step__wrapper">
        <p class="conf-step__paragraph">Выберите зал для конфигурации:</p>
        <ul class="conf-step__selectors-box">
            @foreach($halls as $hall)
              <li><input type="radio" class="conf-step__radio conf-activate" name="chairs-hall" value="{{$hall->number}}" data-id="{{$hall->id}}" data-active="{{$hall->isActive}}"><span class="conf-step__selector">Зал {{$hall->number}}</span></li>
            @endforeach
        </ul>
      </div>
      <div class="conf-step__wrapper text-center">
        <p class="conf-step__paragraph">Всё готово, теперь можно:</p>
        <button class="conf-step__button conf-step__button-accent selling-button">Открыть продажу билетов</button>
      </div>
    </section>
       
</main>
<div class="config-hall_confirm hidden">
  <span class="config-hall_status">Данный этап конфигурации пройден успешно</span>
</div>


</body>
</html>
