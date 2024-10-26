'use server'

import { db } from "@/db"
import { courses, NewCourse } from "@/db/schema"
import { revalidatePath } from "next/cache"

export async function createCourse(prevState: {
    message: string;
},
    formData: FormData,) {
    try {

        // Extract and validate title
        const title = formData.get('title')
        if (!title || typeof title !== 'string' || title.length < 3) {
            return {
                type: 'error',
                message: 'Title must be at least 3 characters long',
                formData: formData
            }
        }

        // Extract and validate description
        const description = formData.get('description')
        if (!description || typeof description !== 'string') {
            return {
                type: 'error',
                message: 'Description must be at least 10 characters long',
            }
        }

        // Extract and validate public status
        const isPublic = formData.get('public') === 'on' ? true : false

        const course: NewCourse = {
            title: title,
            description: description,
            public: isPublic,
        }

        await db.insert(courses).values(course)
        revalidatePath("/");

        return {
            type: 'success',
            message: 'Course created successfully',
        }
    } catch (e) {
        return {
            type: 'error',
            message: 'An error occurred while creating the course',
        }
    }
}
