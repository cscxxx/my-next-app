# My Next.js 项目文档

## NEXT.JS 项目部署

### 构建模式

nextjs 项目部署分两种情况，取决于构建模式，分为两种情况：

1. 默认模式（SSR/混合渲染）

   - Next.js 默认模式下（含服务端渲染 API 路由或 getServerSideProps），生产服务器 (next start) 需要依赖 node_modules 中的服务端代码。
   - 因此，在生产环境中，需要 node_modules 目录下的依赖。
   - 必须保留文件
     - package.json
     - node_modules 目录
     - .next 目录

2. 静态导出模式（Static Export）
   - 静态导出模式下，不需要 node_modules 目录下的服务端代码。
   - 因此，在生产环境中，不需要 node_modules 目录下的依赖。
   - 仅保留打包后文件，包含 html，js，css，图片等静态文件。

### 部署（pm2）

1. 安装 pm2

```bash
npm install -g pm2
```

2. 启动项目

```bash
pm2 start "npm run start" --name my-next-app  # 启动命令，--name 为项目名称
```

3. 停止项目

```bash
pm2 stop my-next-app
```

4. 重启项目

```bash
pm2 restart my-next-app
```

5. 删除项目

```bash
pm2 delete my-next-app
```

6. 查看项目状态

```bash
pm2 list
```

7. 查看项目日志

```bash
pm2 logs my-next-app
```

### 调试

- 查看端口是否被占用

```bash
lsof -i :3000
```

- 查看端口被占用的进程

```bash
ps -ef | grep 3000
```

- 杀死进程

```bash
kill -9 进程id  # 进程id 为 ps -ef | grep 3000 命令的进程id
```
