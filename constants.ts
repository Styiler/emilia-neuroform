import type { FormData } from './types';

export const initialFormData: FormData = {
  generalData: {
    email: '',
    reasonForContact: '',
    childBirthDate: '',
    childBirthTime: '',
    birthCity: '',
    schoolClass: '',
    parentName: '',
    contactEmail: '',
    contactPhone: '',
    socialMedia: '',
  },
  developmentInfo: {
    motherInfo: '',
    pregnancyInfo: '',
    childbirthInfo: '',
    earlyDevelopment: '',
    speechDevelopment: '',
    illnesses: '',
    specialists: '',
    familyHistory: '',
  },
  emotionalState: {
    mood: [],
    anxieties: '',
    selfEsteem: '',
  },
  attentionBehavior: {
    attentionSpan: '',
    distractions: '',
    activityLevel: '',
  },
  memoryThinking: {
    memoryType: '',
    forgetfulness: '',
    thinkingStyle: '',
  },
  motorActivity: {
    coordination: '',
    fineMotorSkills: '',
    handedness: '',
  },
  communication: {
    friends: '',
    newEnvironments: '',
    conflictResolution: '',
  },
  additionalObservations: {
    childsJoys: '',
    childsWorries: '',
    childsStrengths: '',
  },
  schooling: {
    homeworkIndependence: [],
    commonMistakes: '',
    favoriteSubjects: '',
  },
  finalBlock: {
    interests: [],
    otherInterest: '',
  },
};

