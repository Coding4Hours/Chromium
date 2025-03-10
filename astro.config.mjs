import { defineConfig } from 'astro/config';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import { epoxyPath } from '@mercuryworkshop/epoxy-transport';
import { libcurlPath } from '@mercuryworkshop/libcurl-transport';
import playformCompress from '@playform/compress';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { viteStaticCopy } from 'vite-plugin-static-copy';
//import createPlugin from "@astrojs/partytown"

export default defineConfig({
    integrations: [
  //      createPlugin({}),
        robotsTxt(),
        icon(),
        playformCompress({
            CSS: true,
            HTML: true,
            Image: true,
            JavaScript: true,
            SVG: true,
        }),
    ],
    output: 'static',
    vite: {
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: `${uvPath}/**/*`.replace(/\\/g, '/'),
                        dest: 'uv',
                        overwrite: false,
                    },
                    {
                        src: `${epoxyPath}/**/*`.replace(/\\/g, '/'),
                        dest: 'epoxy',
                        overwrite: false,
                    },
                    {
                        src: `${libcurlPath}/**/*`.replace(/\\/g, '/'),
                        dest: 'libcurl',
                        overwrite: false,
                    },
                    {
                        src: `${baremuxPath}/**/*`.replace(/\\/g, '/'),
                        dest: 'baremux',
                        overwrite: false,
                    }
                ],
            }),
        ],
        server: {
            proxy: {
                '/wisp/': {
                    target: 'wss://ruby.rubynetwork.co/wisp/',
                    changeOrigin: true,
                    ws: true,
                    rewrite: (path) => path.replace(/^\/wisp\//, ''),
                },
                '/gms/': {
                    target: 'https://rawcdn.githack.com/ruby-network/ruby-assets/main/',
                    changeOrigin: true,
                    ws: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/gms\//, ''),
                },
            },
        },
    },
    devToolbar: {
        enabled: false
    },
});
