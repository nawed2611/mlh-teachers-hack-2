import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [formStep, setFormStep] = useState(1)
    const [formValues, setFormValues] = useState({ name: '', email: '', phone: '' })
    const [otp, setOtp] = useState('');
    const [otpShow, setOtpShow] = useState(false);
    const [status, setStatus] = useState(false)
    const [role, setRole] = useState('student')

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        setRole(e.currentTarget.value)
        setFormStep(formStep + 1)
    }
    const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFormStep(formStep - 1)
    }

    const getCode = async () => {

        await axios.get("http://localhost:8000/verify/getcode", {
            params: {
                phonenumber: formValues.phone,
                channel: 'sms'
            }
        })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    const verifyCode = async () => {
        await axios.get("http://localhost:8000/verify/verifycode", {
            params: {
                phonenumber: formValues.phone,
                code: otp
            }
        })
            .then(data => {

                console.log(data)
                if (data.data.status === 'approved') {
                    setStatus(true)
                }
            })
            .catch(err => console.log(err));
    }


    const Step1 = () => {
        return (
            <div className="flex flex-col items-center border-2 rounded m-2 p-4 w-[50vw] justify-around">
                <h1 className="text-3xl font-semibold my-2 ">Are you a Student or a Teacher?</h1>
                <div className='flex flex-col justify-center w-full'>
                    <button value="student" onClick={handleNext} className='border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-2 my-1'>Continue as a Student</button>
                    <button value="teacher" onClick={handleNext} className='border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-2 my-1'>Continue as a Teacher</button>
                </div>
            </div>
        )
    }

    const Step2 = ({ role }: any) => {
        return (
            <div className="flex flex-col border-2 rounded m-2 p-4 w-[50vw] justify-center">
                <h1 className="text-3xl font-semibold my-2 capitalize">Voila, {role}s 😁!</h1>
                <form className='flex flex-col items-start justify-center'>
                    <label className="my-2">
                        Name
                        <input className='focus:outline-none px-2 w-[60%] py-1 ml-2 rounded' type='text' placeholder='Enter your Name' />
                    </label>
                    <label className="my-2">
                        Email
                        <input className='focus:outline-none px-2 w-[60%] py-1 ml-2 rounded' type='email' placeholder='Enter your Email' />
                    </label>
                    <label className='flex flex-col'>
                        Enter your Phone Number in E. 164 format -
                        <input type="text" value={formValues.phone} onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })} className="rounded-md bg-[#D9D9D9] focus:outline-none p-2 m-2" required placeholder="eg: 91-725-029-1234" />
                    </label>
                    {otpShow &&
                        <label className='flex flex-col'>
                            Enter OTP -
                            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="rounded-md bg-[#D9D9D9] focus:outline-none p-2 m-2" placeholder="eg: 322454" />
                        </label>

                    }
                    <button type="submit" className="rounded-full w-32 p-1 mx-auto my-2" onClick={(e) => {
                        e.preventDefault()
                        console.log(formValues)

                        if (otpShow) {
                            verifyCode();
                        } else {
                            getCode();
                            setOtpShow(true);
                        }
                    }
                    }>Verify</button>

                    {
                        otpShow && <p className="text-xs m-2">An OTP has been sent on {formValues.phone}</p>
                    }
                    <p className="text-xs m-2">By tapping Verify an SMS may be sent. Message & data rates may apply.</p>
                </form>
                <button className='border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-1 my-1' onClick={handlePrev}>Go Back!</button>
            </div>
        )
    }

    return (
        <div className='h-[88vh] ml-6'>
            <div className="text-[#33272a] flex flex-col items-center justify-center w-full">
                <h1 className="text-3xl font-semibold">Welcome to QR Code-based Attendance System</h1>
                <h2 className="my-2">Say goodbye to those bulky registers!</h2>
            </div>
            <div className='flex mt-12 justify-center h-[60vh]'>
                {formStep === 1 && <Step1 />}
                {formStep === 2 && <div className="flex flex-col border-2 rounded m-2 p-4 w-[50vw] justify-center">
                    <h1 className="text-3xl font-semibold my-2 capitalize">Voila, {role}s 😁!</h1>
                    <form className='flex flex-col items-start justify-center'>
                        <label className="my-2">
                            Name
                            <input value={formValues.name} onChange={(e) => setFormValues({...formValues, name: e.target.value})} className='focus:outline-none px-2 w-[60%] py-1 ml-2 rounded' type='text' placeholder='Enter your Name' />
                        </label>
                        <label className="my-2">
                            Email
                            <input value={formValues.email} onChange={(e) => setFormValues({...formValues, email: e.target.value})} className='focus:outline-none px-2 w-[60%] py-1 ml-2 rounded' type='email' placeholder='Enter your Email' />
                        </label>
                        <label className='flex flex-col'>
                            Enter your Phone Number in E. 164 format -
                            <input type="text" value={formValues.phone} onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })} className="rounded-md bg-[#D9D9D9] focus:outline-none p-2 m-2" required placeholder="eg: 91-725-029-1234" />
                        </label>
                        {otpShow &&
                            <label className='flex flex-col'>
                                Enter OTP -
                                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="rounded-md bg-[#D9D9D9] focus:outline-none p-2 m-2" placeholder="eg: 322454" />
                            </label>

                        }
                        <button type="submit" className="rounded-full w-32 p-1 mx-auto my-2" onClick={(e) => {
                            e.preventDefault()
                            console.log(formValues)

                            if (otpShow) {
                                verifyCode();
                            } else {
                                getCode();
                                setOtpShow(true);
                            }
                        }
                        }>Verify</button>

                        {
                            otpShow && <p className="text-xs m-2">An OTP has been sent on {formValues.phone}</p>
                        }
                        <p className="text-xs m-2">By tapping Verify an SMS may be sent. Message & data rates may apply.</p>
                    </form>
                    <button className='border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-1 my-1' onClick={handlePrev}>Go Back!</button>
                </div>}
               
            </div>
        </div>
    )
}

export default Home