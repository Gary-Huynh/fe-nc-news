const Error =({errorStatus, errorMessage}) =>{
    return(
        <main className="error">
            <h1>Something went wrong error code: {errorStatus}</h1>
            <h1>{errorMessage}</h1>
        </main>
    )
}

export default Error