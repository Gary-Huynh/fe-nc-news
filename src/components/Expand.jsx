import { useState } from "react"



const Expand = ({children, description}) =>{
const [showing, setShowing] = useState(true)

const handleClick = ()=>{
    setShowing((currShowing)=>{
        return !currShowing
    })
}

    return(
        <div>
            <button onClick={handleClick}> {showing? "hide":"show"} {description}</button>
        {showing? children:null}
        </div>
    )
}


export default Expand