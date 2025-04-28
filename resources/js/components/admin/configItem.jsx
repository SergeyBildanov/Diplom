function ConfigItem({value, name}){
    return(
        <li>
        <input type="radio" className="conf-step__radio" name={`${name}-hall`} defaultValue={value} /><span className="conf-step__selector">{value}</span>
        </li>
    )
  }


export default ConfigItem;