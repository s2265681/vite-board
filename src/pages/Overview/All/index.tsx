import { Col, DatePicker, Card, Form, Input, Row, Layout } from "antd";
import React, { FC, useEffect, useState } from "react";
import moment from "moment";
const { Content } = Layout;
const { Meta } = Card;

// import request from 'utils/request/responseInterceptor';
import Cookies from "js-cookie";
const Overview: FC = () => {
  const [showArr, setShowArr] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  function writeCookie() {
    let token =
      "eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eJxlkE1OwzAQha-CvGHTSJ7GP0l2SGVRCbpihxByHEeYBjtKHNoqypYbsOYQbOE25R5MUmiR2M3M--a9sXuiuvBAsp50rWmWrvTHuiAZATYXMJdxLFMKMQUpyIw4q9dOPRnUv15f9p_v-483MsymrYV5ttqMHsVU3ezqkduY_L7WJygoW7UjVau23fimmJizwrvzQA7QT0IiIuCC8iRJGU1RG-_1jQ3WoMFtf-x3CF8srpcrMtwhpbXvXFh5d7mtbWMwIDSd-Stceb0-zTUyxgWrqvb_knEqr37bAV_xGCzG5VoYKEFFkoKImGJppOKSRiJRiZKslKkBvNiqQDIQ-JM85RzQblsfBlKwmMPwDQpYfto.sYEvhY6uEOQWwVPx0hQn7WP39XMLHfHIkAOlZe-H4uQSZEicl3ToXixaKIoZAtH28043TvA1mcMkdkXrz_uB4g";
    Cookies.set("teamind_token", token, { expires: 1 });
  }
  useEffect(() => {
    writeCookie();
    const token = Cookies.get("teamind_token");
    let newOptions: any = {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    let res = fetch(
      "/api/mtg/interaction/spaces/query-scene/all?pageSize=20&pageNo=1",
      newOptions
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.items, "data+++++");
        let items = data.data.items || [];
        setShowArr(items);
      });
  }, []);

// https://www.20200717.xyz/api/board/resource/download/board/145572643184185344/resource/
// 145572643184185344-thumb.png.820000-refer/biz-type/2


https://teamind-board-qa.oss-cn-hangzhou.aliyuncs.com/board/thumb/145572643184185344-thumb.png?Expires=1626189953&OSSAccessKeyId=LTAI4G1zUNmKrTzL9vFb4gub&Signature=BhJ9Mfre%2BvWvhTY4k5YnlgWQIlE%3D&x-oss-process=image%2Fresize%2Cw_3000%2Ch_3000


  console.log(showArr, "showArr>>>");
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {showArr.map((subArr:any, idxGroup) => {
          let resourceId = subArr.spaceBasicInfo.refBoardId + '-thumb.png'
          let imageSrc:any = `https://teamind-board-qa.oss-cn-hangzhou.aliyuncs.com/board/thumb/${resourceId}?Expires=1626189953&OSSAccessKeyId=LTAI4G1zUNmKrTzL9vFb4gub&Signature=BhJ9Mfre%2BvWvhTY4k5YnlgWQIlE%3D&x-oss-process=image%2Fresize%2Cw_3000%2Ch_3000`
          console.log(imageSrc,'?????')
            return (
            <Col span={4}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={imageSrc}
                  />
                }
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
