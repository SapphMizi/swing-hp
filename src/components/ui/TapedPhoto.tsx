import type { CmsImage } from '../../lib/cms-types'
import { imageSrcSet, imageUrl } from '../../lib/format'

interface TapedPhotoProps {
  image: CmsImage
  alt: string
  sizes: string
  tilt?: number
  priority?: boolean
  className?: string
}

// 紙にマスキングテープで留めた写真
export function TapedPhoto({
  image,
  alt,
  sizes,
  tilt = 0,
  priority = false,
  className = '',
}: TapedPhotoProps) {
  return (
    <figure
      className={`relative bg-paper-light p-2 shadow-[0_10px_18px_-10px_rgba(43,29,31,0.5)] ${className}`}
      style={{ rotate: `${tilt}deg` }}
    >
      <img
        src={imageUrl(image, 960)}
        srcSet={imageSrcSet(image, [480, 720, 960, 1440])}
        sizes={sizes}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        className="block aspect-[4/3] w-full object-cover"
      />
      <span
        aria-hidden
        className="absolute -top-3 left-[12%] h-6 w-20 -rotate-6 bg-pink/70 mix-blend-multiply"
      />
      <span
        aria-hidden
        className="absolute -top-3 right-[10%] h-6 w-16 rotate-[8deg] bg-teal/80 mix-blend-multiply"
      />
    </figure>
  )
}
