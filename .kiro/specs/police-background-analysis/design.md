# 設計文件

## 概述

台灣警察背景分析網站是一個基於 Angular 20.2.0 的單頁應用程式 (SPA)，採用響應式設計和 SEO 優化策略。系統將現有的文字檔案資料轉換為結構化的 JSON 格式，並提供直觀的使用者介面來瀏覽和分析警察長官的背景資訊。

## 架構

### 整體架構
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前端 (Angular) │    │   資料處理層     │    │   靜態資料檔案   │
│                 │    │                 │    │                 │
│ - 組件系統      │◄──►│ - 資料解析器    │◄──►│ - TXT 檔案      │
│ - 路由管理      │    │ - JSON 轉換器   │    │ - 圖片資源      │
│ - 狀態管理      │    │ - 搜尋索引      │    │ - 組織架構      │
│ - SEO 服務      │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 技術堆疊
- **前端框架**: Angular 20.2.0
- **樣式**: SCSS + CSS Grid/Flexbox
- **路由**: Angular Router (支援 SSR)
- **SEO**: Angular Universal + Meta 服務
- **資料處理**: RxJS + 自定義解析器
- **圖表**: Chart.js 或 D3.js
- **響應式**: CSS Grid + Bootstrap 或自定義 breakpoints

## 組件和介面

### 核心組件架構

#### 1. 應用程式殼層 (App Shell)
```typescript
AppComponent
├── HeaderComponent (導航列)
├── RouterOutlet (主要內容區)
└── FooterComponent (頁尾)
```

#### 2. 頁面組件
```typescript
Pages/
├── HomeComponent (首頁 - 組織架構總覽)
├── DepartmentComponent (分局頁面)
├── OfficerComponent (個人詳細頁面)
├── SearchComponent (搜尋結果頁面)
├── AnalysisComponent (分析頁面)
└── AboutComponent (關於頁面)
```

#### 3. 共用組件
```typescript
Shared/
├── OfficerCardComponent (警官卡片)
├── TimelineComponent (職業時間軸)
├── ChartComponent (統計圖表)
├── SearchBarComponent (搜尋列)
├── BreadcrumbComponent (麵包屑導航)
└── LoadingComponent (載入指示器)
```

### 路由設計
```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'taipei', component: DepartmentComponent },
  { path: 'taipei/:division', component: DepartmentComponent },
  { path: 'officer/:id', component: OfficerComponent },
  { path: 'search', component: SearchComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
```

## 資料模型

### 警官資料模型
```typescript
interface Officer {
  id: string;                    // 唯一識別碼
  name: string;                  // 姓名
  position: string;              // 職稱
  department: string;            // 任職單位
  division?: string;             // 分局名稱
  photoUrl?: string;             // 照片 URL
  education: Education[];        // 學歷
  experience: Experience[];      // 經歷
  appointmentDate: string;       // 任職日期
  sourceUrl: string;             // 資料來源 URL
  lastUpdated: string;           // 最後更新時間
}

interface Education {
  institution: string;           // 學校名稱
  degree: string;               // 學位
  field?: string;               // 科系
  year?: string;                // 畢業年份
}

interface Experience {
  position: string;             // 職位
  department: string;           // 單位
  startDate?: string;           // 開始日期
  endDate?: string;             // 結束日期
  duration?: number;            // 任職期間(月)
}
```

### 組織架構模型
```typescript
interface Department {
  id: string;                   // 部門 ID
  name: string;                 // 部門名稱
  type: 'headquarters' | 'division'; // 部門類型
  parentId?: string;            // 上級部門 ID
  officers: Officer[];          // 現任長官
  subdivisions?: Department[];  // 下級部門
}
```

### 搜尋索引模型
```typescript
interface SearchIndex {
  officers: SearchableOfficer[];
  departments: SearchableDepartment[];
}

interface SearchableOfficer {
  id: string;
  name: string;
  position: string;
  department: string;
  keywords: string[];           // 搜尋關鍵字
  searchText: string;           // 全文搜尋文字
}
```

