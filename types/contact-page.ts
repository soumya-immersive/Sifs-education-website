export interface ContactDepartment {
  id: string;
  icon: string;
  title: string;
  phones: string[];
  email: string;
}

export interface ContactLocation {
  id: string;
  name: string;
}

export interface ContactBanner {
  title: string;
  subtitle: string;
  bgImage: string;
}

export interface ContactFormField {
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  rows?: number;
}

export interface ContactFormSection {
  title: string;
  fields: ContactFormField[];
  buttonText: string;
}

export interface ContactInfoSection {
  title: string;
  officeTitle: string;
  officeAddress: {
    icon: string;
    lines: string[];
  };
  departments: ContactDepartment[];
}

export interface ContactInternationalAssociates {
  title: string;
  locations: ContactLocation[];
}

export interface ContactNationalPresence {
  title: string;
  cities: ContactLocation[];
}

export interface ContactPageData {
  banner: ContactBanner;
  formSection: ContactFormSection;
  infoSection: ContactInfoSection;
  internationalAssociates: ContactInternationalAssociates;
  nationalPresence: ContactNationalPresence;
}
