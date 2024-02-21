"use client"

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    
  }, [])

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      })
      if(res?.error){
        console.log(res.error);
      }
      router.push("/user")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-10 max-w-5xl mx-auto'>
      <h1 className='my-5'>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="email" name="email" className='w-full mb-2' />
        <input type="password" name="password" className='w-full' />
        <input type="submit" value="Login" className='btn btn-outline border-red-600 text-red-500 mt-5' />
      </form>
      <div className="mt-5">
        {`Don't have an account ?`} <Link href={"/register"}><span className="text-red-600">Register</span></Link>
      </div>
    </div>
  );
};

export default HomePage;