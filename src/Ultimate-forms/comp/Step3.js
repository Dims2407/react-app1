import React from "react";
import {MainContainer} from "./MainContainer";
import Typography from "@material-ui/core/Typography";
import {Form} from "./FormSettings";
import {FileInput} from "./FileInput";
import {useForm} from "react-hook-form";
import {PrimaryButton} from "./PrimaryButton";
import {useNavigate} from "react-router-dom";
import {useData} from "../DataContext";

export const Step3 = () => {
    const navigate = useNavigate()
    const {data, setValues} = useData()
    const {control, handleSubmit} = useForm({
        defaultValues: {
            files: data.files
        }
    })

    const onSubmit = (data) => {
        navigate('/forms/result')
        setValues(data)
    }

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                🦄 Step 3 🦄
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileInput name="files" control={control} />
                <PrimaryButton>NEXT</PrimaryButton>
            </Form>
        </MainContainer>
    );
}