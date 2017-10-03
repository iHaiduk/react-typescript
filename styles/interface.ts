export interface IBlock {
  readonly "header": string;
}
export interface IComponents {
  readonly "icon": string;
  readonly "icon--white": string;
  readonly "icon--red": string;
  readonly "image": string;
  readonly "link": string;
  readonly "select": string;
}
export interface ISection {
  readonly "section": string;
}
/* tslint:disable:max-line-length */
export type IValueBlocks = "header" | "icon" | "image" | "link" | "select" | "section";
export type IValueElements = "";
export type IValueMods = "white" | "red";
/* tslint:enable:max-line-length */
