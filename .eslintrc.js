module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        "indent": ["error", 4],
        "quotes": ["error", "single", "double"],
    }
}