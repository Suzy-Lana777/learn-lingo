import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Props = {
  onClose: () => void;
  initialMode: "login" | "register";
};

export default function AuthModal({ onClose, initialMode }: Props) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  return (
    <Modal onClose={onClose}>
      {mode === "login" ? (
        <LoginForm onSuccess={onClose} onSwitch={() => setMode("register")} />
      ) : (
        <RegisterForm onSuccess={onClose} onSwitch={() => setMode("login")} />
      )}
    </Modal>
  );
}
