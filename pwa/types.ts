import { IdentityFields } from "./enums";

export type Response<T> = {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:member": Array<T>;
  "hydra:totalItems": number;
};

export type ResponseSingle<T> = T & {
  "@context": string;
  "@id": string;
  "@type": string;
};

export type SourceMedia = {
  id: number;
};

export type TypeSourceName =
  | "website"
  | "book"
  | "article"
  | "interview"
  | "letter"
  | "scholarDocument"
  | "audio";

export type TypeSource = {
  id: number;
  name: TypeSourceName;
};

export type Source = {
  id: number;
  name: string;
  typeSource: TypeSource;
  url: string;
  checkedAt: Date;
  sourceMedia: SourceMedia;
  isDigital: boolean;
  isVerified: boolean;
};

export type Category = {
  id: number;
  name: string;
};

export type PersonCategory = {
  id: number;
  category: Category;
  person?: Person;
  name: string;
};

export type TypeIdentityField = {
  id: number;
  name: keyof IdentityFields;
};

export type PersonIdentifyField = {
  id: number;
  value: string;
  typeIdentityField: TypeIdentityField;
  person?: Person;
  source: Source;
};

export type Company = {
  id: number;
  name: string;
  country?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  url?: string;
};

export type PersonJob = {
  id: number;
  job: string;
  startDate?: Date;
  endDate?: Date;
  company: Company;
  person?: Person;
  source: Source;
};

export type TypeRelative = {
  id: number;
  name: string;
};

export type PersonRelative = {
  id: number;
  name: string;
  isBiological: boolean;
  typeRelative: TypeRelative;
  person?: Person;
};

export type School = {
  id: number;
  name: string;
  country?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  url?: string;
};

export type PersonSchool = {
  id: number;
  degree: string;
  startDate?: Date;
  endDate?: Date;
  school: School;
  person?: Person;
  source: Source;
};

export type TypeSocialStatus = {
  id: number;
  name: string;
};

export type PersonSocialStatus = {
  id: number;
  name: string;
  typeSocialStatus: TypeSocialStatus;
  person?: Person;
};

export type Person = {
  id: number;
  name: "string";
  romanizedName?: string;
  personCategories: string[];
  personIdentityFields: string[];
  personJobs: string[];
  personRelatives: string[];
  personSchools: string[];
  personSocialStatuses: string[];
};
