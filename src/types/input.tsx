export type InputType = "text" | "number";

export type InputValue<T extends InputType> = T extends "text"
  ? string
  : string;
