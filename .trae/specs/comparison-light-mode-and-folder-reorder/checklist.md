# Checklist

- [x] 对比页标题浅色模式为 `text-[#00B4D8]`，深色模式为 `dark:text-[#6BC5E8]`
- [x] 对比页下拉框为 `bg-white dark:bg-[#1E1E24]`，文字与边框均做双主题适配
- [x] `Folder` 接口包含 `order?: number`
- [x] `createFolder` 为新建文件夹写入递增 `order`
- [x] `getAllFolders` 按 `order` 升序返回，旧数据缺失 `order` 时自动补齐
- [x] 新增 `reorderFolders` 并在 `useDB` 中正确暴露
- [x] 文件夹卡片可拖拽，拖拽数据使用独立 MIME `application/x-folder-id`
- [x] 拖到另一文件夹后两者交换位置并持久化
- [x] 刷新页面后文件夹顺序保持
- [x] 拖拽悬停时目标文件夹青色边框+发光高亮，结束后清除
- [x] 数据集拖入文件夹的原有功能仍正常，不触发排序
- [x] 文件夹拖到自身不产生变更
- [x] `npm run lint` 与 `npm run build` 通过
- [x] 未执行 git push
