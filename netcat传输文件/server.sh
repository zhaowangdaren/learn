#!/bin/bash
#$1:port

#start_info:md5 file_name number_split
#eg:83f4dacbde6f8b73fb864e8dd183ab57 client.sh 1
start_info=$(nc -l -p $1);
start_info_array=($start_info);
md5=${start_info_array[0]};
file_name=${start_info_array[1]};
number_split=${start_info_array[2]};

echo 'md5='$md5;
echo 'file_name='$file_name;
echo 'number_split='$number_split;

split_temp_folder="split_temp_folder";
if [ -d "$split_temp_folder" ]; then
rm -rf $split_temp_folder;
fi
mkdir $split_temp_folder;

all_file_name='';
for((i=0;i<$number_split;i++));
do
str_i=$i;
if(($i<10));then
str_i="0"${str_i}
fi
echo "Is getting ${file_name}"_x"$str_i";
nc -l -p $1 > $split_temp_folder/${file_name}"_x"$str_i;
all_file_name=$all_file_name" "$split_temp_folder/${file_name}"_x"$str_i;
done
echo "Received all file.Start cat $all_file_name"
cat $all_file_name > $file_name

#check md5
echo "check md5"
local_md5_name=$(md5sum $file_name)
local_info_array=($local_md5_name);
local_md5=${local_info_array[0]};
if [ "$md5"="$local_md5" ];then
echo "Success"
else
echo "failed"
fi
