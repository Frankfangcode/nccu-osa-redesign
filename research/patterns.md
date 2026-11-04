# 學務網站排版模式研究：美國 × 日本 6 校

> 目的：替政大學務處網站（https://osa.nccu.edu.tw/tw/）改成「任務導向」資訊架構找參考
> 調查日期：2026-11-04
> 方法：用 WebFetch 讀各校首頁和 1–4 個服務／單位子頁，再用 WebSearch 補找網址。

## 0. 研究限制（請先讀）

- **WebFetch 拿到的是轉成文字的頁面**，看不到 CSS 和截圖。所以「視覺」一項只能寫結構線索：`theme-color` meta、輪播、圖片卡片、viewport、選單切換鈕。字體、精確色碼、留白比例**沒有實際量測**。直接用 curl 抓原始 HTML 被代理擋下（403），沒辦法從 CSS 補上。要確認的話，建議用瀏覽器 DevTools 再看一次。
- **UC Berkeley**：`sa.berkeley.edu` 和 `dos.berkeley.edu` 都因 robots.txt 禁止而抓不到。改看學務處的新網域 `studentaffairs.berkeley.edu`，再加上 University Health Services（`uhs.berkeley.edu`）和 Basic Needs Center（`basicneeds.berkeley.edu`）。
- **東京大學**：`/ja/students/` 底下好幾個子頁回傳錯誤，最後讀到的是「教育・学生生活」索引頁、學生宿舍頁和學生相談所頁。
- **京都大學**：部分子頁（例如 `campuslife/attention`）抓不到，改看「在学生の方」入口頁、「学生相談・障害学生支援・就職」頁和留學生諮詢頁。
- **Michigan**：`/units` 等子頁抓不到，改看 Support & Advocacy 分類頁、Dean of Students 和 CAPS。
- 只要觀察有限，各節都會註明。

---

## 1. 逐站觀察

### 1.1 Stanford Student Affairs（美）

來源：https://studentaffairs.stanford.edu/ 、https://vaden.stanford.edu/ 、https://vaden.stanford.edu/other-options-care 、https://wellbeing.stanford.edu/ 、https://resed.stanford.edu/ 、https://emergency.stanford.edu/

| 項目 | 觀察 |
|---|---|
| 首頁區塊順序 | 頁首（含「Get Support」連結和站內搜尋）→ Hero 照片＋H1 → 一段歡迎文字 → 「Explore Student Affairs」3 張圖片卡（住宿教育、學生參與、學術服務），每張附「Explore…」按鈕 → 「What's Happening」只放一個連結到全校活動行事曆 → 回到頂端 → 頁尾 |
| 主導覽 | **混合式**。前兩項是主題／生活導向（Life on the Farm、Health & Well-Being），後面是組織導向（Who We Are、What We Do），還有一項受眾導向（For Families）。有二到三層子選單，部分項目再往下巢狀（政策、工作小組）。整站收在「Menu」按鈕裡 |
| 任務入口 | 沒有「I want to…」句型。頁首常駐的「Get Support」是唯一的求助入口。首頁卡片數量少（3 張），屬精選，不是完整目錄 |
| 緊急資訊 | 首頁本文**沒有**。只有頁尾的全校「Emergency Info」連結，以及 Vaden 健康中心的「Other Options for Care」頁。這頁是全部樣本裡**最好的分級設計**：依急迫程度排成 Emergency（911）→ Urgent（心理危機、性暴力、醫療）→ 當日非急迫 → 24/7 線上看診，每一級都附情境範例，並在電話旁標出是否 24/7（https://vaden.stanford.edu/other-options-care）。全校緊急頁的順序是：營運狀態 → 最新更新 → 「撥 911」大標 → 警報系統說明（https://emergency.stanford.edu/） |
| 消息與活動 | 學務首頁幾乎不放消息，活動直接外連全校行事曆。Vaden 首頁則有 3 則附日期的新聞清單和「Upcoming Events」連結 |
| 搜尋 | 每個子站頁首都有「Search this site」輸入框 |
| 單位頁版型 | 單位站（ResEd、Vaden、Well-Being）共用一套模板：頁首（全校字標＋單位名稱＋Get Support＋搜尋＋Menu）→ 大圖 Hero＋H1 → 2–3 個「標題＋一句話＋按鈕」區塊 → 頁尾（地址／電話、Important Links、同體系單位列表、全校連結）。Well-Being 的 Hero 直接放 3 個主要行動連結，第一個就是「其他照護選項（含緊急）」（https://wellbeing.stanford.edu/） |
| 視覺 | 結構上以大張滿版照片和大量留白為主，卡片數量少，偏編輯風格。字體、色碼無法從文字確認。沒看到深色模式的線索 |
| 手機 | 整站導覽收進「Menu」按鈕，有兩個 skip link（主內容、次導覽），可以推斷桌機和手機共用抽屜式選單 |

