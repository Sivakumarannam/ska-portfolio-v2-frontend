export interface ProjectImage {
  url: string;
  caption: string;
  technicalDetails: string;
  tags?: string[];
}

export interface MetricItem {
  label: string;
  value: string;
  trend?: string;
  badge?: string;
}

export interface ArchitectureData {
  description: string;
  flow: string[];
  metrics: MetricItem[];
}

export interface ChatflowNode {
  id: string;
  name: string;
  type: 'client' | 'gateway' | 'service' | 'daemon' | 'database' | 'ai' | 'infra';
  role: string;
  icon: string;
  color: string;
}

export interface ChatflowMessage {
  id: string;
  step: number;
  from: string;
  to: string;
  action: string;
  protocol: string;
  payload: Record<string, any> | string;
  status: string;
  latency: string;
  details: string;
  badgeType: 'success' | 'warning' | 'info' | 'critical';
}

export interface ProjectChatflowData {
  title: string;
  description: string;
  nodes: ChatflowNode[];
  messages: ChatflowMessage[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  role: string;
  company?: string;
  category: 'Enterprise Telecom' | 'Generative AI' | 'Cloud & DevOps' | 'Full-Stack';
  summary: string;
  highlights: string[];
  stack: string[];
  steps: string[];
  github?: string;
  demoKind?: 'incident' | 'rag' | 'weather' | 'gitops' | 'db';
  images: [ProjectImage, ProjectImage, ...ProjectImage[]];
  architecture: ArchitectureData;
  chatflow: ProjectChatflowData;
}

export interface ResumeProfile {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  color: string;
  filename: string;
  downloadUrl: string;
  summary: string;
  keySkills: string[];
  fitScore: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

