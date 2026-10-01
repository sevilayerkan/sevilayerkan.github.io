export const siteConfig = {
  name: "Sevilay Erkan",
  title: "Sevilay Erkan",
  tagline: "QA Engineer who tests, automates and builds things.",
  defaultDescription:
    "QA Engineer who tests, automates and builds things.",
  siteUrl: "https://sevilayerkan.dev",
  email: "sevilayerkan2@gmail.com",
  github: "https://github.com/sevilayerkan",
  linkedin: "https://www.linkedin.com/in/sevilayerkan/",
  medium: "https://medium.com/@sevilayerkan",
  twitch: {
    url: "https://www.twitch.tv/notdepressedeveloper",
    handle: "notDepresseDeveloper",
  },
  kick: {
    url: "https://kick.com/notdepressedev",
    handle: "notDepresseDev",
  },
  // Add public/og-default.png, then set defaultOgImageReady to true.
  defaultOgImage: "/og-default.png",
  defaultOgImageReady: false,
} as const;

export type ProfessionalLinkKey = "email" | "github" | "linkedin" | "medium";
export type StreamingLinkKey = "twitch" | "kick";

export function emailHref(): string {
  return `mailto:${siteConfig.email}`;
}

export function isConfigured(value: string): boolean {
  return value.trim() !== "" && !value.includes("CHANGE_ME");
}

export function siteHostname(): string {
  try {
    return new URL(siteConfig.siteUrl).hostname;
  } catch {
    return siteConfig.siteUrl;
  }
}

export function professionalLinks(): Array<{
  key: ProfessionalLinkKey;
  href: string;
  detail: string;
  external: boolean;
}> {
  return [
    {
      key: "email",
      href: emailHref(),
      detail: siteConfig.email,
      external: false,
    },
    {
      key: "github",
      href: siteConfig.github,
      detail: siteConfig.github,
      external: true,
    },
    {
      key: "linkedin",
      href: siteConfig.linkedin,
      detail: siteConfig.linkedin,
      external: true,
    },
    {
      key: "medium",
      href: siteConfig.medium,
      detail: siteConfig.medium,
      external: true,
    },
  ];
}

export function streamingLinks(): Array<{
  key: StreamingLinkKey;
  href: string;
  handle: string;
}> {
  return [
    {
      key: "twitch",
      href: siteConfig.twitch.url,
      handle: siteConfig.twitch.handle,
    },
    {
      key: "kick",
      href: siteConfig.kick.url,
      handle: siteConfig.kick.handle,
    },
  ];
}