### 1.2 UC Berkeley Student Affairs（美）

來源：https://studentaffairs.berkeley.edu/ 、https://studentaffairs.berkeley.edu/navigate-berkeley 、https://studentaffairs.berkeley.edu/student-support 、https://uhs.berkeley.edu/ 、https://uhs.berkeley.edu/counseling/urgent 、https://basicneeds.berkeley.edu/
（sa.berkeley.edu 因 robots.txt 抓不到）

| 項目 | 觀察 |
|---|---|
| 首頁區塊順序 | 輪播 Hero（歡迎語、策略計畫、Berkeley Life）→ 歡迎段落 → 6 格入口方塊（Navigate Berkeley、Best Berkeley Life、Roundup、Vision、Who We Are、What's Happening）→ Instagram 嵌入牆＋Load More → 頁尾 |
| 主導覽 | 第一項「**Navigate Berkeley**」是**任務／需求導向**，底下有 9 個子類：迎新入住、住宿餐飲、社團志工職涯、健康運動、學生支援、藝文、交通安全、連結、軟體科技。之後才是 About、Departments（組織圖）、News & Messages。**這正是「任務在第一層、組別放後面」的結構**，和政大的目標一致 |
| 任務入口 | Navigate Berkeley 頁是 9 張圖片卡，每張附一句說明（https://studentaffairs.berkeley.edu/navigate-berkeley）。不過「Student Support」頁只有一句話列出財務、學業、科技、身分、法律、倖存者照護六類，**沒有往下展開**，是一個反面教材：分類有了，下一層沒做（https://studentaffairs.berkeley.edu/student-support）。Basic Needs Center 首頁則把食物、住宿、經濟三個任務入口放在最前面，再搭配單一的「Assistance Form」當總收件口（https://basicneeds.berkeley.edu/） |
| 緊急資訊 | 學務首頁**完全沒有**。UHS 的 Quick Links 下拉選單裡有「Emergency/Crisis」和「After Hours」。UHS 危機資源頁依情境分段（當日急件諮商、性暴力、校園悲劇、全國專線），但「立即危險請撥 911」藏在某一段的最後一點，全國專線也放在頁尾附近。同一頁的下班後電話還出現兩種寫法，**是一個反例：緊急資訊要單一來源、最先呈現**（https://uhs.berkeley.edu/counseling/urgent） |
| 消息與活動 | 學務首頁用社群牆代替新聞列表。UHS 有嵌入式活動行事曆，加上 3 則附日期的新聞和「封存」連結 |
| 搜尋 | 學務首頁沒看到搜尋框，UHS 有 |
| 單位頁版型 | UHS 用 **mega menu**，下拉面板附圖片和短說明，另有一條次導覽列（Students／Faculty-Staff／Newsletter／Quick Links）。Basic Needs 頁首上方有可收合的「Important Notice」橫幅（例如休館公告），還提供西班牙文、中文翻譯連結 |
| 視覺 | 輪播＋方塊格＋社群牆，偏行銷風格。色碼和字體無法確認 |
| 手機 | 頁首有「Toggle navigation」，屬於漢堡選單 |

