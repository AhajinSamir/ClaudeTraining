import { Heading } from '@/components/ui/atoms/Heading'
import { Text } from '@/components/ui/atoms/Text'

type PageHeaderProps = {
  greeting: string
  subtitle: string
}

export function PageHeader({ greeting, subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <Heading level={1} variant="page">
        {greeting}
      </Heading>
      <Text variant="body" color="secondary">
        {subtitle}
      </Text>
    </div>
  )
}
