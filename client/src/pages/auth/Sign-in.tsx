import { SignIn } from "@clerk/react";

export function SignInPage(){
    return(
        <>
        <div className="flex min-h-[70vh] item-center">
            <SignIn/>
        </div>
        </>
    )
}