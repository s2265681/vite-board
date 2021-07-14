import React, { FC } from "react";
interface Iprops {
  type: string;
}

interface IcontentObj {
  [type: string]: React.ReactElement;
}

let styleSty:any = {
  width: "100%",
  height: "70vh",
  display:"flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign:'center'
}

const Empty: FC<Iprops> = ({ type }) => {
  const defalut = (
    <>
      <img
        style={{ width: 254, height: 238 }}
        alt=""
        src={`https://teamind-static-oss.teamind.co/meeting/empty-meeting.png`}
      />
      <p style={{ marginTop: -16, fontWeight: 600 }}>当前分类无会议</p>
      <span>立即点击右上角，开始一场会议吧</span>
    </>
  );
  const contentObj: IcontentObj = {
    recyclebin: (
      <>
        <img
          style={{ width: 175, height: 142 }}
          alt=""
          src={`https://teamind-static-oss.teamind.co/meeting/empty-recycle.png`}
        />
        <p
          style={{
            paddingRight: 15,
            paddingTop: 20,
            textAlign: "right",
            fontWeight: 600,
          }}
        >
          回收站为空
        </p>
      </>
    ),
    template: (
      <>
        <img
          style={{ width: 175, height: 142 }}
          alt=""
          src={`https://teamind-static-oss.teamind.co/meeting/empty-recycle.png`}
        />
        <p
          style={{
            paddingRight: 0,
            paddingTop: 20,
            textAlign: "right",
            fontWeight: 600,
          }}
        >
          当前无会议模板，敬请期待...
        </p>
      </>
    ),
  };
  return <div className="empty_wrapper" style={{...styleSty}}>
    <div>
     {contentObj[type] ? contentObj[type] : defalut}
     </div>
  </div>

};
export default Empty;
