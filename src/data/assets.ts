import availablePhotos from 'virtual:photo-slots';
export const assetKey = (path: string) => path.split('/').pop()!.replace(/\.(png|jpe?g|webp|avif)$/i, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const photosByKey = new Map(availablePhotos.map(path => [assetKey(path), path]));
export const photo = (name: string) => photosByKey.get(assetKey(name)) ?? `/assets/photos/${name}.png`;
export const hasPhoto = (src: string) => availablePhotos.includes(src);
export type Framing = { fit?: 'contain' | 'cover'; position?: string; ratio?: string };
// Ratios and focal points inspected against the original files. No face filters.
export const photoFraming: Record<string, Framing> = {
  scene1main: { position: '50% 0%', ratio: '4 / 5' },
  scene2week1: { position: '50% 20%' }, scene2week3: { position: '55% 20%' },
  scene2week5: { position: '50% 14%' }, scene2graduation: { position: '50% 12%' },
  scene3her: { position: '50% 50%', ratio: '941 / 1672' }, scene3me: { position: '50% 50%', ratio: '941 / 1672' },
  scene4letter01: { ratio: '4 / 3', position: '50% 55%' },
  scene4letter02: { ratio: '4 / 5', position: '50% 45%' },
  scene4letter03: { ratio: '4 / 3', position: '50% 65%' },
  scene5main: { ratio: '1122 / 1402', position: '50% 45%' },
  scene6memory00: { position: '50% 60%', ratio: '941 / 1672' },
  scene6memory01: { ratio: '3 / 4', position: '50% 55%' },
  scene6memory02: { ratio: '3 / 4', position: '50% 40%' },
  scene6memory03: { ratio: '4 / 3', position: '50% 50%' },
  scene6memory04: { ratio: '3 / 5', position: '50% 50%' },
  scene6memory05: { ratio: '4 / 3', position: '50% 50%' },
  scene7main: { position: '50% 32%', ratio: '941 / 1672' },
  scene7couple01: { ratio: '16 / 9', position: '50% 60%' },
  scene7couple02: { ratio: '3 / 4', position: '50% 40%' },
};

