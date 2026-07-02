type KeyValueRowProps = {
  label: string
  value: string
}

export function KeyValueRow({ label, value }: KeyValueRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-[13px] text-neutral-500">{label}</span>
      <span className="text-[13px] font-medium text-neutral-900">{value}</span>
    </div>
  )
}
