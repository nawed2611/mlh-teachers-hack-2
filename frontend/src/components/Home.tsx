import React from 'react'

const Home = () => {
    const [formStep, setFormStep] = React.useState(1)
    const [role, setRole] = React.useState('student')

    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        setRole(e.currentTarget.value)
        setFormStep(formStep + 1)
    }
    const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
        setFormStep(formStep - 1)
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
                    <label className="my-2">
                        Phone Number in E. 164 format
                        <input className='focus:outline-none px-2 w-[60%] py-1 ml-2 rounded' type='text' placeholder='Enter your Phone Number' />
                    </label>

                <button className='border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-1 my-1' onClick={handlePrev}>Send OTP</button>
                </form>
                <button className='border-2 w-[60%] mx-auto border-black rounded hover:cursor-pointer hover:bg-[#ff8ba7] hover:text-[#33272a] p-1 my-1' onClick={handlePrev}>Go Back!</button>
            </div>
        )
    }

    const formStepSwitch = (step: any) => {
        if (step === 1)
            return <Step1 />
        else if (step === 2 && role === 'student')
            return <Step2 role={role} />
        else if (step === 2 && role === 'teacher')
            return <Step2 role={role} />
    }


    return (
        <div className='h-[88vh] ml-6'>
            <div className="text-[#33272a] flex flex-col items-center justify-center w-full">
                <h1 className="text-3xl font-semibold">Welcome to QR Code-based Attendance System</h1>
                <h2 className="my-2">Say goodbye to those bulky registers!</h2>
            </div>
            <div className='flex mt-12 justify-center h-[60vh]'>
                {formStepSwitch(formStep)}
            </div>
        </div>
    )
}

export default Home