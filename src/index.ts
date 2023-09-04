import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb'
import { OpenAPIBackend } from 'openapi-backend'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const client = new DynamoDBClient({})

const docClient = DynamoDBDocumentClient.from(client)

export const signUp = async (c, req, res) => {
    const { username, password } = c.request.requestBody
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const command = new PutCommand({
        TableName: 'User',
        Item: {
            Username: username,
            Password: hashedPassword,
        },
    })

    try {
        const response = await docClient.send(command)
        return { statusCode: 200, body: JSON.stringify({ message: 'user created', response }) }
    } catch (e) {
        return { statusCode: 200, body: JSON.stringify({ error: e }) }
    }
}

type User = {
    username: string
    password: string
    role: string
    createdAt: string
}

export const login = async (c, req, res) => {
    const { username, password } = c.request.requestBody
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const command = new GetCommand({
        TableName: 'User',
        Key: {
            Username: username,
        },
    })

    try {
        const {
            Item: { Username },
        } = await docClient.send(command)
        const user = {
            username: Username,
        }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        return { statusCode: 200, body: JSON.stringify({ token: accessToken }) }
    } catch (e) {
        return { statusCode: 500, body: JSON.stringify({ error: e }) }
    }
}

const api = new OpenAPIBackend({
    definition: './openapi.json',
    handlers: {
        default: (c, req, res) => ({ statusCode: 200, body: JSON.stringify({ message: 'default' }) }),
        test: (c, req, res) => ({ statusCode: 200, body: JSON.stringify({ message: 'I just wanna rock' }) }),
        test2: (c, req, res) => ({ statusCode: 200, body: JSON.stringify({ message: 'I just wanna rock2' }) }),
        signUp,
        login,
        validationFail: (c, req, res) => ({ statusCode: 400, body: JSON.stringify({ error: c.validation.errors }) }),
        notFound: (c, req, res) => ({ statusCode: 400, body: JSON.stringify({ error: 'not found' }) }),
        unauthorizedHandler: async (c, req, res) => ({ statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) }),
    },
})

api.init()
api.registerSecurityHandler('bearerAuth', (c, req) => {
    if(c.operation.operationId === 'login') return true
    const authHeader = c.request.headers['authorization'] as string
    if (!authHeader) {
        throw new Error('Missing authorization header')
    }

    const token = authHeader.split(' ')[1]
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
})

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
