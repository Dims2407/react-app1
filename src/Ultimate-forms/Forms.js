import React from "react";
import {Routes ,Route} from 'react-router-dom';
import {HeaderForms} from "./comp/HeaderForms";
import {Step1} from "./comp/Step1";
import {Step2} from "./comp/Step2";
import {Step3} from "./comp/Step3";




const Result = () => <>Result</>




function Forms() {
    return <>
        <HeaderForms/>
        <Routes>
            <Route path="/*" element={<Step1/>}/>
            <Route path='/step2' element={<Step2/>}/>
            <Route path='/step3' element={<Step3/>}/>
            <Route path='/result' element={<Result/>}/>
        </Routes>
    </>

}

export default Forms;