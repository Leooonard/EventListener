module.exports = {
    "parser": "babel-eslint",
    "plugins": [
      "flowtype"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "env": {
        "browser": true,
        "node": true,
        "amd": true,
        "jquery": true,
    },
    "globals": {
        // allowed global vars
        "Lizard": true
    },
    "extends": "eslint:recommended",
    "rules": {
        // coding style
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows" // 设置为unix就疯狂报错 = =
        ],
        "semi": [
            "error",
            "always"
        ],
        "quotes": [
            "error",
            "single",
            {
                "avoidEscape": true,
            }
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "space-before-function-paren": [
            "error"
        ],

        // best practise
        "eqeqeq": [
            "error"
        ],
        "curly": [
            "error",
            "all"
        ],
        "no-use-before-define": [
            "error",
            {
                "functions": false,
                "classes": false
            }
        ],
        "no-extend-native": [
            "error"
        ],
        "no-extra-parens": [
            "error"
        ],
        "new-cap": [
            "error",
            {
                "newIsCap": true,
                "capIsNew": false
            }
        ],
        "no-array-constructor": [
            "error"
        ],

        //disabled key words
        "no-with": [
            "error"
        ],
        "no-eval": [
            "error"
        ],
        "no-void": [
            "error"
        ]
    }
};
