export interface apiResponseDto<Value> {
    isSuccess: boolean,
    errors: errorDto[],
    value?: Value | undefined
}

interface errorDto {
    code: string,
    name: string
}