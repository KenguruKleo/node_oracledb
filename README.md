# node_oracledb
Easy way for NodeJS scripts to work with OracleDB

## build docker image
```
git clone https://github.com/KenguruKleo/node_oracledb.git
cd node_oracledb
docker build -t="kengurukleo/node_oracledb" 
```

## execute NodeJS script
`docker run -it --rm -w /work_dir -v "$PWD":/work_dir kengurukleo/node_oracledb node select.js [ARGS]`
 
* `-w /work_dir`                    :working directory inside container
* `-v "$PWD":/work_dir`             :mount current directory (command "$PWD") to `/work_dir` directory into container
* `select.js`                       :nodeJS script `select.js`, should be in current path

## use with docker-compose
* download [docker-compose.yml](https://raw.githubusercontent.com/KenguruKleo/node_oracledb/master/docker-compose.yml)
* run `docker-compose run  --rm node_oracledb node YOUR_SCRIPT [ARGS]`