# Checklist

## 背景与卡片
- [x] 主内容卡片背景 #FFFFFF，边框 #DCE8F2
- [x] 统计卡片背景 #FFFFFF，边框 #DCE8F2
- [x] 数据集卡片背景 #FFFFFF，边框 #DCE8F2，hover 边框 #00B4D8
- [x] 空状态/无结果卡片背景 #FFFFFF

## 文字色
- [x] 主标题 "数据作品集" #1A2A3A
- [x] 描述文字 #6B8CAE
- [x] "我的数据集"标题 #1A2A3A
- [x] "已导入"文字 #6B8CAE
- [x] 统计标签 #6B8CAE
- [x] 数据集标题 #1A2A3A
- [x] 数据集描述/辅助文字 #6B8CAE
- [x] "查看详情" #6B8CAE，hover #00B4D8
- [x] Footer #6B8CAE

## 强调色
- [x] 导入按钮背景 #00B4D8，文字白色
- [x] 统计数字 #00B4D8
- [x] "返回封面"按钮 #00B4D8 文字
- [x] 装饰线使用青蓝渐变

## 搜索框
- [x] 背景 #FFFFFF，文字 #1A2A3A，边框 #DCE8F2
- [x] 聚焦边框 #00B4D8
- [x] 搜索图标 #6B8CAE

## 其他
- [x] 删除对话框：在 #datasets 作用域外，保持现状（有 bg-black/70 遮罩）
- [x] 所有覆盖限定在 `#datasets` 作用域内
- [x] WelcomePage / ProjectDetailPage 不受影响
- [x] 深色模式不受影响

## 验证
- [x] `npx tsc --noEmit` 无错误
- [x] `npx vite build` 成功
- [x] 变更已提交并推送到 origin/main
