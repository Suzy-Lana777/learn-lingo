import { useState } from "react";
import Modal from "../Modal/Modal";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type Props = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");

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
