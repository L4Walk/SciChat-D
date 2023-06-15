<meta
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
/>;
import Locale from "../locales";

import styles from "./setAPI.module.scss";
import { Input, List, ListItem, Modal, Select, showToast } from "./ui-lib";
import { IconButton } from "./button";
import AddIcon from "../icons/add.svg";
import { api } from "../client/api";
import { useEffect, useState } from "react";

import { useAccessStore } from "../store";
import comUtil from "../../common/comUtil";
import axios from "axios";
import { Console } from "console";
import { Value } from "sass";

export function SetAPIModal(props: { onClose: () => void }) {
  return (
    <div className="modal-mask">
      <Modal title={"设置Key"} onClose={props.onClose}>
        <div style={{ minHeight: "40vh" }}>
          <MessageSetAPI />
        </div>
      </Modal>
    </div>
  );
}

export function MessageSetAPI() {
  const [ApiKey, setApiKey] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const accessStore = useAccessStore();
  const showUsage = accessStore.isAuthorized();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");

  const ApplyKey = () => {
    if (EmailAddress == "" || !EmailAddress.indexOf("@")) {
      setMsg("请输入正确的邮箱地址！");
      return;
    }

    const emailData = {
      email: EmailAddress,
    };

    console.log("申请邮件");

    axios
      .post(
        comUtil.getHost() + "/chat/pub_chat/createAccountByEmail",
        emailData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        },
      )
      .then((res) => {
        setPosts((posts) => res.data);
        setMsg("申请成功，KEY已发送到您的邮箱，请进入邮箱查看");
      })
      .catch((err) => {
        console.log("Bug啦");
        console.log(posts);
        console.log(EmailAddress);
        console.log(err.message);
      });

    {
      /*
    axios({
      method: "POST", // 若不设置，默认为GET请求
      url: "/chat/pub_chat/createAccountByEmail",
      //当`url`是相对地址的时候，设置`baseURL`自动添加在url之前会非常方便
      baseURL: "http://47.113.149.222:8080", //http://47.113.149.222:8080
      //`headers`选项是需要被发送的自定义请求头信息
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //`params`选项是要随请求一起发送的请求参数----一般链接在URL后面
      //他的类型必须是一个纯对象或者是URLSearchParams对象
      params: {
        //ID: 12345,
      },
      //`data`选项是作为一个请求体而需要被发送的数据
      //该选项只适用于方法：`put/post/patch`
      data: {
        email: EmailAddress,
      },
      //`timeout`选项定义了请求发出的延迟毫秒数
      //如果请求花费的时间超过延迟的时间，那么请求会被终止
  
      //`withCredentails`选项表明了是否是跨域请求,默认是false
      withCredentials: true, //default,
      //返回数据的格式

      //其可选项是arraybuffer,blob,document,json,text,stream
      responseType: "text", //default
    })
      .then((res) => {
        setPosts((posts) => res.data);
      })
      .catch((err) => {
        console.log("Bug啦");
        console.log(posts);
        console.log(EmailAddress);
        console.log(err.message);
      });*/
    }
  };

  return (
    <>
      <div className={styles["setAPI"]} style={{}}>
        <List>
          <ListItem
            title={"请输入您的key"}
            subTitle={"请妥善保管您的key！"}
          ></ListItem>

          <div className={styles["filter-item"] + " " + styles["key-filter"]}>
            <div className={styles["actions"]}>
              <IconButton text={""} className={styles["filter-item"]} />
            </div>

            <Input
              type="text"
              placeholder={
                accessStore.token
                  ? `已设置key：${accessStore.token}`
                  : "请输入key"
              }
              //defaultValue={accessStore.token ? accessStore.token : ""}
              rows={1}
              className={styles["input-bar"]}
              onInput={(e) => {
                setApiKey(e.currentTarget.value);
                //accessStore.updateToken(ApiKey);
              }}
            ></Input>

            <div className={styles["actions"]}>
              <IconButton
                icon={<AddIcon />}
                text={"保存Key"}
                className={styles["filter-item"]}
                onClick={() => {
                  accessStore.updateToken(ApiKey);
                  console.log(ApiKey);
                }}
                shadow
              />
            </div>
          </div>
        </List>
      </div>

      <div className={styles["setAPI"]} style={{}}>
        <List>
          <ListItem
            title={"申请新Key"}
            subTitle={
              "没有Key？请输入Emali地址获取新Key。Key将发送到您的邮箱！"
            }
          ></ListItem>

          <div className={styles["filter-item"] + " " + styles["key-filter"]}>
            <div className={styles["actions"]}>
              <IconButton text={""} className={styles["filter-item"]} />
            </div>

            <Input
              type="text"
              placeholder={"请输入邮箱地址"}
              value={EmailAddress}
              rows={1}
              className={styles["input-bar"]}
              onInput={(e) => {
                setEmailAddress(e.currentTarget.value);
              }}
            ></Input>

            <div className={styles["actions"]}>
              <IconButton
                icon={<AddIcon />}
                text={"获取Key"}
                className={styles["filter-item"]}
                onClick={() => {
                  ApplyKey();
                  console.log(EmailAddress);
                }}
                shadow
              />
            </div>
          </div>
        </List>
      </div>

      <div className={styles["setAPI"]}>
        <List>
          <ListItem title={`消息提示：${msg}`}></ListItem>
        </List>
      </div>
    </>
  );
}
