import { ReactNode } from "react";

export type MenuItemChildren = {
  label: string;
  route: string;
}[];

export type MenuItem = {
  icon?: ReactNode;
  label: string;
  route: string;
  children?: MenuItem[];
};

export type MenuGroups = {
  name: string;
  menuItems: MenuItem[];
}[];
