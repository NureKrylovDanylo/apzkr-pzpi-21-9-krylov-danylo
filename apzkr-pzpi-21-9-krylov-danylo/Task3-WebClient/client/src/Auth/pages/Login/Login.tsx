import React, { useContext } from "react";
import {  useForm } from "react-hook-form";
import { Button } from "../../../components/UI/Button/Button";
import { Input } from "../../../components/UI/Input/Input";
import mapJwtClaims from "../../../utils/mapJwtClaims";
import { login } from "../../http/authApi";
import formCl from "../../styles/AuthorizeForm.module.css";
import { setFormErrors } from "../../../utils/setFormErrors";
import { UserSessionContext } from "../../..";
import { FormLayout } from "../../../components/FormLayout/FormLayout";
import { useNavigate } from "react-router-dom";
import { UMLS_VIEWER_ROUTE } from "../../../routesConsts";

export interface ILoginFormData {
  login: string;
  password: string;
}

export const Login = () => {
  const { checkIsAuthorized } = useContext(UserSessionContext)!;
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    getValues,
  } = useForm<ILoginFormData>();
  const onSubmit = async (data: ILoginFormData) => {
    await login(data)
      .then(() => {
        checkIsAuthorized().then(() => navigate(UMLS_VIEWER_ROUTE));
      })
      .catch(({ response }) => {
        const data = response?.data;
        data && setFormErrors(setError, data);
      });
  };

  return (
    <div className={formCl.form}>
      <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <div className={formCl.item}>
        <Input
          label="Login"
          inputType="text"
          control={control}
          name={"login"}
          rules={{
            required: "Login is required",
            maxLength: {
              value: 10,
              message: "Max length is 10",
            },
            minLength: {
              value: 5,
              message: "Min length is 5",
            },
          }}
          errorMessage={errors.login?.message}
        ></Input>
      </div>
      <div className={formCl.item}>
        <Input
          label="Password"
          inputType="password"
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            maxLength: {
              value: 15,
              message: "Max length is 15",
            },
            minLength: {
              value: 6,
              message: "Min length is 6",
            },
          }}
          errorMessage={errors.password?.message}
        ></Input>
      </div>
      <div className={formCl.submitButtons}>
        <Button type="submit">Login</Button>
      </div>
    </FormLayout>
    </div>
  );
};
