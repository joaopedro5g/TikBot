import { config } from 'dotenv';

import { PassByPass } from './core/passbypass';

import { TextRobot } from './robots/text';
import { VoiceRobot } from './robots/voice';
import { VideoRobot } from './robots/video';
import { FinishClass } from './core/finish';
function main() {
  config();
  const { init } = new PassByPass();
  const inputFlag =
    process.argv.map((f, i) => f === '-i' ? process.argv[i+1] : null)
    .filter(f => f !== null);
  init(
    new TextRobot(inputFlag),
    new VoiceRobot(),
    new VideoRobot(),
    new FinishClass()
  );

}
main();