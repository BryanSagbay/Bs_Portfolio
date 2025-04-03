export interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  isFeatured?: boolean;
  isComingSoon?: boolean;
}