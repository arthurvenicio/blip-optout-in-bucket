interface IResultDto {
  success: boolean;
  content: any;
  erros: string[] | null;
  consultAt: Date;
}

export class ResultDto implements IResultDto {
  success: boolean;
  content: any;
  consultAt: Date;
  erros: string[] | null;

  constructor(
    success: boolean,
    content: any,
    erros: string[] | null,
    date: Date = new Date()
  ) {
    this.success = success;
    this.content = content;
    this.erros = erros;
    this.consultAt = date;
  }
}
