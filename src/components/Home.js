const Home = ({user, token}) => {
    return (
        <main>
            { token && user ? <h2>Welcome to Fitness Track.r, <span className="username">{user.username}</span>!</h2> :
                <h2>Welcome to Fitness Track.r, please log in!</h2>
            }
        </main>
    )
}

export default Home;