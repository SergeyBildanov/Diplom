import MakeList from "./makeList.jsx";
import MakeSelector from "./MakeSelector.jsx";
import Hall from "./Hall.jsx";
import MovieList from "./MovieList.jsx";
import Timeline from "./Timeline.jsx";
import { useEffect } from "react";jkik

function App(){
    let halls = [];
    let movies = [];

    let hall1 = [
        {
            name: "Миссия выполнима",
            start: "00:00"
        },
        {
            name: "Миссия выполнима",
            start: "12:00"
        },
        {
            name: "Звёздные войны XXIII: Атака клонированных клонов",
            start: "14:00"
        }
    ];
    let hall2 = [
        {
            name: "Миссия выполнима",
            start: "22:00"
        },
        {
            name: "Миссия выполнима",
            start: "19:50"
        },
    ];
    useEffect(()=>{
      const headers = Array.from(document.querySelectorAll('.conf-step__header'));
      headers.forEach(header => header.addEventListener('click', () => {
        header.classList.toggle('conf-step__header_closed');
        header.classList.toggle('conf-step__header_opened');
      }));

    });
    return(
        <>
        <header className="page-header">
        <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </header>
      
      <main className="conf-steps">
        <section className="conf-step">
          <header className="conf-step__header conf-step__header_opened">
            <h2 className="conf-step__title">Управление залами</h2>
          </header>
          <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">Доступные залы:</p>
            <MakeList list={halls}/>
            <button className="conf-step__button conf-step__button-accent">Создать зал</button>
          </div>
        </section>
        
        <section className="conf-step">
          <header className="conf-step__header conf-step__header_opened">
            <h2 className="conf-step__title">Конфигурация залов</h2>
          </header>
          <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <MakeSelector name='chairs' items={halls} />
            <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
            <div className="conf-step__legend">
              <label className="conf-step__label">Рядов, шт<input type="text" className="conf-step__input" placeholder="10" /></label>
              <span className="multiplier">x</span>
              <label className="conf-step__label">Мест, шт<input type="text" className="conf-step__input" placeholder="8" /></label>
            </div>
            <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
            <div className="conf-step__legend">
              <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
              <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
              <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
              <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
            </div>  
            
            <div className="conf-step__hall">
                <Hall n={10} m={8}/>  
            </div>
            
            <fieldset className="conf-step__buttons text-center">
              <button className="conf-step__button conf-step__button-regular">Отмена</button>
              <input type="submit" defaultValue="Сохранить" className="conf-step__button conf-step__button-accent"/>
            </fieldset>                 
          </div>
        </section>
        
        <section className="conf-step">
          <header className="conf-step__header conf-step__header_opened">
            <h2 className="conf-step__title">Конфигурация цен</h2>
          </header>
          <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
            <ul className="conf-step__selectors-box">
                <MakeSelector name='prices' items={halls} />
            </ul>
              
            <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
              <div className="conf-step__legend">
                <label className="conf-step__label">Цена, рублей<input type="text" className="conf-step__input" placeholder="0" /></label>
                за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
              </div>  
              <div className="conf-step__legend">
                <label className="conf-step__label">Цена, рублей<input type="text" className="conf-step__input" placeholder="0" defaultValue="350"/></label>
                за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
              </div>  
            
            <fieldset className="conf-step__buttons text-center">
              <button className="conf-step__button conf-step__button-regular">Отмена</button>
              <input type="submit" defaultValue="Сохранить" className="conf-step__button conf-step__button-accent" />
            </fieldset>  
          </div>
        </section>
        
        <section className="conf-step">
          <header className="conf-step__header conf-step__header_opened">
            <h2 className="conf-step__title">Сетка сеансов</h2>
          </header>
          <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">
              <button className="conf-step__button conf-step__button-accent">Добавить фильм</button>
            </p>
            <MovieList movies={movies}/>
            
            <div className="conf-step__seances">
              <div className="conf-step__seances-hall">
                <h3 className="conf-step__seances-title">Зал 1</h3>
                <Timeline movies={hall1}/>
              </div>
              <div className="conf-step__seances-hall">
                <h3 className="conf-step__seances-title">Зал 2</h3>
                <Timeline movies={hall2}/>
              </div>
            </div>
            
            <fieldset className="conf-step__buttons text-center">
              <button className="conf-step__button conf-step__button-regular">Отмена</button>
              <input type="submit" defaultValue="Сохранить" className="conf-step__button conf-step__button-accent"/>
            </fieldset>  
          </div>
        </section>
        
        <section className="conf-step">
          <header className="conf-step__header conf-step__header_opened">
            <h2 className="conf-step__title">Открыть продажи</h2>
          </header>
          <div className="conf-step__wrapper text-center">
            <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
            <button className="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
          </div>
        </section>    
      </main>
        </>
    )
}

export default App;