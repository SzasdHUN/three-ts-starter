/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite'
import glsl from "vite-plugin-glsl";


export default defineConfig({
    plugins: [
        glsl({
            include: [
                '**/*.glsl', '**/*.wgsl',
                '**/*.vert', '**/*.frag',
                '**/*.vs',   '**/*.fs',
            ]
        }),
        
    ],
});