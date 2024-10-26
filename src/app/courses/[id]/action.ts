'use server'

import { db } from "@/db"
import { NewUnit, units } from "@/db/schema"
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache"

export async function createUnit(courseId: number, prevState: {
    message: string;
},
    formData: FormData,) {
    try {
        console.log(formData)
        console.log(courseId)

        const title = formData.get('title')
        if (!title || typeof title !== 'string' || title.length < 3) {
            return {
                type: 'error',
                message: 'Title must be at least 3 characters long',
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

        const cId = courseId
        if (cId === undefined) {
            return {
                type: 'error',
                message: 'Course id is required',
            }
        }

        // Extract and validate public status
        const isPublic = formData.get('public') === 'on' ? true : false



        const unit: NewUnit = {
            courseId: cId,
            title: title,
            description: description,
            public: isPublic,
        }

        await db.insert(units).values(unit)
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

export async function deleteUnit(courseId: number, unitId: number, prevState: {
    message: string;
},
    formData: FormData,) {
    try {
        console.log(formData)
        console.log(courseId)

        const cId = courseId
        if (cId === undefined) {
            return {
                type: 'error',
                message: 'Course id is required',
            }
        }

        const uId = unitId
        if (uId === undefined) {
            return {
                type: 'error',
                message: 'Unit id is required',
            }
        }

        await db.delete(units).where(
            and(
                eq(units.courseId, cId),
                eq(units.id, uId)
            )
        )
        revalidatePath("/");

        return {
            type: 'success',
            message: 'Unit deleted successfully',
        }
    } catch (e) {
        return {
            type: 'error',
            message: 'An error occurred while deleting the unit',
        }
    }
}

export async function editUnit(courseId: number, unitId: number, prevState: {
    message: string;
},
    formData: FormData,) {
    try {
        console.log(formData)
        console.log(courseId)

        const cId = courseId
        if (cId === undefined) {
            return {
                type: 'error',
                message: 'Course id is required',
            }
        }

        const uId = unitId
        if (uId === undefined) {
            return {
                type: 'error',
                message: 'Unit id is required',
            }
        }

        // Extract and validate title
        const title = formData.get('title')
        if (!title || typeof title !== 'string' || title.length < 3) {
            return {
                type: 'error',
                message: 'Title must be at least 3 characters long',
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

        const unit: NewUnit = {
            courseId: cId,
            title: title,
            description: description,
            public: false,
        }

        //db q
        revalidatePath("/");

        return {
            type: 'success',
            message: 'Unit updated successfully',
        }
    } catch (e) {
        return {
            type: 'error',
            message: 'An error occurred while updating the unit',
        }
    }

}