"use client";

import styles from "@styles/elements/button.module.scss";
import { LoadingAnim } from "./LoadingAnim";
import { ReactNode, useEffect, useState } from "react";
import { ButtonText } from "./ButtonText";
import { wait } from "@lib/waitTimeout";

type Props = {
  size?: "small" | "medium" | "large";
  type?: "button" | "reset" | "submit";
  children: ReactNode | ReactNode[];
  onClick?: (e:any) => any;
  disabled?: boolean;
};

export function Button({ size = "medium", type = "button", children, onClick, disabled = false }: Props) {

  const styleIsPend = [styles.button]
  return (
    <button
    className={[styles.button, size, "button"].join(" ")}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <ButtonText isAnim={disabled}> {children} </ButtonText>
    </button>
  );
}
