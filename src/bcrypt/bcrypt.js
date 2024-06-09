import bcrypt from 'bcrypt'
export const encryptPassword = async (password) => {
    const salt = 8
    const encrypt = await bcrypt.hash(password, salt)
    return encrypt
}

export const decryptPassword = async (password, hashPassword) => {

    const decryt = await bcrypt.compare(password, hashPassword)
    return decryt
}