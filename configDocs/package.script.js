module.exports = {
    "eslint": "eslint --ext .js,.jsx --color -c ./.eslintrc.json --cache --ignore-path ./.eslintignore ./src/main/webapp/js/**",
    "eslint--fix": "eslint --fix --ext .js,.jsx --color -c ./.eslintrc.json --cache --ignore-path ./.eslintignore ./src/main/webapp/js/**",
    "add-pre-commit": "echo \"#!/bin/bash\n\nnpm run -s eslint\">./.git/hooks/pre-commit",
    "postinstall": "npm run add-pre-commit -s"
}
