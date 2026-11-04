# 國際學務網站排版與資訊架構研究：政大學務處網站重設計

- 研究日期：2026-11-04
- 研究對象：美國三校（Stanford、UC Berkeley、University of Michigan）、日本三校（東京大学、京都大学、早稲田大学）
- 用途：作為政大學務處網站重設計（首頁、單位頁模板、消息列表、服務搜尋、緊急求助頁）的參考依據

---

## 0. 研究方法與限制（請先讀）

1. **六個目標網站都沒有讀到網頁。** 每個網站都先用 WebFetch 試了一次，全部回傳 `getaddrinfo ENOTFOUND`，表示本研究環境的網路政策擋住了這些主機：
   - `studentaffairs.stanford.edu`
   - `sa.berkeley.edu`
   - `studentlife.umich.edu`
   - `www.u-tokyo.ac.jp`
   - `www.kyoto-u.ac.jp`
   - `www.waseda.jp`

   依照研究規範，被擋的主機沒有重試，也沒有透過 web.archive.org、r.jina.ai 或其他鏡像、代理繞路。
2. 所以本報告**所有結論都屬於「搜尋結果推論」**：依據是 WebSearch（standard 模式）回傳的頁面標題、URL 路徑、摘要，以及各校官方 PDF 和新聞的描述。報告裡沒有任何一條屬於「直接讀取網頁」。
3. 從搜尋結果推論得出的，主要是**資訊架構**：有哪些頁面、URL 怎麼分層、內容怎麼分類、有哪些入口和窗口。**視覺排版**推論不出來，例如 hero 長什麼樣、版面分幾欄、搜尋框放在哪裡、頁尾的實際內容，這些搜尋結果幾乎都沒有。凡是沒有證據的項目，下文一律寫「不確定」，沒有補上推測的細節。
4. 標示方式：
   - **[搜尋推論]**：從搜尋結果的 URL 或摘要推論，附來源 URL。
   - **[一般設計推論]**：沒有直接證據，是依業界常見做法提出的假設，需要驗證。
   - **[不確定]**：沒有足夠資料判斷。
5. 搜尋到的電話號碼和年份資料，有些來自 2020 到 2024 年的舊文件或第三方頁面，只用來說明這些學校「有這類資源」以及「資源的呈現方式」，不代表號碼目前仍然正確。
6. **建議的下一步**：若需要確認視覺版型，請在網路設定中放行上面六個主機，之後再重跑一次直接讀取（或人工截圖），用來驗證本報告標為 [不確定] 的項目。

---

## 1. 各校分析

### 1.1 Stanford Student Affairs（studentaffairs.stanford.edu）
依據：全部是 [搜尋推論]