### 1.3 University of Michigan Student Life（美）

來源：https://studentlife.umich.edu/ 、https://studentlife.umich.edu/explore/support-advocacy/ 、https://deanofstudents.umich.edu/ 、https://caps.umich.edu/

| 項目 | 觀察 |
|---|---|
| 首頁區塊順序 | Hero（「Welcome to Student Life」＋按鈕＋6 張照片條）→ **「Discover Your Michigan Experience」5 張任務卡** → Instagram 4 則 → 校友專題故事（影片）→ 1 則精選新聞＋全部新聞 → 「Join a Student Org」CTA（1,700+ 社團）→ 數字區（300+ 活動、97% 大一住校、17 個餐廳）→ 「Have a question?」資訊服務台電話 → 頁尾 |
| 主導覽 | 4 項：Explore Student Life（5 個生活需求子類）／Student Life Resources（獎助學金、支持團體、工作坊）／News／About（單位與計畫、領導團隊、使命）。**第一層是需求導向，組織收在 About 裡**，兩層 |
| 任務入口 | 5 張卡片都用**動詞片語當標題**：Get involved、Take care of yourself、Navigate housing and dining、Prepare for what's next、Find the help you need。按鈕文字也是動詞（Get Connected、Stay Healthy、Explore Options、Plan Your Path、Find Support）。**這是本次樣本裡最接近「我想…」句型的做法**。分類頁（Support & Advocacy）的順序是：單位清單（名稱＋一句話＋連結）→「Get help when you need it」（緊急事件支援按鈕）→ 其他計畫卡片 → 新聞 → 相關資源（https://studentlife.umich.edu/explore/support-advocacy/） |
| 緊急資訊 | Student Life 首頁沒有危機區塊，只有頁尾的一般服務電話「Need Help?」。Dean of Students 首頁最上方是「Ways to request support」聯絡方式區（辦公時間、下班後語音留言、Email、到場、線上表單），並**明確標註線上表單「僅限非緊急」**，接著是「How can we help?」四個問句入口（例如擔心某位學生嗎？要找學生支援嗎？）（https://deanofstudents.umich.edu/）。CAPS 頁有「Emergency Contacts」區，列 911 和標「24-hour」的危機專線，但位置在頁面後段（https://caps.umich.edu/） |
| 消息與活動 | 只放 1 則精選新聞卡（圖＋標題＋摘要＋日期），活動改用數字呈現。重故事、輕列表 |
| 搜尋 | 首頁文字中看不到搜尋框（無法確認是否以圖示存在） |
| 單位頁版型 | 單位多半是外部獨立網站，Student Life 只做「目錄＋一句話」 |
| 視覺 | `theme-color` 為 #00274c（深藍）。照片條、數字區、Instagram，偏年輕、雜誌感。字體無法確認 |
| 手機 | 主導覽在原始碼出現兩份（扁平版＋巢狀版），任務卡也有一份純文字副本，推測是桌機和手機各一套 |

### 1.4 東京大學 教育・学生生活（日）

來源：https://www.u-tokyo.ac.jp/ja/students/index.html 、https://www.u-tokyo.ac.jp/ja/students/welfare/h04.html 、https://dcs.adm.u-tokyo.ac.jp/scc/

