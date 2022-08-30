import React from "react";

// @ts-ignore
import loader from "../../../assets/images/loader.gif";

let Preloader: React.FC = () => {
    return  <img src={loader} alt={"Loading..."}/>
}

export default Preloader