| 項目 | 觀察 | 依據 |
|---|---|---|
| 首頁結構 | 首頁會放出版品或近況，例如搜尋摘要提到首頁列出 *The Flourish, Winter 2026*（每月 well-being 內容）。有沒有 hero、hero 長什麼樣：[不確定] | https://studentaffairs.stanford.edu/ 、https://studentaffairs.stanford.edu/student-health-well-being |
| 主導覽 | 第一層 URL 是**主題／任務導向**，不是單位名稱：`/student-health-well-being`、`/community-belonging`、`/what-we-do`、`/who-we-are`、`/about-student-affairs`。組織自述是「將中心、服務與領導整合在 belonging、learning、well-being 之下」。所以推論主導覽偏「主題導向」，個別單位（如 Vaden、CAPS、Dean of Students）各有子網域。 | https://studentaffairs.stanford.edu/what-we-do 、https://studentaffairs.stanford.edu/community-belonging 、https://studentaffairs.stanford.edu/about-student-affairs |
| 搜尋位置 | [不確定] | — |
| 危機資源 | 有專門的彙整頁：`/student-health-well-being/mental-health-resources-hub`（Mental Health Resources Hub）、`/mhrs`、`/confidential-resources`、`/after-hours-care-stanford-0`。另外有可下載的 PDF 資源卡（MH resources at Stanford）。Dean of Students 子網站把 `/get-support/emergency-or-urgent-support` 放在「Get support」之下。搜尋摘要列出的 24/7 資源包括 CAPS 24/7 專線、Confidential Support Team 24/7 hotline、911、988、TimelyCare。可見這些資源是「依情境集中在一頁」，而不是分散在各單位頁。首頁是否有常駐的危機橫幅：[不確定] | https://studentaffairs.stanford.edu/student-health-well-being/mental-health-resources-hub 、https://studentaffairs.stanford.edu/confidential-resources 、https://studentaffairs.stanford.edu/after-hours-care-stanford-0 、https://deanofstudents.stanford.edu/get-support/emergency-or-urgent-support 、https://studentaffairs.stanford.edu/sites/g/files/sbiybj19271/files/media/file/3.2024_final-resource_card-mh_resources_at_stanford_1.pdf |
| 消息／活動 | 有 `/news/...` 文章，例如寒假關閉期間的學生資源公告；有 `/updates-student-affairs` 更新頁；另有 `/class-year-return-project/...` 這類敘事型專題。活動列表的形式：[不確定] | https://studentaffairs.stanford.edu/news/resources-students-during-winter-closure-2023-24 、https://studentaffairs.stanford.edu/updates-student-affairs |
| 單位頁共通結構 | 有 `/people/<姓名>` 人員頁，例如 Vice Provost 頁。單位頁的區塊模板：[不確定]。有一頁提到「Improved site navigation is coming soon」，表示網站可能正在改版。 | https://studentaffairs.stanford.edu/people/michele-rasmussen |
| 受眾分流 | 有 `/class-year-return-project/class-2024/our-families` 這類家庭相關內容，但有沒有固定的「家長」入口：[不確定] | https://studentaffairs.stanford.edu/class-year-return-project/class-2024/our-families |

### 1.2 UC Berkeley Student Affairs（sa.berkeley.edu）
依據：全部是 [搜尋推論]。註：搜尋結果裡沒有出現 sa.berkeley.edu 網域的頁面，學務部官方網站出現在 `studentaffairs.berkeley.edu`。sa.berkeley.edu 是否轉址過去：[不確定]

| 項目 | 觀察 | 依據 |
|---|---|---|
| 首頁結構 | [不確定]（搜尋結果沒有首頁內容） | — |
| 主導覽 | 有 `/departments` 單位總目錄，列出數十個單位，例如 Career Engagement、Dean of Students、Financial Aid & Scholarships、Residential Life、Student Conduct、Student Legal Services、Recreation & Wellbeing、University Health Services。推論入口兼有「單位目錄」。主導覽是否同時提供任務導向分類：[不確定] | https://studentaffairs.berkeley.edu/departments |
| 搜尋位置 | [不確定] | — |
| 危機資源 | 危機資源分散在幾個專責網站：UHS 的 `/emergency`（Emergencies and Crises）、`/counseling/urgent`（Urgent Same-Day Counseling），以及獨立的 `crisisresponse.berkeley.edu`（Campus Crisis Services）。摘要中有平日諮商、after-hours 專線、24/7 Care Line（性暴力）、911、校警、988、Crisis Text Line。值得注意：同一支 after-hours 號碼在兩個頁面上寫法不一致，這是危機資源「分散維護」的風險實例。 | https://www.uhs.berkeley.edu/emergency 、https://uhs.berkeley.edu/counseling/urgent 、https://crisisresponse.berkeley.edu/campus-crisis-services |
| 消息／活動 | [不確定]。學務部用年度 Impact Report（PDF）對外說明成果，自述為「the gateway to the student experience」。 | https://studentaffairs.berkeley.edu/wp-content/uploads/SA_190311_Impact_Report_OnlineView_a11y.pdf |
| 單位頁共通結構 | 各單位多有獨立子網域，例如 basicneeds.berkeley.edu、deanofstudents.berkeley.edu、uhs.berkeley.edu。Dean of Students 有 `/our-resources/staff-faculty`，可見有「依受眾的資源頁」。共通模板：[不確定] | https://deanofstudents.berkeley.edu/our-resources/staff-faculty 、https://basicneeds.berkeley.edu/home |
| 受眾分流 | Basic Needs Center 明文寫出適用對象包含大學部、研究生、國際生、無證件學生。另有 Student Parent Center（服務本身是家長的學生）。家長專區：[不確定] | https://basicneeds.berkeley.edu/home |

