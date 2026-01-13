import tsParser from '@typescript-eslint/parser';
declare const _default: {
    files: string[];
    languageOptions: {
        parser: typeof tsParser;
        parserOptions: {
            ecmaVersion: string;
            sourceType: string;
        };
    };
    plugins: {
        '@typescript-eslint': {
            configs: Record<string, import("@typescript-eslint/utils/ts-eslint").ClassicConfig.Config>;
            meta: import("@typescript-eslint/utils/ts-eslint").FlatConfig.PluginMeta;
            rules: typeof import("@typescript-eslint/eslint-plugin/use-at-your-own-risk/rules");
        };
    };
    rules: {};
}[];
export default _default;
//# sourceMappingURL=eslint.config.d.ts.map