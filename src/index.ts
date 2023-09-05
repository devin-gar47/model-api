import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb'
import { OpenAPIBackend } from 'openapi-backend'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import playwright from 'playwright-aws-lambda'

const client = new DynamoDBClient({})

const docClient = DynamoDBDocumentClient.from(client)

const userExists = async (username: string) => {
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
        return Username ? true : false
    } catch (e) {
        console.log(e)
        return false
    }
}

const createTokens = (username: string) => {
    const user = { username }
    return {
        accessToken: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' }),
        refreshToken: jwt.sign(user, process.env.REFRESH_TOKEN_SECRET),
    }
}

const scrape = async () => {
    let browser = null

    try {
        browser = await playwright.launchChromium()
        const context = await browser.newContext()

        const page = await context.newPage()
        await page.goto('https://google.com')
        const title = await page.title()

        return { statusCode: 200, body: JSON.stringify({ data: title }) }
    } catch (e) {
        return { statusCode: 500, body: JSON.stringify({ error: e }) }
    } finally {
        if (browser) {
            await browser.close()
        }
    }
}

export const signUp = async (c, req, res) => {
    const { username, password } = c.request.requestBody
    const userExistsInDb = await userExists(username)

    if (userExistsInDb) return { statusCode: 409, body: JSON.stringify({ message: 'User already exists.' }) }

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
        await docClient.send(command)
        const { accessToken, refreshToken } = createTokens(username)
        return { statusCode: 200, body: JSON.stringify({ token: accessToken, refreshToken }) }
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
        const { accessToken, refreshToken } = createTokens(Username)
        return { statusCode: 200, body: JSON.stringify({ token: accessToken, refreshToken }) }
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
        scrape,
        validationFail: (c, req, res) => ({ statusCode: 400, body: JSON.stringify({ error: c.validation.errors }) }),
        notFound: (c, req, res) => ({ statusCode: 400, body: JSON.stringify({ error: 'not found' }) }),
        unauthorizedHandler: async (c, req, res) => ({
            statusCode: 401,
            body: JSON.stringify({ error: 'Unauthorized' }),
        }),
    },
})

api.init()
api.registerSecurityHandler('bearerAuth', (c, req) => {
    if (c.operation.operationId === 'login') return true
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