## 資料處理流程

### 1. 資料解析器 (Data Parser)
```typescript
class DataParserService {
  parseOfficerFile(content: string): Officer;
  parseAllFiles(): Promise<Officer[]>;
  generateSearchIndex(officers: Officer[]): SearchIndex;
  buildDepartmentStructure(officers: Officer[]): Department[];
}
```

### 2. 資料轉換流程
```
TXT 檔案 → 解析器 → 驗證 → JSON 格式 → 搜尋索引 → 快取
```

### 3. 檔案命名規則解析
- 格式: `{單位}-{職稱}-{姓名}{任職日期}.txt`
- 範例: `中正第一分局-分局長-陳瑞基114-08-01.txt`

## 響應式設計

### Breakpoints
```scss
$breakpoints: (
  mobile: 320px,
  tablet: 768px,
  desktop: 1024px,
  large: 1440px
);
```

### 佈局策略
- **手機 (< 768px)**: 單欄垂直佈局，卡片式設計
- **平板 (768px - 1024px)**: 雙欄佈局，側邊導航摺疊
- **桌面 (> 1024px)**: 三欄佈局，完整導航和側邊欄

### 關鍵 UI 組件響應式設計
```scss
.officer-grid {
  display: grid;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## SEO 優化策略

### 1. Meta 標籤管理
```typescript
class SeoService {
  updatePageMeta(officer: Officer): void;
  generateStructuredData(officer: Officer): any;
  updateOpenGraphTags(officer: Officer): void;
}
```

### 2. URL 結構
- 首頁: `/`
- 分局: `/taipei/{division-name}`
- 個人: `/officer/{officer-name}-{id}`
- 搜尋: `/search?q={query}`

### 3. 結構化資料 (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "陳瑞基",
  "jobTitle": "分局長",
  "worksFor": {
    "@type": "Organization",
    "name": "臺北市政府警察局中正第一分局"
  }
}
```

### 4. 預渲染策略
- 使用 Angular Universal 進行伺服器端渲染
- 為重要頁面生成靜態 HTML
- 實作 sitemap.xml 和 robots.txt

## 錯誤處理

### 1. 資料錯誤處理
```typescript
class ErrorHandlingService {
  handleParseError(file: string, error: Error): void;
  handleMissingData(officerId: string): Officer | null;
  logDataInconsistency(issue: string): void;
}
```

### 2. 使用者體驗錯誤處理
- 404 頁面: 自定義找不到頁面
- 載入錯誤: 重試機制和錯誤訊息
- 搜尋無結果: 建議相關搜尋

### 3. 效能錯誤處理
- 圖片載入失敗: 預設佔位圖
- 慢速網路: 漸進式載入
- 記憶體管理: 虛擬滾動和分頁

## 測試策略

### 1. 單元測試
- 資料解析器測試
- 組件邏輯測試
- 服務功能測試

### 2. 整合測試
- 路由導航測試
- 資料流測試
- SEO 功能測試

### 3. E2E 測試
- 使用者流程測試
- 響應式設計測試
- 效能測試

### 4. 無障礙測試
- WCAG 2.1 AA 標準
- 螢幕閱讀器相容性
- 鍵盤導航測試

## 效能優化

### 1. 載入優化
- 延遲載入 (Lazy Loading)
- 圖片優化和 WebP 格式
- 資料預載和快取

### 2. 渲染優化
- OnPush 變更檢測策略
- TrackBy 函數優化
- 虛擬滾動處理大量資料

### 3. 打包優化
- Tree Shaking 移除未使用程式碼
- 程式碼分割和動態匯入
- 壓縮和最小化

## 安全性考量

### 1. 資料安全
- 輸入驗證和清理
- XSS 防護
- 敏感資訊遮蔽

### 2. 隱私保護
- 個人資料最小化原則
- 資料來源透明化
- 使用者同意機制

### 3. 內容安全
- Content Security Policy (CSP)
- 圖片來源驗證
- 外部連結安全檢查