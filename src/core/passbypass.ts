import { Robots } from "./Robots";

export class PassByPass {
  constructor() {}

  async init(...args: Robots<any, any>[]) {
    let result = await args[0].generate(args[0].param);
    for (var i = 1; i < args.length; i++) {
      result = await args[i].generate(result);
    }
  }
}