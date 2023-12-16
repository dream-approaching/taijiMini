// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”
const CloudBase = require('@cloudbase/manager-node');
const cloud = require('wx-server-sdk');
const { getVideoType, videoType } = require('./utils');

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const { storage } = new CloudBase({
  // secretId: 'Your SecretId',
  // secretKey: 'Your SecretKey',
  envId: 'dev-vza4u', // 云开发环境ID，可在腾讯云云开发控制台获取
});

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * event 参数包含小程序端调用传入的 data
 *
 */
exports.main = async (event, context) => {
  const { path } = event;
  const wxContext = cloud.getWXContext();
  let index = 0;

  const fileListRes = await storage.listDirectoryFiles(path);
  console.log('%c  path:', 'color: #0e93e0;background: #aaefe5;', path);
  console.log('%c  fileListRes:', 'color: #0e93e0;background: #aaefe5;', fileListRes);

  // 判断是否有json文件
  const jsonFile = fileListRes.find((item) => item.Key === `${path}/dataConfig.json`);
  const imgList = [];
  const videoList = [];
  if (jsonFile) {
    const res = await cloud.downloadFile({
      fileID: `cloud://dev-vza4u.6465-dev-vza4u-1302956475/${jsonFile.Key}`,
    });
    const jsonData = JSON.parse(res.fileContent.toString());
    console.log('%c  jsonData:', 'color: #0e93e0;background: #aaefe5;', jsonData);
    const keyArr = Object.keys(jsonData.imageDataConfig);

    const getImageData = (item, key) => {
      const blockText = jsonData.imageDataConfig[key].block || '';
      if (blockText) {
        index = 0;
      }
      index += 1;
      return {
        ...item,
        desc: `${index}、${jsonData.imageDataConfig[key].desc}`,
        block: jsonData.imageDataConfig[key].block || '',
      };
    };
    fileListRes.forEach((item) => {
      const [keyPath, format] = item.Key.split('.');
      if (format === 'png' || format === 'jpg') {
        const matchingKey = keyArr.find((key) => key === item.Key);
        if (matchingKey) {
          imgList.push(getImageData(item, matchingKey));
        }
      }
      if (format === 'mp4') {
        const type = getVideoType(item.Key);
        console.log('%c  type:', 'color: #0e93e0;background: #aaefe5;', type);
        // baduanjin/video02
        const keyPathArr = keyPath.split('/');
        const name = keyPathArr[keyPathArr.length - 1];
        console.log('%c  keyPath:', 'color: #0e93e0;background: #aaefe5;', keyPath);
        console.log('%c  name:', 'color: #0e93e0;background: #aaefe5;', name);
        if (videoType[type]) {
          videoList[videoType[type].index] = {
            ...item,
            ...jsonData.videoDataConfig[videoType[type].name],
          };
        }
        if (jsonData.videoDataConfig[name]) {
          if (jsonData.videoDataConfig[name].hasOwnProperty('index')) {
            videoList[jsonData.videoDataConfig[name].index] = {
              ...item,
              ...jsonData.videoDataConfig[name],
            };
          } else {
            videoList.push({
              ...item,
              ...jsonData.videoDataConfig[name],
            });
          }
        }
      }
    });
  }

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
    imgList: imgList.filter((item) => item),
    videoList: videoList.filter((item) => item),
  };
};
