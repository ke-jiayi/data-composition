# Checklist

- [x] `Dataset` 接口包含 `order?: number`
- [x] 新增 `reorderDatasets` 并在 `useDB` 中正确暴露
- [x] `reorderDatasets` 先读取、后在同一事务内批量写入 `order`
- [x] 首页数据集列表按 order 升序渲染，无 order 的旧数据按 createdAt 倒序排在后面
- [x] 数据集卡片支持拖拽排序，拖到另一数据集卡片时交换位置
- [x] 排序结果写入 IndexedDB，刷新后顺序保持
- [x] 仅同层级排序，不影响其他文件夹/根目录数据集
- [x] 拖拽悬停时目标数据集卡片出现青色高亮，结束后清除
- [x] 拖到自身不产生变更
- [x] 数据集拖到文件夹卡片仍执行「移入文件夹」
- [x] 文件夹拖到数据集卡片不产生变更
- [x] `npm run lint` 与 `npm run build` 通过
- [x] 未执行 git push