### 1.3 University of Michigan Student Life（studentlife.umich.edu）
依據：全部是 [搜尋推論]

| 項目 | 觀察 | 依據 |
|---|---|---|
| 首頁結構 | [不確定] | — |
| 主導覽 | 同時有**任務導向**和**單位導向**兩種入口。任務導向的是 `/get-help`（Get Help）；單位導向的是 `/about/units-programs/`（Units & Programs，列出 Center for Campus Involvement、University Career Center、Wolverine Wellness 等），另有一篇 article 列出後勤單位（HR、Budget & Finance）。推論為「任務入口 + 單位目錄」並存。 | https://studentlife.umich.edu/get-help 、https://studentlife.umich.edu/about/units-programs/ 、https://studentlife.umich.edu/article/units-and-programs |
| 搜尋位置 | [不確定] | — |
| 危機資源 | `/get-help` 是全站層級的求助頁，搜尋摘要證實它有危機與緊急支援內容，但沒有顯示頁面上的號碼。各單位另有自己的危機頁，例如 CAPS 的 Crisis Services、Dean of Students 的 Critical Incidents 與 Concern for Health and Well-being。摘要中出現的資源有：CAPS after-hours（press 0）、SAPAC 24 小時危機專線、UHS 24 小時護理諮詢、精神科急診、988、911。 | https://studentlife.umich.edu/get-help 、https://caps.umich.edu/node/78 、https://deanofstudents.umich.edu/node/124 |
| 消息／活動 | [不確定]（搜尋結果中有 `studentlife.umich.edu/node?page=6` 這類列表，但看不出版型） | https://studentlife.umich.edu/node?page=6 |
| 單位頁共通結構 | 單位多數有子網域，例如 deanofstudents.umich.edu、caps.umich.edu，以及 `basicneeds.studentlife.umich.edu/department/...`（Basic Needs 網站用「department」頁彙整各單位提供的資源，屬於跨單位資源索引）。Dean of Students 有「Ways to contact us」聯絡頁。共通模板：[不確定] | https://basicneeds.studentlife.umich.edu/department/student-life-office-of-student-conflict-resolution 、https://deanofstudents.dsa-studentlife-live.studentlife.umich.edu/?p=72 |
| 受眾分流 | 有 `/parents/` 家長專區（說明 Dean of Students 可以協助家長與學生處理疑慮）；Dean of Students 有 Faculty and Staff Information（教職員通報、轉介）。推論有**明確的受眾分流**：學生、家長、教職員。 | https://studentlife.umich.edu/parents/node/1327 、https://deanofstudents.umich.edu/node/19 |

### 1.4 東京大学 学生支援（u-tokyo.ac.jp）
依據：全部是 [搜尋推論]。搜尋結果沒有回傳 u-tokyo.ac.jp「学生生活」入口頁的內容，所以主站的頁面結構幾乎都是 [不確定]。

