import bcrypt from "bcryptjs";
const hashSalt = 10

export const hashPassword = async(password: string) => {
    const salt = await bcrypt.genSalt(hashSalt);
    return bcrypt.hash(password, salt);
}


export const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}
