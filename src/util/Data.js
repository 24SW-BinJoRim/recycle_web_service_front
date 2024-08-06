import React, {useEffect, useState} from 'react';
import axios from 'axios';

// const getData = (from) => {
//     axios.get(from)
//     .then(response => setData(response.data))
//     .catch(error => console.log(error))
//   }

// const postData = (to, data) => {
// axios.post(to, data)
// .then(response => console.log(response.data))
// .catch(error => console.log(error))
// };

export const loadData = (api) => {
    const [data, setData] = useState([]);
 
    useEffect(() => {
        axios.get(api)
        .then(response => setData(response.data))
        .catch(error => console.log(error))
    }, []);

    // console.log(data);

    return data;
}

export const loadLocationData = () => {
    // var data = data_convenience;
    // data = data.concat(data_restaurant);
    // data = data.concat(data_cafe);

    var data = loadData('/eoditsseu/api/maps');
    
    for (let i = 0; i < data.length; i += 1) {
        if (data[i].type == "쓰레기통") data[i].type = 1;
        else if (data[i].type == "분리수거시설") data[i].type = 2;
        else if (data[i].type == "의류수거함") data[i].type = 3;
        else if (data[i].type == "녹색가게") data[i].type = 4;
    }
    
    // console.log(data);

    return data;
} 

export const loadTableData = () => {
    var data = data_Information;
    return data;
}

export const loadInfoData = (api) => {
    // var data = data_Information;
    const data = loadData(api);
    return data;
}

export const loadUsedData = (api) => {
    // var data = data_usedtransaction;
    const data = loadData(api);
    return data;
}

export const loadCommentsData = (api) => {
    // var data = data_comments;
    const data = loadData(api);
    return data;
}

const data_Information = [
    { id: 1, title: "[환경부] 분리배출 방법, 꼼꼼히 알려드려요!", user_id: 0, username: "운영자", createdAt: "2024-07-11", likes: 0, contents: "https://www.me.go.kr/home/web/board/read.do?menuId=&boardId=853220&boardMasterId=713" },
    { id: 2, title: "[영등포구] 카페에서 개인컵 쓰면 `할인＋서울페이 적립` 400원 이상 혜택", user_id: 0, username: "운영자", createdAt: "2024-07-02", likes: 0, contents: "내용" },
    { id: 3, title: "[강동구] 쓰레기배출안내", user_id: 0, username: "운영자", createdAt: "2024-06-24", likes: 0, contents: "" },
    { id: 4, title: "[중랑구] 재활용품 분리 배출 안내", user_id: 0, username: "운영자", createdAt: "2024-06-08", likes: 0, contents: "" },
    { id: 5, title: "[용산구] 생활쓰레기 배출 안내", user_id: 0, username: "운영자", createdAt: "2024-06-01", likes: 0, contents: "" },
    { id: 6, title: "[관악구] 생활계 유해폐기물 배출안내", user_id: 0, username: "운영자", createdAt: "2024-05-22", likes: 0, contents: "내용" },
    { id: 7, title: "[중구] 재활용품 분리배출", user_id: 0, username: "운영자", createdAt: "2024-05-13", likes: 0, contents: "" },
    { id: 8, title: "[동작구] 생활쓰레기 배출 안내", user_id: 0, username: "운영자", createdAt: " 2024-05-10", likes: 0, contents: "" },
    { id: 9, title: "제목9", username: "사용자9", user_id: 0, createdAt: "20240101", likes: 1, contents: "" },
    { id: 10, title: "제목10", username: "사용자10", user_id: 0, createdAt: "20240101", likes: 1, contents: "" },
    { id: 11, title: "제목11", username: "사용자11", user_id: 0, createdAt: "20240101", likes: 1, contents: "" },
    { id: 12, title: "제목12", username: "사용자12", user_id: 0, createdAt: "20240101", likes: 1, contents: "" },
    { id: 13, title: "제목13", username: "사용자13", user_id: 0, createdAt: "20240101", likes: 1, contents: "" },
    { id: 14, title: "제목14", username: "사용자14", user_id: 0, createdAt: "20240101", likes: 1, contents: "" },
    { id: 15, title: "제목15", username: "사용자15", user_id: 0, createdAt: "20240101", likes: 1, contents: "" },
    { id: 16, title: "제목16", username: "사용자16", user_id: 0, createdAt: "20240101", likes: 1, contents: "" },
    { id: 17, title: "제목17", username: "사용자17", user_id: 0, createdAt: "20240101", likes: 1, contents: "" },
]

