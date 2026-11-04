/**
 * 網站資料層
 * ------------------------------------------------------------
 * 重要：本專案環境目前無法直接連線 osa.nccu.edu.tw。
 * 以下單位名稱、電話與連結，是從公開搜尋結果（多為原站舊頁面快取、
 * 校安流程圖 PDF）整理而來，尚未與原站現行內容逐一核對。
 * `verified: false` 的項目在上線前必須以原站資料覆核。
 * 原站連線開放後，應以爬取結果取代本檔（見 docs/ia.md）。
 */

export const ORIGIN = 'https://osa.nccu.edu.tw/tw/';

export type Contact = { label: string; tel: string; display: string; note?: string };

export type Unit = {
  slug: string;
  name: string;
  short: string;
  en: string;
  summary: string;
  services: { title: string; desc: string; task?: string }[];
  contacts: Contact[];
  location?: string;
  hours?: string;
  url: string;
  verified: boolean;
};

export type Task = {
  slug: string;
  verb: string; // 「我想…」後面的動詞片語
  title: string;
  icon: string;
  audience: string[];
  summary: string;
  steps: { title: string; desc: string }[];
  units: string[]; // unit slugs
  keywords: string[];
  links: { label: string; url: string; verified: boolean }[];
};

export const units: Unit[] = [
  {
    slug: 'life-guidance',
    name: '生活事務暨僑生輔導組',
    short: '生僑組',
    en: 'Life Guidance & Overseas Chinese Student Advising',
    summary: '獎助學金、學雜費減免、就學貸款、急難救助，以及港澳、僑生與陸生的在學輔導。',
    services: [
      { title: '弱勢學生助學金', desc: '每學年受理，依家庭年收入核定補助額度。', task: 'scholarship' },
      { title: '學雜費減免', desc: '身障、原住民、低收入戶等身分適用。', task: 'scholarship' },
      { title: '就學貸款', desc: '每學期註冊前辦理對保與申請。', task: 'scholarship' },
      { title: '急難救助', desc: '家庭突發變故、重大傷病時的緊急經濟協助。', task: 'emergency-aid' },
      { title: '請假與缺曠', desc: '事假、病假、喪假等線上申請與核准流程。', task: 'leave' },
      { title: '僑生／港澳生／陸生輔導', desc: '居留、保險、生活適應與在學相關事務。', task: 'overseas' },
    ],
    contacts: [{ label: '學務處總機', tel: '+886229393091', display: '02-2939-3091' }],
    url: ORIGIN,
    verified: false,
  },
  {
    slug: 'housing',
    name: '住宿輔導組',
    short: '住宿組',
    en: 'Housing Services',
    summary: '學生宿舍申請與床位分配、宿舍費用、修繕、退宿，以及校外租屋資訊。',
    services: [
      { title: '宿舍申請與抽籤', desc: '新生、舊生與研究生床位申請及分配結果。', task: 'dorm' },
      { title: '住宿費用', desc: '各宿舍收費標準與繳費期限。', task: 'dorm' },
      { title: '宿舍修繕', desc: '寢室設備故障線上報修。', task: 'dorm' },
      { title: '退宿與離宿', desc: '學期中退宿、期末離宿流程與退費。', task: 'dorm' },
      { title: '校外租屋', desc: '租屋安全評核、租賃契約與糾紛協助。', task: 'off-campus' },
    ],
    contacts: [
      { label: '非上班時間值勤輔導員', tel: '+886910631831', display: '0910-631-831', note: '來源為校安流程圖，待核對' },
    ],
    url: ORIGIN,
    verified: false,
  },
  {
    slug: 'activities',
    name: '課外活動指導組',
    short: '課外組',
    en: 'Student Activities',
    summary: '學生社團成立與經費、活動場地借用、學生自治組織與服務學習。',
    services: [
      { title: '社團成立與評鑑', desc: '新社團申請、年度評鑑與社團名錄。', task: 'club' },
      { title: '活動經費補助', desc: '社團與學生團體活動經費申請、核銷。', task: 'club' },
      { title: '場地借用', desc: '活動中心與各類展演、會議空間借用。', task: 'venue' },
      { title: '學生自治', desc: '學生會、學生議會等自治組織輔導。' },
    ],
    contacts: [{ label: '學務處總機', tel: '+886229393091', display: '02-2939-3091' }],
    url: ORIGIN,
    verified: false,
  },
  {
    slug: 'safety',
    name: '學生安全輔導中心',
    short: '學安中心',
    en: 'Student Safety Service',
    summary: '24 小時校安通報與緊急處理、交通與賃居安全、防災宣導與兵役業務。',
    services: [
      { title: '24 小時校安通報', desc: '意外、傷病、糾紛等事件的即時處理與協助。', task: 'emergency' },
      { title: '交通安全', desc: '校園與周邊交通安全宣導、事故協助。' },
      { title: '防災與安全宣導', desc: '地震、颱風等防災資訊與演練。' },
      { title: '兵役業務', desc: '緩徵、儘後召集等兵役相關申請。' },
    ],
    contacts: [
      { label: '校安 24 小時專線', tel: '+886919099119', display: '0919-099-119' },
      { label: '學安中心辦公室', tel: '+886229393091,66119', display: '02-2939-3091 分機 66119' },
    ],
    hours: '校安專線 24 小時，全年無休',
    url: ORIGIN,
    verified: false,
  },
  {
    slug: 'health',
    name: '身心健康中心',
    short: '身心中心',
    en: 'Physical & Mental Health Center',
    summary: '心理諮商與初談、衛生保健、傷病處理、健康檢查，以及特殊教育學生資源。',
    services: [
      { title: '預約初談與心理諮商', desc: '第一次使用請先預約初談，由專業心理師評估後安排後續諮商。', task: 'counseling' },
      { title: '衛生保健與傷病處理', desc: '校內輕傷處理、健康諮詢與器材借用。', task: 'health' },
      { title: '新生健康檢查', desc: '入學新生健康檢查與資料上傳。', task: 'health' },
      { title: '道南分館', desc: '2025 年 3 月啟用，位於道南新村，提供個別諮商與表達性藝術治療。', task: 'counseling' },
    ],
    contacts: [
      { label: '心理諮商值班', tel: '+886282377419', display: '02-8237-7419', note: '週一至週五 09:00–17:00' },
      { label: '衛生保健值班', tel: '+886282377424', display: '02-8237-7424' },
    ],
    hours: '週一至週五 09:00–17:00（來源為舊頁面，待核對）',
    url: ORIGIN,
    verified: false,
  },
  {
    slug: 'career',
    name: '職涯發展中心',
    short: '職涯中心',
    en: 'Career Center',
    summary: '職涯諮詢、實習與工作機會、徵才活動與職涯測評。',
    services: [
      { title: '一對一職涯諮詢', desc: '由職涯顧問協助履歷、面試與方向探索。', task: 'career' },
      { title: '實習與工作機會', desc: '校內外實習媒合與職缺資訊。', task: 'career' },
      { title: '校園徵才', desc: '企業說明會與就業博覽會。', task: 'career' },
    ],
    contacts: [{ label: '學務處總機', tel: '+886229393091', display: '02-2939-3091' }],
    url: ORIGIN,
    verified: false,
  },
  {
    slug: 'arts',
    name: '藝文中心',
    short: '藝文中心',
    en: 'Art & Culture Center',
    summary: '校園展演、藝文課程與藝術季活動，經營藝文中心展演空間。',
    services: [
      { title: '展演節目', desc: '音樂、戲劇與展覽節目資訊與購票。' },
      { title: '藝文課程', desc: '開放學生報名的藝術與文化課程。' },
    ],
    contacts: [{ label: '學務處總機', tel: '+886229393091', display: '02-2939-3091' }],
    url: ORIGIN,
    verified: false,
  },
];

