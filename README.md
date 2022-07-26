# 安装

```
npm install --save-dev  @2345mfe/read-excel-json
```

# 使用

```
import { ReadExcel2Json } from './index';

const radExcel2Json = new ReadExcel2Json()
radExcel2Json('./excel', './excel/data.json')

```

# excel输出json结构

```
{
    "data.json": [],
    "demo.xlsx": [
        {
            "媒体名称": "日历",
            "日活": "1万",
            "广告位类型": "开屏",
            "对接方式": "API",
            "所属行业": "工具",
            "广告请求发送形式": "S2S",
            "是否支持deeplink": "是",
            "是否支持302跳转": "是",
            "是否支持点击坐标宏替换": "是",
            "是否支持二次下载宏替换": "是"
        }
    ]
}
```
