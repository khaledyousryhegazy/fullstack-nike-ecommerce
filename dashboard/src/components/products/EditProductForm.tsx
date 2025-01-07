import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PencilOff } from "lucide-react";

export default function EditProductForm() {
    return (
        <div className="mx-3">
            <Dialog>
                <DialogTrigger asChild>
                    <PencilOff size={ 20 } className="cursor-pointer hover:text-blue-600" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    <div className="grid gap-4  py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title">
                                Title
                            </Label>
                            <Input
                                id="title"
                                placeholder="Enter product title"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description">
                                Description
                            </Label>
                            <Input
                                id="description"
                                placeholder="Enter product description"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price">
                                Price
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="Enter product price"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category">
                                Category
                            </Label>
                            <Input
                                id="category"
                                placeholder="Enter product category"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="gender">
                                Gender
                            </Label>

                            <Select>
                                <SelectTrigger className="w-full col-span-3">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent id="gender">
                                    <SelectGroup>
                                        <SelectItem value="men's">Men's</SelectItem>
                                        <SelectItem value="women's">Women's</SelectItem>
                                        <SelectItem value="boys">Boys</SelectItem>
                                        <SelectItem value="girls">Girls</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="ageGroup">
                                Age Group
                            </Label>

                            <Select>
                                <SelectTrigger className="w-full col-span-3">
                                    <SelectValue placeholder="Select age group" />
                                </SelectTrigger>
                                <SelectContent id="ageGroup">
                                    <SelectGroup>
                                        <SelectItem value="adults">Adults</SelectItem>
                                        <SelectItem value="children">Children</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Edit Product</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}