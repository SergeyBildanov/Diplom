import ConfigItem from "./configItem"

function MakeSelector({name, items}){
    return(
        <ul className="conf-step__selectors-box">
          {items.map((item, index) => {
                return(
                    <ConfigItem value={item} name={name} key={index}/>
                )
            })}
        </ul>
    )
  }

export default MakeSelector;