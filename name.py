import os

for file in os.listdir('.'):    #os.listdir('.')遍历文件夹内的每个文件名，并返回一个包含文件名的list
    if file[-2: ] == 'py':
        continue   #过滤掉改名的.py文件
    name = file.replace(' ', '')   #去掉空格
    new_name = name[20: 26] + name[-4:]   #选择名字中需要保留的部分
    os.rename(file, new_name)