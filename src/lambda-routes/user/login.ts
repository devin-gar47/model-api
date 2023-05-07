import prismaClient from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateAccessToken } from '../../utils/jwt-utils.js'
import { User } from '../../types/User.js'

const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

const headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Headers" : "Content-Type",
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "OPTIONS,POST"
}

export async function loginUser(c) {
    const { username, password }: User = c.request.requestBody

    const user: User = await prisma.model_user.findUnique({
        where: {
            username: username,
        },
    })

    if (!user)
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Cannot find user!' }),
            headers,
        }

    try {
        const compare = await bcrypt.compare(password, user.password)
        if (compare) {
            const accessToken = generateAccessToken(user)
            return {
                statusCode: 200,
                body: JSON.stringify({ accessToken }),
                headers,
            }
        } else {
            return {
                statusCode: 403,
                body: JSON.stringify({ message: 'Invalid password.' }),
                headers,
            }
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: e.message }),
            headers,
        }
    }
}
