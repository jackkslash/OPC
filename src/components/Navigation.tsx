import Link from 'next/link'
import React from 'react'

const Navigation = () => {
    return (
        <div className="w-full bg-stone-100 py-6 px-10 flex flex-row justify-between items-center">
            <div className="flex flex-row gap-10 items-center">
                <Link href={"/"}>
                    <h1 className="text-2xl">OpenCourse</h1>
                </Link>
                <div className="flex flex-row gap-4">
                    <Link href={"/courses"}>Courses</Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation