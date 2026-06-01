interface BgProps { className?: string }

export function HeroBg({ className }: BgProps) {
  return <div className={`absolute inset-0 bg-black ${className ?? ''}`} />
}

export function ContentBg({ className }: BgProps) {
  return <div className={`absolute inset-0 mesh-content ${className ?? ''}`} />
}

export function DevelopmentBg({ className }: BgProps) {
  return <div className={`absolute inset-0 mesh-development ${className ?? ''}`} />
}

export function BusinessBg({ className }: BgProps) {
  return <div className={`absolute inset-0 mesh-business ${className ?? ''}`} />
}

export function EducationBg({ className }: BgProps) {
  return <div className={`absolute inset-0 mesh-education ${className ?? ''}`} />
}
