import { db } from "@/db"
import { courses, units } from "@/db/schema"
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
                        <div>
                            //delete
                            //add
                            <p>{unit.id}</p>
                            <p>{unit.title}</p>
                            <p>{unit.description}</p>
                            {
                                unit.lessons.length ?
                                    unit.lessons.map((lesson) => {
                                        return (
                                            <div>
                                                //delete
                                                //add
                                                <p>{lesson.id}</p>
                                                <p>{lesson.title}</p>
                                                <p>{lesson.description}</p>
                                            </div>
                                        )
                                    }) :
                                    <p>No lessons</p>
                            }
                        </div>
                    )
                }) :
                <p>No units</p>
            }


        </div>
    )
}

export default page