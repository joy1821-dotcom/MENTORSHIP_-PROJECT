import bcrypt from "bcrypt"

export async function checkPassword(plainPassword:string, hashedPassword:string):Promise<boolean>{
return await bcrypt.compare(plainPassword, hashedPassword)
}
