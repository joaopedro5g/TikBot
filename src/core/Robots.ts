export abstract class Robots<T, Y> {
  abstract param: T;
  abstract generate(param: T): Promise<Y>;
}