| 項目 | 觀察 | 依據 |
|---|---|---|
| 首頁／入口結構 | [不確定]。可確認的是，相談窓口是用**校區別的 PDF「相談施設案内」**呈現（本郷、柏各一份），按校區列出所有窓口。 | https://www.si.t.u-tokyo.ac.jp/wp/wp-content/uploads/2020/09/5.東大相談施設案内_本郷2020.pdf 、https://gsfs-portal.k.u-tokyo.ac.jp/wp-content/uploads/2024/03/32.相談施設案内（柏）.pdf |
| 主導覽 | [不確定]。從組織面看，學生支援以「学生相談ネットワーク本部（DCS，dcs.adm.u-tokyo.ac.jp）」為傘狀組織，下設学生相談所、精神保健支援室、コミュニケーション・サポートルーム、留学生支援室、ピアサポートルーム等，偏「單位導向」。 | https://dcs.adm.u-tokyo.ac.jp/dcs2023/wp-content/uploads/2023/04/newsletter2010.pdf |
| 搜尋位置 | [不確定] | — |
| 危機／相談資源 | 重要模式：設有**「なんでも相談コーナー」作為單一總窓口**，給「不知道該找誰」的學生，再由這裡轉介。這是「單一入口 + 轉介」的模式。24 小時危機專線是否存在、放在哪裡：搜尋結果沒有看到。[不確定] | 同上兩份 PDF |
| 消息 | 獎學金等學內募集資訊要學生到學務系統 UTAS 的「お知らせ掲示板」查看。也就是說，部分公告放在登入制系統，而不是公開網站。 | https://www.u-tokyo.ac.jp/content/400254993.pdf |
| 單位頁結構 | 各學部另有自己的「相談窓口リンク集」，例如理學部 `/ja/soudan/link.html`，顯示資訊在學部層級會再被整理一次。共通模板：[不確定] | https://www.s.u-tokyo.ac.jp/ja/soudan/link.html |
| 受眾分流 | 有「留学生支援室」這種針對國際生的專門窓口。網站層級的受眾入口：[不確定] | 同上 PDF |

### 1.5 京都大学 学生生活・支援（kyoto-u.ac.jp）
依據：全部是 [搜尋推論]

| 項目 | 觀察 | 依據 |
|---|---|---|
| 入口結構 | `/ja/education-campus` 是「教育・学生生活」入口。搜尋摘要顯示它按**支援類型**分區：経済支援（奨学金、授業料免除、緊急支援）、課外活動支援、学生相談・障害学生支援、キャンパスライフ（健康管理、保険等）。推論為「**主題／任務導向**」分類。 | https://www.kyoto-u.ac.jp/ja/education-campus |
| 主導覽 | 同上，第一層用主題分類。另有 `/ja/education-campus/contact/caseinfo`「案件別の問い合わせ先」：**依事情列出負責窓口**，例如課外活動→學生課課外活動掛、健康→健康安全相關單位。這是很實用的「事情 → 窗口」對照表模式。 | https://www.kyoto-u.ac.jp/ja/education-campus/contact/caseinfo |
| 搜尋位置 | [不確定] | — |
| 危機／相談資源 | 学生総合支援機構（assdr.kyoto-u.ac.jp）有獨立網站，学生相談部門（SSC）也有獨立網站，用年度 PDF 傳單列出各校區相談室、受理時間（平日 9–17 時）、申請方式（來室、網路表單、電話、Email）。24 小時危機專線：搜尋結果沒有看到。[不確定]。另外，2025 年傳單與 2026 年 Campus Life Information 列出的相談室數量不一致（5 處 vs 3 處），反映 PDF 分版維護容易出現資訊落差。 | https://www.assdr.kyoto-u.ac.jp/ssc/wp-content/uploads/2025/04/SSC_leaflet-2025-3.pdf 、https://www.kyoto-u.ac.jp/sites/default/files/inline-files/H-campus-life-information-2026-9d5a1cb975ddb4088cf842be11bc4778.pdf |
| 消息 | 有 `/ja/news/...` 一般新聞，例如獎學金公告；另有 Campus Life News（PDF 期刊）。列表的版型：[不確定] | https://www.kyoto-u.ac.jp/ja/news/2018-02-01-1 、https://www.kyoto-u.ac.jp/sites/default/files/inline-files/Campus-Life-News-No.56-33c129ea439e229be267775bc61d3123.pdf |
| 單位頁結構 | 重要模式：**「Campus Life Information（旧学生便覧）」**，每年把正課以外的所有學生服務彙整成一份冊子，分章節（學生生活支援、課外活動支援、注意事項），放在 `/ja/education-campus/cli/binran`。 | https://www.kyoto-u.ac.jp/ja/education-campus/cli/binran |
| 受眾分流 | 有留学生相談室；有 `/ja/education-campus/students2/campus` 這類「在學生」路徑。家長入口：[不確定] | https://www.kyoto-u.ac.jp/ja/education-campus/students2/campus |

