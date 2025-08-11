import { email, z } from "zod";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from "react-hook-form";
import { authformSchema } from "@/lib/utils";
const formSchema = authformSchema('sign up');

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>, // refer to data type from z.schema(formSchema)
    label: string,
    placeHolder: string
}

export default function From_reuse({ control, name, label, placeHolder }: CustomInput) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type={name === 'password' ? 'password' : 'text'} placeholder={placeHolder} {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                </FormItem>
            )}
        />
    )
}