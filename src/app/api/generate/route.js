import {NextResponse} from 'next/server'
import {Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

if(!configuration.apiKey)
    throw new Error('OPENAI_API_KEY is not defined')
const openai = new OpenAIApi(configuration)

export async function POST(request){
    const body = await request.json()
        if(!body.prompt || body.prompt.length==0){
            return NextResponse.error(new Error("prompt is required"),{
                status:400,
            })
        }
/*     return NextResponse.json({message: " helllo word from api"})
 */    try {
        const response = await openai.createCompletion({
             prompt:`dame un chiste con el tema ${body.prompt}`,
             model:"text-davinci-003",
             temperature: 0.3,
             max_tokens: 60
         })
         return NextResponse.json(response.data.choices[0].text)   
        } catch (error) {
         return NextResponse.error(error, 
             {status:500
            })
     } 
}