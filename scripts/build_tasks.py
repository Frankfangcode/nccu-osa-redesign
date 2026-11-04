"""Build src/data/tasks.json from the scraped units.json.

Every task link is looked up by (unit slug, link title[, section title]) in the
scraped data, so no URL is typed by hand. The script fails loudly if a lookup
misses, which keeps the task layer honest when the source data is refreshed.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
units = json.loads((ROOT / "src/data/units.json").read_text(encoding="utf-8"))
by_slug = {u["slug"]: u for u in units}


def L(unit, title, section=None, label=None):
    u = by_slug[unit]
    hits = [
        l
        for s in u["sections"]
        if section is None or s["title"] == section
        for l in s["links"]
        if l["title"] == title
    ]
    if not hits:
        sys.exit(f"missing link: {unit} / {section} / {title}")
    return {"title": label or hits[0]["title"], "url": hits[0]["url"]}


ALL = ["新生", "在學生", "研究生"]
UG = ["新生", "在學生"]

# (slug, phrase, title, group, unit, audiences, keywords, summary, links)
T = [
    # ---- 獎助與費用 ----
    ("scholarship", "找獎學金", "申請獎助學金", "獎助與費用", "student-life", ALL + ["僑生", "原民生"],
     ["獎學金", "助學金", "圓夢", "清寒"],
     "校內外獎助學金的申請流程與分類一覽，原住民族學生另有專屬獎助資訊。",
     [L("student-life", "獎助學金", label="校內外獎助學金申請流程"),
      L("student-life", "助學措施Q＆A", label="助學措施常見問題"),
      L("indigenous-center", "獎助資訊", label="原住民族學生獎助資訊"),
      L("student-activities", "廖風德公共服務獎學金")]),
    ("student-loan", "辦就學貸款", "就學貸款", "獎助與費用", "student-life", ALL,
     ["就貸", "貸款", "學貸", "銀行"],
     "每學期註冊前辦理，需先向銀行申貸，再把文件交回學校。",
     [L("student-life", "就學貸款", label="就學貸款須知")]),
    ("tuition-waiver", "減免學雜費", "學雜費減免", "獎助與費用", "student-life", ALL + ["原民生"],
     ["減免", "學費", "低收入", "身心障礙"],
     "符合資格的學生可在每學期規定期間內申請減免學雜費。",
     [L("student-life", "學雜費減免", label="學雜費減免申請流程")]),
    ("emergency-aid", "申請急難慰助", "急難慰助", "獎助與費用", "student-life", ALL + ["僑生", "陸生"],
     ["急難", "慰助", "家庭變故", "救助"],
     "遭遇家庭變故、重大傷病等突發狀況時，可申請校內外急難慰助。",
     [L("student-life", "急難慰助", label="校內、校外急難慰助")]),
    ("disadvantaged-aid", "申請助學金", "不利處境學生助學金與補助", "獎助與費用", "student-life", ALL,
     ["助學金", "生活助學金", "生理用品", "失業勞工"],
     "經濟不利處境學生的助學金、生活助學金與專項補助。",
     [L("student-life", "不利處境學生助學金"),
      L("student-life", "助學服務", label="助學服務與生活助學金"),
      L("student-life", "不利處境學生多元生理用品專項補助"),
      L("student-life", "失業勞工子女就學補助"),
      L("dean-office", "大專校院不利處境學生助學計畫專區")]),
    ("hope-seed", "參加希望種子計畫", "希望種子培育計畫", "獎助與費用", "hope-seed", UG,
     ["希望種子", "考試補助", "課業輔導", "培力"],
     "為經濟或文化不利學生提供考試補助、課業輔導與職涯培力，先完成資格認證。",
     [L("hope-seed", "資格認證暨必要條件申請", label="資格認證申請"),
      L("hope-seed", "考試優惠"),
      L("hope-seed", "課業學習輔導"),
      L("hope-seed", "其他助學資源")]),
    ("part-time", "找校內工讀", "校內工讀與兼職", "獎助與費用", "career-center", ALL,
     ["工讀", "打工", "兼職", "助學"],
     "校內工讀與就業機會彙整；助學工讀則由生僑組辦理。",
     [L("career-center", "就業與工讀機會"),
      L("student-life", "助學服務", label="助學服務（含工讀登錄）")]),
    ("refund", "辦休退學退費", "休退學與畢業退費", "獎助與費用", "student-life", ALL,
     ["休學", "退學", "退費", "提前畢業"],
     "休學、退學或研究生提前畢業時，學雜費依時間點按比例退還。",
     [L("student-life", "休退學暨研究生畢業退費", label="休退學退費標準")]),

    # ---- 住宿 ----
    ("dorm", "申請宿舍", "申請學生宿舍", "住宿", "housing", ALL + ["僑生", "陸生"],
     ["宿舍", "住宿", "床位", "抽籤", "自強", "莊敬"],
     "學士班與碩博士班分開申請，費用、床位尺寸與宿舍照片都可以先查。",
     [L("housing", "學士班宿舍申請"),
      L("housing", "碩博士班宿舍申請"),
      L("housing", "宿舍費用及床位尺寸資訊"),
      L("housing", "宿舍照片"),
      L("housing", "宿舍性別友善")]),
    ("dorm-change", "換寢室或退宿", "換寢室與退宿", "住宿", "housing", ALL,
     ["換房", "寢室異動", "退宿", "宿費"],
     "寢室異動、退離宿程序與退補宿費的規定。",
     [L("housing", "寢室異動流程"),
      L("housing", "退離宿程序"),
      L("housing", "退/補宿費規定")]),
    ("off-campus", "找校外租屋", "校外租屋", "住宿", "housing", ALL,
     ["租屋", "賃居", "外宿", "房東"],
     "校外賃居資訊網提供租屋資訊與租屋安全提醒。",
     [L("housing", "校外賃居資訊網"),
      L("housing", "宿舍生活資訊")]),
    ("dorm-alternative", "了解中繼宿舍", "莊敬外舍拆建替代宿舍", "住宿", "housing", ALL,
     ["中繼宿舍", "久康街", "社會住宅", "化南新村", "國際學舍"],
     "莊敬外舍拆建期間，學校提供的替代住宿方案。",
     [L("housing", "木柵久康街社會住宅_政大中繼宿舍", label="木柵久康街社會住宅（政大中繼宿舍）"),
      L("housing", "化南新村臨時學生宿舍"),
      L("housing", "臺北國際學舍床位轉介專案")]),
    ("dorm-points", "處理宿舍記點", "宿舍記點、銷點與申訴", "住宿", "housing", ALL,
     ["記點", "銷點", "違規", "申訴"],
     "宿舍違規記點後的銷點方式，以及不服處分時的申訴管道。",
     [L("housing", "宿舍違規記點銷點流程"),
      L("housing", "宿舍獎懲申訴")]),
    ("freshman-academy", "了解新生書院", "政大新生書院", "住宿", "housing", ["新生"],
     ["新生書院", "書院", "大一"],
     "以住宿生活為核心的新生學習社群，有輔導資源與活動。",
     [L("housing", "政大新生書院"),
      L("housing", "新生書院輔導資源"),
      L("housing", "新生書院活動介紹")]),

    # ---- 身心健康 ----
    ("counseling", "預約諮商", "預約心理諮商", "身心健康", "health-center", ALL + ["僑生", "陸生", "原民生"],
     ["諮商", "心理", "初談", "情緒", "壓力", "輔導"],
     "先預約初談，由心理師了解你的狀況後安排後續諮商；服務免費且保密。",
     [L("health-center", "我要預約初談", label="預約初談說明"),
      L("health-center", "學生預約初談系統（SSO）", label="學生預約初談系統"),
      L("health-center", "服務項目", section="心理諮商", label="心理諮商服務項目"),
      L("health-center", "線上心理健康健檢")]),
    ("workshop", "參加心理工作坊", "心理衛生活動與團體", "身心健康", "health-center", ALL,
     ["工作坊", "團體", "心理測驗", "講座"],
     "身心健康中心舉辦的團體、工作坊、心理測驗與講座。",
     [L("health-center", "團體/工作坊"),
      L("health-center", "全校性心理衛生活動"),
      L("health-center", "團體測驗")]),
    ("health-check", "查體檢結果", "學生健康檢查", "身心健康", "health-center", ["新生"],
     ["體檢", "健康檢查", "新生健檢"],
     "新生入學健康檢查的說明與線上結果查詢。",
     [L("health-center", "學生健康檢查"),
      L("health-center", "學生體檢結果查詢")]),
    ("first-aid", "處理受傷或急病", "緊急傷病與醫療用品", "身心健康", "health-center", ALL,
     ["受傷", "急救", "保健室", "醫療用品", "傳染病"],
     "校內受傷或急病的救護方式、醫療用品借用與傳染病防治資訊。",
     [L("health-center", "緊急傷病救護"),
      L("health-center", "醫療用品借用"),
      L("health-center", "傳染病防治")]),
    ("disability", "申請特教支持", "資源教室服務", "身心健康", "resource-room", ALL,
     ["資源教室", "身心障礙", "特教", "考試調整"],
     "為身心障礙與特殊教育需求學生提供學習、生活與生涯支持。",
     [L("resource-room", "服務項目", label="資源教室服務項目"),
      L("resource-room", "資源教室簡介"),
      L("resource-room", "特殊教育推行委員會"),
      L("hope-seed", "特殊教育學生生涯軌道學習輔導")]),
    ("mentor", "找導師談談", "導師制", "身心健康", "health-center", UG,
     ["導師", "導生", "輔導"],
     "每位學生都有導師，可以就學習與生活適應找導師討論。",
     [L("health-center", "導師制業務")]),

    # ---- 請假、兵役與學籍 ----
    ("leave", "請假", "學生請假", "請假、兵役與學籍", "student-life", ALL,
     ["請假", "病假", "事假", "公假", "缺曠"],
     "請假流程與線上請假系統的說明，依假別準備證明文件。",
     [L("student-life", "學生請假", label="學生請假流程")]),
    ("military", "辦兵役緩徵", "兵役緩徵與役期折減", "請假、兵役與學籍", "student-life", ALL,
     ["兵役", "緩徵", "儘後召集", "役期折減", "預官"],
     "在學男生的緩徵、儘後召集，以及修全民國防課程的役期折減。",
     [L("student-life", "學生兵役", label="學生兵役（緩徵、儘後召集）"),
      L("student-safety", "役期折減作業"),
      L("student-safety", "預官輔考")]),
    ("insurance", "申請保險理賠", "學生團體平安保險", "請假、兵役與學籍", "student-life", ALL,
     ["保險", "理賠", "平安保險", "醫療"],
     "學生團體平安保險的保障內容與理賠申請流程。",
     [L("student-life", "學生團體平安保險")]),
    ("lost", "找遺失物", "遺失物招領", "請假、兵役與學籍", "student-life", ALL,
     ["遺失", "失物", "撿到", "招領"],
     "校內拾獲物品的招領方式。",
     [L("student-life", "遺失物招領")]),
    ("merit", "申請銷過", "學生獎懲與銷過", "請假、兵役與學籍", "student-life", ALL,
     ["獎懲", "銷過", "記過", "操行"],
     "學生獎懲建議流程、銷過申請與操行成績說明。",
     [L("student-life", "學生獎懲")]),
    ("appeal", "提出申訴", "學生申訴", "請假、兵役與學籍", "dean-office", ALL,
     ["申訴", "權益", "不服"],
     "對學校的處分或措施有異議時，可依程序提出申訴。",
     [L("dean-office", "學生申訴")]),
    ("forms", "下載表格", "表格與法規", "請假、兵役與學籍", "dean-office", ALL,
     ["表格", "表單", "法規", "下載"],
     "學務處各組的表格與法規下載入口。",
     [L("dean-office", "表格下載", label="學務長室表格"),
      L("dean-office", "法規彙編", label="學務法規彙編"),
      L("student-life", "表格下載", section="法規及表單", label="生僑組表格"),
      L("housing", "表格下載", label="住宿組表格"),
      L("student-activities", "表格下載", label="課外組表格")]),

    # ---- 社團與活動 ----
    ("clubs", "加入社團", "找社團", "社團與活動", "student-activities", ALL + ["僑生", "陸生"],
     ["社團", "學生會", "學生自治"],
     "學術、藝術、聯誼、服務、體適能社團與學生自治團體的網頁連結。",
     [L("student-activities", "社團網頁連結", label="社團網頁一覽"),
      L("student-life", "陸生社團輔導")]),
    ("club-funding", "申請社團補助", "社團補助與海報張貼", "社團與活動", "student-activities", ALL,
     ["補助", "社團經費", "海報", "張貼"],
     "社團活動補助與海報張貼都在線上申請。",
     [L("student-activities", "學生社團補助線上申請"),
      L("student-activities", "海報張貼線上申請")]),
    ("venue", "借場地", "借場地與器材", "社團與活動", "student-activities", ALL,
     ["場地", "器材", "借用", "樂活館", "藝文中心"],
     "課外組、藝文中心與宿舍的場地和器材借用資訊。",
     [L("student-activities", "場地介紹", label="課外組場地"),
      L("student-activities", "器材介紹", label="課外組器材"),
      L("student-activities", "樂活館使用登記系統"),
      L("arts-center", "藝文中心場地介紹"),
      L("housing", "自強十舍C棟B1餐廳借用")]),
    ("arts", "看藝文表演", "藝文節目與展覽", "社團與活動", "arts-center", ALL,
     ["表演", "展覽", "藝文", "音樂會", "講座"],
     "藝文中心的表演節目與創作藝廊展覽。",
     [L("arts-center", "節目介紹"),
      L("arts-center", "創作藝廊")]),
    ("volunteer", "當志工", "志工招募", "社團與活動", "arts-center", ALL,
     ["志工", "服務", "視聽服務團"],
     "藝文中心志工工作室與課外組視聽服務團的招募資訊。",
     [L("arts-center", "報名資訊", label="藝文中心志工報名"),
      L("arts-center", "組織介紹", section="志工工作室", label="藝文中心志工工作室"),
      L("student-activities", "視聽服務團")]),
    ("campus-events", "參加校園大活動", "校慶、畢業典禮與新生營", "社團與活動", "student-activities", ALL,
     ["校慶", "畢業典禮", "新生營", "超政"],
     "校慶系列活動、畢業典禮與超政新生定位營。",
     [L("student-activities", "校慶系列活動"),
      L("student-activities", "畢業典禮"),
      L("student-activities", "超政新生定位營")]),
    ("chorus", "報名文化盃", "文化盃合唱比賽", "社團與活動", "student-activities", UG,
     ["文化盃", "合唱", "比賽"],
     "政大年度傳統合唱比賽的辦法與資訊。",
     [L("student-activities", "文化盃合唱比賽")]),

    # ---- 職涯 ----
    ("internship", "找實習", "國內外實習", "職涯", "career-center", ALL,
     ["實習", "海外實習", "暑期實習"],
     "國內與海外實習機會，以及學校的實習作業系統。",
     [L("career-center", "國內實習"),
      L("career-center", "海外實習"),
      L("career-center", "實習政策專區/實習作業系統")]),
    ("jobs", "找工作", "職缺與校園徵才", "職涯", "career-center", ALL,
     ["職缺", "求職", "徵才", "就業博覽會"],
     "職涯平台上的職缺訊息與每年的校園徵才月活動。",
     [L("career-center", "職缺訊息"),
      L("career-center", "徵才月"),
      L("career-center", "校園徵才月活動")]),
    ("career-advice", "諮詢職涯方向", "職涯諮詢與履歷", "職涯", "career-center", ALL,
     ["職涯諮詢", "履歷", "面試", "業師", "興趣探索"],
     "預約業師面對面諮詢、履歷與面試技巧，以及職涯興趣探索。",
     [L("career-center", "業師諮詢面對面與預約"),
      L("career-center", "職涯諮詢", label="職涯諮詢預約（職涯平台）"),
      L("career-center", "履歷撰寫與面試技巧"),
      L("career-center", "職涯興趣探索")]),
    ("career-talks", "聽職涯講座", "職涯講座", "職涯", "career-center", ALL,
     ["講座", "職涯講座"],
     "職涯發展中心的講座介紹與場次表。",
     [L("career-center", "職涯講座", section="職涯活動", label="職涯講座介紹"),
      L("career-center", "職涯講座", section="職涯平台 cd.nccu.edu.tw", label="講座場次表")]),

    # ---- 校園安全 ----
    ("report-emergency", "通報緊急事故", "學生緊急事故通報", "校園安全", "student-safety", ALL,
     ["緊急", "事故", "通報", "校安"],
     "學生發生意外或緊急事故時的通報方式與處理流程。",
     [L("student-safety", "學生緊急事故通報"),
      L("student-safety", "校園災害緊急事件處理流程圖")]),
    ("safety-map", "查校園安全地圖", "校園安全地圖與逃生路線", "校園安全", "student-safety", ALL,
     ["安全地圖", "逃生", "疏散", "防災"],
     "校園安全地圖、疏散逃生路線與災害防救計畫。",
     [L("student-safety", "校園安全地圖"),
      L("student-safety", "校園疏散逃生路線圖"),
      L("student-safety", "政治大學災害防救計畫")]),
    ("personal-safety", "防範詐騙", "人身、交通與防災安全", "校園安全", "student-safety", ALL,
     ["詐騙", "反詐騙", "交通安全", "地震", "人身安全"],
     "反詐騙、交通安全與地震防護等安全教育資訊。",
     [L("student-safety", "人身安全教育", label="人身安全與反詐騙"),
      L("student-safety", "交通安全教育"),
      L("student-safety", "防災教育")]),
    ("bullying", "舉報霸凌", "校園霸凌防制", "校園安全", "student-safety", ALL,
     ["霸凌", "防制"],
     "校園霸凌防制委員會與處理機制。",
     [L("student-safety", "校園霸凌防制")]),

    # ---- 僑生、陸生與原民生 ----
    ("overseas-new", "辦僑生新生報到", "僑生新生入學", "僑生、陸生與原民生", "student-life", ["僑生", "新生"],
     ["僑生", "新生", "報到", "居留"],
     "新僑生報到註冊、居留規定、住宿與獎助學金的一站式說明。",
     [L("student-life", "新僑生入學專區")]),
    ("overseas-life", "辦居留與重入境", "僑生居留與生活輔導", "僑生、陸生與原民生", "student-life", ["僑生"],
     ["居留證", "重入境", "僑生保險", "工作許可"],
     "僑生居留、重入境、保險、工作許可與畢業輔導。",
     [L("student-life", "僑生生活輔導", label="僑生居留與重入境"),
      L("student-life", "僑生畢業輔導")]),
    ("mainland", "辦陸生入臺手續", "陸生入學與生活輔導", "僑生、陸生與原民生", "student-life", ["陸生"],
     ["陸生", "入臺", "延長停留", "出境"],
     "陸生入臺申請、延長停留、畢業出境與新生入學說明。",
     [L("student-life", "陸生生活輔導", label="陸生入臺申請與生活輔導"),
      L("student-life", "陸生新生入學專區")]),
    ("indigenous", "找原民生資源", "原住民族學生資源", "僑生、陸生與原民生", "indigenous-center", ["原民生"],
     ["原住民", "原民", "原資中心"],
     "原資中心的生活輔導、獎助資訊、職涯資源與活動行事曆。",
     [L("indigenous-center", "生活輔導"),
      L("indigenous-center", "獎助資訊"),
      L("indigenous-center", "職涯相關"),
      L("indigenous-center", "原資中心行事曆"),
      L("hope-seed", "原住民學生輔導")]),
]

FEATURED = ["dorm", "scholarship", "leave", "counseling", "student-loan", "tuition-waiver",
            "internship", "clubs", "venue", "military", "lost", "health-check"]

tasks = []
for slug, phrase, title, group, unit, aud, kw, summary, links in T:
    assert unit in by_slug, unit
    item = {
        "slug": slug, "phrase": phrase, "title": title, "summary": summary,
        "group": group, "audiences": aud, "unit": unit, "links": links, "keywords": kw,
    }
    if slug in FEATURED:
        item["featured"] = True
        item["order"] = FEATURED.index(slug)
    tasks.append(item)

slugs = [t["slug"] for t in tasks]
assert len(slugs) == len(set(slugs)), "duplicate slug"
(ROOT / "src/data/tasks.json").write_text(json.dumps(tasks, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"{len(tasks)} tasks, {sum(len(t['links']) for t in tasks)} links, {len(FEATURED)} featured")
