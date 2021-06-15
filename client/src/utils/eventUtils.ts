const EventUtil = {
  addHandler(element, type, handler) {
    // 添加事件
    if (element.addEventListener) {
      element.addEventListener(type, handler, false); // 使用DOM2级方法添加事件
    } else if (element.attachEvent) {
      // 使用IE方法添加事件
      element.attachEvent(`on${type}`, handler);
    } else {
      element[`on${type}`] = handler; // 使用DOM0级方法添加事件
    }
  },

  removeHandler(element, type, handler) {
    // 取消事件
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent(`on${type}`, handler);
    } else {
      element[`on${type}`] = null;
    }
  },
};

export default EventUtil;
