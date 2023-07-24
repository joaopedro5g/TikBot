import { Robots } from "./Robots";

export class FinishClass extends Robots<null,null> {
  param: null;
  generate(param: null): Promise<null> {
    console.log("Process finished with success");
    return null;
  }
}