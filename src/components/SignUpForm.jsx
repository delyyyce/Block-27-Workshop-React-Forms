import { useState } from "react"
export default function SignUpForm ({setToken}) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (username.length < 8 && password.length < 8){
                setError("Your username and password must contain 8 or more characters");
                setToken(null);
            } else if (username.length < 8){
                setError("Your username must contain 8 or more characters");
                setToken(null);
            } else if (password.length < 8) {
                setError("Your password must contain 8 or more characters");
                setToken(null);
            } else {
                const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                    method: 'POST',
                    headers: { 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({username, password}),
                });
                const result = await response.json();
                console.log(result);
                setError(null);
                setToken(result.token);
            }
        } catch (error) {
            setError(error.message);
        }
      }

    return (
        <>
            <h2>Sign Up</h2>

            {error && <p className='submission_error'>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label className='username'>
                    Username: 
                    <input value={username} onChange={(e) => setUserName(e.target.value)}/>
                </label>
                <label className='password'>
                    Password:
                    <input value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label className='submit_button'>
                    <button>Submit</button>
                </label>
            </form>
        </>
    )
}