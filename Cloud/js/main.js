/**
 * Created by zuo on 2017/4/22.
 */
//结构生成

//添加事件
;(function ($) {

    window.oGridView = $('.frame-main .grid-view-container .grid-view');//缩略图变量
    window.oListView = $('.frame-main .list-view-container .list-view');//列表变量
    window.oBreadCrumb = $('.frame-main .historylistmanager-history ');//面包屑

    window.oStatus = null;//新建文件夹或者重命名是的状态

    window.oFrameMain = $('.frame-main');//右侧菜单

    let oFrameMainWidth = oFrameMain[0].offsetWidth;//右侧菜单的宽度

    //缩略图和列表切换 按钮
    let listSwitch = $('.frame-main .default-dom .list-switch');
    let gridSwitch = $('.frame-main .default-dom .grid-switch');
    // 文件模式-下面
    let gridViewContainer = $('.grid-view-container');
    let listviewContainer = $('.list-view-container');
    //导航栏 模式信息
    let gridCols = $('.module-list .list-view-header .grid-cols');
    let listCols = $('.module-list .list-view-header .list-cols');

    //切换缩略图或者列表
    listSwitch.on('click', fnTabTypeFolder);
    gridSwitch.on('click', fnTabTypeFolder);
    function fnTabTypeFolder() {
        listSwitch.toggleClass('show');
        gridSwitch.toggleClass('show');
        gridViewContainer.toggleClass('show');
        listviewContainer.toggleClass('show');
        $('.module-list .grid-cols').toggleClass('show');
        $('.module-list .list-cols').toggleClass('show');
    }

    //------------------------------------------------------------------------------------
    //文件夹选中事件委托
    gridViewContainer.on('click', '.checkgridsmall', fnFolderChecked);
    listviewContainer.on('click', 'dd', fnFolderChecked);
    //文件夹选中关联
    function fnFolderChecked(event) {
        //文件夹子集
        let folderChilds = fnFolderCheckedChilds();
        //获取到文件
        let parent = $(this).is('span') ? $(this).parent().parent() : $(this);
        let _position = parent.attr('_position');
        let isType = !folderChilds[0].eq(_position).hasClass('item-active') ? 'addClass' : 'removeClass';
        folderChilds[0].eq(_position)[isType]('item-active');
        folderChilds[1].eq(_position)[isType]('item-active');
        let isAll = fnIsAllchecked(folderChilds[0]) ? 'addClass' : 'removeClass';
        $('.frame-main .grid-cols .check-icon')[isAll]('all-folder');
        fnFolderCheckedInfo()//选中信息
    }

    //全选文件夹
    $('.frame-main .grid-cols .check-icon').on('click', fnFolderAllChecked);
    $('.frame-main .list-cols .check-icon').on('click', fnFolderAllChecked);

    //缩略图新建文件夹
    let moduleEdite = $('.module-edit-name');

    function fnFolderAllChecked() {
        if (!$(this).hasClass('all-folder')) {
            $('.grid-cols .check-icon').addClass('all-folder');
            $('.list-cols .check-icon').addClass('all-folder');
        } else {
            $('.grid-cols .check-icon').removeClass('all-folder');
            $('.list-cols .check-icon').removeClass('all-folder');
        }
        fnAllChecked(this);
        fnFolderCheckedInfo()//选中信息
    }

    //全选或全不选
    function fnAllChecked(obj) {
        let folderChilds = fnFolderCheckedChilds();
        let isAll = '';
        if ($(obj).hasClass('all-folder')) {
            isAll = 'addClass';
        } else {
            isAll = 'removeClass';
        }
        for (let i = 0, len = folderChilds[0].length; i < len; i++) {
            folderChilds[0].eq(i)[isAll]('item-active');
            folderChilds[1].eq(i)[isAll]('item-active');
        }
        fnFolderCheckedInfo()
    }

    //判断是否全选
    function fnIsAllchecked(obj) {
        return obj.length === obj.filter(function (index, item) {
                return $(item).hasClass('item-active');
            }).length;
    }

    //判断选中的是几个
    function fnFolderCheckedNum(obj) {
        return obj.filter(function (index, item) {
            return $(item).hasClass('item-active');
        }).length;
    }

    //全选或者选中的时候显示
    function fnFolderCheckedInfo() {
        //文件夹子集
        let folderChilds = fnFolderCheckedChilds();
        let checkedNum = fnFolderCheckedNum(folderChilds[0]);
        fnRenameState(checkedNum)//重名状态
        let listViewHeader = $('.frame-main .list-view-header');
        let ischeckedInfo = checkedNum !== 0 ? 'addClass' : 'removeClass';
        listViewHeader[ischeckedInfo]('list-header-operatearea');
        listViewHeader.find('.list-header .list-header-operatearea').html(`已选中${checkedNum}个文件/文件夹`)
    }


    //获取当前视图的childs文件
    function fnFolderCheckedChilds() {
        let gridViewChilds = gridViewContainer.find('.grid-view-item');
        let listviewChilds = listviewContainer.find('dd');
        return [gridViewChilds, listviewChilds]
    }

    //取消全选状态
    function fnCancelAllForder() {
        $('.frame-main .list-view-header').removeClass('list-header-operatearea');
        $('.frame-main .grid-cols .check-icon').removeClass('all-folder');
    }

    //重名名状态
    function fnRenameState(num) {
        let upRename = $('.frame-main .button-box-mark a').eq(3);
        if (num !== 1) {
            upRename.addClass('g-disabled')
        } else {
            upRename.removeClass('g-disabled')
        }
    }


    //-------------------------------------------------------------------------------------------------------

    //文件夹双击进入文件夹或打开文件事件委托

    gridViewContainer.on('dblclick', '.grid-view-item', fnDblclickChecked);
    listviewContainer.on('dblclick', 'dd', fnDblclickChecked);
    function fnDblclickChecked(event) {
        let id = $(this).data('id');
        let Suffix = $(this).find('.filename').attr('title')
        let type = Suffix.lastIndexOf('.') === -1 ? 'folder' : Suffix.slice(Suffix.lastIndexOf('.') + 1);

        switch (type) {
            case 'folder':
                fnEnterFolder(id, Suffix)
                break;
        }
    }

    //进入文件夹
    function fnEnterFolder(id) {
        fnCancelAllForder();
        currentData = createHtml(id);
    }

    //面包屑事件委托
    oBreadCrumb.on('click', 'a', fnbreadCrumbInfo);
    function fnbreadCrumbInfo(event) {
        let lastId = oBreadCrumb.find('a');
        let lid = lastId.last().data('id');
        let pid = lastId.last().prev().data('id')
        let deep = $(this).data('deep');
        let id = $(this).data('id');
        let prevId = lid + deep;
        if (deep === -1 && id !== 0) {
            currentData = createHtml(prevId);
        } else {
            currentData = createHtml(id);
        }
    }

    //----------------------------------------------------------------------------------------
    //新建文件夹

    $('.frame-main .bar .tools a').last().on('click', fnNewFolder);
    function fnNewFolder() {
        if ($.yunTool.isNewFolder()) return false;
        let type = gridViewContainer.hasClass('show') ? 'grid' : 'list';
        let oInput = moduleEdite.find('input');
        oStatus = oInput;
        oInput.val('新建文件夹');
        if (type === 'grid') {
            moduleEdite.addClass('show');
            moduleEdite.addClass('module-edit-name-grid');
            moduleEdite.addClass('grid-dir-large');
            fnCancelNEW(fnGridChilds(), 'newFolder', oFrameMainWidth)//添加后渲染页面
        } else {
            moduleEdite.addClass('show')
            let newFolder = fnCreateFolder(type)
            oListView.prepend(newFolder)
        }
        oInput.focus();
    }

    //取消新建文件夹
    moduleEdite.find('.cancel').on('click', fnCancel);
    function fnCancel() {
        if (moduleEdite.hasClass('module-edit-name-grid')) {
            moduleEdite.removeClass('show');
            moduleEdite.removeClass('module-edit-name-grid');
            moduleEdite.removeClass('grid-dir-large');
            fnCancelNEW(fnGridChilds(), '', oFrameMainWidth)//重新渲染页面
        } else {
            moduleEdite.removeClass('show');
            oListView.find('dd:first').remove();
        }
        oStatus = null;
        fnTip('取消新建文件夹')
    }


    //缩略模式取消文件夹 重新计算
    function fnCancelNEW(childs, type, Width) {
        oGridView.html('');
        let ele = $.yunTool.RenderingFolder(childs, type, Width);
        for (let i = 0; i < ele.length; i++) {
            oGridView.append(ele[i])
        }
    }

    //确定新建文件夹
    moduleEdite.find('.sure').on('click', function () {
        let value = $(this).prev().val().trim();
        let id = fnCurrentViewId();
        //判断名字是否重复了
        if ($.yunTool.isNameRepetition(currentData, value)) {
            console.log('重复了');
            let newName = $.yunTool.newFolderName(currentData, value)
            fnNewFolderAdd(id, newName)
        } else {
            fnNewFolderAdd(id, value)
        }

    });
    //-------------------------------------------------------------------------------------
    //删除文件
    $('.frame-main .button-box-mark a').eq(2).on('click', fnDleFolder);

    function fnDleFolder() {
        let checks = fnGridChilds().filter(function (index, item) {
            return $(item).hasClass('item-active')
        });

        if (checks.length) {
            let idInfo = checks.map(function (index, item) {
                return $(item).data('id')
            });
            let del = $.Message({
                okFun: function () {
                    fnDleFolderAffirm(idInfo);
                    this.dialog.remove();
                }
            });
        }


        //console.log(del)
    }

    //确认删除
    function fnDleFolderAffirm(info) {
        let curId = fnCurrentViewId();
        let newInfo = OperationData.delFoderData(info, curId)
        if (newInfo) {
            currentData = createHtml(curId);
            fnCancelAllForder();
        }
    }

    //------------------------------------------------------------------------------------
    //重命名

    $('.frame-main .button-box-mark a').eq(3).on('click', fnReFolder);

    function fnReFolder(ev) {
        let ele = null;
        let type = gridViewContainer.hasClass('show') ? 'grid' : 'list';
        let children = fnGridChilds().filter(function (index, item) {
            return $(item).hasClass('item-active');
        });
        if (children.length === 1) {
            if (type === 'grid') {
                ele = children.eq(0);
            } else {
                ele = fnListChilds().filter(function (index, item) {
                    return $(item).hasClass('item-active');
                }).eq(0);
            }
            let id = ele.data('id');
            let fileName = ele.find('.file-name');
            fileName.addClass('rename');
            let oInput = ele.find('.filename-input');
            let oName = ele.find('.filename').html().trim();
            let oCancel = ele.find('.filename-cancel');
            let oConfirm = ele.find('.filename-confirm');
            oInput.val(oName);
            oInput.select();
            oInput.focus();
            oStatus = oInput;
            oCancel.on('click', fnCancelRenameFolder.bind(fileName));
            oConfirm.on('click', fnNewNameFolder.bind(fileName, oInput, oName, id));

        }
    }

    function fnCancelRenameFolder() {
        this.removeClass('rename');
        oStatus = null;
    }

    function fnNewNameFolder(oInput, oldName, id) {
        let newName = oInput.val().trim();
        if (newName === '' || newName === oldName) {
            this.removeClass('rename');
            fnTip('取消文件重命名')
            oStatus = null;
            return;
        }

        let repetition = false;

        let children = fnGridChilds().map(function (index, item) {
            return $(this).find('.filename').html().trim()
        });
        for (let i = 0, len = children.length; i < len; i++) {
            if (children[i] === newName) {
                repetition = true;
                break;
            }
        }
        if (repetition) {
            fnRepetitionNameFolder(children, newName, id);
            return false;
        }

        let state = OperationData.renameFolder(newName, id);
        if (state) {
            fnTip('修改文件名字成功')
            currentData = createHtml(fnCurrentViewId());
            oStatus = null;
        }
    }

    function fnRepetitionNameFolder(children, newName, id) {
        let repetitionNameTip = $.Message({
            title: '温馨提示',
            content: '<div style="text-align:center;padding:40px 22px 22px 22px;">检测到本文件夹下文件名字有重复!</div>',
            okValue: '保留两个',
            okFun: function () {
                fnNewRepetitionName(children, newName, id);
                this.dialog.remove();
            }
        });


    }

    function fnNewRepetitionName(children, newName, id) {
        let oNewName = $.yunTool.newFolderName(children, newName);
        let state = OperationData.renameFolder(oNewName, id);
        if (state) {
            fnTip('修改文件名字成功')
            currentData = createHtml(fnCurrentViewId());
            oStatus = null;
        }
    }

    //--------------------------------------------------------------------------------------
    //移动到
    $('.frame-main .button-box-mark a').eq(5).on('click', fnMoveFolder);

    function fnMoveFolder() {
        console.log('移动')
    }


    //-------------------------------------------------------------------------------------
    //提示消息
    function fnTip(info) {
        let tip = $('#module-tip');
        tip.find('.tip-msg').html(info);
        tip.css({
            top: 60,
            left: '50%',
            marginLeft: -Math.floor(tip.width() / 2),
            display: 'block',
            height: 0
        });
        tip.animate({height: 27}, 200, 'linear', function () {
            setTimeout(rollBack, 600)
        });
        function rollBack() {
            tip.animate({height: 0}, 200, 'linear', function () {
                tip.css({display: 'none'})
            })
        }

    }

    //新建文件夹到data并且重新渲染页面
    function fnNewFolderAdd(id, value) {
        OperationData.addFoderData(OperationData.AddFolderInfo(id, value), id)
        currentData = createHtml(id);
        fnCancel()//取消新建文件夹状态
        fnTip('新建文件夹成功')
    }

    //获取到当前视图的id
    function fnCurrentViewId() {
        let ells = oBreadCrumb.find('a');
        if (!ells.length) {
            return 0;
        }
        return ells.last().data('id');
    }

    //获取缩略图下面所有的文件元素
    function fnGridChilds() {
        return gridViewContainer.find('.grid-view-item');
    }

    //获取列表写所有元素
    function fnListChilds() {
        return listviewContainer.find('dd');
    }

    //--------------------------------------------------------------------------------------
})(jQuery);


window.currentData = createHtml(0);

//渲染页面
function createHtml(id) {
    let current = fnCreateGridViewFile(id);//缩略图模式
    fnCreateListViewFile(id)
    fnCreateBreadCrumbInfo(id)
    return current;
}
