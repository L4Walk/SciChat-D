<meta
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
/>;
import Locale from "../locales";

import styles from "./recharge.module.scss";

import { Input, List, ListItem, Modal, Select, showToast } from "./ui-lib";
import { IconButton } from "./button";
import { api } from "../client/api";
import { useEffect, useState } from "react";

import { useAccessStore } from "../store";
import comUtil from "../../common/comUtil";
import axios from "axios";
import { Console } from "console";

import AddIcon from "../icons/add.svg";
import SendWhiteIcon from "../icons/send-white.svg";
import BrainIcon from "../icons/brain.svg";
import RenameIcon from "../icons/rename.svg";
import ExportIcon from "../icons/share.svg";
import ReturnIcon from "../icons/return.svg";
import CopyIcon from "../icons/copy.svg";
import LoadingIcon from "../icons/three-dots.svg";
import PromptIcon from "../icons/prompt.svg";
import MaskIcon from "../icons/mask.svg";
import MaxIcon from "../icons/max.svg";
import MinIcon from "../icons/min.svg";
import ResetIcon from "../icons/reload.svg";
import BreakIcon from "../icons/break.svg";
import SettingsIcon from "../icons/chat-settings.svg";
import RmbIcon from "../icons/money-rmb.svg";
import WeChatPay from "../icons/wechat-pay.svg";
import AliPay from "../icons/ali-pay.svg";
import { useWindowSize } from "../utils";

export function SetRecharge(props: { onClose: () => void }) {
  const accessStore = useAccessStore();

  const [price, setPrice] = useState("");
  const [payType, setPayType] = useState("");
  const [orderID, setOrderID] = useState("");
  const [payUrl, setPayUrl] = useState("");

  const [payQrUrl, setPayQrUrl] = useState("");
  const [isShowPayQr, setShowPayQr] = useState("");
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function showPayQr(props: {}) {
    if (price.length == 0 || Number(price) <= 0) {
      return;
    }

    setOrderID(comUtil.getGuid());
    createPayQrCode();
    setShowPayQr("true");
  }

  function createPayQrCode() {
    axios
      .post(comUtil.getHost() + "/chat/pub_chat/getPayQrCode", {
        Headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          pay_type: payType,
          price: price,
          order_id: orderID,
          order_uid: accessStore.token,
        },
      })
      .then((res) => {
        setPosts((posts) => res.data);
        if (res.data.status == "ok") {
          setPayUrl(res.data.info.qr);
          setPayQrUrl("https://xorpay.com/qr?data=" + payUrl);
        }
      })
      .catch((err) => {
        console.log("Bug啦");
        console.log(err.message);
      });
  }

  function payOver() {
    loadPaccount();
    setPrice("");
    setPayType("");
    setOrderID("");
    window.close();
  }

  function loadPaccount() {
    axios;
  }

  /*
 function ShowQr()
{
  return(
    <>
      <div className={"recharge"}>
        <List>
          <ListItem title="充值金额">
            <Input type="text" value={"充值金额：" + price}  readOnly={true}></Input>
          </ListItem>
          
          <ListItem title="订单号">
            <Input type="text" value={"订单号：" + orderID} readOnly={true}></Input>
          </ListItem>

          <ListItem title="二维码">
            <image>src="payQrUrl" class="payQrImg"</image>
            <button title="关闭"></button>
          </ListItem>
        </List>
        </div>
    </>

  );

 
}
*/

  return (
    <div className="modal-mask">
      <Modal title={"充值Key"} onClose={props.onClose}>
        <List>
          <ListItem title={"选择金额"} subTitle={"200p=1元"}>
            <IconButton
              icon={<RmbIcon />}
              text={"5元"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setPrice("5");
              }}
            />

            <IconButton
              icon={<RmbIcon />}
              text={"10元"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setPrice("10");
              }}
            />

            <IconButton
              icon={<RmbIcon />}
              text={"20"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setPrice("20");
              }}
            />

            <IconButton
              icon={<RmbIcon />}
              text={"50"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setPrice("50");
              }}
            />

            <IconButton
              icon={<RmbIcon />}
              text={"100"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setPrice("100");
              }}
            />

            <IconButton
              icon={<RmbIcon />}
              text={"500"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setPrice("500");
              }}
            />
          </ListItem>

          <ListItem title="自定义金额">
            <Input type="text" value={price}></Input>
          </ListItem>

          <ListItem title="请选择支付方式">
            <IconButton
              icon={<WeChatPay />}
              text={"微信支付"}
              onClick={() => {
                setPayType("native"), showPayQr("native");
              }}
            />
            <IconButton
              icon={<AliPay />}
              text={"支付宝支付"}
              onClick={() => {
                setPayType("alipay"), showPayQr("alipay");
              }}
            />
          </ListItem>
        </List>
      </Modal>
    </div>
  );
}
