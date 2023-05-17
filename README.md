# ☀️ 무드 트래커, '무드로그'

![mood-thumb](https://github.com/cona-tus/react-mood-tracker/assets/90844424/1046fa15-f7b2-4f14-b322-5cc93fc2db42)

<br/>

[![Netlify Status](https://api.netlify.com/api/v1/badges/1f550f84-21ac-4bfb-b39c-1402682b9a18/deploy-status)](https://app.netlify.com/sites/conatus-mood-tracker/deploys) | [Live Demo](https://conatus-mood-tracker.netlify.app/)

<br/>
<br/>

# 1. Project

## 1-1. Project Description

'무드로그'는 감정 상태를 기록하는 웹 애플리케이션입니다. 정신 건강에 관심이 있거나, 스트레스를 관리하여 감정 조절 능력을 향상시키고 싶은 사람들을 위해 기획되었습니다.

![mood-desc](https://github.com/cona-tus/react-mood-tracker/assets/90844424/95b700b0-83d7-4365-81b0-7d02c6f83ae5)

☀️ 무드로그를 통해 나의 감정 흐름을 추적하고 더 나은 일상을 만나보세요!

- 일상 속 기분을 기록하세요.  
  일기를 작성하여 7단계로 감정을 체크하고, 감정에 영향을 주는 요인을 선택할 수 있습니다. 감정과 활동의 상관 관계를 파악해보세요.

- 감정 변화를 한눈에 살펴봐요.  
  감정 변화를 그래프로 확인할 수 있습니다. 특정 시기나 상황에서 기분 흐름을 살펴보세요.

- 감정을 통계로 확인해보세요.  
  통계를 통해 감정 상태를 명확하게 인식할 수 있습니다. 전문적인 도움을 받을 때 활용해보세요.

<br/>

## 1-2. Project Duration & Participants

- 2023-05-10 ~ 2023-05-17
- 개인 프로젝트 (1인)

<br/>
<br/>

# 2. Skills

![REACT](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=ffffff)
![POSTCSS](https://img.shields.io/badge/Postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=ffffff)
![Git](https://img.shields.io/badge/Git-f05032?style=for-the-badge&logo=git&logoColor=ffffff)

<br/>
<br/>

# 3. Main Features

## 3-1. 메인 페이지

![mood-note](https://github.com/cona-tus/react-mood-tracker/assets/90844424/f58d5d42-33fd-40fb-a636-c50ecff91170)

- 노트 추가 기능
  - state를 이용하여 입력 폼 조건부 렌더링
  - 타이틀과 날짜 입력 시 유효성 검사
- 노트 삭제 기능
  - 아이콘 클릭 시 스와이프하여 삭제 가능
- 노트 상세보기 기능
  - 항목 클릭 시 노트 상세 페이지로 이동
- 로컬스토리지에 정보 저장

<br/>

## 3-2. 노트 페이지

![mood-detail](https://github.com/cona-tus/react-mood-tracker/assets/90844424/32de2902-a750-4028-b673-e7a52972f344)

- 기분 추이 그래프
  - chart.js 라이브러리를 사용해 데이터를 그래프로 시각화
- 기분 데이터 통계화
  - 데이터를 가공하여 기록수, 평균치, 최저/최고 일수 계산
- 일기 표시
  - context를 이용해 작성한 일기를 나열
- 개별 일기 상세보기 기능
  - 일기 항목 클릭 시 수정 페이지로 이동
- 로컬스토리지에 정보 저장

## 3-3. 일기 작성 및 수정 페이지

- 작성 및 수정 페이지 전환
  - context를 이용해 일기 작성 가능
  - 조건부 렌더링으로 작성 및 수정 페이지 전환
  - 작성 취소 시 입력폼 초기화

![mood-add](https://github.com/cona-tus/react-mood-tracker/assets/90844424/db2b897e-fc67-4dd5-b2a8-f0459bd886a3)

- 일기 작성
  - 설정한 기간 내에서 날짜 선택 가능
  - 일기 작성 시 날짜 및 내용 입력창 유효성 검사
  - state를 이용해 mood와 tag를 수치로 저장

![mood-edit](https://github.com/cona-tus/react-mood-tracker/assets/90844424/0ef00460-d063-4766-a054-f5b7b695b788)

- 일기 수정 및 삭제
  - context, reducer로 기존 데이터로 일기 수정 가능
  - context, reducer로 개별 일기 삭제 가능
- 로컬스토리지에 정보 저장
