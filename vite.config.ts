import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Check local photo presence before rendering an <img>, so unfinished photo slots
// do not produce 404 requests. Adding/removing a photo refreshes the dev preview.
function photoSlots() {
  const directory = resolve('public/assets/photos');
  const moduleId = '\0virtual:photo-slots';
  return {
    name: 'homebound-photo-slots',
    resolveId(id: string) { if (id === 'virtual:photo-slots') return moduleId; },
    load(id: string) {
      if (id === moduleId) return `export default ${JSON.stringify(readdirSync(directory).filter(file => /\.(webp|avif|jpg|jpeg|png)$/i.test(file)).map(file => `/assets/photos/${file}`))}`;
    },
    configureServer(server: import('vite').ViteDevServer) {
      server.watcher.add(directory);
      const refresh = (file: string) => {
        if (file.replaceAll('\\', '/').startsWith(directory.replaceAll('\\', '/')) && /\.(webp|avif|jpg|jpeg|png)$/i.test(file)) {
          const module = server.moduleGraph.getModuleById(moduleId);
          if (module) server.moduleGraph.invalidateModule(module);
          server.ws.send({ type: 'full-reload' });
        }
      };
      server.watcher.on('add', refresh).on('unlink', refresh).on('change', refresh);
    },
  };
}
export default defineConfig({
  base: '/regalo-de-graduacion/',
  plugins: [react(), photoSlots()],
});
