#!/bin/sh
#use:bash client.sh
#$1:source file $2:host ip $3:host port

source_file_md5=$(md5sum $1)
source_file_size_and_name=$(du -sm $1);
source_array=($source_file_size_and_name);
source_file_size=${source_array[0]};
file_name=${source_array[1]};

#split file
split_temp_folder="split_temp_folder";
if [ -d "$split_temp_folder"  ]; then
rm -rf $split_temp_folder;
fi
mkdir $split_temp_folder;
split -b 100m -d $1 $split_temp_folder/${file_name}_x

#the number of split file
number_split=0;
for file_a in ${split_temp_folder}/*;do
let number_split+=1;
done

#create start file
start_file_name=${1}"-start.txt";
if [ -f "$start_file_name" ];then
rm $start_file_name;
fi
touch $start_file_name;
#write start file
echo $source_file_md5" "$number_split >> $start_file_name
#send start file
nc $2 $3 < $start_file_name;

#send files
for file_a in ${split_temp_folder}/*;do
echo "Send $file_a";
nc $2 $3 < $file_a;
done
