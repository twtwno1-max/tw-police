import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PoliceDataService } from '../../services/police-data.service';
import { SeoService } from '../../services/seo.service';
import { PoliceOfficer, SearchCriteria } from '../../models/police-officer.model';

@Component({
  selector: 'app-police-personnel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './police-personnel.component.html',
  styleUrls: ['./police-personnel.component.scss']
})
export class PolicePersonnelComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  filteredOfficers$: Observable<PoliceOfficer[]>;
  units$: Observable<string[]>;
  positions$: Observable<string[]>;
  statistics$: Observable<{[key: string]: number}>;
  highlightedOfficers$: Observable<PoliceOfficer[]>;
  
  searchCriteria: SearchCriteria = {
    searchTerm: '',
    selectedUnit: '',
    selectedPosition: ''
  };

  selectedPositionFilter = 'all';
  isLoading = false;
  showSearchSuggestions = false;
  searchSuggestions: string[] = [];
  totalOfficers = 0;
  filteredCount = 0;

  constructor(
    private policeDataService: PoliceDataService,
    private seoService: SeoService
  ) {
    this.filteredOfficers$ = this.policeDataService.getFilteredOfficers();
    this.units$ = this.policeDataService.getUnits();
    this.positions$ = this.policeDataService.getPositions();
    this.statistics$ = this.policeDataService.getStatistics();
    this.highlightedOfficers$ = this.policeDataService.getHighlightedOfficers();
  }

  ngOnInit(): void {
    console.log('組件初始化');
    this.setupSeo();
    this.setupSearchCriteriaListener();
    this.setupSearchSuggestions();
    this.setupFilteredCount();
    
    // 強制觸發初始搜尋
    this.policeDataService.updateSearchCriteria({
      searchTerm: '',
      selectedUnit: '',
      selectedPosition: ''
    });
    
    console.log('初始化完成');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSeo(): void {
    this.seoService.setMetaTags({
      title: '台北市警察局人事查詢',
      description: '台北市警察局人事資料查詢系統 - 提供各分局局長、副局長等主管人員詳細資料，包含學歷、經歷等完整資訊',
      keywords: '台北市警察局,分局長,副局長,警察人事,中正第一分局,陳瑞基,李西河,警察局長',
      ogTitle: '台北市警察局人事資料查詢系統',
      ogDescription: '完整的台北市警察局各級主管人員資料，包含學歷、經歷等詳細資訊。針對114/08/30事件提供透明的政府資訊。'
    });

    this.seoService.setOrganizationStructuredData();
  }

  private setupSearchCriteriaListener(): void {
    this.policeDataService.searchCriteria$
      .pipe(takeUntil(this.destroy$))
      .subscribe(criteria => {
        this.searchCriteria = criteria;
      });
  }

  private setupSearchSuggestions(): void {
    this.policeDataService.officers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(officers => {
        const suggestions = new Set<string>();
        officers.forEach(officer => {
          suggestions.add(officer.name);
          suggestions.add(officer.position);
          const unitShort = officer.unit.replace('臺北市政府警察局', '').trim();
          if (unitShort) suggestions.add(unitShort);
        });
        this.searchSuggestions = Array.from(suggestions).sort();
        this.totalOfficers = officers.length;
      });
  }

  private setupFilteredCount(): void {
    this.filteredOfficers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(officers => {
        this.filteredCount = officers.length;
      });
  }

  onSearchChange(): void {
    console.log('搜尋內容變更:', this.searchCriteria.searchTerm);
    this.isLoading = true;
    
    // 直接更新服務中的搜尋條件
    this.policeDataService.updateSearchCriteria({
      searchTerm: this.searchCriteria.searchTerm
    });

    // 顯示搜尋建議
    this.showSearchSuggestions = this.searchCriteria.searchTerm.length > 0;
    
    // 模擬短暫載入狀態
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  onUnitChange(): void {
    console.log('單位選擇變更:', this.searchCriteria.selectedUnit);
    this.isLoading = true;
    
    this.policeDataService.updateSearchCriteria({
      selectedUnit: this.searchCriteria.selectedUnit
    });
    
    // 模擬短暫載入狀態
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  onPositionFilterChange(position: string): void {
    console.log('切換職位篩選:', position);
    this.isLoading = true;
    
    this.selectedPositionFilter = position;
    const selectedPosition = position === 'all' ? '' : position;
    
    // 直接更新搜尋條件
    this.searchCriteria.selectedPosition = selectedPosition;
    
    // 呼叫服務更新
    this.policeDataService.updateSearchCriteria({
      selectedPosition
    });
    
    console.log('更新後的篩選條件:', this.searchCriteria);
    
    // 模擬短暫載入狀態
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  performSearch(): void {
    console.log('執行搜尋:', this.searchCriteria);
    this.isLoading = true;
    
    // 觸發所有搜尋條件更新
    this.policeDataService.updateSearchCriteria({
      ...this.searchCriteria
    });
    
    // 模擬短暫載入狀態
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  trackByOfficer(index: number, officer: PoliceOfficer): string {
    return officer.id;
  }

  getOfficerPhotoUrl(officer: PoliceOfficer): string {
    return officer.photoUrl || 'assets/images/default-avatar.png';
  }



  formatAppointmentDate(date: string): string {
    // 將民國年轉換為西元年顯示
    const year = parseInt(date.substring(0, 3)) + 1911;
    const month = date.substring(4, 6);
    const day = date.substring(7, 9);
    return `${year}年${month}月${day}日`;
  }

  getEducationDisplay(education: string[]): string[] {
    return education.slice(0, 3); // 只顯示前3項學歷
  }

  getExperienceDisplay(experience: string[]): string[] {
    return experience.slice(-5); // 顯示最近5項經歷
  }

  // 搜尋建議相關方法
  getFilteredSuggestions(): string[] {
    if (!this.searchCriteria.searchTerm) return [];
    
    return this.searchSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(this.searchCriteria.searchTerm.toLowerCase())
      )
      .slice(0, 5);
  }

  selectSuggestion(suggestion: string): void {
    this.searchCriteria.searchTerm = suggestion;
    this.showSearchSuggestions = false;
    this.onSearchChange();
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSearchSuggestions = false;
    }, 200);
  }

  // 清除搜尋
  clearSearch(): void {
    console.log('清除搜尋');
    this.isLoading = true;
    
    this.searchCriteria.searchTerm = '';
    this.searchCriteria.selectedUnit = '';
    this.searchCriteria.selectedPosition = '';
    this.selectedPositionFilter = 'all';
    this.showSearchSuggestions = false;
    
    // 使用完整物件更新以確保所有條件都被重置
    this.policeDataService.updateSearchCriteria({
      searchTerm: '',
      selectedUnit: '',
      selectedPosition: ''
    });
    
    // 模擬短暫載入狀態
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  // 取得搜尋結果摘要文字
  getSearchSummary(): string {
    if (this.filteredCount === this.totalOfficers) {
      return `顯示全部 ${this.totalOfficers} 位人員`;
    }
    return `找到 ${this.filteredCount} 位人員，共 ${this.totalOfficers} 位`;
  }
}
