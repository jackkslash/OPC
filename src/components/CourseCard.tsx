"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Course } from "@/db/schema";

import Link from "next/link";

const CourseCard = ({ course }: { course: Course }) => {
    return (
        <Link href={`/course/${course.id}`}>
            <Card
                className="h-[20rem] hover:bg-stone-50"
                onClick={() => {
                    console.log("Pressed card");
                }}
            >
                <CardHeader className="gap-4">
                    <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="mt-2">
                    <CardDescription>{course.description}</CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
};

export default CourseCard;
