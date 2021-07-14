import { Col, Card, Row } from "antd";
import React, { FC, useEffect, useState } from "react";
const { Meta } = Card;
import Cookies from "js-cookie";

function writeCookie() {
  let token =
    "eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eJxlkE1OwzAQha-CvGHTSJ7GP0l2SGVRCbpihxByHEeYBjtKHNoqypYbsOYQbOE25R5MUmiR2M3M--a9sXuiuvBAsp50rWmWrvTHuiAZATYXMJdxLFMKMQUpyIw4q9dOPRnUv15f9p_v-483MsymrYV5ttqMHsVU3ezqkduY_L7WJygoW7UjVau23fimmJizwrvzQA7QT0IiIuCC8iRJGU1RG-_1jQ3WoMFtf-x3CF8srpcrMtwhpbXvXFh5d7mtbWMwIDSd-Stceb0-zTUyxgWrqvb_knEqr37bAV_xGCzG5VoYKEFFkoKImGJppOKSRiJRiZKslKkBvNiqQDIQ-JM85RzQblsfBlKwmMPwDQpYfto.sYEvhY6uEOQWwVPx0hQn7WP39XMLHfHIkAOlZe-H4uQSZEicl3ToXixaKIoZAtH28043TvA1mcMkdkXrz_uB4g";
  Cookies.set("teamind_token", token, { expires: 1 });
}
writeCookie();

const token = Cookies.get("teamind_token");

let newOptions: any = {
  credentials: "include",
  headers: {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
};

const Overview: FC = () => {
  const [showArr, setShowArr] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    let res = fetch(
      "/api/mtg/interaction/spaces/query-scene/all?pageSize=20&pageNo=1",
      {
        method: "GET",
        ...newOptions,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let items = data.data.items || [];
        let len = items.length;
        items.map(async(el: any, index: number) => {
          let url = `/api/board/resource/download/board/${el.spaceBasicInfo.refBoardId}/resource/${el.spaceBasicInfo.thumbResourceId}/biz-type/2`;
          let result =  await fetch(url, {
              method: "POST",
              ...newOptions,
            }).then((res) => res.json())
            items[index].spaceBasicInfo.imgSrc = result.data
            if(index===len-1){
                setShowArr(items)
            }
        });
      });
  },[]);


  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {showArr.map((subArr: any, idxGroup) => {
            console.log(subArr.spaceBasicInfo.imgSrc,'subArr.spaceBasicInfo.imgSrc')
          return (
            <Col span={4} key={idxGroup}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={subArr.spaceBasicInfo.imgSrc}/>}
              >
                <Meta
                  title={subArr.spaceBasicInfo.spaceName}
                  description={subArr.spaceBasicInfo.refBoardId}
                />
                {subArr.spaceMemberList[0].nickname}
                {subArr.spaceBasicInfo.updatedAtDesc}
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Overview;
