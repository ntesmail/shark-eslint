## 自动为您的项目部署 eslint

如果您的项目有部署 eslint 的需求，可使用本工具为您的项目自动部署 eslint，使用一次部署生效后，后来的同学就无需其他奇怪的操作，直接 npm install 的时候，自动会加上 git pre commit 的钩子。在 commit 的时候自动检测代码，检测有 error 就终止 commit，并查看 控制台输出，定位错误，修改错误后再次 commit，直到没有 error 后 commit 成功。

## 如何在项目中部署
1. 为你的代码编辑器或者 IDE 安装 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)（强烈推荐，开发时实时检测报错，第一时间发现错误并及时修改） 和 EditorConfig 插件。
1. 使用 npm 全局安装 eslint 和 shark-eslint: `npm i -g eslint @ntesmail/shark-eslint`。
1. 在命令行里切换到您的项目下，运行 `shark-eslint`, 使用 `-t` 参数指定 [shark-eslint-configs](https://git.mail.netease.com/support/shark-eslint-configs) 仓库中的 eslintrc.json 模板，如 `shark-eslint -t ng`。

注意：如果你的项目目录结构和普通的项目不一样，请检查 eslint 和 eslint--fix 脚本中检查 js 文件的目录。

## 日常开发中建议
由于加入了 git pre commit 的钩子脚本，每次 commit 都会运行 `npm run eslint` 来检查js文件，所以 commit 失败时，不要惊慌，要淡定，可以参考以下指引：
1. 使用编辑器 eslint 插件的 fix 功能尝试修复单个文件中，可修复的一些错误。
1. 运行 `npm run eslint--fix` 尝试自动修复所有 js 文件中一些可以修复错误。
1. 如果编辑器配置问题较多，如缩进类型，换行符号等问题，建议尝试配合 .editorconfig 文件，统一编辑器的配置。
1. 仔细阅读控制台输出，如果某一条检验规则出现次数频繁，且你非常不喜欢这条规则，可以在 .eslintrc.json 文件中找到此条规则，将其注释掉。


#### 运行 `shark-eslint` 时，发生了什么？
1. 生成了 .editorconfig、.eslintrc.json、.eslintignore、pre-commit 四个文件。
1. 为你项目中的 package.json 文件写入了四个 script：eslint、eslint--fix、cp-pre-commit、postinstall。
1. 执行一次 cp-pre-commit 脚本，拷贝 pre-commit 文件到 .git/hooks/ 目录下，使 git commit 的钩子脚本生效。