import { Configuration, OpenAIApi } from 'openai';
import { Robots } from '../core/Robots';
export class TextRobot extends Robots<string[], string> {
  private api: OpenAIApi;
  param: string[];
  constructor(private arg?: string[]) {
    super();
    const config = new Configuration({
      apiKey: process.env.OPENAI_TOKEN,
    })
    this.api = new OpenAIApi(config);
    this.param = arg;
    console.log(`
      Gerando o Texto sobre:

      ${arg.map((f) => f).join(`
      `)}
    `)
  }

  async generate(param: string[]): Promise<string> {
    const result = await this.api.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: param.map(f => ({ role: 'assistant', content: f }))
    })
    const list = result.data.choices[0].message.content.split('\n').filter(f => f != '');
    return list.toString();
  }
}