import Movies from "./Movies";
import Navigation from "./Navigation";

function UserIndex(){
    let dates = []
    for(let i=0;i>7; i++){
        dates.push(new Date(2025,3,25+i))
    }
    let movies = [{
        movie: {
            name: "Звёздные войны XXIII: Атака клонированных клонов",
            info: "Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.",
            poster: "/resourses/css/i/user/poster1.jpg",
            length: 120,
            origin: "США"
        },
        seances:[
            {
                hall:1,
                times: ["10:20", "14:10", "18:40", "22:00"]

            },
            {
                hall:2,
                times: ["11:15", "14:40", "16:00", "18:30", "21:00", "23:30"]
            }
        ]
    }]
    
    return (
        <>
            <header class="page-header">
                <h1 class="page-header__title">Идём<span>в</span>кино</h1>
            </header>
            <Navigation dates={dates}/>
            <Movies seances={movies}/>
        </>
    )
}

export default UserIndex;