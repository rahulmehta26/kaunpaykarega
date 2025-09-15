import React from "react";
import type { AnyFieldApi } from "@/types";

interface FormInputProps {
    field: AnyFieldApi;
    label: string;
    type?: string;
    placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ field, label, type = "text", placeholder }) => {

    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="border outline-orange-100 placeholder:text-[0.875rem] placeholder:text-neutral-400 rounded px-2 py-1"
            />
            {field.state.meta.errors && (
                <span className="text-error-red text-xs font-medium">
                    {field.state.meta.errors?.[0]?.message}
                </span>
            )}
        </div>
    );
};

export default FormInput;
