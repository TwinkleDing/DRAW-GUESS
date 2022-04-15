import { RouterItem } from "@/utils/interface"

const routeList: RouterItem[] = [
    {
        path: "/home",
        name: "home",
        meta: {
            label: "首页",
            icon: "help",
            permission: true
        },
        component: "home"
    },
    {
        path: "/nested",
        name: "nested",
        redirect: "/nested1",
        meta: {
            label: "嵌套路由",
            icon: "icon-menu",
            permission: true
        },
        children: [
            {
                path: "/nested1",
                name: "nested1",
                redirect: "/nested11",
                meta: {
                    label: "嵌套路由1",
                    icon: "icon-menu",
                    permission: true
                },
                children: [
                    {
                        path: "/nested11",
                        name: "nested11",
                        meta: {
                            label: "嵌套路由1-1",
                            icon: "coordinate",
                            permission: true
                        },
                        component: "nested11"
                    },
                    {
                        path: "/nested12",
                        name: "nested12",
                        meta: {
                            label: "嵌套路由1-2",
                            icon: "coordinate",
                            permission: true
                        },
                        component: "nested12"
                    }
                ]
            },
            {
                path: "/nested2",
                name: "nested2",
                meta: {
                    label: "嵌套路由2",
                    icon: "coordinate",
                    permission: true
                },
                component: "nested2"
            }
        ]
    },
    {
        path: "/charts",
        name: "charts",
        meta: {
            label: "图表展示",
            icon: "histogram",
            permission: true
        },
        component: "charts"
    },
    {
        path: "/model",
        name: "model",
        meta: {
            label: "模型预览",
            icon: "school",
            permission: true
        },
        component: "model"
    },
    {
        path: "/permission",
        name: "permission",
        meta: {
            label: "角色权限",
            icon: "setting",
            permission: true
        },
        component: "permission"
    },
    {
        path: "/my",
        name: "my",
        meta: {
            label: "我的信息",
            icon: "postcard",
            permission: true
        },
        component: "my"
    }
]

export default routeList
