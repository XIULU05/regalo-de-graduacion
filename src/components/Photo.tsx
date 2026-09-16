import { useState, type CSSProperties } from 'react';
import { assetKey, hasPhoto, photoFraming } from '../data/assets';
type Props = { src: string; label: string; className?: string; eager?: boolean; natural?: boolean };
export function Photo({ src, label, className = '', eager = false, natural = false }: Props) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const failed = failedSource === src || !hasPhoto(src);
  const framing = photoFraming[assetKey(src)] ?? {};
  return <div className={`photo ${failed ? 'photo-missing' : ''} ${className}`}
    style={{ '--photo-ratio': framing.ratio ?? '4 / 5', ...(natural ? { aspectRatio: framing.ratio ?? '4 / 5' } : {}) } as CSSProperties}>
    {!failed ? <img src={src} alt={label} style={{ objectFit: framing.fit ?? 'cover', objectPosition: framing.position ?? '50% 50%' }}
      loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} onError={() => setFailedSource(src)} />
      : <span role="img" aria-label={label} className="photo-caption">Un recuerdo por llegar</span>}
  </div>;
}

