export class FilterParams {
  pageIndex = 1;
  pageSize = 10;
  tranCode?: number;
  field: string[] = [];
  //for filtering
  searchKey = '';
  property: string[] = [];
  operator: string[] = [];
  value: any[] = [];
  //for searching
  keyword?: string;
}
