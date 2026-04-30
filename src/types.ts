export type ViewType = "dashboard" | "moderator" | "launchpad" | "marketplace" | "wallet" | "studio" | "profile";

export interface Project {
  id: string;
  title: string;
  creator: string;
  credibilityScore: number;
  description: string;
  type: "startup" | "music" | "art";
  equity?: number;
  raised?: number;
  goal?: number;
  imageUrl: string;
  moderationStatus: "verified" | "pending" | "flagged";
  price?: number;
}

export interface WalletInfo {
  address: string;
  balance: number;
  assets: Project[];
}

export interface UserProfile {
  id: string;
  username: string;
  avatar_url?: string;
  wallet_address?: string;
  balance: number;
}

export interface AuditReport {
  id: string;
  projectName: string;
  score: number;
  status: "Safe" | "Caution" | "High Risk";
  timestamp: string;
}