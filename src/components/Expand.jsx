import { useState } from "react"



const Expand = ({children, description}) =>{
const [showing, setShowing] = useState(false)

const handleClick = ()=>{
    setShowing((currShowing)=>{
        return !currShowing
    })
}

    return(
        <div>
            <button id="accountButton"  onClick={handleClick}> {showing? "Hide":"Show"} {description}</button>
        {showing? children:null}
        </div>
    )
}


export default Expand