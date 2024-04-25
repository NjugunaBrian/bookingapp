'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BedDoubleIcon } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const FormSchema = z.object({
    location: z.string().min(2).max(50),
    dates: z.object({
        from: z.date(),
        to: z.date(),
    }),
    adults: z.string().min(1, { message: "Please select at least 1 adult", }).max(12, { message: "Max 12 adult occupancy" }),
    children: z.string().min(0).max(12, { message: "Max 12 children occupancy", }),
    rooms: z.string().min(1, { message: "Please select at least one room", }),
});



function Searchform() {

    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            location: "",
            dates: {
                from: undefined,
                to: undefined,
            },
            adults: "1",
            children: "0",
            rooms: "1",
        },
    });


    function onSubmit(values: z.infer<typeof FormSchema>){

    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row items-center justify-center lg:max-w-6xl lg:mx-auto space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded-lg">
                <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                    <FormField 
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex text-white">
                                Location
                                <BedDoubleIcon className="h-4 w-4 text-white ml-2" />
                            </FormLabel>

                            <FormMessage />

                            <FormControl>
                                <input  placeholder="London, UK..." {...field} />
                            </FormControl>

                        </FormItem>

                    )}
                    />
                </div>
            </form>

        </Form>
    )
}

export default Searchform


