import { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthContext";
import bcrypt from 'bcryptjs';


const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const [passwordEye, setPasswordEye] = useState(false)
    const showPassword = () => {
        setPasswordEye(!passwordEye)
    }


    const hashedPin = async (pin) => {
        const random = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(pin, random)
        return hash
    }


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onTouched'
    });
    const onSubmit = async (data) => {
        const { name } = data;
        const { email } = data;
        const { number } = data;
        const { password } = data;
        const { accountType } = data;
        const pin = await hashedPin(password)
        reset()



        await createUser(email, password + 0, name)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateUserProfile(name, password + 0)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                            number: number,
                            password: pin,
                            balance: 50,
                            accountType: accountType,
                            status: 'pending'
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: 'Success',
                                        text: 'You have successfully registered',
                                        icon: 'success',
                                        confirmButtonText: 'Continue'
                                    })
                                }
                            })
                        navigate('/')
                    })

            })
            .catch(
                error => {
                    console.log(error),
                        Swal.fire({
                            title: 'Error',
                            text: 'Sorry something went wrong',
                            icon: 'error',
                            confirmButtonText: 'Close'
                        })
                }

            )
    }

    const inputStyle = "border text-xs pl-3 text-[3vw] w-full h-[7vw] md:h-[3vw] mb-3"

    return (
        <div className="flex w-full h-full justify-center items-center mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:space-y-[1vw] mx-auto mt-[10vh] md:mt-3 flex flex-col justify-center" action="">
                <div>
                    <h2 className="md:text-[3vw] text-xl text-center uppercase">Register</h2>
                    <p className="md:text-[1.2vw] text-center w-1/2 text-xs mt-5 md:mt-5 md:w-full mx-auto">Enter valid information and create an account.</p>
                </div>

                <div>
                    <label className="text-[1.2vw] hidden md:block" htmlFor="">Name</label>
                    <input
                        type="text"
                        className={`${inputStyle}`}
                        placeholder="Name"
                        {...register("name", { required: true })} />
                </div>

                <div>
                    <label className="text-[1.2vw] hidden md:block" htmlFor="">Number</label>

                    <input
                        type="text"
                        className={`${inputStyle}`}
                        placeholder="Phone Number"
                        {...register("number", { required: true })} />
                </div>

                <div>
                    <label className="text-[1.2vw] hidden md:block" htmlFor="">Email</label>
                    <input
                        type="text"
                        className={`${inputStyle}`}
                        placeholder="Email"
                        {...register("email", { required: true })} />
                </div>

                <div>
                    <label className="text-[1.2vw] hidden md:block" htmlFor="">Password</label>
                    <div className="relative">
                        <input
                            type={(!passwordEye) ? 'password' : 'text'}
                            placeholder="Password"
                            maxLength="5"
                            minLength="5"
                            className={`${inputStyle}`}
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

                <div>
                    <label className="text-[1.2vw] hidden md:block mb-2" htmlFor="">Account Type</label>
                    <select className="select select-accent w-full max-w-xs"
                        {...register("accountType", { required: true })}>
                        <option defaultValue={"user"} value={"user"}>User</option>
                        <option value={"agent"}>Agent</option>
                        <option value={"admin"}>Admin</option>
                    </select>
                </div>

                <div className="space-y-[1vw]">
                    <p className="md:text-[1vw] text-xs">Already have an account?<Link className="hover:text-red-400 underline" to={'/login'}>Login Now</Link></p>
                </div>
                <input className="bg-emerald-700 hover:bg-emerald-500 text-sm py-1 px-5 rounded-md lg:rounded-full md:w-full md:h-[3.5vw] border text-white md:text-[1.2vw]" type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;