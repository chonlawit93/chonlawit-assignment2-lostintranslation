import { useForm } from 'react-hook-form'
import { loginUser } from '../../api/user'
import { useState } from 'react'

const userNameConfig = {
    required: true,
    minLength: 2
}

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [ loading, setLoading ] = useState(false)


    const onSubmit = async ({ username }) => {
        setLoading(true)
        const [ error, user ] = await loginUser(username)
        console.log('Error: ', error);
        console.log('User', user)
        setLoading(false)
    }
   



    const errorMessage = (() => {
        if (!errors.username) {
            return null
        }

        if (errors.username.type === 'required') {
            return <span>Username is required</span>
        }

        if (errors.username.type === 'minLength') {
            return <span>Username is too short, min 2</span>
        }
    })()


    return (
        <>
            <h2>What's your name?</h2>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <fieldset>
                    <label htmlFor='username'>Username: </label>
                    <input
                        type='text'
                        placeholder='username'
                        { ...register('username', userNameConfig) }
                    />
                    { errorMessage }
                </fieldset>
                <button type='submit' disabled={ loading }>Login</button>
                { loading && <p>Logging in...</p> }
            </form>
        </>
    );
}

export default LoginForm;