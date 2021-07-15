import { Col, Card, Row, message } from "antd";
import React, { FC, useEffect, useState } from "react";
const { Meta } = Card;
import Cookies from "js-cookie";
import Loading from 'components/Loading'
import Empty from 'components/Empty'

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

interface Iprops {
  apitype: string;
}

const CardPage: FC<Iprops> = ({ apitype }) => {
  const [showArr, setShowArr] = useState([]);
  const [isLoading,setIsLoading] = useState<Boolean>(false)
  const [isEmpty, setIsEmpty] = useState<Boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    let res = fetch(
      `/api/mtg/interaction/spaces/query-scene/${apitype}?pageSize=20&pageNo=1`,
      {
        method: "GET",
        ...newOptions,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let items = data.data.items || [];
        if(items.length===0){
          setIsEmpty(true)
          setIsLoading(false)
          return
        }
        let len = items.length;
        items.map(async (el: any, index: number) => {
          let url = `/api/board/resource/download/board/${el.spaceBasicInfo.refBoardId}/resource/${el.spaceBasicInfo.thumbResourceId}/biz-type/2`;
          let result = await fetch(url, {
            method: "POST",
            ...newOptions,
          }).then((res) => res.json());
          items[index].spaceBasicInfo.imgSrc = result.data;
          if (index === len - 1) {
            setTimeout(() => {
              setShowArr(items);
              setIsLoading(false)
            }, 200);
          }
        });
      })
      .catch(err=>{
        // message.error(err)
        setIsEmpty(true)
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }, []);

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {showArr.map((subArr: any, index: number) => {
          return (
            <Col span={4} key={index}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={subArr.spaceBasicInfo.imgSrc} />}
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
      <Loading show={isLoading}/>
      {!isLoading && isEmpty && <Empty type="default"/>}
    </div>
  );
};

export default CardPage;
