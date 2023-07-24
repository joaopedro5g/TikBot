import { Robots } from '../core/Robots';

export class CreateRobot extends Robots<string, any> {
  param: string;
  constructor(private arg: string) {
    super();
    this.param = arg;
  }
  async generate(param: string): Promise<any> {
    return { returning: true, param };
  }  
}