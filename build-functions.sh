function smkdir {
  dir_name=$1
  if [[ ! -d $dir_name ]]
  then
    mkdir $dir_name
  fi
}

function smkdirp {
  dir_name=$1
  if [[ ! -d $dir_name ]]
  then
    mkdir -p $dir_name
  fi
}
