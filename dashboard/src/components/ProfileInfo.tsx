import { authUserInfo } from "@/rtk/features/protect-routes/authSelectors";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainTitle from "./MainTitle";
import moment from "moment";

export default function ProfileInfo() {
    const user = useSelector( authUserInfo )
    return (
        <div className="flex justify-center items-center h-full">
            <div className="mx-3 max-w-[450px]">
                <div className="my-10 text-center">
                    <MainTitle text="User  Information" />
                </div>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username">User Name</Label>
                        <div className="col-span-3">
                            <Input
                                id="username"
                                name="username"
                                value={ user?.username }
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email">Email</Label>
                        <div className="col-span-3">
                            <Input
                                id="email"
                                name="email"
                                value={ user?.email }
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role">Role</Label>
                        <div className="col-span-3">
                            <Input
                                id="role"
                                name="role"
                                type="text"
                                value={ user?.role }
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="createdAt">Joined In</Label>
                        <div className="col-span-3">
                            <Input
                                id="createdAt"
                                name="createdAt"
                                type="text"
                                value={ moment( user?.createdAt ).format( 'DD/MM/YYYY' ) }
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}