const o = (label: string) => ({ label, url: ORIGIN, verified: false });

export const tasks: Task[] = [
  {
    slug: 'dorm',
    verb: '申請宿舍',
    title: '申請學生宿舍',
    icon: 'bed',
    audience: ['新生', '在校生', '研究生', '國際生', '家長'],
    summary: '從申請、抽籤到入住、繳費與退宿，一次看懂流程。',
    steps: [
      { title: '確認申請資格與時程', desc: '新生、舊生與研究生的申請期間不同，請留意住宿組公告。' },
      { title: '線上提出申請', desc: '於申請期間登入系統填寫志願。' },
      { title: '查詢分配結果', desc: '結果公告後於期限內確認床位。' },
      { title: '繳費與入住', desc: '依繳費單完成繳費，於入住日辦理進住。' },
    ],
    units: ['housing'],
    keywords: ['宿舍', '住宿', '床位', '抽籤', '退宿', '修繕', 'dorm', 'housing'],
    links: [o('住宿組公告'), o('宿舍申請系統')],
  },
  {
    slug: 'scholarship',
    verb: '找獎學金',
    title: '獎助學金、減免與就學貸款',
    icon: 'coin',
    audience: ['在校生', '新生', '研究生', '家長'],
    summary: '弱勢助學金、校內外獎學金、學雜費減免與就學貸款的申請入口。',
    steps: [
      { title: '找出適合的補助類型', desc: '依身分與家庭經濟狀況，選擇助學金、減免或貸款。' },
      { title: '留意受理期間', desc: '例如弱勢學生助學金多在每學年 9 月上旬受理。' },
      { title: '備齊文件並申請', desc: '依申請須知準備證明文件，線上或紙本送件。' },
      { title: '查詢審核結果', desc: '結果將公告於學務處網站並以信件通知。' },
    ],
    units: ['life-guidance'],
    keywords: ['獎學金', '助學金', '減免', '學貸', '就學貸款', '補助', '弱勢', 'scholarship'],
    links: [o('獎助學金公告'), o('校外獎學金彙整')],
  },
  {
    slug: 'leave',
    verb: '請假',
    title: '請假與缺曠',
    icon: 'calendar',
    audience: ['在校生'],
    summary: '事假、病假、喪假、公假的線上申請與證明文件。',
    steps: [
      { title: '登入校務系統', desc: '使用學號登入 iNCCU 校務系統的請假功能。' },
      { title: '選擇假別與節次', desc: '填寫日期、節次與事由，必要時上傳證明。' },
      { title: '等待核准', desc: '依假別與天數由導師、系所或學務處核准。' },
    ],
    units: ['life-guidance'],
    keywords: ['請假', '病假', '事假', '喪假', '公假', '缺曠', 'leave'],
    links: [o('請假辦法'), o('iNCCU 校務系統')],
  },
  {
    slug: 'counseling',
    verb: '預約諮商',
    title: '預約心理諮商',
    icon: 'heart',
    audience: ['在校生', '研究生', '國際生'],
    summary: '心情低落、壓力大或人際困擾，都可以找身心健康中心聊聊。服務免費、保密。',
    steps: [
      { title: '預約初談', desc: '第一次使用請先預約初談，可線上預約或於上班時間來電。' },
      { title: '與心理師初談', desc: '約 50 分鐘，了解你的需要並說明可用資源。' },
      { title: '安排後續諮商', desc: '依評估安排個別諮商、團體或轉介。' },
    ],
    units: ['health'],
    keywords: ['諮商', '心理', '初談', '壓力', '情緒', '心理師', 'counseling', 'mental health'],
    links: [o('身心健康中心'), o('初談預約')],
  },
  {
    slug: 'health',
    verb: '看病或處理傷口',
    title: '健康與傷病處理',
    icon: 'cross',
    audience: ['在校生', '新生', '教職員', '家長'],
    summary: '校內輕傷處理、新生健檢、學生團體保險理賠。',
    steps: [
      { title: '輕傷可至保健室', desc: '上班時間至身心健康中心衛生保健處理。' },
      { title: '緊急傷病請撥 119', desc: '並同步通報校安 24 小時專線。' },
      { title: '學生保險理賠', desc: '就醫後備齊收據與診斷書申請。' },
    ],
    units: ['health', 'safety'],
    keywords: ['保健', '受傷', '健檢', '保險', '理賠', '生病', 'health'],
    links: [o('衛生保健'), o('學生團體保險')],
  },
  {
    slug: 'club',
    verb: '辦社團活動',
    title: '社團與活動',
    icon: 'spark',
    audience: ['在校生'],
    summary: '成立社團、申請活動經費、辦理活動的完整流程。',
    steps: [
      { title: '確認活動企劃', desc: '活動前完成企劃書與預算。' },
      { title: '申請經費與場地', desc: '依期限提出經費補助與場地借用。' },
      { title: '活動後核銷', desc: '於期限內完成成果報告與核銷。' },
    ],
    units: ['activities'],
    keywords: ['社團', '活動', '經費', '核銷', 'club'],
    links: [o('課外組公告'), o('社團名錄')],
  },
  {
    slug: 'venue',
    verb: '借場地',
    title: '借用活動場地',
    icon: 'door',
    audience: ['在校生', '教職員'],
    summary: '活動中心、會議室與展演空間的借用規則與申請。',
    steps: [
      { title: '查詢場地與空檔', desc: '先確認場地容量、設備與可借時段。' },
      { title: '線上申請', desc: '依規定期限提出借用申請。' },
    ],
    units: ['activities'],
    keywords: ['場地', '借用', '教室', '活動中心', 'venue'],
    links: [o('場地借用系統')],
  },
  {
    slug: 'career',
    verb: '找實習或工作',
    title: '實習、工作與職涯諮詢',
    icon: 'briefcase',
    audience: ['在校生', '研究生', '校友'],
    summary: '職涯顧問一對一諮詢、實習媒合、校園徵才活動。',
    steps: [
      { title: '預約職涯諮詢', desc: '履歷健診、模擬面試或方向探索。' },
      { title: '瀏覽實習與職缺', desc: '定期更新的校內外機會。' },
      { title: '參加徵才活動', desc: '企業說明會與就業博覽會。' },
    ],
    units: ['career'],
    keywords: ['實習', '工作', '職缺', '履歷', '面試', '職涯', 'career', 'internship'],
    links: [o('職涯發展中心')],
  },
  {
    slug: 'off-campus',
    verb: '在校外租屋',
    title: '校外租屋',
    icon: 'home',
    audience: ['在校生', '研究生'],
    summary: '租屋安全、契約注意事項與糾紛協助。',
    steps: [
      { title: '查詢租屋資訊', desc: '優先選擇經安全評核的物件。' },
      { title: '簽約前檢查', desc: '確認消防設施與契約內容。' },
      { title: '遇到糾紛', desc: '可洽住宿組或學安中心協助。' },
    ],
    units: ['housing', 'safety'],
    keywords: ['租屋', '校外', '房東', '契約'],
    links: [o('校外租屋資訊')],
  },
  {
    slug: 'emergency-aid',
    verb: '申請急難救助',
    title: '急難救助',
    icon: 'lifebuoy',
    audience: ['在校生'],
    summary: '家庭突發變故或重大傷病造成經濟困難時的緊急協助。',
    steps: [
      { title: '聯繫生僑組', desc: '說明狀況，承辦人協助評估。' },
      { title: '備齊證明文件', desc: '依事由提供相關證明。' },
    ],
    units: ['life-guidance'],
    keywords: ['急難', '救助', '經濟困難', '補助'],
    links: [o('急難救助辦法')],
  },
  {
    slug: 'overseas',
    verb: '辦僑生／陸生事務',
    title: '僑生、港澳生與陸生服務',
    icon: 'globe',
    audience: ['僑生', '港澳生', '陸生'],
    summary: '居留、健保、工作許可與生活適應。',
    steps: [
      { title: '新生報到', desc: '完成報到與居留相關手續。' },
      { title: '健保與保險', desc: '依身分辦理健保或保險。' },
    ],
    units: ['life-guidance'],
    keywords: ['僑生', '港澳', '陸生', '居留', '健保'],
    links: [o('僑陸生服務')],
  },
  {
    slug: 'emergency',
    verb: '緊急求助',
    title: '緊急求助',
    icon: 'alert',
    audience: ['所有人', '家長'],
    summary: '24 小時校安專線與校外緊急資源。',
    steps: [],
    units: ['safety', 'health'],
    keywords: ['緊急', '求助', '校安', '危機', '自殺', '急救', '119', '110', 'emergency'],
    links: [],
  },
];

