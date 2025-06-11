import MovieTile from "./MovieTile"
import { Component } from "react";
// function Movies({seances}){
//     return(
//        <main>
//             {
//                 seances.map((item, index)=>{
//                     return <MovieTile movie={item.movie} seances={item.seances} key={index}/>
//                 })
//             }
//        </main>
//     )
// }

class Movies extends Component{
    constructor(){
        super();
        this.state = {
            "seances": []
        }
        this.setSeances = this.setSeances.bind(this);
    }

    setSeances(newState){
        this.setState(newState);
    }

    render(){
        return(
            <main>
                 {
                     this.state.seances.map((item, index)=>{
                         return <MovieTile movie={item.fullMovie} seances={item.seances} key={index}/>
                     })
                 }
            </main>
         )
    }
}
export default Movies;