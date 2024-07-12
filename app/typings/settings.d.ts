export interface ISettings {
  acceptedResumeTypes: string[];
  companyName: string;
  companyLogoPath: string;
  companyUrl: string;
  careersUrl: string;
  defaultLocale: string;
  supportedLocales: string[];
  minUploadSize: number;
  maxRelatedJobs: number;
  maxUploadSize: number;
  service: IServiceSettings;
  additionalJobCriteria: IAdditionalJobCriteria;
  integrations: IIntegrationSettings;
  darkTheme: boolean;
  eeoc: IEeoc;
  privacyConsent: IPrivacyConsent;
  recruitmentProcessesConsent: IRecruitmentProcessesConsent;
  marketingActivitiesConsent: IMarketingActivitiesConsent;
  sensitiveDataProcessingConsent: ISensitiveDataProcessingConsent;
  dataStorageConsent: IDataStorageConsent;
  languageDropdownOptions: ILanguageDropdownOptions;
}

interface IApplyServiceSettings {
  baseUrl: string;
  candidateInfo: string;
  candidateAttachments: string;
  apiKey: string;
}
interface IServiceSettings {
  batchSize: number;
  corpToken: string;
  port: number | null;
  swimlane: number | string;
  fields: string[];
  jobInfoChips: [string | JobChipField] | any;
  showCategory: boolean;
  keywordSearchFields: string[];
  apply: IApplyServiceSettings;
}

interface IIntegrationSettings {
  googleAnalytics: IGoogleAnalyticsSettings;
  googleSiteVerification: IGoogleSearchSettings;
}

interface IGoogleAnalyticsSettings {
  trackingId: string;
}
interface IGoogleSearchSettings {
  verificationCode: string;
}

interface IEeoc {
  genderRaceEthnicity: boolean;
  veteran: boolean;
  disability: boolean;
}

interface IPrivacyConsent {
  consentCheckbox: boolean;
  sidebarLink: boolean;
  privacyPolicyUrl: string;
}

interface IRecruitmentProcessesConsent {
  consentCheckbox: boolean;
  defaultValue: boolean;
  required: boolean;
}

interface IMarketingActivitiesConsent {
  consentCheckbox: boolean;
  defaultValue: boolean;
  required: boolean;
}

interface ISensitiveDataProcessingConsent {
  consentCheckbox: boolean;
  defaultValue: boolean;
  required: boolean;
}

interface IDataStorageConsent {
  consentCheckbox: boolean;
  defaultValue: boolean;
  required: boolean;
}

interface IAdditionalJobCriteria {
  values: string[];
  field: string;
  sort: string;
}
interface JobChipField {
  type: string;
  field: string;
}
interface ILanguageDropdownOptions {
  enabled: boolean;
  choices: IAdditionalLanguageOption[];
}
interface IAdditionalLanguageOption {
  name: string;
  localeCode: string;
}
