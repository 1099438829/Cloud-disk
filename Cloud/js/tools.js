/**
 * Created by zuo on 2017/4/22.
 */
class Darg {
    constructor() {

    }
}



//数据的方法
;(function () {
    class ManipulationData {
        constructor(data){
            this.data = data;
        }

        //初始一些
        init(options) {
            this.newOptions = {}
        }

        //获取到指定id的数据???
        getDataById(data,id) {
            var item = null;
            for (var i = 0; i < data.length; i++) {
                //因为id没有重复的 所以 data[i].id =id 时候就找到了
                if (data[i].id === id) {
                    item = data[i];
                    break;
                }
                //没有找到的时候 看i的里面 如果有子内容 就递归
                if (!item && data[i].child) {
                    item = this.getDataById(data[i].child, id);
                    if (item) {
                        break;
                    }
                }
            }
            //返回找到的值
            return item;
        }


        //获取到指定ID下的child 数据
        getChildById(id) {
            //查找id的返回值赋值给目标
            var targetData = this.getDataById(this.data, id);
            //判断 目标值不为空 并且 有子集 把子集返回
            if (targetData && targetData.child) {
                return targetData.child;
            }
        }


        //获取到指定ID的所有父级包括自己
        getParentsById(id) {

            var items = [];//存放父级的数组
            //现在的id
            var current = this.getDataById(this.data, id);
            //判断如果现在的id存在 就加到数组 并把自身的pId 传到 函数递归
            if (current) {
                items.push(current);
                items = items.concat(this.getParentsById(this.data, current.pId));
            }

            return items;
        }


        //递归出最大的id
        getMixId(n) {
            if (typeof n === 'undefined') {
                n = 0;
            }
            for (var i = 0; i < this.data.length; i++) {
                if (n < this.data[i]['id']) {
                    n = this.data[i]['id'];
                }
                if (this.data[i]['child']) {
                    n = this.getMixId(this.data[i]['child'], n);
                }
            }
            return n * 1;
        }

        //获取到最大id 并且返回加1
        currentMixId() {
            let id = ++this.data[0].maxId;
            return id;
        }

        //生成一个文件夹信息对象
        AddFolderInfo(id, value) {
            let folder = {
                "id": this.currentMixId(),
                "pId": id,
                "name": value,
                "checked": false,
                "time": new Date().getTime(),
                "fileSize": 0,
                "type": "folder",
                "cover": "kong",
                "child": []
            }
            return folder;
        }

        addFoderData(ObjectInfo, id) {
            console.log(id)
            let dataIdInfo = this.getDataById(this.data,id);
            dataIdInfo.child.unshift(ObjectInfo)
        }


    }
    window.OperationData = new ManipulationData(data)
})();



