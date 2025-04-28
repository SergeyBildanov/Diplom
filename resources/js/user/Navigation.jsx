import NavTile from "./NavTile"

function Navigation({dates}){
    return(
        <nav className="page-nav">
            {
                dates.map((item,index)=>{
                    return <NavTile date={item} key={index}/>
                })
            }
        </nav>
    )
}

export default Navigation;