| 項目 | 觀察 |
|---|---|
| 首頁區塊順序 | 這不是獨立的學務網站，而是全校官網的一個分類。順序：麵包屑 → H1 → 橫幅圖 → **15 個主題分類的連結集**（授業・履修／特色教育／體驗型課程／學籍・手續窗口／資訊服務・保險／**學費・獎學金・宿舍**／課外活動／設施利用／**保健・進路・相談**／行事／校園交通・警備／海外留學／參考資訊／規則／統計）→ SNS → 頁尾 |
| 主導覽 | 全校的 9 項 **mega menu**，以組織和業務分類（大學介紹、學部、入學、教育・學生生活…）。「教育・學生生活」展開後是同樣 15 個子類。本身不是任務導向，但子類名稱用的是學生熟悉的「事情」，例如學費、宿舍、相談 |
| 任務入口 | 沒有卡片也沒有句型，是**高密度的文字連結目錄**。好處是一頁看完所有服務，可掃讀性高；缺點是沒有優先順序 |
| 緊急資訊 | 沒有專區。頁尾上方有「災害時的資訊發布」連結。相談資源集中在「保健・進路・相談」分類（なんでも相談、学生相談所、ハラスメント相談所等）。学生相談所頁只寫平日 10–17 點，**沒有夜間或假日的緊急指引**（https://dcs.adm.u-tokyo.ac.jp/scc/） |
| 消息與活動 | 這個分類頁沒有消息欄。消息放在各服務頁內，例如宿舍頁的「お知らせ」：附日期、新到舊排列，多為 PDF，最新兩則加「NEW」標籤 |
| 搜尋 | 頁首有站內搜尋圖示（另有手機版），以及教員搜尋 |
| 單位／服務頁版型 | 宿舍頁：麵包屑 → H1 → 適用對象說明（留學生請洽另一窗口）→ 參觀程序（Email、期限、時段、規則條列）→ 生活指南 PDF（標明日期和檔案大小）→ 健康公告 → 消息列表 → **宿舍一覽表（資格／名稱／負責窗口）** → 承辦單位＋表單（https://www.u-tokyo.ac.jp/ja/students/welfare/h04.html）。学生相談所頁：服務內容 → **相談流程 01-02-03 三步驟** → 預約方式 → 常見議題 → 諮商師介紹 → FAQ → 各校區時間地點（https://dcs.adm.u-tokyo.ac.jp/scc/）。**「流程步驟＋FAQ＋時間地點」是很好的服務頁模板** |
| 視覺 | 文字密度高，有一張橫幅圖。字體和色碼無法確認 |
| 手機 | 搜尋有手機版圖示，代表有響應式頁首。mega menu 的手機處理方式無法確認 |

### 1.5 京都大學 教育・学生支援（日）

來源：https://www.kyoto-u.ac.jp/ja 、https://www.kyoto-u.ac.jp/ja/students 、https://www.kyoto-u.ac.jp/ja/education-campus/campuslife 、https://www.kyoto-u.ac.jp/ja/education-campus/counseling 、https://www.kyoto-u.ac.jp/ja/education-campus/students2/campus/advising

| 項目 | 觀察 |
|---|---|
| 首頁區塊順序 | 全校首頁：工具列（站內／教員搜尋）→ 7 項全域導覽 → **受眾入口**（考生／在學生／校友／一般・地區／企業・研究者）→ 次要連結 → 5 種語言 → 輪播 → **災害與危機公告（地震、烏克蘭，附更新日期），放在新聞前面** → 研究新聞／KyotoU News／活動／特集（文字清單）→ 頁尾。「在學生」入口頁：橫幅 → H1 → **「對象者選單」分組任務連結**（學生生活指南、獎學金、學生生活支援、進路就職、留學、其他）→ NEWS 4 則 → EVENTS 4 則 → 常用系統快捷（學生入口、KULASIS、Webmail、圖書館）→ 頁尾 |
| 主導覽 | 全域是組織／業務導向，另外有一條**受眾導覽（在學生）**做第二條路徑。「教育・学生支援」頁有可開合的側欄，第三層頁面用「子頁＋一句說明」的清單呈現 |
| 任務入口 | 在學生頁用分組文字連結。**把常用系統（KULASIS、Webmail）獨立成快捷區**，很實用。「キャンパスライフ支援」頁只有 5 個子頁連結（注意事項、健康、保險、住宿飲食、打工） |
| 緊急資訊 | 全校首頁的**危機公告區排在新聞之前**，是唯一主動把危機放上首頁的日本樣本。學生頁本身沒有緊急橫幅，「安否確認系統」只放在頁尾的特殊連結。諮商相關頁沒有列夜間或緊急電話 |
| 消息與活動 | 用文字列表，不做卡片。每則有「公開日＋分類標籤」，活動則有「開催日＋地點」，加上「一覽を見る」。資訊密度高、好掃讀 |
| 搜尋 | 工具列同時有站內搜尋和教員搜尋 |
| 單位頁版型 | 留學生諮詢頁：H1 → 簡介＋時程 PDF → 地點（兩處，附地圖）→ 首次諮詢須知（預約信箱）→ 職員 → 校內外參考資源 → 側欄（留學生生活的完整子選單，加上**手續與窗口速查表**）。「学生相談・障害学生支援・就職」頁只是三個子服務的入口清單 |
| 視覺 | `theme-color` 為 #00205b（深藍）。新聞以列表為主，圖片集中在輪播和特集。字體無法確認，沒看到深色模式的線索 |
| 手機 | 頁首有搜尋和選單圖示，側欄有開合鈕，屬響應式 |

