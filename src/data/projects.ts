export interface Project {
  id: string;
  icon: string;
  title: string;
  type: string;
  summary: string;
  problem: string;
  built: string;
  stack: string[];
  status: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "last-bookmark-bender",
    icon: "🧩",
    title: "The Last Bookmark Bender",
    type: "Chrome Extension",
    summary:
      "A small productivity experiment for people who keep saving bookmarks for later.",
    problem:
      "Bookmarks pile up quickly and become a graveyard of links nobody revisits.",
    built:
      "A Chrome extension that turns bookmark hoarding into something more intentional.",
    stack: ["JavaScript", "Chrome Extension APIs", "Local Storage"],
    status: "Published",
  },
  {
    id: "mock-data-generator",
    icon: "🧪",
    title: "Mock Data Generator",
    type: "Developer Tool",
    summary:
      "A utility for generating mock text data such as names, phones, IBANs and addresses.",
    problem:
      "Manual test-data creation is repetitive and slows down QA and development flows.",
    built:
      "A browser extension and web-oriented utility for quickly producing test data.",
    stack: ["JavaScript", "Browser APIs", "Test Data"],
    status: "Active",
  },
  {
    id: "docker-helper",
    icon: "🐳",
    title: "Docker Helper",
    type: "DevOps Tool",
    summary:
      "A small utility project created while working with Docker and DevOps tooling.",
    problem:
      "Common container-related tasks can become repetitive when learning and debugging.",
    built:
      "A helper utility intended to simplify recurring Docker operations.",
    stack: ["Python", "Docker", "CLI"],
    status: "Archive / Case Study",
  },
];

import { localizeHref, type Locale } from "../i18n";

export function projectHref(id: string, locale: Locale): string {
  return `${localizeHref(locale, "/projects")}#${id}`;
}

export function projectDialogId(id: string): string {
  return `project-${id}`;
}
