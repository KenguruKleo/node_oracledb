# node_oracledb
Easy way for NodeJS scripts to work with OracleDB

## build docker image
`git clone https://github.com/KenguruKleo/node_oracledb.git
cd node_oracledb
docker build -t="kengurukleo/node_oracledb:1.1" `.

## execute NodeJS script
`docker run -it --rm -w /work_dir -v "$PWD":/work_dir kengurukleo/node_oracledb:1.1 node select1.js`
 
* `-w /work_dir`                    :working directory inside container
* `-v "$PWD":/work_dir`             :mount current directory (command "$PWD") to `/work_dir` directory into container
* `select1.js`                      :nodeJS script `select1.js`, should be in current path
