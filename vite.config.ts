import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import EsLint from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'
import path from 'path';
import IstanbulPlugin from 'vite-plugin-istanbul';

const { EsLinter, linterPlugin } = EsLint

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    IstanbulPlugin({
			include: 'src/*',
			exclude: ['node_modules', 'test/'],
			extension: ['.js', '.ts', '.vue'],
			requireEnv: true,
		}),
    linterPlugin({
      include: ['./src}/**/*.{ts,tsx}'],
      linters: [new EsLinter({ configEnv })],
    }),
    // dts({
    //   include: ['src/component/'],
    // }),
  ],
  build: {
    minify: true,
    //root: path.resolve('src', 'index.ts'),
    lib: {
      entry: path.resolve('src', 'index.ts'),
      formats: ['es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
    },
  },
}))
