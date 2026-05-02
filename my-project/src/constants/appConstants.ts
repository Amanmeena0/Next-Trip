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
  { icon: 'flight', label: 'Flights', value: '$850', color: 'text-primary' },
  { icon: 'hotel', label: 'Stay', value: '$1,200', color: 'text-accent' },
  { icon: 'restaurant', label: 'Daily', value: '$450', color: 'text-warning' },
];

export const TIP_CARDS: TipCard[] = [
  {
    icon: 'tips_and_updates',
    title: '💡 Insider Tip',
    text: 'Book your Shinkansen tickets 2 weeks in advance for better rates.',
    bg: 'bg-primary/5 border border-primary/15 hover:border-primary/25',
    titleColor: 'text-primary',
    textColor: 'text-foreground/75',
  },
  {
    icon: 'verified',
    title: '✅ Best Value',
    text: 'The JR Pass might not be worth it for this specific route. Use IC cards.',
    bg: 'bg-accent/5 border border-accent/15 hover:border-accent/25',
    titleColor: 'text-accent',
    textColor: 'text-foreground/75',
  },
];
