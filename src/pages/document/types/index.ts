/** @format */

export enum IDocStatus {
  "DRAFT",
  "INACTIVE",
  "ACTIVE",
}
export interface IDocument {
  id: number;
  document_name: string;
  status: IDocStatus;
  field_count: number;
  created_at: string;
}
export interface IField {
  field_name: string;
  field_type: "input" | "select" | "number" | "textarea";
  is_mandatory: boolean;
  select_values?: ISelectValue[]; 
  current_value?: string | number;
}

interface ISelectValue {
  value: string;
  label?: string; 
}