/** 首頁優先顯示的任務 */
export const featuredTasks = ['dorm', 'scholarship', 'leave', 'counseling', 'career', 'club'];

export const emergency = {
  campus: [
    { label: '校安 24 小時專線', tel: '+886919099119', display: '0919-099-119', desc: '校內任何意外、傷病、安全事件，全天候有人接聽。', primary: true, verified: false },
    { label: '駐警隊', tel: '+886229393091,66110', display: '02-2939-3091 #66110', desc: '校園治安、門禁與巡邏。', verified: false },
    { label: '住宿組夜間值勤', tel: '+886910631831', display: '0910-631-831', desc: '宿舍非上班時間的緊急狀況。', verified: false },
    { label: '身心健康中心（上班時間）', tel: '+886282377419', display: '02-8237-7419', desc: '週一至週五 09:00–17:00 心理諮商值班。', verified: false },
  ],
  national: [
    { label: '報案', tel: '110', display: '110', desc: '警察局' },
    { label: '消防・救護', tel: '119', display: '119', desc: '火災、急救、救護車' },
    { label: '安心專線', tel: '1925', display: '1925', desc: '24 小時心理諮詢（依舊愛我）' },
    { label: '保護專線', tel: '113', display: '113', desc: '家暴、性侵害、兒少保護' },
    { label: '生命線', tel: '1995', display: '1995', desc: '24 小時協談' },
    { label: '張老師', tel: '1980', display: '1980', desc: '協談專線' },
  ],
};

