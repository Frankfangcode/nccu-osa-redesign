# 政大學務處網站重新設計（原型）

國立政治大學學生事務處網站的前端重新設計原型：任務導向的資訊架構、編輯風格視覺、深色模式、醒目的 24 小時緊急聯絡。

> 非官方網站。內容與電話尚待與 [原站](https://osa.nccu.edu.tw/tw/) 核對，詳見 [docs/ia.md](docs/ia.md)。

- 線上預覽：https://frankfangcode.github.io/nccu-osa-redesign/
- 研究：[docs/research.md](docs/research.md)（美日六校學務網站模式）
- 資訊架構：[docs/ia.md](docs/ia.md)
- 設計審查與無障礙稽核：[docs/review.md](docs/review.md)

## 開發
```bash
npm install
npm run dev      # http://localhost:4321/nccu-osa-redesign/
npm run build    # 輸出到 dist/
```
資料集中在 `src/data/site.ts`；推送到 `main` 後由 GitHub Actions 建置並發佈到 `gh-pages` 分支。