### 1.6 早稲田大学 学生生活（waseda.jp 学生部）
依據：全部是 [搜尋推論]

| 項目 | 觀察 | 依據 |
|---|---|---|
| 入口結構 | 學生部的各課各有自己的子站，例如 `/inst/student/`（学生生活課 Student Affairs Section）、`/inst/scc/`（学生相談センター）、`/inst/harassment/`。學生部總入口頁：搜尋沒有找到。[不確定] | https://www.waseda.jp/inst/student/support/consultation 、https://www.waseda.jp/inst/scc/ |
| 主導覽 | 依 URL 推論，偏**單位導向**：每個課或中心一個站。學生生活課的「相談」頁另外依**事情類型分流**：修學→各學部事務所；經濟→奨学課；心理→学生相談センター；性別→Student Diversity Center；身心不適→保健センター。 | https://www.waseda.jp/inst/student/support/consultation 、https://www.waseda.jp/inst/harassment/counseling/desk |
| 搜尋位置 | [不確定] | — |
| 危機／相談資源 | 重要模式：**「学生生活110番」**是一個有品牌名稱的單一熱線，處理學生生活中的麻煩、事件、事故，平日 9–17 時受理，也可以用 Email；頁面註明緊急時若聯絡不到，可以找校區正門警衛室。也就是用一個好記的名稱做「什麼都可以先問」的總入口。學生相談センター首頁會放即時營運公告，例如 2025-11 恢復面談、線上預約、急件改用電話單次諮詢或外部線上相談。24 小時心理危機專線：搜尋結果沒有看到。[不確定] | https://www.waseda.jp/inst/student/?p=124 、https://www.waseda.jp/inst/scc/ 、https://www.waseda.jp/inst/scc/?p=35 |
| 消息 | 學生相談センター首頁的公告區會放服務異動。整體消息版型：[不確定] | https://www.waseda.jp/inst/scc/ |
| 單位頁結構 | 各學部有英文的「Support Services」頁，例如 `/flas/hss/students/support-services/`、`/flas/cms/...`、`/flas/glas/...`。從路徑一致可推論有**共用的頁面模板**，但區塊內容：[不確定] | https://www.waseda.jp/flas/hss/students/support-services/ 、https://www.waseda.jp/flas/glas/students/support-services/ |
| 受眾分流 | 有英文版支援頁（國際生）。家長入口：[不確定] | 同上 |

---

## 2. 跨校模式表

說明：○ = 搜尋結果有證據；△ = 有部分或間接證據；? = 不確定。所有判斷都屬於 [搜尋推論]。

| 模式 | Stanford | Berkeley | Michigan | 東大 | 京大 | 早大 |
|---|---|---|---|---|---|---|
| **任務／主題導向入口**（第一層用「需求」分類） | ○ well-being／community-belonging | △ 有 departments 目錄，任務入口不確定 | ○ `/get-help` | ? | ○ 經濟／課外／相談／生活 | △ 相談頁依事情分流 |
| **單位目錄**（列出所有單位） | △ | ○ `/departments` | ○ Units & Programs | △（DCS 組織） | △ | ○（各課各一站） |
| **「事情 → 窗口」對照** | △ | ? | △ Basic Needs department 索引 | ○ なんでも相談コーナー | ○ 案件別問い合わせ先 | ○ 学生生活110番＋分流表 |
| **受眾分流：新生** | △ class-year 專題 | ? | ? | ? | ? | ? |
| **受眾分流：國際生** | ? | △ 明列適用對象 | ? | ○ 留学生支援室 | ○ 留学生相談室 | △ 英文支援頁 |
| **受眾分流：家長** | △ our-families | △ Student Parent Center（服務本身是家長的學生，不是家長專區） | ○ `/parents/` | ? | ? | ? |
| **受眾分流：教職員（通報、轉介）** | ? | ○ DoS staff-faculty | ○ DoS Faculty & Staff | ? | ? | ? |
| **危機資源集中頁** | ○ MH Resources Hub、after-hours | △ 分散在 UHS／crisisresponse | ○ get-help | ? | ? | ? |
| **24/7 專線明列** | ○ | ○ | ○ | 未見 | 未見 | 未見（110番為平日 9–17） |
| **危機資源的離線版（PDF 卡、傳單）** | ○ 資源卡 PDF | ? | △（學院自製） | ○ 校區相談施設案内 | ○ SSC leaflet | ? |
| **消息** | ○ news + Flourish 期刊 | △ Impact Report | ? | △ 部分放在 UTAS | ○ news + Campus Life News PDF | △ 單位首頁公告 |
| **年度服務總覽冊** | ? | △ Impact Report（成果性質） | ? | ? | ○ Campus Life Information | ? |
| **單位頁共用模板** | △ people 頁 | ? | ? | ? | ? | △ Support Services 路徑一致 |
| **頁尾** | ? | ? | ? | ? | ? | ? |

