/**
 * Created by zuo on 2017/4/22.
 */



//生成文件夹 - 缩略图
function fnCreateGridViewFile(data, id) {
    // console.log(oGridView)
    var children = Incoming.getChildById(data, id);
    var htm = createGridViewFiles(data, id);
    if (htm) {
        oGridView.html(htm)
    } else {
        oGridView.html(fnEmptyFolder())
    }
    return children;
}
//生成文件夹 - 缩略图
function fnCreateListViewFile(data, id) {
    var htm = createListViewFiles(data, id);
    if (htm) {
        oListView.html(htm)
    } else {
        oListView.html(fnEmptyFolder())
    }
}
//生成文件夹 - 的面包屑
function fnCreateBreadCrumbInfo(data, id) {
    if (id !== 0) {
        var htm = CreateBreadCrumb(data, id);
        if (htm) {
            if (!oBreadCrumb.hasClass('active')){
                oBreadCrumb.addClass('active')
            }
            oBreadCrumb.html(htm)
        }
    } else {
        if (oBreadCrumb.hasClass('active')){
            oBreadCrumb.removeClass('active')
        }
    }
    window.currentId = id;
}

