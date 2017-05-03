/**
 * Created by zuo on 2017/4/22.
 */
var dataControl = {
    //获取到指定id的数据???
    getDataById(data, id) {
        var item = null;
        for (var i = 0; i < data.length; i++) {
            //因为id没有重复的 所以 data[i].id =id 时候就找到了
            if (data[i].id === id) {
                item = data[i];
                break;
            }
            //没有找到的时候 看i的里面 如果有子内容 就递归
            if (!item && data[i].child) {
                item = getDataById(data[i].child, id);
                if (item) {
                    break;
                }
            }
        }
        //返回找到的值
        return item;
    },
    //获取到指定ID下的child 数据
    getChildById(data, id) {
        //查找id的返回值赋值给目标
        var targetData = this.getDataById(data, id);
        //判断 目标值不为空 并且 有子集 把子集返回
        if (targetData && targetData.child) {
            return targetData.child;
        }
    },
    //获取到指定ID的所有父级包括自己
    getParentsById(data, id) {
        var items = [];//存放父级的数组
        //现在的id
        var current = this.getDataById(data, id);
        //判断如果现在的id存在 就加到数组 并把自身的pId 传到 函数递归
        if (current) {
            items.push(current);
            items = items.concat(this.getParentsById(data, current.pId));
        }
        return items;
    },
    //递归出最大的id
    getMixId(data, n) {
        if (typeof n === 'undefined') {
            n = 0;
        }
        for (var i = 0; i < data.length; i++) {
            if (n < data[i]['id']) {
                n = data[i]['id'];
            }
            if (data[i]['child']) {
                n = this.getMixId(data[i]['child'], n);
            }
        }
        return n * 1;
    }
}