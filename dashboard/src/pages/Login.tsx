import LoginForm from "@/components/LoginForm";

export default function Login() {
    return (
        <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center">
            <h1 className="font-semibold text-2xl">Login</h1>
            <h1 className="font-semibold text-2xl my-5">Welcome Back Boss  !</h1>
            <div className="">
                <LoginForm />
            </div>
        </div>
    );
}