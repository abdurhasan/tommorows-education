export declare enum Role {
    Admin = "Admin",
    Teacher = "Teacher",
    Student = "Student"
}
export declare class PaginationInput {
    page: number;
    limit: number;
}
export declare class PaginationResponse {
    totalPage: number;
    totalData: number;
}
