import Locale from "../locales";
import styles from "./setAPI.module.scss";
import { List, ListItem, Modal, Select, showToast } from "./ui-lib";
import { IconButton } from "./button";

import { api } from "../client/api";
import { useEffect, useState } from "react";

export function SetAPIModal(props: { onClose: () => void }) {
  return (
    <div className="modal-mask">
      <Modal title={Locale.Export.Title} onClose={props.onClose}>
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

  return (
    <>
      <div className={styles["message-setAPI-body"]} style={{}}></div>

      <List>
        <ListItem title={"请输入您的key"} subTitle={"请妥善保管您的key！"}>
          <input
            type="text"
            value={ApiKey}
            onInput={(e) => {
              setApiKey(e.currentTarget.value);
              console.log(e.currentTarget.value);
            }}
          ></input>
        </ListItem>
        <ListItem title={"申请新Key"} subTitle={"请输入Emali地址获取新Key"}>
          <input
            type="text"
            value={EmailAddress}
            onInput={(e) => {
              setEmailAddress(e.currentTarget.value);
              console.log(e.currentTarget.value);
            }}
          ></input>
        </ListItem>
      </List>
    </>
  );
}
