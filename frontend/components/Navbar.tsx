import React from 'react'

const Navbar = () => {
    return (
        <div className="border-b mb-2 flex items-center justify-around h-[10vh]">
            <h1 className="font-bold text-2xl">Present</h1>
            <ul className='flex gap-x-2'>
                <li className='hover:cursor-pointer hover:underline hover:opacity-70'><a href='https://github.com/nawed2611/mlh-teachers-hack-2'>GitHub</a></li>
                <li className='hover:cursor-pointer hover:underline hover:opacity-70'><a href='https://github.com/nawed2611/mlh-teachers-hack-2'>Devpost</a></li>
            </ul>
        </div>
    )
}

export default Navbar