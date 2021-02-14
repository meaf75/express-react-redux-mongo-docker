export interface IResponseState {
    message: string,
    http_code: number,
}

export const UserCreate : IResponseState = {
    message: "User created",
    http_code: 201
}

export const UserUpdate : IResponseState = {
    message: "User updated",
    http_code: 200
}

export const UserErrorCreate : IResponseState = {
    message: "An error ocurred trying to create the user",
    http_code: 400
}

export const UserErrorUpdate : IResponseState = {
    message: "An error ocurred trying to update the user",
    http_code: 400
}

export const UserAlreadyExist : IResponseState = {
    message: "Providen user already exist",
    http_code: 400
}

export const UserNotExist : IResponseState = {
    message: "This user does not exist",
    http_code: 404
}

export const UserDeleteState : IResponseState = {
    message: "User deleted",
    http_code: 200
}

export const UserDeleteStateError : IResponseState = {
    message: "An error ocurred trying to delete this user",
    http_code: 400
}

export const UserErrorGet : IResponseState = {
    message: "An error ocurred trying to get the users",
    http_code: 500
}

export const FailedDependency : IResponseState = {
    message: "Failed Dependency, some request parameters are not valid",
    http_code: 424
}

export const PageNotFound : IResponseState = {
    message: "Page not found",
    http_code: 404
}
