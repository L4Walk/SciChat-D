# SciChat 部署方式

### 开发环境打包

#### 1. Docker打包镜像

```bash
docker build -t l4walk/scichat-d:[tag] .

例子：
docker build -t l4walk/scichat-d:v0.0.1 .
```



#### 2.Docker导出tar包：

```bash
docker save -o [filename + .tar] l4walk/scichat-d:[tag]

例子
docker save -o scichat-d_v0.0.2.tar l4walk/scichat-d:v0.0.2
```



#### 3.**tar包上传到服务器**



### 服务器部署

#### 服务器Docker导入tar包

```bash
docker load -i [filename + .tar]

例子
docker load -i scichat-d_v0.0.2.tar
```



#### 冷更新

```bash
docker ps

docker stop container id

docker run -d -p 3000:3000 -e BASE_URL=https://openai.api2d.net l4walk/scichat-d:[tag]
```

