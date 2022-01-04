import { useEffect, useState } from "react"
import { useSelectMenuState } from "../atoms/menuState";

export default function useSelectMenu() {
    const [current, setCurrent] = useSelectMenuState();

    return {current , setCurrent};
  }