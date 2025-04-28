function NavTile({date}){
    let today = new Date();
    let weekday = date.toLocaleString('Russian', {weekday:'short'});
    weekday = weekday[0].toUpperCase() + weekday.substr(1);
    let isToday = today.toDateString()===date.toDateString();
    let weekends = [6,0];
    let isWeekend = weekends.includes(date.getDay())
    return(
        <a className={`page-nav__day ${(isToday)?"page-nav__day_today":isWeekend?"page-nav__day_weekend":""}`} href="#">
            <span className="page-nav__day-week">{weekday}</span><span className="page-nav__day-number">{date.getDate()}</span>
        </a>
    )
  }

export default NavTile;