### 美日差異（[搜尋推論]，樣本只有 6 校，僅供參考）

1. **危機呈現的強度不同。** 美國三校都把 24/7 專線（心理危機、性暴力、after-hours 諮商、911／988）集中呈現在一個「Get help／Emergency」頁，而且用「情境」命名，例如 urgent、after hours、confidential。日本三校的搜尋結果中，相談窓口以平日開室時間為主，沒有看到 24 小時危機專線的集中呈現（不確定是不存在，還是只是沒被搜尋到）。
2. **「單一總窓口」是日本的強項。** 東大的「なんでも相談コーナー」、早大的「学生生活110番」、京大的「案件別問い合わせ先」，都在解決「我不知道該找哪個單位」這個問題。美國比較常用「Resource Hub」頁面加上許多子網域來解決。
3. **日本大量依賴 PDF 冊子與傳單**，例如京大 Campus Life Information、東大相談施設案内、京大 SSC leaflet，資訊更新取決於年度版本，京大就出現了版本之間不一致。美國較多 HTML 頁面，但單位子網域多，同樣出現號碼不一致（Berkeley）。兩邊的共同問題是「**同一筆資訊多處維護**」。
4. **受眾分流方面**，美國有家長、教職員專區的證據（Michigan、Berkeley）；日本只看到國際生專門窓口，學務網站層級的家長入口沒有證據（日本大學通常在全校首頁做「受験生／在学生／保護者」分流，例如立命館，見來源）。
5. **導覽取向**：美國學務網站的第一層偏向「主題或需求」（well-being、belonging、get help），單位放在第二層或目錄頁。日本偏向「組織單位」，京大 education-campus 例外，用的是主題分類。

---

## 3. 給政大學務處的具體建議（共 9 條）

以下建議綜合第 2 節的模式。凡是屬於「推論的業界做法」而沒有直接證據的，已標註。

