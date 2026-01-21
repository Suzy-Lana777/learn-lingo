type Props = {
  onSuccess: () => void;
  onSwitch: () => void;
};

export default function LoginForm({ onSuccess, onSwitch }: Props) {
  return (
    <div>
      <h2>Log In</h2>

      {/* тимчасово без react-hook-form: просто щоб перевірити модалку */}
      <form
        onSubmit={e => {
          e.preventDefault();
          onSuccess();
        }}
      >
        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button type="submit">Log in</button>
      </form>

      <p>
        No account?{" "}
        <button type="button" onClick={onSwitch}>
          Register
        </button>
      </p>
    </div>
  );
}
