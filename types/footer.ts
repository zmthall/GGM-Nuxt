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
  careerLinks: FooterLink[];
}

export interface FooterJson {
  footer: FooterData;
}