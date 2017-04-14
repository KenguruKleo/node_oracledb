# node_oracledb
Easy way for NodeJS scripts to work with OracleDB

## build docker image
`git clone https://github.com/KenguruKleo/node_oracledb.git
cd node_oracledb
docker build -t="kengurukleo/node_oracledb:1.1" `.

## execute NodeJS script
`docker run -it --rm -w /scripts -v "$PWD":/scripts kengurukleo/node_oracledb:1.1 node select1.js`
 
* `-w /scripts`                        :working directory inside container (use this path into node script)
* `-v /user/Downloads/tmp:/scripts`    :mount current directory (command "$PWD") to `/scripts` directory into container
* `select1.js`                         :node script `select1.js`, should be in the path `/user/Downloads/tmp/select1.js`
