export interface AdmissionUploadDocuments {
  badge: {
    icon: string;
    text: string;
  };
  title: string;
  highlightedTitle: string;
  description: string;
  placeholder: string;
  buttonText: string;
  helpText: string;
  supportLinkText: string;
}

export interface TermsSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list' | 'highlight';
  listItems?: string[];
}

export interface AdmissionTermsAndConditions {
  heroImage: string;
  title: string;
  sections: TermsSection[];
  contactEmail: string;
  address: {
    lines: string[];
    note: string;
  };
}

export interface AdmissionPageData {
  uploadDocuments: AdmissionUploadDocuments;
  termsAndConditions: AdmissionTermsAndConditions;
}
