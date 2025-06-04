import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material';
import axios from "axios";
import Input from './form-items/Input';
import authService from '../services/authService';
import { useNavigate, useLocation } from 'react-router';
import conf from '../conf/conf';

function VerifyUserComponent() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("")
    const [codeSent, setCodeSent] = useState(false)
    const {register, handleSubmit, watch} = useForm();
    const {state} = useLocation();

    const handleVerification = async (data) => {
        setServerError("");
        try{
            const val = await authService.verifyUser({username: data.username, verificationCode: data.verificationCode})
            if (val === 'SUCCESS') {
                await axios.post(`${conf.apiURL}/providers/signUp`, {
                    username: data.username,
                    email: state.email,
                    subId: state.userId
                });
                navigate("/login");
            }
        }catch(error){
            setServerError(error.message)
        }
    }

    const sendCodeAgain = async () => {
        const username = watch("username");
        if(!username){
            setServerError("Username required")
            return;
        }
        try{
            await authService.sendVerificationCodeAgain(username);
            setCodeSent(true);
        }catch(errr){
            setServerError(errr.message)
        }

    }

    return <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px] ">
                    Healthcare AI
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Verify your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Enter the Code sent to youar Email&nbsp;
                <Button
                    onClick={sendCodeAgain}
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Send again
                </Button>
            </p>
            {codeSent && <p className='text-green-600 mt-8 text-center'>Code sent to you email</p>}
            {serverError && <p className='text-red-600 mt-8 text-center'>{serverError}</p>}
            <form onSubmit={handleSubmit(handleVerification)} className="mt-8">
                <div className="space-y-5">
                    <Input
                    label="Username"
                    type="text"
                    variant="standard"
                    placeholder="Enter your Username"
                    className='w-full'
                    {...register("username", {
                            required: true
                    })} 
                    />
                    <Input
                        label="verificationCode"
                        type="text"
                        variant="standard"
                        placeholder="Enter your verificationCode"
                        className='w-full'
                        {...register("verificationCode", {
                                required: true
                        })} 
                        />
                    <Button
                        variant="contained"
                        type="submit"
                        className='w-full'
                    >Verify</Button>
                </div>
            </form>
        </div>
    </div>
}
export default VerifyUserComponent;