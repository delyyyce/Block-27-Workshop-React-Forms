import { useState } from "react"
export default function Authenticate ({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [displayUsername, setDisplayUsername] = useState(null);
    const [error, setError] = useState(null);

    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const result = await response.json();
            console.log(result);
            setError(null);
            setSuccessMessage(result.message);
            setDisplayUsername(result.data.username);
        } catch (error) {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            setError(result.message);
            setSuccessMessage(null);
            setDisplayUsername(null);
        }
    }

    return (
        <>
            <h2>Authenticate</h2>

            {error && <p className='authentication_error'>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
            {displayUsername && <p>Username: {displayUsername}</p>}

            <button onClick={handleClick}>Authenticate Token</button>
        </>
    )
}