"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {

    const router = useRouter();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, email, password);
        try {
            axios.post("/api/register", { name, email, password })
                .then(res => {
                    if(res.data.success){
                        router.push("/");
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='p-10 max-w-5xl mx-auto'>
            <h1 className='my-5'>Register</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" className='w-full mb-2' />
                <input type="email" name="email" className='w-full mb-2' />
                <input type="password" name="password" className='w-full' />
                <input type="submit" value="Register" className='btn btn-outline border-red-600 text-red-500 mt-5' />
            </form>
            <div className="mt-5">
                {`Already have an account ?`} <Link href={"/"}><span className="text-red-600">Login</span></Link>
            </div>
        </div>
    );
};

export default RegisterPage;