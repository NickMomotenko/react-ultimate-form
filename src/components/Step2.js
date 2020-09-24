import React from "react";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";

import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import PrimaryButton from "./Button";
import Form from "./Form";
import Input from "./Input";
import MainContainer from "./MainContainer";
import { useHistory } from "react-router-dom";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import { useData } from "../DataContext";

const schema = yup.object().shape({
  email: yup.string().email("Email should have correct format"),
});

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return value;
  }

  return phoneNumber.formatInternational();
};

const Step2 = () => {
  const history = useHistory();

  const { data, setValues } = useData();

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    history.push("/step3");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="email"
          type="email"
          label="Email Name"
          name="email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={data.hasPhone}
              defaultValue={data.hasPhone}
              name="hasPhone"
              inputRef={register}
              color="primary"
            />
          }
          label="Do you have a phone?"
        />

        {hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          />
        )}

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step2;
