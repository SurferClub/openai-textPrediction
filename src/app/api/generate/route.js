import {NextResponse} from 'next/server'
import {Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

if(!configuration.apiKey)
    throw new Error('OPENAI_API_KEY is not defined')
const openai = new OpenAIApi(configuration)

export async function POST(request){
    
    try {
       const response = await openai.createCompletion({
            prompt:"dame un chiste negro",
            model:"text-davinci-003",
            temperature: 0.3,
            max_tokens: 60
        })
/*         console.log(response)
 */        return NextResponse.json({message: 'hello word from api'})
    } catch (error) {
        return NextResponse.error(error, 
            {status:500})
    }
    
}