| # | 對應頁面 | 建議 | 依據模式 |
|---|---|---|---|
| 1 | **首頁** | 首頁第一屏放「**我需要…**」任務入口（6–8 個），例如：申請獎助學金與學雜費減免、請假與缺曠、心理諮商預約、宿舍、社團與活動、身心障礙支援、校外賃居、保險與健康。單位名稱（生輔組、課外組、住宿組、衛保組、諮商中心…）退到第二層的「單位目錄」。 | Stanford 主題式 URL、Michigan get-help、京大支援類型分類 |
| 2 | **首頁／全站頁首** | 在全站頁首固定放「**緊急求助**」按鈕（建議用醒目色），而且每一頁都看得到，點下去進入緊急求助頁。首頁不要只把它放在消息或 banner 輪播裡。（「每頁都有」屬於 [一般設計推論]；美國各校有集中頁是 [搜尋推論]） | Stanford、Berkeley、Michigan 皆有集中危機頁 |
| 3 | **緊急求助頁** | 按**情境**分區，不要按單位分區：「現在有立即危險」（110／119／校安中心 24 小時專線）→「心理危機、想自傷」（校內諮商與 1925 安心專線等 24 小時資源）→「性平事件」→「下班後、假日」→「非緊急但需要協助」。每一列都寫明可聯絡時段（24 小時或上班時間），也提供可列印的資源卡 PDF。號碼請以政大與政府單位現行公告為準。 | Stanford after-hours／confidential、Berkeley urgent／emergency、Stanford 資源卡 |
| 4 | **緊急求助頁（維運）** | 危機號碼**只在一個資料來源維護**，例如 CMS 的一筆共用元件，各單位頁和頁尾都引用它，不另外手打，避免出現 Berkeley 那樣兩頁號碼不一致、京大那樣 PDF 版本不一致。 | Berkeley、京大的不一致案例 |
| 5 | **服務搜尋** | 做一個「**事情 → 窗口**」服務索引：每項服務一筆資料，欄位包含服務名稱、口語別名（例如「休學」「宿舍退宿」）、適用對象（大學部、研究生、僑外生、陸生）、負責單位、辦理方式、表單連結、聯絡分機。站內搜尋優先搜這份索引，不只做全文搜尋。 | 京大案件別問い合わせ先、早大相談分流表、Michigan Basic Needs department 索引 |
| 6 | **首頁／服務搜尋** | 設一個「**不知道找誰？**」的總窓口，例如學務處綜合諮詢信箱、電話或線上表單，給一個好記的名稱，承諾由專人轉介。 | 東大なんでも相談コーナー、早大学生生活110番 |
| 7 | **首頁（受眾分流）** | 在任務入口旁邊提供受眾捷徑：**新生、僑外生與國際生（中英雙語）、家長、教職員（學生關懷轉介與通報）**。教職員入口特別重要，因為導師需要知道怎麼轉介高關懷學生。 | Michigan parents／faculty-staff、Berkeley DoS staff-faculty、東大與京大留學生窓口 |
| 8 | **單位頁模板** | 各組、中心用同一套模板，區塊順序建議：①單位一句話說明 ②常用服務（連到服務索引中的條目）③最新公告（自動帶入該單位的消息）④表單下載 ⑤人員與業務職掌 ⑥聯絡方式與地點、時間 ⑦緊急求助共用元件。（區塊順序屬於 [一般設計推論]；「路徑一致的共用模板」的證據來自早大 Support Services） | 早大 support-services 共用路徑、Stanford people 頁 |
| 9 | **消息列表** | 消息加上三種標籤：**單位、對象（大學部、研究生、全體）、類型（申請截止、活動、服務異動、法規）**，並且可以篩選。「申請截止」類消息要顯示截止日、可依截止日排序，避免像東大那樣，只放在登入系統的公告會被學生錯過。服務異動（例如諮商預約暫停或恢復）要能置頂。 | 早大 SCC 首頁服務公告、東大 UTAS 公告、Stanford news／Flourish |

---

## 4. 來源清單

說明：以下全部是 WebSearch 搜尋結果中出現的 URL，本研究**沒有直接讀取**這些頁面的內容，判斷依據是搜尋引擎回傳的標題、路徑與摘要。

### WebFetch 嘗試（全部失敗：ENOTFOUND，主機被網路政策擋住）
- https://studentaffairs.stanford.edu/
- https://sa.berkeley.edu/
- https://studentlife.umich.edu/
- https://www.u-tokyo.ac.jp/ja/students/index.html
- https://www.kyoto-u.ac.jp/ja/education-campus/campuslife
- https://www.waseda.jp/inst/students/

