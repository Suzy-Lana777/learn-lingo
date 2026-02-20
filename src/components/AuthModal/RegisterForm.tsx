import css from "./AuthModal.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../services/firebase";
import { FirebaseError } from "firebase/app";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const registerSchema = yup.object({
  name: yup.string().min(2, "Too short name").required("Name is required"),
  email: yup.string().email("Wrong email format").required("Email is required"),
  password: yup.string().min(6, "Too short").required("Password is required"),
});

type Props = {
  onSuccess: () => void;
  onSwitch: () => void;
};

export default function RegisterForm({ onSuccess, onSwitch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data.name, data.email, data.password);

      onSuccess();
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      } else {
        alert("Unknown error");
      }
    }
  };

  return (
    <div className={css.authForm}>
      <h2>Registration</h2>
      <p>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <input type="text" placeholder="Name" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}

        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit">Sign Up</button>
      </form>

      <p className={css.switchText}>
        Already have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Log In
        </button>
      </p>
    </div>
  );
}
