interface HeaderProps {
  name: string
  title: string
}

export function Header({ name, title }: HeaderProps) {
  return (
    <header>
      <h1 className="text-neutral-900 dark:text-neutral-200">{name}</h1>
      <p className="text-neutral-500">{title}</p>
    </header>
  )
}
