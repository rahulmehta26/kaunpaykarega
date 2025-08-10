import { SignIn } from "@clerk/clerk-react"

export const Signin = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[400px] bg-white p-6 rounded-xl shadow-lg">
                <SignIn path="/signin" routing="path" signInUrl="/signin" />
            </div>
        </section>
    )
}
