import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/User";
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
    const { userId } = getAuth(req)
    if (!userId) {
        return next(new AppError(401, 'user is not logged in Unatuth users!'))
    }
    next();
}
export async function getDbUserFromReq(req: Request) {
    const { userId } = getAuth(req);
      if (!userId) {
          throw  new AppError(401, 'user is not logged in Unatuth users!');
    }
    const dbUser= await User.findOne({clerkUserId:userId });
      if (!dbUser) {
          throw  new AppError(404, 'user is not Found DB');
    }
    return dbUser;
}

// Admin gate
//User logged in User + Admin accsess

export const requireAdmin=asyncHandler(
    async(req:Request, _res:Response, next:NextFunction)=>{
        const extractCurrentDbUser=await getDbUserFromReq(req)
        if(extractCurrentDbUser.role !== 'admin'){
            throw new AppError(403,'Admin access only ')
        }
        next();
    },
);