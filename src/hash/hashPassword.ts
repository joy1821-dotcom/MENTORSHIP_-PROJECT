import bcrypt from "bcrypt";
import {Model} from "sequelize";

export async function hashPassword<T extends Model>(record: T & {password: string}){
    const saltRounds = 10
    record.password = await bcrypt.hash(record.password, saltRounds)
  
}


// import { Model, CreateOptions } from "sequelize";
// import bcrypt from "bcrypt";

// export async function hashPassword<T extends Model & { password?: string }>(
//   instance: T,
//   options: CreateOptions
// ): Promise<void> {
//   if (instance.password) {
//     instance.password = await bcrypt.hash(instance.password, 10);
//   }
// }
