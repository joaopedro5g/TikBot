import path from 'node:path';
import ffmpeg from 'fluent-ffmpeg';
import { Robots } from '../core/Robots';

export class VideoRobot extends Robots<string, string> {
  param: string;
  constructor() {
    super()
    console.log("Editando o Video com o Audio gerando pelo IBM Watson");
  }
  async generate(params: string): Promise<string> {
    console.log('Param',params);
    if (!params) return;
    const paths = {
      video: path.join(__dirname,'..','static', 'video.mp4'),
      audio: params,
      result: path.join(__dirname,'..','static', `edited_${Date.now()}.mp4`)
    }
    const videoMetadata: ffmpeg.FfprobeData = await new Promise((resolve,reject) => {
      ffmpeg.ffprobe(paths.video, (err,metadata) => {
        if (err) reject(err);
        resolve(metadata);
      });
    });
    const audioMetadata: ffmpeg.FfprobeData = await new Promise((resolve,reject) => {
      ffmpeg.ffprobe(paths.video, (err,metadata) => {
        if (err) reject(err);
        resolve(metadata);
      });
    });
    return new Promise((resolve,reject) => {
      ffmpeg()
        .input(paths.video)
        .input(paths.audio)
        // .inputOptions(['-stream_loop -1'])
        .outputOptions(['-map 0:v:0', '-map 1:a:0'])
        .on('start', () => console.log("Iniciando renderização"))
        .on('end', () => resolve(paths.result))
        .on('error', reject)
        .save(paths.result)
    })
  }
}