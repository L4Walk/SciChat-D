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

export function SetRecharge(props: { onClose: () => void }) {
  const [money, setMoney] = useState("");
  const [payType, setPayType] = useState("");
  const [orderID, setOrderID] = useState("");

  function showPayQr(props: {}) {
    if (money.length == 0 || Number(money) <= 0) {
      return;
    }

    setOrderID(comUtil.getGuid());
  }

  function createPayQrCode() {}

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
                setMoney("5");
              }}
            />

            <IconButton
              icon={<RmbIcon />}
              text={"10元"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setMoney("10");
              }}
            />

            <IconButton
              icon={<RmbIcon />}
              text={"20"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setMoney("20");
              }}
            />

            <IconButton
              icon={<RmbIcon />}
              text={"50"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setMoney("50");
              }}
            />

            <IconButton
              icon={<RmbIcon />}
              text={"100"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setMoney("100");
              }}
            />

            <IconButton
              icon={<RmbIcon />}
              text={"500"}
              className={styles["sidebar-bar-button"]}
              shadow
              onClick={() => {
                setMoney("500");
              }}
            />
          </ListItem>

          <ListItem title="自定义金额">
            <Input type="text" value={money}></Input>
          </ListItem>

          <ListItem title="请选择支付方式">
            <IconButton icon={<WeChatPay />} text={"微信支付"} />
            <IconButton icon={<AliPay />} text={"支付宝支付"} />
          </ListItem>
        </List>
      </Modal>
    </div>
  );
}
