
export type MenuItem = {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: MenuItem[];
};
