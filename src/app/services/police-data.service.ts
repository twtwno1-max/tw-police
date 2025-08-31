import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { PoliceOfficer, PoliceUnit, SearchCriteria } from '../models/police-officer.model';

@Injectable({
  providedIn: 'root'
})
export class PoliceDataService {
  private officersSubject = new BehaviorSubject<PoliceOfficer[]>([]);
  public officers$ = this.officersSubject.asObservable();

  private searchCriteriaSubject = new BehaviorSubject<SearchCriteria>({
    searchTerm: '',
    selectedUnit: '',
    selectedPosition: ''
  });
  public searchCriteria$ = this.searchCriteriaSubject.asObservable();

  constructor() {
    console.log('PoliceDataService 初始化');
    this.loadPoliceData();
    console.log('資料加載完成');
  }

  private loadPoliceData(): void {
    console.log('開始加載警察資料');
    // 完整的台北市警察局人事資料
    const officers: PoliceOfficer[] = [
      // 局長
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
      // 副局長
      {
        id: '002',
        name: '張淑芳',
        position: '副局長',
        unit: '臺北市政府警察局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/360/relpic/31814/9243463/94040000-c7bf-4df1-b9eb-d7ba97d5146e.png',
        education: [
          '中央警察大學外事警察學系56期',
          '國立中興大學公共政策研究所碩士'
        ],
        experience: [
          '桃園市政府警察局副局長',
          '臺北市政府警察局主任秘書',
          '內政部警政署人事室主任',
          '內政部警政署人事室專門委員',
          '高雄市政府警察局人事室主任',
          '內政部警政署刑事警察局人事室主任',
          '內政部警政署保安警察第三總隊人事室主任'
        ],
        appointmentDate: '113-07-19',
        refUrl: 'https://police.gov.taipei/News_Content_Leader.aspx?n=78E670F5141B2C92&sms=7CAF6BD4D3E48630&s=A167A50B22A4E2F9'
      },
      {
        id: '003',
        name: '張素菱',
        position: '副局長',
        unit: '臺北市政府警察局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/360/relpic/31814/9450525/06a2c1e0-c0e5-4cfc-976c-29893726e06b.png',
        education: [
          '中央警察大學外事警察學系50期',
          '中央警察大學犯罪防治學系碩士'
        ],
        experience: [
          '臺灣警察專科學校教育長',
          '新北市政府警察局主任秘書',
          '新竹市警察局局長',
          '內政部警政署警察通訊所所長',
          '臺北市政府警察局信義分局分局長',
          '臺北市政府警察局萬華分局分局長',
          '臺北市政府警察局大同分局分局長'
        ],
        appointmentDate: '114-08-01',
        refUrl: 'https://police.gov.taipei/News_Content_Leader.aspx?n=78E670F5141B2C92&sms=7CAF6BD4D3E48630&s=EC646130EB208847'
      },
      {
        id: '004',
        name: '張隆興',
        position: '副局長',
        unit: '臺北市政府警察局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/360/relpic/31814/9340821/78d720ae-04a0-4cd9-a488-54a998e2c7e3.jpg',
        education: [
          '中央警察大學公共安全學系50期',
          '國立臺北大學犯罪學研究所碩士'
        ],
        experience: [
          '桃園市政府警察局主任秘書',
          '連江縣警察局局長',
          '內政部警政署保安警察第七總隊副總隊長',
          '內政部警政署保安警察第四總隊主任秘書',
          '臺北市政府警察局萬華分局分局長',
          '臺北市政府警察局南港分局分局長',
          '臺北市政府警察局後勤科科長'
        ],
        appointmentDate: '114-01-16',
        refUrl: 'https://police.gov.taipei/News_Content_Leader.aspx?n=78E670F5141B2C92&sms=7CAF6BD4D3E48630&s=CF49E09B3630D32E'
      },
      // 分局長 - 中正第一分局（特別標示）
      {
        id: '005',
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
        refUrl: 'https://c1.police.gov.taipei/News_Content_Leader.aspx?n=6CAEAC9448FD6975&sms=7CAF6BD4D3E48630&s=FA9A4B58C63D57F3'
      },
      // 其他分局長
      {
        id: '006',
        name: '劉全原',
        position: '分局長',
        unit: '臺北市政府警察局中正第二分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/503/relpic/31814/4896585/d92e22e5-3b65-46aa-9b28-bec37f1052c8.jpg',
        education: [
          '中央警官學校法律學系61期',
          '中央警察大學水上警察學系碩士'
        ],
        experience: [
          '臺北市政府警察局中正第二分局分局長（現任）',
          '臺北市政府警察局秘書室主任',
          '臺北市政府警察局督察室風紀股督察兼風紀股股長',
          '新北市政府警察局督察室督察',
          '內政部警政署花蓮港務警察總隊副總隊長',
          '內政部警政署國道公路警察局第七公路警察大隊大隊長',
          '宜蘭縣政府警察局交通警察隊隊長',
          '花蓮縣警察局吉安分局分局長',
          '金門縣警察局金湖分局分局長'
        ],
        appointmentDate: '113-07-19',
        refUrl: 'https://c2.police.gov.taipei/News_Content_Leader.aspx?n=84193DA7962E53EB&sms=7CAF6BD4D3E48630&s=34FFA10E300F4B36'
      },
      {
        id: '007',
        name: '張耀仁',
        position: '分局長',
        unit: '臺北市政府警察局中山分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/469/relpic/31814/9243192/7739c876-9267-42f5-a3f5-c01b8de91859.jpg',
        education: [
          '中央警察大學鑑識科學系58期'
        ],
        experience: [
          '臺北市政府警察局中山分局分局長(現任)',
          '臺北市政府警察局南港分局分局長',
          '臺北市政府警察局公共關係室主任',
          '臺北市政府警察局督察室督察',
          '臺北市政府警察局保安科專員',
          '臺北市政府警察局捷運警察隊隊長',
          '臺北市政府警察局中山分局副分局長',
          '臺北市政府警察局大同分局副分局長',
          '臺北市政府警察局文山第一分局副分局長'
        ],
        appointmentDate: '113-07-19',
        refUrl: 'https://cs.police.gov.taipei/News_Content_Leader.aspx?n=1F60A57A0E215E51&sms=7CAF6BD4D3E48630&s=4A731255C9D99E04'
      },
      {
        id: '008',
        name: '李憲蒼',
        position: '分局長',
        unit: '臺北市政府警察局信義分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/501/relpic/31814/9244926/8d4642f8-c2b2-4a7a-ab58-6f7b1c9cad51.jpg',
        education: [
          '中央警察大學交通學系第61期',
          '中央警察大學交通管理學系第33期碩士'
        ],
        experience: [
          '臺北市政府警察局信義分局分局長（現任）',
          '臺北市政府警察局中正第二分局分局長',
          '臺北市政府警察局督察室督察',
          '新竹縣政府警察局督察科督察長',
          '新竹縣政府警察局竹北分局分局長',
          '雲林縣政府警察局北港分局分局長',
          '宜蘭縣政府警察局蘇澳分局分局長',
          '臺北市政府警察局內湖分局督察組組長',
          '臺北市政府警察局信義分局督察組組長'
        ],
        appointmentDate: '113-07-19',
        refUrl: 'https://sy.police.gov.taipei/News_Content_Leader.aspx?n=35AF5BBA6D0763DB&sms=7CAF6BD4D3E48630&s=8E265398BB49B53D'
      },
      {
        id: '009',
        name: '張玲堅',
        position: '分局長',
        unit: '臺北市政府警察局內湖分局',
        photoUrl:'https://www-ws.gov.taipei/001/Upload/499/relpic/31814/9450948/81bb6bc5-918f-4abf-8d8f-4114d62c6641.png',
        education: [
          '中央警察大學警政研究所',
          '中央警察大學行政警察學系62期'
        ],
        experience: [
          '臺北市政府警察局保安警察大隊大隊長',
          '臺北市政府警察局秘書室主任',
          '臺北市政府警察局督察室督察',
          '內政部警政署保安組科長',
          '內政部警政署保防組專員',
          '內政部警政署秘書室專員',
          '內政部警政署秘書室警務正',
          '內政部警政署教育組警務正'
        ],
        appointmentDate: '114-08-01',
        refUrl: 'https://nh.police.gov.taipei/News_Content_Leader.aspx?n=F0863789FCA9E1B2&sms=7CAF6BD4D3E48630&s=3E5A134772FE86E2'
      },
      {
        id: '010',
        name: '李紹榆',
        position: '分局長',
        unit: '臺北市政府警察局北投分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/473/relpic/31814/9341466/297abaf8-fd00-4223-b549-dba785c430fc.jpg',
        education: [
          '中央警察大學警政研究所',
          '中央警察大學交通學系57期'
        ],
        experience: [
          '臺北市政府警察局北投分局分局長（現任）',
          '臺北市政府警察局文山第二分局分局長',
          '高雄市政府警察局鹽埕分局分局長',
          '新北市政府警察局保安科科長',
          '新北市政府警察局督察室督察',
          '內政部警政署花蓮港務警察總隊副總隊長',
          '內政部警政署保安警察第七總隊第三大隊大隊長',
          '內政部警政署行政組秘書',
          '內政部警政署人事室專員'
        ],
        appointmentDate: '114-01-16',
        refUrl: 'https://pt.police.gov.taipei/News_Content_Leader.aspx?n=388BC8AEE3846762&sms=7CAF6BD4D3E48630&s=1B4694E262E23653'
      },
      {
        id: '011',
        name: '許城銘',
        position: '分局長',
        unit: '臺北市政府警察局南港分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/474/relpic/31814/9449697/b61e2005-bef6-4960-bb32-063eeac01d65.png',
        education: [
          '銘傳大學公共事務學系碩士畢業',
          '中央警察大學行政管理學系60期畢業'
        ],
        experience: [
          '現任臺北市政府警察局南港分局分局長',
          '臺北市政府警察局文山第一分局分局長',
          '新北市政府警察局三峽分局分局長',
          '新北市政府警察局行政科科長',
          '新北市政府警察局犯罪預防科科長',
          '新北市政府警察局公共關係室主任'
        ],
        appointmentDate: '114-08-01',
        refUrl: 'https://nk.police.gov.taipei/News_Content_Leader.aspx?n=04D2AC19266E7B2F&sms=7CAF6BD4D3E48630&s=4BF8DDF391DC1C7C'
      },
      {
        id: '012',
        name: '蕭惠珠',
        position: '分局長',
        unit: '臺北市政府警察局士林分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/472/relpic/31814/9449540/0fb791ed-71a2-4327-aed7-08c70627f149.jpg',
        education: [
          '中央警官學校公共安全學系55期畢業'
        ],
        experience: [
          '現任臺北市政府警察局士林分局分局長',
          '臺北市政府警察局內湖分局分局長',
          '新北市政府警察局訓練科科長',
          '新北市政府警察局督察室督察',
          '內政部警政署鐵路警察局督察長'
        ],
        appointmentDate: '114-08-01',
        refUrl: 'https://sl.police.gov.taipei/News_Content_Leader.aspx?n=AA1A5C8D7FFD9A3E&sms=7CAF6BD4D3E48630&s=5801668671474E2C'
      },
      {
        id: '013',
        name: '周哲民',
        position: '分局長',
        unit: '臺北市政府警察局大同分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/468/relpic/31814/9450728/895fafd7-d0d6-435e-b10f-c78dbda443af.jpg',
        education: [
          '中央警察大學資訊管理學系65期'
        ],
        experience: [
          '現任臺北市政府警察局大同分局分局長',
          '臺北市政府警察局南港分局分局長',
          '臺北市政府警察局文山第一分局分局長',
          '新北市政府警察局資訊室主任',
          '內政部警政署資訊室前瞻應用科科長'
        ],
        appointmentDate: '114-08-01',
        refUrl: 'https://tt.police.gov.taipei/News_Content_Leader.aspx?n=848D8ED35111D812&sms=7CAF6BD4D3E48630&s=599CCCD149836BD0'
      },
      {
        id: '014',
        name: '黃水願',
        position: '分局長',
        unit: '臺北市政府警察局大安分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/470/relpic/31814/9105002/6a7ad043-2e3f-49cb-ab50-dbff9f12218e.jpg',
        education: [
          '中央警察大學水上警察學系59期',
          '中央警察大學水上警察學系碩士'
        ],
        experience: [
          '臺北市政府警察局大安分局分局長(現任)',
          '臺北市政府警察局士林分局分局長',
          '內政部警政署刑事警察局偵查第七大隊大隊長',
          '內政部警政署刑事警察局通訊監察科科長',
          '內政部警政署刑事警察局偵查第七大隊副大隊長',
          '內政部警政署刑事警察局偵查第九大隊副大隊長'
        ],
        appointmentDate: '113-01-17',
        refUrl: 'https://ta.police.gov.taipei/News_Content_Leader.aspx?n=B1FACD59BDFFC636&sms=7CAF6BD4D3E48630&s=A30CF40F4322FFF1'
      },
      {
        id: '015',
        name: '洪漢周',
        position: '分局長',
        unit: '臺北市政府警察局文山第一分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/505/relpic/31814/9450408/82f96a1b-451d-465d-9868-4753b738a1c7.png',
        education: [
          '中央警官學校警政研究所碩士畢業',
          '中央警官學校鑑識科學系59期畢業'
        ],
        experience: [
          '桃園市政府警察局刑事警察大隊副大隊長',
          '桃園市政府警察局中壢分局副分局長',
          '桃園市政府警察局公共關係室專員',
          '桃園市政府警察局督察室督察',
          '桃園市政府警察局公共關係室主任',
          '桃園市政府警察局保安警察大隊大隊長'
        ],
        appointmentDate: '114-08-01',
        refUrl: 'https://w1.police.gov.taipei/News_Content_Leader.aspx?n=9BDD9B2465632FE7&sms=7CAF6BD4D3E48630&s=DEABF05C889F8676'
      },
      {
        id: '016',
        name: '陳義宏',
        position: '分局長',
        unit: '臺北市政府警察局文山第二分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/504/relpic/31814/4896709/cbce1a1c-200c-4ad8-8513-7ca8a76c8e3c.jpg',
        education: [
          '中央警察大學刑事警察學系60期',
          '東吳大學法律學系研究所'
        ],
        experience: [
          '內政部警政署刑事警察局預防科秘書',
          '內政部警政署刑事警察局公共關係室主任',
          '內政部警政署刑事警察局偵查第九大隊大隊長',
          '高雄市政府警察局湖內分局分局長',
          '高雄市政府警察局林園分局分局長'
        ],
        appointmentDate: '114-08-01',
        refUrl: 'https://w2.police.gov.taipei/News_Content_Leader.aspx?n=A75CC923F8C94193&sms=7CAF6BD4D3E48630&s=3B73E15761A0E922'
      },
      {
        id: '017',
        name: '丁靖',
        position: '分局長',
        unit: '臺北市政府警察局松山分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/471/relpic/31814/9449641/4d501005-b88e-431a-baa2-9d6260052fda.jpg',
        education: [
          '中央警察大學刑事警察學系63期',
          '中央警察大學刑事警察研究所'
        ],
        experience: [
          '嘉義市政府警察局刑事警察大隊大隊長',
          '內政部警政署保安警察第七總隊刑事警察大隊大隊長',
          '雲林縣警察局刑事警察大隊大隊長',
          '內政部警政署刑事警察局預防科科長',
          '內政部警政署刑事警察局偵查第四大隊大隊長',
          '臺北市政府警察局文山第二分局分局長'
        ],
        appointmentDate: '114-08-01',
        refUrl: 'https://ss.police.gov.taipei/News_Content_Leader.aspx?n=679084E9D1292599&sms=7CAF6BD4D3E48630&s=EC875391B09A5EE1'
      },
      {
        id: '018',
        name: '陳勇華',
        position: '分局長',
        unit: '臺北市政府警察局萬華分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/500/relpic/31814/9451413/2a6d87ee-edb5-4225-a26c-13347ece70ea.jpg',
        education: [
          '中央警察大學刑事警察學系59期'
        ],
        experience: [
          '臺北市政府警察局大同分局分局長',
          '臺北市政府警察局交通大隊大隊長',
          '臺北市政府警察局督察室督察',
          '臺北市政府警察局信義分局副分局長',
          '臺北市政府警察局中正第一分局副分局長',
          '臺北市政府警察局文山第二分局副分局長',
          '臺北市政府警察局保安科專員',
          '臺北市政府警察局中山分局督察組組長',
          '臺北市政府警察局萬華分局督察組組長'
        ],
        appointmentDate: '114-08-01',
        refUrl: 'https://wh.police.gov.taipei/News_Content_Leader.aspx?n=64412160C98C2EC8&sms=7CAF6BD4D3E48630&s=85930DA8D41A162E'
      },
      // 副分局長資料 - 中山分局
      {
        id: '019',
        name: '吳坤安',
        position: '副分局長',
        unit: '臺北市政府警察局中山分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/469/relpic/31814/9464803/86752267-cb4e-41db-a762-71cbca749e71.jpg',
        education: [
          '中央警察大學行政警察學系65期'
        ],
        experience: [
          '臺北市政府警察局中山分局副分局長(現任)',
          '臺北市政府警察局松山分局副分局長',
          '臺北市政府警察局少年警察隊隊長',
          '臺北市政府警察局信義分局偵查隊隊長',
          '臺北市政府警察局士林分局偵查隊隊長',
          '臺北市政府警察局松山分局偵查隊隊長',
          '臺北市政府警察局刑事警察大隊偵查第一隊隊長',
          '臺北市政府警察局刑事警察大隊肅竊組組長',
          '臺北市政府警察局保安科警務正'
        ],
        appointmentDate: '114-08-28',
        refUrl: 'https://cs.police.gov.taipei/News_Content_Leader.aspx?n=1F60A57A0E215E51&sms=7CAF6BD4D3E48630&s=3BA141CA79A59AD0'
      },
      {
        id: '020',
        name: '林信介',
        position: '副分局長',
        unit: '臺北市政府警察局中山分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/469/relpic/31814/9264814/79821b83-76f7-4c6a-93e4-4fcde0f2d3f6.png',
        education: [
          '東吳大學法律學系碩士在職專班科技法律組',
          '中央警察大學公共安全學系66期'
        ],
        experience: [
          '臺北市政府警察局中山分局 副分局長(現任)',
          '臺北市政府警察局中山分局 督察組 組長',
          '臺北市政府警察局中正第二分局 督察組 組長',
          '臺北市政府警察局 督察室 督察員',
          '臺北市政府警察局 督察室 警務正',
          '臺北市政府警察局中山分局 中山二派出所 所長',
          '臺北市政府警察局中山分局 長春路派出所 所長',
          '臺北市政府警察局中山分局 建國派出所 所長',
          '臺北市政府警察局內湖分局 康樂派出所 所長',
          '臺北市政府警察局內湖分局 康寧派出所 所長'
        ],
        appointmentDate: '113-08-27',
        refUrl: 'https://cs.police.gov.taipei/News_Content_Leader.aspx?n=1F60A57A0E215E51&sms=7CAF6BD4D3E48630&s=69A3392510C4C786'
      },
      // 副分局長資料 - 中正第一分局
      {
        id: '021',
        name: '李秉蒼',
        position: '副分局長',
        unit: '臺北市政府警察局中正第一分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/502/relpic/31814/9366168/559b8adc-2114-43e3-89b9-1414366b080d.jpg',
        education: [
          '中央警官學校68期刑事警察學系畢業'
        ],
        experience: [
          '臺北市政府警察局中正第一分局副分局長(現任)',
          '臺北市政府警察局萬華分局副分局長',
          '臺北市政府警察局婦幼隊隊長',
          '臺北市政府警察局中正第一分局督察組組長',
          '臺北市政府警察局保防科股長',
          '臺北市政府警察局秘書室股長',
          '臺北市政府警察局保安科警務正',
          '臺北市政府警察局內湖分局西湖派出所警務員',
          '臺北市政府警察局內湖分局督察組督察員',
          '內政部警政署保安警察第六總隊第一警官隊組員'
        ],
        appointmentDate: '113-02-26',
        refUrl: 'https://c1.police.gov.taipei/News_Content_Leader.aspx?n=6CAEAC9448FD6975&sms=7CAF6BD4D3E48630&s=CB764FBA1C283E5C'
      },
      {
        id: '022',
        name: '林岳寬',
        position: '副分局長',
        unit: '臺北市政府警察局中正第一分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/502/relpic/31814/9126473/3d6495d7-dc6d-4aeb-b21a-4f8bfdc82c81.jpg',
        education: [
          '中央警官學校國境警察學系59期',
          '國立臺灣科技大學管理研究所'
        ],
        experience: [
          '臺北市政府警察局中正第一分局副分局長(現任)',
          '臺北市政府警察局信義分局副分局長',
          '臺北市政府警察局北投分局副分局長',
          '臺北市政府警察局松山分局督察組組長',
          '臺北市政府警察局中正第一分局督察組組長',
          '臺北市政府警察局中正第一分局交通組組長',
          '臺北市政府警察局保防科警務正',
          '臺北市政府警察局保安科警務正',
          '臺北市政府警察局信義分局督察組督察員',
          '臺北市政府警察局內湖分局警備隊隊長',
          '臺北市政府警察局刑事警察大隊偵查組組員',
          '臺北市政府警察局刑事警察大隊第四組組員'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://c1.police.gov.taipei/News_Content_Leader.aspx?n=6CAEAC9448FD6975&sms=7CAF6BD4D3E48630&s=20D44D7631AC1201'
      },
      // 副分局長資料 - 中正第二分局
      {
        id: '023',
        name: '翁麒豪',
        position: '副分局長',
        unit: '臺北市政府警察局中正第二分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/503/relpic/31814/4896662/0cbd5903-d4b2-4d59-8e22-ba218db9865e.jpg',
        education: [
          '中央警察大學交通學系69期畢業'
        ],
        experience: [
          '臺北市政府警察局中正第二分局 副分局長(現任)',
          '臺北市政府警察局少年警察隊 隊長',
          '臺北市政府警察局保安警察大隊督察組 組長',
          '臺北市政府警察局內湖分局交通組 組長',
          '臺北市政府警察局大同分局督察組 組長',
          '臺北市政府警察局內湖分局督察組 組長',
          '臺北市政府警察局交通警察大隊督察組 組長',
          '臺北市政府警察局督察室 督察員',
          '臺北市政府警察局督察室 警務正',
          '臺北市政府警察局交通警察大隊中正第一分隊 中隊長',
          '臺北市政府警察局交通警察大隊中正第一分隊 警務員',
          '臺北市政府警察局交通警察大隊直屬第二分隊 警務員',
          '臺北市政府警察局大同分局大橋派出所 巡官兼所長',
          '臺北市政府警察局文山第一分局指南派出所 巡官兼所長',
          '臺北市政府警察局交通警察大隊士林分隊 分隊長',
          '臺北市政府警察局交通警察大隊勤務指揮中心 分隊長',
          '臺北市政府警察局交通警察大隊第五組 分隊長'
        ],
        appointmentDate: '114-08-28',
        refUrl: 'https://c2.police.gov.taipei/News_Content_Leader.aspx?n=84193DA7962E53EB&sms=7CAF6BD4D3E48630&s=88AFCD26CBBB552F'
      },
      {
        id: '024',
        name: '陳正揚',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/503/relpic/31814/4896661/442e99ab-3052-478f-9eca-a26d42ffd5e8.jpg',
        position: '副分局長',
        unit: '臺北市政府警察局中正第二分局',
        education: [
          '中央警察大學警佐班第43期'
        ],
        experience: [
          '臺北市政府警察局中正第二分局副分局長(現任)',
          '臺北市政府警察局保安警察大隊副大隊長',
          '臺北市政府警察局保安警察大隊第三中隊中隊長',
          '臺北市政府警察局保安警察大隊第一中隊中隊長'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://c2.police.gov.taipei/News_Content_Leader.aspx?n=84193DA7962E53EB&sms=7CAF6BD4D3E48630&s=2C5765AB4B61D1C1'
      },
      // 副分局長資料 - 信義分局
      {
        id: '025',
        name: '王致傑',
        position: '副分局長',
        unit: '臺北市政府警察局信義分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/501/relpic/31814/8554761/1e8e8781-d5c5-4b1e-8ca1-4ae58a951616.jpg',
        education: [
          '中央警官學校刑事警察學系57期'
        ],
        experience: [
          '臺北市政府警察局信義分局副分局長(現任)',
          '臺北市政府警察局北投分局副分局長',
          '臺北市政府警察局交通警察大隊副大隊長',
          '臺北市政府警察局松山分局督察組組長',
          '臺北市政府警察局中正第一分局督察組組長',
          '臺北市政府警察局中正第一分局民防組組長',
          '臺北市政府警察局文山第二分局督察組組長',
          '臺北市政府警察局督察室督察員',
          '臺北市政府警察局督察室警務正',
          '臺北市政府警察局犯罪預防科警務正'
        ],
        appointmentDate: '113-02-26',
        refUrl: 'https://sy.police.gov.taipei/News_Content_Leader.aspx?n=35AF5BBA6D0763DB&sms=7CAF6BD4D3E48630&s=277D071178E8492B'
      },
      {
        id: '026',
        name: '車宇基',
        position: '副分局長',
        unit: '臺北市政府警察局信義分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/501/relpic/31814/8946169/776dca45-6774-405f-944e-bb3d0c1e2f61.jpg',
        education: [
          '中央警官學校刑事警察學系56期'
        ],
        experience: [
          '臺北市政府警察局信義分局副分局長(現任)',
          '臺北市政府警察局北投分局副分局長',
          '臺北市政府警察局信義分局偵查隊隊長',
          '臺北市政府警察局士林分局偵查隊隊長',
          '臺北市政府警察局北投分局偵查隊隊長',
          '臺北市政府警察局中山分局偵查隊隊長',
          '臺北市政府警察局大安分局偵查隊隊長',
          '臺北市政府警察局行政科警務正'
        ],
        appointmentDate: '112-03-09',
        refUrl: 'https://sy.police.gov.taipei/News_Content_Leader.aspx?n=35AF5BBA6D0763DB&sms=7CAF6BD4D3E48630&s=76DFBE00FDBABEFC'
      },
      // 副分局長資料 - 內湖分局
      {
        id: '027',
        name: '楊坤明',
        position: '副分局長',
        unit: '臺北市政府警察局內湖分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/499/relpic/31814/9465051/d25ee1af-b9a9-4ce8-86f5-c28fbcbee297.jpg',
        education: [
          '銘傳大學犯罪防治學系碩士畢業',
          '中央警察大學刑事警察學系60期'
        ],
        experience: [
          '臺北市政府警察局內湖分局副分局長(現任)',
          '臺北市政府警察局中正第二分局副分局長',
          '臺北市政府警察局南港分局副分局長',
          '臺北市政府警察局文山第二分局副分局長',
          '臺北市政府警察局文山第一分局副分局長',
          '臺北市政府警察局北投分局偵查隊隊長',
          '臺北市政府警察局內湖分局偵查隊隊長',
          '臺北市政府警察局南港分局偵查隊隊長',
          '臺北市政府警察局刑事警察大隊偵查第五隊隊長'
        ],
        appointmentDate: '114-08-28',
        refUrl: 'https://nh.police.gov.taipei/News_Content_Leader.aspx?n=F0863789FCA9E1B2&sms=7CAF6BD4D3E48630&s=DC5AF8BFB70E1906'
      },
      {
        id: '028',
        name: '蔡三保',
        position: '副分局長',
        unit: '臺北市政府警察局內湖分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/499/relpic/31814/9368239/f30eacbc-ce00-4714-b7bf-277cb88ef957.jpg',
        education: [
          '中央警察大學行政警察學系64期畢業'
        ],
        experience: [
          '臺北市政府警察局內湖分局副分局長(現任)',
          '臺北市政府警察局交通警察大隊副大隊長',
          '臺北市政府警察局中山分局行政組組長',
          '臺北市政府警察局中正第二分局保防組組長',
          '臺北市政府警察局中正第二分局民防組組長',
          '臺北市政府警察局文山第二分局行政組組長',
          '臺北市政府警察局交通警察大隊總務組組長',
          '臺北市政府警察局行政科警務正'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://nh.police.gov.taipei/News_Content_Leader.aspx?n=F0863789FCA9E1B2&sms=7CAF6BD4D3E48630&s=8B3050F11C11A647'
      },
      // 副分局長資料 - 北投分局
      {
        id: '029',
        name: '林佳毅',
        position: '副分局長',
        unit: '臺北市政府警察局北投分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/473/relpic/31814/9464395/4eb3d25c-4bd3-4852-9b2e-da7e09d43af3.png',
        education: [
          '中央警察大學犯罪防治學系731期'
        ],
        experience: [
          '臺北市政府警察局北投分局副分局長(現任)',
          '臺北市政府警察局秘書室秘書',
          '內政部警政署副署長室專員',
          '內政部警政署主任秘書室專員',
          '內政部警政署保防組專員',
          '內政部警政署保安組專員',
          '內政部警政署保安組警務正'
        ],
        appointmentDate: '114-08-28',
        refUrl: 'https://pt.police.gov.taipei/News_Content_Leader.aspx?n=388BC8AEE3846762&sms=7CAF6BD4D3E48630&s=41FA342AFCB2887D'
      },
      {
        id: '030',
        name: '陳偉仁',
        position: '副分局長',
        unit: '臺北市政府警察局北投分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/473/relpic/31814/9367503/02e71f0c-e5c4-4982-8859-5442d8708580.jpg',
        education: [
          '中央警察大學刑事警察學系68期'
        ],
        experience: [
          '臺北市政府警察局北投分局副分局長(現任)',
          '臺北市政府警察局文山第二分局副分局長',
          '臺北市政府警察局南港分局偵查隊隊長',
          '臺北市政府警察局萬華分局偵查隊隊長',
          '臺北市政府警察局大同分局偵查隊隊長',
          '臺北市政府警察局刑事警察大隊偵查第五隊隊長',
          '臺北市政府警察局公共關係室警務正'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://pt.police.gov.taipei/News_Content_Leader.aspx?n=388BC8AEE3846762&sms=7CAF6BD4D3E48630&s=9D9264FA9407CD8F'
      },
      // 副分局長資料 - 南港分局
      {
        id: '031',
        name: '謝佾廷',
        position: '副分局長',
        unit: '臺北市政府警察局南港分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/474/relpic/31814/9264467/aa6129e4-00b4-4881-97bb-a6d776cdc91c.jpg',
        education: [
          '國立政治大學國際事務學院碩士',
          '中央警官學校行政警察學系60期'
        ],
        experience: [
          '臺北市政府警察局南港分局副分局長(現任)',
          '臺北市政府警察局行政科 專員',
          '臺北市政府警察局文山第二分局行政組組長',
          '臺北市政府警察局大安分局保防組組長',
          '臺北市政府警察局秘書室股長'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://nk.police.gov.taipei/News_Content_Leader.aspx?n=04D2AC19266E7B2F&sms=7CAF6BD4D3E48630&s=9D6D5081684BC97B'
      },
      {
        id: '032',
        name: '陳佳緯',
        position: '副分局長',
        unit: '臺北市政府警察局南港分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/474/relpic/31814/9367935/a1cdc787-e592-437f-84fa-2aeeeea27229.jpg',
        education: [
          '美國休士頓大學公共安全學系(碩士畢業)',
          '中央警察大學外事警察學系32期(碩士畢業)',
          '國立臺灣大學政治學系'
        ],
        experience: [
          '臺北市政府警察局南港分局副分局長(現任)',
          '臺北市政府警察局信義分局督察組組長',
          '臺北市政府警察局松山分局督察組組長',
          '臺北市政府警察局大同分局督察組組長',
          '臺北市政府警察局文山第一分局督察組組長',
          '臺北市政府警察局保安警察大隊督察組組長'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://nk.police.gov.taipei/News_Content_Leader.aspx?n=04D2AC19266E7B2F&sms=7CAF6BD4D3E48630&s=C9538991788CC60D'
      },
      // 副分局長資料 - 士林分局
      {
        id: '033',
        name: '李瑞泰',
        position: '副分局長',
        unit: '臺北市政府警察局士林分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/472/relpic/31814/9366234/520274e9-0fc5-4bfb-b2cf-78c0b564a593.jpg',
        education: [
          '中央警官學校國境警察學系60期畢業',
          '國立臺北大學公共行政與政策學系碩士'
        ],
        experience: [
          '臺北市政府警察局士林分局副分局長(現任)',
          '臺北市政府警察局中正第二分局副分局長',
          '臺北市政府警察局保安警察大隊副大隊長',
          '臺北市政府警察局中山分局交通組組長',
          '臺北市政府警察局萬華分局行政組組長'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://sl.police.gov.taipei/News_Content_Leader.aspx?n=AA1A5C8D7FFD9A3E&sms=7CAF6BD4D3E48630&s=9EE231FCDAA9AC1D'
      },
      {
        id: '034',
        name: '鄭榮安',
        position: '副分局長',
        unit: '臺北市政府警察局士林分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/472/relpic/31814/9366241/1172c4d6-da2f-4f83-91dc-d25e3edfad38.jpg',
        education: [
          '中央警察大學交通學系32期碩士'
        ],
        experience: [
          '臺北市政府警察局士林分局副分局長(現任)',
          '臺北市政府警察局北投分局副分局長',
          '臺北市政府警察局交通警察大隊副大隊長',
          '臺北市政府警察局中正第一分局交通組組長',
          '臺北市政府警察局保安科警務正'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://sl.police.gov.taipei/News_Content_Leader.aspx?n=AA1A5C8D7FFD9A3E&sms=7CAF6BD4D3E48630&s=0CE06287E1ECE53E'
      },
      // 副分局長資料 - 大同分局
      {
        id: '035',
        name: '張舜南',
        position: '副分局長',
        unit: '臺北市政府警察局大同分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/468/relpic/31814/9367719/6c8519fa-eb8c-47eb-b7f4-107aa8e0cc86.jpg',
        education: [
          '中央警察大學行政警察學系研究所畢業',
          '中央警官學校行政警察學系55期畢業'
        ],
        experience: [
          '臺北市政府警察局大同分局副分局長（現任)',
          '臺北市政府警察局南港分局副分局長',
          '內政部警政署督察室專員',
          '內政部警政署戶口組專員',
          '內政部警政署戶口組警務正',
          '臺南縣警察局刑事警察大隊業務組長'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://tt.police.gov.taipei/News_Content_Leader.aspx?n=848D8ED35111D812&sms=7CAF6BD4D3E48630&s=CE415E7BD03CDB5E'
      },
      {
        id: '036',
        name: '楊文欽',
        position: '副分局長',
        unit: '臺北市政府警察局大同分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/468/relpic/31814/9462899/5bcc2183-1575-4b27-b0e6-48dcd1af1d7b.jpg',
        education: [
          '中央警察大學警政學類碩士畢業'
        ],
        experience: [
          '臺北市政府警察局大同分局副分局長(現任)',
          '臺北市政府警察局內湖分局副分局長',
          '臺北市政府警察局交通警察大隊副大隊長',
          '臺北市政府警察局大同分局交通組組長',
          '臺北市政府警察局公共關係室股長',
          '臺北市政府警察局人事室股長',
          '臺北市政府警察局中山分局人事室主任',
          '臺北市政府警察局交通警察大隊人事室主任'
        ],
        appointmentDate: '114-08-28',
        refUrl: 'https://tt.police.gov.taipei/News_Content_Leader.aspx?n=848D8ED35111D812&sms=7CAF6BD4D3E48630&s=DAAEAA75EE6E901A'
      },
      // 副分局長資料 - 大安分局
      {
        id: '037',
        name: '林本泓',
        position: '副分局長',
        unit: '臺北市政府警察局大安分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/470/relpic/31814/9126940/b223a4c8-895c-4143-a6bf-be9dc8ba4e94.jpg',
        education: [
          '中央警察大學行政警察學系65期'
        ],
        experience: [
          '臺北市政府警察局大安分局副分局長(現任)',
          '臺北市政府警察局大同分局 副分局長',
          '臺北市政府警察局內湖分局 副分局長',
          '臺北市政府警察局中山分局行政組 組長',
          '臺北市政府警察局南港分局行政組 組長',
          '臺北市政府警察局中正第一分局督察組 組長',
          '臺北市政府警察局內湖分局督察組 組長',
          '臺北市政府警察局刑事警察大隊督察組 組長',
          '臺北市政府警察局督察室 督察員',
          '臺北市政府警察局保安科 警務正'
        ],
        appointmentDate: '113-02-26',
        refUrl: 'https://ta.police.gov.taipei/News_Content_Leader.aspx?n=B1FACD59BDFFC636&sms=7CAF6BD4D3E48630&s=C63B52CF5E32FF73'
      },
      {
        id: '038',
        name: '許煜凡',
        position: '副分局長',
        unit: '臺北市政府警察局大安分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/470/relpic/31814/9464023/87163070-1921-4e36-a847-d257ebbbcdba.jpg',
        education: [
          '中央警察大學行政警察學系碩士',
          '中央警察大學國境警察學系62期'
        ],
        experience: [
          '臺北市政府警察局大安分局副分局長(現任)',
          '臺北市政府警察局婦幼警察隊隊長',
          '臺北市政府警察局北投分局副分局長',
          '臺北市政府警察局大安分局督察組組長',
          '臺北市政府警察局信義分局督察組組長',
          '臺北市政府警察局中正第二分局督察組組長',
          '臺北市政府警察局捷運警察隊督察組組長',
          '臺北市政府警察局保安科警務正'
        ],
        appointmentDate: '114-08-28',
        refUrl: 'https://ta.police.gov.taipei/News_Content_Leader.aspx?n=B1FACD59BDFFC636&sms=7CAF6BD4D3E48630&s=A626B524B432A662'
      },
      // 副分局長資料 - 文山第一分局
      {
        id: '039',
        name: '周烱宏',
        position: '副分局長',
        unit: '臺北市政府警察局文山第一分局',
        photoUrl: 'https://w1.police.gov.taipei/ccmsimage/default_people.jpg',
        education: [
          '中央警察大學刑事警察學系65期'
        ],
        experience: [
          '臺北市政府警察局文山第一分局副分局長(現任)',
          '臺北市政府警察局行政科 警務正',
          '臺北市政府警察局松山分局保防組 組長',
          '臺北市政府警察局中山分局保防組 組長',
          '臺北市政府警察局行政科 專員',
          '臺北市政府警察局士林分局蘭雅派出所 所長',
          '臺北市政府警察局士林分局社子派出所 所長',
          '臺北市政府警察局南港分局玉成派出所 所長',
          '臺北市政府警察局南港分局 警務員',
          '臺北市政府警察局信義分局 巡官'
        ],
        appointmentDate: '114-03-11',
        refUrl: 'https://w1.police.gov.taipei/News_Content_Leader.aspx?n=9BDD9B2465632FE7&sms=7CAF6BD4D3E48630&s=8F760DA963DBACD9'
      },
      // 副分局長資料 - 文山第二分局
      {
        id: '040',
        name: '陳惠敏',
        position: '副分局長',
        unit: '臺北市政府警察局文山第二分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/504/relpic/31814/4896797/5243f42e-d0ce-462f-8e89-971bb0294777.jpg',
        education: [
          '中央警察大學警政研究所'
        ],
        experience: [
          '臺北市政府警察局文山第二分局副分局長(現任)',
          '臺北市政府警察局信義分局行政組組長',
          '臺北市政府警察局捷運警察隊行政組組長',
          '臺北市政府警察局訓練科股長',
          '臺北市政府警察局人事室警務正'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://w2.police.gov.taipei/News_Content_Leader.aspx?n=A75CC923F8C94193&sms=7CAF6BD4D3E48630&s=F3DF3D390147DDAB'
      },
      // 副分局長資料 - 松山分局
      {
        id: '041',
        name: '呂政國',
        position: '副分局長',
        unit: '臺北市政府警察局松山分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/471/relpic/31814/9367654/be453acc-5a07-46b6-a079-a6da08e31644.jpg',
        education: [
          '國立臺北教育大學資訊科學學系碩士畢業',
          '中央警察大學資訊管理學系67期畢業'
        ],
        experience: [
          '臺北市政府警察局松山分局副分局長(現任)',
          '臺北市政府警察局內湖分局副分局長',
          '臺北市政府警察局文山第一分局副分局長',
          '臺北市政府警察局資訊室技正',
          '臺北市政府警察局內湖分局行政組組長',
          '臺北市政府警察局通信隊行政組組長',
          '臺北市政府警察局資訊室技士',
          '臺北市政府警察局大安分局督察組組員',
          '臺北市政府警察局大安分局偵查隊組員',
          '臺北市政府警察局大安分局保防組警務員'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://ss.police.gov.taipei/News_Content_Leader.aspx?n=679084E9D1292599&sms=7CAF6BD4D3E48630&s=1186E66F2203BAA5'
      },
      {
        id: '042',
        name: '鄭威信',
        position: '副分局長',
        unit: '臺北市政府警察局松山分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/471/relpic/31814/9463275/70a53a76-d2f4-4e03-b1b0-2fce1d0d70a7.jpg',
        education: [
          '中央警察大學警佐班第46期'
        ],
        experience: [
          '臺北市政府警察局松山分局副分局長(現任)',
          '臺北市政府警察局保安警察大隊副大隊長',
          '臺北市政府警察局保安警察大隊第三中隊中隊長',
          '臺北市政府警察局保安警察大隊第一中隊中隊長'
        ],
        appointmentDate: '114-08-28',
        refUrl: 'https://ss.police.gov.taipei/News_Content_Leader.aspx?n=679084E9D1292599&sms=7CAF6BD4D3E48630&s=1186E66F2203BAA5'
      },
      // 副分局長資料 - 萬華分局
      {
        id: '043',
        name: '許卜仁',
        position: '副分局長',
        unit: '臺北市政府警察局萬華分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/500/relpic/31814/9366982/3eff1a13-e697-4d43-84ba-50932584ebcd.jpg',
        education: [
          '中央警察大學交通學系64期',
          '國立交通大學交通運輸工程學系碩士'
        ],
        experience: [
          '臺北市政府警察局萬華分局副分局長(現任)',
          '臺北市政府警察局中正第一分局副分局長',
          '臺北市政府警察局內湖分局副分局長',
          '臺北市政府警察局交通警察大隊副大隊長',
          '臺北市政府警察局信義分局交通組組長',
          '臺北市政府警察局交通警察大隊事故處理組組長',
          '臺北市政府警察局保安科警務正',
          '臺北市政府警察局犯罪預防科警務正'
        ],
        appointmentDate: '114-03-07',
        refUrl: 'https://wh.police.gov.taipei/News_Content_Leader.aspx?n=64412160C98C2EC8&sms=7CAF6BD4D3E48630&s=8D2F3F63E3A46926'
      },
      {
        id: '044',
        name: '陳義孟',
        position: '副分局長',
        unit: '臺北市政府警察局萬華分局',
        photoUrl: 'https://www-ws.gov.taipei/001/Upload/500/relpic/31814/9465017/03a1307e-24f3-42d4-84fd-a9673c067511.jpg',
        education: [
          '中央警察大學刑事警察學系65期'
        ],
        experience: [
          '臺北市政府警察局萬華分局副分局長(現任)',
          '臺北市政府警察局大同分局副分局長',
          '臺北市政府警察局文山第二分局副分局長',
          '臺北市政府警察局中正第一分局保防組組長',
          '臺北市政府警察局中正第二分局保防組組長',
          '臺北市政府警察局保防科警務正',
          '臺北市政府警察局後勤科警務正'
        ],
        appointmentDate: '114-08-28',
        refUrl: 'https://wh.police.gov.taipei/News_Content_Leader.aspx?n=64412160C98C2EC8&sms=7CAF6BD4D3E48630&s=92B28754E9C79165'
      }
    ];

    console.log(`加載了 ${officers.length} 位警察資料`);
    this.officersSubject.next(officers);
  }

  getFilteredOfficers(): Observable<PoliceOfficer[]> {
    return this.searchCriteriaSubject.pipe(
      tap(criteria => console.log('過濾條件變更:', criteria)),
      map(criteria => {
        const officers = this.officersSubject.getValue();
        console.log('過濾前人員數量:', officers.length);
        
        const filtered = officers.filter(officer => {
          const matchesSearch = this.matchesSearchTerm(officer, criteria.searchTerm);
          const matchesUnit = this.matchesUnit(officer, criteria.selectedUnit);
          const matchesPosition = this.matchesPosition(officer, criteria.selectedPosition);
          
          return matchesSearch && matchesUnit && matchesPosition;
        });
        
        console.log('過濾後人員數量:', filtered.length);
        return filtered;
      }),
      shareReplay(1)
    );
  }

  private matchesSearchTerm(officer: PoliceOfficer, searchTerm: string): boolean {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    return officer.name.toLowerCase().includes(term) ||
           officer.unit.toLowerCase().includes(term) ||
           officer.position.toLowerCase().includes(term);
  }

  private matchesUnit(officer: PoliceOfficer, selectedUnit: string): boolean {
    if (!selectedUnit) return true;
    return officer.unit.includes(selectedUnit);
  }

  private matchesPosition(officer: PoliceOfficer, selectedPosition: string): boolean {
    if (!selectedPosition) return true;
    return officer.position === selectedPosition;
  }

  updateSearchCriteria(criteria: Partial<SearchCriteria>): void {
    console.log('更新搜尋條件:', criteria);
    const currentCriteria = this.searchCriteriaSubject.value;
    const newCriteria = { ...currentCriteria, ...criteria };
    console.log('新的搜尋條件:', newCriteria);
    this.searchCriteriaSubject.next(newCriteria);
    
    // 強制觸發過濾器更新
    this.officersSubject.next(this.officersSubject.getValue());
  }

  getUnits(): Observable<string[]> {
    return this.officers$.pipe(
      map(officers => {
        const units = officers.map(officer => {
          if (officer.unit.includes('分局')) {
            return officer.unit.replace('臺北市政府警察局', '').trim();
          }
          return '警察局本部';
        });
        return [...new Set(units)].sort();
      })
    );
  }

  getPositions(): Observable<string[]> {
    return this.officers$.pipe(
      map(officers => {
        const positions = officers.map(officer => officer.position);
        return [...new Set(positions)].sort();
      })
    );
  }

  getStatistics(): Observable<{[key: string]: number}> {
    return this.officers$.pipe(
      map(officers => {
        const stats: {[key: string]: number} = {
          '局長': 0,
          '副局長': 0,
          '分局長': 0,
          '總數': officers.length
        };

        officers.forEach(officer => {
          if (stats[officer.position] !== undefined) {
            stats[officer.position]++;
          }
        });

        // 計算分局數量
        const divisions = new Set(
          officers
            .filter(o => o.position === '分局長')
            .map(o => o.unit.replace('臺北市政府警察局', '').trim())
        );
        stats['分局數'] = divisions.size;

        return stats;
      })
    );
  }

  getOfficerById(id: string): Observable<PoliceOfficer | undefined> {
    return this.officers$.pipe(
      map(officers => officers.find(officer => officer.id === id))
    );
  }

  getHighlightedOfficers(): Observable<PoliceOfficer[]> {
    return this.officers$.pipe(
      map(officers => officers.filter(officer => officer.isHighlighted))
    );
  }
}
