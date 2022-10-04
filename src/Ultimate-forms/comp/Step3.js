import React from "react";
import {MainContainer} from "./MainContainer";
import Typography from "@material-ui/core/Typography";
import {Form} from "./FormSettings";
import {FileInput} from "./FileInput";
import {useForm} from "react-hook-form";
import {PrimaryButton} from "./PrimaryButton";

export const Step3 = () => {
    const {control, handleSubmit} = useForm()

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                🦄 Step 3 🦄
            </Typography>
            <Form>
                <FileInput name="files" control={control} />
                <PrimaryButton>Next</PrimaryButton>
            </Form>
        </MainContainer>
    );
}