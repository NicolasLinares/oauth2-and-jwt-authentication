module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": "off",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "indent": [
            "error",
            4
        ],
        "linebreak-style": 0,
        "semi": [
            "error",
            "never"
        ]
    },
    settings: {
        react: {
            version: "detect"
        },
    },
}
