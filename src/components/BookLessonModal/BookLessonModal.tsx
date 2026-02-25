import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getDatabase, ref, push } from "firebase/database";
import toast from "react-hot-toast"; // ✅ Імпортуємо toast

import { app } from "../../services/firebase";
import type { Teacher } from "../../types/teacher";
import styles from "./BookLessonModal.module.scss";

// 1. Схема валідації
const schema = yup.object().shape({
  reason: yup.string().required("Please select a reason for your lesson"),
  fullName: yup.string().min(3, "Too short").required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Too short")
    .required("Phone number is required"),
});

interface IFormInput {
  reason: string;
  fullName: string;
  email: string;
  phone: string;
}

interface BookLessonModalProps {
  teacher: Teacher;
  onClose: () => void;
}

const BookLessonModal = ({ teacher, onClose }: BookLessonModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { reason: "career" },
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // 2. Функція відправки даних (з використанням Toast)
  const onFormSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      const db = getDatabase(app);
      const bookingsRef = ref(db, "bookings");

      await push(bookingsRef, {
        ...data,
        teacherName: `${teacher.name} ${teacher.surname}`,
        teacherId: teacher.id || `${teacher.name}_${teacher.surname}`,
        createdAt: new Date().toISOString(),
      });

      // ✅ Замість alert використовуємо успішний toast
      toast.success("Booking successful! We will contact you soon.", {
        icon: "📅",
      });

      reset();
      onClose();
    } catch (error) {
      console.error("Firebase submit error:", error);
      // ✅ Замість alert використовуємо помилковий toast
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="close"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M24 8L8 24M8 8L24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2 className={styles.title}>Book trial lesson</h2>
        <p className={styles.description}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={styles.teacherInfo}>
          <img
            src={teacher.avatar_url}
            alt={teacher.name}
            className={styles.avatar}
          />
          <div>
            <span className={styles.teacherLabel}>Your teacher</span>
            <h3 className={styles.teacherName}>
              {teacher.name} {teacher.surname}
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
          <div className={styles.radioGroup}>
            <p className={styles.radioTitle}>
              What is your main reason for learning English?
            </p>
            {[
              { id: "career", label: "Career and business" },
              { id: "kids", label: "Lesson for kids" },
              { id: "abroad", label: "Living abroad" },
              { id: "exams", label: "Exams and coursework" },
              { id: "travel", label: "Culture, travel or hobby" },
            ].map(option => (
              <label key={option.id} className={styles.radioLabel}>
                <input type="radio" value={option.id} {...register("reason")} />
                <span className={styles.customRadio}></span>
                {option.label}
              </label>
            ))}
            {errors.reason && (
              <span className={styles.errorMsg}>{errors.reason.message}</span>
            )}
          </div>

          <div className={styles.inputsContainer}>
            <div className={styles.field}>
              <input
                {...register("fullName")}
                placeholder="Full Name"
                className={styles.input}
              />
              {errors.fullName && (
                <span className={styles.errorMsg}>
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <input
                {...register("email")}
                placeholder="Email"
                className={styles.input}
              />
              {errors.email && (
                <span className={styles.errorMsg}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.field}>
              <input
                {...register("phone")}
                placeholder="Phone number"
                className={styles.input}
              />
              {errors.phone && (
                <span className={styles.errorMsg}>{errors.phone.message}</span>
              )}
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookLessonModal;
