import { Component } from "react"
import Hall from "./Hall";


function isEqual(a,b){
    let keysA = Object.keys(a);
    for (let key of keysA) {
        if ((a[key] !== b[key])) return false;
    }
    return true;
}

const initState = {
    n: 0,
    m: 0,
    seats: null
}

export default class HallConfig extends Component{
    constructor(){
        super();
        this.types = ["standart", "vip", "disabled"]
        this.state={
            n: 10,
            m: 8,
            seats: null
        };
        this.setStateM = this.setStateM.bind(this);
        this.setStateN = this.setStateN.bind(this);
        this.setStateSeats = this.setStateSeats.bind(this);
    }

    reset(){
        this.setState(initState);
    }
    setStateM(newState){
        this.setState({
            n:this.state.n,
            m:newState,
            seats:this.state.seats
        })
    }

    setStateN(newState){
        this.setState({
            n:newState,
            m:this.state.m,
            seats:this.state.seats
        })
    }
    setStateSeats(newState){
        this.setState({
            n: this.state.n,
            m: this.state.m,
            seats: newState,
        })
    }
    render(){
        return(
            <div>
            <div className="conf-step__legend">
              <label className="conf-step__label">Рядов, шт<input type="text" className="conf-step__input input-rows" placeholder="10" onChange={(e)=>{this.setStateN(e.target.value)}}/></label>
              <span className="multiplier">x</span>
              <label className="conf-step__label">Мест, шт<input type="text" className="conf-step__input input-seats" placeholder="8" onChange={(e)=>{this.setStateM(e.target.value)}}/></label>
            </div>
            <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
            <div className="conf-step__legend">
              <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
              <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
              <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
              <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
            </div>  
            
            <div className="conf-step__hall">
                {!this.state.seats?<Hall n={0} m={0}/>:this.state.seats.length===0?<Hall n={this.state.n} m={this.state.m}/>:<Hall seats={this.state.seats}/>} 
            </div>             
          </div>
        )
    }
}