### 1.6 早稻田大學 学生生活課（日）

來源：https://www.waseda.jp/inst/student/ 、https://www.waseda.jp/inst/student/support 、https://www.waseda.jp/inst/student/support/consultation 、https://www.waseda.jp/inst/scc/

| 項目 | 觀察 |
|---|---|
| 首頁區塊順序 | 工具列（捐款、交通、資料庫、搜尋、語言）→ 快捷列（LINE、MyWaseda、聯絡、網站地圖）→ 單位標誌（日英名並列）→ 輪播（「Support your student life」）→ 7 項全域導覽 → **「重要なお知らせ」**（附日期清單）→ **「各種お知らせ・イベント」**（加 New 標記和分類標籤）→ 相關網站橫幅 → SNS → 3 張圖片卡（各種學生相談、互助會、FAQ）→ 頁尾（**Other sites 列出 10 個相關單位**） |
| 主導覽 | 依業務分類（社團、設施、學生生活全般、學生生活支援、校內服務、宿舍），兩層，子頁有左側欄 |
| 任務入口 | 首頁只有 3 張圖片卡。「學生生活支援」頁是 9 項「標題＋一兩句摘要」的清單 |
| 緊急資訊 | 首頁沒有專區。但**「各種學生相談」頁是本次最值得學的日本做法**：最上面是單一總窗口「学生生活110番」（電話＋Email，平日 9–17）＋聯絡不上時的備援電話（校門受付）→ **校內窗口表依「相談內容」排列**（欄位：相談內容／窗口／電話／Email）→ 校外專門機構。**依需求而非組織分類**（https://www.waseda.jp/inst/student/support/consultation）。學生相談中心首頁有一則提醒：危及生命的緊急情況，夜間假日也請直接聯絡清單上的機構。但它只是一則「新聞」，不是常駐元素（https://www.waseda.jp/inst/scc/） |
| 消息與活動 | **把「重要」和「一般」分成兩欄**，日期、New 標記、分類標籤齊全，並有「過去的新聞」。學生相談中心用嵌入式 Google 日曆標示開放日 |
| 搜尋 | 可切換「本站／早大全體」，另外有「目的別搜尋」連結 |
| 單位頁版型 | 子頁：麵包屑 → H1 → 簡介 → 頁內錨點（例如 110番／校內／校外三段）→ 表格 → 頁尾。學生相談中心是獨立站，有自己的口號 Hero（日英雙語：There's no one way to be.）、圖片新聞卡和開室行事曆 |
| 視覺 | 有 viewport meta，屬響應式。輪播＋圖片卡。另有過時的瀏覽器相容彈窗（還列著 IE）。沒看到 `prefers-color-scheme`。字體和色碼無法確認 |
| 手機 | 有 viewport，但看不出漢堡選單的實作 |

