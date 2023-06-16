# DB

- Easy if you got docker

```sh
docker-compose up -d    # 在背景開啟專案
docker-compose down     # 關掉專案
docker ps               # 目前正在跑的docker程式, id從這邊拿 CONTAINER ID
docker logs ${id} -f    # 看log (-f是持續看 沒有的話看一次)
```

- install package: 
```sh
docker exec -it ${id} sh    # 進去docker container裡面
npm install ${package}      # install your package
```

## mysql docker container
> volumn at db_data
- use phpmyadmin for easy accessing `localhost:8181`
- or use your sql service to access: `localhost:3300`