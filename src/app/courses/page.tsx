import CourseCard from '@/components/CourseCard'
import { db } from '@/db'
import React from 'react'
import CreateCourseDialog from '../../components/CreateCourseDialog'


const page = async () => {
    const data = await db.query.courses.findMany()
    console.log(data)
    return (
        <div className="container mx-auto">
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-2xl font-bold pb-4'>Courses</h1>
                <CreateCourseDialog />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-4">
                {data.map((course) => {
                    return (
                        <CourseCard key={course.id} course={course} />
                    )
                })}
            </div>
        </div >
    )
}

export default page