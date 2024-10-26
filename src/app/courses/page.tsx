import React from 'react'
import { db } from '@/db'
import CourseCard from '@/components/CourseCard'
import { createCourse } from './action'
import DialogForm from '@/components/DialogForm'
import { FormInfo } from '@/types'


const page = async () => {
    const data = await db.query.courses.findMany()

    const formConfig: FormInfo = {
        title: "Create a New Course",
        triggerLabel: "Create Course",
        submitLabel: "Submit",
        formFields: [
            {
                id: "title",
                label: "Title",
                type: "text",
                placeholder: "Enter course name",
            },
            {
                id: "description",
                label: "Description",
                type: "textarea",
                placeholder: "Enter course description",
            },
            {
                id: "isPublished",
                label: "Public",
                type: "checkbox",
            },
        ],
    };

    return (
        <div className="container mx-auto">
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-2xl font-bold pb-4'>Courses</h1>
                <DialogForm action={createCourse} formInfo={formConfig} />
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