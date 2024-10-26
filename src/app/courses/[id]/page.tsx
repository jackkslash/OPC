import DialogForm from "@/components/DialogForm"
import { db } from "@/db"
import { courses } from "@/db/schema"
import { eq } from "drizzle-orm"

const page = async ({ params }: { params: { id: number } }) => {

    const { id } = await params
    const data = await db.query.courses.findFirst(
        {
            where: eq(courses.id, id),
            with: {
                units: {
                    with: {
                        lessons: true
                    }
                }

            }
        },

    )

    return (
        <div>page
            <p>{data?.id}</p>
            <p>{data?.title}</p>
            <p>{data?.description}</p>

            {data?.units.length ?
                data?.units.map((unit) => {
                    return (
                        <div key={unit.id}>
                            <p>{unit.id}</p>
                            <p>{unit.title}</p>
                            <p>{unit.description}</p>
                            <br />
                            {
                                unit.lessons.length ?
                                    unit.lessons.map((lesson) => {
                                        return (
                                            <div key={lesson.id}>
                                                <p>{lesson.id}</p>
                                                <p>{lesson.title}</p>
                                                <p>{lesson.description}</p>
                                                <br />
                                            </div>
                                        )
                                    }) :
                                    <p>No lessons</p>
                            }
                            <div className="flex gap-4">
                                <button
                                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })


                :
                <div>
                    <p>No units exist for this course</p>
                </div>
            }

        </div>
    )
}

export default page