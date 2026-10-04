import os

for file in os.listdir('.'):  # 遍历文件夹内的每个文件名
    if file[-2:] == 'py':
        continue  # 过滤掉改名脚本自身
    name = file.replace(' ', '')  # 去掉空格
    stem, ext = os.path.splitext(name)
    new_name = stem[-6:] + ext  # 保留主文件名最后 6 位 + 原扩展名
    if new_name and new_name != file:
        os.rename(file, new_name)
