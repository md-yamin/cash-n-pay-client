import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";


const Login = () => {

    const inputStyle = "border w-full h-[3vw]"

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    const [passwordEye, setPasswordEye] = useState(false)
    const showPassword = () => {
        setPasswordEye(!passwordEye)
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onTouched'
    });

    const onSubmit = data => {
        const { email } = data;
        const { password } = data;

        signIn(email, password+0)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Success',
                    text: 'You have successfully logged in',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                })
                navigate(from, { replace: true })
                reset()
            }
            )
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

    return (
        <div className="flex w-full justify-between items-center mt-[10vh]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-[3vw] mx-auto" action="">
                <div>
                    <h2 className="text-[3vw]">Welcome Back</h2>
                    <p className="text-[1.2vw]">Enter the information you used while registering an account.</p>
                </div>
                <div>
                    <label className="text-[1.2vw]" htmlFor="">Email</label>
                    <br />
                    <input
                        placeholder="Email or Number"
                        className={`${inputStyle}`}
                        type="text"
                        {...register("email", { required: true })} />
                </div>
                <div className="relative">
                    <label className="text-[1.2vw]" htmlFor="">Password</label>
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
                    <div className="absolute right-3 top-[5px] md:top-8">
                        {
                            (passwordEye === false) ? <IoEyeOff className="md:text-[2vw] text-black" onClick={showPassword} /> : <IoEye className="md:text-[2vw] text-black" onClick={showPassword} />
                        }
                    </div>
                </div>


                <div className="space-y-[1vw]">
                    <p className="text-[1vw]">Don&apos;t have an account? <Link to={'/register'} className="hover:text-red-400 underline" >Register Now</Link></p>
                </div>
                <input className="bg-emerald-700 text-sm py-1 px-5 rounded-md lg:rounded-full md:w-full md:h-[3.5vw] border text-white md:text-[1.2vw]" type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;