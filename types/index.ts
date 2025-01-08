export interface BaseResponseListDto<T> {
  result: T[];
  pagination: {
    current: number;
    total_page: number;
    total_data: number;
  };
}
