import { Project } from "../types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "NeuroLink AI",
    creator: "Dr. Aris Thorne",
    credibilityScore: 98,
    description: "Next-gen neural interface for seamless AI-human collaboration. Raising seed round for clinical trials.",
    type: "startup",
    equity: 10,
    raised: 450000,
    goal: 1000000,
    imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/47c34b1c-4f1b-4934-8387-c67ed9de7dcc/startup-bg-b5f109de-1777545109367.webp",
    moderationStatus: "verified",
    price: 0.5
  },
  {
    id: "2",
    title: "Ethereal Echoes",
    creator: "Luna V",
    credibilityScore: 92,
    description: "Generative ambient soundscape NFT collection. AI-mastered audio files included.",
    type: "music",
    imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/47c34b1c-4f1b-4934-8387-c67ed9de7dcc/music-nft-a46695f2-1777545108613.webp",
    moderationStatus: "verified",
    price: 0.15
  },
  {
    id: "3",
    title: "Quantum Flow #4",
    creator: "Koda Wright",
    credibilityScore: 85,
    description: "Looping digital masterpiece exploring the concept of time and quantum flux.",
    type: "art",
    imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/47c34b1c-4f1b-4934-8387-c67ed9de7dcc/fine-art-3b90637d-1777545108727.webp",
    moderationStatus: "verified",
    price: 2.1
  }
];