---

## 2. 美國與日本做法的主要差異

| 面向 | 美國（Stanford／Berkeley／Michigan） | 日本（東大／京大／早大） |
|---|---|---|
| 資訊架構 | 第一層傾向**需求／生活主題**（Navigate Berkeley、Explore Student Life），組織收進 About／Departments | 第一層多為**業務分類或組織**，靠受眾入口（京大「在學生」）做第二條路徑 |
| 任務入口語氣 | 動詞片語、第二人稱（Take care of yourself、How can we help?） | 名詞分類（奨学金、宿舎、相談），語氣中性、像公文 |
| 密度 | 卡片少、圖片大、留白多，以「精選」為主 | 文字連結密集，一頁就是完整目錄（東大 15 類），以「完整」為主 |
| 消息 | 首頁新聞極少（0–1 則），改放社群牆、故事、數字 | 首頁新聞是核心區塊，有日期、分類標籤、NEW 標記，**重要和一般分開**（早大） |
| 緊急 | 健康或諮商單位有**依急迫度分級**、標註 24/7 的專頁（Stanford Vaden）；學務首頁本身反而常常沒有 | 很少看到 24 小時資訊，多數只寫平日上班時間。京大把災害公告放上全校首頁，早大有單一總窗口「110番」 |
| 服務頁內容 | 簡短說明＋按鈕，細節外連到單位站 | 程序、表格、PDF、FAQ、時間地點寫得很完整（東大宿舍、学生相談所） |
| 單位呈現 | 每個單位是獨立子站，共用母體模板 | 單位資訊嵌在全校站裡，頁尾用「Other sites」串起來 |
| 深色模式 | 樣本中都沒看到線索 | 樣本中都沒看到線索 |

**一句話**：美國擅長「入口」（語氣、精選、分級危機頁），日本擅長「內頁」（流程、表格、完整目錄、重要公告分欄）。政大可以用美式入口搭配日式內頁。

---

## 3. 值得政大採用的設計原則（12 條）

1. **第一層導覽就是任務，組別降到「關於學務處／組別」**
   像 Berkeley 把「Navigate Berkeley」放第一項、組織圖放後面，Michigan 把 Units 收在 About 下。政大可以把「我想…」任務群放第一層，第二層才是組別。
   來源：https://studentaffairs.berkeley.edu/ 、https://studentlife.umich.edu/

2. **任務卡用動詞片語當標題，按鈕再給一個具體動作**
   Michigan 的「Take care of yourself → Stay Healthy」。政大可以寫「申請宿舍 → 看申請時程」、「找獎學金 → 依身分篩選」。
   來源：https://studentlife.umich.edu/

3. **用問句入口接住「不知道要找誰」的學生**
   Michigan Dean of Students 的「How can we help?」問句卡（例如擔心某位同學嗎？），可以對應政大的「我擔心同學的狀況」、「我不知道該找哪一組」。
   來源：https://deanofstudents.umich.edu/

4. **緊急資訊依急迫程度分級，並逐項標示 24/7**
   採 Stanford Vaden 的分層：立即危險（110／119）→ 24 小時校內專線（校安中心）→ 當日協助（諮商中心值班）→ 一般預約，每一級都附「什麼情況屬於這一級」的例子。
   來源：https://vaden.stanford.edu/other-options-care

5. **緊急電話只存在單一資料來源，全站引用同一份**
   Berkeley UHS 危機頁的下班後電話出現兩種寫法，911 指示也藏在段落最後。政大應把緊急聯絡資料做成單一元件或資料檔，頁首、頁尾、專頁全部從同一來源讀取，順序固定為「最危急在最前」。
   來源（反例）：https://uhs.berkeley.edu/counseling/urgent

6. **設一個「不知道找誰就打這支」的總窗口，再用「需求 × 窗口」表格分流**
   採早大「学生生活110番」加上依相談內容排序的窗口表（內容／窗口／電話／Email），並寫明聯絡不上時的備援電話。
   來源：https://www.waseda.jp/inst/student/support/consultation

