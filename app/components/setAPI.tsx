<meta
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
/>;
import Locale from "../locales";

import styles from "./setAPI.module.scss";
import { List, ListItem, Modal, Select, showToast } from "./ui-lib";
import { IconButton } from "./button";
import AddIcon from "../icons/add.svg";
import { api } from "../client/api";
import { useEffect, useState } from "react";

import { useAccessStore } from "../store";
import comUtil from "../../common/comUtil";
import axios from "axios";
import { Console } from "console";

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

  const ApplyKey = () => {
    if (EmailAddress == "") {
      return;
    }

    console.log("申请邮件");
    axios({
      method: "POST", // 若不设置，默认为GET请求
      url: "/chat/pub_chat/createAccountByEmail",
      //当`url`是相对地址的时候，设置`baseURL`自动添加在url之前会非常方便
      baseURL: "http://47.113.149.222", //http://47.113.149.222:8080
      //`headers`选项是需要被发送的自定义请求头信息
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //`params`选项是要随请求一起发送的请求参数----一般链接在URL后面
      //他的类型必须是一个纯对象或者是URLSearchParams对象
      params: {
        ID: 12345,
      },
      //`data`选项是作为一个请求体而需要被发送的数据
      //该选项只适用于方法：`put/post/patch`
      data: {
        email: EmailAddress,
      },
      //`timeout`选项定义了请求发出的延迟毫秒数
      //如果请求花费的时间超过延迟的时间，那么请求会被终止
      timeout: 1000,
      //`withCredentails`选项表明了是否是跨域请求,默认是false
      withCredentials: true, //default,
      //返回数据的格式
      //其可选项是arraybuffer,blob,document,json,text,stream
      responseType: "json", //default
    })
      .then((res) => {
        setPosts((posts) => res.data);
      })
      .catch((err) => {
        console.log("Bug啦");
        console.log(posts);
        console.log(EmailAddress);
        console.log(err.message);
      });

    //e.preventDefault();
    /*
    axios
      .post(comUtil.getHost + "/chat/pub_chat/createAccountByEmail", {
        title: title,
        body: body,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          email: EmailAddress,
        },
      })
      .then((res) => {
        setPosts((posts) => res.data);
        setTitle("");
        setBody("");
      })
      .catch((err) => {
        console.log("Bug啦");
        console.log(posts);
        console.log(EmailAddress);
        console.log(err.message);
      });
      */
  };

  return (
    <>
      <div className={styles[".setAPI"]} style={{}}>
        <List>
          <ListItem
            title={"请输入您的key"}
            subTitle={"请妥善保管您的key！"}
          ></ListItem>

          <ListItem title={""}>
            <input
              type="text"
              value={accessStore.token.length == 0 ? "" : accessStore.token}
              onInput={(e) => {
                setApiKey(e.currentTarget.value);
                console.log(e.currentTarget.value);
              }}
              onChange={(e) => {
                //accessStore.updateToken(e.currentTarget.value);
              }}
            ></input>
            <IconButton
              icon={<AddIcon />}
              text={"保存Key"}
              onClick={() => {
                accessStore.updateToken(ApiKey);
                console.log(ApiKey);
              }}
              shadow
            />
          </ListItem>
        </List>
      </div>

      <div className="getKey">
        <List>
          <ListItem
            title={"申请新Key"}
            subTitle={
              "没有Key？请输入Emali地址获取新Key。Key将发送到您的邮箱！"
            }
          ></ListItem>

          <ListItem title={""}>
            <input
              type="text"
              value={EmailAddress}
              onInput={(e) => {
                setEmailAddress(e.currentTarget.value);
                console.log(e.currentTarget.value);
              }}
            ></input>
            <IconButton
              icon={<AddIcon />}
              text={"获取Key"}
              onClick={() => {
                ApplyKey();
                console.log(EmailAddress);
              }}
              shadow
            />
          </ListItem>
        </List>
      </div>
    </>
  );
}
