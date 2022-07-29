
if [ -f $PWD/front/src/index.js ]
    then
        echo 'React est en cours de démarage ... '
       cd ./front
          npm start
    else
        echo 'Err'
fi

