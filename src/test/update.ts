import { Robots } from '../core/Robots';

export class UpdateRobot extends Robots<string, any> {
  param: string;
  async generate(param: string): Promise<string> {
    this.param = param;
    console.log('UPDATED',param);
    return param;
  }  
}