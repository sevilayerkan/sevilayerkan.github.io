export interface SkillDetail {
  id: string;
  name: string;
  category: string;
  howIUseIt: string;
  related: string[];
}

export const skillDetails: SkillDetail[] = [
  {
    id: "api-testing",
    name: "API Testing",
    category: "Quality engineering",
    howIUseIt:
      "Contract checks, auth paths, error shapes and the first hour of a new REST service.",
    related: ["Postman", "CI/CD", "Documentation"],
  },
  {
    id: "playwright",
    name: "Playwright",
    category: "Test automation",
    howIUseIt:
      "UI automation, end-to-end flows, fixtures and framework experiments.",
    related: ["TypeScript", "API testing", "CI/CD"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Engineering",
    howIUseIt:
      "Local environments, leftover DevOps habits and small helper utilities around containers.",
    related: ["Linux", "CI/CD", "Python"],
  },
  {
    id: "cicd",
    name: "CI/CD",
    category: "Quality / delivery",
    howIUseIt:
      "Keeping checks in the pipeline so quality is not a manual afterthought.",
    related: ["Git", "Playwright", "Jenkins"],
  },
  {
    id: "postman",
    name: "Postman",
    category: "API testing",
    howIUseIt:
      "Exploring endpoints, saving collections and checking the boring failure cases first.",
    related: ["API Testing", "Documentation"],
  },
  {
    id: "javascript-typescript",
    name: "JavaScript / TypeScript",
    category: "Engineering",
    howIUseIt:
      "Test code, browser tools, extensions and the glue around automation.",
    related: ["Playwright", "Git", "Browser APIs"],
  },
];

export function skillDialogId(id: string): string {
  return `skill-${id}`;
}

export function getSkillDetail(name: string): SkillDetail | undefined {
  return skillDetails.find((skill) => skill.name === name);
}
