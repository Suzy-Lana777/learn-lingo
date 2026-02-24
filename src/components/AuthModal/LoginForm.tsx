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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { loginUser } from "../../services/firebase";
import css from "./AuthModal.module.scss";

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
      toast.success("Welcome back!", {
        duration: 3000,
        icon: "👋",
      });
      onSuccess();
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("Invalid email or password");
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
        <div className={css.field}>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={css.input}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={css.field}>
          <div className={css.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={css.input}
            />
            <button
              type="button"
              className={css.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path>
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className={css.submitBtn}>
          Log In
        </button>
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