7. **「重要公告」和「一般消息」分成兩欄，重要的排前面**
   早大首頁的重要通知和一般活動分開，京大全校首頁把危機公告排在新聞之前。政大可以讓「重要／限期」公告置頂並標出截止日。
   來源：https://www.waseda.jp/inst/student/ 、https://www.kyoto-u.ac.jp/ja

8. **消息用「日期＋分類標籤＋NEW」的文字列表，不用大圖卡**
   京大和早大的列表密度高、好掃讀，也和編輯風格的排版相容。首頁放 4–6 則，再接「看全部」。
   來源：https://www.kyoto-u.ac.jp/ja/students 、https://www.waseda.jp/inst/student/

9. **服務頁統一用「對象 → 流程步驟 → 時程／地點 → FAQ → 承辦窗口」模板**
   東大学生相談所的 01-02-03 流程＋FAQ＋各校區時間地點，加上東大宿舍頁的資格對照表和標明日期、大小的 PDF。
   來源：https://dcs.adm.u-tokyo.ac.jp/scc/ 、https://www.u-tokyo.ac.jp/ja/students/welfare/h04.html

10. **常用系統獨立成快捷列**
    京大在學生頁的 KULASIS、Webmail、圖書館快捷。政大可以放 iNCCU、請假系統、獎助學金系統、諮商預約。
    來源：https://www.kyoto-u.ac.jp/ja/students

11. **頁首常駐「求助」入口和站內搜尋，搜尋可切換範圍**
    Stanford 每個子站頁首都有「Get Support」和搜尋，早大搜尋可切換「本站／全校」，並提供目的別搜尋。
    來源：https://studentaffairs.stanford.edu/ 、https://www.waseda.jp/inst/student/

12. **首頁精選少量卡片，用數字和故事取代輪播堆疊**
    Michigan 的數字區和單一精選故事，比 Berkeley 和政大現行的多張宣傳輪播更有編輯感。輪播如果保留，至少要提供暫停鈕（UHS 有）。
    來源：https://studentlife.umich.edu/ 、https://uhs.berkeley.edu/

> 補充：**深色模式和 24 小時緊急的醒目處理，6 校都沒有可以直接參考的成熟做法**，是政大可以超前的地方，設計時要自行定義（見第 5 節）。

---

## 4. 建議的首頁區塊順序與單位頁模板

### 4.1 首頁（由上而下）

0. **緊急聯絡條**（固定在頁首最上方，細窄、高對比）：24H 校安專線 ｜ 110／119 ｜「更多緊急資源 →」。依據：第 3 節原則 4、5、11
1. **頁首**：校徽＋「學務處」、主導覽（我想…／生活與支援／關於學務處＋組別）、搜尋、語言、深色模式切換
2. **Hero ＝ 任務搜尋**：一句編輯式標題＋大搜尋框（「我想…」自動完成）＋ 4–6 個熱門任務 chip（申請宿舍、找獎學金、請假、預約諮商、兵役、就學貸款）。依據：Michigan 的動詞卡、Stanford 的頁首求助
3. **任務卡格**：8–12 張動詞標題卡，依生活情境分組（錢、住、身心、請假與學籍、社團與活動）。依據：Berkeley Navigate、Michigan
4. **重要／限期公告**：置頂，標出截止日，最多 3 則。依據：早大、京大
5. **最新消息＋近期活動**（雙欄文字列表：日期＋分類＋NEW）→ 看全部。依據：京大在學生頁
6. **「不知道找誰？」區**：總窗口電話＋問句入口（我擔心同學、我遇到騷擾…）。依據：早大 110番、Michigan DoS
7. **常用系統快捷列**。依據：京大
8. **編輯專題／數字**（選配，1 則故事或 3 個數字）。依據：Michigan
9. **頁尾**：完整緊急聯絡（重複一次）、各組聯絡方式、地址地圖、網站地圖。依據：Stanford 頁尾結構、早大 Other sites

