import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'hostRemote',
  exposes: {
    './useCharacters': './src/hooks/useCharacters.tsx'
  },
  remotes: {
    remoteGallery: 'remoteGallery@http://localhost:3004/galleryRemoteEntry.js'
  },
  filename: 'hostRemoteEntry.js',
  shared: {
    react: {
      singleton: true,
    }, 
    'react-dom': {
      singleton: true,
    },
  },
});
