'use client';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useActionState, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormField, FormInfo } from "@/types";


export interface ActionState {
    type: string;
    message: string;
}

export interface CreateCourseDialogProps {
    action: (state: ActionState, formData: FormData) => Promise<ActionState>;
    formInfo: FormInfo;
}

const initialState: ActionState = {
    type: "",
    message: ""
};

export const CreateCourseDialog: React.FC<CreateCourseDialogProps> = ({ action, formInfo }) => {
    const [state, formAction] = useActionState(action, initialState);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state) {
            toast({
                title: state.type,
                description: state.message,
                variant: state.type === 'error' ? 'destructive' : 'default',
                duration: 5000,
            });

            if (state.type === 'success') {
                setOpen(false);
                formRef.current?.reset();
            }
        }
    }, [state]);

    const renderField = (field: FormField) => {
        switch (field.type) {
            case 'textarea':
                return (
                    <textarea
                        id={field.id}
                        name={field.id}
                        placeholder={field.placeholder}
                        rows={3}
                        className="border rounded-md p-2"
                    />
                );
            case 'checkbox':
                return (
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id={field.id}
                            name={field.id}
                            className="h-4 w-4"
                        />
                        <label htmlFor={field.id} className="font-medium">
                            {field.label}
                        </label>
                    </div>
                );
            default:
                return (
                    <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        placeholder={field.placeholder}
                        className="border rounded-md p-2"
                    />
                );
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">
                    {formInfo.triggerLabel}
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{formInfo.title}</DialogTitle>
                </DialogHeader>
                <form ref={formRef} action={formAction} className="flex flex-col gap-4">
                    {formInfo.formFields.map(field => (
                        field.type !== 'checkbox' && (
                            <div key={field.id} className="flex flex-col gap-2">
                                <label htmlFor={field.id} className="font-medium">
                                    {field.label}
                                </label>
                                {renderField(field)}
                            </div>
                        )
                    ))}

                    {formInfo.formFields
                        .filter(field => field.type === 'checkbox')
                        .map(field => (
                            <div key={field.id}>
                                {renderField(field)}
                            </div>
                        ))}

                    <DialogFooter className="sm:justify-start">
                        <button
                            type="submit"
                            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                        >
                            {formInfo.submitLabel}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCourseDialog;