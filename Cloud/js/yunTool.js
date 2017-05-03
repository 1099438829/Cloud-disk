/**
 * Created by zuo on 2017/4/22.
 */
;(function ($) {
    class yunFolder {
        //取消状态
        cancelStatus(obj) {

        }


        //文件名重复后处理
        NameRepetition(childs, name) {

        }

        //缩略图视图重新渲染
        RenderingFolder(childs, type, width) {
            var n = Math.floor(width / 128);
            var arr = [];
            let dd = null;
            if (type === 'newFolder') {
                for (let i = 0, len = childs.length; i < len; i++) {
                    if (i % (i === 0 ? n - 1 : n) === 0) {
                        dd = document.createElement('dd');
                        arr.push(dd);
                    }
                    childs.eq(0).css({'margin-left': 130});
                    dd.append(childs.eq(i))
                }

            } else {
                for (let i = 0, len = childs.length; i < len; i++) {
                    if (i % n === 0) {
                        dd = document.createElement('dd');
                        arr.push(dd);
                    }
                    childs.eq(0).css({'margin-left': 6});
                    dd.append(childs.eq(i))
                }
            }

            return arr;
        }
    }
    $.yunTool = new yunFolder();
    $.fn.yunTool = new yunFolder();

})(jQuery)


class yunTools {
    //时间戳 格式化 日期
    format(shijianchuo) {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    }

    add0(num) {
        return num < 10 ? '0' + num : '' + num;
    }

    //判断大小 大于1024 添加M
    fileSize(num) {
        return num > 1024 ? Number.parseFloat(Number.parseFloat(num).toFixed(1)) + 'M' : num + 'KB';
    }

}

var yun = new yunTools()
