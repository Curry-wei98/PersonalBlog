<?php
ini_set("display_errors", "On");
error_reporting(E_ALL | E_STRICT);
require_once '../../Plugin/lib/aliyun-oss-php-sdk-master/samples/Common.php';
require_once '../../Plugin/lib/aliyun-oss-php-sdk-master/autoload.php';
header('Content-Type: text/plain; charset=utf-8');

use OSS\OssClient;
use OSS\Core\OssException;

$bucket = Common::getBucketName();
$ossClient = Common::getOssClient();

$imageName = $_POST['name'];
$return = array();
$return["msg"] = 'error';
$ossClient->setTimeout(3600);
$ossClient->setConnectTimeout(10);



try {
    if ($_FILES["file"]["error"] > 0) {
        $return["msg"] = $_FILES["file"]["error"];
    } else {
        if (move_uploaded_file($_FILES["file"]["tmp_name"],"test/$imageName.jpg"))
            if (uploadFiles($ossClient, $bucket,$imageName))
                $return["msg"] = 'success';
    }
} catch (RuntimeException $e) {
    $return["msg"] = $e->getMessage();
}
echo json_encode($return, JSON_UNESCAPED_UNICODE);

function uploadFiles($ossClient, $bucket,$imageName)
{
    $object = "blogImage/$imageName.jpg";
    $filePath = "test/$imageName.jpg";
    $options = array();

    try {
        $ossClient->uploadFile($bucket, $object, $filePath, $options);
    } catch (OssException $e) {
        printf(__FUNCTION__ . ": FAILED\n");
        printf($e->getMessage() . "\n");
        return false;
    }
    return true;
}

?>