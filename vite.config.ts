import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { env } from 'process';

const apiTarget = 'https://localhost:7188';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    server: {
        https: false, // 👈 HTTPS बंद कर दिया
        port: Number(env.DEV_SERVER_PORT) || 52749,
        proxy: {
            '/api': {
                target: apiTarget,
                changeOrigin: true,
                secure: false,
            },
            '/uploads': {
                target: apiTarget,
                changeOrigin: true,
                secure: false,
            },
        }
    }
});



//import { defineConfig } from 'vite';
//import react from '@vitejs/plugin-react';
//import fs from 'fs';
//import path from 'path';
//import child_process from 'child_process';
//import { env } from 'process';

//const baseFolder =
//    env.APPDATA
//        ? `${env.APPDATA}/ASP.NET/https`
//        : `${env.HOME}/.aspnet/https`;

//const certificateName = 'foodexpress.client';
//const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
//const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

//// … आपका सर्टिफिकेट जनरेशन कोड …

//// Force target to port 7188
//const apiTarget = 'https://localhost:7188';

//export default defineConfig({
//    plugins: [react()],
//    resolve: {
//        alias: { '@': path.resolve(__dirname, 'src') },
//    },
//    server: {
//        https: {
//            key: fs.readFileSync(keyFilePath),
//            cert: fs.readFileSync(certFilePath),
//        },
//        port: Number(env.DEV_SERVER_PORT) || 52749,
//        proxy: {
//            // सभी /api कॉल्स अब https://localhost:7188/api/* पर जाएंगे
//            '/api': {
//                target: apiTarget,
//                changeOrigin: true,
//                secure: false,
//            },
//            // स्टैटिक अपलोड्स भी उसी API से
//            '/uploads': {
//                target: apiTarget,
//                changeOrigin: true,
//                secure: false,
//            },
//        }
//    }
//});



//import { fileURLToPath, URL } from 'node:url';

//import { defineConfig } from 'vite';
//import plugin from '@vitejs/plugin-react';
//import fs from 'fs';
//import path from 'path';
//import child_process from 'child_process';
//import { env } from 'process';

//const baseFolder =
//    env.APPDATA !== undefined && env.APPDATA !== ''
//        ? `${env.APPDATA}/ASP.NET/https`
//        : `${env.HOME}/.aspnet/https`;

//const certificateName = "foodexpress.client";
//const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
//const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

//if (!fs.existsSync(baseFolder)) {
//    fs.mkdirSync(baseFolder, { recursive: true });
//}

//if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
//    if (0 !== child_process.spawnSync('dotnet', [
//        'dev-certs',
//        'https',
//        '--export-path',
//        certFilePath,
//        '--format',
//        'Pem',
//        '--no-password',
//    ], { stdio: 'inherit', }).status) {
//        throw new Error("Could not create certificate.");
//    }
//}

//const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
//    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7188';

//// https://vitejs.dev/config/
//export default defineConfig({
//    plugins: [plugin()],
//    resolve: {
//        alias: {
//            '@': fileURLToPath(new URL('./src', import.meta.url))
//        }
//    },
//    server: {
//        proxy: {
//            '^/weatherforecast': {
//                target,
//                secure: false
//            }
//        },
//        port: parseInt(env.DEV_SERVER_PORT || '52749'),
//        https: {
//            key: fs.readFileSync(keyFilePath),
//            cert: fs.readFileSync(certFilePath),
//        }
//    }
//})
