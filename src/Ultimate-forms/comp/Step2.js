import React from "react";
import {MainContainer} from "./MainContainer";
import Typography from "@material-ui/core/Typography";
import {Form} from "./FormSettings";
import {Input} from "./Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useNavigate} from "react-router-dom";
import {PrimaryButton} from "./PrimaryButton";
import * as yup from "yup";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import parsePhoneNumberFromString from "libphonenumber-js";


const schema = yup.object().shape({
    email: yup
        .string()
        .email("Email should have correct format")
        .required("Email is a required field")
})

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value)
    if(!phoneNumber){
        return value
    }
    return (
        phoneNumber.formatInternational()
    )
}

export const Step2 = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}, watch} = useForm({mode: 'onBlur', resolver: yupResolver(schema)})

    const hasPhone = watch("hasPhone")

    const onSubmit = (data) => {
        navigate('/forms/step3');
    }

    return <MainContainer>
        <Typography component='h2' variant='h5'>🦄 Step 2 🦄</Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('email')}
                id="email"
                type="email"
                label="Email"
                name="email"
                required
                error={!!errors.email}
                helperText={errors?.email?.message}
            />
            <FormControlLabel control={
                <Checkbox {...register('hasPhone')} color="primary"/>
            } label={"Do you have a phone?"} />

            {
                hasPhone && (
                    <Input
                        {...register('phoneNumber')}
                        id="phoneNumber"
                        type="tel"
                        label="Phone Number"
                        name="phoneNumber"
                        onChange={(event)=>{
                            event.target.value = normalizePhoneNumber(event.target.value)
                        }}

                    />
                )
            }

            <PrimaryButton>NEXT</PrimaryButton>
        </Form>
        </MainContainer>

}