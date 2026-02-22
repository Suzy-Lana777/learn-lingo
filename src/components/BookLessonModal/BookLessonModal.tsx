import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import type { Teacher } from "../../types/teacher";
import styles from "./BookLessonModal.module.scss";

// 1. Валідація схеми
const bookFormSchema = yup.object({
  reason: yup.string().required("Choose a reason"),
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

// 2. Типи для значень форми
export type BookFormValues = {
  reason: string;
  name: string;
  email: string;
  phone: string;
};

// 3. Типи для Props (тепер вони явно використовуються)
interface BookLessonModalProps {
  teacher: Teacher;
  onClose: () => void;
}

export default function BookLessonModal({
  teacher,
  onClose,
}: BookLessonModalProps) {
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: yupResolver(bookFormSchema),
    defaultValues: {
      reason: "career",
    },
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const onSubmit = (data: BookFormValues) => {
    console.log("Form Data:", data);
    setIsBooked(true);

    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 3000);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 8L8 24M8 8L24 24"
              stroke="#121417"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.bookForm}>
          {!isBooked ? (
            <>
              <h2 className={styles.title}>Book trial lesson</h2>
              <p className={styles.description}>
                Our experienced tutor will assess your current language level,
                discuss your learning goals, and tailor the lesson to your
                specific needs.
              </p>

              <div className={styles.teacher}>
                <div className={styles.teacherAva}>
                  <img
                    src={teacher.avatar_url}
                    alt={`${teacher.name} avatar`}
                  />
                </div>
                <div className={styles.teacherName}>
                  <p>Your teacher</p>
                  <span>
                    {teacher.name} {teacher.surname}
                  </span>
                </div>
              </div>

              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <legend>
                    What is your main reason for learning English?
                  </legend>

                  {[
                    { id: "career", label: "Career and business" },
                    { id: "kids", label: "Lesson for kids" },
                    { id: "abroad", label: "Living abroad" },
                    { id: "exams", label: "Exams and coursework" },
                    { id: "travel", label: "Culture, travel or hobby" },
                  ].map(item => (
                    <label key={item.id}>
                      <input
                        type="radio"
                        value={item.id}
                        {...register("reason")}
                      />
                      {/* Використовуємо твої SVG з спрайту або напряму */}
                      <svg width={24} height={24} className={styles.radio}>
                        <use href="/symbol-defs.svg#RadioButton" />
                      </svg>
                      <svg width={24} height={24} className={styles.ring}>
                        <use href="/symbol-defs.svg#ring" />
                      </svg>
                      {item.label}
                    </label>
                  ))}
                  {errors.reason && (
                    <p className={styles.error}>{errors.reason.message}</p>
                  )}
                </fieldset>

                <div className={styles.inputsStack}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className={styles.error}>{errors.name.message}</p>
                  )}

                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email.message}</p>
                  )}

                  <input
                    type="tel"
                    placeholder="Phone number"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className={styles.error}>{errors.phone.message}</p>
                  )}
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Book
                </button>
              </form>
            </>
          ) : (
            <div className={styles.successBox}>
              <h2 className={styles.title}>Thank you!</h2>
              <p className={styles.description}>
                Your booking has been accepted. Our administrator will contact
                you shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
