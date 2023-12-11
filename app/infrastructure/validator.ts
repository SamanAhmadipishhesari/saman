export class Validator {
  private isRequired: boolean | undefined;
  private minLen: number | undefined;
  private maxLen: number | undefined;

  constructor(
    isRequired: boolean | undefined = undefined,
    minLen: number | undefined = undefined,
    maxLen: number | undefined = undefined
  ) {
    this.isRequired = isRequired;
    this.minLen = minLen;
    this.maxLen = maxLen;
  }

  Validate(value: any): boolean {
    let result: boolean = true;

    if (this.isRequired != undefined)
      if (value == "" || value == null || value == undefined) result = false;

    if (this.minLen != undefined)
      if (value.length < this.minLen) result = false;

      if (this.maxLen != undefined)
      if (value.length > this.maxLen) result = false;

    return result;
  }
}
