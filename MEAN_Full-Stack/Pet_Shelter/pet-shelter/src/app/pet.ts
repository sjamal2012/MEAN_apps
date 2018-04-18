export class Pet {
  constructor(
    public name: string = '',
    public type: string = '',
    public description: string = '',
    public skills: Array<string> = [],
    public likes: number = 0
  ) {}
}
