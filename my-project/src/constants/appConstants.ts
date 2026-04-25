export type NavItem = {
  label: string;
  icon: string;
  active: boolean;
};

export type BudgetCategory = {
  icon: string;
  label: string;
  value: string;
  color: string;
};

export type TipCard = {
  icon: string;
  title: string;
  text: string;
  bg: string;
  titleColor: string;
  textColor: string;
};

export const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: 'Explore', icon: 'explore', active: false },
  { label: 'Plan', icon: 'edit_calendar', active: true },
  { label: 'Trips', icon: 'map', active: false },
  { label: 'Profile', icon: 'person', active: false },
];

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  { icon: 'flight', label: 'Flights', value: '$850', color: 'text-blue-600' },
  { icon: 'hotel', label: 'Stay', value: '$1,200', color: 'text-green-600' },
  { icon: 'restaurant', label: 'Daily', value: '$450', color: 'text-orange-600' },
];

export const TIP_CARDS: TipCard[] = [
  {
    icon: 'tips_and_updates',
    title: 'Insider Tip',
    text: 'Book your Shinkansen tickets 2 weeks in advance for better rates.',
    bg: 'bg-blue-50 border border-blue-200',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-700',
  },
  {
    icon: 'verified',
    title: 'Best Value',
    text: 'The JR Pass might not be worth it for this specific route. Use IC cards.',
    bg: 'bg-green-50 border border-green-200',
    titleColor: 'text-green-900',
    textColor: 'text-green-700',
  },
];
