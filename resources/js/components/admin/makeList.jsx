import MakeItem from './makeItem';

function MakeList({list}){
    return(
        <ul className="conf-step__list">
          {list.map((item, index) => {
            return(
                <li id={item} key={index}>
                    <MakeItem item={item}/>
                </li>
            )
            })}
        </ul>
    )
  }

export default MakeList;