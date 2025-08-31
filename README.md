# 台北市警察局人事查詢系統

一個基於 Angular 18.2.0 開發的台北市警察局人事資料查詢系統，提供透明化的政府人事資訊。

## 📋 專案背景

本系統源於 114年8月30日民眾黨遊行期間，中正第一分局局長陳瑞基在現場提醒民眾相關法規時，被質疑其政治背景一事。為促進政府透明度與民主監督，開發此系統提供完整的警察人事資料供民眾查詢。

## ✨ 主要功能

- 🔍 **人員搜尋**: 支援姓名、分局、職位等關鍵字搜尋
- 📋 **分局篩選**: 可依據不同分局進行人員篩選
- 🏷️ **職位分類**: 依據局長、副局長、分局長分類顯示
- 📱 **響應式設計**: 完整支援桌面、平板、手機等裝置
- 🎯 **SEO 優化**: 完整的 meta 標籤和結構化資料

## 🚀 技術特色

### 前端框架
- **Angular 20.2.0** - 最新版本的 Angular 框架
- **Standalone Components** - 使用獨立元件架構
- **TypeScript** - 強型別開發語言
- **RxJS** - 響應式程式設計

### SEO 優化
- 完整的 meta 標籤設定
- Open Graph 和 Twitter Card 支援
- 結構化資料 (JSON-LD)
- 語義化 HTML 結構

### 響應式設計
- CSS Grid 和 Flexbox 佈局
- 手機優先設計原則
- 支援各種螢幕尺寸
- 觸控裝置友善介面

## 📁 專案結構

```
src/
├── app/
│   ├── components/          # 共用元件
│   ├── models/             # 資料模型
│   │   └── police-officer.model.ts
│   ├── pages/              # 頁面元件
│   │   └── police-personnel/
│   ├── services/           # 服務層
│   │   ├── police-data.service.ts
│   │   └── seo.service.ts
│   └── shared/             # 共享模組
├── assets/
│   ├── data/              # 警察人事資料
│   │   └── 台北市/
│   └── images/            # 圖片資源
└── environments/          # 環境設定
```

## 🛠️ 安裝與執行

### 系統需求
- Node.js >= 18.19.0
- npm >= 8.0.0

### 安裝步驟

1. 複製專案
```bash
git clone <repository-url>
cd tw-police
```

2. 安裝相依套件
```bash
npm install
```

3. 啟動開發伺服器
```bash
npm start
```

4. 開啟瀏覽器至 `http://localhost:4200`

### 建置生產版本
```bash
npm run build
```

## 📊 資料結構

人員資料格式：
```typescript
interface PoliceOfficer {
  id: string;              // 唯一識別碼
  name: string;            // 姓名
  position: string;        // 職位 (局長/副局長/分局長)
  unit: string;            // 任職單位
  photoUrl?: string;       // 照片網址
  education: string[];     // 學歷
  experience: string[];    // 經歷
  appointmentDate: string; // 任職日期
  refUrl?: string;         // 參考資料來源
  isHighlighted?: boolean; // 是否特別標示
}
```

## 🎨 設計特色
https://colorhunt.co/palette/113f6734699a58a0c8fdf5aa
### 色彩配置
- 主色調：#2a5298 (政府藍)
- 強調色：#ff6b6b (警示紅)
- 背景色：#f5f5f5 (淺灰)

#113F67
#34699A
#58A0C8
#FDF5AA

### 字體
- 主要字體：Microsoft JhengHei
- 備用字體：Arial, sans-serif

### 元件設計
- 卡片式設計提升可讀性
- 漸層背景增加視覺層次
- hover 效果提升互動體驗

## 📱 響應式斷點

- **桌面版**: >= 1200px
- **平板版**: 768px - 1199px
- **手機版**: <= 767px
- **小手機**: <= 480px

## 🔍 SEO 優化項目

- [x] 語義化 HTML 標籤
- [x] meta description 和 keywords
- [x] Open Graph 標籤
- [x] Twitter Card 標籤
- [x] 結構化資料 (Schema.org)
- [x] 適當的標題層級 (H1-H6)
- [x] alt 屬性為圖片
- [x] 載入效能優化

## 📈 效能優化

- **延遲載入**: 圖片使用 loading="lazy"
- **程式碼分割**: 使用 Angular 的路由層級程式碼分割
- **Tree Shaking**: 自動移除未使用的程式碼
- **AOT 編譯**: 提前編譯優化

## 🧪 測試

```bash
# 執行單元測試
npm run test

# 執行 e2e 測試
npm run e2e

# 檢查程式碼品質
npm run lint
```

## 🚀 部署

### 靜態網站部署
1. 建置專案: `npm run build`
2. 將 `dist/` 資料夾部署至靜態網站主機

### GitHub Pages 部署
```bash
ng deploy --base-href=/tw-police/
```

## 🤝 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## ⚠️ 免責聲明

本系統僅供資訊查詢使用，所有資料來源均為台北市政府警察局官方網站公開資訊。如有資料更新需求，請洽相關政府單位。

## 📞 聯絡資訊

- **專案維護者**: Taiwan Police Personnel System
- **問題回報**: 請透過 GitHub Issues
- **功能建議**: 歡迎提出 Pull Request

---

**打造透明政府，促進民主監督** 🏛️✨