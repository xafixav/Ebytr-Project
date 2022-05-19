import IUser from "../../interfaces/IUser";

export const guestCorrect: IUser = {
  id: 1,
  user: "guest",
  password: "secret_guest"
};

export const adminIncorrect: IUser = {
  id: 1,
  user: "xafixav",
  password: "xafixav_secreto"
};

export const adminToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjUxNjkyOTAxLCJleHAiOjE2NTE3NzkzMDF9.U00PBBopwY1v6zpYCk1U6ic4qTzdb-J8Ns44_s9avi4";

export const TokenInvalidSignature: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjUxNjkyOTAxLCJleHAiOjE2NTE3NzkzMDF9.U00PBBopwY1v6zpYCk1U4qTzdb-J8Ns44_s9avi4"

export const TokenInvalid: string = "eyJhbGciOiJIUzINiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjUxNjkyOTAxLCJleHAiOjE2NTE3NzkzMDF9.U00PBBopwY1v6zpYCk1U6ic4qTzdb-J8Ns44_s9avi4"

export const TokenMalformed: string = "asdas32323"