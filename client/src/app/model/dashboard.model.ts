export interface DriverOfWeek {
  driver_username: string;
  driver_id: number;
  points: number;
}

export interface ConstructorOfWeek {
  constructor_name: string;
  constructor_id: number;
  constructor_driver_1_id: number;
  constructor_driver_2_id: number;
  points: number;
}
