import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reduser";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";


const usersSearchValidate = (values: any) => {
    const errors = {};
    return errors;
}

type FormType =  {
    term: string
    friend: "true" | "false" | "null"
}


type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

 export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

     const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, {setSubmitting}:{ setSubmitting: (isSubmitting: boolean) => void}) => {

        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }

        props.onFilterChanged(filter)
        setSubmitting(false)
        // setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        // }, 400);
    }


    return <div>
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: String(filter.friend) as "true" | "false" | "null" }}
    validate={usersSearchValidate}
    onSubmit={submit}
        >
        {({ isSubmitting }) => (
        <Form>
            <Field type="text" name="term" />
            <Field as="select" name="friend">
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
            </Field>
        {/*<ErrorMessage name="email" component="div" />*/}
    {/*<Field type="password" name="password" />*/}
    {/*<ErrorMessage name="password" component="div" />*/}
    <button type="submit" disabled={isSubmitting}>
        Find
        </button>
        </Form>
)}
    </Formik>
    </div>
})