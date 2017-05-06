/**
 * Created by zuo on 2017/4/22.
 */
var data = [
    {
        "id": 0,
        "pId": null,
        "maxId": 3,
        "name": "全部文件",
        "fileSize":10,
        "type": "root",
        "arrange":"dateChanged",
        "child": [
            {
                "id": 1,
                "pId": 0,
                "name": "我的音乐",
                "checked": false,
                "time": 1490531555512,
                "fileSize":5,
                "type": "folder",
                "cover":"kong",
                "child": [
                    {
                        "id": 3,
                        "pId": 1,
                        "name": "岛国某某小电影",
                        "checked": false,
                        "time": 1490531555720,
                        "fileSize":10,
                        "type": "folder",
                        "cover":"kong",
                        "child": []
                    }
                ]
            },
            {
                "id": 2,
                "pId": 0,
                "name": "我的视频",
                "checked": false,
                "time": 1490531555520,
                "fileSize":20,
                "type": "folder",
                "cover":"kong",
                "child": []
            }
        ]
    }
];
var dataContentMenu = [
    {
        'name': 'contentMenu',
        'item': [
            {
                'name': '查看方式',
                'item': [
                    {
                        'name': '缩略图',
                        'item': []
                    },
                    {
                        'name': '列表',
                        'item': []
                    }
                ]
            },
            {
                'name': '排列方式',
                'item': [
                    {
                        'name': '名称',
                        'item': []
                    },
                    {
                        'name': '日期',
                        'item': []
                    }

                ]
            },
            {
                'name': '刷新',
                'item': []
            },
            {
                'name': '新建文件夹',
                'item': []
            }

        ]

    },
    {
        'name': 'folder',
        'item': [
            {
                'name': '打开',
                'item': []
            },
            {
                'name': '移动到',
                'item': []
            },
            {
                'name': '刷新',
                'item': []
            },
            {
                'name': '删除',
                'item': []
            },
            {
                'name': '重命名',
                'item': []
            }
        ]

    }
]