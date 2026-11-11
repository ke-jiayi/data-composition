# Checklist

- [x] 按钮父容器为 `grid grid-cols-3 gap-4 w-full max-w-xl ml-auto`
- [x] 三个按钮不再包含 `w-32` / `min-w-[130px]` / `shrink-0`
- [x] 三个按钮均带 `w-full h-10 px-4 rounded-lg` 且高度一致
- [x] 三个按钮均使用 `flex items-center justify-center text-sm font-medium`
- [x] 「对比分析」带 `ri-bar-chart-box-line` 图标
- [x] 「导入数据」带 `ri-upload-cloud-2-line` 图标，文本为「导入数据」，导入中显示「导入中...」
- [x] 「新建文件夹」带 `ri-folder-add-line` 图标，原「+ 」已移除
- [x] 三个按钮实测宽度完全相等，间距一致
- [x] 窄屏时按钮组换行且不溢出
- [x] 配色（紫粉渐变 / 紫青渐变 / 深色青边框）与 hover、disabled 效果保持
- [x] 「对比分析」跳转 `/comparison`，「导入数据」触发导入，「新建文件夹」打开弹窗
- [x] `npm run lint` 与 `npm run build` 通过
- [x] 未执行 git push
