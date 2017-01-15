import base64
import paramiko
import os

# todo 能自己获取dist地址
PATH = WEBPATH URL ON LOCALHOST

dirs = os.walk(PATH)

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(YOURHOST, username=USERNAME, password=PASSWORD)
# stdin, stdout, stderr = client.exec_command('cd ..;cd alidata/www/web;ls;')

sftp = paramiko.SFTPClient.from_transport(client.get_transport())
WEBPATH= YOUR WEBSITE URL ON SERVER

for (dirPath, dirNames, fileNames) in dirs:

    for file in fileNames:
        # todo 这里的算法不是hin好
        FROM = dirPath + "\\" + file
        URL = (dirPath.replace(PATH, "") + "\\" + file).replace("\\", "/")
        try:
            sftp.put(FROM, WEBPATH + URL)
        except Exception as e:
            print(WEBPATH + dirPath.replace(PATH, "").replace("\\", "/"))
            sftp.mkdir(WEBPATH + dirPath.replace(PATH, "").replace("\\", "/"))
            sftp.put(FROM, WEBPATH + URL)
        print(FROM)

client.close()

#todo  diff减少流量