### Stanford
- https://studentaffairs.stanford.edu/
- https://studentaffairs.stanford.edu/what-we-do
- https://studentaffairs.stanford.edu/who-we-are
- https://studentaffairs.stanford.edu/about-student-affairs
- https://studentaffairs.stanford.edu/student-health-well-being
- https://studentaffairs.stanford.edu/student-health-well-being/mental-health-resources-hub
- https://studentaffairs.stanford.edu/community-belonging
- https://studentaffairs.stanford.edu/confidential-resources
- https://studentaffairs.stanford.edu/after-hours-care-stanford-0
- https://studentaffairs.stanford.edu/mhrs
- https://studentaffairs.stanford.edu/updates-student-affairs
- https://studentaffairs.stanford.edu/news/resources-students-during-winter-closure-2023-24
- https://studentaffairs.stanford.edu/people/michele-rasmussen
- https://studentaffairs.stanford.edu/class-year-return-project/class-2024/our-families
- https://studentaffairs.stanford.edu/sites/g/files/sbiybj19271/files/media/file/3.2024_final-resource_card-mh_resources_at_stanford_1.pdf
- https://deanofstudents.stanford.edu/get-support
- https://deanofstudents.stanford.edu/get-support/emergency-or-urgent-support

### UC Berkeley
- https://studentaffairs.berkeley.edu/departments
- https://studentaffairs.berkeley.edu/wp-content/uploads/SA_190311_Impact_Report_OnlineView_a11y.pdf
- https://www.uhs.berkeley.edu/emergency
- https://uhs.berkeley.edu/counseling/urgent
- https://crisisresponse.berkeley.edu/campus-crisis-services
- https://deanofstudents.berkeley.edu/our-resources/staff-faculty
- https://basicneeds.berkeley.edu/home

### University of Michigan
- https://studentlife.umich.edu/get-help
- https://studentlife.umich.edu/about/units-programs/
- https://studentlife.umich.edu/article/units-and-programs
- https://studentlife.umich.edu/parents/node/1327
- https://studentlife.umich.edu/node?page=6
- https://basicneeds.studentlife.umich.edu/department/student-life-office-of-student-conflict-resolution
- https://deanofstudents.umich.edu/node/19
- https://deanofstudents.umich.edu/node/124
- https://deanofstudents.dsa-studentlife-live.studentlife.umich.edu/?p=72
- https://caps.umich.edu/node/78

### 東京大学
- https://www.si.t.u-tokyo.ac.jp/wp/wp-content/uploads/2020/09/5.東大相談施設案内_本郷2020.pdf
- https://gsfs-portal.k.u-tokyo.ac.jp/wp-content/uploads/2024/03/32.相談施設案内（柏）.pdf
- https://dcs.adm.u-tokyo.ac.jp/dcs2023/wp-content/uploads/2023/04/newsletter2010.pdf
- https://www.s.u-tokyo.ac.jp/ja/soudan/link.html
- https://www.u-tokyo.ac.jp/content/400254993.pdf

### 京都大学
- https://www.kyoto-u.ac.jp/ja/education-campus
- https://www.kyoto-u.ac.jp/ja/education-campus/contact/caseinfo
- https://www.kyoto-u.ac.jp/ja/education-campus/cli/binran
- https://www.kyoto-u.ac.jp/ja/education-campus/students2/campus
- https://www.kyoto-u.ac.jp/ja/news/2018-02-01-1
- https://www.kyoto-u.ac.jp/sites/default/files/inline-files/H-campus-life-information-2026-9d5a1cb975ddb4088cf842be11bc4778.pdf
- https://www.kyoto-u.ac.jp/sites/default/files/inline-files/Campus-Life-News-No.56-33c129ea439e229be267775bc61d3123.pdf
- https://www.assdr.kyoto-u.ac.jp/ssc/wp-content/uploads/2025/04/SSC_leaflet-2025-3.pdf

### 早稲田大学
- https://www.waseda.jp/inst/student/?p=124
- https://www.waseda.jp/inst/student/support/consultation
- https://www.waseda.jp/inst/scc/
- https://www.waseda.jp/inst/scc/?p=35
- https://www.waseda.jp/inst/harassment/counseling/desk
- https://www.waseda.jp/flas/hss/students/support-services/
- https://www.waseda.jp/flas/glas/students/support-services/

### 其他參考（日本大學網站的受眾分流慣例）
- https://www.ritsumei.ac.jp/admission-student