const data_usedtransaction = [
    { id: 1, title: "캥골 백팩 팝니다", user_id: 10, username: "짱돌", createdAt: "2024-07-13 19:26", likes: 9, contents: "\
        <h4>제곧내</h4>\
        제곧내 "},
        // 사<br>든<br>가<br> <br>말<br>든<br>가\
        // " },
    { id: 2, title: "행거", user_id: 11, username: "고양이사랑해", createdAt: "2024-07-07 22:43", likes: 2, contents: "" },
    { id: 3, title: "의자 3개랑 식탁 나눔", user_id: 12, username: "붉은노을", createdAt: "2024-07-01 20:54", likes: 11, contents: "" },
    { id: 4, title: "세발자전거 (유아용)", user_id: 13, username: "동작버섯", createdAt: "2024-06-28 07:01", likes: 7, contents: "" },
    { id: 5, title: "원피스", user_id: 14, username: "카라", createdAt: "2024-06-24 09:16", likes: 3, contents: "" },
    { id: 6, title: "이사로 정리 급처 다해서 5천원", user_id: 15, username: "기니", createdAt: "2024-06-19 16:45", likes: 13, contents: "" },
    { id: 7, title: "4인 소파", user_id: 16, username: "숭식이", createdAt: "2024-06-15 11:21", likes: 6, contents: "" },
    { id: 8, title: "샘송 가습기 팝니다", user_id: 17, username: "오이오이오", createdAt: "2024-06-13 17:55", likes: 8, contents: "" },
    { id: 9, title: "제목9", user_id: 28, username: "사용자9", createdAt: "20240101", likes: 1, contents: "" },
    { id: 10, title: "제목10", user_id: 39, username: "사용자10", createdAt: "20240101", likes: 1, contents: "" },
    // { id: 11, title: "제목11", user_id: "사용자11", createdAt: "20240101", likes: 1, contents: "" },
    // { id: 12, title: "제목12", user_id: "사용자12", createdAt: "20240101", likes: 1, contents: "" },
    // { id: 13, title: "제목13", user_id: "사용자13", createdAt: "20240101", likes: 1, contents: "" },
    // { id: 14, title: "제목14", user_id: "사용자14", createdAt: "20240101", likes: 1, contents: "" },
    // { id: 15, title: "제목15", user_id: "사용자15", createdAt: "20240101", likes: 1, contents: "" },
    // { id: 16, title: "제목16", user_id: "사용자16", createdAt: "20240101", likes: 1, contents: "" },
    // { id: 17, title: "제목17", user_id: "사용자17", createdAt: "20240101", likes: 1, contents: "" },
]

const data_convenience = [
    { lat: 37.496374, lng: 126.953504, title: "일반쓰레기", detail: "숭실대입구역 가로변", type: "쓰레기통"},
    { lat: 37.4952343, lng: 126.9549512, title: "GS25 숭실마루점", detail: "편의점", type: "쓰레기통" },
    { lat: 37.4963462, lng: 126.9568865, title: "이마트24 숭실대형남공학관점", detail: "편의점", type: "쓰레기통" },
    { lat: 37.4950039, lng: 126.9576722, title: "GS25 숭실대점", detail: "편의점", type: "쓰레기통" },
    { lat: 37.4946821, lng: 126.9589734, title: "CU 숭실대점", detail: "편의점", type: "쓰레기통" },
    { lat: 37.4957957, lng: 126.9540341, title: "GS25 숭실대입구역점", detail: "편의점", type: "쓰레기통" },
    { lat: 37.4996979, lng: 126.9512756, title: "GS25 상도장안점", detail: "편의점", type: "쓰레기통" },
    { lat: 37.4969913, lng: 126.9515932, title: "CU 상도엠코점", detail: "편의점", type: "쓰레기통" },
    { lat: 37.4934161, lng: 126.9569574, title: "CU 상도삼호점", detail: "편의점", type: "쓰레기통" },
];

const data_restaurant = [
    { lat: 37.4944431, lng: 126.9586959, title: "고렝", detail: "음식점", type: "분리수거시설" },
    { lat: 37.4934178, lng: 126.957297, title: "고추동 제면소", detail: "음식점", type: "분리수거시설" },
    { lat: 37.4956657, lng: 126.9535089, title: "가야성", detail: "음식점", type: "분리수거시설" },
    { lat: 37.4981248, lng: 126.9523007, title: "불타는 꼬꼬발 숭실대점", detail: "음식점", type: "분리수거시설" },
    { lat: 37.4968806, lng: 126.9535395, title: "쉐프의 목장", detail: "음식점", type: "분리수거시설" },
]

const data_cafe = [
    { lat : 37.4968806, lng: 126.9527254, title: "스타벅스 숭실대입구역점", detail: "카페", type: "의류수거함" },
    { lat : 37.4950408, lng: 126.9570177, title: "매머드익스프레스 숭실대점", detail: "카페", type: "의류수거함" },
]

const data_comments = [
    {
      id: 1,
      content: '1빠',
      username: '이몽룡',
      createdAt: '2024-07-13',
      updatedAt: null,
      user_id: 1
    },
    {
      id: 2,
      content: '2빠',
      username: '성춘향',
      createdAt: '2024-07-14',
      updatedAt: '2024-07-15',
      user_id: 2
    }
  ]