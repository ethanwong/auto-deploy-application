###
 # @Description: 
 # @Author: Ethan Wong
 # @Date: 2021-01-08 10:39:37
 # @FilePath: \deploy.sh
 # @LastEditTime: 2021-01-08 10:44:03
 # @LastEditors: your name
### 
#!/bin/bash
echo ****start deploy****

#基础参数设置
command=$1
dir="/home"
name="imethan-blog-2"
jar="imethan-blog-2-pro-2.0.0.jar"
target=$dir/$name/target/$jar

echo exec command=$1
echo dir=$dir name=$name jar=$jar target=$target

if [ "$command" == "restart" ];then
	echo exec start
	#clone源代码
	cd $dir
	if [ -d $name ];then
		echo ****exec git fetch git merge****
		cd $name
		git fetch
		git merge
	else
		echo ****exec git clone****
		git clone https://github.com/ethanwong/imethan-blog-2.git
		cd $name
 	fi


	#编译打包
	echo ****exec mevn clean package -DskipTests -P pro****
	mvn clean package -DskipTests -P pro

	#停止已启动jar
	echo ****exec ps -ef kill jar****
	pids=`ps aux | grep $jar |grep -v grep | awk '{print $2}'`
	echo ****kill pids=$pids
	for pid in $pids
	do
		kill -9 $pid
	done

	now=$(date "+%Y%m%d")

	#启动jar
	echo ****exec java -jar****
	exec java -Dfile.encoding=UTF-8 -Dserver.port=80 -jar $target > /home/"$name-$now".log &
	echo ****open start log****

elif [ "$command" == "stop" ];then
	inputPids=$2
	echo exec stop pids=$inputPids
	

	#关闭旧进程
	if [ -n $inputPids ];then
		echo ****kill pids=$inputPids
			for pid in $inputPids
			do
				kill -9 $pid
			done
	else
		echo ****inputPids is empty****
	fi

else
	echo command $command error
fi

 
echo ****end deploy****
