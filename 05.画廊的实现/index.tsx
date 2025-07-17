/**
 * @Author: lcl
 * @Date: 2025/7/14
 */
import React, { useEffect, useRef, useState } from "react";
import style from "./index.less";
import moment from "moment";
import { message } from "@cyit/lowcode-ui";
import { getLccWebConf } from "@cyit/lowcode-requests";

export default function Index() {
  const now = moment();
  const bodyInfoRef = useRef<any>();
  const [authorizationServerUrl, setAuthorizationServerUrl] = useState("");
  const data: {
    id: number;
    name: JSX.Element;
    img: string;
    src?: any;
  }[] = [
    {
      id: 1,
      name: (
        <>
          <span>数据基础计算</span>
          <span>平台</span>
        </>
      ),
      img: require("./img/vessel1.png"),
      src: `${authorizationServerUrl}/oauth2/authorize?response_type=code&client_id=jcjspt&redirect_uri=http://183.230.9.103:30625/anno/oauth2/code`,
    },

    {
      id: 2,
      name: (
        <>
          <span>数据治理运营</span>
          <span>平台</span>
        </>
      ),
      img: require("./img/vessel2.png"),
      src: `${authorizationServerUrl}/oauth2/authorize?response_type=code&client_id=zlyypt&redirect_uri=http://183.230.9.103:30005/dev/oauth2/code`,
    },
    {
      id: 3,
      name: (
        <>
          <span>数据共享服务</span>
          <span>平台</span>
        </>
      ),
      img: require("./img/vessel3.png"),
    },
    {
      id: 4,
      name: (
        <>
          <span>后台管理平台</span>
          <span style={{ visibility: "hidden" }}>平台</span>
        </>
      ),
      img: require("./img/vessel5.png"),
      src: "http://sjzt-dev.lcctest.cqcyit.com:20304",
    },
    {
      id: 5,
      name: (
        <>
          <span>边缘智能运维</span>
          <span>集成平台</span>
        </>
      ),
      img: require("./img/vessel4.png"),
    },
    {
      id: 6,
      name: (
        <>
          <span>数据资源</span>
          <span>一览图</span>
        </>
      ),
      img: require("./img/vessel6.png"),
    },
    {
      id: 7,
      name: (
        <>
          <span>数据驾驶舱</span>
          <span style={{ visibility: "hidden" }}>平台</span>
        </>
      ),
      img: require("./img/vessel7.png"),
    },
  ];

  useEffect(() => {
    function update() {
      const newRatio = Math.round((window.innerWidth / 1440) * 100) / 100;
      if (bodyInfoRef.current) {
        bodyInfoRef.current.style.scale = newRatio;
      }
    }

    // 初始化
    update();

    // 监听窗口大小变化
    window.addEventListener("resize", update);

    // 清理函数
    return () => window.removeEventListener("resize", update);
  }, [bodyInfoRef.current]);

  useEffect(() => {
    getLccWebConf().then((res) => {
      const { authorizationServerUrl } = res.data;
      setAuthorizationServerUrl(authorizationServerUrl);
    });
  }, []);

  return (
    <div className={style.homepage}>
      <div className={style.homepage2}>
        <div className={style.header}>数据平台</div>
        <div className={style.info}>
          <span style={{ marginRight: "16px" }}> {now.format("HH:mm:ss")}</span>
          <span style={{ marginRight: "16px" }}>{moment().format("dddd")}</span>
          <span style={{ marginRight: "16px" }}>
            {now.format("YYYY-MM-DD")}
          </span>
        </div>
      </div>
      <div className={style.headerImg}></div>
      <div className={style.footerImg2}></div>
      <div className={style.footerImg}></div>
      <div className={style.bodyInfoWrapper}>
        <div className={style.bodyInfo} ref={bodyInfoRef}>
          <div className={style.platformCard}>
            <div className={style.bigCardBgRed}></div>
          </div>
          <div className={style.platformCard}>
            <div className={style.smallCardBgRed}></div>
          </div>
          {data.map((v, index) => {
            return (
              <div
                onClick={() => {
                  if (v.src) {
                    console.log(v.src);

                    window.open(v.src);
                  } else {
                    message.warn("开发中，请等待上线...");
                  }
                }}
                key={v.id}
                className={style.platformCard}
              >
                <div className={style.cardBg}></div>
                <img src={v.img} className={style.iconImg} alt="" />
                <div className={style.shadowBox}></div>
                {v.name}
              </div>
            );
          })}
          <div className={style.platformCard}>
            <div className={style.bigCardBgRed}></div>
          </div>
          <div className={style.platformCard}>
            <div className={style.smallCardBgRed}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
