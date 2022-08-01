 path=$(dirname $(readlink -f $0)/);

if [ -f $path/API/server.js ]
then

    # echo $PATH
    # cd $path
    echo 'API en cours de démarage ... '
    cd ./API
    npm i 
    npm start


else
    echo 'action if config does not exist'
fi


# if [ -f $PWD/front/src/index.js ]
#     then
#         cd ./front
#         echo $PWD
#          npm start
#     else
#         echo 'Err'
# fi

