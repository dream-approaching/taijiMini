// 获取数组最后一个元素
function lastArr(arr) {
  return arr[arr.length - 1];
}

function getVideoType(path) {
  const fileName = lastArr(path.split('/'));
  const type = fileName.split('.')[0].split('_')[1];
  return type;
}

const videoType = {
  attack: {
    name: 'attack',
    index: 3,
  },
  detail: {
    name: 'detail',
    index: 2,
  },
  number: {
    name: 'number',
    index: 1,
  },
  normal: {
    name: 'normal',
    index: 0,
  },
};

module.exports = {
  lastArr,
  getVideoType,
  videoType,
};
