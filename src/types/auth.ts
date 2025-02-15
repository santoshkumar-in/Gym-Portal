export type CURRENT_USER = {
  id?: string;
  username?: string;
  email?: string;
  mobile?: string;
  isd?: string;
  password?: string;
  gender?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  businessId?: number;
  businessName?: string;
  logoUrl?: string | null;
  role?: string;
  menu?: CURRENT_MENU[];
  status?: string;
};

export type CURRENT_MENU = {
  menuItem: string;
  viewOnly: string;
};
