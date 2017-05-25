# shark-eslint

Deploy ESLint for your project

## How to use
1. Install and config ESLint and EditorConfig plugins for you editor.
1. Install ESLint and shark-eslint:
    `npm i -g eslint` and `npm i -g shark-eslint`
1. Switch to your project directory, and run `shark-eslint`

---

## 自动为您的项目部署 eslint

如果您的项目有部署 eslint 的需求，可使用本工具为您的项目自动部署 eslint，使用一次部署生效后，后来的同学就无需其他奇怪的操作，直接 npm install 的时候，自动会加上 git pre commit 的钩子。在 commit 的时候自动检测代码，检测有 error 就终止 commit，并查看 控制台输出，定位错误，修改错误后再次 commit，直到没有 error 后 commit 成功。

## 如何使用
1. 为你的代码编辑器或者 IDE 安装 EsLint 和 EditorConfig 插件。
1. 使用 npm 或者 yarn 全局安装 eslint 和 shark-eslint: `npm i -g eslint` `npm i -g shark-eslint`。
1. 在命令行里切换到您的项目下，运行 `shark-eslint`, 使用 `-t` 参数指定 [shark-eslint-configs](https://git.mail.netease.com/support/shark-eslint-configs) 仓库中的 eslintrc.json 模板，如 `shark-eslint -t ng`。
1.  完成部署

## 做了什么
1. 生成了 .editorconfig、.eslintrc.json、.eslintignore、pre-commit 四个文件。
1. 为你项目中的 package.json 文件写入了四个 script：eslint、eslint--fix、cp-pre-commit、postinstall。注意如果你的项目目录结构和普通的项目不一样，请检查 eslint 和 eslint--fix 脚本中检查 js 文件的目录。
1. 执行一次 cp-pre-commit 脚本，拷贝 pre-commit 文件到 .git/hooks/ 目录下，使 git commit 的钩子脚本生效。