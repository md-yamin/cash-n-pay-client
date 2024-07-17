import { useParams } from "react-router-dom";
import useUserData from "../../Hooks/useUserData";
import Swal from "sweetalert2";
import { useState } from "react";
import bcrypt from 'bcryptjs';
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CashOut = () => {
    const { id } = useParams()
    const [, userData] = useUserData(id)
    const [passwordEye, setPasswordEye] = useState(false)
    const axiosSecure = useAxiosSecure()
    const showPassword = () => {
        setPasswordEye(!passwordEye)
    }
    const now = new Date()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onTouched'
    });
    const onSubmit = async (data) => {
        const { password } = data;
        const { amount } = data;
        const { agentNumber } = data;
        const verified = await bcrypt.compare(password, userData.password)

        const transactionInfo= {
            user: userData?._id,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            amount:amount,
            agentNumber:agentNumber,
            type:"cashOut",
            request: 'pending'
        }
        console.log(transactionInfo);
        reset()
        if (verified){
            axiosSecure.post('/history', transactionInfo)
            Swal.fire({
                title: 'Success',
                text: 'Amount has been transferred successfully',
                icon: 'success',
                confirmButtonText: 'Continue'
            })
        }
        else{
            Swal.fire({
                title: 'Error',
                text: 'Sorry something went wrong',
                icon: 'error',
                confirmButtonText: 'Close'
            })
        }
    }



    return (
        <div className="space-y-[2vw]">
            <h1 className="text-3xl text-center">Cash Out</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center mx-auto space-y-[3vw]"action="">
                <div className="w-1/2 space-y-4">
                    <label className="text-xl" htmlFor="">Agent&apos;s Number</label>
                    <input
                        name="agentNumber"
                        type="text"
                        placeholder="Agent's Number"
                        className="border text-xs pl-3 text-[3vw] w-full h-[7vw] md:h-[3vw]" 
                        {...register("agentNumber", { required: true })}/>

                </div>

                <div className="w-1/2 space-y-4">
                    <label className="text-xl" htmlFor="">Your Pin Here</label>
                    <div className="relative">
                        <input
                            type={(!passwordEye) ? 'password' : 'text'}
                            placeholder="******"
                            maxLength="5"
                            minLength="5"
                            className="border text-xs pl-3 text-[3vw] w-full h-[7vw] md:h-[3vw]"
                            {...register("password", {
                                required: true,
                                pattern: {
                                    value: /^\d{5}$/,
                                    message: 'Pin must be 5 characters long and numeric digits.'
                                },
                                minLength: {
                                    value: 5,
                                    message: 'Pin must be 5 characters long'
                                },
                                maxLength: {
                                    value: 5,
                                    message: 'Pin must be 5 characters long'
                                }
                            })} required />
                        {errors.password && <p className="text-red-600 font-bold max-w-96 text-xs text-wrap mx-auto">{errors.password.message}</p>}
                        <div className="absolute right-3 top-[5px] md:top-2">
                            {
                                (passwordEye === false) ? <IoEyeOff className="md:text-[2vw] text-black" onClick={showPassword} /> : <IoEye className="md:text-[2vw] text-black" onClick={showPassword} />
                            }
                        </div>
                    </div>
                </div>
                <div className="w-1/2 space-y-4">
                    <label className="text-xl" htmlFor="">Amount To Be Cashed Out</label>
                    <input
                        name="amount"
                        type="number"
                        min={50}
                        max={userData.balance}
                        placeholder="Amount"
                        className="border text-xs pl-3 text-[3vw] w-full h-[7vw] md:h-[3vw]" 
                        {...register("amount", { required: true })}/>
                </div>


                <div className="w-1/2 space-y-4">
                    <input
                        type="submit"
                        value="Submit"
                        className="bg-emerald-700 hover:bg-emerald-500 text-sm py-1 px-5 rounded-md lg:rounded-full md:w-full md:h-[3.5vw] border text-white md:text-[1.2vw]" />
                </div>
            </form>
        </div>
    );
};

export default CashOut;