import Locale from "../locales";

import styles from "./setAPI.module.scss";
import { List, ListItem, Modal, Select, showToast } from "./ui-lib";
import { IconButton } from "./button";
import AddIcon from "../icons/add.svg";
import { api } from "../client/api";
import { useEffect, useState } from "react";

import { useAccessStore } from "../store";

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
              value={ApiKey}
              onInput={(e) => {
                setApiKey(e.currentTarget.value);
                console.log(e.currentTarget.value);
              }}
              onChange={(e) => {
                accessStore.updateToken(e.currentTarget.value);
              }}
            ></input>
            <IconButton
              icon={<AddIcon />}
              text={"保存Key"}
              onClick={() => {
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
