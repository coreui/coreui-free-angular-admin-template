export interface AddUserBody {
    name: string;
    email: string;
    department: {
      name: string;
      id: number;
    };
    rol: string;
  }

  export interface EditUserBody {
    name: string;
    email: string;  
    department: number;
    role: string;
  }

  export interface CreateUserBody {
    name: string;
    email: string;
    password: string;
    birthdate: string;
    departmentId: number;
    role: string;
  } 