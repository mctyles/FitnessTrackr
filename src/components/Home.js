const Home = ({user, token}) => {
    return (
        <main className="p-3">
            { token && user ? <h2>Welcome to Fitness Track.r, <span className="username">{user.username}</span>!</h2> :
                <h2>Welcome to FitTrak, please log in or sign up for an account!</h2>
            }
        </main>
    )
}

export default Home;