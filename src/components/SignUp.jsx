import React, { useState } from 'react'
import authservice from '../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from "./Index"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate();
    const [error, seterror] = useState();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const hsignUp = async (data) => {
        seterror("");
        try {
            const session = await authservice.createAccount(data);
            if (session) {
                const Userdata = await authservice.getCurrentUser();
                if (Userdata)
                    {
                        dispatch(login(Userdata))
                        navigate("/");
                    }
            }
        } catch (err) {
            seterror(err)
        }
    }
    return (
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" /></span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(hsignUp)}>
              
                <div className='space-y-5'>


                    <Input
                        label="Name:"
                        placeholder='Enter your name'
                        {...register("name", {
                            required: true
                        })}
                    />

                    <Input
                        label="Email:"
                        placeholder='Enter your email'
                        type='email'
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.
                                    test(value) ||
                                    "Email address must be valid address",
                            }
                        })}
                    />

                    <Input
                        label="password:"
                        type="password"
                        placeholder="Enter your Password"
                        {...register("password", {
                            required: true
                        })} />
                    <Button type='submit' clasName='w-full'>Create Account</Button>
                </div>

            </form>

        </div>
    )
}

export default SignUp