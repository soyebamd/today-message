function Header({ formStatus, setFormStatus }) {
  return (
    <header className="header">
      <div className="logo">
        <img
          src="./logo.png"
          height="68"
          width="68"
          alt="Today I Learned Logo"
        />
        <h1>Today I Learned</h1>
      </div>
      <div>
        <button className="btn btn-large btn-open">SignUp</button>

        <button className="btn btn-large btn-open">Login</button>

        <button
          className="btn btn-large btn-open"
          onClick={() => setFormStatus((prev) => !prev)}
        >
          {formStatus ? "Close" : "Share a fact"}
        </button>
      </div>
    </header>
  );
}

export default Header;
