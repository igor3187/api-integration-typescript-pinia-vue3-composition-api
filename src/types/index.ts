export interface APIResponse<T>{
    message: string,
    statusCode: number,
    success: boolean,
    data?: T
}

export type TImage = {
    _id: string,
    url: string,
    localPath: string,
}

export type TUser = {
    __v: number,
    _id: string,
    avatar: TImage,
    createdAt: string,
    email: string,
    isEmailVerified: boolean,
    // loginType: "EMAIL_PASSWORD",
    role: 'ADMIN' | 'USER',
    updatedAt: string,
    username: string,
}

export type TCategory = {
    __v: number,
    _id: string,
    name: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
}

type TPaginationContent = {
    hasNextPage: boolean,
    hasPrevPage: boolean,
    limit: number,
    page: number,
    totalPages: number
    serialNumberStartFrom: number,
    prevPage: null | number,
    nextPage: null | number,
}

export type TCategories = TPaginationContent & {
    totalCategories: number,
    categories: TCategory[],
}

export type TProduct = {
    __v: number,
    _id: string,
    category: string,
    createdAt: string,
    description: string,
    mainImage: TImage,
    name: string,
    owner: string,
    price: number,
    stock: number,
    subImages:TImage[],
    updatedAt: string,
}

export type TProducts = TPaginationContent & {
    totalProducts: number,
    products: TProduct[],
}

export type TError = {
    errors?: Record<string, string[]>;
    statusCode: number;
    message: string;
    success: boolean;
}