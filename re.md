# 创建React组件并发布到 NPM


## npm项目命令
1. 如果本机第一次发布包: `npm adduser`;
2. 非第一次发布包：`npm login`;
3. 撤销发布的包 `npm unpublish`
  > 1. npm unpublish z-tool@1.0.0 删除某个版本  
  > 2. npm unpublish z-tool --force 删除整个npm市场的包
  > 3. npm unpublish的推荐替代命令：`npm deprecate <pkg>[@<version>] <message> `.使用这个命令，并不会在社区里撤销你已有的包，但会在任何人尝试安装这个包的时候得到警告例如：`npm deprecate z-tool  '这个包我已经不再维护了哟'`

4. `npm link`: 本地开发，设置软连接，方便调试
5. 更改 package.json 里面的版本号并重新发布
## 发包注意事项
1. 注意npm源切换官方地址，建议安装nrm切换npm源地址
2. 如果项目里有部分私密的代码不想发布到npm上，可以将它写入.gitignore 或.npmignore中，上传就会被忽略了
3. 如果报权限方面的错，加上--force

## 配置sass
## 配置ts