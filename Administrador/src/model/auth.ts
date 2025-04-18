export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface LoginResponse {
    message: string;
    token: string;
    user: User;
  }
  