const Home = ({ user, token, successMsg }) => {
  return (
    <main className="p-3">
      {successMsg && (
        <div className="alert alert-success mt-3" role="alert">
          {successMsg}
        </div>
      )}
      {token && user ? (
        <h2 className="m-3">
          Welcome to FitTrak, <span className="username">{user.username}</span>!
        </h2>
      ) : (
        <h2>Welcome to FitTrak, please log in or sign up for an account!</h2>
      )}
    </main>
  );
};

export default Home;
