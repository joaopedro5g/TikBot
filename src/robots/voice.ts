import watson from '../../watson.json';
import { IamAuthenticator } from 'ibm-watson/auth';
import fs from 'node:fs';
import TTS from 'ibm-watson/text-to-speech/v1';
import { Robots } from '../core/Robots';
export class VoiceRobot extends Robots<string, string> {
  param: string;
  private tts: TTS;
  constructor() {
    super()
    this.tts = new TTS({
      authenticator: new IamAuthenticator({ apikey: process.env.WATSON_API_KEY }),
      url: process.env.WATSON_API_URL
    })
    console.log(`
      Gerando a voz sobre
      ${this.param}
    `);
  }

  async generate(param: string): Promise<string> {
    const path = './static/synthesize.mp3';
    this.param = param;
    if (!param) return;
    const { result } = await this.tts.synthesize({
      text: param,
      voice: 'pt-BR_IsabelaV3Voice',
      accept: 'audio/mp3',
    });
    const write = fs.createWriteStream(path);
    return new Promise((resolve, reject) => 
      result.pipe(write)
        .on('finish', () => resolve(path))
        .on('error', reject)
    );
  }
}