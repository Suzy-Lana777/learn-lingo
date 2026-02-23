// import css from "./AuthModal.module.scss";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { loginUser } from "../../services/firebase";
// import { FirebaseError } from "firebase/app";
// import { useState } from "react";

// interface LoginFormValues {
//   email: string;
//   password: string;
// }

// const loginSchema = yup.object({
//   email: yup.string().email("Wrong email format").required("Email is required"),
//   password: yup.string().min(6, "Too short").required("Password is required"),
// });

// const [showPassword, setShowPassword] = useState(false);

// const togglePassword = () => {
//   setShowPassword(prev => !prev);
// };

// type Props = {
//   onSuccess: () => void;
//   onSwitch: () => void;
// };

// export default function LoginForm({ onSuccess, onSwitch }: Props) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: yupResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormValues) => {
//     try {
//       await loginUser(data.email, data.password);
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
//       <h2>Log In</h2>
//       <p>
//         Welcome back! Please enter your credentials to access your account and
//         continue your search for a teacher.
//       </p>

//       <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
//         <input type="email" placeholder="Email" {...register("email")} />
//         {errors.email && <span>{errors.email.message}</span>}

//         <input
//           type="password"
//           placeholder="Password"
//           {...register("password")}
//         />
//         {errors.password && <span>{errors.password.message}</span>}

//         <button type="submit">Log In</button>
//       </form>

//       <p className={css.switchText}>
//         No account?{" "}
//         <button type="button" onClick={onSwitch}>
//           Register
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
import { loginUser } from "../../services/firebase";
import { FirebaseError } from "firebase/app";

interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email("Wrong email format").required("Email is required"),
  password: yup.string().min(6, "Too short").required("Password is required"),
});

type Props = {
  onSuccess: () => void;
  onSwitch: () => void;
};

export default function LoginForm({ onSuccess, onSwitch }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginUser(data.email, data.password);
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
      <h2>Log In</h2>
      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        {/* Email */}
        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        {/* Password with eye */}
        <div className={css.passwordField}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />

          <button
            type="button"
            className={css.eyeBtn}
            onClick={togglePassword}
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              // Eye OFF (hidden)
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 1 12 1 12a21.77 21.77 0 0 1 5.06-7.94" />
                <path d="M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a21.8 21.8 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              // Eye ON
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit">Log In</button>
      </form>

      <p className={css.switchText}>
        No account?{" "}
        <button type="button" onClick={onSwitch}>
          Register
        </button>
      </p>
    </div>
  );
}
