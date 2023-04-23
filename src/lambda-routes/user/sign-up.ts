import prismaClient from '@prisma/client'
import bcrypt from 'bcryptjs'

const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

const headers = {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
}

export async function createUser(c) {
    const { username, password, role } = c.request.requestBody
        try {
            const hashedPassword = bcrypt.hashSync(password, 10)
            await prisma.model_user.create({
                data: {
                    role: role,
                    username: username,
                    password: hashedPassword,
                },
            })
            const createdUser = {
                username,
                role,
            }
            return {
                statusCode: 201,
                body: JSON.stringify({ data: createdUser }),
                headers,
            }
        } catch (e) {
            console.log(e)
            return {
                statusCode: 500,
                body: JSON.stringify({ error: e.message }),
                headers,
            }
        }
}