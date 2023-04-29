# 我的餐廳清單

一個使用 Node.js + Express 打造的餐廳美食網站，儲存自己喜歡的餐廳，並且透過搜尋功能找到喜歡的餐廳類型或名稱


## 專案畫面

![image](https://github.com/Chingsan0722/ac-restaurant-list/blob/main/snapshots/login_page.png)

![image](https://github.com/Chingsan0722/ac-restaurant-list/blob/main/snapshots/user_page.png)

## Features - 產品功能

1. 使用者可以創建自己的帳號，也可選擇FB登入
2. 使用者可以瀏覽所有自己的餐廳
3. 使用者可以新增餐廳
4. 使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話與簡介
5. 使用者可以依照中文名稱、英文名稱與餐廳類別進行搜尋
6. 使用者可以編輯餐廳內容
7. 使用者可以使用排序功能(建置中，搜尋後無法使用)

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/Chingsan0722/ac-restaurant-list.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd restaurant-list2
```

3. 安裝 npm 套件，在 Terminal 輸入

```
 npm install
```
4. 載入種子資料

```
npm run seed
```

5. 啟動伺服器，執行 app.js 檔案

```
nodemon app.js
```

6. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
App i 1s running on http://localhost:3000
```

7. 使用建立好的種子使用者登入

帳號：user1@example.com
密碼：12345678

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始使用我的餐廳清單囉！


## Contributor - 專案開發人員

> [Ching Lin](https://github.com/Chingsan0722)
