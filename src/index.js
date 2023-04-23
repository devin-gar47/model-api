import prismaClient from '@prisma/client'
import bcrypt from 'bcryptjs'
import { OpenAPIBackend } from 'openapi-backend'

const api = new OpenAPIBackend({ definition: './openapi.json', quick: true })

const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

const headers = {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
}

api.register({
    createUser: async (c, event, context) => {
        const { username, password, role } = c.request.requestBody
        try {
            const hashedPassword = bcrypt.hashSync(password, 10)
            prisma.model_user.create
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
    },
    getTestData: async (c, event, context) => ({
        statusCode: 200,
        body: JSON.stringify({ message: 'some test data' }),
        headers,
    }),
})

// init api
api.init()

export async function handler(event, context) {
    return api.handleRequest(
        {
            method: event.httpMethod,
            path: event.path,
            query: event.queryStringParameters,
            body: event.body,
            headers: event.headers,
        },
        event,
        context
    )
}
