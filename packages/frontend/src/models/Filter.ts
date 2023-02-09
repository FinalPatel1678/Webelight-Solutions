export default class FilterParams {
  public pageNumber!: number;
  public priceFilter!: number[];
  public category!: string;

  constructor() {
    this.pageNumber = 1;
    this.priceFilter = [0, 100];
    this.category = "";
  }
}