export const sections = [
  {
    id: 1,
    key: 'generalData',
    titleKey: 'section1Title',
    questions: [
      { id: 'email', labelKey: 'q_email', type: 'email', required: true },
      { id: 'reasonForContact', labelKey: 'q_reasonForContact', type: 'textarea', required: true },
      { id: 'childBirthDate', labelKey: 'q_childBirthDate', type: 'date', required: true },
      { id: 'childBirthTime', labelKey: 'q_childBirthTime', type: 'time', required: true },
      { id: 'birthCity', labelKey: 'q_birthCity', type: 'text', required: true },
      { id: 'schoolClass', labelKey: 'q_schoolClass', type: 'text', required: true },
      { id: 'parentName', labelKey: 'q_parentName', type: 'text', required: true },
      { id: 'contactEmail', labelKey: 'q_contactEmail', type: 'email', required: true },
      { id: 'contactPhone', labelKey: 'q_contactPhone', type: 'tel', required: true },
      { id: 'socialMedia', labelKey: 'q_socialMedia', type: 'text', required: true },
    ],
  },
  {
    id: 2,
    key: 'developmentInfo',
    titleKey: 'section2Title',
    questions: [
        { id: 'motherInfo', labelKey: 'q_motherInfo', type: 'textarea', required: false },
        { id: 'pregnancyInfo', labelKey: 'q_pregnancyInfo', type: 'textarea', required: false },
        { id: 'childbirthInfo', labelKey: 'q_childbirthInfo', type: 'textarea', required: false },
        { id: 'earlyDevelopment', labelKey: 'q_earlyDevelopment', type: 'textarea', required: false },
        { id: 'speechDevelopment', labelKey: 'q_speechDevelopment', type: 'textarea', required: false },
        { id: 'illnesses', labelKey: 'q_illnesses', type: 'textarea', required: false },
        { id: 'specialists', labelKey: 'q_specialists', type: 'textarea', required: false },
        { id: 'familyHistory', labelKey: 'q_familyHistory', type: 'textarea', required: false },
    ],
  },
  {
    id: 3,
    key: 'emotionalState',
    titleKey: 'section3Title',
    questions: [
      { id: 'mood', labelKey: 'q_mood', type: 'checkbox', optionsKeys: ['o_mood_1', 'o_mood_2', 'o_mood_3', 'o_mood_4', 'o_mood_5'], required: false },
      { id: 'anxieties', labelKey: 'q_anxieties', type: 'textarea', required: false },
      { id: 'selfEsteem', labelKey: 'q_selfEsteem', type: 'radio', optionsKeys: ['o_selfEsteem_1', 'o_selfEsteem_2', 'o_selfEsteem_3'], required: false },
    ],
  },
  {
    id: 4,
    key: 'attentionBehavior',
    titleKey: 'section4Title',
    questions: [
      { id: 'attentionSpan', labelKey: 'q_attentionSpan', type: 'radio', optionsKeys: ['o_attentionSpan_1', 'o_attentionSpan_2', 'o_attentionSpan_3', 'o_attentionSpan_4'], required: false },
      { id: 'distractions', labelKey: 'q_distractions', type: 'radio', optionsKeys: ['o_distractions_1', 'o_distractions_2', 'o_distractions_3'], required: false },
      { id: 'activityLevel', labelKey: 'q_activityLevel', type: 'radio', optionsKeys: ['o_activityLevel_1', 'o_activityLevel_2', 'o_activityLevel_3'], required: false },
    ],
  },
  {
    id: 5,
    key: 'memoryThinking',
    titleKey: 'section5Title',
    questions: [
      { id: 'memoryType', labelKey: 'q_memoryType', type: 'radio', optionsKeys: ['o_memoryType_1', 'o_memoryType_2', 'o_memoryType_3'], required: false },
      { id: 'forgetfulness', labelKey: 'q_forgetfulness', type: 'radio', optionsKeys: ['o_forgetfulness_1', 'o_forgetfulness_2', 'o_forgetfulness_3'], required: false },
      { id: 'thinkingStyle', labelKey: 'q_thinkingStyle', type: 'textarea', required: false },
    ],
  },
  {
    id: 6,
    key: 'motorActivity',
    titleKey: 'section6Title',
    questions: [
      { id: 'coordination', labelKey: 'q_coordination', type: 'radio', optionsKeys: ['o_coordination_1', 'o_coordination_2', 'o_coordination_3'], required: false },
      { id: 'fineMotorSkills', labelKey: 'q_fineMotorSkills', type: 'radio', optionsKeys: ['o_fineMotorSkills_1', 'o_fineMotorSkills_2', 'o_fineMotorSkills_3'], required: false },
      { id: 'handedness', labelKey: 'q_handedness', type: 'radio', optionsKeys: ['o_handedness_1', 'o_handedness_2', 'o_handedness_3'], required: false },
    ],
  },
  {
    id: 7,
    key: 'communication',
    titleKey: 'section7Title',
    questions: [
      { id: 'friends', labelKey: 'q_friends', type: 'radio', optionsKeys: ['o_friends_1', 'o_friends_2', 'o_friends_3'], required: false },
      { id: 'newEnvironments', labelKey: 'q_newEnvironments', type: 'textarea', required: false },
      { id: 'conflictResolution', labelKey: 'q_conflictResolution', type: 'textarea', required: false },
    ],
  },
  {
    id: 8,
    key: 'additionalObservations',
    titleKey: 'section8Title',
    questions: [
      { id: 'childsJoys', labelKey: 'q_childsJoys', type: 'textarea', required: true },
      { id: 'childsWorries', labelKey: 'q_childsWorries', type: 'textarea', required: true },
      { id: 'childsStrengths', labelKey: 'q_childsStrengths', type: 'textarea', required: true },
    ],
  },
  {
    id: 9,
    key: 'schooling',
    titleKey: 'section9Title',
    questions: [
      { id: 'homeworkIndependence', labelKey: 'q_homeworkIndependence', type: 'checkbox', optionsKeys: ['o_homework_1', 'o_homework_2', 'o_homework_3', 'o_homework_4'], required: false },
      { id: 'commonMistakes', labelKey: 'q_commonMistakes', type: 'textarea', required: false },
      { id: 'favoriteSubjects', labelKey: 'q_favoriteSubjects', type: 'textarea', required: false },
    ],
  },
  {
    id: 10,
    key: 'finalBlock',
    titleKey: 'section10Title',
    questions: [
      { id: 'interests', labelKey: 'q_interests', type: 'checkbox', optionsKeys: ['o_interests_1', 'o_interests_2', 'o_interests_3', 'o_interests_4', 'o_interests_5'], required: false },
      { id: 'otherInterest', labelKey: 'q_otherInterest', type: 'text', required: false },
    ],
  },
];