### 4.2 單位（組別）頁模板

1. 麵包屑（首頁 › 關於學務處 › 某組）
2. 標題區：組名（中英）、一句話說明這組「幫你處理什麼」、辦公時間／分機／位置（摘要卡）
3. **這組負責的任務**（卡片或清單，連到第一層的任務頁，不重複寫內容）。依據：Michigan 單位清單「名稱＋一句話」
4. 重要公告（本組，最多 3 則）＋最新消息列表
5. 法規與表單（表格：名稱／更新日期／格式／大小）。依據：東大 PDF 標註
6. 成員與業務分工（姓名、業務、分機）
7. 相關單位（同體系）。依據：Stanford 頁尾「Units」
8. 頁尾（全站共用，含緊急聯絡）

### 4.3 服務（任務）頁模板

1. 麵包屑 → H1（動詞片語，例如「申請學生宿舍」）
2. 摘要卡：適用對象｜申請期間｜承辦組別與分機｜線上系統按鈕
3. 流程步驟 01-02-03。依據：東大学生相談所
4. 資格／費用對照表。依據：東大宿舍一覽
5. 應備文件與下載
6. FAQ
7. 相關任務
8. 最後更新日期、承辦人

---

## 5. 緊急聯絡的最佳做法（綜合）

| 做法 | 說明 | 依據 |
|---|---|---|
| 全站固定的緊急條 | 頁首最上方一條細窄的高對比條，放 24H 校安專線＋110／119＋「更多」。手機上維持一行，電話用 `tel:` 連結。6 校都沒有這樣做，是政大的差異化設計 | 自行定義（樣本缺口） |
| 分級的緊急專頁 | 依「立即危險 → 24 小時 → 當日 → 預約」排序，每級附情境例子和是否 24/7 的標籤 | https://vaden.stanford.edu/other-options-care |
| 最危急的放最前 | 「撥 110／119」必須是頁面第一個大標，不能藏在段落裡 | 正例 https://emergency.stanford.edu/ ；反例 https://uhs.berkeley.edu/counseling/urgent |
| 單一資料來源 | 電話號碼只維護一份，全站共用元件，避免號碼不一致 | 反例 https://uhs.berkeley.edu/counseling/urgent |
| 寫明下班後怎麼辦 | 每個諮詢服務頁都加一個「下班後／假日」區塊，連到 24H 專線 | 反例（缺漏）https://dcs.adm.u-tokyo.ac.jp/scc/ ；正例 https://www.waseda.jp/inst/student/support/consultation （備援電話） |
| 線上表單標註「非緊急」 | 預約或表單旁明確寫「緊急請改撥…」 | https://deanofstudents.umich.edu/ |
| 首頁的危機公告區 | 颱風、地震、停課等狀態公告排在新聞前面，並附更新時間 | https://www.kyoto-u.ac.jp/ja 、https://emergency.stanford.edu/ |
| 頁尾再重複一次 | 頁尾完整列出各級緊急聯絡 | Stanford 全系列頁尾「Emergency Info」 |
| 深色模式要另外驗證 | 緊急條的紅、橘在深色背景容易刺眼或對比不足，深淺兩套色票都要通過 WCAG AA（4.5:1），不要只靠顏色區分，要搭配圖示和文字標籤 | 自行定義（6 校都沒有深色模式） |

---

## 附：政大現況速記（對照用）

來源：https://osa.nccu.edu.tw/tw/

- 導覽完全依組織分：學務長室、生活事務暨僑生輔導組、課外活動組…，學生要先知道「哪一組管」才能找到服務。例如「學生請假」、「獎助學金」都在生僑組底下
- Hero 是多張活動宣傳輪播
- 本次抓到的內容中沒看到搜尋、24 小時緊急聯絡、頁尾（擷取在導覽處中斷，可能存在但未取得）
