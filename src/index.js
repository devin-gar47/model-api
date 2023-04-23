import prismaClient from '@prisma/client'
import { OpenAPIBackend } from 'openapi-backend'
import { userOperations } from './lambda-routes/user/operations'

const api = new OpenAPIBackend({ definition: './openapi.json', quick: true })

const { PrismaClient } = prismaClient
const prisma = new PrismaClient()


api.register({
    ...userOperations,
})

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
