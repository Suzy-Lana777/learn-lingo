type Props = {
  onSuccess: () => void;
  onSwitch: () => void;
};

export default function RegisterForm({ onSuccess, onSwitch }: Props) {
  return (
    <div>
      <h2>Register</h2>

      <form
        onSubmit={e => {
          e.preventDefault();
          onSuccess();
        }}
      >
        <label>
          Name
          <input type="text" name="name" required />
        </label>

        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Password
          <input type="password" name="password" required />
        </label>

        <button type="submit">Sign up</button>
      </form>

      <p>
        Already have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Log in
        </button>
      </p>
    </div>
  );
}
