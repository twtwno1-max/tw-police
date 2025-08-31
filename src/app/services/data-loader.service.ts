import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PoliceOfficer } from '../models/police-officer.model';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  private officersSubject = new BehaviorSubject<PoliceOfficer[]>([]);
  public officers$ = this.officersSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadPoliceData(): Observable<PoliceOfficer[]> {
    // 由於是靜態資料，我們先使用模擬資料
    // 在生產環境中，這裡會解析assets/data中的txt檔案
    const mockData: PoliceOfficer[] = [
      {
        id: '001',
        name: '李西河',
        position: '局長',
        unit: '臺北市政府警察局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/360/relpic/31814/8437616/756d5c38-59c3-4fc3-ac79-9ee0862c36e0.jpg',
        education: [
          '中央警察大學行政警察學系47期',
          '中央警察大學行政警察學系碩士'
        ],
        experience: [
          '內政部警政署副署長',
          '內政部警政署刑事警察局局長',
          '內政部警政署保安警察第三總隊總隊長',
          '臺北市政府警察局副局長',
          '內政部警政署刑事警察局副局長',
          '內政部警政署國道公路警察局副局長',
          '花蓮縣警察局局長',
          '內政部警政署保安警察第四總隊副總隊長',
          '臺南市政府警察局永康分局分局長'
        ],
        appointmentDate: '113-06-06',
        refUrl: 'https://police.gov.taipei/News_Content_Leader.aspx?n=78E670F5141B2C92&sms=7CAF6BD4D3E48630&s=D6EE511817DE3FCD'
      },
      {
        id: '002',
        name: '陳瑞基',
        position: '分局長',
        unit: '臺北市政府警察局中正第一分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/502/relpic/31814/9449515/23f1feb0-b697-443f-b521-280b1af475a6.jpg',
        education: [
          '中央警察大學刑事警察學系',
          '中央警察大學刑事警察研究所碩士',
          '中央警察大學犯罪防治研究所博士'
        ],
        experience: [
          '臺北市政府警察局中正第一分局分局長(現任)',
          '臺北市政府警察局士林分局分局長',
          '臺北市政府警察局北投分局分局長',
          '臺北市政府警察局文山第二分局分局長',
          '內政部警政署刑事警察局偵查第四大隊大隊長',
          '內政部警政署刑事警察局預防科科長'
        ],
        appointmentDate: '114-08-01',
        refUrl: 'https://c1.police.gov.taipei/News_Content_Leader.aspx?n=6CAEAC9448FD6975&sms=7CAF6BD4D3E48630&s=FA9A4B58C63D57F3',
        isHighlighted: true
      },
      {
        id: '003',
        name: '張淑芳',
        position: '副局長',
        unit: '臺北市政府警察局',
        appointmentDate: '113-07-19',
        education: ['詳細學歷資料載入中...'],
        experience: ['詳細經歷資料載入中...']
      },
      {
        id: '004',
        name: '張素菱',
        position: '副局長',
        unit: '臺北市政府警察局',
        appointmentDate: '114-08-01',
        education: ['詳細學歷資料載入中...'],
        experience: ['詳細經歷資料載入中...']
      },
      {
        id: '005',
        name: '張隆興',
        position: '副局長',
        unit: '臺北市政府警察局',
        appointmentDate: '114-01-16',
        education: ['詳細學歷資料載入中...'],
        experience: ['詳細經歷資料載入中...']
      },
      {
        id: '006',
        name: '劉全原',
        position: '分局長',
        unit: '臺北市政府警察局中正第二分局',
        appointmentDate: '113-07-19',
        education: ['詳細學歷資料載入中...'],
        experience: ['詳細經歷資料載入中...']
      },
      {
        id: '007',
        name: '李憲蒼',
        position: '分局長',
        unit: '臺北市政府警察局信義分局',
        appointmentDate: '113-07-19',
        education: ['詳細學歷資料載入中...'],
        experience: ['詳細經歷資料載入中...']
      },
      {
        id: '008',
        name: '黃水願',
        position: '分局長',
        unit: '臺北市政府警察局大安分局',
        appointmentDate: '113-01-17',
        education: ['詳細學歷資料載入中...'],
        experience: ['詳細經歷資料載入中...']
      },
      {
        id: '009',
        name: '蕭惠珠',
        position: '分局長',
        unit: '臺北市政府警察局士林分局',
        appointmentDate: '114-08-01',
        education: ['詳細學歷資料載入中...'],
        experience: ['詳細經歷資料載入中...']
      },
      {
        id: '010',
        name: '張耀仁',
        position: '分局長',
        unit: '臺北市政府警察局中山分局',
        appointmentDate: '113-07-19',
        education: ['詳細學歷資料載入中...'],
        experience: ['詳細經歷資料載入中...']
      }
    ];

    this.officersSubject.next(mockData);
    return of(mockData);
  }

  // 未來可以實作從txt檔案載入資料的方法
  private parsePoliceDataFromFile(fileContent: string): PoliceOfficer {
    const lines = fileContent.split('\n');
    const officer: Partial<PoliceOfficer> = {};
    
    // 解析txt檔案格式
    lines.forEach(line => {
      if (line.includes('姓名：')) {
        officer.name = line.replace('姓名：', '').trim();
      }
      if (line.includes('職稱：')) {
        officer.position = line.replace('職稱：', '').trim();
      }
      if (line.includes('任職單位：')) {
        officer.unit = line.replace('任職單位：', '').trim();
      }
      if (line.includes('photo image url')) {
        const urlIndex = lines.indexOf(line) + 2;
        if (urlIndex < lines.length) {
          officer.photoUrl = lines[urlIndex].trim();
        }
      }
    });

    return officer as PoliceOfficer;
  }

  // 載入特定txt檔案
  loadOfficerData(filePath: string): Observable<PoliceOfficer | null> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map(content => this.parsePoliceDataFromFile(content)),
      catchError(error => {
        console.error('Error loading officer data:', error);
        return of(null);
      })
    );
  }
}
