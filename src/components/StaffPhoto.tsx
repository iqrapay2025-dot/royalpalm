type StaffPhotoProps = {
  slug?: string
  name: string
  shape: 'circle' | 'portrait'
  className?: string
}

const photos = import.meta.glob('../assets/staff/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function getInitials(name: string) {
  return name
    .replace(/^(?:(?:mr|mrs|ms|dr)\.?\s+)/i, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? '')
    .join('')
    .toUpperCase()
}

export function StaffPhoto({ slug, name, shape, className = '' }: StaffPhotoProps) {
  const photo = slug ? photos[`../assets/staff/${slug}.webp`] : undefined
  const shapeClass = shape === 'circle' ? 'rounded-full text-2xl' : 'aspect-[4/5] rounded-3xl text-6xl'
  const sharedClass = `${shapeClass} ${className}`

  if (photo) {
    return <img src={photo} alt={name} loading="lazy" className={`${sharedClass} object-cover object-top`} />
  }

  return (
    <div
      role="img"
      aria-label={name}
      className={`${sharedClass} flex items-center justify-center bg-wine-900 font-display font-bold text-gold-light`}
    >
      <span>{getInitials(name)}</span>
    </div>
  )
}