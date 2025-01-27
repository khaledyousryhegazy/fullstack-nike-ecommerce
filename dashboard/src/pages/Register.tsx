import RegisterForm from "@/components/RegisterForm";

export default function Register() {
    return (
        <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center">

            <h1 className="font-semibold text-2xl">Sign Up</h1>
            <h1 className="font-semibold text-2xl my-5">Create a new account now !</h1>
            <div className="">

                <RegisterForm />
            </div>
        </div>
    );
}