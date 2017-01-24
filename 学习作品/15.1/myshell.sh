#!/bin/bash
myapp='app.js'
address=./$myapp
echo "shell successed";pm2 start $address;
# 无限循环
while true
do
# 获取内存中，含有www字符，不含邮grep字符的行第三列的值
j=$(ps aux|grep $myapp|grep -v 'grep'|awk '{print $3}');
# 间隔2秒
sleep 2;
# 显示j的值
echo "-------------j is $j -------------------";
# 设阀值为2
f=2
# 比对，j>f输出1，反之输出0
# shell里不能直接运算小数，可以通过这个方法规避。
val=$(expr $j \> $f)
echo $val
# if运算结尾要加fi 方括号两遍都要有空格，内容不能加“”
if [ $val -eq 1 ]
then
pm2 reload $address;
else
echo "safe";
fi	
done;
