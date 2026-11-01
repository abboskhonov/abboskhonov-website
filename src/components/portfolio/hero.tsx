import { TextLink } from "./text-link"

interface BioLink {
  label: string
  href: string
}

interface HeroProps {
  bio: React.ReactNode
  socialLinks: BioLink[]
  // Shown after the links, e.g. a button styled like them.
  actions?: React.ReactNode
}

export function Hero({ bio, socialLinks, actions }: HeroProps) {
  return (
    <section className="mt-10">
      <div className="space-y-4 text-neutral-900 dark:text-neutral-200">
        {bio}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
        {socialLinks.map((link) => (
          <TextLink key={link.label} href={link.href}>
            {link.label}
          </TextLink>
        ))}
        {actions}
      </div>
    </section>
  )
}
