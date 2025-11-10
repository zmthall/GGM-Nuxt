interface FooterLink {
  id: string;
  name: string;
  href: string;
  external?: boolean;
  icon?: string;
}

interface FooterData {
  navLinks: FooterLink[];
  policyLinks: FooterLink[];
}

export interface FooterJson {
  footer: FooterData;
}