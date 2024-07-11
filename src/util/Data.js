import React, {useEffect, useState} from 'react';
import axios from 'axios';

export const loadData = () => {
    const [data, setData] = useState([]);
 
    useEffect(() => {
        axios.get('/eoditsseu/api/maps')
        .then(response => setData(response.data))
        .catch(error => console.log(error))
    }, []);

    console.log(data);

    return data;
}

export const loadLocationData = () => {
    var data = data_convenience;
    data = data.concat(data_restaurant);
    data = data.concat(data_cafe);
    return data;
} 

export const loadTableData = () => {
    var data = data_Information;
    return data;
}

export const data_Information = [
    { title: "제목1", user_id: "사용자1", createdAt: "20240101", likes: 1 },
    { title: "제목2", user_id: "사용자2", createdAt: "20240101", likes: 1 },
    { title: "제목3", user_id: "사용자3", createdAt: "20240101", likes: 1 },
    { title: "제목4", user_id: "사용자4", createdAt: "20240101", likes: 1 },
    { title: "제목5", user_id: "사용자5", createdAt: "20240101", likes: 1 },
    { title: "제목6", user_id: "사용자6", createdAt: "20240101", likes: 1 },
    { title: "제목7", user_id: "사용자7", createdAt: "20240101", likes: 1 },
    { title: "제목8", user_id: "사용자8", createdAt: "20240101", likes: 1 },
    { title: "제목9", user_id: "사용자9", createdAt: "20240101", likes: 1 },
    { title: "제목10", user_id: "사용자10", createdAt: "20240101", likes: 1 },
    { title: "제목11", user_id: "사용자11", createdAt: "20240101", likes: 1 },
    { title: "제목12", user_id: "사용자12", createdAt: "20240101", likes: 1 },
    { title: "제목13", user_id: "사용자13", createdAt: "20240101", likes: 1 },
    { title: "제목14", user_id: "사용자14", createdAt: "20240101", likes: 1 },
    { title: "제목15", user_id: "사용자15", createdAt: "20240101", likes: 1 },
    { title: "제목16", user_id: "사용자16", createdAt: "20240101", likes: 1 },
]

export const data_convenience = [
    { lat: 37.4952343, lng: 126.9549512, title: "GS25 숭실마루점", detail: "편의점", type: 1 },
    { lat: 37.4963462, lng: 126.9568865, title: "이마트24 숭실대형남공학관점", detail: "편의점", type: 1 },
    { lat: 37.4950039, lng: 126.9576722, title: "GS25 숭실대점", detail: "편의점", type: 1 },
    { lat: 37.4946821, lng: 126.9589734, title: "CU 숭실대점", detail: "편의점", type: 1 },
    { lat: 37.4957957, lng: 126.9540341, title: "GS25 숭실대입구역점", detail: "편의점", type: 1 },
    { lat: 37.4996979, lng: 126.9512756, title: "GS25 상도장안점", detail: "편의점", type: 1 },
    { lat: 37.4969913, lng: 126.9515932, title: "CU 상도엠코점", detail: "편의점", type: 1 },
    { lat: 37.4934161, lng: 126.9569574, title: "CU 상도삼호점", detail: "편의점", type: 1 },
];

export const data_restaurant = [
    { lat: 37.4944431, lng: 126.9586959, title: "고렝", detail: "음식점", type: 2 },
    { lat: 37.4934178, lng: 126.957297, title: "고추동 제면소", detail: "음식점", type: 2 },
    { lat: 37.4956657, lng: 126.9535089, title: "가야성", detail: "음식점", type: 2 },
    { lat: 37.4981248, lng: 126.9523007, title: "불타는 꼬꼬발 숭실대점", detail: "음식점", type: 2 },
    { lat: 37.4968806, lng: 126.9535395, title: "쉐프의 목장", detail: "음식점", type: 2 },
]

export const data_cafe = [
    { lat : 37.4968806, lng: 126.9527254, title: "스타벅스 숭실대입구역점", detail: "카페", type: 3 },
    { lat : 37.4950408, lng: 126.9570177, title: "매머드익스프레스 숭실대점", detail: "카페", type: 3 },
]