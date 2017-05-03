/**
 * Created by zuo on 2017/4/22.
 */
//结构生成

//添加事件
;(function ($) {

    window.oGridView = $('.frame-main .grid-view-container .grid-view');//缩略图变量
    window.oListView = $('.frame-main .list-view-container .list-view');//列表变量
    window.oBreadCrumb = $('.frame-main .historylistmanager-history ');//面包屑

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
    let moduleEdite = $('.module-edit-name')


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

    //文件夹双击进入文件夹或打开文件事件委托
    gridViewContainer.on('dblclick', '.grid-view-item', fnDblclickChecked);
    // listviewContainer.on('click', 'dd', fnFolderChecked);

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
        //let newData = Incoming.getChildById(data, id);
        //let dataChilds = Incoming.getChildById(data, id)
        currentData = createHtml(data, id);

    }

    //面包屑事件委托
    oBreadCrumb.on('click', 'a', fnbreadCrumbInfo)
    //面包屑
    function fnbreadCrumbInfo(event) {
        let lastId = oBreadCrumb.find('a');
        let lid = lastId.last().data('id');
        let pid = lastId.last().prev().data('id')
        let deep = $(this).data('deep');
        let id = $(this).data('id');

        let prevId = lid + deep;

        if (deep === -1 && id !== 0) {
            currentData = createHtml(data, prevId);
        } else {
            currentData = createHtml(data, id);
        }
    }

    //新建文件夹
    let oNewFolderBtn = $('.frame-main .bar .tools a').last();
    oNewFolderBtn.on('click', fnNewFolder)

    function fnNewFolder() {
        let type = gridViewContainer.hasClass('show') ? 'grid' : 'list';
        if (type === 'module-edit-name-grid') {
            moduleEdite.addClass('show')
            moduleEdite.addClass('module-edit-name-grid')
            moduleEdite.addClass('grid-dir-large')

            gridSwitch.html($.yunTool.RenderingFolder(fnGridChilds(), 'newFolder', oFrameMainWidth))//添加后渲染页面
        } else {
            moduleEdite.addClass('show')
            let newFolder = fnCreateFolder(type)
            oListView.prepend(newFolder)

        }

    }

    //取消新建文件夹
    moduleEdite.find('.cancel').on('click', function () {
        console.log(123)
        if (moduleEdite.hasClass('module-edit-name-grid')) {
            moduleEdite.removeClass('show')
            moduleEdite.removeClass('module-edit-name-grid')
            moduleEdite.removeClass('grid-dir-large')

        } else {
            moduleEdite.removeClass('show');

        }
        fnCancelNEW(fnGridChilds(), oFrameMainWidth)
    });

    function fnCancelNEW(childs, width) {

        gridSwitch.html($.yunTool.RenderingFolder(childs, '', oFrameMainWidth))

    }

    //获取缩略图下面所有的文件元素
    function fnGridChilds() {
        return gridViewContainer.find('.grid-view-item');
    }
})(jQuery);


//数据的方法
let Incoming = new ManipulationData()

var currentData = createHtml(data, 0);

//渲染页面
function createHtml(data, id) {
    let current = fnCreateGridViewFile(data, id);//缩略图模式
    fnCreateListViewFile(data, id)
    fnCreateBreadCrumbInfo(data, id)
    return current;
}
