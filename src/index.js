const $siteList = $('.siteList')
const $lastLi = $siteList.find('.lastLi')
const $addButton = $('.addButton')

const x = localStorage.getItem('x')           // 先读取你的本地存储获取x对应的值
const xObject = JSON.parse(x)                 // 将字符串转换成对象
const hashMap = xObject || [                   // 如果xObject为空就用我默认的hashMap，第一次为空。
    {
        logo: 'A',
        url: 'https://acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://bilibili.com'
    }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.lastLi)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
    <li class="li">
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
        </div>
            <div class = "close">
            <svg class="icon" aria-hidden="true">
                <use class="use1" xlink:href="#icon-delete"></use>
            </svg>
        </div>
    </li>
    `).insertBefore($lastLi)
        $li.on('click', () => {
            console.log(node.url)
            window.open(node.url)
        })
        // 点击Li跳转到指定页面
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
        // 点击删除按钮删除haspMap中对应的数据，然后重新渲染
    })
}
// 每次渲染页面，先删除增加前的页面，遍历hasMap数组中的数据，放入hashMap

render()
// 先渲染页面

$addButton.on('click', () => {
    let url = window.prompt('请输入你的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({ logo: `${simplifyUrl(url)[0].toUpperCase()}`, logotype: 'text', url: `${url}` })

    render()

})
// 点击新增后，为hashMap增加数据，然后重新渲染页面


window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)

}
// 在页面关闭或刷新前，将hashMap的数据先转成字符串，再存放进localStorage本地存储

const $navList = $('.navList')
const $searchForm = $('.searchForm')
const $header = $('#header')
const $input1 = $header.find('.input')
const $use1 = $header.find('.use1')
$navList.on('click', (e) => {
    const t = e.target
    if (t.id === 'baidu') {
        $searchForm.attr('action', 'https://www.baidu.com/s')
        $input1.attr('name', 'wd')
        $use1.attr('xlink:href', '#icon-baidu')
    } else if (t.id === 'google') {
        $searchForm.attr('action', 'https://www.google.com.hk/search')
        $input1.attr('name', 'q')
        $use1.attr('xlink:href', '#icon-google')

    }

})
// 点击切换搜索浏览器

$(document).on('keypress', (e) => {
    const key = e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

// 键盘事件


