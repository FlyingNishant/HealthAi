import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material';
import Input from './form-items/Input';
import authService from '../services/authService';
import { Link, useNavigate } from 'react-router';

function SignupComponent() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("")
    const {register,  formState: { errors }, handleSubmit, watch} = useForm();

    const handleSignup = async (data) => {
        setServerError("");
        try{
            const regUser = await authService.registerUser({
                username: data.username,
                email: data.email,
                password: data.password,
            });
            navigate("/verify", {state:{username:data.username,email:data.email,userId:regUser.userSub}})
        }catch(err){
            setServerError(err.message)
        }
    }

    return <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px] ">
                    Healthcare AI
                </span>
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
            {serverError && <p className='text-red-600 mt-8 text-center'>{serverError}</p>}
            <form onSubmit={handleSubmit(handleSignup)} className="mt-8">
                <div className="space-y-5">
                    <Input
                        label="Username"
                        type="text"
                        variant="standard"
                        placeholder="Enter your Username"
                        className='w-full'
                        error={errors.username ? true : false}
                        errorText={errors.username?.message}
                        {...register("username", {
                                required: true
                        })} 
                        />
                    <Input
                    label="Email"
                    type="email"
                    variant="standard"
                    placeholder="Enter your email"
                    className='w-full'
                    error={errors.email ? true : false}
                    errorText={errors.email?.message}
                    {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                    })} 
                    />
                    <Input
                        label="Password"
                        type="password"
                        variant="standard"
                        placeholder="Enter your Password"
                        className='w-full'
                        error={errors.password ? true : false}
                        errorText={errors.password?.message}
                        {...register('password', {required: true, minLength: 6})}
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        variant="standard"
                        placeholder="Enter your Password"
                        className='w-full'
                        error={errors.confirm_password ? true : false}
                        errorText={errors.confirm_password?.message}
                        {...register('confirm_password', {
                            required: true,
                            validate: (val) => {
                                if(watch('password') != val){
                                    return "your password do not match"
                                }
                            }
                        })}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        className='w-full'
                    >Sign Up</Button>
                </div>
            </form>
        </div>
    </div>

}
export default SignupComponent;