/**
 * Created by zuo on 2017/4/22.
 */
//生成文件
function createGridViewFiles(id) {
    var parentChilds = OperationData.getChildById(id);
    var n = 0;//dd变量
    n = Math.floor($('.frame-main .module-list')[0].offsetWidth / 128);
    var str = '';
    //循环child 拼接字符串
    for (var i = 0; i < parentChilds.length; i++) {
        if(parentChilds[i].del) continue;
        var imgInfo = ''
        switch (parentChilds[i].type) {
            case 'folder':
                imgInfo = 'dir-large';
                break;
            default:
                imgInfo = 'default-large';
        }
        if (i % n === 0) str += `<dd>`;
        str +=`               
          <div class="grid-view-item" data-id="${parentChilds[i].id}" data-pId="${parentChilds[i].pId}" _position="${i}">
               <div class="fileicon ${imgInfo}"  ></div>
                    <div class="file-name">
                        <a  class="filename" href="javascript:void(0);" title="${parentChilds[i].type === 'folder' ? parentChilds[i].name : (parentChilds[i].name + '.' + parentChilds[i].type)}" >
                            ${parentChilds[i].name}
                        </a>
                        <div class="filename-info">
                            <input type="text" class="filename-input" >
                            <span class="filename-confirm ico-font">&#xE937;</span>
                            <span class="filename-cancel ico-font">&#xE93A;</span>
                        </div>
                    </div>
                    <div class="checkbox">
                        <span class="ico-font checkgridsmall">&#xE935;</span>
                    </div>
                </div>`
        if (i % n === n - 1) str += `</dd>`;
    }
    return str;
}
//生成文件列表
function createListViewFiles(id) {
    var parentChilds = OperationData.getChildById(id);
    var str = '';
    //循环child 拼接字符串
    for (var i = 0; i < parentChilds.length; i++) {
        if(parentChilds[i].del) continue;
        var imgInfo = '';
        switch (parentChilds[i].type) {
            case 'folder':
                imgInfo = 'dir-small';
                break;
            default:
                imgInfo = 'default-small';
        }
        str += `
            <dd _position="${i}" data-id="${parentChilds[i].id}" data-pId="${parentChilds[i].pId}">
                <span class="checkbox">
                    <span class="ico-font checksmall"></span>
                </span>
                <div class="fileicon ${imgInfo}"></div>
                <div class="file-name">
                    <div class="text">
                        <a  class="filename" href="javascript:void(0);" title="${parentChilds[i].type === 'folder' ? parentChilds[i].name : (parentChilds[i].name + '.' + parentChilds[i].type)}" >${parentChilds[i].name}</a>
                        <div class="filename-info">
                            <input type="text" class="filename-input">
                            <span class="filename-confirm ico-font">&#xE937;</span>
                            <span class="filename-cancel ico-font">&#xE93A;</span>
                        </div>
                    </div>
                    <!--列表hover菜单栏-->
                    <div class="operate">
                        <div class="undefined">
                            <a href="javascript:;" class="g-button">
                                <span class="g-button-right">
                                    <em class="ico-font icon-share">&#xe900;</em>
                                    <span class="text">分享</span>
                                </span>
                            </a>
                            <a href="javascript:;" class="g-button">
                                <span class="g-button-right">
                                    <em class="ico-font icon-share">&#xe907;</em>
                                    <span class="text">下载</span>
                                </span>
                            </a>
                            <span class="g-dropdown-button tools-more">
                                <a href="javascript:;" class="g-button">
                                     <span class="g-button-right">
                                        <em class="ico-font icon-share">&#xe913;</em>
                                        <span class="text">更多</span>
                                     </span>
                                </a>
                                <span class="menu">
                                    <a href="javascript:;" class="g-button-menu move">移动到</a>
                                    <a href="javascript:;" class="g-button-menu copy">复制到</a>
                                    <a href="javascript:;" class="g-button-menu rename">重命名</a>
                                    <a href="javascript:;" class="g-button-menu delete">删除</a>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="file-size">${parentChilds[i].type === "folder" ? '-' : yun.fileSize(parentChilds[i].fileSize)}</div>
                <div class="ctime">${$.yunTool.format(parentChilds[i].time)}</div>
            </dd>
        `
    }
    return str;
}
function fnEmptyFolder() {
    let str = `
        <div class="list-empty-tips">
            <div class="clearfix module-list-view-empty">
                <div class="no-result-file-download">
                    <div class="no-result-title no-result-file-bottom">
                        <p class="no-result-file-word">
                            您还没上传过文件哦，点击
                            <span class="up-load upload-wrapper">上传</span>
                            按钮～
                        </p>
                    </div>

                </div>
            </div>
        </div>
    `
    return str;
}


function CreateBreadCrumb(id) {
    let str = '';
    let breadCrumb = OperationData.getParentsById(id).reverse();
    str += `
        <li>
            <a href="javascript:;" data-deep=-1 data-id=-1>返回上一级</a>
            <span class="historylistmanager-separator-gt">|</span>
        </li>
        <li>`
    let len = breadCrumb.length;
    let n = len - 5;
    for (let i = len - 5 > 0 ? len - 5 : 0; i < len; i++) {
        if (i === n) {
            str += `<span title="全部文件">...</span>`
        }
        str += `<a href="javascript:;" data-deep=${i} data-id=${breadCrumb[i].id}> ${breadCrumb[i].name}</a>`
        str += i == len - 1 ? '' : `<span class="historylistmanager-separator-gt">></span>`
    }
    str += `</li>`
    return str;
}


//创建一个列表dom文件夹
function fnCreateFolder() {
    var item = document.createElement('dd');
    var str = `
              <span class="checkbox">
                    <span class="ico-font checksmall"></span>
              </span>
              <div class="fileicon dir-small"></div>
              <div class="file-name">
                    <div class="text">
                        <a href="javascript:;" class="filename">新建文件夹</a>
                    </div>
                    <!--列表hover菜单栏-->
                    <div class="operate">
                        <div class="undefined">
                            <a href="javascript:;" class="g-button">
                                <span class="g-button-right">
                                <em class="ico-font icon-share">&#xe900;</em>
                                <span class="text">分享</span>
                                </span>
                            </a>
                            <a href="javascript:;" class="g-button">
                                <span class="g-button-right">
                                <em class="ico-font icon-share">&#xe907;</em>
                                <span class="text">下载</span>
                                </span>
                            </a>
                            <span class="g-dropdown-button tools-more">
                                <a href="javascript:;" class="g-button">
                                    <span class="g-button-right">
                                    <em class="ico-font icon-share">&#xe913;</em>
                                    <span class="text">更多</span>
                                    </span>
                                </a>
                                <span class="menu">
                                    <a href="javascript:;" class="g-button-menu move">移动到</a>
                                    <a href="javascript:;" class="g-button-menu copy">复制到</a>
                                    <a href="javascript:;" class="g-button-menu rename">重命名</a>
                                    <a href="javascript:;" class="g-button-menu delete">删除</a>
                                </span>
                            </span>
                        </div>
                    </div>
              </div>
              <div class="file-size">-</div>
              <div class="ctime">-</div>
            `
    $(item).html(str)

    return item;
}


