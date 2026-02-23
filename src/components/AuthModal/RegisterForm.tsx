// import css from "./AuthModal.module.scss";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { registerUser } from "../../services/firebase";
// import { FirebaseError } from "firebase/app";

// interface RegisterFormValues {
//   name: string;
//   email: string;
//   password: string;
// }

// const registerSchema = yup.object({
//   name: yup.string().min(2, "Too short name").required("Name is required"),
//   email: yup.string().email("Wrong email format").required("Email is required"),
//   password: yup.string().min(6, "Too short").required("Password is required"),
// });

// type Props = {
//   onSuccess: () => void;
//   onSwitch: () => void;
// };

// export default function RegisterForm({ onSuccess, onSwitch }: Props) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterFormValues>({
//     resolver: yupResolver(registerSchema),
//   });

//   const onSubmit = async (data: RegisterFormValues) => {
//     try {
//       await registerUser(data.name, data.email, data.password);

//       onSuccess();
//     } catch (error) {
//       if (error instanceof FirebaseError) {
//         alert(error.message);
//       } else {
//         alert("Unknown error");
//       }
//     }
//   };

//   return (
//     <div className={css.authForm}>
//       <h2>Registration</h2>
//       <p>
//         Thank you for your interest in our platform! In order to register, we
//         need some information. Please provide us with the following information.
//       </p>

//       <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
//         <input type="text" placeholder="Name" {...register("name")} />
//         {errors.name && <span>{errors.name.message}</span>}

//         <input type="email" placeholder="Email" {...register("email")} />
//         {errors.email && <span>{errors.email.message}</span>}

//         <input
//           type="password"
//           placeholder="Password"
//           {...register("password")}
//         />
//         {errors.password && <span>{errors.password.message}</span>}

//         <button type="submit">Sign Up</button>
//       </form>

//       <p className={css.switchText}>
//         Already have an account?{" "}
//         <button type="button" onClick={onSwitch}>
//           Log In
//         </button>
//       </p>
//     </div>
//   );
// }

import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

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

        {/* PASSWORD FIELD WITH EYE */}
        <div className={css.passwordField}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />

          <button type="button" className={css.eyeBtn} onClick={togglePassword}>
            {showPassword ? (
              // eye open
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              // eye closed
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0112 20C5 20 1 12 1 12a21.77 21.77 0 015.06-6.94" />
                <path d="M1 1l22 22" />
              </svg>
            )}
          </button>
        </div>

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
