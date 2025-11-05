
export interface GeneralData {
  email: string;
  reasonForContact: string;
  childBirthDate: string;
  childBirthTime: string;
  birthCity: string;
  schoolClass: string;
  parentName: string;
  contactEmail: string;
  contactPhone: string;
  socialMedia: string;
}

export interface DevelopmentInfo {
  motherInfo: string;
  pregnancyInfo: string;
  childbirthInfo: string;
  earlyDevelopment: string;
  speechDevelopment: string;
  illnesses: string;
  specialists: string;
  familyHistory: string;
}

export interface EmotionalState {
  mood: string[];
  anxieties: string;
  selfEsteem: string;
}

export interface AttentionBehavior {
  attentionSpan: string;
  distractions: string;
  activityLevel: string;
}

export interface MemoryThinking {
  memoryType: string;
  forgetfulness: string;
  thinkingStyle: string;
}

export interface MotorActivity {
  coordination: string;
  fineMotorSkills: string;
  handedness: string;
}

export interface Communication {
  friends: string;
  newEnvironments: string;
  conflictResolution: string;
}

export interface AdditionalObservations {
  childsJoys: string;
  childsWorries: string;
  childsStrengths: string;
}

export interface Schooling {
  homeworkIndependence: string[];
  commonMistakes: string;
  favoriteSubjects: string;
}

export interface FinalBlock {
  interests: string[];
  otherInterest: string;
}

export interface FormData {
  generalData: GeneralData;
  developmentInfo: DevelopmentInfo;
  emotionalState: EmotionalState;
  attentionBehavior: AttentionBehavior;
  memoryThinking: MemoryThinking;
  motorActivity: MotorActivity;
  communication: Communication;
  additionalObservations: AdditionalObservations;
  schooling: Schooling;
  finalBlock: FinalBlock;
}

export type FormErrors = {
  [key: string]: string;
};
