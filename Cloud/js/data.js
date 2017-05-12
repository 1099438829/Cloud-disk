/**
 * Created by zuo on 2017/4/22.
 */
var data = [
    {
        "id": 0,
        "pId": null,
        "maxId": 6,
        "name": "全部文件",
        "fileSize":10,
        "type": "root",
        "del":false,
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
                "del":false,
                "child": [
                    {
                        "id": 3,
                        "pId": 1,
                        "name": "xx",
                        "checked": false,
                        "time": 1490531555720,
                        "fileSize":10,
                        "type": "folder",
                        "cover":"kong",
                        "del":false,
                        "child": []
                    },
                    {
                        "id": 5,
                        "pId": 1,
                        "name": "x",
                        "checked": false,
                        "time": 1490531555720,
                        "fileSize":10,
                        "type": "folder",
                        "cover":"kong",
                        "del":false,
                        "child": []
                    }
                ]
            },
            {
                "id": 2,
                "pId": 0,
                "name": "小电影",
                "checked": false,
                "time": 1490531555720,
                "fileSize":10,
                "type": "folder",
                "cover":"kong",
                "del":false,
                "child": []
            },
            {
                "id": 4,
                "pId": 0,
                "name": "xx",
                "checked": false,
                "time": 1490531555720,
                "fileSize":10,
                "type": "folder",
                "cover":"kong",
                "del":false,
                "child": []
            },
            {
                "id": 6,
                "pId": 0,
                "name": "x",
                "checked": false,
                "time": 1490531555720,
                "fileSize":10,
                "type": "folder",
                "cover":"kong",
                "del":false,
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