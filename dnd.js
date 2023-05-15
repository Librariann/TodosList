// jQuery UI sortable으로 Drag & Drop 구현
$("div.contents > ul").sortable({
  axis: "xy", // x: 가로방향, y: 세로방향
  opacity: 0.2, // 드래그 중인 항목의 불투명도 (0에 가까울 수록 투명)
  tolerance: "pointer", // 이동 중인 항목이 마우스 포인터 기준으로 다른 항목 위에 있는지 확인
});
