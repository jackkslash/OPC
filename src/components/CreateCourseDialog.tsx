'use client'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useActionState, useEffect, useRef, useState } from "react";
import { createCourse } from "../app/courses/action";
import { useToast } from "@/hooks/use-toast";

const initialState = {
    type: "",
    message: "",
};


export const CreateCourseDialog = () => {
    const [state, formAction] = useActionState(createCourse, initialState)
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const prevStateRef = useRef(state)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false)

    useEffect(() => {
        if (state && state.type && (
            prevStateRef.current?.type !== state.type ||
            prevStateRef.current?.message !== state.message
        )) {
            toast({
                title: state.type,
                description: state.message,
                variant: state.type === 'error' ? 'destructive' : 'default',
                duration: 5000,
            })

            if (state.type === 'success') {
                setOpen(false)
                // Reset form values after successful submission
                setTitle('')
                setDescription('')
                setIsPublic(false)
            }
        }
        prevStateRef.current = state
    }, [state, toast])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                    Create Course
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create a New Course</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter course title"
                            className="border rounded-md p-2"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter course description"
                            rows={3}
                            value={description}
                            onChange={(e => setDescription(e.target.value))}
                            className="border rounded-md p-2"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="public"
                            className="h-4 w-4"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                        />
                        <label htmlFor="public" className="font-medium">
                            Make course public
                        </label>
                    </div>

                    <DialogFooter className="sm:justify-start">
                        <button
                            type="submit"
                            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Create Course
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}