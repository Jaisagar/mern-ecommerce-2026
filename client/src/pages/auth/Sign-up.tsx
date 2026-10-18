import {SignUp } from "@clerk/react";

export function SignUpPage(){
    return(
        <>
        <div className="flex min-h-[70vh] item-center">
            <SignUp/>
        </div>
        </>
    )
}