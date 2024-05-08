'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BedDoubleIcon } from "lucide-react";
import { cn } from '@/lib/utils';


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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

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


    function onSubmit(values: z.infer<typeof FormSchema>) {
        console.log(values)

        const checkin_monthday = values.dates.from.getDate().toString()
        const checkin_month = (values.dates.from.getMonth() + 1).toString()
        const checkin_year = values.dates.from.getFullYear().toString()
        const checkout_monthday = values.dates.to.getDate().toString()
        const checkout_month = (values.dates.to.getMonth() + 1).toString()
        const checkout_year = values.dates.to.getFullYear().toString()

        const checkin = `${checkin_year}-${checkin_month}-${checkin_monthday}`;
        const checkout = `${checkout_year}-${checkout_month}-${checkin_monthday}`;

        const url = new URL("https://www.booking.com/searchresults.html");
        url.searchParams.set("ss", values.location);
        url.searchParams.set("group_adults", values.adults);
        url.searchParams.set("group_children", values.children);
        url.searchParams.set("no_rooms", values.rooms);
        url.searchParams.set("checkin", checkin);
        url.searchParams.set("checkout", checkout);

        router.push(`/search?url=${url.href}`)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row items-center justify-center lg:max-w-4xl lg:mx-auto space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded">
                <div className="grid w-full lg:max-w-xs items-center gap-1.5">
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
                                    <input placeholder="London, UK..." {...field} className="px-4 py-2 w-full bg-white hover:bg-gray-100 rounded lg:max-w-xs outline outline-1" />
                                </FormControl>

                            </FormItem>

                        )}
                    />
                </div>
                <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                    <FormField
                        control={form.control}
                        name="dates"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-white">
                                    Dates
                                </FormLabel>
                                <FormMessage />

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button id="dates" name="dates" variant={"outline"}
                                                className={cn("w-full justify-start text-left font-normal bg-white hover:bg-gray-100 rounded", !field.value.from && "text-muted-foreground")}
                                            >
                                                <CalendarIcon className="h-4 w-4 mr-3 opacity-50" />
                                                {field.value?.from ? (
                                                    field.value?.to ? (
                                                        <>
                                                            {format(field.value?.from, "LLL dd, y")} - {""}
                                                            {format(field.value?.to, "LLL dd, y")}
                                                        </>
                                                    ) : (
                                                        format(field.value?.from, "LLL dd, y")
                                                    )

                                                ) : (
                                                    <span>Select your dates</span>
                                                )}


                                            </Button>
                                        </FormControl>

                                    </PopoverTrigger>
                                    <PopoverContent className="bg-white">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            selected={field.value}
                                            defaultMonth={field.value.from}
                                            onSelect={field.onChange}
                                            numberOfMonths={2}
                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))

                                            }
                                        />
                                    </PopoverContent>
                                </Popover>

                            </FormItem>

                        )}
                    />

                </div>
                <div className="flex w-full space-x-3 items-center">
                    <div className="grid items-center flex-1">
                        <FormField
                        control={form.control}
                        name="adults"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-white">Adults</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input type="number" placeholder="Adults" {...field} className="bg-white hover:bg-gray-100 rounded" />
                                </FormControl>
                                
                            </FormItem>
                        )}
                        />

                    </div>
                    <div className="grid items-center flex-1">
                        <FormField
                        control={form.control}
                        name="children"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-white">Children</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input type="number" placeholder="Children" {...field} className="bg-white hover:bg-gray-100 rounded" />
                                </FormControl>
                                
                            </FormItem>
                        )}
                        />

                    </div>
                    <div className="grid items-center flex-1">
                        <FormField
                        control={form.control}
                        name="rooms"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-white">Rooms</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input type="number" placeholder="Rooms" {...field} className="bg-white hover:bg-gray-100 rounded" />
                                </FormControl>
                                
                            </FormItem>
                        )}
                        />

                    </div>

                    <div className="mt-auto">
                        <Button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white  text-base rounded">
                            Search
                        </Button>
                    </div>



                </div>

            </form>

        </Form>
    )
}

export default Searchform


