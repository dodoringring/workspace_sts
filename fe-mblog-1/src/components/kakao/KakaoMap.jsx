/* global kakao */
import React, { useEffect, useRef, useState } from 'react'
import { BButton } from '../styles/FromStyle';

const KakaoMap = () => {
  const kakaomap=useRef();
  const [map,setMap]=useState()
  const [positions, serPosition]=useState([
    {
      content:'<div>터짐블로그<br/><a href="https://ww.iei.or.kr">웹사이트</a></div>',
      latlng:new kakao.maps.LatLng(37.4984971, 127.032603),
    }
  ])
  useEffect(()=>{
    const container=document.getElementById("map");
    const options={
      center:positions[0].latlng,
      level:4,
    }
    if(!map){
      setMap(new kakao.maps.Map(container, options))
    }else{
      if(positions[1]){//자바스크립트에서 0이 아닌것은 모두 트루
        map.setCenter(positions[1].latlng)
      }
    }
    //마커 표시하기
    for(let i=0; i<positions.length;i++){
      //마커생성하기
      const marker=new kakao.maps.Marker({
        map:map,//마커를 표시할 지도
        position:positions[i].latlng,//마커의 위치
      });
      //마커에 표시할 인포윈도우 생성하기
      const infowindow= new kakao.maps.InfoWindow({
        content:positions[i].content
      });
      //마커에 이벤트를 등록하는 함수를 만들고 즉시 호출되도록 클로저 만듦
      //클로저를 추가하지 않으면 마커가 여러개 있을때 마지막에만 이벤트 적용
      (function(marker, infowindow){
        //마커에 mouse over이벤트 등록 마우스 오버시 인포윈도우를 표시함
        kakao.maps.event.addListener(marker,'mouseover', function(){
          infowindow.open(map,marker);
        });
        //마커에 마우스아웃 이벤트 등록 마우스 아웃시 인포윈도우를 닫기 처리함
        kakao.maps.event.addListener(marker,'mouseout', function(){
          infowindow.close()
        });
      })(marker, infowindow);//즉시실행함수
    }/////////end of if
  },[positions, map])
  return (
    <>
      <div style={{display: "flex", alignItems:"center", justifyContent:"space-around", flexDirection:"column"}}>
        <div id="map" ref={kakaomap} style={{width: "500px", height: "400px", marginBottom: "20px", border: "2px solid lightgray", borderRadius: "20px"}}></div>
        <BButton type="button">현재위치</BButton>
      </div>
      카카오맵
    </>
  )
}

export default KakaoMap