export type News = { title: string; date: string; unit: string; category: string; sample: true };

/**
 * 範例消息：依搜尋結果中出現過的公告主題改寫，僅示範版面。
 * 上線時改接原站 RSS／爬取資料。
 */
export const news: News[] = [
  { title: '114 學年度弱勢學生助學金申請須知（受理期間 9/8–9/12）', date: '2025-08-25', unit: 'life-guidance', category: '獎助學金', sample: true },
  { title: '身心健康中心「道南分館」正式啟用，提供個別諮商與表達性藝術治療', date: '2025-03-17', unit: 'health', category: '身心健康', sample: true },
  { title: '學生宿舍寢室個人小冰箱使用申請公告', date: '2025-09-01', unit: 'housing', category: '住宿', sample: true },
  { title: '新學期社團經費補助申請說明會', date: '2025-09-10', unit: 'activities', category: '社團活動', sample: true },
  { title: '颱風期間校園安全與停課資訊查詢方式', date: '2025-07-28', unit: 'safety', category: '校園安全', sample: true },
  { title: '校園徵才博覽會參展企業名單公布', date: '2025-03-03', unit: 'career', category: '職涯', sample: true },
  { title: '新生健康檢查時間與注意事項', date: '2025-08-18', unit: 'health', category: '身心健康', sample: true },
  { title: '校外賃居安全評核物件更新', date: '2025-08-05', unit: 'housing', category: '住宿', sample: true },
].sort((a, b) => b.date.localeCompare(a.date)) as News[];

export const unitBySlug = (s: string) => units.find((u) => u.slug === s)!;
export const taskBySlug = (s: string) => tasks.find((t) => t.slug === s)!;
