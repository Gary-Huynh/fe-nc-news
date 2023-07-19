const Error =({errorStatus, errorMessage}) =>{
    return(
        <main className="error">
            <p>Something went wrong error code: {errorStatus}</p>
            <p>{errorMessage}</p>
        </main>
    )
}

export default Error