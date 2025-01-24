export type CURRENT_USER = {
  id?: number;
  username?: string;
  email?: string;
  mobile?: string;
  isd?: string;
  firstName?: string;
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
