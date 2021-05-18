export interface OptionMenu {
  urlTo: string;
  icon: string;
  label: string;
}

export interface SectionMenu {
  section: string;
  options: OptionMenu[];
}

export interface Breadcrumb {
  label: string;
  toUrl: string;
}

export interface Alert {
  type: string;
  message: string;
}
