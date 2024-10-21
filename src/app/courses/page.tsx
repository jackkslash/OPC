import CourseCard from '@/components/CourseCard'
import { db } from '@/db'
import React from 'react'


const page = async () => {
    const data = await db.query.courses.findMany()
    console.log(data)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-4">
            {data.map((course) => {
                return (
                    <CourseCard course={course} />
                )
            })}
        </div>
    )
}

export default page