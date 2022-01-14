export class Page<TValue> {

  public constructor(_page: number, _value: TValue[], _isCompleted: boolean)
  {
    this.pageNumber = _page;
    this.value = _value;
    this.isCompleted = _isCompleted;
  }

  pageNumber: number;
  value: TValue[];
  isCompleted: boolean;
}
