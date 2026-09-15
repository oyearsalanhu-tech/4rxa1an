export type ThemeMode = 'blue' | 'green' | 'pink';

export interface SocialPlatform {
  id: string;
  name: string;
  handle: string;
  url: string;
  category: 'video' | 'visual' | 'community' | 'audio' | 'contact';
  description: string;
  followersCount: string;
  badge?: string;
  themeColor: string;
  accentBg: string;
  textColor: string;
  isPrimary?: boolean;
  featuredMedia?: {
    title: string;
    views?: string;
    date?: string;
    imageUrl?: string;
    tag?: string;
  }[];
}

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  avatarUrl: string;
  bannerText: string;
  verified: boolean;
  statusBadge: string;
}
