import { defineConfig } from "eslint/config";
import prettierPlugin from 'eslint-plugin-prettier';
import { ESLint } from "eslint/js";

export default defineConfig([
    js.config.recommended,

    {
        files:[`**\*.js`],
        plugins:{
            prettier: prettierPlugin
        },
        rules:{
            'prettier/prettier' :'error',
        }
    }
]);