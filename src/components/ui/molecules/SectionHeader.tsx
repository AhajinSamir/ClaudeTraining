import { Heading } from '@/components/ui/atoms/Heading'

type SectionHeaderAlign = 'left' | 'center'

type SectionHeaderProps = {
  eyebrow?: string
  heading: string
  align?: SectionHeaderAlign
}

const alignClasses: Record<SectionHeaderAlign, string> = {
  left: 'text-left',
  center: 'text-center',
}

export function SectionHeader({ eyebrow, heading, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-3 ${alignClasses[align]}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-purple">
          {eyebrow}
        </span>
      )}
      <Heading level={2} variant="section">
        {heading}
      </Heading>
    </div>
  )
}
