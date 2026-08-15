# Checklist

## 背景与卡片
- [ ] 主内容卡片背景 #FFFFFF，边框 #DCE8F2
- [ ] 统计卡片背景 #FFFFFF，边框 #DCE8F2
- [ ] 数据集卡片背景 #FFFFFF，边框 #DCE8F2，hover 边框 #00B4D8
- [ ] 空状态/无结果卡片背景 #FFFFFF

## 文字色
- [ ] 主标题 "数据作品集" #1A2A3A
- [ ] 描述文字 #6B8CAE
- [ ] "我的数据集"标题 #1A2A3A
- [ ] "已导入"文字 #6B8CAE
- [ ] 统计标签 #6B8CAE
- [ ] 数据集标题 #1A2A3A
- [ ] 数据集描述/辅助文字 #6B8CAE
- [ ] "查看详情" #6B8CAE，hover #00B4D8
- [ ] Footer #6B8CAE

## 强调色
- [ ] 导入按钮背景 #00B4D8，文字白色
- [ ] 统计数字 #00B4D8
- [ ] "返回封面"按钮 #00B4D8 文字
- [ ] 装饰线使用青蓝渐变

## 搜索框
- [ ] 背景 #FFFFFF，文字 #1A2A3A，边框 #DCE8F2
- [ ] 聚焦边框 #00B4D8
- [ ] 搜索图标 #6B8CAE

## 其他
- [ ] 删除对话框白天模式：背景 #FFFFFF，文字深色
- [ ] 所有覆盖限定在 `#datasets` 作用域内
- [ ] WelcomePage / ProjectDetailPage 不受影响
- [ ] 深色模式不受影响

## 验证
- [ ] `npx tsc --noEmit` 无错误
- [ ] `npx vite build` 成功
- [ ] 变更已提交并推送到 origin/main
